import React, { useState } from 'react';
import { Dog } from 'lucide-react';

export default function MartyTracker() {
  const [lastFed, setLastFed] = useState(localStorage.getItem('marty_fed') || "Not yet");
  const feed = () => {
    const t = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    setLastFed(t);
    localStorage.setItem('marty_fed', t);
  };
  return (
    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-amber-500/20 shadow-xl">
      <h2 className="text-amber-500 font-black italic flex items-center gap-2 mb-4 tracking-tight">MARTY <Dog size={20}/></h2>
      <div className="bg-black/20 p-4 rounded-2xl mb-4 border border-white/5">
        <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">Last Fed</p>
        <p className="text-2xl font-light text-white">{lastFed}</p>
      </div>
      <button onClick={feed} className="w-full py-5 bg-amber-600 hover:bg-amber-500 text-black font-black rounded-2xl transition-transform active:scale-95 shadow-lg shadow-amber-900/20">
        I FED HIM
      </button>
    </div>
  );
}
