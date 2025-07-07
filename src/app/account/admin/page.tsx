"use client";
import Topbar from "@/src/components/admin/Topbar";
import Link from "next/link";
import React, { useState } from "react";
import { MdNoteAlt } from "react-icons/md";
import { FaPenFancy, FaLockOpen, FaBell } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { IoIosSwitch } from "react-icons/io";
import { GiAstronautHelmet } from "react-icons/gi";
import { useUserStore } from "@/stores/useUserStore";
import { getRequest, postRequest } from "@/src/utils/api";

export default function Page() {
  const user = useUserStore((state) => state.user);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  async function toggleresult() {
    try {
      const data = await postRequest("/admin/toggleresult", {}); // fd is your FormData
      setSuccess(data.message);
      setError("");

      const session = await getRequest("/session"); // fd is your FormData
      if (session.data.resultcheck === 1) {
        setResult("Students Can Check their Results");
      } else {
        setResult("Students Can Not Check their Results");
      }
    } catch (err: unknown) {
      if (typeof err === "string") {
        setError(err);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    }
  }

  return (
    <div className="md:pt-20">
      <Topbar
        name={user?.fullname || "unauthorised"}
        role={user?.role || "unauthorised"}
      />

      <div className="min-h-screen">
        <div className="md:w-[70%] w-full p-10  m-auto mt-10 grid md:grid-cols-3 gap-10 grid-cols-2">
          <Actions
            href="./admin/staffreg"
            icon={<MdNoteAlt />}
            text="Register New Staff"
          />
          <Actions
            href="./admin/studentreg"
            icon={<MdNoteAlt />}
            text="Register New Student"
          />
          <Actions
            href="./admin/subjects/assign"
            icon={<FaPenFancy />}
            text="Assign Subjects"
          />
          <Actions
            href="./admin/viewresult"
            icon={<GrOverview />}
            text="View Results"
          />
          <Actions
            href="./admin/newterm"
            icon={<FaLockOpen />}
            text="Open new term"
          />
          <Actions
            href="#"
            icon={<IoIosSwitch />}
            text={success ? success : error ? error : "Toggle result check"}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              toggleresult();
            }}
          />
          <Actions
            href="./admin/editpassword"
            icon={<FaPenFancy />}
            text="Change Student/staff Password"
          />
          <Actions
            href="./admin/staffauth"
            icon={<GiAstronautHelmet />}
            text="Staff Authorization"
          />
          <Actions
            href="/staffreg"
            icon={<FaBell />}
            text="Send Notification .."
          />
        </div>
        {result ? (
          <p className="text-green-950 text-lg font-bold m-5">{result}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function Actions({
  href,
  text,
  icon,
  onClick,
}: {
  href: string;
  text: string;
  icon?: React.ReactElement;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      onClick={onClick}
      href={href || ""}
      className="border-2 relative overflow-hidden flex items-center justify-center border-cta h-28 rounded-lg text-xs md:text-sm"
    >
      {text}
      <div className="absolute text-9xl text-secondary/50 -left-10 -bottom-6">
        {icon}
      </div>
    </Link>
  );
}
