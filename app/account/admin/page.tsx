import Topbar from "@/components/admin/Topbar";
import Link from "next/link";
import React from "react";
import { MdNoteAlt } from "react-icons/md";
import { FaPenFancy, FaLockOpen, FaBell } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { IoIosSwitch } from "react-icons/io";
import { GiAstronautHelmet } from "react-icons/gi";

const page = () => {
  return (
    <div className="md:pt-20">
      <Topbar />
      <div className="min-h-screen">
        <div className="md:w-[70%] w-full p-10  m-auto mt-10 grid md:grid-cols-3 gap-10 grid-cols-2">
          <Actions
            href="/staffreg"
            icon={<MdNoteAlt />}
            text="Register New Staff"
          />
          <Actions
            href="/staffreg"
            icon={<MdNoteAlt />}
            text="Register New Student"
          />
          <Actions href="/staffreg" icon={<FaPenFancy />} text="Edit Results" />
          <Actions href="/staffreg" icon={<GrOverview />} text="View Results" />
          <Actions
            href="/staffreg"
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
};

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

export default page;
