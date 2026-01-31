"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Users, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const menuItems = [
  { name: "Inventory", href: "/admin/dashboard", icon: Package },
  { name: "User Management", href: "/admin/users", icon: Users }, // Ensure this matches the folder name!
];

  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-slate-100 flex flex-col p-6 bg-white">
      <div className="mb-10 px-2">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Admin Panel</h2>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-all ${
                isActive 
                  ? "bg-black text-white" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-black"
              }`}
            >
              <item.icon size={16} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <button 
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all mt-auto"
      >
        <LogOut size={16} />
        Exit Admin
      </button>
    </aside>
  );
}