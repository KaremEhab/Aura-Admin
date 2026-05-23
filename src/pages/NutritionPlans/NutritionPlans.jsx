import React, { useState } from 'react';
import { 
  Activity, Plus, Search, Filter, 
  MoreVertical, CheckCircle2, Copy, Trash2, Edit2, Users, Utensils, Save, Star, ArrowRight
} from 'lucide-react';
import './NutritionPlans.css'; 

const mockMasterTemplates = [
  { id: 'DIET-1', name: 'Aggressive Fat Loss (Keto)', tier: 'Global', macros: { p: 30, c: 5, f: 65 }, calories: '1800 kcal', creator: 'Aura Gym (Admin)', uses: 32 },
  { id: 'DIET-2', name: 'Lean Bulking', tier: 'Premium', macros: { p: 30, c: 50, f: 20 }, calories: '3200 kcal', creator: 'Aura Gym (Admin)', uses: 55 },
  { id: 'DIET-3', name: 'VIP Contest Prep', tier: 'VIP', macros: { p: 40, c: 40, f: 20 }, calories: '2100 kcal', creator: 'Aura Gym (Admin)', uses: 12 },
];

const mockPTTemplates = [
  { id: 'PTT-1', name: 'Vegan Muscle Builder', tier: 'Global', macros: { p: 25, c: 55, f: 20 }, calories: '2400 kcal', creator: 'Emma Stone (PT)', uses: 18 },
  { id: 'PTT-2', name: 'Carb Cycling Base', tier: 'Premium', macros: { p: 35, c: 45, f: 20 }, calories: '2200 kcal', creator: 'John Doe (PT)', uses: 9 },
];

const mockAssigned = [
  { id: 'ASN-N1', trainee: 'Alex Mercer', planName: 'Lean Bulking', pt: 'John Doe', status: 'Active (Week 4)', macros: { p: 30, c: 50, f: 20 } },
  { id: 'ASN-N2', trainee: 'Sarah Jenkins', planName: 'VIP Contest Prep', pt: 'Emma Stone', status: 'Active (Week 1)', macros: { p: 40, c: 40, f: 20 } },
  { id: 'ASN-N3', trainee: 'Liam Carter', planName: 'Aggressive Fat Loss', pt: 'John Doe', status: 'Completed', macros: { p: 30, c: 5, f: 65 } },
];

const MacroBar = ({ p, c, f }) => (
  <div className="flex w-full h-1.5 rounded-full overflow-hidden mt-1.5 bg-stroke">
    <div style={{ width: `${p}%`, backgroundColor: '#3b82f6' }} title={`Protein: ${p}%`} />
    <div style={{ width: `${c}%`, backgroundColor: '#22c55e' }} title={`Carbs: ${c}%`} />
    <div style={{ width: `${f}%`, backgroundColor: '#f59e0b' }} title={`Fats: ${f}%`} />
  </div>
);

