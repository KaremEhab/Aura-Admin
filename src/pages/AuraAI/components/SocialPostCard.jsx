import React, { useState } from 'react';
import { Share2, Image as ImageIcon, Edit3, Loader2 } from 'lucide-react';

export const SocialPostCard = ({ data, onApprove, onReject, status = 'pending' }) => {
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

  const allDetails = [
    { label: "Platform", value: data.platform || 'Instagram' },
    { label: "Target Audience", value: data.targetAudience || ['All Members', 'Prospects'], isArray: true },
    { label: "Publish Date", value: data.publishDate || 'Immediate' },
    { label: "Tags", value: data.tags || ['#Fitness', '#AuraGym'], isArray: true }
  ];

  return (
    <div className="bg-sidebar border border-stroke rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl mx-auto my-6 relative transition-all duration-300">
      
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-stroke">
        <div className="flex items-center gap-3">
          <Share2 size={18} className="text-subtitle" />
          <span className="text-sm font-bold text-title">New Social Post Draft</span>
        </div>
        <div className="flex items-center gap-3">
          {status !== 'success' && <span className="bg-[var(--secondary-lite)] text-secondary text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-[var(--secondary-border)]">PENDING</span>}
          <button className="w-8 h-8 rounded-full bg-background border border-stroke flex items-center justify-center text-subtitle hover:text-title transition-colors">
            <Edit3 size={14} />
          </button>
        </div>
      </div>

      {/* Grid Details */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-6">
          {allDetails.map((detail, idx) => (
            <DetailPill key={idx} label={detail.label} value={detail.value} isArray={detail.isArray} />
          ))}
        </div>

        {/* Post Preview Area */}
        <div className="mt-6 bg-background border border-stroke rounded-2xl p-5">
           <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-full bg-sidebar border border-stroke flex items-center justify-center">
                <span className="text-xs font-bold text-title">AU</span>
             </div>
             <div>
               <div className="text-sm font-bold text-title">Aura Gym</div>
               <div className="text-xs text-subtitle">Draft Preview</div>
             </div>
           </div>
           
           <p className="text-sm text-title mb-4 whitespace-pre-wrap leading-relaxed">
             {data.caption || "Ready to crush your goals this summer? Join our new 30-day challenge! 💪🔥 #AuraGym #Fitness"}
           </p>

           <div className="w-full h-48 bg-sidebar rounded-xl border border-stroke flex items-center justify-center overflow-hidden">
             {data.imageUrl ? (
               <img src={data.imageUrl} alt="Post media" className="w-full h-full object-cover" />
             ) : (
               <div className="flex flex-col items-center text-subtitle">
                 <ImageIcon size={32} className="mb-2 opacity-50" />
                 <span className="text-xs">Image attached (Promo_Banner.jpg)</span>
               </div>
             )}
           </div>
        </div>
      </div>

      {/* Footer / Actions */}
      {status !== 'success' && (
        <div className="px-6 py-4 bg-background border-t border-stroke flex items-center justify-end gap-3">
          <button onClick={onReject} disabled={status === 'loading'} className="px-4 py-2 rounded-xl text-xs font-bold text-subtitle hover:text-red-500 transition-colors uppercase tracking-wider">
            Reject
          </button>
          <button onClick={onApprove} disabled={status === 'loading'} className="px-6 py-2 rounded-xl text-xs font-black bg-primary text-black hover:bg-[#3b82f6] transition-all flex justify-center items-center min-w-[120px] uppercase tracking-wider">
            {status === 'loading' ? <span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> ...</span> : "Approve & Post"}
          </button>
        </div>
      )}
    </div>
  );
};
