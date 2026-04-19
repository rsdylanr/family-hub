import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, CheckCircle, ShoppingCart, Clock, Plus, X, Bell, XCircle } from 'lucide-react';

export default function App() {
  const [chores, setChores] = useState(() => JSON.parse(localStorage.getItem('chores')) || []);
  const [grocery, setGrocery] = useState(() => JSON.parse(localStorage.getItem('grocery')) || []);
  const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem('events')) || []);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [time, setTime] = useState(new Date());
  
  // SCREENSAVER STATE
  const [isIdle, setIsIdle] = useState(false);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // IDLE TIMER LOGIC (3 Minutes)
  useEffect(() => {
    let idleTimer;
    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 180000); // 180,000ms = 3 mins
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('touchstart', resetIdle);
    window.addEventListener('click', resetIdle);

    resetIdle(); // Start timer on mount

    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('touchstart', resetIdle);
      window.removeEventListener('click', resetIdle);
      clearTimeout(idleTimer);
    };
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('chores', JSON.stringify(chores));
    localStorage.setItem('grocery', JSON.stringify(grocery));
    localStorage.setItem('events', JSON.stringify(events));
  }, [chores, grocery, events]);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-4 md:p-10 overflow-hidden select-none">
      
      {/* SCREENSAVER / BIG CLOCK OVERLAY */}
      {(isIdle && !timerActive) && (
        <div 
          onClick={() => setIsIdle(false)}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700 cursor-pointer"
        >
          <div className="text-[30vw] font-thin tracking-tighter leading-none text-white/90">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </div>
          <div className="text-blue-500 text-2xl tracking-[1em] uppercase font-light mt-4 opacity-50">
            {time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      )}

      {/* FULL SCREEN TIMER OVERLAY */}
      {timerActive && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-3xl flex flex-col items-center justify-center animate-in fade-in duration-500">
          <div className="text-[25vw] font-black tracking-tighter leading-none mb-10 drop-shadow-2xl">
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={() => setTimerActive(false)}
            className="group flex items-center gap-3 bg-white/5 hover:bg-red-500/20 border border-white/10 px-12 py-4 rounded-full text-2xl font-medium transition-all"
          >
            <XCircle className="group-hover:text-red-500 transition-colors" /> Stop Timer
          </button>
        </div>
      )}

      {/* MAIN DASHBOARD UI */}
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isIdle ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-black tracking-tighter italic bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
              REISBORD HUB
            </h1>
            <button 
              onClick={() => setIsIdle(true)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Close to Clock"
            >
              <Clock size={20} className="text-slate-500" />
            </button>
          </div>
          <div className="text-right">
             <p className="text-2xl font-light">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
             <p className="text-blue-500 text-[10px] tracking-[0.2em] uppercase font-bold">System Dashboard</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* CHORES */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2"><CheckCircle size={20} className="text-green-400"/> Chores</h2>
              <button onClick={() => {
                const task = prompt("New Chore:");
                if(task) setChores([...chores, {id: Date.now(), text: task}]);
              }} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><Plus size={18}/></button>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {chores.map(c => (
                <div key={c.id} onClick={() => setChores(chores.filter(x => x.id !== c.id))} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 cursor-pointer hover:bg-red-500/10 transition-all group">
                  <div className="w-5 h-5 border border-white/30 rounded-full group-hover:border-red-500"></div>
                  <span className="flex-1 text-slate-200 group-hover:text-white">{c.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* GROCERY */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingCart size={20} className="text-orange-400"/> Groceries</h2>
              <button onClick={() => {
                const item = prompt("Add to list:");
                if(item) setGrocery([...grocery, item]);
              }} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><Plus size={18}/></button>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {grocery.map((item, i) => (
                <div key={i} onClick={() => setGrocery(grocery.filter((_, idx) => idx !== i))} className="bg-white/5 p-3 rounded-xl text-sm border border-white/5 text-center hover:bg-orange-500/20 cursor-pointer transition-colors">
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* TIMERS */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] flex flex-col justify-between shadow-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Clock size={20} className="text-blue-400"/> Quick Timers</h2>
            <div className="grid grid-cols-2 gap-4">
              {[5, 15, 30, 60].map(m => (
                <button key={m} onClick={() => { setTimeLeft(m * 60); setTimerActive(true); }} className="py-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-blue-500/20 transition-all text-xl font-light italic">
                  {m >= 60 ? '1h' : `${m}m`}
                </button>
              ))}
            </div>
          </section>

          {/* CALENDAR */}
          <section className="md:col-span-2 lg:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] shadow-2xl">
             <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3"><Calendar size={24} className="text-purple-400"/> Schedule</h2>
              <button onClick={() => {
                const title = prompt("Event Name:");
                const date = prompt("Date (YYYY-MM-DD):");
                if(title && date) setEvents([...events, {title, date}]);
              }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full font-bold transition-all shadow-lg shadow-blue-500/20">
                <Plus size={18}/> Add Event
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {events.map((ev, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-3xl border border-white/10 relative group hover:bg-white/10 transition-colors">
                  <div className="text-purple-400 font-bold mb-1 text-xs tracking-tighter">{ev.date}</div>
                  <div className="text-lg font-medium">{ev.title}</div>
                  <button onClick={() => setEvents(events.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-500 transition-all"><X size={16}/></button>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
