import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Routine({ onClose }) {
  const items = ["Pills Taken", "School Keycard", "Headphones in Bag", "Lunch & Snacks Ready"];
  
  return (
    <div className="fixed inset-0 z-[110] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-[3rem] p-10 shadow-2xl">
        <h2 className="text-3xl font-black mb-8 text-blue-400 flex items-center gap-3">
          <ShieldCheck size={32}/> Ready?
        </h2>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <label key={idx} className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/10">
              <input type="checkbox" className="w-6 h-6 rounded-full border-2 border-white/20 appearance-none checked:bg-blue-500" />
              <span className="text-xl font-medium">{item}</span>
            </label>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-10 py-5 bg-blue-600 rounded-2xl font-bold text-xl">Finish Routine</button>
      </div>
    </div>
  );
}
