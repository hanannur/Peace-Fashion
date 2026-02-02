"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { User, Package, Settings, LogOut, Link, Globe } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile"); // Adjust endpoint to match your backend
        setUser(res.data);
      } catch (err) {
        console.error("Not logged in or error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="p-20 text-center uppercase text-[10px] tracking-widest">
        Loading Account...
      </div>
    );

  if (!user) {
    return (
      <div className="p-20 text-center">
        <p className="mb-4 uppercase text-[10px] tracking-widest text-slate-400">
          Please log in to view your profile.
        </p>
        <a href="/login" className="text-xs font-bold underline uppercase">
          Login
        </a>
      </div>
    );
  }

  const handleLogout = () => {
    //localStorage.removeItem("token"); // Clear the session
    window.location.href = "/"; // Redirect back to login
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className="mb-12 border-b border-slate-100 pb-8">
        <h1 className="text-3xl font-light uppercase tracking-tighter text-slate-900">
          Account
        </h1>
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-2">
          Welcome back, {user.name}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Navigation Sidebar */}
        {/* <aside className="flex flex-col gap-6">
          <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black">
            <User size={16} /> Personal Details
          </button>
          <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black">
            <Package size={16} /> Order History
          </button>
          <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black">
            <Settings size={16} /> Settings
          </button>
          <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 mt-4">
            <LogOut size={16} onClick={handleLogout} /> Logout
          </button>
        </aside> */}

        {/* Profile Content */}
        {/* Inside your ProfilePage component, near your other navigation buttons */}
        <aside className="flex flex-col gap-6">
          <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black">
            <User size={16} /> Personal Details
          </button>

          {/* --- ADD THIS BLOCK --- */}
          {user?.role === "admin" && (
            <a
              href="/admin/dashboard"
              className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Settings size={16} /> Admin Dashboard
            </a>
          )}
          {/* ---------------------- */}

          <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Package size={16} /> Order History
          </button>
          {/* Inside your profile side navigation area */}
<div className="flex flex-col gap-6">
  <button className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-black">
    <User size={16} /> Personal Details
  </button>

  {/* Admin only: Link to Dashboard */}
  {user?.role === "admin" && (
    <Link href="/admin/dashboard" className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-blue-600">
      <Settings size={16} /> Admin Dashboard
    </Link>
  )}

  {/* 🟢 NEW: Link back to the main website */}
  <Link href="/" className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-black transition-colors">
    <Globe size={16} /> View Website
  </Link>

  {/* ... other buttons like Logout ... */}
</div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-red-400 mt-4"
          >
            <LogOut size={16} /> Logout
          </button>
        </aside>
        <div className="md:col-span-2 space-y-8">
          <section>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2">
              Full Name
            </label>
            <p className="text-sm font-medium border-b border-slate-50 pb-2">
              {user?.name || "Loading..."}
            </p>
          </section>

          <section>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2">
              Email Address
            </label>
            <p className="text-sm font-medium border-b border-slate-50 pb-2">
              {user?.email || "Loading..."}
            </p>
          </section>

          <section>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2">
              Account Type
            </label>
            <p className="text-[10px] font-bold uppercase bg-slate-100 px-2 py-1 inline-block">
              {user.role || "Customer"}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
