"use client";
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { Product } from '@/types/product';
import { useAuth } from '@/context/AuthContext'; // 🟢 Import Auth

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth(); // 🟢 Check auth state

  const fetchProducts = async () => {
    // 🟢 Don't fetch if we are still checking auth or if there is no user
    if (authLoading || !user) return; 

    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
      setError(null);
    } catch (err: any) {
      // 🟢 Ignore 401s in the console for a cleaner experience
      if (err.response?.status !== 401) {
        console.error("Error fetching products:", err);
        setError(err.response?.data?.message || "Failed to load products");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user, authLoading]); // 🟢 Re-run when user status changes

  return { products, loading, error, refresh: fetchProducts };
};