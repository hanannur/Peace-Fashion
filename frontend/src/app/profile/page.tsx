"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { User, Package, Settings, LogOut, Link as LinkIcon, Globe } from "lucide-react"; // Renamed Link icon to avoid conflict
import Link from "next/link"; // Import Next.js Link
import toast from "react-hot-toast"; // 1. Import toast

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Not logged in or error fetching profile");
        toast.error("Failed to load profile. Please sign in again."); // 2. Error toast
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    // 3. Feedback before redirect
    toast.success("Logged out successfully");
    
    // Clear your auth tokens here if you aren't using cookies
    //localStorage.removeItem("token"); 
    
    // Redirect
    setTimeout(() => {
      window.location.href = "/";
    }, 500); // Small delay so they see the toast
  };

  if (loading)
    return (
      <div className="p-20 text-center uppercase text-[10px] tracking-widest text-muted-foreground">
        Loading Account...
      </div>
    );

  if (!user) {
    return (
      <div className="p-20 text-center">
        <p className="mb-4 uppercase text-[10px] tracking-widest text-muted-foreground">
          Please log in to view your profile.
        </p>
        <Link href="/login" className="text-xs font-bold underline uppercase text-foreground hover:text-muted-foreground transition-colors">
          Login
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 text-foreground">
      <header className="mb-12 border-b border-border pb-8">
        <h1 className="text-3xl font-light uppercase tracking-tighter text-foreground">
          Account
        </h1>
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-2">
          Welcome back, {user.name}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <aside className="flex flex-col gap-6">
          <button className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-foreground">
            <User size={16} /> Personal Details
          </button>

          {/* Admin only: Link to Dashboard */}
          {user?.role === "admin" && (
            <Link 
              href="/admin/dashboard" 
              className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-foreground/80 hover:opacity-70 transition-opacity"
            >
              <Settings size={16} /> Admin Dashboard
            </Link>
          )}

          <Link 
            href="/" 
            className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe size={16} /> View Website
          </Link>

          <button className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            <Package size={16} /> Order History
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-destructive mt-4 hover:opacity-80 transition-opacity"
          >
            <LogOut size={16} /> Logout
          </button>
        </aside>

        <div className="md:col-span-2 space-y-8">
          <section>
            <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-2">
              Full Name
            </label>
            <p className="text-sm font-medium border-b border-border pb-2">
              {user?.name || "N/A"}
            </p>
          </section>

          <section>
            <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-2">
              Email Address
            </label>
            <p className="text-sm font-medium border-b border-border pb-2">
              {user?.email || "N/A"}
            </p>
          </section>

          <section>
            <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-2">
              Account Type
            </label>
            <p className="text-[10px] font-bold uppercase bg-muted px-2 py-1 inline-block">
              {user.role || "Customer"}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}