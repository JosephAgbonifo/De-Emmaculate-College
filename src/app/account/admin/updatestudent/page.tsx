"use client";
import React, { useState } from "react";
import Topbar from "@/src/components/admin/Topbar";
import { useUserStore } from "@/stores/useUserStore";
import { putRequest } from "@/src/utils/api"; // You need to define this if it's not already

export default function UpdateStudentPage() {
  const user = useUserStore((state) => state.user);

  const [formData, setFormData] = useState({
    reg_number: "",
    fullname: "",
    sex: "",
    email: "",
    image: null as File | null,
    address: "",
    phone: "",
    parentName: "",
    dateOfBirth: "",
    class: "",
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
      [name]: type === "file" ? files?.[0] ?? null : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.reg_number) {
      setError("Please enter the student's registration number.");
      return;
    }

    const fd = new FormData();
    if (formData.fullname) fd.append("fullname", formData.fullname);
    if (formData.sex) fd.append("sex", formData.sex);
    if (formData.email) fd.append("email", formData.email);
    if (formData.phone) fd.append("phone", formData.phone);
    if (formData.address) fd.append("address", formData.address);
    if (formData.class) fd.append("class", formData.class);
    if (formData.parentName) fd.append("parentName", formData.parentName);
    if (formData.dateOfBirth) fd.append("dateOfBirth", formData.dateOfBirth);
    if (formData.image) fd.append("image", formData.image);

    const regParam = formData.reg_number.replace(/\//g, "-");

    try {
      const data = await putRequest(`/student/${regParam}`, fd);
      console.log("Update successful:", data);
      setSuccess("Student updated successfully.");
      setError("");
    } catch (err: unknown) {
      console.error("Update failed:", err);
      setSuccess("");
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
        name={user?.fullname || "unauthorised"}
        role={user?.role || "unauthorised"}
      />

      <div className="min-h-screen p-4 md:w-[60%] mx-auto mt-10">
        <h1 className="text-xl font-bold mb-6">Update Student</h1>
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
            name="reg_number"
            value={formData.reg_number}
            onChange={handleChange}
            placeholder="Registration Number (e.g. 2023/JSS1/002)"
            className="border p-2 rounded md:col-span-2"
          />

          <input
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-2 rounded"
          />

          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Class</option>
            <option value="JSS1">JSS 1</option>
            <option value="JSS2">JSS 2</option>
            <option value="JSS3">JSS 3</option>
            <option value="SSS1">SSS 1</option>
            <option value="SSS2">SSS 2</option>
            <option value="SSS3">SSS 3</option>
          </select>

          <input
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            placeholder="Parent Name"
            className="border p-2 rounded"
          />

          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="border p-2 rounded"
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
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Parent's Number"
            className="border p-2 rounded"
          />

          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Home Address"
            className="border p-2 rounded"
          />

          <input
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            type="date"
            placeholder="Date of Birth"
            className="border p-2 rounded"
          />

          <div className="md:col-span-2">
            <label className="block mb-1">Upload Passport Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-cta text-white py-2 rounded md:col-span-2 hover:opacity-90"
          >
            Update Student
          </button>
        </form>
      </div>
    </div>
  );
}
