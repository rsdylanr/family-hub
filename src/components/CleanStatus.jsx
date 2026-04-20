import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function CleanStatus() {
  const tasks = ["Dishes", "Counters", "Trash", "Floor"];
  const [done, setDone] = useState(() => JSON.parse(localStorage.getItem('clean_tasks')) || []);

  const toggle = (task) => {
    const next = done.includes(task) ? done.filter(t => t !== task) : [...done, task];
    setDone(next);
    localStorage.setItem('clean_tasks', JSON.stringify(next));
  };

  const progress = (done.length / tasks.length) * 100;

  return (
    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-green-500/10">
      <h2 className="text-green-400 font-bold flex items-center gap-2 mb-6 tracking-tight"><CheckCircle2 size={20}/> Kitchen Reset</h2>
      <div className="w-full bg-white/5 h-3 rounded-full mb-8 overflow-hidden">
        <div className="bg-green-500 h-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(34,197,94,0.4)]" style={{ width: `${progress}%` }} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {tasks.map(t => (
          <button key={t} onClick={() => toggle(t)} className={`p-4 rounded-xl text-xs font-bold border transition-colors ${done.includes(t) ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-white/5 border-white/5 text-slate-500'}`}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
