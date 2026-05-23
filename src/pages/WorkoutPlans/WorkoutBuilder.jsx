import React, { useState } from 'react';
import { 
  ArrowLeft, Save, Plus, Trash2, GripVertical, PlayCircle, Clock, Link as LinkIcon, AlertCircle, TrendingUp, TrendingDown, RefreshCw, BookOpen
} from 'lucide-react';
import './WorkoutPlans.css';

const mockExercises = [
  { 
    id: 1, 
    type: 'single', 
    name: 'Barbell Back Squat', 
    sets: 4, 
    reps: '8-10', 
    rest: '90s', 
    rpe: '8', 
    rir: '2',
    alternative: 'Leg Press',
    progression: '+2.5kg / week'
  },
  { 
    id: 2, 
    type: 'superset', 
    rest: '120s',
    exercises: [
      { id: '2a', name: 'Dumbbell Bench Press', sets: 3, reps: '10', rpe: '9', rir: '1', alternative: 'Machine Chest Press', progression: 'Manual' },
      { id: '2b', name: 'Incline Dumbbell Row', sets: 3, reps: '12', rpe: '8', rir: '2', alternative: 'Seated Cable Row', progression: '+1 rep / week' }
    ]
  },
  { 
    id: 3, 
    type: 'dropset', 
    rest: 'No Rest',
    exercises: [
      { id: '3a', name: 'Leg Extension (Heavy)', sets: 1, reps: '8-10', rpe: '9', rir: '1', alternative: 'Sissy Squat', progression: 'Manual' },
      { id: '3b', name: 'Leg Extension (-20% Weight)', sets: 1, reps: 'AMRAP', rpe: '10', rir: '0', alternative: '', progression: 'Manual' },
      { id: '3c', name: 'Leg Extension (-20% Weight)', sets: 1, reps: 'AMRAP', rpe: '10', rir: '0', alternative: '', progression: 'Manual' }
    ]
  },
];

