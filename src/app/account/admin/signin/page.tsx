"use client";
import React, { useState } from "react";
import { postRequest } from "@/src/utils/api"; // assuming your path
import { Input } from "@/src/components/ui/input"; // adjust the path as necessary
import { Label } from "@/src/components/ui/label"; // adjust the path as necessary

export default function Adminsignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await postRequest("/admin/login", { email, password });
      console.log("Login successful:", data);
      window.location.href = "/account/admindashboard"; // or wherever you want
    } catch (err: unknown) {
      console.error("Login failed:", err);
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
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Admin Sign In</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
