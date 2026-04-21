import React, { useState } from 'react';
import { QrCode, Mail, Trash2, Waves } from 'lucide-react';

export default function KitchenUtilities() {
  const [dishwasherClean, setDishwasherClean] = useState(false);
  const [mailArrived, setMailArrived] = useState(false);

  return (
    <section className="bg-white/5 border border-white/10 p-8 rounded-[3rem]">
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setDishwasherClean(!dishwasherClean)}
          className={`p-6 rounded-3xl border transition-all flex flex-col items-center ${dishwasherClean ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-800/40 border-white/5'}`}
        >
          <Waves className={dishwasherClean ? 'text-blue-400' : 'text-slate-600'} />
          <span className="mt-2 text-[10px] font-black uppercase tracking-widest">
            {dishwasherClean ? 'Dishes Clean' : 'Dishes Dirty'}
          </span>
        </button>

        <button 
          onClick={() => setMailArrived(!mailArrived)}
          className={`p-6 rounded-3xl border transition-all flex flex-col items-center ${mailArrived ? 'bg-orange-600/20 border-orange-500' : 'bg-slate-800/40 border-white/5'}`}
        >
          <Mail className={mailArrived ? 'text-orange-400' : 'text-slate-600'} />
          <span className="mt-2 text-[10px] font-black uppercase tracking-widest">
            {mailArrived ? "Mail's Here!" : "No Mail"}
          </span>
        </button>
      </div>
    </section>
  );
}
