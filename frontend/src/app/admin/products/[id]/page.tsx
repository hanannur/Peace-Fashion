"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast"; // 1. Import toast

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
        // 2. Error toast for fetching
        toast.error("Piece not found or unavailable.", {
          style: {
            fontSize: "10px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            borderRadius: "0px",
          },
        });
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  // 3. Add to Bag Function
  const handleAddToBag = () => {
    if (product.stockQuantity <= 0) {
      toast.error("This item is currently out of stock.");
      return;
    }

    // Logic for adding to cart would go here (context or state)
    
    toast.success(`${product.name} added to bag`, {
      icon: '👜', // Custom icon to match the shop theme
      style: {
        fontSize: "10px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        borderRadius: "0px",
      },
    });
  };

  if (loading) return <div className="p-20 text-center uppercase tracking-[0.3em] text-[10px] animate-pulse">Loading Piece...</div>;
  
  if (!product) return (
    <div className="p-20 text-center uppercase tracking-[0.3em] text-[10px] text-slate-400">
      Product not found.
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: Product Image */}
        <div className="bg-slate-50 aspect-[3/4] overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
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
            <Button 
              onClick={handleAddToBag} // 4. Attach handle
              disabled={product.stockQuantity <= 0}
              className={`w-full py-6 uppercase tracking-widest text-[10px] font-bold transition-all ${
                product.stockQuantity > 0 
                  ? "bg-black text-white hover:bg-slate-800" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              {product.stockQuantity > 0 ? "Add to Bag" : "Out of Stock"}
            </Button>
            
            <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">
              {product.stockQuantity > 0 
                ? `${product.stockQuantity} Units available` 
                : "Awaiting Restock"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}