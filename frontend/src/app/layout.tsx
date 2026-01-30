import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css"; // or "./globals.css" - check your filename!
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GENTCOLLECT",
  description: "Refined Menswear Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* The Provider MUST go here to wrap all pages */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}