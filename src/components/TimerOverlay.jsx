import React from 'react';
import { XCircle } from 'lucide-react';

export default function TimerOverlay({ seconds, onStop }) {
  const format = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center">
      <div className="text-[30vw] font-black tracking-tighter mb-10 drop-shadow-2xl">
        {format(seconds)}
      </div>
      <button onClick={onStop} className="group flex items-center gap-3 bg-white/10 hover:bg-red-500/20 px-12 py-5 rounded-full text-2xl font-bold transition-all border border-white/10">
        <XCircle className="group-hover:text-red-500" /> STOP TIMER
      </button>
    </div>
  );
}
