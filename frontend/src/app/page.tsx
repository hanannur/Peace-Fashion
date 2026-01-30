// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/Button";

// export default function HomePage() {

//   return (
//     <div className="flex flex-col">
//       {/* Hero Section */}
//       <section className="relative h-[90vh] flex items-center justify-center bg-[#fdfdfd] overflow-hidden">
//         {/* Subtle decorative background element */}
//         <div className="absolute top-20 -right-20 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50" />
//         <div className="absolute bottom-10 -left-10 w-72 h-72 bg-slate-100 rounded-full blur-3xl opacity-50" />

//         <div className="container mx-auto px-6 relative z-10 text-center">
//           <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 block animate-fade-in">
//             New Collection 2026
//           </span>
//           <h1 className="text-6xl md:text-8xl font-bold text-slate-900 tracking-tighter mb-8">
//             REFINED <br /> 
//             <span className="italic font-serif font-light text-slate-500">Minimalism.</span>
//           </h1>
//           <p className="max-w-xl mx-auto text-slate-500 text-lg mb-10 leading-relaxed">
//             Discover our curated selection of premium menswear, designed for the modern gentleman who values quality over quantity.
//           </p>
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <Link href="/products">
//               <Button className="w-full sm:w-auto px-10 py-6 text-base group">
//                 Shop Collection 
//                 <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </Link>
//             <Link href="/products?category=essentials">
//               <Button variant="outline" className="w-full sm:w-auto px-10 py-6 text-base">
//                 View Essentials
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Featured Section Placeholder */}
//       <section className="py-24 bg-white">
//         <div className="container mx-auto px-6">
//           <div className="flex justify-between items-end mb-12">
//             <div>
//               <h2 className="text-3xl font-bold text-slate-900">Featured Pieces</h2>
//               <p className="text-slate-500 mt-2">Handpicked for your wardrobe.</p>
//             </div>
//             <Link href="/products" className="text-sm font-semibold border-b-2 border-slate-900 pb-1 hover:text-slate-500 hover:border-slate-300 transition-all">
//               Browse All
//             </Link>
//           </div>
          
//           {/* We will populate this grid in the next step */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//              <div className="aspect-[3/4] bg-slate-50 animate-pulse rounded-sm" />
//              <div className="aspect-[3/4] bg-slate-50 animate-pulse rounded-sm" />
//              <div className="aspect-[3/4] bg-slate-50 animate-pulse rounded-sm" />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useProducts } from "../hooks/useProduct";
import { ProductCard } from "@/components/products/ProductCard";

export default function HomePage() {
  const { products, loading } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter products based on selected category
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const categories = ["All", "Shirts", "Jackets", "Accessories"];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-light tracking-tighter uppercase mb-4">The New Standard</h1>
        
        {/* Category Navbar */}
        <div className="flex justify-center gap-8 mt-12 border-b border-slate-100 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                activeCategory === cat ? "text-black border-b border-black pb-4" : "text-slate-400 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {filteredProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-20 text-slate-400 uppercase text-[10px] tracking-widest">
            No items found in this category.
          </div>
        )}
      </main>
    </div>
  );
}