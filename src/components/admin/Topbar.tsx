import React from "react";
import { getSession } from "@/src/utils/getsession";

const Topbar = async ({ name }: { name: string }) => {
  const sess = await getSession();

  return (
    <div className="bg-cta h-20 md:mt-10 w-full md:w-4/5 px-20 md:text-2xl text-text font-poppins font-bold m-auto md:rounded-lg flex items-center">
      Welcome, Mr {name} To your Admin Dashboard
      <br />
      {sess.term} Term of the {sess.session} Session
    </div>
  );
};

export default Topbar;
