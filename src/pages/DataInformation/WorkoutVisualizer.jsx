import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { Target, Activity, Shield, ArrowRight, PlayCircle, Edit2, Trash2, Zap, Plus, Search, HeartPulse, Dna } from 'lucide-react';

const mockWorkouts = [
  { id: 1, title: 'Incline Dumbbell Press', muscle: 'chest', tags: ['Strength', 'Hypertrophy'] },
  { id: 2, title: 'Cable Flyes', muscle: 'chest', tags: ['Hypertrophy', 'Isolation'] },
  { id: 3, title: 'Pull-ups', muscle: 'back', tags: ['Strength', 'Bodyweight'] },
  { id: 4, title: 'Barbell Rows', muscle: 'back', tags: ['Strength', 'Hypertrophy'] },
  { id: 5, title: 'Military Press', muscle: 'shoulders', tags: ['Strength'] },
  { id: 6, title: 'Lateral Raises', muscle: 'shoulders', tags: ['Hypertrophy'] },
  { id: 7, title: 'Barbell Curls', muscle: 'arms', subCategory: 'Biceps', tags: ['Strength'] },
  { id: 8, title: 'Tricep Pushdowns', muscle: 'arms', subCategory: 'Triceps', tags: ['Hypertrophy'] },
  { id: 9, title: 'Hammer Curls', muscle: 'arms', subCategory: 'Biceps', tags: ['Isolation'] },
  { id: 10, title: 'Overhead Tricep Extension', muscle: 'arms', subCategory: 'Triceps', tags: ['Isolation'] },
  { id: 11, title: 'Squats', muscle: 'legs', tags: ['Strength', 'Power'] },
  { id: 12, title: 'Leg Press', muscle: 'legs', tags: ['Hypertrophy'] }
];

const muscleGroups = [
  { id: 'Object_23', category: 'chest', label: 'Chest & Stomach', icon: Target },
  { id: 'Object_13', category: 'back', label: 'Back Muscles', icon: Shield },
  { id: 'Object_5', category: 'shoulders', label: 'Shoulders Muscles', icon: Zap },
  { id: 'Object_33', category: 'arms', label: 'Biceps & Triceps', icon: Activity },
  { id: 'Object_31', category: 'arms', label: 'Wrist & Forearms', icon: Activity },
  { id: 'Object_3', category: 'legs', label: 'Glutes', icon: Dna },
  { id: 'Object_17', category: 'legs', label: 'Front Leg', icon: Dna },
  { id: 'Object_27', category: 'legs', label: 'Groin', icon: Dna },
  { id: 'Object_11', category: 'legs', label: 'Outer Thigh', icon: Dna },
  { id: 'Object_9', category: 'legs', label: 'Back Leg', icon: Dna },
  { id: 'Object_25', category: 'legs', label: 'Front Calf', icon: Dna },
  { id: 'Object_7', category: 'legs', label: 'Back Calf', icon: Dna }
];

// Exact mapping provided by the user for the 3D model nodes
const meshToMuscleMap = {
  'Object_13': { category: 'back', label: 'Back Muscles' },
  'Object_5': { category: 'shoulders', label: 'Shoulders Muscles' },
  'Object_33': { category: 'arms', label: 'Biceps & Triceps Muscles' },
  'Object_31': { category: 'arms', label: 'Wrist & Forearms Muscles' },
  'Object_23': { category: 'chest', label: 'Chest & Stomach Muscles' },
  'Object_3': { category: 'legs', label: 'Glutes Muscles' },
  'Object_17': { category: 'legs', label: 'Front Leg Muscles' },
  'Object_27': { category: 'legs', label: 'Groin Muscles' },
  'Object_11': { category: 'legs', label: 'Outer Thigh Muscles' },
  'Object_9': { category: 'legs', label: 'Back Leg Muscles' },
  'Object_25': { category: 'legs', label: 'Front Calf Muscle' },
  'Object_7': { category: 'legs', label: 'Back Calf Muscle' }
};

const getMuscleInfo = (meshName) => {
  return meshToMuscleMap[meshName] || null;
};

// Map of multi-muscle objects to their sub-tabs
const subTabsMap = {
  'Object_33': ['Biceps', 'Triceps'],
  'Object_23': ['Chest', 'Stomach'],
  'Object_31': ['Wrist', 'Forearms']
};

