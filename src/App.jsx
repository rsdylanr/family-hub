import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, ShoppingCart, Clock, Plus, X, Bell } from 'lucide-react';

export default function App() {
  // State for different modules.
  const [chores, setChores] = useState(() => JSON.parse(localStorage.getItem('chores')) || []);
  const [grocery, setGrocery] = useState(() => JSON.parse(localStorage.getItem('grocery')) || []);
  const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem('events')) || []);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [input, setInput] = useState("");

  // Save to local storage whenever data changes
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
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const startTimer = (mins) => {
    setTimeLeft(mins * 60);
    setTimerActive(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-4 md:p-10 overflow-hidden">
      
      {/* FULL SCREEN TIMER OVERLAY */}
      {timerActive && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-3xl flex flex-col items-center justify-center animate-in fade-in duration-500">
          <div className="text-[25vw] font-black tracking-tighter leading-none mb-10">
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={() => setTimerActive(false)}
            className="bg-white/10 hover:bg-white/20 border border-white/20 px-12 py-4 rounded-full text-2xl font-medium transition-all"
          >
            Cancel Timer
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter italic">REISBORD HUB</h1>
          <div className="text-right">
             <p className="text-2xl font-light">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
             <p className="text-blue-400 text-xs tracking-widest uppercase">System Online</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* CHORES SECTION */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2"><CheckCircle size={20} className="text-green-400"/> Chores</h2>
              <button onClick={() => {
                const task = prompt("New Chore:");
                if(task) setChores([...chores, {id: Date.now(), text: task, done: false}]);
              }} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><Plus size={18}/></button>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {chores.map(c => (
                <div key={c.id} onClick={() => setChores(chores.filter(x => x.id !== c.id))} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 cursor-pointer hover:bg-red-500/20 transition-all group">
                  <div className="w-5 h-5 border border-white/30 rounded-full group-hover:border-red-500"></div>
                  <span className="flex-1">{c.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* GROCERY LIST */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingCart size={20} className="text-orange-400"/> Groceries</h2>
              <button onClick={() => {
                const item = prompt("Add to list:");
                if(item) setGrocery([...grocery, item]);
              }} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><Plus size={18}/></button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {grocery.map((item, i) => (
                <div key={i} onClick={() => setGrocery(grocery.filter((_, idx) => idx !== i))} className="bg-white/5 p-3 rounded-xl text-sm border border-white/5 text-center hover:bg-orange-500/20 cursor-pointer">
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* QUICK TIMER BUTTONS */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] flex flex-col justify-between">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Clock size={20} className="text-blue-400"/> Timers</h2>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => startTimer(5)} className="py-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-blue-500/20 transition-all text-xl">5m</button>
              <button onClick={() => startTimer(15)} className="py-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-blue-500/20 transition-all text-xl">15m</button>
              <button onClick={() => startTimer(30)} className="py-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-blue-500/20 transition-all text-xl">30m</button>
              <button onClick={() => startTimer(60)} className="py-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-blue-500/20 transition-all text-xl">1h</button>
            </div>
          </section>

          {/* CALENDAR / EVENTS */}
          <section className="md:col-span-2 lg:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem]">
             <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3"><Calendar size={24} className="text-purple-400"/> Upcoming Schedule</h2>
              <button onClick={() => {
                const title = prompt("Event Name:");
                const date = prompt("Date (YYYY-MM-DD):");
                if(title && date) setEvents([...events, {title, date}]);
              }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full font-bold transition-all">
                <Plus size={18}/> Add Event
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {events.map((ev, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-3xl border border-white/10 relative group">
                  <div className="text-purple-400 font-bold mb-1">{ev.date}</div>
                  <div className="text-lg">{ev.title}</div>
                  {ev.date === new Date().toISOString().split('T')[0] && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-yellow-400 animate-pulse">
                      <Bell size={12}/> Happening Today
                    </div>
                  )}
                  <button onClick={() => setEvents(events.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-red-400"><X size={16}/></button>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
