// components/UserInitializer.tsx
"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";

type User = {
  fullname: string;
  class: string;
  role: string;
  status: string;
  email: string;
  reg_number?: string;
  parent_phone?: string;
  // Add other user properties as needed
};

export default function UserInitializer({ user }: { user: User }) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  return null;
}
