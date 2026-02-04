"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Lock, ShoppingBag, Megaphone, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '@/utils/api';
import { Product } from '@/types/product';

// Reusable Product Card
const ProductCard = ({ product }: { product: Product }) => (
  <div className="group bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-xl hover:shadow-slate-200/50 transition-all">
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
);

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [teasers, setTeasers] = useState<Product[]>([]);
  const [events, setEvents] = useState<any[]>([]); 
  const [productsLoading, setProductsLoading] = useState(true);
  
  // 🟢 Pagination & Filter State
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Change this to show more/less items per page

  const categories = ["All", "Abaya", "Khimar", "Niqab" , "Burqa", "Accessories"];

  // Fetch Events (Announcements)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events');
        setEvents(data);
      } catch (error) { console.error("Failed to fetch events:", error); }
    };
    fetchEvents();
  }, []);

  // Fetch Teasers (Guest View)
  useEffect(() => {
    const fetchTeasers = async () => {
      try {
        const { data } = await api.get('/products/teasers');
        setTeasers(data.slice(0, 3));
      } catch (error) { console.error("Teaser fetch failed", error); }
    };
    if (!user && !authLoading) fetchTeasers();
  }, [user, authLoading]);

  // Fetch Full Products (Member View)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) { console.error("Error fetching products:", error); } finally {
        setProductsLoading(false);
      }
    };
    if (user) fetchProducts();
  }, [user]);

  // 🟢 Filter Logic
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // 🟢 Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  if (authLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="animate-pulse text-xs font-bold tracking-widest uppercase">Loading GENTCOLLECT...</div>
      </div>
    );
  }

  // VIEW 1: GUEST
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        {/* Scrolling Announcement Marquee */}
        {events.length > 0 && (
          <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap border-b border-white/10">
            <div className="inline-block animate-pulse px-4 text-[10px] font-bold uppercase tracking-[0.3em]">
              🔥 {events[0].title}: {events[0].description} — JOIN THE CLUB TO ENTER
            </div>
          </div>
        )}

        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 border border-slate-200 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">New Collection Live</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              THE NEW<br /><span className="text-slate-400">STANDARD.</span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
               Modesty is more than clothing — it’s a statement of faith and strength. Explore beautifully designed niqabs, khimars, abayas, and burqas made to honor your values without compromising style.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/login" className="flex items-center gap-2 bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all">
                Start Watching <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-20 opacity-80 max-w-2xl w-full grayscale hover:grayscale-0 transition-all duration-700">
            {teasers.length > 0 ? (
              teasers.map((item, index) => (
                <div key={item._id} className={`aspect-[3/4] overflow-hidden rounded-lg bg-slate-100 ${index === 1 ? 'translate-y-8' : ''}`}>
                  <img src={item.image} alt="Featured" className="w-full h-full object-cover" />
                </div>
              ))
            ) : (
              <>
                <div className="aspect-[3/4] bg-slate-100 rounded-lg animate-pulse"></div>
                <div className="aspect-[3/4] bg-slate-200 rounded-lg translate-y-8 animate-pulse"></div>
                <div className="aspect-[3/4] bg-slate-100 rounded-lg animate-pulse"></div>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // VIEW 2: LOGGED IN (With Pagination)
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Member Notification Banner */}
      {events.length > 0 && (
        <div className="bg-black text-white py-3 px-6 flex items-center justify-center gap-3">
          <Megaphone size={14} className="animate-bounce" />
          <p className="text-[10px] font-bold uppercase tracking-widest">
            {events[0].title}: <span className="font-medium opacity-90">{events[0].description}</span>
          </p>
        </div>
      )}

      <section className="py-20 px-6 text-center bg-white border-b border-slate-100">
        <h1 className="text-5xl font-light tracking-tighter uppercase mb-4">The New Standard</h1>
        <div className="flex justify-center gap-8 mt-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all pb-4 ${
                activeCategory === cat ? "text-black border-b border-black" : "text-slate-400 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back, {user.name}</h2>
            <p className="text-slate-500 text-sm mt-1">
              Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} items
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {productsLoading ? (
            [...Array(8)].map((_, i) => <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 animate-pulse aspect-square" />)
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-20 text-slate-400">No products found in this category.</div>
          ) : (
            paginatedProducts.map((product) => <ProductCard key={product._id} product={product} />)
          )}
        </div>

        {/* 🟢 Pagination Controls */}
        {!productsLoading && filteredProducts.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}