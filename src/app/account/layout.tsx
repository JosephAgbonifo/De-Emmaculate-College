// app/layout.tsx (or app/(auth)/layout.tsx)
import { getUserFromToken } from "@/src/lib/getUserFromToken";
import UserInitializer from "@/src/components/UserInitializer";

// User type definition
export interface User {
  fullname: string;
  class: string;
  role: string;
  status: string;
  email: string;
  reg_number?: string;
  parent_phone?: string;
  // Add other fields as needed
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromToken();

  return (
    <>
      {user && <UserInitializer user={user as User} />}
      {children}
    </>
  );
}
