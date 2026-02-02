// "use client";
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';
// import { Footer } from '@/components/layout/Footer';
// import { ArrowRight, Lock, ShoppingBag, Megaphone } from 'lucide-react'; // Added Megaphone
// import api from '@/utils/api';
// import { Product } from '@/types/product';

// // --- NEW COMPONENT: EVENT CARD ---
// const EventCard = ({ event }: { event: any }) => (
//   <div className="bg-slate-50 border border-slate-100 p-6 hover:bg-white hover:shadow-xl transition-all duration-300 group">
//     <div className="flex justify-between items-start mb-4">
//       <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white px-2 py-1">
//         {event.type || "Event"}
//       </span>
//       <span className="text-[10px] text-slate-400 font-mono">
//         {new Date(event.date).toLocaleDateString()}
//       </span>
//     </div>
//     <h3 className="text-sm font-bold uppercase tracking-tight text-slate-900 mb-2 group-hover:text-blue-600">
//       {event.title}
//     </h3>
//     <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
//       {event.description}
//     </p>
//   </div>
// );

// // Reusable Product Card
// const ProductCard = ({ product }: { product: Product }) => (
//   <div className="group bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-xl hover:shadow-slate-200/50 transition-all">
//     <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 mb-4">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
//       />
//       <button className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur shadow-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
//         <ShoppingBag size={18} className="text-slate-900" />
//       </button>
//     </div>
//     <div className="space-y-1">
//       <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-900">{product.name}</h3>
//       <p className="text-xs text-slate-400 font-medium">${product.price}</p>
//     </div>
//   </div>
// );

// export default function Home() {
//   const { user, loading: authLoading } = useAuth();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [teasers, setTeasers] = useState<Product[]>([]);
//   const [events, setEvents] = useState<any[]>([]); // 🟢 New State for Events
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState("All");

//   const categories = ["All", "Abaya", "Khimar", "Niqab" , "Burqa", "Accessories"];

//   // Fetch Events (For Everyone)
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const { data } = await api.get('/events');
//         setEvents(data.slice(0, 3)); // Show only top 3
//       } catch (err) {
//         console.error("Events fetch failed", err);
//       }
//     };
//     fetchEvents();
//   }, []);

//   // ... (Keep your existing Product/Teaser UseEffects here)

//   // VIEW 1: GUEST
//   if (!user && !authLoading) {
//     return (
//       <div className="min-h-screen flex flex-col bg-white">
//         <main className="flex-grow">
//           {/* HERO SECTION */}
//           <section className="flex flex-col items-center justify-center text-center px-4 py-20">
//             <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//               <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]">
//                 THE NEW<br />
//                 <span className="text-slate-400">STANDARD.</span>
//               </h1>
//               <p className="text-sm text-slate-600 max-w-lg mx-auto">
//                 Curated essentials for the modern gentleman. Join our exclusive community.
//               </p>
//               <div className="flex justify-center gap-4">
//                 <Link href="/login" className="bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest">
//                   Start Collecting
//                 </Link>
//               </div>
//             </div>
//           </section>

//           {/* 🟢 ANNOUNCEMENT SECTION FOR GUESTS */}
//           {events.length > 0 && (
//             <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-50">
//               <div className="flex items-center gap-2 mb-8">
//                 <Megaphone size={16} className="text-blue-600" />
//                 <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Latest Announcements</h2>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {events.map(event => <EventCard key={event._id} event={event} />)}
//               </div>
//             </section>
//           )}

//           {/* TEASER GRID */}
//           <div className="grid grid-cols-3 gap-4 mt-20 opacity-80 max-w-2xl mx-auto px-4 pb-20 grayscale">
//               {teasers.map((item, index) => (
//                 <div key={item._id} className={`aspect-[3/4] overflow-hidden rounded-lg bg-slate-100 ${index === 1 ? 'translate-y-8' : ''}`}>
//                   <img src={item.image} alt="Featured" className="w-full h-full object-cover" />
//                 </div>
//               ))}
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   // VIEW 2: LOGGED IN USER
//   return (
//     <div className="min-h-screen bg-slate-50">
//        {/* 🟢 ANNOUNCEMENT SECTION FOR USERS */}
//        {events.length > 0 && (
//         <div className="bg-blue-600 text-white py-3 px-6 text-center text-[10px] font-bold uppercase tracking-widest">
//           New Event: {events[0].title} — Check the dashboard for details.
//         </div>
//       )}

