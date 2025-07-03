// src/utils/api.ts
import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:8765/api";

// Inline token getter for client-side
const getToken = (): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; token=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export const postRequest = async (
  endpoint: string,
  data: unknown,
  options = {}
) => {
  const isForm = typeof FormData !== "undefined" && data instanceof FormData;
  const token = getToken();
  console.log("token", token);
  try {
    const res = await axios.post(`${BASE_URL}${endpoint}`, data, {
      withCredentials: true,
      headers: {
        ...(isForm ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...options,
    });

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data || err.message;
    }
    throw err;
  }
};
