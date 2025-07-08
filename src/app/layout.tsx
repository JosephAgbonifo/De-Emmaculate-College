import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/general/Header";
import Footer from "@/src/components/general/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Emmaculate College",
  description:
    "Emmaculate College is a leading institution dedicated to academic excellence, character building, and holistic education.",
  authors: [
    { name: "Emmaculate College", url: "https://emmacollege.vercel.app" },
  ],
  creator: "Emmaculate College Team",
  keywords: [
    "Emmaculate College",
    "school portal",
    "student dashboard",
    "academic results",
    "Nigerian secondary school",
    "education",
    "e-learning",
    "Emmaculate",
  ],
  applicationName: "Emmaculate College Portal",
  metadataBase: new URL("https://emmacollege.vercel.app"),
  openGraph: {
    title: "Emmaculate College",
    description:
      "Access your academic results, communicate with staff, and stay informed — all on the Emmaculate College Portal.",
    url: "https://emmaculatecollege.com.ng",
    siteName: "Emmaculate College",
    images: [
      {
        url: "/og.png", // Make sure this exists in /public/images
        width: 1200,
        height: 630,
        alt: "Emmaculate College Portal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmaculate College",
    description:
      "Your official portal for Emmaculate College — results, messages, academic updates, and more.",
    site: "@emmaculatecollege", // Use real handle or leave as placeholder
    creator: "@emmaculatecollege",
    images: ["/images/emmaculate-og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-TileColor" content="#007BFF" />
      </head>
      <body
        className={`${poppins.variable} ${roboto.variable} font-roboto antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
