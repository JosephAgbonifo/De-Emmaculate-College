"use client";
import React, { useEffect, useState } from "react";
import { postRequest } from "@/src/utils/api";
import { useUserStore } from "@/stores/useUserStore";

export default function SendNoticePage() {
  const [staffList, setStaffList] = useState<
    { fullname: string; email: string }[]
  >([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);

  // Fetch staff on load
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await postRequest("/staff/all", {});
        setStaffList(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load staff:", err);
        setError("Failed to load staff list");
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const toggleEmail = (email: string) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    if (!selectedEmails.length || !message.trim()) {
      setError("Select at least one staff and enter a message");
      return;
    }

    const emailsCSV = selectedEmails.join(",");

    try {
      if (user?.role !== "admin") {
        setError("You're not authorised to do this");
        setLoading(false);
        return;
      }
      await postRequest("/admin/notice", {
        receiver_email: emailsCSV,
        sender_email: user?.email,
        message: message, // again, assuming backend expects this
      });
      setSuccess("Notice sent successfully");
      setSelectedEmails([]);
      setMessage("");
      setError("");
      setLoading(false);
    } catch (err) {
      console.error("Failed to send:", err);
      if (typeof err === "string") {
        setError(err);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto pt-20">
      <h1 className="text-2xl font-bold mb-6">Send Notice to Staff</h1>

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
          <div className="mb-4">
            <label className="mb-2 block font-medium">
              Select Staff (Checklist)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {staffList?.map((staff) => (
                <label
                  key={staff.email}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    value={staff.email}
                    checked={selectedEmails.includes(staff.email)}
                    onChange={() => toggleEmail(staff.email)}
                    className="form-checkbox"
                  />
                  <span>
                    {staff.fullname} ({staff.email})
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

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
          {loading ? "...loading" : "Send Notification"}
        </button>
      </form>
    </div>
  );
}
