"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/src/lib/utils";
import { postRequest } from "@/src/utils/api";
import { useRouter } from "next/navigation";

export function SignupFormDemo() {
  const router = useRouter();
  const [acct, setAcct] = useState("student");
  const [error, setError] = useState<{ message?: string }>({});

  // student inputs
  const [studentRegNumber, setStudentRegNumber] = useState("");
  const [studentPassword, setStudentPassword] = useState("");

  // staff inputs
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formDetails:
      | { reg_number: string; password: string }
      | { email: string; password: string };
    let endpoint: string;

    if (acct === "student") {
      formDetails = {
        reg_number: studentRegNumber,
        password: studentPassword,
      };
      endpoint = "/student/login";
    } else {
      formDetails = {
        email: staffEmail,
        password: staffPassword,
      };
      endpoint = "/staff/login";
    }

    try {
      const data = await postRequest(endpoint, formDetails);
      console.log("Login successful:", data);
      if (acct === "student") {
        router.push("/account/studentdashboard");
      } else if (acct === "staff") {
        router.push("/account/admin");
      }
    } catch (error: unknown) {
      console.error("Login failed:", error);
      // Safely extract error message if available
      if (typeof error === "object" && error !== null && "message" in error) {
        setError(error as { message: string });
      } else {
        setError({ message: "An unknown error occurred." });
      }
    }
  };

  return (
    <div className="h-full md:h-auto shadow-input mx-auto md:w-full w-4/5 m-auto max-w-md rounded-none bg-cta p-4 md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-text font-poppins md:mt-0 mt-15">
        Emmaculate College
      </h2>

      {error && <p className="text-red-500">{error.message}</p>}

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
        <span className="mt-3 block">Selected Role: {acct}</span>
      </p>

      <form method="post" className="my-8" onSubmit={handleSubmit}>
        {acct === "student" ? (
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="regNumber">Registration number</Label>
              <Input
                id="regNumber"
                placeholder="EMC/25/0000"
                type="text"
                value={studentRegNumber}
                onChange={(e) => setStudentRegNumber(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="studentPassword">Password</Label>
              <Input
                id="studentPassword"
                placeholder="Password"
                type="password"
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
              />
            </LabelInputContainer>
          </div>
        ) : (
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="staffEmail">Email Address</Label>
              <Input
                id="staffEmail"
                type="email"
                placeholder="username@emailprovider.com"
                value={staffEmail}
                onChange={(e) => setStaffEmail(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="staffPassword">Password</Label>
              <Input
                id="staffPassword"
                type="password"
                placeholder="••••••••"
                value={staffPassword}
                onChange={(e) => setStaffPassword(e.target.value)}
              />
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

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
