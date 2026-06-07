import React, { useState } from 'react';
import { Utensils, Flame, ChevronDown, CheckCircle, Activity, Info } from 'lucide-react';

export const NutritionTemplateCard = ({ data, status = 'success', onApprove, onReject }) => {
  const [expandedDayId, setExpandedDayId] = useState(data?.days?.[0]?.id || null);

  if (!data) return null;

  return (
    <div className="bg-sidebar border border-stroke rounded-3xl overflow-hidden shadow-2xl w-full mx-auto my-6 relative transition-all duration-300">
      
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-primary to-green-500"></div>

      {/* Header */}
      <div className="px-5 py-4 border-b border-stroke flex flex-col md:flex-row md:items-center justify-between bg-sidebar/50 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
            <Utensils size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-title flex items-center gap-2">
              {data.templateName}
            </h3>
            <div className="text-xs text-subtitle flex items-center gap-3 mt-1 font-medium">
              <span className="flex items-center gap-1"><Flame size={12} className="text-orange-400"/> {data.goal}</span>
              <span className="w-1 h-1 rounded-full bg-stroke"></span>
              <span className="text-blue-400">{data.dietType}</span>
              <span className="w-1 h-1 rounded-full bg-stroke"></span>
              <span>{data.durationWeeks} Weeks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 md:p-6 bg-background/50 flex flex-col gap-4">
        {data.days?.map((day) => {
          const isExpanded = expandedDayId === day.id;

          return (
            <div key={day.id} className="bg-sidebar border border-stroke rounded-2xl overflow-hidden transition-all duration-300">
              
              {/* Day Header (Clickable) */}
              <button 
                onClick={() => setExpandedDayId(isExpanded ? null : day.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-background/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-background border border-stroke flex items-center justify-center text-subtitle">
                    <Activity size={14} className={isExpanded ? 'text-blue-500' : ''}/>
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-title">{day.title}</h4>
                    <p className="text-[11px] text-subtitle font-medium">{day.globalTargets.cals} kcal • {day.globalTargets.p}g P • {day.globalTargets.c}g C • {day.globalTargets.f}g F</p>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-blue-500/10 text-blue-500' : 'bg-background text-subtitle'}`}>
                  <ChevronDown size={16} />
                </div>
              </button>

              {/* Day Content (Expandable) */}
              <div 
                className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
              >
                <div className="p-4 pt-0 border-t border-stroke/50">
                  
                  {/* Macro Progress Bars */}
                  <div className="grid grid-cols-4 gap-2 my-4">
                    <div className="bg-background border border-stroke rounded-xl p-2 flex flex-col items-center justify-center gap-1">
                      <span className="text-[9px] font-bold text-subtitle uppercase tracking-widest">Cals</span>
                      <span className="text-xs font-black text-title">{day.globalTargets.cals}</span>
                    </div>
                    <div className="bg-background border border-stroke rounded-xl p-2 flex flex-col items-center justify-center gap-1 relative overflow-hidden group">
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500/20"></div>
                      <span className="text-[9px] font-bold text-subtitle uppercase tracking-widest">Prot</span>
                      <span className="text-xs font-black text-red-400">{day.globalTargets.p}g</span>
                    </div>
                    <div className="bg-background border border-stroke rounded-xl p-2 flex flex-col items-center justify-center gap-1 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500/20"></div>
                      <span className="text-[9px] font-bold text-subtitle uppercase tracking-widest">Carb</span>
                      <span className="text-xs font-black text-blue-400">{day.globalTargets.c}g</span>
                    </div>
                    <div className="bg-background border border-stroke rounded-xl p-2 flex flex-col items-center justify-center gap-1 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-500/20"></div>
                      <span className="text-[9px] font-bold text-subtitle uppercase tracking-widest">Fat</span>
                      <span className="text-xs font-black text-yellow-400">{day.globalTargets.f}g</span>
                    </div>
                  </div>

                  {/* Meals List */}
                  <div className="flex flex-col gap-3 mt-4">
                    {day.meals?.map((meal, idx) => (
                      <div key={idx} className="bg-background border border-stroke rounded-xl p-3">
                        <h5 className="text-[11px] font-bold text-subtitle uppercase tracking-widest mb-2 px-1 flex items-center justify-between">
                          {meal.name}
                          <span className="text-[10px] font-medium text-subtitle lowercase bg-sidebar px-2 py-0.5 rounded-md">
                            {meal.items.reduce((acc, item) => acc + item.cals, 0)} kcal
                          </span>
                        </h5>
                        <div className="flex flex-col gap-1">
                          {meal.items?.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-center justify-between py-1.5 px-2 hover:bg-sidebar rounded-lg transition-colors">
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-title">{item.name}</span>
                                <span className="text-[10px] text-subtitle">{item.amount}{item.unit}</span>
                              </div>
                              <div className="flex items-center gap-3 text-[10px] font-medium text-subtitle">
                                <span className="w-8 text-right"><span className="text-red-400">{item.p}</span>p</span>
                                <span className="w-8 text-right"><span className="text-blue-400">{item.c}</span>c</span>
                                <span className="w-8 text-right"><span className="text-yellow-400">{item.f}</span>f</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      {status === 'pending' && onApprove && onReject && (
        <div className="p-4 border-t border-stroke bg-sidebar/50 flex flex-col sm:flex-row justify-end gap-3 shrink-0">
          <button 
            onClick={onReject}
            className="px-5 py-2.5 rounded-xl border border-stroke text-title font-bold hover:bg-background transition-colors text-sm w-full sm:w-auto"
          >
            Modify Plan
          </button>
          <button 
            onClick={onApprove}
            className="px-5 py-2.5 rounded-xl bg-primary text-black font-bold hover:bg-[#3b82f6] transition-colors flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(74,222,128,0.2)] w-full sm:w-auto"
          >
            <CheckCircle size={16} /> Assign to Target
          </button>
        </div>
      )}

      {status === 'loading' && (
        <div className="p-4 border-t border-stroke bg-sidebar/50 flex justify-center items-center gap-3">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-bold text-title animate-pulse">Syncing to member profiles...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="p-4 border-t border-stroke bg-sidebar/50 flex justify-between items-center">
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle size={16} />
            <span className="text-sm font-bold">Successfully Assigned</span>
          </div>
          <button className="text-xs font-bold text-subtitle hover:text-title transition-colors flex items-center gap-1">
            <Info size={14} /> View Details
          </button>
        </div>
      )}

    </div>
  );
};
