import React from "react";

const Topbar = ({ name, role }: { name: string; role: string }) => {
  return (
    <div className="bg-cta h-20 md:mt-10 w-full md:w-4/5 px-20 md:text-2xl text-text font-poppins font-bold m-auto md:rounded-lg flex items-center">
      Welcome, {name} To your {role} Dashboard
    </div>
  );
};

export default Topbar;
