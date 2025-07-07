"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import Topbar from "@/src/components/admin/Topbar";
import { useRouter } from "next/navigation";
import { postRequest } from "@/src/utils/api";

type Subject = {
  name: string;
  subject_id: string;
};

export default function SelectSubjectPage() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState("");
  const email = user?.email;
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        if (!email) return;
        const data = await postRequest(`/subjects`, { email });
        setSubjects(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch your subjects");
      }
    };

    fetchSubjects();
  }, [email]);

  const handleSelect = (subjectId: string) => {
    router.push(`./editresult/${subjectId}`);
  };

  return (
    <div className="pt-28">
      <Topbar
        name={user?.fullname || "unauthorised"}
        role={user?.role || "unauthorised"}
      />
      <div className="p-6 md:w-[80%] mx-auto">
        <h1 className="text-xl font-bold mb-6">Select Subject to Edit</h1>
        {error && (
          <div className="text-red-500 bg-red-100 p-4 rounded mb-4">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <div
              key={subject.subject_id}
              onClick={() => handleSelect(subject.subject_id)}
              className="cursor-pointer bg-gray-100 p-4 rounded hover:bg-gray-200 transition"
            >
              <h2 className="font-semibold">{subject.name}</h2>
              <p className="text-sm text-gray-600">{subject.subject_id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
