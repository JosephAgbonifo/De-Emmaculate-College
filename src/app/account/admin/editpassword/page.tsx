"use client";
import React, { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { postRequest } from "@/src/utils/api";

export default function EditPassword() {
  const [choice, setChoice] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    type: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files && files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await postRequest("/admin/passwordchange", {
        type: formData.type,
        password: formData.password,
      }); // fd is your FormData
      console.log("Successful:", data);
      setSuccess("password Updated successfully");
      setFormData({
        type: "",
        password: "",
      });
      setError("");
    } catch {
      console.error(
        "password could not be change, confirm email/reg number is correct"
      );

      setError(
        "password could not be change, confirm email/reg number is correct"
      );
    }
  };

  const user = useUserStore((state) => state.user);

  return (
    <>
      {user?.role === "admin" ? (
        <div className="pt-32 min-h-screen flex justify-center flex-col">
          <div className="border h-14 w-3/5 mx-auto flex text-2xl uppercase items-center justify-center rounded-xl cursor-default">
            <div
              onClick={() => setChoice("staff")}
              className={`h-full w-1/2 rounded-xl flex items-center justify-center transition-all duration-500 ${
                choice === "staff" ? "bg-cta text-white font-bold" : ""
              }`}
            >
              Staff
            </div>
            <div
              onClick={() => setChoice("student")}
              className={`h-full w-1/2 rounded-xl flex items-center justify-center  transition-all duration-500 ${
                choice === "student" ? "bg-cta text-white font-bold" : ""
              }`}
            >
              Student
            </div>
          </div>
          {error ? error : success ? success : ""}
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            {choice === "staff" ? (
              <input
                name="type"
                type="email"
                value={formData.type}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 rounded"
                required
              />
            ) : (
              <input
                name="type"
                type="text"
                value={formData.type}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 rounded"
                required
              />
            )}

            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              type="password"
              className="border p-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-cta text-white py-2 rounded md:col-span-2 hover:opacity-90"
            >
              Change Password
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
