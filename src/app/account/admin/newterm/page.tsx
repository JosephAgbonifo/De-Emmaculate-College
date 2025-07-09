"use client";
import React, { useState } from "react";
import Topbar from "@/src/components/admin/Topbar";
import { useUserStore } from "@/stores/useUserStore";
import { postRequest } from "@/src/utils/api";

export default function StaffRegistrationPage() {
  const user = useUserStore((state) => state.user);

  const [formData, setFormData] = useState({
    term: "",
    session: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await postRequest("/admin/session", formData); // fd is your FormData
      setSuccess(data.message);
      setError("");
      setLoading(false);
    } catch (err: unknown) {
      setLoading(false);
      if (typeof err === "string") {
        setError(err);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="md:pt-20">
      <Topbar
        role={user?.role || "unauthorised"}
        name={user?.fullname || "unauthorised"}
      />

      <div className="min-h-screen p-4 md:w-[60%] mx-auto mt-10">
        <h1 className="text-xl font-bold mb-6">Update Term / Session</h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
            {success}
          </div>
        )}
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-20 md:m-0"
        >
          <input
            name="session"
            value={formData.session}
            onChange={(e) => {
              setFormData({ ...formData, session: e.target.value });
            }}
            placeholder="Session"
            className="border p-2 rounded hidden"
          />

          <select
            name="term"
            value={formData.term}
            onChange={(e) => {
              setFormData({ ...formData, term: e.target.value });
            }}
            className="border p-2 rounded hidden"
          >
            <option value="">Select Term</option>
            <option value="1st">1st Term</option>
            <option value="2nd">2nd Term</option>
            <option value="3rd">3rd Term</option>
          </select>
          <div className="col-span-2">
            <p className="text-sm text-gray-500">
              Note: This will update the current term and session for all
              students and staff to the next term.
            </p>
          </div>

          <button
            type="submit"
            className="bg-cta text-white py-2 rounded md:col-span-2 hover:opacity-90"
          >
            {loading ? "...loading" : "Update Term / Session"}
          </button>
        </form>
      </div>
    </div>
  );
}
