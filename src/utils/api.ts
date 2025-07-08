// src/utils/api.ts
import axios from "axios";

const BASE_URL = process.env.BASE_URL || "https://emmaculatecollege.com.ng/api";

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

export const getRequest = async (endpoint: string, options = {}) => {
  const token = getToken();
  try {
    const res = await axios.get(`${BASE_URL}${endpoint}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
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
