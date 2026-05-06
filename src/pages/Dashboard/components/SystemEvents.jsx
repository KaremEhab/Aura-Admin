import React from 'react';
import { Activity, UserPlus, CreditCard, ShieldAlert, CheckCircle2 } from 'lucide-react';
import './SystemEvents.css';

export function SystemEvents() {
  const events = [
    { icon: <UserPlus size={14} />, type: 'user', text: 'New Gym: Iron Temple Cairo', time: '2m ago', color: 'green' },
    { icon: <CreditCard size={14} />, type: 'fin', text: 'Payout: Apex Hub ($4.2k)', time: '15m ago', color: 'blue' },
    { icon: <ShieldAlert size={14} />, type: 'sec', text: 'Blocked IP: 192.168.1.4', time: '1h ago', color: 'red' },
    { icon: <CheckCircle2 size={14} />, type: 'sys', text: 'Auto-backup completed', time: '3h ago', color: 'purple' },
  ];

  return (
    <div className="card h-full flex flex-col p-0 overflow-hidden">
      <div className="p-4 border-b border-stroke flex justify-between items-center">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <Activity size={16} className="text-primary" /> Live Events
        </h3>
        <span className="text-[10px] uppercase font-extrabold text-[var(--subtitle)] animate-pulse">Live</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="events-stack">
          {events.map((ev, i) => (
            <div key={i} className="event-item">
              <div className={`event-dot ${ev.color}`}></div>
              <div className="event-content">
                <p className="event-text">{ev.text}</p>
                <span className="event-time">{ev.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="p-3 text-[10px] uppercase font-bold text-primary border-t border-stroke hover:bg-[var(--primary-lite)] transition-colors">
        View Full Logs
      </button>
    </div>
  );
}
