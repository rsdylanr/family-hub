import React, { useState, useEffect } from 'react';
import { Clock, Timer as TimerIcon, MessageSquareQuote } from 'lucide-react';

// Import all the modular files you just created
import MartyTracker from './components/MartyTracker';
import StockGrid from './components/StockGrid';
import CleanStatus from './components/CleanStatus';
import HomeTech from './components/HomeTech';
import KitchenStatus from './components/KitchenStatus';
import PersonalHealth from './components/PersonalHealth';
import Schedule from './components/Schedule';
import Routine from './components/Routine';
import TimerOverlay from './components/TimerOverlay';

export default function App() {
  const [time, setTime] = useState(new Date());
  const [isIdle, setIsIdle] = useState(false);
  const [showRoutine, setShowRoutine] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  
  // Data Persistence
  const [grocery, setGrocery] = useState(() => JSON.parse(localStorage.getItem('grocery')) || []);
  const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem('events')) || []);

  const SCHOOL_LEAVE_TIME = "07:30";

  // Clock and Inactivity Logic
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    let idleTimer = setTimeout(() => setIsIdle(true), 180000); // 3 minutes

    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 180000);
    };

    window.addEventListener('click', resetIdle);
    window.addEventListener('touchstart', resetIdle);

    return () => {
      clearInterval(t);
      clearTimeout(idleTimer);
      window.removeEventListener('click', resetIdle);
      window.removeEventListener('touchstart', resetIdle);
    };
  }, []);

  // Sync Data to LocalStorage
  useEffect(() => {
    localStorage.setItem('grocery', JSON.stringify(grocery));
    localStorage.setItem('events', JSON.stringify(events));
  }, [grocery, events]);

  // Timer Logic
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
  }, [timerActive, timeLeft]);

  // School Morning Checks
  const isSchoolMorning = time.getHours() < 8 && time.getDay() !== 0 && time.getDay() !== 6;
  
  const getSchoolCountdown = () => {
    const [h, m] = SCHOOL_LEAVE_TIME.split(':');
    const target = new Date();
    target.setHours(h, m, 0);
    const diff = target - time;
    if (diff <= 0 || time.getDay() === 0 || time.getDay() === 6) return null;
    return `${Math.floor(diff / 60000)}m until departure`;
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-10 font-sans select-none overflow-x-hidden">
      
      {/* 1. SCREENSAVER CLOCK */}
      {isIdle && !timerActive && (
        <div onClick={() => setIsIdle(false)} className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-in fade-in duration-700">
          {isSchoolMorning && (
            <div className="mb-10 px-10 py-4 bg-red-600/20 border border-red-500 rounded-full text-red-500 font-black tracking-[0.4em] uppercase animate-pulse">
              TAKE YOUR PILLS
            </div>
          )}
          <div className="text-[35vw] font-thin tracking-tighter leading-none text-white/90">
            {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).split(' ')[0]}
          </div>
          <div className="text-blue-500 text-xl tracking-[1em] uppercase font-light opacity-40 mt-4">
            {getSchoolCountdown() || time.toLocaleDateString(undefined, { weekday: 'long' })}
          </div>
        </div>
      )}

      {/* 2. OVERLAYS */}
      {timerActive && <TimerOverlay seconds={timeLeft} onStop={() => setTimerActive(false)} />}
      {showRoutine && <Routine onClose={() => setShowRoutine(false)} />}

      {/* 3. MAIN DASHBOARD */}
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isIdle ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-slate-200">Reisbord Hub</h1>
            <button onClick={() => setIsIdle(true)} className="p-4 bg-white/5 rounded-[1.5rem] border border-white/10 hover:bg-white/10 transition-all">
              <Clock size={20} className="text-blue-500" />
            </button>
          </div>
          <button onClick={() => setShowRoutine(true)} className="bg-blue-600 px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20 text-xs">MORNING ROUTINE</button>
        </header>

        {/* TOP GRID: PRIMARY KITCHEN UTILITY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <MartyTracker />
          <KitchenStatus />
          <CleanStatus />
        </div>

        {/* MIDDLE GRID: HOME RECORDS & HEALTH */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <HomeTech />
          <PersonalHealth />
          <StockGrid grocery={grocery} onToggle={(item) => {
            const next = grocery.includes(item) ? grocery.filter(i => i !== item) : [...grocery, item];
            setGrocery(next);
          }} />
        </div>

        {/* BOTTOM GRID: TIMERS & SCHEDULE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
            <h2 className="text-blue-400 font-bold mb-6 flex items-center gap-2"><TimerIcon size={20}/> Kitchen Timers</h2>
            <div className="grid grid-cols-2 gap-3">
              {[5, 15, 30].map(m => (
                <button key={m} onClick={() => { setTimeLeft(m * 60); setTimerActive(true); }} className="py-4 bg-white/5 rounded-2xl border border-white/5 font-bold hover:bg-blue-500/20">{m}m</button>
              ))}
              <button onClick={() => { const m = prompt("Minutes:"); if(m) { setTimeLeft(m*60); setTimerActive(true); }}} className="bg-blue-600/20 border border-blue-500/30 rounded-2xl font-bold">Custom</button>
            </div>
          </section>

          <div className="lg:col-span-2">
            <Schedule 
              events={events} 
              onAdd={(ev) => setEvents([...events, ev])} 
              onRemove={(idx) => setEvents(events.filter((_, i) => i !== idx))} 
            />
          </div>
        </div>

        {/* FOOTER: FAMILY NOTE */}
        <div className="mt-8 bg-blue-600/5 p-10 rounded-[3rem] border-2 border-dashed border-blue-500/20 flex flex-col items-center justify-center group cursor-pointer hover:bg-blue-600/10 transition-all">
           <MessageSquareQuote size={20} className="text-blue-400 opacity-50 mb-2" />
           <p className="text-2xl font-light text-slate-300 italic text-center">"Don't forget to take the trash out before school!"</p>
        </div>
      </div>
    </div>
  );
}
