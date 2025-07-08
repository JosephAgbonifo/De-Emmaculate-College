"use client";
import { useEffect, useState } from "react";
import Topbar from "@/src/components/admin/Topbar";
import { useUserStore } from "@/stores/useUserStore";
import Link from "next/link";
import { getRequest } from "@/src/utils/api";

interface StudentInfo {
  session: string;
  term: string;
  resultcheck: string;
}

export default function StudentPage() {
  const user = useUserStore((state) => state.user);
  const [studentInfo, setStudentInfo] = useState<StudentInfo>();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const data = await getRequest(`/session`);
        setStudentInfo(data.data);
      } catch (err) {
        setError("Failed to fetch student details: " + err);
      }
    };

    if (user?.email) fetchStudentInfo();
  }, [user?.email]);

  return (
    <div className="pt-28">
      <Topbar
        name={user?.fullname || "unauthorised"}
        role={user?.role || "unauthorised"}
      />

      <div className="p-10">
        {studentInfo && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Your Details:</h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>
                <strong>Full Name:</strong> {user?.fullname}
              </li>
              <li>
                <strong>Class:</strong> {user?.class}
              </li>
              <li>
                <strong>Registration No:</strong> {user?.reg_number}
              </li>
              <li>
                <strong>Session:</strong> {studentInfo.session}
              </li>
              <li>
                <strong>Term:</strong> {studentInfo.term}
              </li>
            </ul>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
        )}

        <div className="mt-6">
          <StudentMenu
            href={
              user?.reg_number
                ? `./student/result/${user.reg_number.replace(/\//g, "-")}`
                : "/"
            }
            text="View Results"
          />
        </div>
      </div>
    </div>
  );
}

function StudentMenu({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="text-bluebg bg-head hover:border-text hover:border h-10 flex items-center justify-center rounded-lg my-3 px-4"
    >
      {text}
    </Link>
  );
}
