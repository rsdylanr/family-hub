import React from 'react';
import { Activity, Pill, HeartPulse, Map } from 'lucide-react';

export default function HealthSafety() {
  return (
    <section className="bg-red-950/10 border border-red-500/20 p-8 rounded-[3rem]">
      <h2 className="text-red-500 font-bold flex items-center gap-2 mb-6 tracking-tight">
        <HeartPulse size={20}/> Health & Safety
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-red-500/10">
          <Activity size={24} className="text-red-400 mb-2" />
          <span className="text-[10px] uppercase font-black">Pain Map</span>
        </button>
        <button className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-orange-500/10">
          <Pill size={24} className="text-orange-400 mb-2" />
          <span className="text-[10px] uppercase font-black">Med Expiry</span>
        </button>
      </div>
    </section>
  );
}
