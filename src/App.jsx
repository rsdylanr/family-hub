import React, { useState, useEffect } from 'react';
import { Clock, Plus, Timer as TimerIcon } from 'lucide-react';

// Import Components
import MartyTracker from './components/MartyTracker';
import StockGrid from './components/StockGrid';
import Schedule from './components/Schedule';
import Routine from './components/Routine';
import TimerOverlay from './components/TimerOverlay';

export default function App() {
  const [time, setTime] = useState(new Date());
  const [isIdle, setIsIdle] = useState(false);
  const [showRoutine, setShowRoutine] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  
  // Persistence
  const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem('events')) || []);
  const [grocery, setGrocery] = useState(() => JSON.parse(localStorage.getItem('grocery')) || []);

  const SCHOOL_TIME = "07:30"; // Set your leave time

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('grocery', JSON.stringify(grocery));
    return () => clearInterval(t);
  }, [events, grocery]);

  // School Logic
  const isSchoolMorning = time.getHours() < 8 && time.getDay() !== 0 && time.getDay() !== 6;
  const getCountdown = () => {
    const [h, m] = SCHOOL_TIME.split(':');
    const target = new Date(); target.setHours(h, m, 0);
    const diff = target - time;
    return diff > 0 && time.getDay() !== 0 ? `${Math.floor(diff / 60000)}m until school` : null;
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-10 font-sans select-none overflow-hidden">
      
      {/* 1. SCREENSAVER CLOCK */}
      {isIdle && !timerActive && (
        <div onClick={() => setIsIdle(false)} className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-in fade-in duration-700">
          {isSchoolMorning && (
            <div className="mb-10 px-10 py-4 bg-red-600/20 border border-red-500 rounded-full text-red-500 font-black tracking-[0.4em] uppercase animate-pulse">
              TAKE YOUR PILLS
            </div>
          )}
          <div className="text-[32vw] font-thin tracking-tighter leading-none">
            {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).split(' ')[0]}
          </div>
          <div className="mt-4 text-blue-500/50 tracking-[1em] uppercase text-xl font-light">
            {getCountdown() || time.toLocaleDateString(undefined, { weekday: 'long' })}
          </div>
        </div>
      )}

      {/* 2. OVERLAYS */}
      {timerActive && <TimerOverlay seconds={timeLeft} onStop={() => setTimerActive(false)} />}
      {showRoutine && <Routine onClose={() => setShowRoutine(false)} />}

      {/* 3. MAIN DASHBOARD */}
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isIdle ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-6">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase text-slate-200">Reisbord Hub</h1>
            <button onClick={() => setIsIdle(true)} className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"><Clock size={20} className="text-blue-500" /></button>
          </div>
          <button onClick={() => setShowRoutine(true)} className="bg-blue-600 px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20">Morning Routine</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <MartyTracker />
          <StockGrid grocery={grocery} onToggle={(item) => {
            const next = grocery.includes(item) ? grocery.filter(i => i !== item) : [...grocery, item];
            setGrocery(next);
          }} />
          
          {/* QUICK TIMER BOX */}
          <section className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-blue-400 font-bold mb-6 flex items-center gap-2"><TimerIcon size={18}/> Timers</h2>
            <div className="grid grid-cols-2 gap-3">
              {[5, 15, 30].map(m => (
                <button key={m} onClick={() => { setTimeLeft(m * 60); setTimerActive(true); }} className="py-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-blue-500/20 font-bold">{m}m</button>
              ))}
              <button onClick={() => { const m = prompt("Minutes:"); if(m) { setTimeLeft(m*60); setTimerActive(true); }}} className="bg-blue-600/20 border border-blue-500/30 rounded-2xl font-bold">Custom</button>
            </div>
          </section>
        </div>

        <Schedule 
          events={events} 
          onAdd={(ev) => setEvents([...events, ev])} 
          onRemove={(idx) => setEvents(events.filter((_, i) => i !== idx))} 
        />
      </div>
    </div>
  );
}
