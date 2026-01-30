"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push("/login"); // Redirect if not admin
    }
  }, [user, loading, router]);

//   if (loading || !user || user.role !== 'admin') {
//     return <div className="h-screen flex items-center justify-center">Loading Secure Dashboard...</div>;
//   }
    if (loading) return <div className="p-20 text-center">Loading session...</div>;

    return <section>{children}</section>;

//   return <div className="bg-slate-50 min-h-screen">{children}</div>;
}