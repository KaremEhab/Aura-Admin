import React, { useState } from 'react';
import { X, Sparkles, Sliders, Database, Save, Zap, Activity } from 'lucide-react';

export const SettingsModal = ({ isOpen, onClose }) => {
  const [temperature, setTemperature] = useState(0.7);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center md:px-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-background border-0 md:border md:border-stroke md:rounded-[32px] w-full max-w-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col animate-scale-in h-[100dvh] md:h-auto md:max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-stroke flex items-center justify-between shrink-0 bg-sidebar/30">
          <div>
             <h2 className="text-xl font-bold text-title flex items-center gap-2">
               <Sparkles size={24} className="text-primary"/> 
               AI Agent Settings
             </h2>
             <p className="text-sm text-subtitle mt-1">Configure your Firebase Gemini models and manage usage.</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-sidebar rounded-full border border-stroke flex items-center justify-center text-subtitle hover:text-title transition-colors shrink-0">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-8">
          
          {/* Section: Plan & Usage */}
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mb-2">
                <Database size={16} /> Subscription & Usage
             </div>
             
             <div className="bg-sidebar border border-stroke rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
                <div className="flex items-center justify-between">
                   <div>
                     <span className="text-xs font-bold text-subtitle uppercase tracking-widest">Current Plan</span>
                     <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-black text-title">Aura Basic</span>
                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold uppercase">Active</span>
                     </div>
                   </div>
                   <button className="bg-background border border-primary text-primary hover:bg-primary hover:text-black font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                     <Zap size={14}/> Upgrade
                   </button>
                </div>
                
                <div className="flex flex-col gap-2 mt-2">
                   <div className="flex items-center justify-between text-sm">
                      <span className="text-title font-bold">API Tokens Used</span>
                      <span className="text-subtitle font-bold">45,200 <span className="text-stroke px-1">/</span> 100,000</span>
                   </div>
                   <div className="w-full h-2.5 bg-background rounded-full overflow-hidden border border-stroke">
                      <div className="h-full bg-primary rounded-full w-[45%] relative">
                         <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}></div>
                      </div>
                   </div>
                   <span className="text-xs text-subtitle text-right">Resets in 12 days</span>
                </div>
             </div>
          </div>

          {/* Section: Model Configuration */}
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mb-2">
                <Activity size={16} /> Model Settings
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 md:col-span-2">
                   <label className="text-xs font-bold text-subtitle uppercase tracking-wider">AI Model (Firebase Vertex AI)</label>
                   <select className="bg-sidebar border border-stroke rounded-xl px-4 py-3 text-sm text-title font-bold focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                     <option>gemini-1.5-pro</option>
                     <option>gemini-1.5-flash</option>
                     <option>gemini-1.0-pro</option>
                   </select>
                   <span className="text-xs text-subtitle ml-1 mt-0.5">Gemini 1.5 Pro offers complex reasoning. Flash is optimized for speed.</span>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2 mt-2">
                   <div className="flex justify-between items-center">
                     <label className="text-xs font-bold text-subtitle uppercase tracking-wider">Temperature: <span className="text-primary">{temperature}</span></label>
                     <span className="text-[10px] text-subtitle">{temperature < 0.5 ? 'Focused & Precise' : temperature > 0.8 ? 'Highly Creative' : 'Balanced'}</span>
                   </div>
                   <input 
                     type="range" 
                     min="0" max="1" step="0.1" 
                     value={temperature}
                     onChange={(e) => setTemperature(parseFloat(e.target.value))}
                     className="w-full accent-primary h-1.5 bg-sidebar rounded-full appearance-none outline-none cursor-pointer"
                   />
                </div>

                <div className="flex flex-col gap-2">
                   <label className="text-xs font-bold text-subtitle uppercase tracking-wider">Max Output Tokens</label>
                   <input type="number" defaultValue={2048} className="bg-sidebar border border-stroke rounded-xl px-4 py-3 text-sm text-title focus:outline-none focus:border-primary transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                   <label className="text-xs font-bold text-subtitle uppercase tracking-wider">Safety Settings</label>
                   <select className="bg-sidebar border border-stroke rounded-xl px-4 py-3 text-sm text-title focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                     <option>Block few (Recommended)</option>
                     <option>Block some</option>
                     <option>Block most</option>
                     <option>Block none</option>
                   </select>
                </div>
             </div>
          </div>

          {/* Section: Advanced Parameters */}
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mb-2">
                <Sliders size={16} /> Agent Persona & Tools
             </div>
             
             <div className="flex flex-col gap-2">
               <label className="text-xs font-bold text-subtitle uppercase tracking-wider">System Instructions (Persona)</label>
               <textarea 
                 defaultValue="You are Aura.AI, a world-class professional fitness and nutrition coach. Provide concise, highly accurate, and science-backed advice. Output structural templates when requested."
                 className="bg-sidebar border border-stroke rounded-xl px-4 py-3 text-sm text-title focus:outline-none focus:border-primary transition-colors min-h-[100px] resize-none leading-relaxed"
               ></textarea>
             </div>

             <label className="flex items-center gap-3 p-4 border border-stroke rounded-xl bg-sidebar cursor-pointer hover:border-primary transition-colors group mt-2">
               <div className="relative flex items-center justify-center">
                 <input type="checkbox" defaultChecked className="sr-only peer" />
                 <div className="w-10 h-6 bg-background rounded-full peer peer-checked:bg-primary transition-colors border border-stroke"></div>
                 <div className="absolute left-1 top-1 w-4 h-4 bg-subtitle rounded-full transition-all peer-checked:translate-x-4 peer-checked:bg-black"></div>
               </div>
               <div className="flex flex-col">
                 <span className="text-sm font-bold text-title group-hover:text-primary transition-colors">Enable Google Search Grounding</span>
                 <span className="text-xs text-subtitle">Allows the model to fetch real-time data from the internet.</span>
               </div>
             </label>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-stroke bg-sidebar/30 shrink-0 flex justify-end gap-3">
           <button onClick={onClose} className="px-6 py-3 rounded-xl border border-stroke text-title font-bold hover:bg-sidebar transition-colors text-sm">Cancel</button>
           <button onClick={onClose} className="px-6 py-3 rounded-xl bg-primary text-black font-bold hover:bg-[#3b82f6] transition-colors flex items-center gap-2 text-sm shadow-[0_0_15px_rgba(74,222,128,0.3)]">
              <Save size={16} strokeWidth={2.5}/> Save Configurations
           </button>
        </div>

      </div>
    </div>
  );
};
