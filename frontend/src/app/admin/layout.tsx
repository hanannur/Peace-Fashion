"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "./adminSidebar";
import { Menu } from "lucide-react"; // Import hamburger icon

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push("/login"); 
    }
  }, [user, loading, router]);

  if (loading) return <div className="h-screen flex items-center justify-center uppercase text-[10px] tracking-widest">Loading...</div>;
  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-white">
      {/* 🟢 Top Navigation Bar with Hamburger */}
      <header className="h-16 border-b border-slate-100 flex items-center px-6 sticky top-0 bg-white/80 backdrop-blur-md z-30">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors"
        >
          <Menu size={20} />
        </button>
        <span className="ml-4 text-[10px] font-bold uppercase tracking-[0.2em]">Dashboard</span>
      </header>

      <div className="flex">
        {/* Pass state to Sidebar */}
        <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}