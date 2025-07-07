// src/utils/getSession.ts
import axios from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:8765/api";

export interface SimpleSession {
  session: string;
  term: string;
}

export const getSession = async (): Promise<SimpleSession> => {
  try {
    const response = await axios.get(`${BASE_URL}/session`, {
      withCredentials: true, // needed for cookie-based auth
    });

    const { session, term } = response.data;

    return { session, term };
  } catch (error) {
    console.error("Failed to fetch session info:", error);
    throw new Error("Could not retrieve session data");
  }
};
