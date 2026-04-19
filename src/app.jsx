import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Cloud, Clock } from 'lucide-react';

export default function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white font-sans selection:bg-blue-500">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              REISBORD HUB
            </h1>
            <p className="text-slate-400 font-medium ml-1">Family Dashboard</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-light tracking-widest">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="text-slate-400 text-sm uppercase tracking-widest">{time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Quick Tasks" icon={<CheckCircle className="text-green-400" />} color="bg-green-500/10">
            <ul className="space-y-3">
              <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="w-4 h-4 border-2 border-slate-500 rounded-full"></div>
                <span>Unload Dishwasher</span>
              </li>
              <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="w-4 h-4 border-2 border-slate-500 rounded-full"></div>
                <span>Walk Marty</span>
              </li>
            </ul>
          </Card>

          <Card title="Calendar" icon={<Calendar className="text-blue-400" />} color="bg-blue-500/10">
            <p className="text-slate-400 text-sm italic text-center py-4">No events scheduled today.</p>
          </Card>

          <Card title="Weather" icon={<Cloud className="text-sky-300" />} color="bg-sky-500/10">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold">72°</span>
              <span className="text-slate-400">West Chester, PA</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon, children, color }) {
  return (
    <div className={`${color} backdrop-blur-2xl p-6 rounded-[2rem] border border-white/10 shadow-2xl ring-1 ring-white/5 hover:ring-white/20 transition-all duration-500`}>
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-lg font-bold tracking-wide uppercase">{title}</h2>
      </div>
      {children}
    </div>
  );
}
