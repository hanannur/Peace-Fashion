"use client";
import React, { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Mail,
  Lock,
  Bell,
  ChevronRight,
  LogOut,
  Camera,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/utils/api"; 
import toast from "react-hot-toast"; // 1. Import toast

// Toast Style Constant to keep code clean
const toastStyle = {
  fontSize: "10px",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  borderRadius: "0px",
};

export default function ProfilePage() {
  const { user, setUser, logout } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!user)
    return (
      <div className="p-20 text-center uppercase tracking-widest text-[10px] text-muted-500">
        Loading Profile...
      </div>
    );

  const handleLogout = async () => {
    toast.success("Signed out successfully", { style: toastStyle });
    await logout();
    // Small delay so the user sees the logout toast
    setTimeout(() => {
      router.push("/");
    }, 800);
  };

  // 🟢 Logic for Image Upload with Promise Toast
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const uploadPromise = api.put("/api/users/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.promise(
      uploadPromise,
      {
        loading: "Uploading avatar...",
        success: "Profile picture updated!",
        error: (err) => err.response?.data?.message || "Upload failed.",
      },
      { style: toastStyle }
    );

    try {
      setIsUpdating(true);
      const response = await uploadPromise;
      setUser(response.data.user);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // 🟢 Logic for Password Update with Promise Toast
  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.", { style: toastStyle });
      return;
    }

    const passwordPromise = api.put("/auth/change-password", {
      newPassword: newPassword,
    });

    toast.promise(
      passwordPromise,
      {
        loading: "Updating security...",
        success: "Password updated successfully",
        error: (err) => err.response?.data?.message || "Error updating password.",
      },
      { style: toastStyle }
    );

    try {
      setIsUpdating(true);
      await passwordPromise;
      setNewPassword("");
      setIsChangingPass(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 transition-colors duration-300 ">
      <div className="mx-auto max-w-md space-y-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center border border-border overflow-hidden">
              {user.avatar ? (
                <img
                  src={`http://localhost:5000${user.avatar}`}
                  className="h-full w-full object-cover"
                  alt="Profile"
                />
              ) : (
                <User size={40} className="text-foreground" />
              )}
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUpdating}
              className="absolute bottom-0 right-0 bg-foreground p-1.5 rounded-full text-background border-2 border-background hover:scale-110 transition-transform disabled:bg-muted disabled:text-muted-foreground"
            >
              <Camera size={12} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] && handleImageUpload(e.target.files[0])
              }
            />
          </div>

          <div>
            <h1 className="text-xl font-bold uppercase tracking-tighter text-foreground">
              {user.name}
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              {user.email}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground px-1">
            Personal Information
          </h2>
          <div className="divide-y divide-border border-y border-border">
            <ProfileItem icon={<User size={16} />} label="Full Name" value={user.name} />
            <ProfileItem icon={<Mail size={16} />} label="Email" value={user.email} />
          </div>
        </section>

        {/* Settings Section */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground px-1">
            Account Settings
          </h2>
          <div className="divide-y divide-border border-y border-border">
            <ProfileItem
              icon={<Lock size={16} />}
              label="Change Password"
              value="Update security"
              onClick={() => setIsChangingPass(true)}
            />
            <ProfileItem
              icon={<Bell size={16} />}
              label="Notification Settings"
              value="Enabled"
              onClick={() => toast("Coming soon", { icon: '⏳', style: toastStyle })}
            />
          </div>
        </section>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 py-4 border border-border text-[10px] font-bold uppercase tracking-[0.3em] text-destructive hover:bg-muted  transition-all"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      {/* PASSWORD MODAL */}
      {isChangingPass && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card border border-border w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                Update Password
              </h2>
              <button onClick={() => setIsChangingPass(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-6">
              Minimum 6 characters required.
            </p>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="NEW PASSWORD"
                className="w-full text-xs border border-border bg-background text-foreground px-4 py-3 outline-none focus:border-foreground"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setIsChangingPass(false)}
                  className="flex-1 px-4 py-3 border border-bo  rder text-[10px] font-bold uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePassword}
                  disabled={isUpdating}
                  className="flex-1 bg-foreground text-background px-4 py-3 text-[10px] font-bold uppercase tracking-widest disabled:bg-muted disabled:text-muted-foreground"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileItem({ icon, label, value, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between py-4 px-1 group hover:bg-muted transition-colors text-left"
    >
      <div className="flex items-center gap-4">
        <div className="text-muted-foreground group-hover:text-foreground transition-colors">{icon}</div>
        <div className="flex flex-col">
          <span className="text-[8px] uppercase tracking-widest text-muted-foreground leading-none mb-1">{label}</span>
          <span className="text-xs text-foreground font-medium">{value || "Manage Settings"}</span>
        </div>
      </div>
      <ChevronRight size={14} className="text-muted-foreground" />
    </button>
  );
}