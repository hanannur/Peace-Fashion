"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "@/utils/api";
import { User, LoginCredentials } from "@/types/user";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  // 🟢 STEP 1: Add setUser to the type definition
  setUser: React.Dispatch<React.SetStateAction<User | null>>; 
  login: (credentials: LoginCredentials) => Promise<void>; 
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

 useEffect(() => {
  const checkAuth = async () => {
    try {
      // 🟢 Optional: Only fetch if a cookie might exist
      const res = await api.get("/auth/profile");
      setUser(res.data);
    } catch (err) {
      // Silently fail if not logged in
      setUser(null); 
    } finally {
      setLoading(false);
    }
  };
  checkAuth();
}, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const res = await api.post("/auth/login", credentials);
      setUser(res.data.user);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    // 🟢 STEP 2: Add setUser to the Provider value
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};