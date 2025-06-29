"use client";
import Topbar from "@/src/components/admin/Topbar";
import Link from "next/link";
import React from "react";
import { MdNoteAlt } from "react-icons/md";
import { FaPenFancy, FaLockOpen, FaBell } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { IoIosSwitch } from "react-icons/io";
import { GiAstronautHelmet } from "react-icons/gi";
import { useUserStore } from "@/stores/useUserStore";

export default function Page() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="md:pt-20">
      <Topbar name={user?.fullname || "unauthorised"} />
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
          <Actions href="/staffreg" icon={<FaPenFancy />} text="Edit Results" />
          <Actions href="/staffreg" icon={<GrOverview />} text="View Results" />
          <Actions
            href="./admin/newterm"
            icon={<FaLockOpen />}
            text="Open new term"
          />
          <Actions
            href="/staffreg"
            icon={<IoIosSwitch />}
            text="toggle Result check"
          />
          <Actions
            href="/staffreg"
            icon={<FaPenFancy />}
            text="Change Password"
          />
          <Actions
            href="/staffreg"
            icon={<GiAstronautHelmet />}
            text="Staff Authorization"
          />
          <Actions
            href="/staffreg"
            icon={<FaBell />}
            text="Send Notification"
          />
        </div>
      </div>
    </div>
  );
}

function Actions({
  href,
  text,
  icon,
}: {
  href: string;
  text: string;
  icon?: React.ReactElement;
}) {
  return (
    <Link
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
