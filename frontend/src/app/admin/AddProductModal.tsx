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
    isFeatured: false,
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
  image: formData.image, // Still sending the URL string
  stockQuantity: Number(formData.stockQuantity),
  isFeatured: formData.isFeatured, // 🟢 Send the toggle value
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
      {/* 🟢 NEW: Featured Toggle for those 3 cards */}
<div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-sm">
  <input
    type="checkbox"
    id="isFeatured"
    className="w-4 h-4 accent-black cursor-pointer"
    checked={formData.isFeatured} // Make sure to add this to your useState initial state!
    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
  />
  <label htmlFor="isFeatured" className="text-[10px] font-bold uppercase tracking-widest text-slate-600 cursor-pointer">
    Show in Landing Page Teasers
  </label>
</div>
    </div>
  );
};


// "use client";
// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/Button";
// import api from "@/utils/api";
// import { X, Upload, Image as ImageIcon } from "lucide-react";

// interface AddProductModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }



// export const AddProductModal = ({
//   isOpen,
//   onClose,
//   onSuccess,
// }: AddProductModalProps) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     price: "",
//     stockQuantity: "",
//     isFeatured: false, // 🟢 New field for Landing Page Teasers
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault(); // 🟢 Always keep this to prevent page refresh

//   // 1. Validate manually - checking imageFile instead of formData.image
//   if (
//     !formData.name ||
//     !formData.category ||
//     !formData.price ||
//     !formData.stockQuantity ||
//     !imageFile // 🟢 Ensure the file state from our picker is present
//   ) {
//     alert("Please check all fields. One is empty!");
//     return;
//   }

//   setLoading(true);

//   try {
//     // 2. Prepare FormData (Required for Multer/Cloudinary)
//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("category", formData.category);
//     data.append("price", formData.price.toString());
//     data.append("stockQuantity", formData.stockQuantity.toString());
//     data.append("isFeatured", String(formData.isFeatured));
    
//     // 🟢 "image" must match upload.single('image') in your backend
//     data.append("image", imageFile); 

//     // 3. Send to Backend
//     await api.post("/products", data, {
//       headers: {
//         "Content-Type": "multipart/form-data", // 🟢 Tell the server to expect a file
//       },
//     });

//     alert("Product added successfully!");
//     onSuccess();
//     onClose();
    
//     // Optional: Clear image states
//     setImageFile(null);
//     setPreviewUrl(null);

//   } catch (err: any) {
//     console.error("Upload error:", err);
//     alert(err.response?.data?.message || "Failed to upload product");
//   } finally {
//     setLoading(false);
//   }
// };
  
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   if (!isOpen) return null;

//   // Handle Image Selection & Preview
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//       setPreviewUrl(URL.createObjectURL(file)); // Create local preview URL
//     }
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();

//   //   if (!formData.name || !formData.category || !formData.price || !imageFile) {
//   //     alert("Please check all fields, including the image!");
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   try {
//   //     // 🟢 Use FormData for Cloudinary Upload
//   //     const data = new FormData();
//   //     data.append("name", formData.name);
//   //     data.append("category", formData.category);
//   //     data.append("price", formData.price);
//   //     data.append("stockQuantity", formData.stockQuantity);
//   //     data.append("isFeatured", String(formData.isFeatured));
//   //     data.append("image", imageFile); // Must match upload.single('image')

//   //     await api.post("/products", data, {
//   //       headers: { "Content-Type": "multipart/form-data" }, //
//   //     });

//   //     alert("Success! Product added to collection.");
//   //     onSuccess();
//   //     onClose();
//   //     // Reset State
//   //     setFormData({ name: "", category: "", price: "", stockQuantity: "", isFeatured: false });
//   //     setImageFile(null);
//   //     setPreviewUrl(null);
//   //   } catch (err: any) {
//   //     alert(err.response?.data?.message || "Something went wrong");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//       <div className="bg-white w-full max-w-lg shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200 overflow-hidden rounded-sm">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
//           <h2 className="text-xl font-bold uppercase tracking-tighter text-slate-900">
//             Add New Item
//           </h2>
//           <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
//             <X size={24} />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
//           {/* 🟢 Custom Image Upload Area */}
//           <div 
//             onClick={() => fileInputRef.current?.click()}
//             className="relative h-48 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all overflow-hidden group"
//           >
//             {previewUrl ? (
//               <>
//                 <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest transition-opacity">
//                    Change Image
//                 </div>
//               </>
//             ) : (
//               <div className="text-center">
//                 <Upload className="mx-auto text-slate-300 mb-2" size={32} />
//                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Click to Upload Product Image</p>
//               </div>
//             )}
//             <input 
//               type="file" 
//               ref={fileInputRef} 
//               onChange={handleImageChange} 
//               className="hidden" 
//               accept="image/*" 
//             />
//           </div>

//           <div>
//             <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Product Name</label>
//             <input
//               required
//               className="w-full p-3 border border-slate-200 text-sm focus:border-slate-900 outline-none"
//               placeholder="e.g. Italian Wool Suit"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Price ($)</label>
//               <input
//                 required type="number"
//                 className="w-full p-3 border border-slate-200 text-sm focus:border-slate-900 outline-none"
//                 value={formData.price}
//                 onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//               />
//             </div>
//             <div>
//               <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Stock</label>
//               <input
//                 required type="number"
//                 className="w-full p-3 border border-slate-200 text-sm focus:border-slate-900 outline-none"
//                 value={formData.stockQuantity}
//                 onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Category</label>
//             <select
//               className="w-full p-3 border border-slate-200 text-sm focus:border-slate-900 outline-none bg-white"
//               value={formData.category}
//               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//               required
//             >
//               <option value="">Select...</option>
//               <option value="Suits">Suits</option>
//               <option value="Shirts">Shirts</option>
              
//               <option value="Shoes">Shoes</option>
//               <option value="Accessories">Accessories</option>
//             </select>
//           </div>

//           {/* 🟢 Landing Page Toggle */}
//           <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100">
//             <input
//               type="checkbox"
//               id="isFeatured"
//               className="w-4 h-4 accent-black cursor-pointer"
//               checked={formData.isFeatured}
//               onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
//             />
//             <label htmlFor="isFeatured" className="text-[10px] font-bold uppercase tracking-widest text-slate-600 cursor-pointer">
//               Show in Landing Page Teasers
//             </label>
//           </div>

//           <div className="pt-2">
//             <Button
//               type="submit"
//               isLoading={loading}
//               onClick={handleSubmit}
//               className="w-full py-4 bg-slate-900 text-white uppercase tracking-widest text-xs font-bold hover:bg-black transition-all"
//             >
//               Confirm and Upload
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };