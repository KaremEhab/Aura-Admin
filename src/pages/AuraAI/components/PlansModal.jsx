import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export const PlansModal = ({ isOpen, onClose, hideTab }) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 300); // 300ms matches transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 z-20 bg-background/40 backdrop-blur-xl transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose} 
      />
      <div 
        className={`absolute top-[80px] left-1/2 z-40 w-[95%] max-w-[1300px] px-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${isVisible ? 'opacity-100 translate-y-0 scale-100 -translate-x-1/2' : 'opacity-0 -translate-y-4 scale-[0.98] -translate-x-1/2'}`}
      >
        {!hideTab && (
          <div className="flex justify-center -mb-[1px] relative z-10">
            <div className="w-16 h-6 bg-background border-t border-x border-stroke rounded-t-xl flex justify-center items-center cursor-pointer hover:bg-sidebar transition-colors" onClick={onClose}>
              <div className="w-2 h-2 border-t-2 border-r-2 border-stroke -rotate-45 mt-1" />
            </div>
          </div>
        )}
        
        {/* Main Panel */}
        <div className="bg-background border border-stroke rounded-3xl p-6 shadow-2xl flex flex-col lg:flex-row gap-6">
          
          {/* Card 1: Basic Plan */}
          <div className="flex-1 bg-background border border-stroke rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <Sparkles size={20} className="text-subtitle" />
              <span className="px-3 py-1 rounded-full border border-gray-600 text-[10px] text-subtitle font-bold uppercase tracking-wider">Basic Plan</span>
            </div>
            <h3 className="text-xl font-medium text-title mb-3">AI-Powered Product Descriptions</h3>
            <p className="text-sm text-subtitle mb-8 leading-relaxed">
              Use AuraAI to create personalized workout plans and nutritional guidance for your clients, AI powered
            </p>
            <ul className="flex flex-col gap-4 mb-10 flex-1">
              {[
                'Generate custom workout plans with AuraAI',
                'AI-Driven Nutritional Plans for Optimal Results',
                'Real-Time Form Correction Using Computer Vision',
                'Personalized Meditation Sessions Tailored by AI',
                'AI-Powered Progress Tracking and Motivation Alerts'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[13px] text-title">
                  <div className="bg-white rounded-full p-1 flex items-center justify-center shrink-0">
                    <Zap size={10} className="text-black" fill="black" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <button onClick={onClose} className="w-full py-3 rounded-full border border-gray-600 text-sm text-title font-medium hover:text-title hover:bg-gray-800 transition-colors">
              Cancel current plan
            </button>
          </div>

          {/* Card 2: VR Fitness */}
          <div className="flex-1 bg-background border border-stroke rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <Sparkles size={20} className="text-subtitle" />
              <span className="px-3 py-1 rounded-full border border-gray-600 text-[10px] text-subtitle font-bold uppercase tracking-wider">Exclusive Access</span>
            </div>
            <h3 className="text-xl font-medium text-title mb-3">Virtual Reality Fitness Experiences</h3>
            <p className="text-sm text-subtitle mb-8 leading-relaxed">
              Immerse yourself in interactive VR workouts that adapt to your fitness level and goals.
            </p>
            <ul className="flex flex-col gap-4 mb-10 flex-1">
              {[
                'Explore virtual fitness classes with expert trainers',
                'Engage in gamified exercise challenges for motivation',
                'Experience real-time feedback in a virtual environment',
                'Join live VR group sessions to stay connected',
                'Track your VR workout stats seamlessly'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[13px] text-title">
                  <div className="bg-white rounded-full p-1 flex items-center justify-center shrink-0">
                    <Zap size={10} className="text-black" fill="black" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between mt-auto">
              <button onClick={onClose} className="text-sm text-subtitle font-medium hover:text-title transition-colors">Maybe later</button>
              <button className="px-6 py-3 rounded-full border border-primary-border bg-primary-lite text-primary text-sm font-medium flex items-center gap-2 hover:bg-sidebar transition-colors">
                Upgrade Your Plan <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 3: Pro Feature */}
          <div className="flex-1 bg-background border-2 border-primary-border rounded-2xl p-6 flex flex-col relative overflow-hidden group">
            {/* Glowing Orb Gradient */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary rounded-full mix-blend-screen filter blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-lite via-transparent to-transparent opacity-80"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <Sparkles size={20} className="text-primary" />
              <span className="px-3 py-1 rounded-full border border-[#fb923c]/20 text-[10px] text-secondary font-bold uppercase tracking-wider">Pro Feature</span>
            </div>
            <h3 className="text-xl font-medium text-title mb-3 relative z-10">Advanced Biometric Integration</h3>
            <p className="text-sm text-title mb-8 leading-relaxed relative z-10">
              Sync comprehensive biometric data like heart rate variability and sleep patterns for health monitoring.
            </p>
            <ul className="flex flex-col gap-4 mb-10 flex-1 relative z-10">
              {[
                'Monitor recovery and stress through biometric insights',
                'Optimize workouts based on detailed health metrics',
                'Receive personalized alerts for overtraining risks',
                'Integrate seamlessly with wearable devices',
                'Analyze trends to improve long-term performance'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[13px] text-title relative z-10">
                  <div className="bg-white rounded-full p-1 flex items-center justify-center shrink-0">
                    <Zap size={10} className="text-black" fill="black" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between mt-auto relative z-10">
              <button onClick={onClose} className="text-sm text-title font-medium hover:text-title transition-colors">Remind me later</button>
              <button className="px-6 py-3 rounded-full bg-primary text-black text-sm font-bold flex items-center gap-2 hover:bg-[#22c55e] transition-colors">
                Upgrade Your Plan <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
