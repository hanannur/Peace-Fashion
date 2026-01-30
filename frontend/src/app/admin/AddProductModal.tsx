"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import api from "@/utils/api";
import { X } from "lucide-react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // To refresh the table after adding
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
    image: "", // We will use Image URLs for speed (e.g., Unsplash links)
    
    stockQuantity: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate manually to see exactly what is missing
    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.image 
    ) {
      alert("Please check all fields. One is empty!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        image: formData.image,
        
        stockQuantity: Number(formData.stockQuantity), // Provide a default stock value if it's not in your form
      };

      await api.post("/products", payload);

      alert("Success!");
      onSuccess();
      onClose();
    } catch (err: any) {
      // This will tell you exactly what the backend is complaining about
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
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
              placeholder="e.g. Italian Wool Suit"
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
              {/* NEW STOCK FIELD */}
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
                <option value="Suits">Suits</option>
                <option value="Shirts">Shirts</option>
                <option value="Pants">Pants</option>
                <option value="Shoes">Shoes</option>
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
            <p className="text-[10px] text-slate-400 mt-1">
              Tip: Use an image link from Unsplash for now.
            </p>
          </div>

          {/* <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
              Description
            </label>
            <textarea
              required
              className="w-full p-3 border border-slate-200 text-sm focus:border-slate-900 outline-none h-24 resize-none"
              placeholder="Describe the item details..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div> */}

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