//       <section className="py-20 px-6 text-center bg-white border-b border-slate-100">
//         <h1 className="text-5xl font-light tracking-tighter uppercase mb-4">The New Standard</h1>
//         {/* ... (Category Navbar) */}
//       </section>

//       <main className="max-w-7xl mx-auto px-6 py-12">
//          {/* ... (Welcome User and Product Grid) */}
//       </main>
//     </div>
//   );
// }

// "use client";
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';
// import { Footer } from '@/components/layout/Footer';
// import { ArrowRight, Lock, ShoppingBag } from 'lucide-react';
// import api from '@/utils/api';
// import { Product } from '@/types/product';

// // Reusable Product Card for the Logged-in View
// const ProductCard = ({ product }: { product: Product }) => (
//   <div className="group bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-xl hover:shadow-slate-200/50 transition-all">
//     <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 mb-4">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
//       />
//       <button className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur shadow-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
//         <ShoppingBag size={18} className="text-slate-900" />
//       </button>
//     </div>
//     <div className="space-y-1">
//       <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-900">{product.name}</h3>
//       <p className="text-xs text-slate-400 font-medium">${product.price}</p>
//     </div>
//   </div>
// );

// export default function Home() {
//   const { user, loading: authLoading } = useAuth();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [teasers, setTeasers] = useState<Product[]>([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [events, setEvents] = useState<any[]>([]);

//   const categories = ["All", "Abaya", "Khimar", "Niqab" , "Burqa", "Accessories"];

//   // Fetch Teasers for Guests
//   useEffect(() => {
//     const fetchTeasers = async () => {
//       try {
//         const { data } = await api.get('/products/teasers');
//         setTeasers(data.slice(0, 3));
//       } catch (error) {
//         console.error("Teaser fetch failed", error);
//       }
//     };
//     if (!user && !authLoading) fetchTeasers();
//   }, [user, authLoading]);

//   // Fetch Full Products for Members
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setProductsLoading(true);
//         const { data } = await api.get('/products');
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setProductsLoading(false);
//       }
//     };
//     if (user) fetchProducts();
//   }, [user]);


//     useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const { data } = await api.get('/events');
//         setEvents(data);
//       } catch (error) {
//         console.error("Events fetch failed", error);
//       }
//     };
//     fetchEvents();
//   }, []);
//   const filteredProducts = activeCategory === "All" 
//     ? products 
//     : products.filter(p => p.category === activeCategory);

//   // Global Loading State
//   if (authLoading) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center bg-white">
//         <div className="animate-pulse text-xs font-bold tracking-widest uppercase">
//           Loading GENTCOLLECT...
//         </div>
//       </div>
//     );
//   }

//   // VIEW 1: GUEST (Landing Page)
//   if (!user) {
//     return (
//       <div className="min-h-screen flex flex-col bg-white">
        
//         <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20">
//           <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//             <div className="inline-flex items-center gap-2 border border-slate-200 rounded-full px-4 py-1.5 mb-6">
//               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
//               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
//                 New Collection Live
//               </span>
//             </div>

//             <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]">
//               THE NEW<br />
//               <span className="text-slate-400">STANDARD.</span>
//             </h1>

