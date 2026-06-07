import React, { useState } from 'react';
import { X, Grid as GridIcon, Dumbbell, FileText, Utensils, Activity, ArrowLeft, ChevronRight, Search, Bell } from 'lucide-react';
import { WorkoutTemplateCard } from './WorkoutTemplateCard';
import { SocialPostCard } from './SocialPostCard';
import { BroadcastCard } from './BroadcastCard';

export const TemplatesModal = ({ isOpen, onClose, sessions }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Extract all generated templates from all sessions
  const templates = [];
  sessions.forEach(session => {
    session.messages.forEach(msg => {
      if (msg.type === 'ai_action_proposal') {
        templates.push({
          id: msg.id,
          sessionTitle: session.title,
          msg: msg
        });
      }
    });
  });

  const getTemplateInfo = (t) => {
    if (t.msg.action.title === 'ASSIGN WORKOUT PLAN') {
       return { 
         category: 'Workout Plan', 
         icon: <Dumbbell size={20} />, 
         title: t.msg.action.targets?.[0] ? `${t.msg.action.targets[0]}'s Workout` : 'Generated Workout' 
       };
    }
    if (t.msg.action.title === 'ASSIGN NUTRITION PLAN') {
       return { 
         category: 'Nutrition Plan', 
         icon: <Utensils size={20} />, 
         title: t.msg.action.targets?.[0] ? `${t.msg.action.targets[0]}'s Nutrition` : 'Generated Diet' 
       };
    }
    if (t.msg.action.title === 'CREATE SOCIAL POST') {
       return { 
         category: 'Social Media Post', 
         icon: <FileText size={20} />, 
         title: t.msg.action.postData?.platform ? `${t.msg.action.postData.platform} Post` : 'Social Draft' 
       };
    }
    if (t.msg.action.title === 'BROADCAST NOTIFICATION') {
       return { 
         category: 'Push Notification', 
         icon: <Bell size={20} />, 
         title: t.msg.action.notificationData?.subject || 'Broadcast Draft' 
       };
    }
    return { 
      category: 'General Template', 
      icon: <Activity size={20} />, 
      title: t.msg.action.title 
    };
  };

  const renderTemplateDetails = (t) => {
    if (t.msg.action.title === 'ASSIGN WORKOUT PLAN') {
      return <WorkoutTemplateCard data={t.msg.action.planData || {}} status={t.msg.status} onApprove={() => {}} onReject={() => {}} />;
    }
    if (t.msg.action.title === 'CREATE SOCIAL POST') {
      return <SocialPostCard data={t.msg.action.postData || {}} status={t.msg.status} onApprove={() => {}} onReject={() => {}} />;
    }
    if (t.msg.action.title === 'BROADCAST NOTIFICATION') {
      return <BroadcastCard data={t.msg.action.notificationData || {}} status={t.msg.status} onApprove={() => {}} onReject={() => {}} />;
    }
    
    // Generic fallback for Nutrition and others
    return (
      <div className="bg-sidebar border border-stroke rounded-2xl overflow-hidden w-full">
         <div className="bg-sidebar border-b border-stroke px-5 py-3 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="bg-background p-1.5 rounded-lg border border-stroke">{t.msg.action.icon}</div>
              <span className="text-sm font-bold text-title">{t.msg.action.title}</span>
           </div>
         </div>
         <div className="p-5">
           <div className="flex flex-col gap-4">
             {t.msg.action.details.map((detail, idx) => (
               <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 border-b border-stroke pb-2 last:border-0 last:pb-0">
                 <span className="text-xs font-bold text-subtitle uppercase tracking-wider w-40 shrink-0 pt-0.5">{detail.label}</span>
                 <span className="text-sm text-title font-medium flex-1">{detail.value}</span>
               </div>
             ))}
           </div>
         </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center md:px-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setSelectedTemplate(null); onClose(); }}></div>
      <div className="bg-background border-0 md:border md:border-stroke md:rounded-[32px] w-full max-w-4xl shadow-2xl relative z-10 overflow-hidden flex flex-col animate-scale-in h-[100dvh] md:h-auto md:max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-stroke flex items-center justify-between shrink-0 bg-sidebar/30">
          <div>
             {selectedTemplate ? (
               <div className="flex items-center gap-3">
                 <button onClick={() => setSelectedTemplate(null)} className="w-10 h-10 bg-sidebar rounded-full border border-stroke flex items-center justify-center text-subtitle hover:text-primary transition-colors">
                   <ArrowLeft size={18} />
                 </button>
                 <div>
                   <h2 className="text-xl font-bold text-title flex items-center gap-2">Template Details</h2>
                   <p className="text-sm text-subtitle mt-1">Viewing {getTemplateInfo(selectedTemplate).category}</p>
                 </div>
               </div>
             ) : (
               <>
                 <h2 className="text-xl font-bold text-title flex items-center gap-2">
                   <GridIcon size={24} className="text-primary"/> 
                   Templates Library
                 </h2>
                 <p className="text-sm text-subtitle mt-1">A unified view of all actionable templates generated by Aura.AI.</p>
               </>
             )}
          </div>
          <button onClick={() => { setSelectedTemplate(null); onClose(); }} className="w-10 h-10 bg-sidebar rounded-full border border-stroke flex items-center justify-center text-subtitle hover:text-title transition-colors shrink-0">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar bg-background flex-1">
           {selectedTemplate ? (
              <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                       {getTemplateInfo(selectedTemplate).icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-title">{getTemplateInfo(selectedTemplate).title}</h3>
                      <p className="text-xs font-medium text-subtitle uppercase tracking-widest">{selectedTemplate.sessionTitle}</p>
                    </div>
                 </div>
                 {renderTemplateDetails(selectedTemplate)}
              </div>
           ) : templates.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-subtitle">
                <GridIcon size={48} className="opacity-20 mb-4" />
                <p>No templates generated yet.</p>
              </div>
           ) : (
              <div className="flex flex-col max-w-3xl mx-auto w-full">
                 <div className="relative w-full mb-6 group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <Search size={18} className="text-subtitle group-focus-within:text-primary transition-colors" />
                   </div>
                   <input
                     type="text"
                     placeholder="Search templates by title, category, or chat session..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full bg-sidebar border border-stroke rounded-2xl pl-11 pr-4 py-3.5 text-sm text-title focus:outline-none focus:border-primary transition-colors"
                   />
                 </div>
                 
                 <div className="flex flex-col gap-3">
                   {(() => {
                      const filteredTemplates = templates.filter(t => {
                        const info = getTemplateInfo(t);
                        const q = searchQuery.toLowerCase();
                        return info.title.toLowerCase().includes(q) || 
                               info.category.toLowerCase().includes(q) || 
                               t.sessionTitle.toLowerCase().includes(q);
                      });

                      if (filteredTemplates.length === 0) {
                        return <p className="text-subtitle text-center py-10">No templates match your search.</p>;
                      }

                      return filteredTemplates.map((t) => {
                        const info = getTemplateInfo(t);
                        return (
                          <button 
                            key={t.id} 
                            onClick={() => setSelectedTemplate(t)}
                            className="w-full flex items-center justify-between bg-sidebar/50 hover:bg-sidebar border border-stroke hover:border-primary rounded-2xl p-4 transition-all text-left group"
                          >
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-background border border-stroke flex items-center justify-center text-subtitle group-hover:text-primary transition-colors shrink-0">
                                   {info.icon}
                                </div>
                                <div className="flex flex-col gap-1">
                                   <span className="text-[10px] font-bold text-subtitle uppercase tracking-widest">{info.category}</span>
                                   <span className="text-base font-bold text-title">{info.title}</span>
                                   <span className="text-[11px] text-subtitle">From session: {t.sessionTitle}</span>
                                </div>
                             </div>
                             <div className="w-10 h-10 rounded-full border border-stroke bg-background flex items-center justify-center text-subtitle group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all shrink-0">
                                <ChevronRight size={18} strokeWidth={2.5} />
                             </div>
                          </button>
                        );
                      });
                   })()}
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};
