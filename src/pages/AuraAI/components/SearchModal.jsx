import React from 'react';
import { Search, X, Clock } from 'lucide-react';

export const SearchModal = ({ isOpen, onClose, sessions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center md:px-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-background border-0 md:border md:border-stroke md:rounded-[32px] w-full max-w-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col animate-scale-in h-[100dvh] md:h-auto md:max-h-[90vh]">
        
        {/* Header & Input */}
        <div className="p-4 border-b border-stroke flex items-center gap-3">
          <Search size={20} className="text-subtitle" />
          <input 
            autoFocus
            type="text" 
            placeholder="Search conversations..." 
            className="flex-1 bg-transparent border-none text-[15px] text-title focus:outline-none placeholder:text-subtitle"
          />
          <button onClick={onClose} className="p-2 bg-sidebar rounded-full border border-stroke text-subtitle hover:text-title transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Results / Default View */}
        <div className="p-4 overflow-y-auto max-h-[60vh] custom-scrollbar flex flex-col gap-6">
          {/* Today */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-subtitle uppercase tracking-widest px-2 mb-1">TODAY</span>
            {sessions.slice(0, 2).map(session => (
              <div key={session.id} onClick={onClose} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-sidebar transition-colors cursor-pointer border border-transparent hover:border-stroke group">
                <div className="w-10 h-10 rounded-full bg-sidebar border border-stroke flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-title">{session.title.substring(0,2).toUpperCase()}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                   <span className="text-sm font-bold text-title truncate">{session.title}</span>
                   <span className="text-xs text-subtitle truncate mt-0.5">{session.messages[session.messages.length - 1]?.content.substring(0, 40)}...</span>
                </div>
              </div>
            ))}
          </div>

          {/* History */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-2 mb-1">
              <Clock size={12} className="text-subtitle" />
              <span className="text-[10px] font-bold text-subtitle uppercase tracking-widest">HISTORY</span>
            </div>
            {sessions.slice(2, 5).map(session => (
              <div key={session.id} onClick={onClose} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-sidebar transition-colors cursor-pointer border border-transparent hover:border-stroke group">
                <div className="w-10 h-10 rounded-full bg-sidebar border border-stroke flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-title">{session.title.substring(0,2).toUpperCase()}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                   <span className="text-sm font-bold text-title truncate">{session.title}</span>
                   <span className="text-xs text-subtitle truncate mt-0.5">{session.messages[session.messages.length - 1]?.content.substring(0, 40)}...</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
