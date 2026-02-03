"use client";
import { useState } from "react";
import { useProducts } from "../../hooks/useProduct"; 
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { AddProductModal } from "./AddProductModal";
import api from "@/utils/api"; // Ensure api is imported
import toast from "react-hot-toast"; // 1. Import toast

export default function AdminDashboard() {
  const { products, loading, refresh } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Handle Delete with Toast
  const handleDelete = async (id: string, name: string) => {
    // Optional: Standard browser confirmation
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    // Use toast.promise to handle the API call states
    toast.promise(api.delete(`/products/${id}`), {
      loading: `Deleting ${name}...`,
      success: () => {
        refresh(); // Reload data
        return <b>{name} deleted!</b>;
      },
      error: (err) => {
        return err.response?.data?.message || "Could not delete product.";
      },
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-slate-900 uppercase">Inventory</h1>
          <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest">Product Management Control</p>
        </div>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-6 py-3 rounded-none flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-black transition-all"
        >
          <Plus size={16} /> Add New Product
        </Button>
      </div>

      <div className="bg-white border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Product</th>
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</th>
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Price</th>
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan={4} className="p-10 text-center text-slate-400">Loading inventory...</td></tr>
            ) : products.length === 0 ? (
               <tr><td colSpan={4} className="p-10 text-center text-slate-400">No products found. Add one!</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 bg-slate-100 flex-shrink-0 overflow-hidden">
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-semibold text-slate-800 text-sm">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-5 text-sm text-slate-500">{product.category}</td>
                  <td className="p-5 text-sm font-medium text-slate-900">${product.price}</td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id, product.name)} // 3. Link delete button
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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
          refresh(); 
          // Note: AddProductModal already triggers its own success toast
        }}
      />
    </div>
  );
}