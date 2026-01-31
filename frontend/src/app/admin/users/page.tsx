"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // This hits the getAllUsers function in your controller
        const res = await api.get("/auth/users"); 
        setUsers(res.data);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {users.map((u: any) => (
              <tr key={u._id} className="border-b border-slate-50 last:border-0">
                <td className="p-4 text-sm font-medium">{u.name}</td>
                <td className="p-4 text-sm text-slate-500">{u.email}</td>
                <td className="p-4">
                  <span className="bg-slate-100 px-2 py-0.5 text-[9px] font-bold uppercase rounded">
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}