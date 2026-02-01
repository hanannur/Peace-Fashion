"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User as UserIcon, ShoppingBag, Menu, X, LayoutDashboard } from "lucide-react";

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

  // 🟢 LOGIC: Determines where the circle icon takes the user
  const getProfileLink = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/admin/dashboard";
    return `/${user._id || user._id}`; // Fallback prevents "undefined" URL
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 px-4 py-3 sm:px-8sticky top-0 z-50 w-full bg-white border-b border-slate-100 px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">

        {/* Brand Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter text-slate-900">
          GENT<span className="text-slate-400">COLLECT.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
          <Link href="/" className={`${isActive('/') ? 'text-black' : 'text-slate-400 hover:text-black'} transition-colors`}>
            Home
          </Link>
          {/* <Link href="/products" className={`${isActive('/products') ? 'text-black' : 'text-slate-400 hover:text-black'} transition-colors`}>
            Shop All
          </Link> */}
        </div>

        {/* Action Icons & Auth Toggle */}
        <div className="flex items-center gap-4">
          {/* <button className="p-2 text-slate-700 hover:bg-slate-50 rounded-full transition-colors">
            <ShoppingBag size={20} />
          </button> */}

          {user ? (
            /* ✅ Logged In State */
            <div className="flex items-center gap-3">
              <Link href={getProfileLink()} className="flex items-center gap-2 group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${user.role === 'admin' ? 'bg-blue-50 border-blue-200' : 'bg-slate-100 border-slate-200'}`}>
                  {user.role === "admin" ? (
                    <LayoutDashboard size={16} className="text-blue-600" />
                  ) : (
                    <UserIcon size={18} className="text-slate-600" />
                  )}
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700 leading-none">
                    {user.name}
                  </span>
                  {user.role === "admin" && (
                    <span className="text-[8px] text-blue-500 font-bold uppercase tracking-tighter">Staff</span>
                  )}
                </div>
              </Link>

              {/* <button
                onClick={handleLogout}
                className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors ml-2"
              >
                Logout
              </button> */}
            </div>
          ) : (
            /* ⚪ Guest State (Visible at localhost:3000 initially) */
            <Link
              href="/login"
              className="px-6 py-2 border border-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-700">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-2">
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




// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter, usePathname } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// import {
//   User as UserIcon,
//   ShoppingBag,
//   Menu,
//   X,
//   LayoutDashboard,
// } from "lucide-react";
// import { ModeToggle } from "@/components/ModeToggle";
// export const Navbar = () => {
//   // 🟢 Added 'loading' to prevent flickering
//   const { user, logout, loading } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       router.push("/");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   const isActive = (path: string) => pathname === path;

//   // 🟢 LOGIC: Determines where the circle icon takes the user
//   const getProfileLink = () => {
//     if (!user) return "/login";
//     if (user.role === "admin") return "/admin/dashboard";
//     // 🟢 Fix: Checks both _id and id to ensure we never get "/undefined"
//     return `/${user._id || user._id}`;
//   };

//   return (
//     <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
//       <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
//         {/* Brand Logo */}
//         <Link
//           href="/"
//           className="text-2xl font-bold tracking-tighter text-slate-900"
//         >
//           GENT<span className="text-slate-400">COLLECT.</span>
//         </Link>
//       <nav className="border-b bg-background text-foreground transition-colors">
//                   <div className="container mx-auto flex h-16 items-center justify-between px-4">
                     

//                     <div className="flex items-center gap-4">
//                                             <ModeToggle /> {/* 🟢 This adds the Sun/Moon button */}
//                     </div>
//                   </div>
//                 </nav>   
//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
//           <Link
//             href="/"
//             className={`${isActive("/") ? "text-black" : "text-slate-400 hover:text-black"} transition-colors`}
//           >
//             Home
//           </Link>
//           {/* <Link href="/products" className={`${isActive('/products') ? 'text-black' : 'text-slate-400 hover:text-black'} transition-colors`}>
//             Shop All
//           </Link> */}
//         </div>

//         {/* Action Icons & Auth Toggle */}
//         <div className="flex items-center gap-4">
//           <button className="p-2 text-slate-700 hover:bg-slate-50 rounded-full transition-colors">
//             <ShoppingBag size={20} />
//           </button>

//           {/* 🟢 Wait for loading to finish before deciding what to show */}
//           {!loading &&
//             (user ? (
//               /* ✅ Logged In State */
//               <div className="flex items-center gap-3">
//                 <Link
//                   href={getProfileLink()}
//                   className="flex items-center gap-2 group"
//                 >
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${user.role === "admin" ? "bg-blue-50 border-blue-200" : "bg-slate-100 border-slate-200"}`}
//                   >
//                     {user.role === "admin" ? (
//                       <LayoutDashboard size={16} className="text-blue-600" />
//                     ) : (
//                       <UserIcon size={18} className="text-slate-600" />
//                     )}
//                   </div>
//                   <div className="hidden sm:flex flex-col">
//                     <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700 leading-none">
//                       {user.name}
//                     </span>
//                     {user.role === "admin" && (
//                       <span className="text-[8px] text-blue-500 font-bold uppercase tracking-tighter">
//                         Staff
//                       </span>
//                     )}
//                   </div>
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors ml-2"
//                 >
//                   Logout
//                 </button>
                 
//               </div>
//             ) : (
//               /* ⚪ Guest State */
//               <Link
//                 href="/login"
//                 className="px-6 py-2 border border-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
//               >
//                 Login
//               </Link>
//             ))}

//           {/* Mobile Menu Toggle */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 text-slate-700"
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {isOpen && (
//         <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-2">
//           <Link
//             href="/"
//             onClick={() => setIsOpen(false)}
//             className="text-xs font-bold uppercase tracking-widest"
//           >
//             Home
//           </Link>
//           <Link
//             href="/products"
//             onClick={() => setIsOpen(false)}
//             className="text-xs font-bold uppercase tracking-widest"
//           >
//             Shop
//           </Link>
//           {user && (
//             <Link
//               href={getProfileLink()}
//               onClick={() => setIsOpen(false)}
//               className="text-xs font-bold uppercase tracking-widest text-blue-600"
//             >
//               {user.role === "admin" ? "Admin Dashboard" : "My Account"}
//             </Link>
//           )}
//           {/* Added logout for mobile menu as well */}
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="text-left text-xs font-bold uppercase tracking-widest text-red-500"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };


// "use client";
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter, usePathname } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';
// import { User as UserIcon, ShoppingBag, Menu, X, LayoutDashboard } from "lucide-react";

// export const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       router.push('/');
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   const isActive = (path: string) => pathname === path;

//   // 🟢 LOGIC: Determines where the circle icon takes the user
//   const getProfileLink = () => {
//     if (!user) return "/login";
//     if (user.role === "admin") return "/admin/dashboard";
//     return `/${user._id || user._id}`; // Fallback prevents "undefined" URL
//   };

//   return (
//     <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
//       <div className="max-w-7xl mx-auto flex items-center justify-between h-14">

//         {/* Brand Logo */}
//         <Link href="/" className="text-2xl font-bold tracking-tighter text-slate-900">
//           GENT<span className="text-slate-400">COLLECT.</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
//           <Link href="/" className={`${isActive('/') ? 'text-black' : 'text-slate-400 hover:text-black'} transition-colors`}>
//             Home
//           </Link>
//           {/* <Link href="/products" className={`${isActive('/products') ? 'text-black' : 'text-slate-400 hover:text-black'} transition-colors`}>
//             Shop All
//           </Link> */}
//         </div>

//         {/* Action Icons & Auth Toggle */}
//         <div className="flex items-center gap-4">
//           <button className="p-2 text-slate-700 hover:bg-slate-50 rounded-full transition-colors">
//             <ShoppingBag size={20} />
//           </button>

//           {user ? (
//             /* ✅ Logged In State */
//             <div className="flex items-center gap-3">
//               <Link href={getProfileLink()} className="flex items-center gap-2 group">
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${user.role === 'admin' ? 'bg-blue-50 border-blue-200' : 'bg-slate-100 border-slate-200'}`}>
//                   {user.role === "admin" ? (
//                     <LayoutDashboard size={16} className="text-blue-600" />
//                   ) : (
//                     <UserIcon size={18} className="text-slate-600" />
//                   )}
//                 </div>
//                 <div className="hidden sm:flex flex-col">
//                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700 leading-none">
//                     {user.name}
//                   </span>
//                   {user.role === "admin" && (
//                     <span className="text-[8px] text-blue-500 font-bold uppercase tracking-tighter">Staff</span>
//                   )}
//                 </div>
//               </Link>

//               <button
//                 onClick={handleLogout}
//                 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors ml-2"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             /* ⚪ Guest State (Visible at localhost:3000 initially) */
//             <Link
//               href="/login"
//               className="px-6 py-2 border border-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
//             >
//               Login
//             </Link>
//           )}

//           {/* Mobile Menu Toggle */}
//           <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-700">
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {isOpen && (
//         <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-2">
//           <Link href="/" onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest">Home</Link>
//           <Link href="/products" onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest">Shop</Link>
//           {user && (
//             <Link href={getProfileLink()} onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest text-blue-600">
//               {user.role === 'admin' ? 'Admin Dashboard' : 'My Account'}
//             </Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// "use client";
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter, usePathname } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';
// import { User as UserIcon, ShoppingBag, Menu, X, LayoutDashboard } from "lucide-react";
// export const Navbar = () => {
// const { user, logout } = useAuth();
// const [isOpen, setIsOpen] = useState(false);
// const router = useRouter();
// const pathname = usePathname();
// const handleLogout = async () => {
// try {
// await logout();
// router.push('/');
// } catch (err) {
// console.error("Logout failed", err);
// }
// };
// const isActive = (path: string) => pathname === path;
// // 🟢 LOGIC: Determines where the circle icon takes the user
// const getProfileLink = () => {
// if (!user) return "/login";
// if (user.role === "admin") return "/admin/dashboard";
// return `/profile/${user._id || user._id}`; // Fallback prevents "undefined" URL
// };
// return (
// <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
// <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
// code
// Code
// {/* Brand Logo */}
//     <Link href="/" className="text-2xl font-bold tracking-tighter text-slate-900">
//       GENT<span className="text-slate-400">COLLECT.</span>
//     </Link>

//     {/* Desktop Navigation */}
//     <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
//       <Link href="/" className={`${isActive('/') ? 'text-black' : 'text-slate-400 hover:text-black'} transition-colors`}>
//         Home
//       </Link>
//       {/* <Link href="/products" className={`${isActive('/products') ? 'text-black' : 'text-slate-400 hover:text-black'} transition-colors`}>
//         Shop All
//       </Link> */}
//     </div>

//     {/* Action Icons & Auth Toggle */}
//     <div className="flex items-center gap-4">
//       <button className="p-2 text-slate-700 hover:bg-slate-50 rounded-full transition-colors">
//         <ShoppingBag size={20} />
//       </button>

//       {user ? (
//         /* ✅ Logged In State */
//         <div className="flex items-center gap-3">
//           <Link href={getProfileLink()} className="flex items-center gap-2 group">
//             <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${user.role === 'admin' ? 'bg-blue-50 border-blue-200' : 'bg-slate-100 border-slate-200'}`}>
//               {user.role === "admin" ? (
//                 <LayoutDashboard size={16} className="text-blue-600" />
//               ) : (
//                 <UserIcon size={18} className="text-slate-600" />
//               )}
//             </div>
//             <div className="hidden sm:flex flex-col">
//               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700 leading-none">
//                 {user.name}
//               </span>
//               {user.role === "admin" && (
//                 <span className="text-[8px] text-blue-500 font-bold uppercase tracking-tighter">Staff</span>
//               )}
//             </div>
//           </Link>

//           <button
//             onClick={handleLogout}
//             className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors ml-2"
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         /* ⚪ Guest State (Visible at localhost:3000 initially) */
//         <Link
//           href="/login"
//           className="px-6 py-2 border border-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
//         >
//           Login
//         </Link>
//       )}

//       {/* Mobile Menu Toggle */}
//       <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-700">
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>
//     </div>
//   </div>

//   {/* Mobile Menu Dropdown */}
//   {isOpen && (
//     <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-2">
//       <Link href="/" onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest">Home</Link>
//       <Link href="/products" onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest">Shop</Link>
//       {user && (
//         <Link href={getProfileLink()} onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest text-blue-600">
//           {user.role === 'admin' ? 'Admin Dashboard' : 'My Account'}
//         </Link>
//       )}
//     </div>
//   )}
// </nav>
// );
// };



// "use client";
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter, usePathname } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';
// import { User as UserIcon, ShoppingBag, Menu, X, LayoutDashboard } from "lucide-react";

// export const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       router.push('/');
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   const isActive = (path: string) => pathname === path;

//   // 🟢 LOGIC: Determines where the circle icon takes the user
//   const getProfileLink = () => {
//     if (!user) return "/login";
//     if (user.role === "admin") return "/admin/dashboard";
//     return `/${user._id || user._id}`; // Fallback prevents "undefined" URL
//   };

//   return (
//     <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
//       <div className="max-w-7xl mx-auto flex items-center justify-between h-14">

//         {/* Brand Logo */}
//         <Link href="/" className="text-2xl font-bold tracking-tighter text-slate-900">
//           GENT<span className="text-slate-400">COLLECT.</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
//           <Link href="/" className={`${isActive('/') ? 'text-black' : 'text-slate-400 hover:text-black'} transition-colors`}>
//             Home
//           </Link>
//           {/* <Link href="/products" className={`${isActive('/products') ? 'text-black' : 'text-slate-400 hover:text-black'} transition-colors`}>
//             Shop All
//           </Link> */}
//         </div>

//         {/* Action Icons & Auth Toggle */}
//         <div className="flex items-center gap-4">
//           <button className="p-2 text-slate-700 hover:bg-slate-50 rounded-full transition-colors">
//             <ShoppingBag size={20} />
//           </button>

//           {user ? (
//             /* ✅ Logged In State */
//             <div className="flex items-center gap-3">
//               <Link href={getProfileLink()} className="flex items-center gap-2 group">
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${user.role === 'admin' ? 'bg-blue-50 border-blue-200' : 'bg-slate-100 border-slate-200'}`}>
//                   {user.role === "admin" ? (
//                     <LayoutDashboard size={16} className="text-blue-600" />
//                   ) : (
//                     <UserIcon size={18} className="text-slate-600" />
//                   )}
//                 </div>
//                 <div className="hidden sm:flex flex-col">
//                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700 leading-none">
//                     {user.name}
//                   </span>
//                   {user.role === "admin" && (
//                     <span className="text-[8px] text-blue-500 font-bold uppercase tracking-tighter">Staff</span>
//                   )}
//                 </div>
//               </Link>

//               <button
//                 onClick={handleLogout}
//                 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors ml-2"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             /* ⚪ Guest State (Visible at localhost:3000 initially) */
//             <Link
//               href="/login"
//               className="px-6 py-2 border border-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
//             >
//               Login
//             </Link>
//           )}

//           {/* Mobile Menu Toggle */}
//           <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-700">
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {isOpen && (
//         <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-2">
//           <Link href="/" onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest">Home</Link>
//           <Link href="/products" onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest">Shop</Link>
//           {user && (
//             <Link href={getProfileLink()} onClick={() => setIsOpen(false)} className="text-xs font-bold uppercase tracking-widest text-blue-600">
//               {user.role === 'admin' ? 'Admin Dashboard' : 'My Account'}
//             </Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };  