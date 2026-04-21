import React from 'react';
import { Calculator, Landmark, Gift, CreditCard } from 'lucide-react';

export default function Wallet() {
  return (
    <section className="bg-green-950/10 border border-green-500/20 p-8 rounded-[3rem]">
      <h2 className="text-green-500 font-bold flex items-center gap-2 mb-6 tracking-tight">
        <Landmark size={20}/> Household Finance
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
          <span className="text-slate-400 text-sm">Isaac owes Dylan</span>
          <span className="text-green-400 font-black">$15.00</span>
        </div>
        <div className="flex justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
          <span className="text-slate-400 text-sm">Netflix (Trial)</span>
          <span className="text-red-400 font-bold italic">4 Days Left</span>
        </div>
      </div>
    </section>
  );
}
