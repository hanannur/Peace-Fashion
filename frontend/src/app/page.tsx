// // import Link from "next/link";
// // import { ArrowRight } from "lucide-react";
// // import { Button } from "@/components/ui/Button";

// // export default function HomePage() {

// //   return (
// //     <div className="flex flex-col">
// //       {/* Hero Section */}
// //       <section className="relative h-[90vh] flex items-center justify-center bg-[#fdfdfd] overflow-hidden">
// //         {/* Subtle decorative background element */}
// //         <div className="absolute top-20 -right-20 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50" />
// //         <div className="absolute bottom-10 -left-10 w-72 h-72 bg-slate-100 rounded-full blur-3xl opacity-50" />

// //         <div className="container mx-auto px-6 relative z-10 text-center">
// //           <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 block animate-fade-in">
// //             New Collection 2026
// //           </span>
// //           <h1 className="text-6xl md:text-8xl font-bold text-slate-900 tracking-tighter mb-8">
// //             REFINED <br /> 
// //             <span className="italic font-serif font-light text-slate-500">Minimalism.</span>
// //           </h1>
// //           <p className="max-w-xl mx-auto text-slate-500 text-lg mb-10 leading-relaxed">
// //             Discover our curated selection of premium menswear, designed for the modern gentleman who values quality over quantity.
// //           </p>
// //           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
// //             <Link href="/products">
// //               <Button className="w-full sm:w-auto px-10 py-6 text-base group">
// //                 Shop Collection 
// //                 <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
// //               </Button>
// //             </Link>
// //             <Link href="/products?category=essentials">
// //               <Button variant="outline" className="w-full sm:w-auto px-10 py-6 text-base">
// //                 View Essentials
// //               </Button>
// //             </Link>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Featured Section Placeholder */}
// //       <section className="py-24 bg-white">
// //         <div className="container mx-auto px-6">
// //           <div className="flex justify-between items-end mb-12">
// //             <div>
// //               <h2 className="text-3xl font-bold text-slate-900">Featured Pieces</h2>
// //               <p className="text-slate-500 mt-2">Handpicked for your wardrobe.</p>
// //             </div>
// //             <Link href="/products" className="text-sm font-semibold border-b-2 border-slate-900 pb-1 hover:text-slate-500 hover:border-slate-300 transition-all">
// //               Browse All
// //             </Link>
// //           </div>
          
// //           {/* We will populate this grid in the next step */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //              <div className="aspect-[3/4] bg-slate-50 animate-pulse rounded-sm" />
// //              <div className="aspect-[3/4] bg-slate-50 animate-pulse rounded-sm" />
// //              <div className="aspect-[3/4] bg-slate-50 animate-pulse rounded-sm" />
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// "use client";
// import { useState } from "react";
// import { useProducts } from "../hooks/useProduct";
// import { ProductCard } from "@/components/products/ProductCard";

// export default function HomePage() {
//   const { products, loading } = useProducts();
//   const [activeCategory, setActiveCategory] = useState("All");

//   // Filter products based on selected category
//   const filteredProducts = activeCategory === "All" 
//     ? products 
//     : products.filter(p => p.category === activeCategory);

//   const categories = ["All", "Shirts", "Jackets", "Accessories"];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <section className="py-20 px-6 text-center">
//         <h1 className="text-5xl font-light tracking-tighter uppercase mb-4">The New Standard</h1>
        
//         {/* Category Navbar */}
//         <div className="flex justify-center gap-8 mt-12 border-b border-slate-100 pb-4">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
//                 activeCategory === cat ? "text-black border-b border-black pb-4" : "text-slate-400 hover:text-black"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Product Grid */}
//       <main className="max-w-7xl mx-auto px-6 py-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {filteredProducts.map((p) => (
//             <ProductCard key={p._id} product={p} />
//           ))}
//         </div>
        
