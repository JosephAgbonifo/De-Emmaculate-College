"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    // Clear the user from Zustand and redirect
    useUserStore.getState().clearUser();
    router.push("/signin");
  }, [router]);

  return null; // No UI, just logic
}
