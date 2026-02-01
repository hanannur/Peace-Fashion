// "use client";
// import React, { useState, useRef } from "react"; // 🟢 Added useRef
// import { useAuth } from "@/context/AuthContext";
// import {
//   User, Mail, Phone, Lock, Bell, Moon, ChevronRight, LogOut, Camera , X
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// import api from "@/utils/api";
// import axios from "axios";
// export default function ProfilePage() {
//   const { user, setUser, logout } = useAuth(); // 🟢 Combined destructuring
//   const [newPassword, setNewPassword] = useState("");
//   const [isChangingPass, setIsChangingPass] = useState(false); // 🟢 For the toggle
//   const fileInputRef = useRef<HTMLInputElement>(null); // 🟢 To trigger file pick
//   const router = useRouter();

//   if (!user) return <div className="p-20 text-center uppercase tracking-widest text-xs text-slate-400">Loading...</div>;

//   const handleLogout = async () => {
//     await logout();
//     router.push("/");
//   };

//   const handleImageUpload = async (file: File) => {
//     const formData = new FormData();
//     formData.append("avatar", file);

//     try {
//       const { data } = await api.put("/api/users/profile", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setUser(data.user); // Update context so the new image shows up
//       alert("Profile picture updated!");
//     } catch (err: any) {
//       alert("Image upload failed");
//     }
//   };
//   // 🟢 SINGLE logic for both Image and Password
//  const handleUpdateProfile = async () => {
//     if (!newPassword || newPassword.length < 6) {
//       alert("Password must be at least 6 characters.");
//       return;
//     }
//     try {
//       // Use your 'api' utility instead of raw 'axios' to ensure tokens are attached
//       const response = await api.put("/api/users/profile", {
//         password: newPassword
//       });

//       if (response.status === 200) {
//         alert("Password updated successfully!");
//         setNewPassword("");
//         setIsChangingPass(false);
//       }
//     } catch (err: any) {
//       alert(err.response?.data?.message || "Failed to update password.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white px-6 py-12">
//       <div className="mx-auto max-w-md space-y-10">

//         {/* Profile Header */}
//         <div className="flex flex-col items-center text-center space-y-4">
//           <div className="relative group">
//             <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
//               {user.avatar ? (
//                 <img src={`http://localhost:5000${user.avatar}`} className="h-full w-full object-cover" alt="Profile" />
//               ) : (
//                 <User size={40} className="text-slate-400" />
//               )}
//             </div>

//             {/* 🟢 CLICK THIS TO UPLOAD IMAGE */}
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               className="absolute bottom-0 right-0 bg-black p-1.5 rounded-full text-white border-2 border-white hover:scale-110 transition-transform"
//             >
//               <Camera size={12} />
//             </button>
//             <input
//               type="file"
//               ref={fileInputRef}
//               className="hidden"
//               accept="image/*"
//               onChange={(e) => e.target.files?.[0] && handleUpdateProfile(e.target.files[0])}
//             />
//           </div>

//           <div>
//             <h1 className="text-xl font-bold uppercase tracking-tighter text-slate-900">{user.name}</h1>
//             <p className="text-[10px] text-slate-400 uppercase tracking-widest">{user.email}</p>
//           </div>
//         </div>

//         {/* Personal Info */}
//         <section className="space-y-4">
//           <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 px-1">Personal Information</h2>
//           <div className="divide-y divide-slate-100 border-y border-slate-100">
//             <ProfileItem icon={<User size={16} />} label="Full Name" value={user.name} />
//             <ProfileItem icon={<Mail size={16} />} label="Email" value={user.email} />
//             {/* <ProfileItem icon={<Phone size={16} />} label="Phone" value="+1 (555) 012-3456" /> */}
//           </div>
//         </section>

