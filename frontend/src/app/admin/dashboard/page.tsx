"use client";
import React, { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProduct";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { AddProductModal } from "../AddProductModal";
import api from "@/utils/api";
import { refresh } from "next/dist/server/web/spec-extension/revalidate";
import { useRouter } from "next/navigation";
const handleDelete = async (productId: string) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    await api.delete(`/products/${productId}`);
    alert("Product removed from inventory.");
    refresh(); // Refresh the list automatically
  } catch (err) {
    alert("Failed to delete product.");
  }
};


export default function AdminDashboard() {
    const router=useRouter();
  const { products, loading, refresh } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await api.get("/auth/profile");
        
        // If the user exists but isn't an admin, send them home
        if (res.data.role !== "admin") {
          router.push("/"); 
        }
      } catch (err) {
        // If there's an error (like no token), send them to login
        router.push("/login");
      }
    };

    checkAdmin();
    setHasMounted(true);
  }, [router]);
  if (!hasMounted) {
    return null; 
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold tracking-tighter text-slate-900 uppercase">
          Inventory
        </h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-6 py-3 rounded-none text-xs font-bold uppercase tracking-widest"
        >
          <Plus size={16} className="mr-2" /> Add New Product
        </Button>
      </div>

      {products.map((product) => {
  // 1. Safety Check: If product is undefined, don't try to render it
  if (!product) return null; 

  return (
    <tr key={product._id || Math.random()} className="hover:bg-slate-50/50">
      <td className="p-5 flex items-center gap-4">
        {/* 2. Optional Chaining: product?.image */}
        <img src={product?.image} className="w-12 h-16 object-cover bg-slate-100" />
        <span className="font-medium text-sm">{product?.name || "Unnamed Product"}</span>
      </td>
      <td className="p-5 text-sm text-slate-500">{product?.category}</td>
      <td className="p-5 text-sm font-bold text-slate-900">${product?.price}</td>
      <td className="p-5 text-sm text-slate-500">{product?.stockQuantity} PCS</td>
      <td className="p-5 text-right">
        <button 
          onClick={() => product._id && handleDelete(product._id)} 
          className="text-slate-400 hover:text-red-600"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
})}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={refresh}
      />

      <button
        onClick={() => products[0] && handleDelete(products[0]._id)}
        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
