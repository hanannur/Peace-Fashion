"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api"; // Ensure your axios/api instance is here
import { Button } from "@/components/ui/Button";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="p-20 text-center uppercase tracking-widest text-[10px]">Loading Piece...</div>;
  if (!product) return <div className="p-20 text-center">Product not found.</div>;

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: Product Image */}
        <div className="bg-slate-50 aspect-[3/4] overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-2">{product.category}</p>
          <h1 className="text-4xl font-light uppercase tracking-tighter text-slate-900 mb-6">
            {product.name}
          </h1>
          <p className="text-2xl font-bold text-slate-900 mb-8">${product.price}</p>
          
          <div className="border-t border-b border-slate-100 py-8 mb-8">
            <p className="text-sm text-slate-600 leading-relaxed uppercase tracking-tight">
              {product.description || "A refined essential for the modern wardrobe. Crafted with precision and minimal detail."}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Button className="w-full bg-black text-white py-6 uppercase tracking-widest text-[10px] font-bold">
              Add to Bag
            </Button>
            <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">
              {product.stockQuantity > 0 ? `${product.stockQuantity} Units available` : "Out of Stock"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}