//         {/* Account Settings */}
//         <section className="space-y-4">
//           <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 px-1">Account Settings</h2>
//           <div className="divide-y divide-slate-100 border-y border-slate-100">
//             <ProfileItem
//               icon={<Lock size={16} />}
//               label="Change Password"
//               onClick={() => setIsChangingPass(!isChangingPass)}
//             />

//             {/* 🟢 Password Input appears when clicked */}
//             {/* {isChangingPass && (
//               <div className="p-4 bg-slate-50 flex gap-2 animate-in slide-in-from-top-1">
//                 <input
//                   type="password"
//                   placeholder="New Password"
//                   className="flex-1 text-xs border border-slate-200 px-3 py-2 outline-none"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                 />
//                 <button
//                   onClick={() => handleUpdateProfile()}
//                   className="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase"
//                 >
//                   Update
//                 </button>
//               </div>
//             )} */}

//             {isChangingPass && (
//   <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//     <div className="bg-white w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
//           Update Password
//         </h2>
//         <button
//           onClick={() => setIsChangingPass(false)}
//           className="text-slate-400 hover:text-black transition-colors"
//         >
//           <X size={20} />
//         </button>
//       </div>

//       <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-6">
//         Please enter your new password below. It must be at least 6 characters.
//       </p>

//       {/* Input Field */}
//       <div className="space-y-4">
//         <div className="flex flex-col gap-2">
//           <input
//             type="password"
//             placeholder="NEW PASSWORD"
//             className="w-full text-xs border border-slate-200 px-4 py-3 outline-none focus:border-black transition-all"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-3 pt-2">
//           <button
//             onClick={() => setIsChangingPass(false)}
//             className="flex-1 px-4 py-3 border border-slate-200 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleUpdateProfile}
//             className="flex-1 bg-black text-white px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// )}

//             <ProfileItem icon={<Bell size={16} />} label="Notification Settings" />
//             <div className="flex items-center justify-between py-4 px-1">
//               {/* <div className="flex items-center gap-4 text-slate-400">
//                 <Moon size={16} />
//                 <span className="text-xs text-slate-600 font-medium">Dark Mode</span>
//               </div> */}
//               <div className="h-5 w-10 rounded-full bg-slate-100 border border-slate-200 p-0.5 relative cursor-pointer">
//                 <div className="h-full w-4 rounded-full bg-white shadow-sm border border-slate-200" />
//               </div>
//             </div>
//           </div>
//         </section>

//         <button
//           onClick={handleLogout}
//           className="flex w-full items-center justify-center gap-2 py-4 border border-slate-200 text-[10px] font-bold uppercase tracking-[0.3em] text-red-500 hover:bg-red-50 transition-all"
//         >
//           <LogOut size={14} /> Sign Out
//         </button>
//       </div>
//     </div>
//   );
// }

// // 🟢 Reusable Item Component
// function ProfileItem({ icon, label, value, onClick }: any) {
//   return (
//     <button onClick={onClick} className="flex w-full items-center justify-between py-4 px-1 group hover:bg-slate-50 transition-colors text-left">
//       <div className="flex items-center gap-4">
//         <div className="text-slate-400 group-hover:text-black transition-colors">{icon}</div>
//         <div className="flex flex-col">
//           <span className="text-[8px] uppercase tracking-widest text-slate-400 leading-none mb-1">{label}</span>
//           <span className="text-xs text-slate-700 font-medium">{value || "Manage Settings"}</span>
//         </div>
//       </div>
//       <ChevronRight size={14} className="text-slate-300" />
//     </button>
//   );
// }

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
import api from "@/utils/api"; // 🟢 Using your custom API utility for headers

