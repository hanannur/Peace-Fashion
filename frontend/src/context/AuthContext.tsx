"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import api from "@/utils/api";
import { User, LoginCredentials } from "@/types/user";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  // 🟢 STEP 1: Add setUser to the type definition
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
 



// useEffect(() => {
 // const checkAuth = async () => {
 const performClientLogout = useCallback(async () => {
    try {
    //  
    await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout request failed", error);
    
    } finally {
      
     
      setUser(null);
      router.replace("/");
    }
     }, [router]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);
      } catch {
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
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : "Login failed";
      throw new Error(message);
    }
  };

  const logout = async () => {
    await performClientLogout();
  };

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    const handleTabClose = () => {
      fetch("/auth/logout", {
        method: "POST",
        credentials: "include",
        keepalive: true,
      }).catch(() => {
        // No-op on tab close.
      });
    };
    window.addEventListener("pagehide", handleTabClose);
    return () => {
      window.removeEventListener("pagehide", handleTabClose);
    };
  }, [user]);

  return (
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