// --- TRUE MEDICAL MODEL COMPONENT ---
function MedicalModel({ activeMeshName, activeCategory, onMeshSelect }) {
  const { scene } = useGLTF('/male_full_body_ecorche.glb');
  
  // Store original materials on mount and clone to prevent shared material overriding
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (!child.userData.initialized) {
           child.material = child.material.clone(); // CRITICAL: Clone so modifying one doesn't modify all
           child.userData.originalColor = child.material.color?.clone();
           child.userData.originalEmissive = child.material.emissive?.clone();
           child.userData.originalEmissiveIntensity = child.material.emissiveIntensity;
           child.userData.initialized = true;
        }
      }
    });
  }, [scene]);

  // Apply Neon Green highlight to the currently active mesh
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        let shouldHighlight = false;

        // If a specific mesh is clicked, only highlight that one
        if (activeMeshName) {
           if (child.name === activeMeshName) shouldHighlight = true;
        } 
        // If a sidebar category is clicked, highlight all meshes that match the category
        else if (activeCategory) {
           const info = getMuscleInfo(child.name);
           if (info && info.category === activeCategory) shouldHighlight = true;
        }

        if (shouldHighlight) {
           child.material.emissive?.setHex(0x00FF87);
           child.material.color?.setHex(0x00FF87);
           child.material.emissiveIntensity = 2.0;
           child.material.needsUpdate = true;
        } else {
           // Restore original materials if it's not the active one
           if (child.userData.initialized) {
               if (child.userData.originalColor) child.material.color?.copy(child.userData.originalColor);
               if (child.userData.originalEmissive) child.material.emissive?.copy(child.userData.originalEmissive);
               child.material.emissiveIntensity = child.userData.originalEmissiveIntensity;
               child.material.needsUpdate = true;
           }
        }
      }
    });
  }, [activeMeshName, activeCategory, scene]);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent click from bubbling through multiple layers of meshes
    onMeshSelect(e.object.name);
  };

  return (
    <primitive 
      object={scene} 
      scale={[0.1, 0.1, 0.1]} 
      position={[0, 0.7, 0]} 
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => document.body.style.cursor = 'default'}
    />
  );
}