export default function ProfilePage() {
  const { user, setUser, logout } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // 🟢 Added loading state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!user)
    return (
      <div className="p-20 text-center uppercase tracking-widest text-xs text-slate-400">
        Loading...
      </div>
    );

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // 🟢 Logic for Image Upload only
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setIsUpdating(true);
      const response = await api.put("/api/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update local context with new user data including avatar path
      setUser(response.data.user);
      alert("Profile picture updated!");
    } catch (err: any) {
      console.error("Upload error:", err);
      alert(err.response?.data?.message || "Failed to upload image.");
    } finally {
      setIsUpdating(false);
    }
  };

  // 🟢 Logic for Password Update only
  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsUpdating(true);

      // 🟢 Point to the specific "change-password" endpoint
      const response = await api.put("/auth/change-password", {
        newPassword: newPassword, // Matches the field name in our new controller
      });

      if (response.status === 200) {
        alert("Success: Your password has been changed.");
        setNewPassword("");
        setIsChangingPass(false);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Error updating password.");
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-md space-y-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
              {user.avatar ? (
                <img
                  src={`http://localhost:5000${user.avatar}`}
                  className="h-full w-full object-cover"
                  alt="Profile"
                />
              ) : (
                <User size={40} className="text-slate-400" />
              )}
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUpdating}
              className="absolute bottom-0 right-0 bg-black p-1.5 rounded-full text-white border-2 border-white hover:scale-110 transition-transform disabled:bg-slate-400"
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
            <h1 className="text-xl font-bold uppercase tracking-tighter text-slate-900">
              {user.name}
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
              {user.email}
            </p>
          </div>
        </div>

        {/* Personal Info Section */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 px-1">
            Personal Information
          </h2>
          <div className="divide-y divide-slate-100 border-y border-slate-100">
            <ProfileItem
              icon={<User size={16} />}
              label="Full Name"
              value={user.name}
            />
            <ProfileItem
              icon={<Mail size={16} />}
              label="Email"
              value={user.email}
            />
          </div>
        </section>

        {/* Account Settings Section */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 px-1">
            Account Settings
          </h2>
          <div className="divide-y divide-slate-100 border-y border-slate-100">
            {/* <ProfileItem 
              icon={<Lock size={16} />} 
              label="Change Password" 
              onClick={() => setIsChangingPass(true)} 
            />
            <ProfileItem icon={<Bell size={16} />} label="Notification Settings" /> 
            */}
            <ProfileItem
              icon={<Lock size={16} />}
              label="Change Password"
              value="Update your security" // 🟢 Added a value for better UX
              onClick={() => setIsChangingPass(true)}
            />

            <ProfileItem
              icon={<Bell size={16} />}
              label="Notification Settings"
              value="Enabled" // 🟢 Shows current status
              onClick={() => alert("Notification settings coming soon!")}
            />
          </div>
        </section>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 py-4 border border-slate-200 text-[10px] font-bold uppercase tracking-[0.3em] text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      {/* 🟢 PASSWORD POPUP MODAL */}
      {isChangingPass && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                Update Password
              </h2>
              <button
                onClick={() => setIsChangingPass(false)}
                className="text-slate-400 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-6">
              Minimum 6 characters required.
            </p>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="NEW PASSWORD"
                className="w-full text-xs border border-slate-200 px-4 py-3 outline-none focus:border-black transition-all"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setIsChangingPass(false)}
                  className="flex-1 px-4 py-3 border border-slate-200 text-[10px] font-bold uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePassword}
                  disabled={isUpdating}
                  className="flex-1 bg-black text-white px-4 py-3 text-[10px] font-bold uppercase tracking-widest disabled:bg-slate-600"
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
      className="flex w-full items-center justify-between py-4 px-1 group hover:bg-slate-50 transition-colors text-left"
    >
      <div className="flex items-center gap-4">
        <div className="text-slate-400 group-hover:text-black transition-colors">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] uppercase tracking-widest text-slate-400 leading-none mb-1">
            {label}
          </span>
          <span className="text-xs text-slate-700 font-medium">
            {value || "Manage Settings"}
          </span>
        </div>
      </div>
      <ChevronRight size={14} className="text-slate-300" />
    </button>
  );
}
