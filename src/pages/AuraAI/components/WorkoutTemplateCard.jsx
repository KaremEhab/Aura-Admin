import React, { useState } from 'react';
import { Dumbbell, ExternalLink, ChevronDown, ChevronUp, X, Edit3, Repeat, Link } from 'lucide-react';

export const WorkoutTemplateCard = ({ data, onApprove, onReject }) => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const DetailPill = ({ label, value, isArray = false }) => (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-subtitle">{label}</span>
      <div className="flex flex-wrap gap-2">
        {isArray ? (
          value.map((v, idx) => (
            <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[var(--primary-lite)] border border-[var(--primary-border)] text-primary uppercase tracking-wider">
              {v}
            </span>
          ))
        ) : (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[var(--primary-lite)] border border-[var(--primary-border)] text-primary uppercase tracking-wider">
            {value}
          </span>
        )}
      </div>
    </div>
  );

  const StatBox = ({ label, value, theme = 'default' }) => {
    let bg = 'bg-background';
    let border = 'border-stroke';
    if (theme === 'green') { bg = 'bg-[var(--primary-lite)]'; border = 'border-[var(--primary-border)]'; }
    if (theme === 'orange') { bg = 'bg-[var(--secondary-lite)]'; border = 'border-[var(--secondary-border)]'; }
    return (
      <div className={`flex flex-col flex-1 border ${border} ${bg} rounded-xl p-3 min-w-[60px]`}>
        <span className="text-[10px] text-subtitle font-bold uppercase tracking-wider mb-1">{label}</span>
        <span className="text-sm text-title font-medium">{value}</span>
      </div>
    );
  };

  const allDetails = [
    { label: "Plan's Name", value: data.planName || 'Chest Push Day' },
    { label: "Session Goal", value: data.sessionGoal || 'Build Muscle Mass' },
    { label: "Target Trainee/s", value: data.targetTrainees || ['OMAR ALAA', 'VIP PLAN', 'PREMIUM PLAN'], isArray: true },
    { label: "Trainer", value: data.trainer || 'Alex Morgan' },
    { label: "Exercises Count", value: data.exercisesCount || '7 Exercises' },
    { label: "Difficulty", value: data.difficulty || 'Advanced' },
    { label: "Duration", value: data.duration || '45 Minutes' },
    { label: "Cooldown Time", value: data.cooldownTime || '5 Minutes' }
  ];

  const visibleDetails = isDetailsExpanded ? allDetails : allDetails.slice(0, 4);

  return (
    <div className="bg-sidebar border border-stroke rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl mx-auto my-6 relative transition-all duration-300">
      
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-stroke">
        <div className="flex items-center gap-3">
          <Dumbbell size={18} className="text-subtitle" />
          <span className="text-sm font-bold text-title">New Workout Template</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[var(--secondary-lite)] text-secondary text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-[var(--secondary-border)]">PENDING</span>
          <button className="w-8 h-8 rounded-full bg-background border border-stroke flex items-center justify-center text-subtitle hover:text-title transition-colors">
            <Edit3 size={14} />
          </button>
        </div>
      </div>

      {/* Grid Details */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-6">
          {visibleDetails.map((detail, idx) => (
            <DetailPill key={idx} label={detail.label} value={detail.value} isArray={detail.isArray} />
          ))}
        </div>

        {/* Toggle Expand Details */}
        <button 
          onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
          className="w-full py-2 flex items-center justify-center gap-2 bg-background border border-stroke rounded-xl text-xs font-bold text-subtitle hover:text-title transition-colors"
        >
          {isDetailsExpanded ? <>See less <ChevronUp size={14} /></> : <>See more <ChevronDown size={14} /></>}
        </button>

        {/* Collapsed State Link to open Preview */}
        {!isPreviewMode && (
          <div className="mt-4 animate-fade-in">
            <button 
              onClick={() => setIsPreviewMode(true)}
              className="w-full py-5 border border-stroke rounded-2xl flex items-center justify-center gap-2 text-sm text-title hover:bg-background transition-colors group"
            >
              <span className="border-b border-[var(--subtitle)] group-hover:border-[var(--title)] transition-colors pb-0.5">
                {data.exercisesCount || '7 Exercises'} are attached in this file click here to preview
              </span>
              <ExternalLink size={16} />
            </button>
          </div>
        )}

        {/* Expanded State Exercises List Preview */}
        {isPreviewMode && (
          <div className="mt-4 flex flex-col gap-4 animate-slide-up">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-stroke rounded-2xl p-4">
               {/* 1. Pull-Up */}
               <div className="border border-stroke bg-background rounded-xl p-4">
                 <div className="flex items-center justify-between mb-4">
                   <span className="text-[13px] font-medium text-primary">1. Pull-Up</span>
                   <Link size={16} className="text-primary" />
                 </div>
                 <div className="flex gap-3">
                   <StatBox label="SETS" value="4" />
                   <StatBox label="REPS" value="Max" />
                   <StatBox label="REST" value="60s" />
                 </div>
               </div>

               {/* 2. Barbell Back Squat */}
               <div className="border border-stroke bg-background rounded-xl p-4">
                 <div className="flex items-center justify-between mb-4">
                   <span className="text-[13px] font-medium text-primary">2. Barbell Back Squat</span>
                   <Link size={16} className="text-primary" />
                 </div>
                 <div className="flex gap-3">
                   <StatBox label="SETS" value="4" />
                   <StatBox label="REPS" value="8-10" />
                   <StatBox label="REST" value="90s" />
                 </div>
               </div>

               {/* 3. Superset (row-span-2) */}
               <div className="border border-[var(--primary-border)] bg-background rounded-xl p-4 md:row-span-2">
                 <div className="flex items-center justify-between mb-4">
                   <span className="text-[13px] font-medium text-primary">3. Superset</span>
                   <span className="text-[11px] text-primary font-medium">(2 Exercises)</span>
                 </div>
                 
                 <div className="flex flex-col gap-5">
                   <div>
                     <div className="flex items-center justify-between mb-3">
                       <span className="text-xs font-medium text-subtitle">1. Deadlift</span>
                       <Link size={14} className="text-primary" />
                     </div>
                     <div className="flex gap-3">
                       <StatBox label="SETS" value="3" theme="green" />
                       <StatBox label="REPS" value="10" theme="green" />
                     </div>
                   </div>
                   <div>
                     <div className="flex items-center justify-between mb-3">
                       <span className="text-xs font-medium text-subtitle">2. Romanian Deadlift</span>
                       <Link size={14} className="text-primary" />
                     </div>
                     <div className="flex gap-3">
                       <StatBox label="SETS" value="3" theme="green" />
                       <StatBox label="REPS" value="12" theme="green" />
                     </div>
                   </div>
                 </div>
               </div>

               {/* 4. Overhead Press */}
               <div className="border border-stroke bg-background rounded-xl p-4">
                 <div className="flex items-center justify-between mb-4">
                   <span className="text-[13px] font-medium text-primary">4. Overhead Press</span>
                   <Link size={16} className="text-subtitle" />
                 </div>
                 <div className="flex gap-3">
                   <StatBox label="SETS" value="3" />
                   <StatBox label="REPS" value="8-10" />
                   <StatBox label="REST" value="90s" />
                 </div>
               </div>

               {/* 5. Plank */}
               <div className="border border-stroke bg-background rounded-xl p-4">
                 <div className="flex items-center justify-between mb-4">
                   <span className="text-[13px] font-medium text-primary">5. Plank</span>
                   <Link size={16} className="text-subtitle" />
                 </div>
                 <div className="flex gap-3">
                   <StatBox label="SETS" value="3" />
                   <StatBox label="Duration" value="60s" />
                   <StatBox label="REST" value="45s" />
                 </div>
               </div>

               {/* 6. Dropset */}
               <div className="md:col-span-2 border border-[var(--secondary-border)] bg-background rounded-xl p-4">
                 <div className="flex items-center justify-between mb-4">
                   <span className="text-[13px] font-medium text-secondary">6. Dropset</span>
                 </div>
                 <div className="flex flex-col gap-3">
                   <div className="flex items-center justify-between mb-1">
                     <span className="text-xs font-medium text-subtitle">Dumbbell Row</span>
                     <Link size={14} className="text-primary" />
                   </div>
                   <div className="flex gap-3">
                     <StatBox label="SETS" value="3" theme="orange" />
                     <StatBox label="REPS" value="12-10-8" theme="orange" />
                     <StatBox label="Drop by" value="-20%" theme="orange" />
                     <StatBox label="RPE" value="10" theme="orange" />
                   </div>
                 </div>
               </div>

            </div>

            <button 
              onClick={() => setIsPreviewMode(false)}
              className="w-full py-2.5 bg-[var(--alert-lite)] border border-[var(--alert-border)] rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-alert hover:opacity-80 transition-opacity uppercase tracking-wider"
            >
              Exit Preview Mode <X size={14} />
            </button>
          </div>
        )}

      </div>

      {/* Action Footer */}
      <div className="bg-sidebar p-3 flex justify-end gap-3 items-center border-t border-stroke">
        <button onClick={onReject} className="text-[11px] font-bold text-alert hover:opacity-80 transition-opacity uppercase tracking-widest">
          Reject
        </button>
        <button className="px-4 py-1.5 rounded-full text-[11px] font-bold border border-stroke text-subtitle hover:text-title transition-colors uppercase tracking-widest">
          Save
        </button>
        <button onClick={onApprove} className="px-5 py-1.5 rounded-full text-[11px] font-black bg-[var(--primary)] text-black hover:opacity-90 transition-opacity uppercase tracking-widest">
          Approve
        </button>
      </div>

    </div>
  );
};

