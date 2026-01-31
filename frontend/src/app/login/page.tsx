"use client";
import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);
      //localStorage.setItem("token", res.data.token); // Store the JWT
      //alert("Welcome back.");
      router.push("/profile"); // Redirect to profile
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-light uppercase tracking-tighter text-slate-900">Sign In</h2>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-slate-400">Enter your details below</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="EMAIL"
            className="w-full border-b border-slate-200 py-3 text-xs  tracking-widest focus:border-black outline-none transition-colors"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-full border-b border-slate-200 py-3 text-xs  tracking-widest focus:border-black outline-none transition-colors"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button className="w-full bg-black py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:bg-slate-800 transition-colors">
            Login
          </button>
        </form>
        <p className="text-center text-[10px] uppercase tracking-widest text-slate-400">
          New here? <a href="/register" className="text-black font-bold underline">Create Account</a>
        </p>
      </div>
    </div>
  );
}