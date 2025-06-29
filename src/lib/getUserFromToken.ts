import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserFromToken() {
  const cookieStore = await cookies(); // ⛔ DO NOT use await here
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}

export async function getToken() {
  const cookieStore = await cookies(); // ⛔ DO NOT use await here
  const token = cookieStore.get("token")?.value;
  return token || null;
}
