"use client";
import React, { useState } from "react";
// import { Label } from "../ui/label";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export function SignupFormDemo() {
  const [acct, setAcct] = useState("student");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="h-full md:h-auto shadow-input mx-auto md:w-full w-4/5 m-auto max-w-md rounded-none bg-cta p-4 md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-text font-poppins md:mt-0 mt-15 ">
        Emmaculate College
      </h2>
      <p className="mt-2 max-w-sm text-sm text-text">
        Login as{" "}
        <label className="ml-10">
          <input
            type="radio"
            name="role"
            value="student"
            checked={acct === "student"}
            onChange={(e) => setAcct(e.target.value)}
          />
          Student
        </label>
        <label className="ml-10">
          <input
            type="radio"
            name="role"
            value="staff"
            checked={acct === "staff"}
            onChange={(e) => setAcct(e.target.value)}
          />
          Staff
        </label>
        <p className="mt-3">Selected Role: {acct}</p>
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {acct === "student" ? (
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="regNumber">Registration number</Label>
              <Input id="regNumber" placeholder="EMC/25/0000" type="text" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="Password" type="password" />
            </LabelInputContainer>
          </div>
        ) : (
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="username@emailprovider.com"
                type="email"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>
          </div>
        )}

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign In &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