export function WorkoutVisualizer() {
  const [activeMeshName, setActiveMeshName] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeSubTab, setActiveSubTab] = useState(null);

  const handleMeshSelect = (meshName) => {
    setActiveMeshName(meshName);
    const info = getMuscleInfo(meshName);
    if (info) setActiveCategory(info.category);
    
    if (subTabsMap[meshName]) {
      setActiveSubTab(subTabsMap[meshName][0]);
    } else {
      setActiveSubTab(null);
    }
  };

  const handleSidebarSelect = (meshId) => {
    setActiveMeshName(meshId);
    const info = getMuscleInfo(meshId);
    if (info) setActiveCategory(info.category);
    
    if (subTabsMap[meshId]) {
      setActiveSubTab(subTabsMap[meshId][0]);
    } else {
      setActiveSubTab(null);
    }
  };

  // Filter logic to consider both generic category and specific sub-tabs if active
  const filteredWorkouts = mockWorkouts.filter(w => {
    if (activeSubTab && w.subCategory) {
      return w.muscle === activeCategory && w.subCategory === activeSubTab;
    }
    return w.muscle === activeCategory;
  });
  const selectedLabel = muscleGroups.find(m => m.id === activeMeshName)?.label || 'AURA ANATOMY';

  return (
    <div className="w-full h-auto lg:h-[850px] bg-[#0B0F19] rounded-2xl border border-stroke shadow-2xl overflow-hidden flex flex-col lg:flex-row relative animate-fade-in">
      
      {/* LEFT COLUMN: 3D Visualizer Canvas (Mobile: Full width, Desktop: 60%) */}
      <div className="w-full lg:w-[60%] h-[500px] lg:h-full relative bg-gradient-to-b from-[#0B0F19] to-[#0f172a] border-b lg:border-b-0 lg:border-r border-stroke">
        
        {/* Floating Icon Sidebar (Cerebra Style) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 z-20 flex flex-col items-center gap-1 bg-background/50 backdrop-blur-xl p-2 rounded-2xl border border-stroke shadow-2xl overflow-y-auto max-h-[80%] custom-scrollbar">
          {muscleGroups.map(mg => {
            const isActive = activeMeshName === mg.id;
            return (
              <button 
                key={mg.id}
                onClick={() => handleSidebarSelect(mg.id)}
                className={`p-3 rounded-xl flex items-center justify-center transition-all group relative ${
                  isActive 
                  ? 'bg-primary text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                  : 'bg-transparent text-subtitle hover:bg-sidebar hover:text-title'
                }`}
              >
                <mg.icon size={20} />
                {/* Tooltip */}
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-background border border-stroke px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl">
                  <span className="text-xs font-bold text-title">{mg.label}</span>
                </div>
              </button>
            )
          })}
          <div className="w-full h-px bg-stroke my-1"></div>
          <button className="p-3 rounded-xl text-subtitle hover:bg-sidebar hover:text-title transition-colors">
            <Search size={20} />
          </button>
        </div>

        {/* Active Mesh Indicator Pill */}
        {activeMeshName && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-primary/10 border border-primary/30 backdrop-blur-md px-6 py-2 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.15)] animate-fade-in flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold text-primary tracking-wider uppercase">MESH LOCATED: {meshToMuscleMap[activeMeshName]?.label || activeMeshName.replace(/_/g, ' ')}</span>
          </div>
        )}

        {/* The 3D Canvas */}
        <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, 5, -10]} intensity={1} color="#3b82f6" />
          <spotLight position={[0, 8, 8]} angle={0.4} penumbra={1} intensity={2} color="#00FF87" />
          
          <Suspense fallback={null}>
            <MedicalModel activeMeshName={activeMeshName} activeCategory={activeCategory} onMeshSelect={handleMeshSelect} />
          </Suspense>
          
          <ContactShadows position={[0, -2.6, 0]} opacity={0.7} scale={15} blur={2.5} far={4} color="#000000" />
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 6} 
            maxPolarAngle={Math.PI / 1.5} 
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* RIGHT COLUMN: Dashboard & Workout Stack (Mobile: Full width, Desktop: 40%) */}
      <div className="w-full lg:w-[40%] bg-sidebar/90 backdrop-blur-3xl p-6 lg:p-8 flex flex-col z-10 shadow-2xl overflow-y-auto custom-scrollbar min-h-[500px] lg:min-h-0">
        
        {/* Data Dashboard Header */}
        <div className="mb-8">
          <p className="text-xs font-bold text-subtitle tracking-widest uppercase mb-1">Target Assessment</p>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-title">{selectedLabel}</h2>
            <span className="px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] font-bold rounded-md uppercase tracking-wider">
              Optimal
            </span>
          </div>

          {/* Sub-Tabs for multi-muscle objects */}
          {activeSubTab && subTabsMap[activeMeshName] && (
            <div className="flex gap-2 mt-4 bg-background/50 p-1.5 rounded-xl w-max border border-stroke">
              {subTabsMap[activeMeshName].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                    activeSubTab === tab 
                    ? 'bg-primary text-black shadow-[0_0_10px_rgba(34,197,94,0.3)]' 
                    : 'text-subtitle hover:text-title hover:bg-white/5'
                  }`}
                >
                  {tab} Workouts
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Analytics Cards (Matching Cerebra Style) */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="bg-background border border-stroke rounded-xl p-4 shadow-inner">
              <span className="text-[10px] font-bold text-subtitle uppercase tracking-wider block mb-2">Recovery Status</span>
              <div className="flex items-end justify-between">
                 <span className="text-2xl font-black text-title">92%</span>
                 <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Ready</span>
              </div>
              <div className="w-full bg-sidebar rounded-full h-1 mt-3 overflow-hidden">
                 <div className="bg-primary h-1 rounded-full" style={{width: '92%'}}></div>
              </div>
           </div>
           <div className="bg-background border border-stroke rounded-xl p-4 shadow-inner">
              <span className="text-[10px] font-bold text-subtitle uppercase tracking-wider block mb-2">Volume Load</span>
              <div className="flex items-end justify-between">
                 <span className="text-2xl font-black text-title">12k</span>
                 <span className="text-xs font-bold text-subtitle">lbs/wk</span>
              </div>
              <div className="w-full bg-sidebar rounded-full h-1 mt-3 overflow-hidden flex">
                 <div className="bg-blue-500 h-1 rounded-l-full" style={{width: '40%'}}></div>
                 <div className="bg-yellow-500 h-1 rounded-r-full" style={{width: '20%'}}></div>
              </div>
           </div>
        </div>

        {/* Workouts List */}
        <div className="flex justify-between items-center mb-4 border-b border-stroke pb-2">
           <h4 className="text-xs font-bold uppercase tracking-widest text-subtitle">Action Plan Variations</h4>
           <span className="text-xs font-bold bg-sidebar px-2 py-1 rounded text-title">{filteredWorkouts.length} Found</span>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3">
          {filteredWorkouts.length === 0 ? (
            <div className="text-center py-10 text-subtitle font-medium text-sm bg-background rounded-xl border border-dashed border-stroke">
              No saved variations for this muscle group yet.
            </div>
          ) : (
            filteredWorkouts.map(workout => (
              <div key={workout.id} className="bg-background border border-stroke rounded-xl p-3 hover:border-primary transition-all group flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 bg-sidebar rounded-lg flex items-center justify-center shrink-0 border border-stroke overflow-hidden relative group-hover:border-primary transition-colors">
                   <PlayCircle size={20} className="text-subtitle group-hover:text-primary transition-colors z-10" />
                </div>
                
                <div className="flex-1">
                  <h5 className="font-bold text-sm text-title mb-1 group-hover:text-primary transition-colors">{workout.title}</h5>
                  <div className="flex gap-2">
                    {workout.tags.map(t => (
                      <span key={t} className="text-[9px] font-bold uppercase tracking-wider bg-sidebar text-subtitle px-1.5 py-0.5 rounded border border-stroke">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-subtitle hover:text-title p-1.5 bg-sidebar rounded-md"><ArrowRight size={14}/></button>
                </div>
              </div>
            ))
          )}
        </div>

        <button className="w-full mt-6 py-3.5 bg-primary text-black rounded-xl text-sm font-black uppercase hover:scale-[1.02] transition-transform flex justify-center items-center gap-2 shadow-[0_4px_15px_rgba(34,197,94,0.3)]">
          <Plus size={16} /> Load Additional {selectedLabel.split(' ')[0]} Variations
        </button>
      </div>
      
    </div>
  );
}
