// User type definition
export const metadata = {
  title: "Emmaculate",
  description: "Welcome to your space",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
