import React from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { WorkoutTemplateCard } from './WorkoutTemplateCard';
import { SocialPostCard } from './SocialPostCard';
import { BroadcastCard } from './BroadcastCard';

export const FeaturePreviewModal = ({ isOpen, onClose, feature, onUseFeature }) => {
  if (!isOpen || !feature) return null;

  const renderPreview = () => {
    switch (feature.id) {
      case 'workout':
        return (
          <WorkoutTemplateCard 
            data={{
              workoutName: "Hypertrophy Push Day",
              muscleGroups: ["Chest", "Shoulders", "Triceps"],
              equipments: ["Barbell", "Dumbbells", "Cables"],
              fitnessLevel: "Intermediate",
              workoutLength: 60,
              exercises: [
                { id: 1, type: 'single', name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s', rpe: '8', rir: '2' },
                { id: 2, type: 'single', name: 'Incline Dumbbell Press', sets: 3, reps: '10', rest: '60s', rpe: '9', rir: '1' }
              ]
            }} 
            status="success" 
          />
        );
      case 'post':
        return (
          <SocialPostCard 
            data={{
              platform: "Instagram",
              content: "Summer is here! ☀️ Time to crush those goals. Join our new 8-week challenge today and get 20% off your first month! #AuraFitness #SummerShred",
              hashtags: ["AuraFitness", "SummerShred", "Goals"],
              mediaType: "Image",
              scheduledTime: "Tomorrow 10:00 AM"
            }} 
            status="success" 
          />
        );
      case 'broadcast':
        return (
          <BroadcastCard 
            data={{
              subject: "Upcoming Gym Maintenance Notice",
              message: "Hi everyone,\n\nPlease note that the main weight room will be closed for equipment maintenance this Saturday from 10 PM to 2 AM.\n\nThe cardio area and studio will remain open.\n\nThank you for your understanding!",
              channels: ["Push", "Email"],
              audience: "All Active Members",
              scheduledTime: "Tomorrow 8:00 AM",
              ctaText: "View Schedule"
            }} 
            status="success" 
          />
        );
      default:
        return (
          <div className="bg-sidebar border border-stroke rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4">
             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {feature.icon}
             </div>
             <div>
               <h4 className="text-sm font-bold text-title mb-1">Preview Unavailable</h4>
               <p className="text-xs text-subtitle">This feature generates conversational insights rather than a specific card.</p>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center md:px-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-background border-0 md:border md:border-stroke md:rounded-[32px] w-full max-w-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col animate-scale-in h-[100dvh] md:h-auto md:max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-stroke flex items-center justify-between shrink-0 bg-sidebar/30">
          <div>
             <h2 className="text-xl font-bold text-title flex items-center gap-3">
               <div className="text-primary">{feature.icon}</div>
               {feature.title}
             </h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-sidebar rounded-full border border-stroke flex items-center justify-center text-subtitle hover:text-title transition-colors shrink-0">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
          <div>
            <h3 className="text-xs font-bold text-subtitle uppercase tracking-widest mb-2">Description</h3>
            <p className="text-sm text-title leading-relaxed">{feature.desc}</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-subtitle uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={14} className="text-primary"/> Preview Example
            </h3>
            <div className="pointer-events-none origin-top scale-95 w-[105%] -ml-[2.5%]">
               {renderPreview()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-stroke bg-sidebar/30 shrink-0 flex justify-end gap-3 items-center">
           <button onClick={onClose} className="px-6 py-3 rounded-xl border border-stroke text-title font-bold hover:bg-sidebar transition-colors text-sm">Close</button>
           <button 
             onClick={() => {
               onClose();
               onUseFeature(feature.prompt);
             }} 
             className="px-6 py-3 rounded-xl bg-primary text-black font-bold hover:bg-[#3b82f6] transition-colors flex items-center gap-2 text-sm shadow-[0_0_15px_rgba(74,222,128,0.3)]"
           >
              Try this feature <ArrowRight size={16} strokeWidth={2.5}/>
           </button>
        </div>

      </div>
    </div>
  );
};
