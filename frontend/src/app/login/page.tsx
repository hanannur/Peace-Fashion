"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast"; // 1. Import toast

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();

    // 2. Wrap the login in a promise toast
    const loginPromise = login({ email, password });

    toast.promise(
      loginPromise,
      {
        loading: "Authenticating...",
        success: "Welcome back!",
        error: (err) => err.message || "Login failed. Please check your credentials.",
      },
      {
        // Custom styling to match your minimalist aesthetic
        style: {
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderRadius: "0px",
        },
      }
    );

    try {
      await loginPromise;
      // 3. Redirect after success
      router.push("/");
    } catch (err) {
      // Errors are already handled by the toast.promise above
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-light uppercase tracking-tighter text-foreground">Sign In</h2>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">Enter your details below</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="EMAIL"
            className="w-full border-b border-border py-3 text-xs tracking-widest focus:border-black outline-none transition-colors"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="PASSWORD"
            className="w-full border-b border-border py-3 text-xs tracking-widest focus:border-black outline-none transition-colors"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button 
            type="submit"
            className="w-full bg-black py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:bg-muted  transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground">
          New here? <a href="/register" className="text-foreground font-bold underline">Create Account</a>
        </p>
      </div>
    </div>
  );
}