export function WorkoutBuilder({ onNavigate }) {
  const [exercises, setExercises] = useState(mockExercises);

  return (
    <div className="workout-container animate-fade-in">
      {/* Top Navigation Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-sidebar border border-stroke p-4 rounded-xl sticky top-4 z-20 shadow-lg">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('workout-plans')} className="p-2 bg-background border border-stroke rounded-lg text-title hover:bg-stroke transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl m-0">Workout Template Builder</h1>
            <p className="text-xs text-subtitle flex items-center gap-1"><TrendingUp size={12}/> Advanced Programming Engine</p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={() => onNavigate('workout-plans')} className="flex-1 md:flex-none px-4 py-2 bg-background border border-stroke rounded-xl text-sm font-bold text-subtitle hover:text-title">Cancel</button>
          <button onClick={() => onNavigate('workout-plans')} className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-primary text-black px-6 py-2 rounded-xl text-sm font-black shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:scale-105 transition-transform">
            <Save size={16} /> Save Template
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Metadata */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="fin-chart-card">
            <h3 className="font-bold text-title mb-4 border-b border-stroke pb-3">Plan Metadata</h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-subtitle uppercase mb-2">Template Name</label>
                <input type="text" placeholder="e.g. Push Day Alpha" className="w-full bg-background border border-stroke rounded-lg px-4 py-2.5 text-sm font-medium text-title focus:outline-none focus:border-primary" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-subtitle uppercase mb-2">Target Trainee Tier</label>
                <select className="w-full bg-background border border-stroke rounded-lg px-4 py-2.5 text-sm font-medium text-primary focus:outline-none focus:border-primary border-primary">
                  <option>Global (All Trainees)</option>
                  <option>VIP Only</option>
                  <option>Premium Members</option>
                  <option>Standard / Base</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-subtitle uppercase mb-2">Primary Goal</label>
                <select className="w-full bg-background border border-stroke rounded-lg px-4 py-2.5 text-sm font-medium text-title focus:outline-none focus:border-primary">
                  <option>Muscle Gain (Hypertrophy)</option>
                  <option>Strength & Power</option>
                  <option>Weight Loss (Conditioning)</option>
                  <option>Mobility & Rehab</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-subtitle uppercase mb-2">Difficulty Level</label>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg border border-primary bg-primary-lite text-primary text-xs font-bold">Beginner</button>
                  <button className="flex-1 py-2 rounded-lg border border-stroke bg-background text-subtitle hover:text-title text-xs font-bold">Intermediate</button>
                  <button className="flex-1 py-2 rounded-lg border border-stroke bg-background text-subtitle hover:text-title text-xs font-bold">Advanced</button>
                </div>
              </div>
            </div>
          </div>

          {/* GLOSSARY CARD */}
          <div className="fin-chart-card bg-sidebar">
            <h3 className="font-bold text-title flex items-center gap-2 mb-4 border-b border-stroke pb-3"><BookOpen size={16} className="text-blue-500"/> Terminology Guide</h3>
            <div className="flex flex-col gap-3 text-xs">
              <div><strong className="text-blue-500">Sets/Reps:</strong> The total volume of an exercise (e.g. 3 sets of 10 reps).</div>
              <div><strong className="text-green-500">Rest:</strong> The exact recovery time between sets (e.g. 90s).</div>
              <div><strong className="text-red-500">RPE (1-10):</strong> Rate of Perceived Exertion. How hard the set should feel. 10 = Absolute failure.</div>
              <div><strong className="text-yellow-500">RIR (0-5):</strong> Reps in Reserve. How many reps you should leave in the tank. RIR 0 = Failure.</div>
              <div><strong className="text-blue-500">Superset:</strong> Performing 2+ exercises back-to-back with no rest between them.</div>
              <div><strong className="text-purple-500">Dropset:</strong> Performing a set to failure, immediately dropping the weight, and doing more reps to failure.</div>
            </div>
          </div>
        </div>

        {/* Right Column: Routine Builder */}
        <div className="lg:col-span-2">
          <div className="fin-chart-card min-h-[500px]">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-stroke">
              <h3 className="font-bold text-title">Routine Details (Day 1)</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 bg-purple-500/10 text-purple-500 border border-purple-500/20 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-purple-500 hover:text-white transition-colors">
                  <TrendingDown size={14} /> Add Dropset
                </button>
                <button className="flex items-center gap-1.5 bg-blue-500/10 text-blue-500 border border-blue-500/20 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-500 hover:text-white transition-colors">
                  <LinkIcon size={14} /> Add Superset
                </button>
                <button className="flex items-center gap-1.5 bg-primary-lite text-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary hover:text-black transition-colors">
                  <Plus size={14} /> Add Day
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {exercises.map((block, idx) => {
                // RENDER SINGLE EXERCISE
                if (block.type === 'single') {
                  return (
                    <div key={block.id} className="bg-background border border-stroke rounded-xl p-4 flex flex-col md:flex-row items-start md:items-start gap-4 group">
                      <div className="pt-2 cursor-grab text-subtitle hover:text-title hidden md:block"><GripVertical size={16}/></div>
                      
                      <div className="flex-1 w-full flex flex-col gap-3">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <label className="block text-[10px] font-bold text-subtitle uppercase mb-1">Exercise Name</label>
                            <input type="text" defaultValue={block.name} className="w-full bg-sidebar border border-stroke rounded-md px-3 py-1.5 text-sm font-bold text-title focus:outline-none focus:border-primary" />
                          </div>
                          
                          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1">
                            <div className="w-14">
                              <label className="block text-[10px] font-bold text-subtitle uppercase mb-1 text-center">Sets</label>
                              <input type="number" defaultValue={block.sets} className="w-full bg-sidebar border border-stroke rounded-md px-2 py-1.5 text-sm font-medium text-center text-title focus:outline-none focus:border-primary" />
                            </div>
                            <div className="w-16">
                              <label className="block text-[10px] font-bold text-subtitle uppercase mb-1 text-center">Reps</label>
                              <input type="text" defaultValue={block.reps} className="w-full bg-sidebar border border-stroke rounded-md px-2 py-1.5 text-sm font-medium text-center text-title focus:outline-none focus:border-primary" />
                            </div>
                            <div className="w-16">
                              <label className="block text-[10px] font-bold text-subtitle uppercase mb-1 text-center">Rest</label>
                              <input type="text" defaultValue={block.rest} className="w-full bg-sidebar border border-stroke rounded-md px-2 py-1.5 text-sm font-medium text-center text-title focus:outline-none focus:border-primary" />
                            </div>
                            <div className="w-14">
                              <label className="block text-[10px] font-bold text-red-400 uppercase mb-1 text-center" title="Rate of Perceived Exertion">RPE</label>
                              <input type="number" max="10" min="1" defaultValue={block.rpe} className="w-full bg-red-500/10 border border-red-500/20 text-red-500 rounded-md px-2 py-1.5 text-sm font-bold text-center focus:outline-none focus:border-red-500" />
                            </div>
                            <div className="w-14">
                              <label className="block text-[10px] font-bold text-yellow-500 uppercase mb-1 text-center" title="Reps in Reserve">RIR</label>
                              <input type="number" max="5" min="0" defaultValue={block.rir} className="w-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-md px-2 py-1.5 text-sm font-bold text-center focus:outline-none focus:border-yellow-500" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-3 pt-3 border-t border-stroke">
                          <div className="flex-1 relative">
                            <RefreshCw size={12} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-subtitle" />
                            <input type="text" placeholder="Smart Swap Alternative..." defaultValue={block.alternative} className="w-full bg-sidebar border border-stroke rounded-md pl-7 pr-3 py-1.5 text-xs font-medium text-subtitle focus:outline-none focus:border-primary" />
                          </div>
                          <div className="flex-1 relative">
                            <TrendingUp size={12} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-primary" />
                            <select className="w-full bg-sidebar border border-stroke rounded-md pl-7 pr-3 py-1.5 text-xs font-medium text-primary focus:outline-none focus:border-primary appearance-none">
                              <option>{block.progression}</option>
                              <option>Manual Overload</option>
                              <option>+2.5kg / week</option>
                              <option>+1 rep / week</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <button className="p-2 text-red-500 bg-red-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity self-end md:self-start mt-4 md:mt-0">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                } 
                
                // RENDER SUPERSET BLOCK
                else if (block.type === 'superset') {
                  return (
                    <div key={block.id} className="border-2 border-blue-500/30 bg-blue-500/5 rounded-xl p-1 relative">
                      <div className="absolute -top-3 left-4 bg-sidebar border border-blue-500/30 px-3 py-0.5 rounded-full text-[10px] font-black tracking-widest text-blue-500 uppercase flex items-center gap-1 z-10 shadow-sm">
                        <LinkIcon size={12}/> Superset Block
                      </div>
                      
                      <div className="p-3 flex flex-col gap-3">
                        {block.exercises.map((subEx, subIdx) => (
                          <div key={subEx.id} className="bg-background border border-stroke rounded-lg p-3 flex flex-col md:flex-row items-start gap-4">
                            <div className="w-6 h-6 rounded-full bg-sidebar border border-stroke flex items-center justify-center text-xs font-bold text-subtitle shrink-0">
                              {subIdx + 1}
                            </div>
                            
                            <div className="flex-1 w-full flex flex-col gap-3">
                              <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                  <label className="block text-[10px] font-bold text-subtitle uppercase mb-1">Exercise Name</label>
                                  <input type="text" defaultValue={subEx.name} className="w-full bg-sidebar border border-stroke rounded-md px-3 py-1.5 text-sm font-bold text-title focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                  <div className="w-14">
                                    <label className="block text-[10px] font-bold text-subtitle uppercase mb-1 text-center">Sets</label>
                                    <input type="number" defaultValue={subEx.sets} className="w-full bg-sidebar border border-stroke rounded-md px-2 py-1.5 text-sm font-medium text-center text-title focus:outline-none" />
                                  </div>
                                  <div className="w-16">
                                    <label className="block text-[10px] font-bold text-subtitle uppercase mb-1 text-center">Reps</label>
                                    <input type="text" defaultValue={subEx.reps} className="w-full bg-sidebar border border-stroke rounded-md px-2 py-1.5 text-sm font-medium text-center text-title focus:outline-none" />
                                  </div>
                                  <div className="w-14">
                                    <label className="block text-[10px] font-bold text-red-400 uppercase mb-1 text-center">RPE</label>
                                    <input type="number" defaultValue={subEx.rpe} className="w-full bg-red-500/10 border border-red-500/20 text-red-500 rounded-md px-2 py-1.5 text-sm font-bold text-center focus:outline-none focus:border-red-500" />
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col md:flex-row gap-3 pt-2 border-t border-stroke/50">
                                <div className="flex-1 relative">
                                  <RefreshCw size={12} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-subtitle" />
                                  <input type="text" placeholder="Smart Swap..." defaultValue={subEx.alternative} className="w-full bg-sidebar border border-stroke rounded-md pl-7 pr-3 py-1 text-xs font-medium text-subtitle focus:outline-none focus:border-blue-500" />
                                </div>
                              </div>
                            </div>
                            
                            <button className="p-1.5 text-subtitle hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-sidebar border-t border-blue-500/30 p-3 rounded-b-lg flex justify-between items-center mt-1">
                        <button className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1"><Plus size={12}/> Add to Superset</button>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-subtitle uppercase">Superset Rest:</span>
                          <input type="text" defaultValue={block.rest} className="w-16 bg-background border border-stroke rounded-md px-2 py-1 text-xs font-bold text-center text-title focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  );
                }

                // RENDER DROPSET BLOCK
                else if (block.type === 'dropset') {
                  return (
                    <div key={block.id} className="border-2 border-purple-500/30 bg-purple-500/5 rounded-xl p-1 relative">
                      <div className="absolute -top-3 left-4 bg-sidebar border border-purple-500/30 px-3 py-0.5 rounded-full text-[10px] font-black tracking-widest text-purple-500 uppercase flex items-center gap-1 z-10 shadow-sm">
                        <TrendingDown size={12}/> Dropset Block
                      </div>
                      
                      <div className="p-3 flex flex-col gap-3">
                        {block.exercises.map((subEx, subIdx) => (
                          <div key={subEx.id} className="bg-background border border-stroke rounded-lg p-3 flex flex-col md:flex-row items-start gap-4">
                            <div className="w-6 h-6 rounded-full bg-sidebar border border-stroke flex items-center justify-center text-xs font-bold text-subtitle shrink-0">
                              {subIdx + 1}
                            </div>
                            
                            <div className="flex-1 w-full flex flex-col gap-3">
                              <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                  <label className="block text-[10px] font-bold text-subtitle uppercase mb-1">Exercise Name</label>
                                  <input type="text" defaultValue={subEx.name} className="w-full bg-sidebar border border-stroke rounded-md px-3 py-1.5 text-sm font-bold text-title focus:outline-none focus:border-purple-500" />
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                  <div className="w-14">
                                    <label className="block text-[10px] font-bold text-subtitle uppercase mb-1 text-center">Sets</label>
                                    <input type="number" defaultValue={subEx.sets} className="w-full bg-sidebar border border-stroke rounded-md px-2 py-1.5 text-sm font-medium text-center text-title focus:outline-none" disabled />
                                  </div>
                                  <div className="w-16">
                                    <label className="block text-[10px] font-bold text-subtitle uppercase mb-1 text-center">Reps</label>
                                    <input type="text" defaultValue={subEx.reps} className="w-full bg-sidebar border border-stroke rounded-md px-2 py-1.5 text-sm font-medium text-center text-title focus:outline-none" />
                                  </div>
                                  <div className="w-14">
                                    <label className="block text-[10px] font-bold text-red-400 uppercase mb-1 text-center">RPE</label>
                                    <input type="number" defaultValue={subEx.rpe} className="w-full bg-red-500/10 border border-red-500/20 text-red-500 rounded-md px-2 py-1.5 text-sm font-bold text-center focus:outline-none focus:border-red-500" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <button className="p-1.5 text-subtitle hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-sidebar border-t border-purple-500/30 p-3 rounded-b-lg flex justify-between items-center mt-1">
                        <button className="text-xs font-bold text-purple-500 hover:underline flex items-center gap-1"><Plus size={12}/> Add Drop</button>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-subtitle uppercase">Inter-set Rest:</span>
                          <input type="text" defaultValue={block.rest} className="w-16 bg-background border border-stroke rounded-md px-2 py-1 text-xs font-bold text-center text-title focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
              
              <button className="w-full py-4 mt-2 border-2 border-dashed border-stroke rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-subtitle hover:bg-background hover:text-primary hover:border-primary transition-colors">
                <Plus size={16} /> Add Standard Exercise
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
