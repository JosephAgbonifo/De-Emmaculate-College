"use client";
import { useState, use } from "react";
import Topbar from "@/src/components/admin/Topbar";
import { useUserStore } from "@/stores/useUserStore";
import { postRequest } from "@/src/utils/api";
import { useRouter } from "next/navigation";

const CLASSES = ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"];

type Student = {
  name: string;
  regnum: string;
  class: string;
};

interface SubjectPageProps {
  params: Promise<{ subject: string }>;
}

export default function EditClassResultsPage({ params }: SubjectPageProps) {
  const { subject } = use(params);
  const user = useUserStore((state) => state.user);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFetchStudents = async () => {
    if (!selectedClass) return;

    try {
      setLoading(true);
      const data = await postRequest(`/student/class`, { selectedClass });
      setStudents(data.students);
      setError("");
    } catch (err) {
      setError("Failed to fetch students " + err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditResult = (regNumber: string) => {
    router.push(`./${subject}/${regNumber}?subject=${subject}`);
  };

  return (
    <div className="pt-28">
      <Topbar
        name={user?.fullname || "unauthorised"}
        role={user?.role || "unauthorised"}
      />

      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Edit Student Results</h1>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            Select a Class:
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border p-2 rounded w-full max-w-xs"
          >
            <option value="">-- Select Class --</option>
            {CLASSES.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleFetchStudents}
          disabled={!selectedClass}
          className="bg-bluebg text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          Load Students
        </button>

        {loading && <p className="mt-4 text-sm text-gray-600">Loading...</p>}

        {error && (
          <p className="mt-4 text-sm text-red-500 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        {students.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Students in {selectedClass}</h2>
            <ul className="space-y-2">
              {students.map((student) => (
                <li
                  key={student.regnum}
                  className="p-3 border rounded flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-gray-500">
                      Reg No: {student.regnum}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleEditResult(student.regnum.replace(/\//g, "-"))
                    }
                    className="bg-cta text-white px-4 py-1 rounded hover:opacity-90"
                  >
                    Edit Result
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
