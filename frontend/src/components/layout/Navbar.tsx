"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User as UserIcon, ShoppingBag, Menu, X, LayoutDashboard } from "lucide-react";
import { ModeToggle } from '@/components/ModeToggle';
export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const isActive = (path: string) => pathname === path;

  
  const getProfileLink = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/admin/dashboard";
    return `/${user._id || user._id}`; // Fallback prevents "undefined" URL
  };

  return (
    
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-border px-4 py-3 sm:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">

        {/* Brand Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-foreground transition-colors duration-300">
          HIJAB<span className="text-muted-foreground">STORE.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
          <Link href="/" className={`${isActive('/') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'} transition-colors`}>
            Home
          </Link>
          
        </div>

        {/* Action Icons & Auth Toggle */}
        <div className="flex items-center gap-4">
          <ModeToggle />


          {user ? (
            /* ✅ Logged In State */
            <div className="flex items-center gap-3">
              <Link href={getProfileLink()} className="flex items-center gap-2 group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${user.role === 'admin' ? 'bg-blue-100/80 border-blue-300 dark:bg-blue-950 dark:border-blue-900' : 'bg-muted border-border'}`}>
                  {user.role === "admin" ? (
                    <LayoutDashboard size={16} className="text-blue-600" />
                  ) : (
                    <UserIcon size={18} className="text--muted-foreground" />
                  )}
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground leading-none">
                    {user.name}
                  </span>
                  {user.role === "admin" && (
                    <span className="text-[8px] text-blue-500 font-bold uppercase tracking-tighter">Staff</span>
                  )}
                </div>

              </Link>

              
            </div>
            
          ) : (
            /* ⚪ Guest State (Visible at localhost:3000 initially) */
            <Link
              href="/login"
              className="px-6 py-2 border border-foreground text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all"
            >
              Login
            </Link>
          )}
         
          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-foreground">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border p-6 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-2 transition-colors duration-300">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest">Home</Link>
          <Link href="/products" onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest">Shop</Link>
          {user && (
            <Link href={getProfileLink()} onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest text-blue-600">
              {user.role === 'admin' ? 'Admin Dashboard' : 'My Account'}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};


