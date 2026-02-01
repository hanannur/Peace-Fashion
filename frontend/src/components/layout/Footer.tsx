// // src/components/Footer.tsx
// import React from 'react';
// import Link from 'next/link';

// export const Footer = () => {
//   return (
//     <footer className="w-full bg-white border-t border-slate-100 py-12 px-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
//         {/* Brand Column */}
//         <div className="flex flex-col gap-4">
//           <h2 className="text-2xl font-bold tracking-tighter text-slate-900">
//             GENT<span className="text-slate-400">COLLECT.</span>
//           </h2>
//           <p className="text-[10px] uppercase tracking-widest text-slate-500">
//             The New Standard for the<br/>Modern Gentleman.
//           </p>
//         </div>

//         {/* Links Column 1 */}
//         <div className="flex flex-col gap-2">
//           <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Shop</h3>
//           <Link href="/login" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-black transition-colors">New Arrivals</Link>
//           <Link href="/login" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-black transition-colors">Best Sellers</Link>
//           <Link href="/login" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-black transition-colors">Accessories</Link>
//         </div>

//         {/* Links Column 2 */}
//         <div className="flex flex-col gap-2">
//           <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Support</h3>
//           <Link href="#" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-black transition-colors">FAQ</Link>
//           <Link href="#" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-black transition-colors">Returns</Link>
//           <Link href="#" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-black transition-colors">Contact</Link>
//         </div>

//         {/* Newsletter / Social */}
//         <div className="flex flex-col gap-4">
//           <h3 className="text-xs font-bold uppercase tracking-widest">Stay Updated</h3>
//           <div className="flex gap-2">
//              <input 
//                type="email" 
//                placeholder="EMAIL ADDRESS" 
//                className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs w-full focus:outline-none focus:border-black transition-all"
//              />
//              <button className="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800">
//                Join
//              </button>
//           </div>
//         </div>
//       </div>
      
//       <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center text-[9px] text-slate-400 uppercase tracking-widest">
//         <p>© 2024 GentCollect. All rights reserved.</p>
//         <div className="flex gap-4 mt-4 md:mt-0">
//           <Link href="#">Privacy Policy</Link>
//           <Link href="#">Terms of Service</Link>
//         </div>
//       </div>
//     </footer>
//   );
// };
// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-100 py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
        
        {/* Brand Column - Centered on mobile, Left on desktop */}
        <div className="flex flex-col gap-4 items-center sm:items-start text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-tighter text-slate-900">
            GENT<span className="text-slate-400">COLLECT.</span>
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 leading-loose">
            The New Standard for the<br className="hidden sm:block"/>Modern Gentleman.
          </p>
        </div>

        {/* Shop Column */}
        <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-left">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-slate-900">Shop</h3>
          <Link href="/login" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-black transition-colors">New Arrivals</Link>
          <Link href="/login" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-black transition-colors">Best Sellers</Link>
          <Link href="/login" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-black transition-colors">Accessories</Link>
        </div>

        {/* Support Column */}
        <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-left">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-slate-900">Support</h3>
          <Link href="#" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-black transition-colors">FAQ</Link>
          <Link href="#" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-black transition-colors">Returns</Link>
          <Link href="#" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-black transition-colors">Contact</Link>
        </div>

        {/* Newsletter Column */}
        <div className="flex flex-col gap-4 items-center sm:items-start w-full">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">Stay Updated</h3>
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-sm sm:max-w-none">
             <input 
               type="email" 
               placeholder="EMAIL ADDRESS" 
               className="bg-slate-50 border border-slate-200 px-4 py-3 text-xs w-full focus:outline-none focus:border-black transition-all uppercase tracking-widest"
             />
             <button className="bg-black text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95">
               Join
             </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em]">
          © 2024 GentCollect. All rights reserved.
        </p>
        <div className="flex gap-8 text-[9px] text-slate-400 uppercase tracking-[0.2em]">
          <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};