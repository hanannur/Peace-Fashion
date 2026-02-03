"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import api from "@/utils/api";
import { X } from "lucide-react";
import toast from "react-hot-toast"; // 1. Import toast

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddProductModal = ({
  isOpen,
  onClose,
  onSuccess,
}: AddProductModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    stockQuantity: "",
    isFeatured: false,
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const payload = { ...formData, price: Number(formData.price), stockQuantity: Number(formData.stockQuantity) };

  // This handles Loading, Success, and Error in 5 lines of code:
  toast.promise(api.post("/products", payload), {
    loading: 'Adding product...',
    success: 'Product added successfully!',
    error: (err) => err.response?.data?.message || 'Failed to add product',
  });

  onSuccess();
  onClose();
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200 ">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold uppercase tracking-tighter text-slate-900">
            Add New Item
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
              Product Name
            </label>
            <input
              required
              className="w-full p-3 border border-slate-200 text-sm focus:border-slate-900 outline-none"
              placeholder="e.g. Silk Abaya"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                Price ($)
              </label>
              <input
                required
                type="number"
                className="w-full p-3 border border-slate-200 text-sm focus:border-slate-900 outline-none"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                Stock Quantity
              </label>
              <input
                required
                type="number"
                className="w-full p-3 border border-slate-200 text-sm focus:border-slate-900 outline-none"
                placeholder="10"
                value={formData.stockQuantity}
                onChange={(e) =>
                  setFormData({ ...formData, stockQuantity: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                Category
              </label>
              <select
                className="w-full p-3 border border-slate-200 text-sm focus:border-slate-900 outline-none bg-white"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="">Select...</option>
                <option value="Abaya">Abaya</option>
                <option value="Khimar">Khimar</option>
                <option value="Niqab">Niqab</option>
                <option value="Burqa">Burqa</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
              Image URL
            </label>
            <input
              required
              className="w-full p-3 border border-slate-200 text-sm focus:border-slate-900 outline-none"
              placeholder="https://..."
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-sm">
            <input
              type="checkbox"
              id="isFeatured"
              className="w-4 h-4 accent-black cursor-pointer"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            />
            <label htmlFor="isFeatured" className="text-[10px] font-bold uppercase tracking-widest text-slate-600 cursor-pointer">
              Show in Landing Page Teasers
            </label>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              isLoading={loading}
              className="w-full py-4 bg-slate-900 text-white uppercase tracking-widest text-xs font-bold hover:bg-black"
            >
              Add to Inventory
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};