"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // 🟢 Added import

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth(); // 🟢 Extract login function
  const router = useRouter();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     // 🟢 Use formData.email and formData.password to match your state
  //     await login({ 
  //       email: formData.email, 
  //       password: formData.password 
  //     }); 
      
  //     // 🟢 Redirects to home page upon success
  //     router.push("/"); 
  //   } catch (err: any) {
  //     // 🟢 Uses the error message thrown by your AuthContext
  //     alert(err.message || "Login failed"); 
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await login({ 
      email: formData.email.trim().toLowerCase(), 
      password: formData.password .trim()
    }); 
    
    // 🟢 Option A: Redirect to a static path like Home or Dashboard
    router.push("/"); 

    // 🟢 Option B: If you want to go straight to their profile, 
    // DO NOT use the 'user' state here. Use the response from the login if possible,
    // or wait for the refresh.
  } catch (err: any) {
    alert(err.message || "Login failed"); 
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