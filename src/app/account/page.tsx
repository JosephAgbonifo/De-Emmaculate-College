"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";

export default function Page() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user?.role === "admin") {
      router.push("/account/admin");
    } else if (user?.role === "staff") {
      router.push("/account/staff");
    } else {
      router.push("/account/student");
    }
  }, [user, router]);

  return <div></div>;
}
