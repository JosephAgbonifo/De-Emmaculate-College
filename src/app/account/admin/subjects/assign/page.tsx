"use client";
import React, { useEffect, useState } from "react";
import Topbar from "@/src/components/admin/Topbar";
import { useUserStore } from "@/stores/useUserStore";
import { getRequest, postRequest } from "@/src/utils/api";

type Subject = {
  name: string;
  subject_id: string;
  staff_email: string;
};

type Staff = {
  fullname: string;
  email: string;
};

export default function SubjectAssignmentPage() {
  const user = useUserStore((state) => state.user);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch subjects and staff list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectData = await getRequest("/subjects");
        const staffRes = await postRequest("/staff/all", {}); // Adjust endpoint if needed

        const initialAssignments: Record<string, string> = {};
        subjectData.forEach((subject: Subject) => {
          initialAssignments[subject.subject_id] = subject.staff_email || "";
        });

        setSubjects(subjectData);
        setAssignments(initialAssignments);
        setStaffList(staffRes.data); // Assuming response shape matches your `getStaff`
      } catch (err) {
        setError("Failed to fetch subjects or staff list: " + err);
      }
    };

    fetchData();
  }, []);

  const handleAssignmentChange = (subjectId: string, staffEmail: string) => {
    setAssignments((prev) => ({
      ...prev,
      [subjectId]: staffEmail,
    }));
  };

  const handleSubmit = async () => {
    try {
      await postRequest("/subjects/update", assignments);
      setSuccess("Subjects assigned successfully");
      setError("");
    } catch (err) {
      setError("Failed to update subjects " + err);
      setSuccess("");
    }
  };

  return (
    <div className="md:pt-20">
      <Topbar
        name={user?.fullname || "unauthorised"}
        role={user?.role || "unauthorised"}
      />
      <div className="min-h-screen p-4 md:w-[80%] mx-auto mt-10">
        <h1 className="text-xl font-bold mb-6">Assign Subjects to Staff</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
            {success}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <div
              key={subject.subject_id}
              className="border p-4 rounded bg-gray-50"
            >
              <h2 className="font-semibold">{subject.name}</h2>
              <p className="text-xs text-gray-500 mb-2">
                Subject ID: {subject.subject_id}
              </p>

              <select
                className="border p-2 w-full rounded"
                value={assignments[subject.subject_id] || ""}
                onChange={(e) =>
                  handleAssignmentChange(subject.subject_id, e.target.value)
                }
              >
                <option value="">-- Select Staff --</option>
                {staffList.map((staff) => (
                  <option key={staff.email} value={staff.email}>
                    {staff.fullname} ({staff.email})
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-cta text-white px-6 py-2 rounded hover:opacity-90"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
