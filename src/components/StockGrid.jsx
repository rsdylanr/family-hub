import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function StockGrid({ grocery, onToggle }) {
  const essentials = ["Milk", "Eggs", "Bread", "Coffee", "Paper Towels", "Dog Food"];
  return (
    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
      <h2 className="text-orange-400 font-bold flex items-center gap-2 mb-6 tracking-tight"><ShoppingBag size={20}/> Kitchen Stock</h2>
      <div className="grid grid-cols-2 gap-3">
        {essentials.map(item => (
          <button key={item} onClick={() => onToggle(item)} 
            className={`py-5 rounded-2xl border text-sm font-bold transition-all ${grocery.includes(item) ? 'bg-orange-600/30 border-orange-500 text-white shadow-lg shadow-orange-900/20' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
