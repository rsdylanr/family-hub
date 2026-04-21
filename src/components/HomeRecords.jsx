import React, { useState } from 'react';
import { Droplet, Wind, ShieldAlert, Zap, FileText } from 'lucide-react';

export default function HomeRecords() {
  const [activeTab, setActiveTab] = useState('paint');

  const records = {
    paint: { icon: <Droplet/>, label: "Paint", data: "Kitchen: Sherwin Williams 'Sea Salt' (Hex: #CDD2C9)" },
    hvac: { icon: <Wind/>, label: "HVAC", data: "Main Return: 20x25x1. Last changed: April 1st." },
    utility: { icon: <Zap/>, label: "Utilities", data: "PECO Acct: 12345-6789. Support: 1-800-494-4000" }
  };

  return (
    <section className="bg-white/5 border border-white/10 p-8 rounded-[3rem]">
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {Object.entries(records).map(([key, val]) => (
          <button 
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === key ? 'bg-blue-600' : 'bg-white/5 opacity-50'}`}
          >
            {val.icon} {val.label}
          </button>
        ))}
      </div>
      <div className="p-6 bg-black/40 rounded-3xl border border-white/5 italic text-slate-300">
        {records[activeTab].data}
      </div>
    </section>
  );
}
