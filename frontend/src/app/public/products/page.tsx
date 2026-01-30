// frontend/src/app/(public)/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import {ProductCard} from "@/components/products/ProductCard";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <p className="text-center text-gray-600 mt-10">Loading products...</p>;

  if (products.length === 0)
    return <p className="text-center text-gray-600 mt-10">No products available.</p>;

  return (
    <main className="py-12 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
