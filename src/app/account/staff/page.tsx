"use client";
import { useEffect, useState } from "react";
import Topbar from "@/src/components/admin/Topbar";
import { useUserStore } from "@/stores/useUserStore";
import Link from "next/link";
import { getRequest } from "@/src/utils/api";

export default function StaffPage() {
  const user = useUserStore((state) => state.user);
  const [assignedSubjects, setAssignedSubjects] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignedSubjects = async () => {
      try {
        interface Subject {
          name: string;
          subject_id: string;
          staff_email: string;
        }

        const data: Subject[] = await getRequest("/subjects"); // expected: [{ name, subject_id, staff_email }]
        const userSubjects: string[] = data
          .filter((subject: Subject) => subject.staff_email === user?.email)
          .map((subject: Subject) => subject.name);
        setAssignedSubjects(userSubjects);
      } catch (err) {
        setError("Failed to load subjects" + err);
      }
    };

    if (user?.email) fetchAssignedSubjects();
  }, [user?.email]);

  return (
    <div className="pt-28">
      <Topbar
        name={user?.fullname || "unauthorised"}
        role={user?.role || "unauthorised"}
      />

      <div className="p-10">
        <p
          className={`text-left text-sm font-poppins mb-4 ${
            user?.status === "1" ? "text-green-500" : "text-red-500"
          }`}
        >
          you are{" "}
          {user?.status === "1"
            ? "authorised to start performing actions on this platform"
            : "unauthorised and cannot perform any action on this site, reach out to admin to get authorised"}
        </p>
        <p className={`text-left text-sm font-poppins mb-4  text-red-500`}>
          {assignedSubjects
            ? ""
            : "You've not been assigned any subject yet, reach out to admin to get an assignment"}
        </p>

        {assignedSubjects.length > 0 && (
          <div className="mb-4">
            <p className="font-semibold mb-1">Your Assigned Subjects:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {assignedSubjects.map((subject, idx) => (
                <li key={idx}>{subject}</li>
              ))}
            </ul>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
        )}

        <div className="mt-6">
          <StaffMenu
            href={user?.status === "1" ? "./staff/editresult" : "#"}
            text="Edit Result"
          />
          <StaffMenu
            href={user?.status === "1" ? "./notifications" : "#"}
            text="Notifications"
          />
          <StaffMenu
            href={user?.status === "1" ? "./msg" : "#"}
            text="Message Admin"
          />
        </div>
      </div>
    </div>
  );
}

export function StaffMenu({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href || "./"}
      className="text-bluebg bg-head hover:border-text hover:border h-10 flex items-center justify-center rounded-lg my-3 px-4"
    >
      {text}
    </Link>
  );
}
