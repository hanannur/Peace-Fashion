"use client";
import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      alert("Account created successfully.");
      router.push("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
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
            className="w-full border-b border-slate-200 py-3 text-xs uppercase tracking-widest focus:border-black outline-none transition-colors"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            className="w-full border-b border-slate-200 py-3 text-xs uppercase tracking-widest focus:border-black outline-none transition-colors"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-full border-b border-slate-200 py-3 text-xs uppercase tracking-widest focus:border-black outline-none transition-colors"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button className="w-full bg-black py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}