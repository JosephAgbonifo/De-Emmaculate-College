"use client";
import React, { useState } from "react";
import Topbar from "@/src/components/admin/Topbar";
import { useUserStore } from "@/stores/useUserStore";
import { postRequest } from "@/src/utils/api";

export default function StaffRegistrationPage() {
  const user = useUserStore((state) => state.user);

  const [formData, setFormData] = useState({
    fullname: "",
    sex: "",
    email: "",
    image: null,
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
    category: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const fd = new FormData();
    fd.append("fullname", formData.fullname);
    fd.append("sex", formData.sex);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    fd.append("address", formData.address);
    fd.append("password", formData.password);
    fd.append("category", formData.category);
    if (formData.image) fd.append("image", formData.image);

    try {
      const data = await postRequest("/staff", fd); // fd is your FormData
      console.log("Successful:", data);
      setSuccess("Staff created successfully");
      setError("");
    } catch (err: unknown) {
      console.error("Submission failed:", err);
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
      <Topbar name={user?.fullname || "unauthorised"} />

      <div className="min-h-screen p-4 md:w-[60%] mx-auto mt-10">
        <h1 className="text-xl font-bold mb-6">Register New Staff</h1>
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
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-2 rounded"
            required
          />

          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
            required
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border p-2 rounded"
            required
          />

          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Home Address"
            className="border p-2 rounded"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="FT">Full Time</option>
            <option value="PT">Part Time</option>
          </select>

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 rounded"
            required
          />

          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="border p-2 rounded"
            required
          />

          <div className="md:col-span-2">
            <label className="block mb-1">Upload Passport Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-cta text-white py-2 rounded md:col-span-2 hover:opacity-90"
          >
            Register Staff
          </button>
        </form>
      </div>
    </div>
  );
}
