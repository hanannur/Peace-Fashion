"use client";
import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast"; // 1. Import toast

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const router = useRouter();
  const { setUser } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // 2. Create the registration promise
    const registerPromise = api.post("/auth/register", formData);

    // 3. Attach toast to the promise
    toast.promise(
      registerPromise,
      {
        loading: "Creating account...",
        success: "Account created successfully!",
        error: (err) => err.response?.data?.message || "Registration failed",
      },
      {
        style: {
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderRadius: "0px",
        },
      }
    );

    try {
      const res = await registerPromise;
      
      // Update the global auth state
      setUser(res.data.user); 
      
      // Redirect to home page
      router.push("/"); 
    } catch (err) {
      // Error is already handled by toast.promise
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-light uppercase tracking-tighter text-slate-900">Register</h2>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-slate-400">Join the collection</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="FULL NAME"
            className="w-full border-b border-slate-200 py-3 text-xs tracking-widest focus:border-black outline-none transition-colors"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            className="w-full border-b border-slate-200 py-3 text-xs tracking-widest focus:border-black outline-none transition-colors"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-full border-b border-slate-200 py-3 text-xs tracking-widest focus:border-black outline-none transition-colors"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button 
            type="submit"
            className="w-full bg-black py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:bg-slate-800 transition-colors"
          >
            Create Account
          </button>
        </form>
        
        <p className="text-center text-[10px] uppercase tracking-widest text-slate-400">
          Already have an account? <a href="/login" className="text-black font-bold underline">Login</a>
        </p>
      </div>
    </div>
  );
}