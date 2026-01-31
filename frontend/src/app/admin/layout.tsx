"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "./adminSidebar"; // Import your new sidebar

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if session is loaded and user is either not logged in or not an admin
    if (!loading && (!user || user.role !== 'admin')) {
      router.push("/login"); 
    }
  }, [user, loading, router]);

  // Show a clean loading state while verifying the admin session
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center uppercase text-[10px] tracking-[0.3em] text-slate-400">
        Authenticating Admin...
      </div>
    );
  }

  // Only render the sidebar and content if the user is confirmed as an admin
  if (!user || user.role !== 'admin') {
    return null; // Prevents UI flicker before redirect
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* This sidebar will now stay fixed on the left for all admin pages */}
      <AdminSidebar />
      
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}