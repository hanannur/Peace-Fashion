// // frontend/app/admin/add-event/page.tsx
// "use client";
// import { useState } from "react";
// import api from "@/utils/api";

// export default function AddEventPage() {
//   const [formData, setFormData] = useState({ title: "", description: "", type: "Giveaway" });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await api.post("/events", formData); // Ensure you add this route to backend server.ts
//       alert("Event added successfully!");
//       setFormData({ title: "", description: "", type: "Giveaway" });
//     } catch (err) {
//       alert("Error adding event");
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Add New Event</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
//         <input 
//           className="border p-2" 
//           placeholder="Title" 
//           onChange={(e) => setFormData({...formData, title: e.target.value})} 
//           value={formData.title} 
//         />
//         <textarea 
//           className="border p-2" 
//           placeholder="Description" 
//           onChange={(e) => setFormData({...formData, description: e.target.value})} 
//           value={formData.description}
//         />
//         <button className="bg-black text-white p-2">Create Event</button>
//       </form>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import { Megaphone, Trash2, Plus, Loader2 } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  description: string;
  type: string;
  date: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Giveaway'
  });

  const fetchEvents = async () => {
    try {
      const { data } = await api.get('/events');
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/events', formData);
      setFormData({ title: '', description: '', type: 'Giveaway' });
      fetchEvents();
    } catch (err) {
      alert("Error creating announcement");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter uppercase text-slate-900">Announcements</h1>
        <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-1">Manage landing page events and alerts</p>
      </div>

      {/* CREATE FORM */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 p-8 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
          <Plus size={14} /> New Announcement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            required
            placeholder="Event Title (e.g. Winter Sale)"
            className="p-3 border border-slate-100 text-sm focus:outline-none focus:border-black transition-colors"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <select 
            className="p-3 border border-slate-100 text-sm focus:outline-none focus:border-black"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
          >
            <option value="Giveaway">Giveaway</option>
            <option value="Sale">Sale</option>
            <option value="New Drop">New Drop</option>
            <option value="Notice">Notice</option>
          </select>
        </div>
        <textarea
          required
          placeholder="Short description for the landing page..."
          className="w-full p-3 border border-slate-100 text-sm h-24 focus:outline-none focus:border-black"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <button 
          disabled={isSubmitting}
          className="bg-black text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center gap-2 disabled:bg-slate-400"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={14} /> : "Post Announcement"}
        </button>
      </form>

      {/* EVENTS LIST */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Live Announcements</h2>
        {loading ? (
          <p className="text-center py-10 text-slate-400 animate-pulse text-xs">Syncing with server...</p>
        ) : events.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-100 text-slate-300 text-xs uppercase tracking-widest">
            No live announcements
          </div>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
              <div key={event._id} className="bg-white border border-slate-100 p-6 flex justify-between items-center group hover:border-blue-200 transition-all">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-slate-50 text-slate-400 group-hover:text-blue-600 transition-colors">
                    <Megaphone size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5">
                        {event.type}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900">{event.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 max-w-md">{event.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(event._id)}
                  className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 transition-all rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}