//             <p className="text-sm md:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
//               Curated essentials for the modern gentleman. Join our exclusive community to access premium collections, personalized drops, and member-only pricing.
//             </p>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
//               <Link 
//                 href="/login" 
//                 className="group flex items-center gap-2 bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all"
//               >
//                 Start Collecting
//                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//               </Link>
//               <Link 
//                 href="/login" 
//                 className="flex items-center gap-2 text-slate-500 hover:text-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors"
//               >
//                 <Lock size={14} />
//                 Member Login
//               </Link>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-4 mt-20 opacity-80 max-w-2xl w-full grayscale hover:grayscale-0 transition-all duration-700">
//             {teasers.length > 0 ? (
//               teasers.map((item, index) => (
//                 <div key={item._id} className={`aspect-[3/4] overflow-hidden rounded-lg bg-slate-100 ${index === 1 ? 'translate-y-8' : ''}`}>
//                   <img src={item.image} alt="Featured" className="w-full h-full object-cover" />
//                 </div>
//               ))
//             ) : (
//               <>
//                 <div className="aspect-[3/4] bg-slate-100 rounded-lg animate-pulse"></div>
//                 <div className="aspect-[3/4] bg-slate-200 rounded-lg translate-y-8 animate-pulse"></div>
//                 <div className="aspect-[3/4] bg-slate-100 rounded-lg animate-pulse"></div>
//               </>
//             )}
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   // VIEW 2: LOGGED IN USER (Dashboard)
//   return (
//     <div className="min-h-screen bg-slate-50">
//       <section className="py-20 px-6 text-center bg-white border-b border-slate-100">
//         <h1 className="text-5xl font-light tracking-tighter uppercase mb-4">The New Standard</h1>
        
//         {/* Category Navbar */}
//         <div className="flex justify-center gap-8 mt-12">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all pb-4 ${
//                 activeCategory === cat ? "text-black border-b border-black" : "text-slate-400 hover:text-black"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </section>

//       <main className="max-w-7xl mx-auto px-6 py-12">
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold tracking-tight">Welcome back, {user.name}</h2>
//           <p className="text-slate-500 text-sm mt-1">Viewing {activeCategory} Collections</p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {productsLoading ? (
//             [...Array(8)].map((_, i) => (
//               <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 animate-pulse">
//                 <div className="aspect-square bg-slate-100 rounded-xl mb-4" />
//                 <div className="h-4 bg-slate-100 rounded w-2/3 mb-2" />
//                 <div className="h-4 bg-slate-100 rounded w-1/3" />
//               </div>
//             ))
//           ) : (
//             filteredProducts.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))
//           )}
//         </div>

//         {!productsLoading && filteredProducts.length === 0 && (
//           <div className="text-center py-20 text-slate-400 uppercase text-[10px] tracking-widest">
//             No items found in {activeCategory}.
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Lock, ShoppingBag, Megaphone } from 'lucide-react';
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
  const [events, setEvents] = useState<any[]>([]); // State for announcements
  const [productsLoading, setProductsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Abaya", "Khimar", "Niqab" , "Burqa", "Accessories"];

  // Fetch Announcements (Public)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events');
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Fetch Teasers for Guests
  useEffect(() => {
    const fetchTeasers = async () => {
      try {
        const { data } = await api.get('/products/teasers');
        setTeasers(data.slice(0, 3));
      } catch (error) {
        console.error("Teaser fetch failed", error);
      }
    };
    if (!user && !authLoading) fetchTeasers();
  }, [user, authLoading]);

  // Fetch Full Products for Members
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setProductsLoading(false);
      }
    };
    if (user) fetchProducts();
  }, [user]);

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

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
        {/* NEW: Scrolling Announcement Marquee */}
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
                Start Collecting <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          //           <div className="grid grid-cols-3 gap-4 mt-20 opacity-80 max-w-2xl w-full grayscale hover:grayscale-0 transition-all duration-700">
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
            )}               </div>
        </main>
        <Footer />
      </div>
    );
  }

  // VIEW 2: LOGGED IN
  return (
    <div className="min-h-screen bg-slate-50">
      {/* NEW: Member Notification Banner */}
      {events.length > 0 && (
        <div className="bg-blue-600 text-white py-3 px-6 flex items-center justify-center gap-3">
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
            <p className="text-slate-500 text-sm mt-1">Viewing {activeCategory} Collections</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsLoading ? (
            [...Array(8)].map((_, i) => <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 animate-pulse aspect-square" />)
          ) : (
            filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)
          )}
        </div>
      </main>
    </div>
  );
}