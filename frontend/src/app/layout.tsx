import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css"; 
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider"; // 🟢 Ensure this file exists

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
    // 🟢 suppressHydrationWarning is required for next-themes
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class" // 🟢 Tells Tailwind to look for the .dark class
          defaultTheme="system" // 🟢 Starts with user's OS preference
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar /> 
            <main className="flex-1 bg-background text-foreground transition-colors duration-300">
             <div className="w-full">
          {children}
        </div>
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}