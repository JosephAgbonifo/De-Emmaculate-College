"use client";
import { postRequest } from "@/src/utils/api";
import { useEffect, useState } from "react";

type Staff = {
  id: string | number;
  fullname: string;
  email: string;
  class: string;
  status: string;
  role: string;
};

export default function StaffAuthPage() {
  const [trigger, setTrigger] = useState(0);
  const auth = async (id: string | number) => {
    try {
      const data = await postRequest("/staff/auth", { id });
      console.log("Authorization successful:", data);
      setTrigger((prev) => prev + 1); // Trigger a re-fetch or state update
    } catch (err: unknown) {
      console.error("Authorization failed:", err);
      // Handle error appropriately, e.g., show a notification
    }
  };
  const [staffs, setStaffs] = useState<Staff[]>([]); // This is just a placeholder, you might want to fetch this data
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await postRequest("/staff/all", {});
        console.log("Login successful:", data); // or wherever you want
        setStaffs(data.data || []); // Assuming data is an array of staff objects
      } catch (err: unknown) {
        console.error("Login failed:", err);
        // setError is not defined in this component, so you may want to handle errors differently
        // For now, just log the error
      }
    };
    fetchStaff();
  }, [trigger]);

  return (
    <div className="text-center p-10  md:pt-32 my-10">
      <h1 className="text-xl text-cta">Staff Authorization</h1>
      <p className="text-base md:mb-20 mb-10">
        Manage staff authorization settings here.
      </p>
      <div className="m-5">
        {staffs.map((staff: Staff) => (
          <div
            key={staff.id}
            className="grid grid-cols-6 gap-4 p-2 text-xs md:w-1/2 m-auto"
          >
            <div className="col-span-1">{staff.id}</div>
            <div className="col-span-1">{staff.class}</div>
            <div className="col-span-1">{staff.fullname} </div>
            <div className="col-span-1">{staff.email}</div>
            <div className="col-span-1">{staff.role}</div>
            <div className="col-span-1">
              {staff.status === "1" ? (
                <span
                  className="text-green-500 p-1 border-2 border-green-500 rounded-sm cursor-default"
                  onClick={() => auth(staff.id)}
                >
                  Authorized
                </span>
              ) : staff.status === "admin" ? (
                <span
                  onClick={() => auth(staff.id)}
                  className="text-blue-500 p-1 border-2 border-blue-500 rounded-sm cursor-default"
                >
                  Admin
                </span>
              ) : (
                <span
                  onClick={() => auth(staff.id)}
                  className="text-red-500 p-1 border-2 border-red-500 rounded-sm cursor-default"
                >
                  Unauthorized
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
