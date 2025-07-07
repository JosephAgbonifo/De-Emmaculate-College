"use client";

import { useState } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { getRequest, postRequest } from "@/src/utils/api";
import { useUserStore } from "@/stores/useUserStore";

type Subject = {
  name: string;
  subject_id: string;
  staff_email: string;
};

export default function EditSubjectResultPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const user = useUserStore((state) => state.user);

  const regNumber = params.regnumber as string;
  const subjectQuery = searchParams.get("subject");

  const [ca1, setCa1] = useState("");
  const [ca2, setCa2] = useState("");
  const [exam, setExam] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (!ca1 || !ca2 || !exam) {
      console.log("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const subjects: Subject[] = await getRequest("/subjects");
      console.log("Subject from query:", subjectQuery);
      console.log("User email:", user?.email);
      console.log("Subjects array:", subjects);

      const isAllowed = subjects.some(
        (s) => s.staff_email === user?.email && s.subject_id === subjectQuery
      );

      if (!isAllowed) {
        console.log("You are not authorized to edit this subject");
        return;
      }

      const resultData = {
        regnum: regNumber,
        subject: subjectQuery,
        ca1: parseFloat(ca1),
        ca2: parseFloat(ca2),
        exam: parseFloat(exam),
      };

      await postRequest("/results/edit", resultData);

      console.log("Result updated successfully!");
      router.push("/staff"); // or any page to redirect after success
    } catch (err) {
      console.error(err);
      setError("Failed to update result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 pt-36">
      <h1 className="text-xl font-bold mb-4">
        Edit Result for {regNumber.replace(/-/g, "/")} - {subjectQuery}
      </h1>

      <div className="space-y-4 max-w-sm">
        <input
          value={ca1}
          onChange={(e) => setCa1(e.target.value)}
          type="number"
          placeholder="CA1 Score"
          className="border p-2 rounded w-full"
        />
        <input
          value={ca2}
          onChange={(e) => setCa2(e.target.value)}
          type="number"
          placeholder="CA2 Score"
          className="border p-2 rounded w-full"
        />
        <input
          value={exam}
          onChange={(e) => setExam(e.target.value)}
          type="number"
          placeholder="Exam Score"
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleSubmit}
          className="bg-bluebg text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Result"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
