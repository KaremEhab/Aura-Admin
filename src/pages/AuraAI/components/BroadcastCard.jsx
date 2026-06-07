import React, { useState } from 'react';
import { Bell, Edit3, Globe, Mail, Smartphone, Users, Clock, ArrowRight } from 'lucide-react';

export const BroadcastCard = ({ data, onApprove, onReject, status }) => {
  const [activeTab, setActiveTab] = useState('preview'); // 'preview', 'details'

  const getChannelIcon = (channel) => {
    switch(channel.toLowerCase()) {
      case 'push': return <Smartphone size={14} />;
      case 'email': return <Mail size={14} />;
      default: return <Globe size={14} />;
    }
  };

  return (
    <div className="bg-sidebar border border-stroke rounded-3xl overflow-hidden shadow-2xl w-full mx-auto my-6 relative transition-all duration-300 group">
      
      {/* Header */}
      <div className="px-5 py-4 border-b border-stroke flex items-center justify-between bg-sidebar/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Bell size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-title">New Broadcast</h3>
            <span className="text-[10px] text-subtitle">Drafted by Aura.AI</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {status === 'success' ? (
            <span className="bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-primary/20">Sent</span>
          ) : status === 'rejected' ? (
             <span className="bg-red-500/10 text-red-500 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-red-500/20">Discarded</span>
          ) : (
            <>
               <span className="bg-[var(--secondary-lite)] text-secondary text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-[var(--secondary-border)]">Draft</span>
               <button className="w-8 h-8 rounded-full bg-background border border-stroke flex items-center justify-center text-subtitle hover:text-title hover:border-primary transition-colors">
                 <Edit3 size={14} />
               </button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stroke">
        <button 
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'preview' ? 'text-primary border-primary bg-primary/5' : 'text-subtitle border-transparent hover:bg-background'}`}
        >
          Message Preview
        </button>
        <button 
          onClick={() => setActiveTab('details')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'details' ? 'text-primary border-primary bg-primary/5' : 'text-subtitle border-transparent hover:bg-background'}`}
        >
          Targeting & Settings
        </button>
      </div>

      <div className="p-5 md:p-6 bg-background/50">
        {activeTab === 'preview' && (
          <div className="flex flex-col gap-4 animate-fade-in">
             <div className="flex flex-col gap-1.5">
               <span className="text-[10px] font-bold text-subtitle uppercase tracking-widest pl-1">Subject / Title</span>
               <div className="w-full bg-background border border-stroke rounded-xl px-4 py-3 text-sm text-title font-medium">
                 {data.subject || 'Summer Fitness Challenge Starting Now!'}
               </div>
             </div>
             <div className="flex flex-col gap-1.5">
               <span className="text-[10px] font-bold text-subtitle uppercase tracking-widest pl-1">Message Body</span>
               <div className="w-full bg-background border border-stroke rounded-xl px-4 py-4 text-sm text-subtitle leading-relaxed whitespace-pre-wrap">
                 {data.message || 'Hey Aura fam!\n\nOur 8-week Summer Challenge kicks off tomorrow. Are you ready to crush your goals?\n\nDon\'t forget to book your spot in the app. Let\'s make this summer count! 🔥'}
               </div>
             </div>
             {data.ctaText && (
               <div className="flex flex-col gap-1.5 mt-2">
                 <span className="text-[10px] font-bold text-subtitle uppercase tracking-widest pl-1">Call to Action Link</span>
                 <div className="w-full bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 flex items-center justify-between group cursor-pointer hover:bg-primary/20 transition-colors">
                   <span className="text-sm font-bold text-primary">{data.ctaText}</span>
                   <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                 </div>
               </div>
             )}
          </div>
        )}

        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
             {/* Channels */}
             <div className="bg-background border border-stroke rounded-2xl p-4 flex flex-col gap-3">
               <div className="flex items-center gap-2 text-subtitle mb-1">
                 <Globe size={16} />
                 <span className="text-xs font-bold uppercase tracking-wider">Channels</span>
               </div>
               <div className="flex flex-wrap gap-2">
                 {(data.channels || ['Push', 'Email']).map((ch, idx) => (
                   <div key={idx} className="px-3 py-1.5 rounded-lg border border-stroke bg-sidebar flex items-center gap-2 text-[13px] text-title font-medium">
                     <span className="text-primary">{getChannelIcon(ch)}</span> {ch}
                   </div>
                 ))}
               </div>
             </div>

             {/* Audience */}
             <div className="bg-background border border-stroke rounded-2xl p-4 flex flex-col gap-3">
               <div className="flex items-center gap-2 text-subtitle mb-1">
                 <Users size={16} />
                 <span className="text-xs font-bold uppercase tracking-wider">Target Audience</span>
               </div>
               <div className="px-3 py-2 rounded-lg border border-primary/20 bg-primary/5 text-primary text-sm font-bold">
                 {data.audience || 'All Active Members (2,450)'}
               </div>
             </div>

             {/* Scheduled Time */}
             <div className="bg-background border border-stroke rounded-2xl p-4 flex flex-col gap-3 md:col-span-2">
               <div className="flex items-center gap-2 text-subtitle mb-1">
                 <Clock size={16} />
                 <span className="text-xs font-bold uppercase tracking-wider">Delivery Time</span>
               </div>
               <div className="text-sm text-title font-medium flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-green-500"></span>
                 {data.scheduledTime || 'Send Immediately'}
               </div>
             </div>
          </div>
        )}
      </div>

      {/* Actions Footer */}
      {(!status || status === 'pending') && (
        <div className="p-5 border-t border-stroke bg-sidebar/50 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={onReject}
            className="flex-1 py-3 rounded-xl border border-stroke bg-background text-title font-bold text-sm hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all"
          >
            Discard Draft
          </button>
          <button 
            onClick={onApprove}
            className="flex-1 py-3 rounded-xl bg-primary text-black font-bold text-sm hover:bg-[#3b82f6] shadow-[0_0_15px_rgba(74,222,128,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <Bell size={16} fill="currentColor" /> Approve & Send
          </button>
        </div>
      )}
    </div>
  );
};
