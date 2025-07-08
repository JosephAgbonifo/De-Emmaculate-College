"use client";
import { useEffect, useState } from "react";
import { postRequest } from "@/src/utils/api";
import { useUserStore } from "@/stores/useUserStore";
import Topbar from "@/src/components/admin/Topbar";

interface Notification {
  message: string;
  read_status: number;
}

export default function StaffNotificationsPage() {
  const user = useUserStore((state) => state.user);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await postRequest("/staff/notifications", {
          email: "admin",
        });
        setLoading(false);

        setNotifications(data);
      } catch (err) {
        setError("Failed to load notifications: " + err);
        setLoading(false);
      }
    };

    if (user?.email) fetchNotifications();
  }, [user?.email]);

  return (
    <div className="pt-28 px-8">
      <Topbar
        name={user?.fullname || "unauthorised"}
        role={user?.role || "unauthorised"}
      />

      <h1 className="text-2xl font-bold mb-6">📬 Your Notifications</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {loading ? "...loading" : ""}
      {Object.values(notifications).map((msg, i) => {
        return (
          <li
            key={i}
            className={`${
              msg.read_status ? "" : "bg-yellow-50 border-l-4 border-yellow-500"
            }  text-gray-800 p-2 mx-5 md:mx-0 rounded`}
          >
            {msg.message}
            {msg.read_status ? (
              ""
            ) : (
              <span className="float-end clear-end">NEW</span>
            )}
          </li>
        );
      })}
    </div>
  );
}