export function NutritionPlans({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('templates');

  return (
    <div className="workout-container animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1>Nutrition Programming</h1>
          <p className="text-subtitle mt-1">Manage diet templates, assign macronutrient goals, and build dynamic meal blocks.</p>
        </div>
        <button 
          onClick={() => onNavigate('nutrition-builder')}
          className="flex items-center gap-2 bg-primary text-black px-5 py-2.5 rounded-xl text-sm font-black hover:scale-105 transition-transform shadow-[0_4px_15px_rgba(34,197,94,0.3)]"
        >
          <Plus size={18} /> Create Diet Template
        </button>
      </div>

      <div className="fin-tabs flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-stroke">
        {[
          { id: 'templates', label: 'Master Templates (Admin)', icon: Copy },
          { id: 'pt-plans', label: 'PT Created Plans', icon: Star },
          { id: 'assigned', label: 'Assigned to Trainees', icon: Users },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id 
              ? 'bg-sidebar text-primary border-t border-l border-r border-stroke shadow-inner' 
              : 'bg-transparent text-subtitle hover:text-title hover:bg-sidebar border-transparent'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {(activeTab === 'templates' || activeTab === 'pt-plans') && (
        <div className="fin-chart-card animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-title flex items-center gap-2">
              {activeTab === 'templates' ? <><Activity size={18} className="text-primary"/> Admin Master Library</> : <><Star size={18} className="text-yellow-500"/> Personal Trainer Plans</>}
            </h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtitle" size={16} />
              <input type="text" placeholder="Search diets..." className="w-full bg-background border border-stroke rounded-lg pl-9 pr-4 py-2 text-sm text-title focus:outline-none focus:border-primary" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === 'templates' ? mockMasterTemplates : mockPTTemplates).map(tpl => (
              <div key={tpl.id} className="bg-background border border-stroke rounded-xl p-5 hover:border-primary transition-colors group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-2">
                    <span className={`text-[10px] font-bold uppercase border px-2 py-1 rounded ${
                      tpl.tier === 'VIP' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                      tpl.tier === 'Premium' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' : 
                      'bg-sidebar text-subtitle border-stroke'
                    }`}>{tpl.tier}</span>
                  </div>
                  <button className="text-subtitle hover:text-title"><MoreVertical size={16}/></button>
                </div>
                <h3 className="font-black text-xl text-title mb-1">{tpl.name}</h3>
                
                <div className="my-4">
                  <div className="flex justify-between items-center text-xs font-bold mb-1">
                    <div className="flex gap-2">
                      <span className="text-blue-500">P:{tpl.macros.p}%</span>
                      <span className="text-green-500">C:{tpl.macros.c}%</span>
                      <span className="text-yellow-500">F:{tpl.macros.f}%</span>
                    </div>
                    <span className="text-title bg-sidebar px-2 py-1 rounded">{tpl.calories}</span>
                  </div>
                  <MacroBar p={tpl.macros.p} c={tpl.macros.c} f={tpl.macros.f} />
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-stroke mb-4">
                  <span className="text-sm font-medium text-title flex items-center gap-1.5 text-subtitle">By: {tpl.creator}</span>
                  <span className="text-sm font-medium text-title flex items-center gap-1.5 bg-sidebar px-2 py-1 rounded"><Users size={14} className="text-primary"/> {tpl.uses}</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-primary-lite text-primary border border-primary-border py-2 rounded-lg text-sm font-bold hover:bg-primary hover:text-black transition-colors flex items-center justify-center gap-2">Assign <ArrowRight size={14}/></button>
                  <button onClick={() => onNavigate('nutrition-builder')} className="p-2 bg-sidebar border border-stroke rounded-lg text-subtitle hover:text-title transition-colors"><Edit2 size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'assigned' && (
        <div className="fin-chart-card animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-title flex items-center gap-2"><Users size={18} className="text-blue-500"/> Active Trainee Assignments</h3>
            <div className="flex gap-2">
              <button className="bg-primary text-black px-4 py-1.5 rounded-lg text-sm font-bold shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:scale-105 transition-transform flex items-center gap-2">
                <Plus size={16} /> Assign New Trainee
              </button>
              <button className="bg-background border border-stroke px-3 py-1.5 rounded-lg text-sm font-bold text-title hover:bg-stroke transition-colors flex items-center gap-1">
                <Filter size={14} /> Filter
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stroke text-xs text-subtitle uppercase tracking-wider">
                  <th className="pb-3 font-bold w-1/4">Trainee</th>
                  <th className="pb-3 font-bold w-1/4">Assigned Diet</th>
                  <th className="pb-3 font-bold">Macros (P/C/F)</th>
                  <th className="pb-3 font-bold">Assigned By</th>
                  <th className="pb-3 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockAssigned.map(asn => (
                  <tr key={asn.id} className="border-b border-stroke hover:bg-background transition-colors cursor-pointer group">
                    <td className="py-4 font-bold text-title group-hover:text-primary transition-colors">{asn.trainee}</td>
                    <td className="py-4 font-bold text-subtitle">{asn.planName}</td>
                    <td className="py-4">
                      <div className="w-32">
                        <MacroBar p={asn.macros.p} c={asn.macros.c} f={asn.macros.f} />
                      </div>
                    </td>
                    <td className="py-4 text-sm font-medium text-title">{asn.pt}</td>
                    <td className="py-4 text-right">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border w-fit ml-auto flex items-center gap-1 ${
                        asn.status.includes('Completed') ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}>
                        {asn.status.includes('Completed') ? <CheckCircle2 size={12}/> : <Activity size={12}/>} {asn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
