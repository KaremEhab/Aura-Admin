import React from 'react';
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, ArrowRight, Brain, Target, Zap } from 'lucide-react';

export const InsightsCard = ({ data }) => {
  // Default data if none provided
  const insights = data?.insights || [
    { type: 'positive', title: 'Revenue Outperforming Targets', description: 'Monthly recurring revenue (MRR) is 12% above projected targets, driven by the new premium tier.' },
    { type: 'warning', title: 'Elevated Churn Risk', description: '24 members have not checked in over the last 14 days. Predictive models show a 60% likelihood of churn.' },
    { type: 'neutral', title: 'Class Capacity Utilization', description: 'Evening HIIT classes are operating at 95% capacity. Consider adding an additional slot at 6:00 PM.' }
  ];

  const recommendations = data?.recommendations || [
    { title: 'Launch Re-engagement Campaign', desc: 'Target the 24 at-risk members with a free personal training session offer.', impact: 'High' },
    { title: 'Expand Evening Schedule', desc: 'Add one new HIIT and one Yoga class between 5 PM and 8 PM.', impact: 'Medium' }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'positive': return <TrendingUp size={16} className="text-green-500" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'negative': return <TrendingDown size={16} className="text-red-500" />;
      default: return <CheckCircle size={16} className="text-blue-500" />;
    }
  };

  const getBg = (type) => {
    switch(type) {
      case 'positive': return 'bg-green-500/10 border-green-500/20';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'negative': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <div className="bg-sidebar border border-stroke rounded-3xl overflow-hidden shadow-2xl w-full mx-auto my-6 relative transition-all duration-300">
      
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500"></div>

      {/* Header */}
      <div className="px-5 py-4 border-b border-stroke flex items-center justify-between bg-sidebar/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 relative">
            <Sparkles size={16} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-title flex items-center gap-2">AI Business Analysis <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/20 text-primary uppercase tracking-widest font-black">Beta</span></h3>
            <span className="text-[10px] text-subtitle">Deep learning operational insights</span>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 bg-background/50 flex flex-col gap-6">
        
        {/* Key Findings */}
        <div>
          <h4 className="text-xs font-bold text-subtitle uppercase tracking-widest mb-4 flex items-center gap-2">
            <Brain size={14} className="text-purple-400" /> Key Findings
          </h4>
          <div className="flex flex-col gap-3">
            {insights.map((insight, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border ${getBg(insight.type)} flex gap-3 items-start`}>
                <div className="shrink-0 mt-0.5">{getIcon(insight.type)}</div>
                <div>
                  <h5 className="text-sm font-bold text-title mb-1">{insight.title}</h5>
                  <p className="text-xs text-subtitle leading-relaxed">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div>
          <h4 className="text-xs font-bold text-subtitle uppercase tracking-widest mb-4 flex items-center gap-2">
            <Target size={14} className="text-primary" /> Recommended Actions
          </h4>
          <div className="flex flex-col gap-3">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="group bg-sidebar border border-stroke hover:border-primary/50 p-4 rounded-2xl flex items-center justify-between gap-4 transition-all cursor-pointer">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="text-sm font-bold text-title group-hover:text-primary transition-colors">{rec.title}</h5>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-widest ${rec.impact === 'High' ? 'bg-primary/20 text-primary' : 'bg-blue-500/20 text-blue-400'}`}>
                      {rec.impact} Impact
                    </span>
                  </div>
                  <p className="text-xs text-subtitle">{rec.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-black transition-colors text-subtitle border border-stroke group-hover:border-primary">
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
