"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/auth/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Could not fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="p-20 text-center uppercase text-[10px] tracking-[0.3em]">Loading Users...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tighter uppercase mb-10">User Management</h1>
      
      <div className="overflow-x-auto border border-slate-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="p-5 text-[10px] uppercase tracking-widest text-slate-400">User</th>
              <th className="p-5 text-[10px] uppercase tracking-widest text-slate-400">Email</th>
              <th className="p-5 text-[10px] uppercase tracking-widest text-slate-400">Role</th>
              <th className="p-5 text-[10px] uppercase tracking-widest text-slate-400 text-right">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u: any) => (
              <tr key={u._id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="p-5 text-sm font-medium">{u.name}</td>
                <td className="p-5 text-sm text-slate-500">{u.email}</td>
                <td className="p-5">
                  <span className={`px-2 py-1 text-[9px] font-bold uppercase ${u.role === 'admin' ? 'bg-black text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-5 text-sm text-slate-400 text-right">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}