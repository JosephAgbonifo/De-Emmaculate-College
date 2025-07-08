"use client";
import React, { useState } from "react";
import { postRequest } from "@/src/utils/api";
import { useUserStore } from "@/stores/useUserStore";

export default function SendNoticePage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const user = useUserStore((state) => state.user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (user?.role !== "admin") {
        setError("You're not authorised to do this");
        return;
      }
      const res = await postRequest("/admin/notice", {
        receiver_email: "admin",
        sender_email: user?.email,
        message: message, // again, assuming backend expects this
      });
      console.log("Sent:", res);
      setSuccess("Notice sent successfully");
      setMessage("");
      setError("");
    } catch (err) {
      console.error("Failed to send:", err);
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
    <div className="min-h-screen p-6 max-w-2xl mx-auto pt-20">
      <h1 className="text-2xl font-bold mb-6">Send Notice to Admin</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
            className="w-full border p-2 rounded min-h-[120px]"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:opacity-90"
        >
          Send Notice
        </button>
      </form>
    </div>
  );
}