//         {filteredProducts.length === 0 && !loading && (
//           <div className="text-center py-20 text-slate-400 uppercase text-[10px] tracking-widest">
//             No items found in this category.
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Footer } from '@/components/layout/Footer'; 
import { ArrowRight, Lock, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import api  from '@/utils/api';
import { Product } from '@/types/product';


interface Products {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isFeatured?: boolean; // Optional property for the teaser logic
}
export default function Home() {
  const { user, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
const [productsLoading, setProductsLoading] = useState(true);
const [teasers, setTeasers] = useState<Product[]>([]);


// Define the shape of your product data

useEffect(() => {
  const fetchTeasers = async () => {
    try {
      // 🟢 Create a public route for teasers that doesn't require 'protect' middleware
      const { data } = await api.get('/products/teasers'); 
      setTeasers(data.slice(0, 3)); // Take only the first 3
    } catch (error) {
      console.error("Teaser fetch failed", error);
    }
  };
  if (!user) fetchTeasers();
}, [user]);
useEffect(() => {
  const fetchProducts = async () => {
    try {
      // 🟢 Assuming your backend route is /products
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setProductsLoading(false);
    }
  };

  if (user) fetchProducts(); // Only fetch if user is logged in
}, [user]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="animate-pulse text-xs font-bold tracking-widest uppercase">Loading GENTCOLLECT...</div>
      </div>
    );
  }

  // 🔴 VIEW 1: GUEST (Landing Page)
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 border border-slate-200 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">New Collection Live</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              THE NEW<br />
              <span className="text-slate-400">STANDARD.</span>
            </h1>

            <p className="text-sm md:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
              Curated essentials for the modern gentleman. Join our exclusive community to access premium collections, personalized drops, and member-only pricing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/login" 
                className="group flex items-center gap-2 bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all"
              >
                Start Collecting
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/login" 
                className="flex items-center gap-2 text-slate-500 hover:text-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors"
              >
                <Lock size={14} />
                Member Login
              </Link>
            </div>
          </div>
          
          {/* Visual "Teaser" Grid (Optional - adds style) */}
          {/* <div className="grid grid-cols-3 gap-4 mt-20 opacity-50 max-w-2xl w-full grayscale mask-linear-fade">
             <div className="aspect-[3/4] bg-slate-100 rounded-lg"></div>
             <div className="aspect-[3/4] bg-slate-200 rounded-lg translate-y-8"></div>
             <div className="aspect-[3/4] bg-slate-100 rounded-lg"></div>
          </div> */}
          <div className="grid grid-cols-3 gap-4 mt-20 opacity-80 max-w-2xl w-full grayscale hover:grayscale-0 transition-all duration-700 mask-linear-fade">
  {teasers.length > 0 ? (
    teasers.map((item, index) => (
      <div 
        key={item._id} 
        className={`aspect-[3/4] overflow-hidden rounded-lg bg-slate-100 ${index === 1 ? 'translate-y-8' : ''}`}
      >
        <img 
          src={item.image} 
          alt="Featured" 
          className="w-full h-full object-cover" 
        />
      </div>
    ))
  ) : (
    /* Fallback to your skeletons if no teasers found */
    <>
      <div className="aspect-[3/4] bg-slate-100 rounded-lg animate-pulse"></div>
      <div className="aspect-[3/4] bg-slate-200 rounded-lg translate-y-8 animate-pulse"></div>
      <div className="aspect-[3/4] bg-slate-100 rounded-lg animate-pulse"></div>
    </>
  )}
</div>
        </main>

        {/* 🟢 Footer is only visible on Landing Page */}
        <Footer />
      </div>
    );
  }

  // 🟢 VIEW 2: LOGGED IN USER (The "Working" App)
  return (
    <div className="min-h-screen bg-slate-50">
      {/* This is where your Dashboard / Product Feed goes */}
      <div className="max-w-7xl mx-auto px-4 py-12">
         <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Welcome back, {user.name}</h2>
              <p className="text-slate-500 text-sm mt-1">Here is what is trending today.</p>
            </div>
         </div>
         
         {/* Example Product Grid Placeholder */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {productsLoading ? (
    // 🟢 Skeleton Loaders
    [...Array(4)].map((_, i) => (
      <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 animate-pulse">
        <div className="aspect-square bg-slate-100 rounded-xl mb-4" />
        <div className="h-4 bg-slate-100 rounded w-2/3 mb-2" />
        <div className="h-4 bg-slate-100 rounded w-1/3" />
      </div>
    ))
  ) : (
    products.map((product) => (
      <div key={product._id} className="group bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-xl hover:shadow-slate-200/50 transition-all">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 mb-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
          <button className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur shadow-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ShoppingBag size={18} className="text-slate-900" />
          </button>
        </div>
        <div className="space-y-1">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-900">{product.name}</h3>
          <p className="text-xs text-slate-400 font-medium">${product.price}</p>
        </div>
      </div>
    ))
  )}
</div>
      </div>
    
    </div>
  );
}