"use client";
import React, { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProduct";
import { Plus, Trash2 } from "lucide-react";
import { AddProductModal } from "../AddProductModal";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // 1. Import toast

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
          toast.error("Access Denied: Admin privileges required."); // Feedback for non-admins
          router.push("/");
        } else {
          setHasMounted(true);
        }
      } catch (err) {
        // If the session expired or token is invalid
        router.push("/login");
      }
    };
    checkAdmin();
  }, [router]);

  // 1. This function triggers the interactive Toast
const handleDelete = (productId: string, productName: string) => {
  toast((t) => (
    <div className="p-1">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-4">
        Remove <span className="underline">{productName}</span>?
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => {
            toast.dismiss(t.id);
            executeDelete(productId, productName);
          }}
          className="bg-white text-black px-4 py-2 text-[9px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors"
        >
          Confirm
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="bg-zinc-800 text-zinc-400 px-4 py-2 text-[9px] font-bold uppercase tracking-widest hover:bg-zinc-700"
        >
          Cancel
        </button>
      </div>
    </div>
  ), {
    duration: Infinity,
    position: 'top-center',
    // 🟢 JUST CHANGING THE BACKGROUND COLOR HERE
    style: {
      background: '#000000', // Solid Black
      color: '#ffffff',      // White text
      borderRadius: '0px',   // Square corners
      border: '1px solid #333', // Subtle border so it doesn't disappear
      padding: '12px',
    },
  });
};

const executeDelete = async (productId: string, productName: string) => {
  const deletePromise = api.delete(`/products/${productId}`);

  toast.promise(
    deletePromise,
    {
      loading: 'Deleting...',
      success: 'Removed',
      error: 'Error',
    },
    {
      style: {
        background: '#000', // Matches the confirmation toast
        color: '#fff',
        fontSize: '10px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        borderRadius: '0px',
      },
    }
  );

  try {
    await deletePromise;
    refresh();
  } catch (err) {
    console.error(err);
  }
};

  if (!hasMounted || loading) {
    return (
      <div className="p-20 text-center uppercase text-[10px] tracking-[0.3em] text-slate-400 animate-pulse">
        Syncing Dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
           <h1 className="text-3xl font-bold tracking-tighter uppercase text-slate-900">Inventory</h1>
           <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">Stock & Catalog Overview</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-6 py-3 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase hover:bg-slate-800 transition-colors"
        >
          <Plus size={16} /> Add New Product
        </button>
      </div>

      <div className="overflow-x-auto border border-slate-100 bg-white">
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
            {products.length === 0 ? (
                <tr>
                    <td colSpan={5} className="p-20 text-center text-[10px] uppercase tracking-widest text-slate-300">
                        Inventory is currently empty
                    </td>
                </tr>
            ) : (
                products.map((product) => (
                    <tr key={product._id} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors group">
                      <td className="p-5 flex items-center gap-4">
                        <div className="w-12 h-16 bg-slate-100 overflow-hidden">
                           <img
                            src={product.image || "https://placehold.co/400x600?text=No+Image"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <span className="font-bold text-xs uppercase tracking-tight text-slate-800">{product.name}</span>
                      </td>
                      <td className="p-5 text-[10px] uppercase tracking-widest text-slate-500">{product.category}</td>
                      <td className="p-5 text-sm font-bold text-slate-900">${product.price}</td>
                      <td className="p-5 text-[10px] uppercase font-bold text-slate-500">{product.stockQuantity} PCS</td>
                      <td className="p-5 text-right">
                        <button
                          onClick={() => handleDelete(product._id, product.name)} // Pass name for the confirmation toast
                          className="text-slate-300 hover:text-red-600 transition-colors p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
            )}
          </tbody>
        </table>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          refresh();
          // Success toast is handled inside the Modal component we edited earlier
        }}
      />
    </div>
  );
}