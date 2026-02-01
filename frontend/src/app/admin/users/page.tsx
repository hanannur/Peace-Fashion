"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { Trash2 } from "lucide-react"; // Import the icon

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to permanentely remove this user?")) return;
    
    try {
      await api.delete(`/auth/users/${id}`);
      alert("User removed successfully.");
      fetchUsers(); // Refresh the list
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete user.");
    }
  };

  if (loading) return <div className="p-10 text-center uppercase text-[10px] tracking-widest">Fetching users...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold uppercase tracking-tighter mb-8">User Directory</h1>
      <div className="border border-slate-100 rounded-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 text-[10px] uppercase text-slate-400">Name</th>
              <th className="p-4 text-[10px] uppercase text-slate-400">Email</th>
              <th className="p-4 text-[10px] uppercase text-slate-400">Role</th>
              <th className="p-4 text-[10px] uppercase text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u: any) => (
              <tr key={u._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="p-4 text-sm font-medium">{u.name}</td>
                <td className="p-4 text-sm text-slate-500">{u.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${u.role === 'admin' ? 'bg-black text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleDeleteUser(u._id)}
                    className="text-slate-300 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}