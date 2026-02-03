// frontend/src/app/(public)/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";
import axios from "axios";
import toast from "react-hot-toast"; // 1. Import toast

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
        // 2. Error toast for the user
        toast.error("Unable to load the catalog. Please try again later.", {
            style: {
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '0px',
            }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 animate-pulse">
          Refreshing Collection...
        </p>
      </div>
    );

  if (products.length === 0)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
          No products found in this category.
        </p>
      </div>
    );

  return (
    <main className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-light uppercase tracking-tighter text-slate-900">
            Collections
          </h1>
          <div className="h-px w-12 bg-black mx-auto mt-4"></div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}