import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-border py-16 px-6 sm:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
        
        {/* Brand Column - Centered on mobile, Left on desktop */}
        <div className="flex flex-col gap-4 items-center sm:items-start text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground">
            HIJAB<span className="text-muted-foreground">STORE.</span>
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground leading-loose">
            The New Standard for the<br className="hidden sm:block"/>Modern Gentleman.
          </p>
        </div>

        {/* Shop Column */}
        <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-left">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-foreground">Shop</h3>
          <Link href="/login" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">New Arrivals</Link>
          <Link href="/login" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Best Sellers</Link>
          <Link href="/login" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Accessories</Link>
        </div>

        {/* Support Column */}
        <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-left">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-2 text-foreground">Support</h3>
          <Link href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
          <Link href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Returns</Link>
          <Link href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </div>

        {/* Newsletter Column */}
        <div className="flex flex-col gap-4 items-center sm:items-start w-full">
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Stay Updated</h3>
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-sm sm:max-w-none">
             <input 
               type="email" 
               placeholder="EMAIL ADDRESS" 
               className="bg-muted border border-border px-4 py-3 text-xs w-full focus:outline-none focus:border-foreground transition-all active:scale-95"
             />
             <button className="bg-primary text-white px-4 py-3 text-xs uppercase tracking-widest hover:bg-primary-dark transition-colors">
               Join
             </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em]">
          © 2024 GentCollect. All rights reserved.
        </p>
        <div className="flex gap-8 text-[9px] text-muted-foreground uppercase tracking-[0.2em]">
          <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};