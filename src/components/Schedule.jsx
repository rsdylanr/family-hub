import React from 'react';
import { Calendar, Plus, X, Bell } from 'lucide-react';

export default function Schedule({ events, onAdd, onRemove }) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="md:col-span-2 lg:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-3"><Calendar size={24} className="text-purple-400"/> Schedule</h2>
        <button onClick={() => {
          const title = prompt("Event Name:");
          const date = prompt("Date (YYYY-MM-DD):");
          if(title && date) onAdd({ title, date });
        }} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full font-bold transition-all">
          <Plus size={18}/> Add Event
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((ev, i) => (
          <div key={i} className="bg-white/5 p-5 rounded-3xl border border-white/10 relative group">
            <div className="text-purple-400 font-bold mb-1 text-xs tracking-tighter">{ev.date}</div>
            <div className="text-lg font-medium">{ev.title}</div>
            {ev.date === today && (
              <div className="mt-2 flex items-center gap-2 text-xs text-yellow-400 animate-pulse font-bold">
                <Bell size={12}/> HAPPENING TODAY
              </div>
            )}
            <button onClick={() => onRemove(i)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-500 transition-all"><X size={16}/></button>
          </div>
        ))}
      </div>
    </section>
  );
}
