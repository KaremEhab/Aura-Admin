import React from 'react';
import { User, FileText, Dumbbell, Activity, Utensils } from 'lucide-react';

// Sample data for mentions
const MOCK_PEOPLE = [
  { id: 'p1', name: 'Omar Alaa', role: 'Trainee', icon: <User size={14}/> },
  { id: 'p2', name: 'Hajer Ahmed', role: 'Trainee', icon: <User size={14}/> },
  { id: 'p3', name: 'Sarah Jenkins', role: 'Staff', icon: <User size={14}/> },
  { id: 'p4', name: 'Alex Morgan', role: 'Trainer', icon: <User size={14}/> }
];

const MOCK_TEMPLATES = [
  { id: 't1', code: 'tmp_workout', name: 'Workout Template', icon: <Dumbbell size={14}/> },
  { id: 't2', code: 'tmp_nutrition', name: 'Nutrition Template', icon: <Utensils size={14}/> },
  { id: 't3', code: 'tmp_analytics', name: 'Analytics Report', icon: <Activity size={14}/> }
];

const MOCK_PLANS = [
  { id: 'pl1', code: 'pl_vip', name: 'VIP Plan - Premium Plan', icon: <FileText size={14}/> },
  { id: 'pl2', code: 'pl_basic', name: 'Basic Starter Plan', icon: <FileText size={14}/> },
  { id: 'pl3', code: 'pl_shred', name: 'Summer Shred', icon: <FileText size={14}/> }
];

export const MentionDropdown = ({ mentionState, items, selectedIndex, onSelect }) => {
  if (!mentionState.active) return null;

  if (!items || items.length === 0) return null;
  const prefix = mentionState.type === '@' ? '@' : '';

  return (
    <div className="absolute bottom-full left-6 mb-2 w-72 bg-[#0A111E] border border-[#1C2536] rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col">
      <div className="bg-[#131B2A] border-b border-[#1C2536] px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
        {mentionState.type === '@' ? 'Mention People' : mentionState.type === 'tmp_' ? 'Insert Template' : 'Link Plan'}
      </div>
      <div className="max-h-48 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-1">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => onSelect(prefix + (item.code || item.name))}
            className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-xl transition-colors ${idx === selectedIndex ? 'bg-[#1C2536]' : 'hover:bg-[#1C2536]'}`}
          >
            <div className="w-8 h-8 rounded-full bg-[#131B2A] border border-[#1C2536] flex items-center justify-center text-gray-400 shrink-0">
              {item.icon}
            </div>
            <div className="flex flex-col flex-1 truncate">
              <span className="text-sm font-bold text-gray-200">{item.name}</span>
              <span className="text-xs text-gray-500">{item.role || item.code}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
