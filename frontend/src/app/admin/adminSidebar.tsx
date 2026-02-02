// "use client";
// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Package, Users, LogOut, X, Home } from "lucide-react"; // Added Home icon
// import { useAuth } from "@/context/AuthContext";

// interface SidebarProps {
//   isOpen: boolean;
//   setIsOpen: (open: boolean) => void;
// }

// export default function AdminSidebar({ isOpen, setIsOpen }: SidebarProps) {
//   const pathname = usePathname();
//   const { logout } = useAuth();

//   const menuItems = [
//     { name: "Inventory", href: "/admin/dashboard", icon: Package },
//     { name: "User Management", href: "/admin/users", icon: Users },
//   ];

//   return (
//     <>
//       {/* Overlay: Clicks outside to close */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar Drawer */}
//       <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-100 z-50 transition-transform duration-300 ease-in-out transform ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       }`}>
//         <div className="flex items-center justify-between p-6">
//           <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Admin Panel</h2>
//           <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-black">
//             <X size={20} />
//           </button>
//         </div>

//         <nav className="flex-1 px-4 space-y-1">
//           {/* 🟢 Back to Website Link */}
//           <Link
//             href="/"
//             onClick={() => setIsOpen(false)}
//             className="flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-all mb-4 border-b border-slate-50"
//           >
//             <Home size={16} />
//             View Website
//           </Link>

//           {menuItems.map((item) => {
//             const isActive = pathname === item.href;
//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setIsOpen(false)} // Close on navigate
//                 className={`flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-all ${
//                   isActive 
//                     ? "bg-black text-white" 
//                     : "text-slate-500 hover:bg-slate-50 hover:text-black"
//                 }`}
//               >
//                 <item.icon size={16} />
//                 {item.name}
//               </Link>
//             );
//           })}
//         </nav>

//         <div className="p-4 border-t border-slate-50">
//           <button 
//             onClick={logout}
//             className="flex items-center gap-3 px-4 py-3 w-full text-[11px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
//           >
//             <LogOut size={16} />
//             Exit Admin
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }


"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Users, LogOut, X, Home, Megaphone } from "lucide-react"; 
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const menuItems = [
    { name: "Inventory", href: "/admin/dashboard", icon: Package },
    { name: "Announcements", href: "/admin/events", icon: Megaphone }, // 🟢 Added this!
    { name: "User Management", href: "/admin/users", icon: Users },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-100 z-50 transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Admin Panel</h2>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-black">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-all mb-4 border-b border-slate-50"
          >
            <Home size={16} />
            View Website
          </Link>

          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
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

        <div className="p-4 border-t border-slate-50">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-[11px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={16} />
            Exit Admin
          </button>
        </div>
      </aside>
    </>
  );
}