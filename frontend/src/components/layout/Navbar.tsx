"use client";
import Link from "next/link";
import { User, ShoppingBag, Menu } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-slate-900">
          GENT<span className="text-slate-400">COLLECT.</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-slate-600">
          <Link href="/products" className="hover:text-slate-900 transition-colors">Shop All</Link>
          <Link href="/products?category=new" className="hover:text-slate-900 transition-colors">New Arrivals</Link>
          <Link href="/products?category=essentials" className="hover:text-slate-900 transition-colors">Essentials</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <Link href="/login" className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-700">
            <User size={20} />
          </Link>
          {/* We'll add a cart icon here later even if just for UI visual */}
          <button className="md:hidden p-2 text-slate-700">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};