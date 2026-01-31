"use client";
import React, { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProduct";
import { Plus, Trash2 } from "lucide-react";
import { AddProductModal } from "../AddProductModal";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const { products, loading, refresh } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // 1. Authentication Guard
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await api.get("/auth/profile");
        if (res.data.role !== "admin") {
          router.push("/");
        } else {
          setHasMounted(true);
        }
      } catch (err) {
        router.push("/login");
      }
    };
    checkAdmin();
  }, [router]);

  // 2. Delete Logic inside the component to access 'refresh'
  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${productId}`);
      alert("Product removed from inventory.");
      refresh(); 
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  if (!hasMounted || loading) {
    return <div className="p-20 text-center uppercase text-[10px] tracking-widest">Loading Dashboard...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold tracking-tighter uppercase">Inventory</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1a1f2e] text-white px-6 py-2 flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:bg-slate-800 transition-colors"
        >
          <Plus size={16} /> Add New Product
        </button>
      </div>

      {/* 3. Fixed Table Structure to prevent Hydration Error */}
      <div className="overflow-x-auto border border-slate-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="p-5 text-[10px] uppercase tracking-widest text-slate-400">Product</th>
              <th className="p-5 text-[10px] uppercase tracking-widest text-slate-400">Category</th>
              <th className="p-5 text-[10px] uppercase tracking-widest text-slate-400">Price</th>
              <th className="p-5 text-[10px] uppercase tracking-widest text-slate-400">Stock</th>
              <th className="p-5 text-right text-[10px] uppercase tracking-widest text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="p-5 flex items-center gap-4">
                  <img
                    src={product.image || "https://placehold.co/400x600?text=No+Image"}
                    alt={product.name}
                    className="w-12 h-16 object-cover bg-slate-100"
                  />
                  <span className="font-medium text-sm">{product.name}</span>
                </td>
                <td className="p-5 text-sm text-slate-500">{product.category}</td>
                <td className="p-5 text-sm font-bold text-slate-900">${product.price}</td>
                <td className="p-5 text-sm text-slate-500">{product.stockQuantity} PCS</td>
                <td className="p-5 text-right">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Modal Implementation */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          refresh();
        }}
      />
    </div>
  );
}