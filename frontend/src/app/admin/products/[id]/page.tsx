"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

// Use the same minimalist black style we used for the dashboard
const toastStyle = {
  background: "#000",
  color: "#fff",
  fontSize: "10px",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  borderRadius: "0px",
  border: "1px solid #333",
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        // For a single product, res.data is usually the object itself
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
        toast.error("Piece unavailable", { style: toastStyle });
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleAddToBag = () => {
    if (!product || product.stockQuantity <= 0) {
      toast.error("Out of Stock", { style: toastStyle });
      return;
    }

    // Success feedback with the high-contrast style
    toast.success(`${product.name} added to bag`, {
      icon: "👜",
      style: toastStyle,
    });
  };

  if (loading)
    return (
      <div className="p-20 text-center uppercase tracking-[0.3em] text-[10px] animate-pulse">
        Refreshing Piece...
      </div>
    );

  if (!product)
    return (
      <div className="p-20 text-center uppercase tracking-[0.3em] text-[10px] text-slate-400">
        Piece not found.
      </div>
    );

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: Product Image */}
        <div className="bg-slate-50 aspect-[3/4] overflow-hidden border border-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400 mb-2">
            {product.category}
          </p>
          <h1 className="text-4xl font-light uppercase tracking-tighter text-slate-900 mb-6">
            {product.name}
          </h1>
          <p className="text-2xl font-bold text-slate-900 mb-8">
            ${product.price}
          </p>

          <div className="border-t border-b border-slate-100 py-10 mb-8">
            <p className="text-[11px] text-slate-500 leading-relaxed uppercase tracking-widest">
              {product.description ||
                "A refined essential for the modern wardrobe. Crafted with precision and minimal detail."}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <Button
              onClick={handleAddToBag}
              disabled={product.stockQuantity <= 0}
              className={`w-full py-7 uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-500 ${
                product.stockQuantity > 0
                  ? "bg-black text-white hover:bg-zinc-800"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {product.stockQuantity > 0 ? "Add to Bag" : "Sold Out"}
            </Button>

            <div className="flex items-center justify-center gap-2">
               <div className={`h-1.5 w-1.5 rounded-full ${product.stockQuantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
               <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em]">
                {product.stockQuantity > 0
                  ? `${product.stockQuantity} Pieces remaining`
                  : "Awaiting restock"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}