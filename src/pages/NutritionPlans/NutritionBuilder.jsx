import React, { useState } from 'react';
import { 
  ArrowLeft, Save, Plus, Trash2, Utensils, Search, PieChart, Clock
} from 'lucide-react';
import '../WorkoutPlans/WorkoutPlans.css';

const mockIngredientsDB = [
  { id: 'ING-1', name: 'Chicken Breast (Raw)', p: 23, c: 0, f: 1.2, cals: 110, baseAmt: 100, unit: 'g' },
  { id: 'ING-2', name: 'White Rice (Cooked)', p: 2.7, c: 28, f: 0.3, cals: 130, baseAmt: 100, unit: 'g' },
  { id: 'ING-3', name: 'Oats (Raw)', p: 13, c: 68, f: 6.5, cals: 389, baseAmt: 100, unit: 'g' },
  { id: 'ING-4', name: 'Whole Milk', p: 3.4, c: 4.8, f: 3.2, cals: 61, baseAmt: 100, unit: 'ml' },
  { id: 'ING-5', name: 'Whey Protein Isolate', p: 25, c: 1, f: 0.5, cals: 110, baseAmt: 30, unit: 'g' },
];

export function NutritionBuilder({ onNavigate }) {
  const [durationWeeks, setDurationWeeks] = useState(4);
  
  const [days, setDays] = useState([
    {
      id: 'day-1',
      title: 'Day 1 (Training)',
      globalTargets: { p: 180, c: 250, f: 65, cals: 2305 },
      meals: [
        { id: 1, name: 'Breakfast', items: [] },
        { id: 2, name: 'Lunch', items: [] },
        { id: 3, name: 'Dinner', items: [] },
      ]
    }
  ]);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMealId, setActiveMealId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const activeDay = days[activeDayIndex] || days[0];

  const handleAddDay = () => {
    setDays([...days, {
      id: `day-${Date.now()}`,
      title: `Day ${days.length + 1} (New)`,
      globalTargets: { p: 150, c: 200, f: 60, cals: 2000 },
      meals: [ { id: 1, name: 'Breakfast', items: [] } ]
    }]);
    setActiveDayIndex(days.length);
  };

  const updateGlobalTarget = (key, val) => {
    const nDays = [...days];
    nDays[activeDayIndex].globalTargets[key] = val;
    setDays(nDays);
  };

  // Calculate total consumed across ALL meals in ACTIVE DAY
  const getTotalConsumed = () => {
    let tp = 0, tc = 0, tf = 0, tcal = 0;
    activeDay.meals.forEach(meal => {
      meal.items.forEach(item => {
        const mult = item.amount / item.baseAmt;
        tp += item.p * mult;
        tc += item.c * mult;
        tf += item.f * mult;
        tcal += item.cals * mult;
      });
    });
    return { p: Math.round(tp), c: Math.round(tc), f: Math.round(tf), cals: Math.round(tcal) };
  };

  const consumed = getTotalConsumed();
  const remaining = {
    p: Math.max(0, activeDay.globalTargets.p - consumed.p),
    c: Math.max(0, activeDay.globalTargets.c - consumed.c),
    f: Math.max(0, activeDay.globalTargets.f - consumed.f),
    cals: Math.max(0, activeDay.globalTargets.cals - consumed.cals),
  };

  // Calculate macros for a single meal
  const getMealCurrents = (items) => {
    let cp = 0, cc = 0, cf = 0, ccal = 0;
    items.forEach(item => {
      const mult = item.amount / item.baseAmt;
      cp += item.p * mult;
      cc += item.c * mult;
      cf += item.f * mult;
      ccal += item.cals * mult;
    });
    return { p: Math.round(cp), c: Math.round(cc), f: Math.round(cf), cals: Math.round(ccal) };
  };

  // Smart Add
  const openSmartSelector = (mealId) => {
    setActiveMealId(mealId);
    setIsModalOpen(true);
  };

  const addSmartItem = (ingredient) => {
    let targetMultiplier = 1;
    if (ingredient.p > 5 && remaining.p > 0) targetMultiplier = remaining.p / ingredient.p;
    else if (ingredient.c > 5 && remaining.c > 0) targetMultiplier = remaining.c / ingredient.c;
    
    if (targetMultiplier < 0.2) targetMultiplier = 1;
    const suggestedAmount = Math.round(ingredient.baseAmt * targetMultiplier);
    const newItem = { ...ingredient, amount: suggestedAmount };
    
    const nDays = [...days];
    nDays[activeDayIndex].meals = nDays[activeDayIndex].meals.map(m => m.id === activeMealId ? { ...m, items: [...m.items, newItem] } : m);
    setDays(nDays);
    setIsModalOpen(false);
  };

  const removeItem = (mealId, itemIdx) => {
    const nDays = [...days];
    nDays[activeDayIndex].meals = nDays[activeDayIndex].meals.map(m => {
      if (m.id === mealId) {
        const newItems = [...m.items];
        newItems.splice(itemIdx, 1);
        return { ...m, items: newItems };
      }
      return m;
    });
    setDays(nDays);
  };

  const addMeal = () => {
    const nDays = [...days];
    nDays[activeDayIndex].meals.push({ id: Date.now(), name: `Meal ${nDays[activeDayIndex].meals.length + 1}`, items: [] });
    setDays(nDays);
  };

  const GlobalProgressBar = ({ current, target, colorHex }) => {
    const pct = Math.min((current / target) * 100, 100) || 0;
    const isOver = current > target;
    return (
      <div className="w-full bg-stroke rounded-full h-2 overflow-hidden mt-1 relative">
        <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: isOver ? '#ef4444' : colorHex }}></div>
      </div>
    );
  };

  return (
    <div className="workout-container animate-fade-in relative">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-sidebar border border-stroke p-4 rounded-xl sticky top-4 z-20 shadow-lg">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('nutrition-plans')} className="p-2 bg-background border border-stroke rounded-lg text-title hover:bg-stroke transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl m-0">Diet Builder</h1>
            <p className="text-xs text-subtitle flex items-center gap-1 text-primary">By: Aura Gym (Admin)</p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={() => onNavigate('nutrition-plans')} className="flex-1 md:flex-none px-4 py-2 bg-background border border-stroke rounded-xl text-sm font-bold text-subtitle hover:text-title">Cancel</button>
          <button onClick={() => onNavigate('nutrition-plans')} className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-primary text-black px-6 py-2 rounded-xl text-sm font-black shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:scale-105 transition-transform">
            <Save size={16} /> Save Diet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Metadata & Master Scoreboard */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="fin-chart-card">
            <h3 className="font-bold text-title mb-4 border-b border-stroke pb-3 flex items-center gap-2">
              <Utensils size={16} className="text-primary"/> Plan Details
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-subtitle uppercase mb-2">Plan Name</label>
                <input type="text" placeholder="e.g. Lean Bulk" className="w-full bg-background border border-stroke rounded-lg px-4 py-2 text-sm font-medium text-title focus:outline-none focus:border-primary" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-subtitle uppercase mb-2 flex items-center gap-1"><Clock size={12}/> Duration (Weeks)</label>
                  <input type="number" value={durationWeeks} onChange={(e) => setDurationWeeks(e.target.value)} className="w-full bg-background border border-stroke rounded-lg px-4 py-2 text-sm font-black text-title focus:outline-none focus:border-primary" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-subtitle uppercase mb-2">Target Tier</label>
                  <select className="w-full bg-background border border-stroke rounded-lg px-4 py-2 text-sm font-medium text-title focus:outline-none focus:border-primary">
                    <option>Global</option>
                    <option>VIP Only</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="fin-chart-card bg-sidebar border-2 border-stroke">
            <h3 className="font-bold text-title mb-4 border-b border-stroke pb-3 flex items-center justify-between">
              <span className="flex items-center gap-2"><PieChart size={16} className="text-yellow-500"/> Daily Macro Tracker</span>
            </h3>
            
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div>
                  <label className="block text-[10px] font-bold text-subtitle uppercase mb-1">Target Calories</label>
                  <input type="number" value={activeDay.globalTargets.cals} onChange={(e) => updateGlobalTarget('cals', Number(e.target.value))} className="w-full bg-background border border-stroke rounded-md px-2 py-1.5 text-lg font-black text-title focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-subtitle uppercase mb-1">Target Protein (g)</label>
                  <input type="number" value={activeDay.globalTargets.p} onChange={(e) => updateGlobalTarget('p', Number(e.target.value))} className="w-full bg-background border border-stroke rounded-md px-2 py-1.5 text-lg font-black text-blue-500 focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="flex flex-col gap-4 bg-background p-4 rounded-xl border border-stroke">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-bold"><span className="text-blue-500">Protein</span><span className="text-title">{consumed.p} / {activeDay.globalTargets.p}g</span></div>
                  <GlobalProgressBar current={consumed.p} target={activeDay.globalTargets.p} colorHex="#3b82f6" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-bold"><span className="text-green-500">Carbs</span><span className="text-title">{consumed.c} / {activeDay.globalTargets.c}g</span></div>
                  <GlobalProgressBar current={consumed.c} target={activeDay.globalTargets.c} colorHex="#22c55e" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-bold"><span className="text-yellow-500">Fats</span><span className="text-title">{consumed.f} / {activeDay.globalTargets.f}g</span></div>
                  <GlobalProgressBar current={consumed.f} target={activeDay.globalTargets.f} colorHex="#eab308" />
                </div>
                <div className="mt-2 pt-3 border-t border-stroke flex justify-between items-center font-black">
                  <span className="text-sm text-subtitle uppercase">Calories Left</span><span className="text-xl text-primary">{remaining.cals}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Meal List & Day Selector */}
        <div className="lg:col-span-2">
          <div className="fin-chart-card min-h-[500px] flex flex-col">
            
            {/* Day Tabs */}
            <div className="flex items-center justify-between overflow-x-auto bg-sidebar border border-stroke p-2 mb-6 rounded-xl shrink-0 gap-2">
              <div className="flex gap-1 overflow-x-auto custom-scrollbar">
                {days.map((day, idx) => (
                  <button key={day.id} onClick={() => setActiveDayIndex(idx)} className={`px-4 py-2 rounded-lg text-sm font-bold shrink-0 ${activeDayIndex === idx ? 'bg-background text-title border border-stroke shadow-sm' : 'text-subtitle hover:text-title hover:bg-background/50'}`}>Day {idx + 1}</button>
                ))}
              </div>
              <button onClick={handleAddDay} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary hover:text-black transition-colors shrink-0">
                <Plus size={14} /> Add Day
              </button>
            </div>

            <div className="flex justify-between items-center mb-6 pb-3 border-b border-stroke">
              <input type="text" value={activeDay.title} onChange={(e) => { const n = [...days]; n[activeDayIndex].title = e.target.value; setDays(n); }} className="font-bold text-title text-lg bg-transparent border-none focus:outline-none focus:border-b focus:border-primary w-2/3" />
              <button onClick={addMeal} className="flex items-center gap-1.5 bg-sidebar border border-stroke text-title px-3 py-1.5 rounded-lg text-xs font-bold hover:text-primary transition-colors">
                <Plus size={14} /> Add Meal
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {activeDay.meals.map((meal, mIdx) => {
                const mealMacros = getMealCurrents(meal.items);

                return (
                  <div key={meal.id} className="bg-background border border-stroke rounded-xl p-0 overflow-hidden shrink-0">
                    <div className="flex justify-between items-center bg-sidebar px-4 py-3 border-b border-stroke">
                      <div className="flex items-center gap-2">
                        <Utensils size={16} className="text-subtitle" />
                        <input type="text" value={meal.name} onChange={(e) => { const n = [...days]; n[activeDayIndex].meals[mIdx].name = e.target.value; setDays(n); }} className="bg-transparent border-none text-base font-black text-title focus:outline-none w-32" />
                      </div>
                      
                      {meal.items.length > 0 && (
                        <div className="flex gap-3 text-xs font-bold bg-background px-3 py-1.5 rounded-lg border border-stroke">
                          <span className="text-blue-500">{mealMacros.p}g P</span>
                          <span className="text-green-500">{mealMacros.c}g C</span>
                          <span className="text-yellow-500">{mealMacros.f}g F</span>
                          <span className="text-title border-l border-stroke pl-3">{mealMacros.cals} kcal</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col gap-3">
                      {meal.items.length === 0 ? (
                        <div className="text-center py-6 text-sm font-medium text-subtitle">No food added to this meal yet.</div>
                      ) : (
                        meal.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-background border border-stroke px-4 py-3 rounded-lg group hover:border-primary transition-colors shrink-0">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-title">{item.name}</span>
                              <span className="text-[10px] text-subtitle font-medium">P: {Math.round(item.p * (item.amount/item.baseAmt))}g • C: {Math.round(item.c * (item.amount/item.baseAmt))}g • F: {Math.round(item.f * (item.amount/item.baseAmt))}g</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="bg-sidebar border border-stroke rounded flex items-center px-2 py-1">
                                <input type="number" value={item.amount} onChange={(e) => {
                                  const nDays = [...days];
                                  nDays[activeDayIndex].meals[mIdx].items[idx].amount = Number(e.target.value);
                                  setDays(nDays);
                                }} className="w-16 bg-transparent text-sm font-bold text-title focus:outline-none text-right" />
                                <span className="text-xs font-bold text-subtitle ml-1">{item.unit}</span>
                              </div>
                              <button onClick={() => removeItem(meal.id, idx)} className="text-subtitle hover:text-red-500 transition-colors p-1"><Trash2 size={16}/></button>
                            </div>
                          </div>
                        ))
                      )}

                      <button onClick={() => openSmartSelector(meal.id)} className="w-full py-3 mt-2 border-2 border-dashed border-stroke bg-transparent rounded-lg flex items-center justify-center gap-2 text-sm font-bold text-primary hover:bg-sidebar transition-colors">
                        <Plus size={16} /> Add Food
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-stroke rounded-2xl w-full max-w-xl shadow-2xl animate-fade-in flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-stroke flex flex-col gap-4 bg-sidebar rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-title flex items-center gap-2"><Search size={18} className="text-primary"/> Add Food Item</h3>
                  <p className="text-xs text-subtitle mt-1">We'll automatically calculate the grams needed to hit your daily goal.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-subtitle hover:text-title p-2">✕</button>
              </div>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtitle" />
                <input type="text" placeholder="Search meals or ingredients..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-background border border-stroke rounded-lg pl-9 pr-4 py-2 text-sm font-medium text-title focus:outline-none focus:border-primary"/>
              </div>
            </div>
            <div className="p-4 bg-background border-b border-stroke text-center flex flex-col gap-1">
              <span className="text-xs font-bold text-subtitle uppercase tracking-widest">Global Macros Remaining</span>
              <div className="flex justify-center gap-4 text-sm font-black">
                <span className="text-blue-500">{remaining.p}g Pro</span>
                <span className="text-green-500">{remaining.c}g Carb</span>
                <span className="text-yellow-500">{remaining.f}g Fat</span>
              </div>
            </div>
            <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-3 custom-scrollbar">
              {mockIngredientsDB.filter(ing => ing.name.toLowerCase().includes(searchTerm.toLowerCase())).map(ing => (
                <div key={ing.id} className="flex justify-between items-center bg-sidebar border border-stroke p-3 rounded-xl hover:border-primary transition-colors cursor-pointer group shrink-0" onClick={() => addSmartItem(ing)}>
                  <div>
                    <h4 className="text-sm font-bold text-title">{ing.name}</h4>
                    <div className="text-[10px] font-bold text-subtitle mt-1 flex gap-2"><span>{ing.cals} kcal / {ing.baseAmt}{ing.unit}</span></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-primary font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">Auto-Scale</span>
                    <button className="p-2 bg-background border border-stroke rounded-lg text-title group-hover:bg-primary group-hover:text-black transition-colors"><Plus size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
