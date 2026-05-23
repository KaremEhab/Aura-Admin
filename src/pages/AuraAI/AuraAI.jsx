import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, Paperclip, ArrowUp, ChevronDown, ChevronRight, ChevronLeft,
  Copy, ThumbsUp, ThumbsDown, Folder, ArrowLeft,
  Bot, Loader2, Zap, Bell, Shield, Activity, UserPlus, CheckCircle2, XCircle, Edit3, Save, X,
  GripVertical, RefreshCw, TrendingUp, TrendingDown, Link as LinkIcon, Trash2, Plus, Utensils, Key, Search, PieChart, Database, Eye, MessageSquare,
  Users, DollarSign, CalendarDays, Award
} from 'lucide-react';
import './AuraAI.css';

// --- MOCK DATA ---
const mockWorkoutDays = [
  {
    id: 'day-1', title: 'Push Day (Chest/Shoulders/Triceps)',
    exercises: [
      { id: 1, type: 'single', name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s', rpe: '8', rir: '2', alternative: 'Dumbbell Press', progression: '+2.5kg / week' },
      { id: 2, type: 'superset', rest: '120s', exercises: [{ id: '2a', name: 'Incline Dumbbell Press', sets: 3, reps: '10', rpe: '9', rir: '1' }, { id: '2b', name: 'Dumbbell Lateral Raise', sets: 3, reps: '15', rpe: '9', rir: '1' }] },
      { id: 3, type: 'dropset', rest: 'No Rest', exercises: [{ id: '3a', name: 'Tricep Pushdown', sets: 1, reps: '10', rpe: '9' }, { id: '3b', name: 'Tricep Pushdown (Drop)', sets: 1, reps: 'AMRAP', rpe: '10' }] }
    ]
  }
];

const mockNutritionData = {
  durationWeeks: 4,
  days: [
    {
      id: 'day-1', title: 'Training Day (High Carb)',
      globalTargets: { p: 180, c: 250, f: 65, cals: 2305 },
      meals: [
        { id: 1, name: 'Breakfast', items: [{ name: 'Oats (Raw)', p: 13, c: 68, f: 6.5, cals: 389, amount: 100, unit: 'g', baseAmt: 100 }, { name: 'Whey Protein Isolate', p: 25, c: 1, f: 0.5, cals: 110, amount: 30, unit: 'g', baseAmt: 30 }] },
        { id: 2, name: 'Lunch', items: [{ name: 'Chicken Breast (Raw)', p: 23, c: 0, f: 1.2, cals: 110, amount: 200, unit: 'g', baseAmt: 100 }, { name: 'White Rice (Cooked)', p: 2.7, c: 28, f: 0.3, cals: 130, amount: 150, unit: 'g', baseAmt: 100 }] }
      ]
    },
    {
      id: 'day-2', title: 'Rest Day (Low Carb)',
      globalTargets: { p: 180, c: 150, f: 85, cals: 2085 },
      meals: [
        { id: 1, name: 'Breakfast', items: [{ name: 'Eggs (Whole)', p: 12, c: 1, f: 10, cals: 140, amount: 2, unit: 'lg', baseAmt: 2 }] }
      ]
    }
  ]
};

const mockPermissionsData = {
  scope: 'owned',
  matrix: {
    financials: { label: 'Financials & Revenue', view: true, create: false, edit: false, delete: false },
    members: { label: 'Member Management', view: true, create: true, edit: true, delete: false },
    workouts: { label: 'Workout & Nutrition Plans', view: true, create: true, edit: true, delete: false },
    system: { label: 'System Configuration', view: false, create: false, edit: false, delete: false },
  }
};

const mockNotificationData = {
  title: "🔥 Summer Challenge Activation",
  body: "The 8-Week Summer Shred Challenge begins next Monday. Opt-in now through the member portal to secure your spot and unlock exclusive tracking features.",
  actionLink: "aura://challenge/summer2026",
  audience: "Active Members (Excluding VIP)"
};

const mockAnalyticsData = {
  revenue: "$42,500", revenueGrowth: "+12.4%",
  members: "1,240", membersGrowth: "+5.2%",
  activeRate: "78%",
  topTrainer: "Omar Sherif",
  retentionScore: 92
};

const mockCollections = {
  nutrition: [
    { id: 'n1', title: 'Lean Bulk Phase 1 (Sarah)' },
    { id: 'n2', title: 'Keto Cut Template' }
  ],
  workouts: [
    { id: 'w1', title: 'Summer Shred / 5-Day Split' },
    { id: 'w2', title: 'Beginner Hypertrophy Base' },
    { id: 'w3', title: 'Omar 12-Week Prep' }
  ]
};

const initialSessions = [
  {
    id: 's1',
    title: 'New AI Session',
    messages: [
      { id: 'msg-0', type: 'ai_text_template', content: 'I am Aura, your operational intelligence. What would you like to build today?' }
    ]
  },
  {
    id: 's2', title: 'Workout Plan for Omar',
    messages: [
      { id: 'msg-s2-1', type: 'user', content: 'Create a workout plan for Omar' },
      { id: 'msg-s2-2', type: 'ai_text', content: 'I have prepared a High-Volume Hypertrophy split. Please review the assignment.' },
      {
        id: 'msg-s2-3', type: 'ai_action_proposal', content: "Please review the proposed plan below.",
        action: { title: "ASSIGN WORKOUT PLAN", icon: <Activity size={18} className="text-primary"/>, details: [{ label: "Template Name", value: "Summer Shred / 5-Day Split" }, { label: "Primary Goal", value: "Muscle Gain" }, { label: "Difficulty", value: "Advanced" }], targets: ["Omar Sherif", "VIP Only"], planData: mockWorkoutDays }, status: 'pending'
      }
    ]
  },
  {
    id: 's3', title: 'New Nutrition Diet',
    messages: [
      { id: 'msg-s3-1', type: 'user', content: 'Create a bulk diet for Sarah' },
      {
        id: 'msg-s3-3', type: 'ai_action_proposal', content: "I've drafted a hyper-caloric diet targeting lean mass gain.",
        action: { title: "ASSIGN NUTRITION PLAN", icon: <Utensils size={18} className="text-blue-500"/>, details: [{ label: "Plan Name", value: "Lean Bulk Phase 1" }], targets: ["Sarah Jenkins"], nutritionData: mockNutritionData }, status: 'pending'
      }
    ]
  },
  {
    id: 's4', title: 'Configure Night Role',
    messages: [
      { id: 'msg-s4-1', type: 'user', content: 'Create a night receptionist role' },
      {
        id: 'msg-s4-3', type: 'ai_action_proposal', content: "Here is the scoped permission matrix for the Night Receptionist.",
        action: { title: "CREATE SYSTEM ROLE", icon: <Shield size={18} className="text-yellow-500"/>, details: [{ label: "Role Name", value: "Night Receptionist" }, { label: "Level", value: "Level 4" }], permissionsData: mockPermissionsData }, status: 'pending'
      }
    ]
  },
  {
    id: 's5', title: 'Summer Challenge Notification',
    messages: [
      { id: 'msg-s5-1', type: 'user', content: 'Draft a notification for the summer challenge' },
      {
        id: 'msg-s5-3', type: 'ai_action_proposal', content: "I've drafted the broadcast copy for the upcoming challenge.",
        action: { title: "BROADCAST NOTIFICATION", icon: <Bell size={18} className="text-blue-500"/>, details: [{ label: "Channel", value: "In-App Push" }], targets: ["Global Active Members"], notificationData: mockNotificationData }, status: 'pending'
      }
    ]
  },
  {
    id: 's6', title: 'Site Operational Analytics',
    messages: [
      { id: 'msg-s6-1', type: 'user', content: 'Give me AI analytics of my site according to the data in it.' },
      {
        id: 'msg-s6-3', type: 'ai_action_proposal', content: "I have compiled the latest operational metrics from your gym data.",
        action: { title: "SITE ANALYTICS REPORT", icon: <PieChart size={18} className="text-purple-500"/>, details: [{ label: "Report Period", value: "Last 30 Days" }], analyticsData: mockAnalyticsData }, status: 'success'
      }
    ]
  }
];

export function AuraAI({ onNavigate }) {
  const [inputText, setInputText] = useState('');
  const [sessions, setSessions] = useState(initialSessions);
  const [activeSessionId, setActiveSessionId] = useState('s1');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [editStyle, setEditStyle] = useState('modal');
  const [editingMessageId, setEditingMessageId] = useState(null);
  
  // Collections State
  const [expandedCollections, setExpandedCollections] = useState({ nutrition: false, workouts: false });

  // Edit State
  const [editFormState, setEditFormState] = useState([]); 
  const [editTargetsState, setEditTargetsState] = useState([]);
  
  const [editPlanState, setEditPlanState] = useState(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const [editNutritionState, setEditNutritionState] = useState(null);
  const [activeNutritionDayIndex, setActiveNutritionDayIndex] = useState(0);

  const [editPermissionsState, setEditPermissionsState] = useState(null);
  const [editNotificationState, setEditNotificationState] = useState(null);

  const chatEndRef = useRef(null);
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];
  const messages = activeSession.messages;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeSessionId]);

  const updateMessages = (newMessagesUpdater) => {
    setSessions(prev => prev.map(session => session.id === activeSessionId ? { ...session, messages: typeof newMessagesUpdater === 'function' ? newMessagesUpdater(session.messages) : newMessagesUpdater } : session));
  };

  const handleNewSession = () => {
    const newSession = { id: `s-${Date.now()}`, title: 'New AI Session', messages: [{ id: `msg-${Date.now()}`, type: 'ai_text_template', content: 'I am Aura, your operational intelligence. What would you like to build today?' }] };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
    setIsMobileSidebarOpen(false); 
  };

  const handleSessionSelect = (id) => {
    setActiveSessionId(id);
    setIsMobileSidebarOpen(false); 
  };

  const startEditing = (msg) => {
    setEditingMessageId(msg.id);
    setEditFormState(JSON.parse(JSON.stringify(msg.action.details)));
    setEditTargetsState(msg.action.targets ? [...msg.action.targets] : []);
    
    setEditPlanState(msg.action.planData ? JSON.parse(JSON.stringify(msg.action.planData)) : null);
    setActiveDayIndex(0);
    
    setEditNutritionState(msg.action.nutritionData ? JSON.parse(JSON.stringify(msg.action.nutritionData)) : null);
    setActiveNutritionDayIndex(0);

    setEditPermissionsState(msg.action.permissionsData ? JSON.parse(JSON.stringify(msg.action.permissionsData)) : null);
    setEditNotificationState(msg.action.notificationData ? JSON.parse(JSON.stringify(msg.action.notificationData)) : null);
  };

  const cancelEdits = () => {
    setEditingMessageId(null);
  };

  const updateEditForm = (idx, val) => {
    const n = [...editFormState];
    n[idx].value = val;
    setEditFormState(n);
  };

  const saveEdits = () => {
    updateMessages(prev => prev.map(msg => {
      if (msg.id === editingMessageId) {
        return {
          ...msg,
          action: {
            ...msg.action,
            details: editFormState,
            ...(editTargetsState.length > 0 ? { targets: editTargetsState } : {}),
            ...(editPlanState ? { planData: editPlanState } : {}),
            ...(editNutritionState ? { nutritionData: editNutritionState } : {}),
            ...(editPermissionsState ? { permissionsData: editPermissionsState } : {}),
            ...(editNotificationState ? { notificationData: editNotificationState } : {})
          }
        };
      }
      return msg;
    }));
    setEditingMessageId(null);
  };

  const handleActionApprove = (messageId) => {
    updateMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, status: 'loading' } : msg));
    setTimeout(() => {
      updateMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, type: 'ai_action_result', status: 'success', resultMsg: 'Action executed successfully and synced to database.' } : msg));
    }, 2000); 
  };

  const handleActionReject = (messageId) => {
    updateMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, type: 'ai_action_result', status: 'rejected', resultMsg: 'Action was cancelled by user.' } : msg));
  };

  const processAIResponse = (userText) => {
    const textLower = userText.toLowerCase();
    const newMessages = [];
    const messageId = `msg-${Date.now()}`;

    if (textLower.includes('workout') || textLower.includes('plan')) {
      newMessages.push({
        id: messageId, type: 'ai_action_proposal', content: "I have prepared a Multi-Day split. Please review the assignment.",
        action: { title: "ASSIGN WORKOUT PLAN", icon: <Activity size={18} className="text-primary"/>, details: [{ label: "Template Name", value: "Generated Plan" }], targets: ["Global"], planData: mockWorkoutDays }, status: 'pending' 
      });
    } 
    else if (textLower.includes('nutrition') || textLower.includes('diet')) {
      newMessages.push({
        id: messageId, type: 'ai_action_proposal', content: "I have structured a new nutrition protocol.",
        action: { title: "ASSIGN NUTRITION PLAN", icon: <Utensils size={18} className="text-blue-500"/>, details: [{ label: "Plan Name", value: "Generated Diet" }], targets: ["Global"], nutritionData: mockNutritionData }, status: 'pending' 
      });
    }
    else if (textLower.includes('role') || textLower.includes('permission')) {
      newMessages.push({
        id: messageId, type: 'ai_action_proposal', content: "Review the proposed system role access levels.",
        action: { title: "CREATE SYSTEM ROLE", icon: <Shield size={18} className="text-yellow-500"/>, details: [{ label: "Role Name", value: "Custom Role" }], permissionsData: mockPermissionsData }, status: 'pending' 
      });
    }
    else if (textLower.includes('notification') || textLower.includes('message')) {
      newMessages.push({
        id: messageId, type: 'ai_action_proposal', content: "I've drafted the notification copy. Review before broadcasting.",
        action: { title: "BROADCAST NOTIFICATION", icon: <Bell size={18} className="text-blue-500"/>, details: [{ label: "Channel", value: "In-App Push" }], targets: ["Global"], notificationData: mockNotificationData }, status: 'pending' 
      });
    }
    else if (textLower.includes('analytic') || textLower.includes('data')) {
      newMessages.push({
        id: messageId, type: 'ai_action_proposal', content: "I have compiled the latest operational metrics from your gym data.",
        action: { title: "SITE ANALYTICS REPORT", icon: <PieChart size={18} className="text-purple-500"/>, details: [{ label: "Report Period", value: "Last 30 Days" }], analyticsData: mockAnalyticsData }, status: 'success' 
      });
    }
    else {
      newMessages.push({ id: messageId, type: 'ai_text', content: "I can assist with that. Try asking me to generate a workout, nutrition diet, push notification, permission role, or analytics report." });
    }

    setTimeout(() => {
      updateMessages(prev => [...prev, ...newMessages]);
      if (activeSession.title === 'New AI Session') {
        setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, title: userText.substring(0, 30) } : s));
      }
    }, 800);
  };

  const handleSend = (overrideText = null) => {
    const textToSend = overrideText || inputText;
    if (!textToSend.trim()) return;
    
    if (activeSession.messages.length === 1 && activeSession.messages[0].type === 'ai_text_template') {
       updateMessages([]);
    }

    const userMessage = { id: `usr-${Date.now()}`, type: 'user', content: textToSend };
    updateMessages(prev => [...prev, userMessage]);
    if (!overrideText) setInputText('');
    processAIResponse(textToSend);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // --- WORKOUT BUILDER MUTATIONS ---
  const handleAddWorkoutDay = () => {
    const newDay = { id: `day-${Date.now()}`, title: `Day ${editPlanState.length + 1} (Custom)`, exercises: [] };
    setEditPlanState([...editPlanState, newDay]);
    setActiveDayIndex(editPlanState.length);
  };

  const handleAddWorkoutBlock = (type) => {
    const nState = [...editPlanState];
    const newId = `ex-${Date.now()}`;
    if (type === 'single') nState[activeDayIndex].exercises.push({ id: newId, type: 'single', name: 'New Exercise', sets: 3, reps: '10', rest: '60s', rpe: '7', rir: '2' });
    else if (type === 'superset') nState[activeDayIndex].exercises.push({ id: newId, type: 'superset', rest: '90s', exercises: [{ id: `${newId}a`, name: 'Exercise A', sets: 3, reps: '10', rpe: '8' }, { id: `${newId}b`, name: 'Exercise B', sets: 3, reps: '10', rpe: '8' }] });
    else if (type === 'dropset') nState[activeDayIndex].exercises.push({ id: newId, type: 'dropset', rest: 'No Rest', exercises: [{ id: `${newId}a`, name: 'Heavy Set', sets: 1, reps: '8', rpe: '9' }, { id: `${newId}b`, name: 'Drop Set', sets: 1, reps: 'AMRAP', rpe: '10' }] });
    setEditPlanState(nState);
  };

  // --- NUTRITION BUILDER MUTATIONS ---
  const handleAddNutritionDay = () => {
    const nState = {...editNutritionState};
    nState.days.push({
      id: `day-${Date.now()}`, title: `Day ${nState.days.length + 1} (New)`,
      globalTargets: { p: 150, c: 200, f: 60, cals: 2000 },
      meals: [{ id: Date.now(), name: 'Breakfast', items: [] }]
    });
    setEditNutritionState(nState);
    setActiveNutritionDayIndex(nState.days.length - 1);
  };

  const handleAddMeal = () => {
    const nState = {...editNutritionState};
    nState.days[activeNutritionDayIndex].meals.push({ id: Date.now(), name: `Meal ${nState.days[activeNutritionDayIndex].meals.length + 1}`, items: [] });
    setEditNutritionState(nState);
  };
  
  const handleAddFoodItem = (mealId) => {
     const nState = {...editNutritionState};
     const meal = nState.days[activeNutritionDayIndex].meals.find(m => m.id === mealId);
     if(meal) meal.items.push({ name: 'New Item', p: 0, c: 0, f: 0, cals: 0, amount: 100, unit: 'g', baseAmt: 100 });
     setEditNutritionState(nState);
  };

  // ------------------------------------------------------------------
  // RENDER MODAL HELPERS
  // ------------------------------------------------------------------
  const renderWorkoutBuilderPreview = () => (
    <div className="flex flex-col xl:flex-row gap-6 w-full mt-4 h-full">
      <div className="flex-1 min-w-[280px] xl:max-w-[350px] flex flex-col gap-5 p-5 bg-background rounded-xl border border-stroke shadow-inner h-fit">
        <h4 className="text-sm font-bold text-title border-b border-stroke pb-2 mb-2">Plan Metadata</h4>
        {editFormState.map((detail, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <label className="text-xs font-bold text-subtitle uppercase">{detail.label}</label>
            <input type="text" value={detail.value} onChange={(e) => updateEditForm(idx, e.target.value)} className="w-full bg-sidebar border border-stroke rounded-lg px-3 py-2 text-sm text-title" />
          </div>
        ))}
      </div>

      <div className="flex-[2] bg-background border border-stroke rounded-xl flex flex-col min-h-[600px] max-h-[80vh]">
        <div className="flex items-center justify-between overflow-x-auto bg-sidebar border-b border-stroke p-2 shrink-0 gap-2">
          <div className="flex gap-1 overflow-x-auto custom-scrollbar">
            {editPlanState?.map((day, idx) => (
              <button key={day.id} onClick={() => setActiveDayIndex(idx)} className={`px-4 py-2 rounded-lg text-sm font-bold shrink-0 ${activeDayIndex === idx ? 'bg-background text-title border border-stroke shadow-sm' : 'text-subtitle hover:text-title hover:bg-background/50'}`}>Day {idx + 1}</button>
            ))}
          </div>
          <button onClick={handleAddWorkoutDay} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary hover:text-black transition-colors shrink-0"><Plus size={14} /> Add Day</button>
        </div>

        {editPlanState && editPlanState[activeDayIndex] && (
          <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
               <input type="text" value={editPlanState[activeDayIndex].title} onChange={(e) => {const n=[...editPlanState]; n[activeDayIndex].title = e.target.value; setEditPlanState(n);}} className="font-bold text-title text-lg bg-transparent border-none focus:outline-none focus:border-b focus:border-primary w-2/3" />
               <div className="flex gap-2">
                 <button onClick={() => handleAddWorkoutBlock('dropset')} className="flex items-center gap-1 bg-purple-500/10 text-purple-500 border border-purple-500/20 px-2 py-1.5 rounded-lg text-[10px] font-bold hover:bg-purple-500 hover:text-white transition-colors"><TrendingDown size={12} /> + Drop</button>
                 <button onClick={() => handleAddWorkoutBlock('superset')} className="flex items-center gap-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-1.5 rounded-lg text-[10px] font-bold hover:bg-blue-500 hover:text-white transition-colors"><LinkIcon size={12} /> + Super</button>
               </div>
            </div>
            
            <div className="flex flex-col gap-6">
              {editPlanState[activeDayIndex].exercises.map((block, bIdx) => {
                if (block.type === 'single') return (
                  <div key={block.id} className="bg-background border border-stroke rounded-xl p-4 flex flex-col md:flex-row items-start md:items-start gap-4 group shrink-0">
                      <div className="flex-1 w-full flex flex-col gap-3">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <label className="block text-[10px] font-bold text-subtitle uppercase mb-1">Exercise Name</label>
                            <input type="text" value={block.name} onChange={(e) => {const n=[...editPlanState]; n[activeDayIndex].exercises[bIdx].name=e.target.value; setEditPlanState(n);}} className="w-full bg-sidebar border border-stroke rounded-md px-3 py-1.5 text-sm font-bold text-title focus:outline-none focus:border-primary" />
                          </div>
                        </div>
                      </div>
                      <button onClick={() => {const n=[...editPlanState]; n[activeDayIndex].exercises.splice(bIdx, 1); setEditPlanState(n);}} className="p-2 text-red-500 bg-red-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity self-end md:self-start mt-4 md:mt-0"><Trash2 size={16} /></button>
                  </div>
                );
                return <div key={block.id} className="border-2 border-stroke bg-background rounded-xl p-3 shrink-0"><span className="text-sm font-bold text-title">{block.type.toUpperCase()} Block</span></div>;
              })}
              <button onClick={() => handleAddWorkoutBlock('single')} className="w-full py-3 mt-2 border-2 border-dashed border-stroke rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-subtitle hover:bg-background hover:text-primary hover:border-primary transition-colors"><Plus size={16} /> Add Standard Exercise</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderNutritionPreview = () => {
    const activeDay = editNutritionState?.days[activeNutritionDayIndex];
    return (
    <div className="flex flex-col xl:flex-row gap-6 w-full mt-4 h-full">
      <div className="flex-1 min-w-[280px] xl:max-w-[350px] flex flex-col gap-5 p-5 bg-background rounded-xl border border-stroke shadow-inner h-fit">
        <h4 className="text-sm font-bold text-title border-b border-stroke pb-2 mb-2">Diet Metadata</h4>
        {editFormState.map((detail, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <label className="text-xs font-bold text-subtitle uppercase">{detail.label}</label>
            <input type="text" value={detail.value} onChange={(e) => updateEditForm(idx, e.target.value)} className="w-full bg-sidebar border border-stroke rounded-lg px-3 py-2 text-sm text-title" />
          </div>
        ))}
        {editNutritionState && (
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-xs font-bold text-subtitle uppercase">Duration (Weeks)</label>
            <input type="number" value={editNutritionState.durationWeeks} onChange={(e) => setEditNutritionState({...editNutritionState, durationWeeks: e.target.value})} className="w-full bg-sidebar border border-stroke rounded-lg px-3 py-2 text-sm font-black text-title" />
          </div>
        )}
        
        <h4 className="text-sm font-bold text-title border-b border-stroke pb-2 mt-4 flex items-center gap-2"><PieChart size={16} className="text-yellow-500"/> Daily Macro Target</h4>
        {activeDay && (
          <div className="flex flex-col gap-3">
             <div className="grid grid-cols-2 gap-3">
               <div><label className="block text-[10px] font-bold text-subtitle uppercase mb-1">Calories</label><input type="number" value={activeDay.globalTargets.cals} onChange={(e) => {const n={...editNutritionState}; n.days[activeNutritionDayIndex].globalTargets.cals = e.target.value; setEditNutritionState(n);}} className="w-full bg-sidebar border border-stroke rounded-md px-2 py-1.5 text-lg font-black text-title" /></div>
               <div><label className="block text-[10px] font-bold text-subtitle uppercase mb-1">Protein (g)</label><input type="number" value={activeDay.globalTargets.p} onChange={(e) => {const n={...editNutritionState}; n.days[activeNutritionDayIndex].globalTargets.p = e.target.value; setEditNutritionState(n);}} className="w-full bg-sidebar border border-stroke rounded-md px-2 py-1.5 text-lg font-black text-blue-500" /></div>
             </div>
             <div className="grid grid-cols-2 gap-3">
               <div><label className="block text-[10px] font-bold text-subtitle uppercase mb-1">Carbs (g)</label><input type="number" value={activeDay.globalTargets.c} onChange={(e) => {const n={...editNutritionState}; n.days[activeNutritionDayIndex].globalTargets.c = e.target.value; setEditNutritionState(n);}} className="w-full bg-sidebar border border-stroke rounded-md px-2 py-1.5 text-lg font-black text-green-500" /></div>
               <div><label className="block text-[10px] font-bold text-subtitle uppercase mb-1">Fats (g)</label><input type="number" value={activeDay.globalTargets.f} onChange={(e) => {const n={...editNutritionState}; n.days[activeNutritionDayIndex].globalTargets.f = e.target.value; setEditNutritionState(n);}} className="w-full bg-sidebar border border-stroke rounded-md px-2 py-1.5 text-lg font-black text-yellow-500" /></div>
             </div>
          </div>
        )}
      </div>

      <div className="flex-[2] bg-background border border-stroke rounded-xl flex flex-col min-h-[600px] max-h-[80vh]">
        <div className="flex items-center justify-between overflow-x-auto bg-sidebar border-b border-stroke p-2 shrink-0 gap-2">
          <div className="flex gap-1 overflow-x-auto custom-scrollbar">
            {editNutritionState?.days.map((day, idx) => (
              <button key={day.id} onClick={() => setActiveNutritionDayIndex(idx)} className={`px-4 py-2 rounded-lg text-sm font-bold shrink-0 ${activeNutritionDayIndex === idx ? 'bg-background text-title border border-stroke shadow-sm' : 'text-subtitle hover:text-title hover:bg-background/50'}`}>Day {idx + 1}</button>
            ))}
          </div>
          <button onClick={handleAddNutritionDay} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary hover:text-black transition-colors shrink-0"><Plus size={14} /> Add Day</button>
        </div>

        {activeDay && (
          <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
            <div className="flex justify-between items-center mb-6 border-b border-stroke pb-3 shrink-0">
              <input type="text" value={activeDay.title} onChange={(e) => {const n={...editNutritionState}; n.days[activeNutritionDayIndex].title = e.target.value; setEditNutritionState(n);}} className="font-bold text-title text-lg bg-transparent border-none focus:outline-none focus:border-b focus:border-blue-500 w-2/3" />
              <button onClick={handleAddMeal} className="flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary hover:text-black transition-colors"><Plus size={14}/> Add Meal</button>
            </div>
            
            <div className="flex flex-col gap-5">
              {activeDay.meals.map((meal, mIdx) => (
                <div key={meal.id} className="bg-sidebar border border-stroke rounded-xl overflow-hidden shrink-0">
                  <div className="bg-background/80 px-4 py-3 border-b border-stroke flex justify-between items-center">
                    <input type="text" value={meal.name} onChange={(e) => {const n={...editNutritionState}; n.days[activeNutritionDayIndex].meals[mIdx].name=e.target.value; setEditNutritionState(n);}} className="font-bold text-title bg-transparent border-none focus:outline-none focus:border-b focus:border-blue-500 w-48"/>
                    <button onClick={() => {const n={...editNutritionState}; n.days[activeNutritionDayIndex].meals.splice(mIdx, 1); setEditNutritionState(n);}} className="text-red-500 p-1 hover:bg-red-500/10 rounded"><Trash2 size={14}/></button>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    {meal.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 bg-background border border-stroke px-4 py-3 rounded-lg group shrink-0">
                        <div className="flex flex-col flex-1">
                          <input type="text" value={item.name} onChange={(e) => {const n={...editNutritionState}; n.days[activeNutritionDayIndex].meals[mIdx].items[idx].name=e.target.value; setEditNutritionState(n);}} className="text-sm font-bold text-title bg-transparent border-none focus:outline-none focus:border-b focus:border-subtitle" />
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-sidebar border border-stroke rounded flex items-center px-2 py-1 w-24">
                            <input type="number" value={item.amount} onChange={(e) => {const n={...editNutritionState}; n.days[activeNutritionDayIndex].meals[mIdx].items[idx].amount = e.target.value; setEditNutritionState(n);}} className="w-full bg-transparent text-sm font-bold text-title text-right focus:outline-none" />
                            <span className="text-xs font-bold text-subtitle ml-1">{item.unit}</span>
                          </div>
                          <button onClick={() => {const n={...editNutritionState}; n.days[activeNutritionDayIndex].meals[mIdx].items.splice(idx, 1); setEditNutritionState(n);}} className="text-subtitle hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => handleAddFoodItem(meal.id)} className="w-full py-2 mt-1 border border-dashed border-stroke rounded-lg flex items-center justify-center gap-2 text-xs font-bold text-blue-500 hover:bg-sidebar transition-colors">
                      <Plus size={14} /> Add Food Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    );
  };

  const renderAnalyticsPreview = () => {
    const data = editNotificationState || mockAnalyticsData; // using editNotificationState generically if you want edits, else direct mock
    return (
      <div className="flex flex-col gap-6 w-full mt-4">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-background border border-stroke p-4 rounded-xl flex flex-col gap-2">
               <span className="text-xs font-bold text-subtitle uppercase flex items-center gap-2"><DollarSign size={14}/> MRR Revenue</span>
               <span className="text-2xl font-black text-title">{mockAnalyticsData.revenue}</span>
               <span className="text-xs font-bold text-primary flex items-center"><TrendingUp size={12} className="mr-1"/> {mockAnalyticsData.revenueGrowth} vs Last Month</span>
            </div>
            <div className="bg-background border border-stroke p-4 rounded-xl flex flex-col gap-2">
               <span className="text-xs font-bold text-subtitle uppercase flex items-center gap-2"><Users size={14}/> Active Members</span>
               <span className="text-2xl font-black text-title">{mockAnalyticsData.members}</span>
               <span className="text-xs font-bold text-primary flex items-center"><TrendingUp size={12} className="mr-1"/> {mockAnalyticsData.membersGrowth} vs Last Month</span>
            </div>
            <div className="bg-background border border-stroke p-4 rounded-xl flex flex-col gap-2">
               <span className="text-xs font-bold text-subtitle uppercase flex items-center gap-2"><Activity size={14}/> Retention Score</span>
               <span className="text-2xl font-black text-blue-500">{mockAnalyticsData.retentionScore} / 100</span>
               <div className="w-full bg-sidebar rounded-full h-1.5 mt-1"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: '92%'}}></div></div>
            </div>
            <div className="bg-background border border-stroke p-4 rounded-xl flex flex-col gap-2">
               <span className="text-xs font-bold text-subtitle uppercase flex items-center gap-2"><Award size={14}/> Top Trainer</span>
               <span className="text-xl font-black text-title">{mockAnalyticsData.topTrainer}</span>
               <span className="text-xs font-bold text-subtitle mt-1">98% Client Satisfaction</span>
            </div>
         </div>
      </div>
    );
  };

  const renderPermissionsPreview = () => (
    <div className="flex flex-col gap-6 w-full mt-4">
      <div className="bg-background border border-stroke rounded-xl p-5 shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 pb-6 border-b border-stroke">
          {editFormState.map((detail, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <label className="text-xs font-bold text-subtitle uppercase">{detail.label}</label>
              <input type="text" value={detail.value} onChange={(e) => updateEditForm(idx, e.target.value)} className="w-full bg-sidebar border border-stroke rounded-lg px-3 py-2 text-sm text-title" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationPreview = () => (
    <div className="flex flex-col gap-6 w-full mt-4">
      <div className="flex flex-col md:flex-row gap-6 w-full">
         <div className="flex-1 bg-background border border-stroke rounded-xl p-5 shadow-inner flex flex-col gap-4">
            <h4 className="text-sm font-bold text-title border-b border-stroke pb-2">Broadcast Configuration</h4>
            {editFormState.map((detail, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <label className="text-xs font-bold text-subtitle uppercase">{detail.label}</label>
                <input type="text" value={detail.value} onChange={(e) => updateEditForm(idx, e.target.value)} className="w-full bg-sidebar border border-stroke rounded-lg px-3 py-2 text-sm text-title" />
              </div>
            ))}
         </div>
      </div>
    </div>
  );

  const renderGenericForm = () => (
    <div className="flex flex-col gap-4 p-5 bg-background rounded-xl border border-stroke shadow-inner w-full">
      <h4 className="text-sm font-bold text-title border-b border-stroke pb-2">Edit Action Parameters</h4>
    </div>
  );

  return (
    <div className="aura-ai-wrapper h-screen w-full relative overflow-hidden bg-background flex">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
      </div>

      {/* ================= LEFT SIDEBAR (CONTEXT) ================= */}
      {isMobileSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)}/>}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-sidebar border-r border-stroke shadow-2xl flex flex-col
        transition-all duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0 w-[300px] sm:w-[320px]' : '-translate-x-full w-[300px] sm:w-[320px]'}
        lg:relative lg:translate-x-0 lg:z-20
        ${isDesktopSidebarOpen ? 'lg:w-[320px] opacity-100' : 'lg:w-0 lg:overflow-hidden lg:opacity-0 lg:border-none'}
      `}>
        {/* Top Branding / Nav */}
        <div className="p-4 border-b border-stroke flex items-center justify-between shrink-0 min-w-[320px]">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('dashboard')} className="p-2 bg-background border border-stroke rounded-lg text-subtitle hover:text-title hover:bg-stroke transition-colors">
              <ArrowLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              <img src="/src/assets/Aura.svg" alt="Aura Logo" className="w-7 h-7" onError={(e) => e.target.style.display='none'} />
              <span className="text-lg font-black tracking-tight text-title">AURA AI</span>
            </div>
          </div>
          <button onClick={() => setIsMobileSidebarOpen(false)} className="lg:hidden p-2 text-subtitle"><X size={18} /></button>
          <button onClick={() => setIsDesktopSidebarOpen(false)} className="hidden lg:flex p-2 text-subtitle hover:text-title hover:bg-background rounded-lg"><ChevronLeft size={18}/></button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col p-4 custom-scrollbar min-w-[320px]">
          
          {/* Collections Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-subtitle">Collections</span>
            </div>
            <div className="bg-background border border-stroke rounded-xl overflow-hidden shadow-inner flex flex-col">
              <div>
                <button onClick={() => setExpandedCollections({...expandedCollections, nutrition: !expandedCollections.nutrition})} className="w-full p-3 flex items-center justify-between text-sm font-bold text-title hover:bg-stroke transition-colors">
                  <div className="flex items-center gap-3"><Folder size={16} className="text-primary" /> Nutrition Library</div>
                  <ChevronDown size={14} className={`text-subtitle transition-transform ${expandedCollections.nutrition ? 'rotate-180' : ''}`} />
                </button>
                {expandedCollections.nutrition && (
                  <div className="bg-sidebar border-t border-stroke p-2 flex flex-col gap-1">
                    {mockCollections.nutrition.map(col => <button key={col.id} className="text-xs font-medium text-subtitle hover:text-title hover:bg-background p-2 text-left rounded-md transition-colors truncate">{col.title}</button>)}
                  </div>
                )}
              </div>
              <div className="border-t border-stroke">
                <button onClick={() => setExpandedCollections({...expandedCollections, workouts: !expandedCollections.workouts})} className="w-full p-3 flex items-center justify-between text-sm font-bold text-title hover:bg-stroke transition-colors">
                  <div className="flex items-center gap-3"><Folder size={16} className="text-blue-500" /> Workout Splits</div>
                  <ChevronDown size={14} className={`text-subtitle transition-transform ${expandedCollections.workouts ? 'rotate-180' : ''}`} />
                </button>
                {expandedCollections.workouts && (
                  <div className="bg-sidebar border-t border-stroke p-2 flex flex-col gap-1">
                    {mockCollections.workouts.map(col => <button key={col.id} className="text-xs font-medium text-subtitle hover:text-title hover:bg-background p-2 text-left rounded-md transition-colors truncate">{col.title}</button>)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search & Conversations */}
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtitle" />
              <input type="text" placeholder="Search histories..." className="w-full bg-background border border-stroke rounded-lg pl-9 pr-3 py-2 text-sm text-title focus:outline-none focus:border-primary" />
            </div>

            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-subtitle">Conversations</span>
              <button onClick={handleNewSession} className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider">+ New</button>
            </div>
            
            <div className="flex-1 overflow-y-auto flex flex-col gap-1 custom-scrollbar pr-1">
              {sessions.map((session) => (
                <button key={session.id} onClick={() => handleSessionSelect(session.id)} className={`text-left py-2.5 px-3 text-sm transition-all truncate rounded-lg cursor-pointer border ${activeSessionId === session.id ? 'bg-background text-title border-stroke font-bold shadow-sm border-l-2 border-l-primary' : 'bg-transparent text-subtitle hover:text-title hover:bg-background border-transparent font-medium'}`}>{session.title}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Toggles */}
        <div className="p-4 border-t border-stroke bg-background/50 flex flex-col gap-3 shrink-0 min-w-[320px]">
          <div className="flex bg-background rounded-lg p-1 border border-stroke shadow-inner">
            <button onClick={() => setEditStyle('inline')} className={`flex-1 py-1.5 text-xs font-bold rounded-md uppercase tracking-wider transition-all ${editStyle === 'inline' ? 'bg-sidebar text-title shadow border border-stroke' : 'text-subtitle hover:text-title'}`}>Inline</button>
            <button onClick={() => setEditStyle('modal')} className={`flex-1 py-1.5 text-xs font-bold rounded-md uppercase tracking-wider transition-all ${editStyle === 'modal' ? 'bg-sidebar text-title shadow border border-stroke' : 'text-subtitle hover:text-title'}`}>Modal</button>
          </div>
          <button className="w-full bg-sidebar border border-stroke rounded-lg p-2.5 flex justify-between items-center hover:border-primary transition-colors group">
            <div className="flex items-center gap-2"><Zap size={14} className="text-yellow-500"/><span className="font-bold text-title text-xs">Strategist AI</span></div>
            <ChevronDown size={14} className="text-subtitle" />
          </button>
        </div>
      </div>

      {/* ================= RIGHT ARENA (CHAT) ================= */}
      <div className="flex-1 flex flex-col relative z-10 w-full h-full transition-all duration-300">
        
        <div className={`h-16 px-4 flex items-center border-b border-stroke bg-background/80 backdrop-blur-md shrink-0 gap-4 ${isDesktopSidebarOpen ? 'lg:hidden' : 'flex'}`}>
          <button onClick={() => setIsMobileSidebarOpen(true)} className="lg:hidden p-2 bg-sidebar border border-stroke rounded-lg text-subtitle"><Menu size={18} /></button>
          {!isDesktopSidebarOpen && (
            <button onClick={() => setIsDesktopSidebarOpen(true)} className="hidden lg:flex p-2 bg-sidebar border border-stroke rounded-lg text-subtitle hover:text-title"><Menu size={18}/></button>
          )}
          <span className="font-black text-title tracking-tight flex items-center gap-2"><img src="/src/assets/Aura.svg" className="w-5 h-5" onError={(e)=>e.target.style.display='none'}/> AURA AI</span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-12 lg:px-32 py-10 pb-40 flex flex-col gap-8 custom-scrollbar">
          {messages.map((msg) => {
            
            // --- TEMPLATE WELCOME MESSAGE ---
            if (msg.type === 'ai_text_template') {
              return (
                <div key={msg.id} className="w-full flex flex-col items-center justify-center mt-10 md:mt-20 animate-fade-in">
                  <div className="w-16 h-16 bg-sidebar border-2 border-primary rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                    <img src="/src/assets/Aura.svg" alt="Aura" className="w-8 h-8" onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerHTML = '<span class="text-2xl">✨</span>'}} />
                  </div>
                  <h2 className="text-2xl font-black text-title mb-2">How can I assist you today?</h2>
                  <p className="text-subtitle mb-10 text-center max-w-md">Select an action template below or type a custom command.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                    <button onClick={() => handleSend('Create a workout plan for Omar')} className="flex items-center gap-3 bg-sidebar border border-stroke p-4 rounded-xl hover:border-primary hover:bg-background transition-all text-left group">
                      <div className="bg-primary/10 p-2 rounded-lg text-primary"><Activity size={18} /></div>
                      <div>
                        <span className="block font-bold text-title text-sm group-hover:text-primary transition-colors">Workout Programming</span>
                        <span className="block text-xs text-subtitle mt-0.5">Generate multi-day splits & protocols.</span>
                      </div>
                    </button>
                    <button onClick={() => handleSend('Create a bulk diet for Sarah')} className="flex items-center gap-3 bg-sidebar border border-stroke p-4 rounded-xl hover:border-blue-500 hover:bg-background transition-all text-left group">
                      <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500"><Utensils size={18} /></div>
                      <div>
                        <span className="block font-bold text-title text-sm group-hover:text-blue-500 transition-colors">Nutrition Diets</span>
                        <span className="block text-xs text-subtitle mt-0.5">Multi-day nutrition scheduling.</span>
                      </div>
                    </button>
                    <button onClick={() => handleSend('Give me AI analytics of my site according to the data in it.')} className="flex items-center gap-3 bg-sidebar border border-stroke p-4 rounded-xl hover:border-purple-500 hover:bg-background transition-all text-left group">
                      <div className="bg-purple-500/10 p-2 rounded-lg text-purple-500"><PieChart size={18} /></div>
                      <div>
                        <span className="block font-bold text-title text-sm group-hover:text-purple-500 transition-colors">Site Analytics</span>
                        <span className="block text-xs text-subtitle mt-0.5">Generate operational insights report.</span>
                      </div>
                    </button>
                    <button onClick={() => handleSend('Draft a notification for the summer challenge')} className="flex items-center gap-3 bg-sidebar border border-stroke p-4 rounded-xl hover:border-blue-400 hover:bg-background transition-all text-left group">
                      <div className="bg-blue-400/10 p-2 rounded-lg text-blue-400"><Bell size={18} /></div>
                      <div>
                        <span className="block font-bold text-title text-sm group-hover:text-blue-400 transition-colors">Broadcast Notifications</span>
                        <span className="block text-xs text-subtitle mt-0.5">Draft automated retention messages.</span>
                      </div>
                    </button>
                  </div>
                </div>
              );
            }

            if (msg.type === 'user') return (<div key={msg.id} className="self-end max-w-[90%] md:max-w-[70%] flex items-start gap-3"><div className="user-bubble rounded-3xl rounded-tr-sm px-5 py-3 text-[14px] text-title font-medium shadow-md bg-sidebar border border-stroke">{msg.content}</div></div>);
            if (msg.type === 'ai_text') return (<div key={msg.id} className="self-start max-w-[90%] md:max-w-[70%] flex items-start gap-4"><div className="pt-2"><div className="text-[14px] text-title leading-relaxed font-medium">{msg.content}</div></div></div>);

            if (msg.type === 'ai_action_proposal') {
              const isEditingInline = editStyle === 'inline' && editingMessageId === msg.id;

              return (
                <div key={msg.id} className="self-center w-full max-w-[1000px] flex items-start gap-4 my-4">
                  <div className="w-full">
                    <div className="text-[14px] text-title leading-relaxed font-medium mb-4 text-center md:text-left">{msg.content}</div>
                    
                    <div className="action-proposal-card bg-sidebar border border-stroke rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl mx-auto">
                      <div className="bg-background/80 border-b border-stroke px-5 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {msg.action.icon}
                          <span className="text-sm font-black text-title tracking-widest uppercase">{msg.action.title}</span>
                        </div>
                        {msg.status !== 'success' && <span className="bg-yellow-500/10 text-yellow-500 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full border border-yellow-500/20">Pending Approval</span>}
                      </div>
                      
                      <div className="p-5 bg-sidebar/50">
                        {isEditingInline ? (
                          msg.action.title === 'ASSIGN WORKOUT PLAN' ? renderWorkoutBuilderPreview() :
                          msg.action.title === 'ASSIGN NUTRITION PLAN' ? renderNutritionPreview() :
                          msg.action.title === 'BROADCAST NOTIFICATION' ? renderNotificationPreview() :
                          msg.action.title === 'SITE ANALYTICS REPORT' ? renderAnalyticsPreview() :
                          msg.action.title === 'CREATE SYSTEM ROLE' ? renderPermissionsPreview() : renderGenericForm()
                        ) : (
                          <div className="flex flex-col gap-4">
                            {msg.action.targets && (
                              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 border-b border-stroke/50 pb-2">
                                <span className="text-xs font-bold text-primary uppercase tracking-wider w-40 shrink-0 pt-0.5">Assigned Targets</span>
                                <div className="flex flex-wrap gap-2 flex-1">
                                  {msg.action.targets.map(t => <span key={t} className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded">{t}</span>)}
                                </div>
                              </div>
                            )}
                            {msg.action.details.map((detail, idx) => (
                              <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 border-b border-stroke/50 pb-2 last:border-0 last:pb-0">
                                <span className="text-xs font-bold text-subtitle uppercase tracking-wider w-40 shrink-0 pt-0.5">{detail.label}</span>
                                <span className="text-sm text-title font-medium flex-1">{detail.value}</span>
                              </div>
                            ))}
                            {msg.action.planData && <div className="mt-2 bg-background border border-stroke rounded-lg p-3 text-center"><span className="text-xs font-bold text-subtitle">{msg.action.planData.length} Workout Days Attached. Click Preview/Edit to view Routine Details.</span></div>}
                            {msg.action.nutritionData && <div className="mt-2 bg-background border border-stroke rounded-lg p-3 text-center"><span className="text-xs font-bold text-subtitle">{msg.action.nutritionData.days?.length || 1} Days / {msg.action.nutritionData.durationWeeks} Weeks Attached. Click Preview to view.</span></div>}
                            {msg.action.permissionsData && <div className="mt-2 bg-background border border-stroke rounded-lg p-3 text-center"><span className="text-xs font-bold text-subtitle">Matrix Configuration Attached. Click Preview/Edit to view Access Levels.</span></div>}
                            {msg.action.notificationData && <div className="mt-2 bg-background border border-stroke rounded-lg p-4"><span className="text-xs font-bold text-subtitle uppercase mb-1 block">Preview snippet</span><p className="text-sm text-title italic">"{msg.action.notificationData.body.substring(0,80)}..."</p></div>}
                            {msg.action.analyticsData && renderAnalyticsPreview()}
                          </div>
                        )}
                      </div>

                      {!isEditingInline && msg.status !== 'success' && (
                        <div className="bg-background/80 border-t border-stroke p-4 flex flex-wrap justify-end gap-3">
                          <button onClick={() => handleActionReject(msg.id)} disabled={msg.status === 'loading'} className="px-4 py-2 rounded-xl text-sm font-bold text-subtitle hover:text-red-500 hover:bg-sidebar transition-colors">Reject</button>
                          <button onClick={() => startEditing(msg)} disabled={msg.status === 'loading'} className="px-4 py-2 rounded-xl text-sm font-bold text-blue-500 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 flex items-center gap-2 transition-colors"><Edit3 size={16} /> Preview / Edit</button>
                          <button onClick={() => handleActionApprove(msg.id)} disabled={msg.status === 'loading'} className="relative px-6 py-2 rounded-xl text-sm font-black bg-primary text-black hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] flex justify-center items-center min-w-[160px]">
                            {msg.status === 'loading' ? <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin text-black" /> Executing...</span> : "Approve & Execute"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            if (msg.type === 'ai_action_result') {
               return (
                <div key={msg.id} className="self-center w-full max-w-3xl flex items-start gap-4 my-2">
                  <div className="w-full">
                    <div className={`border rounded-2xl p-5 flex items-center justify-center gap-4 mx-auto shadow-xl ${msg.status === 'success' ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}>
                      {msg.status === 'success' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                      <span className="text-sm font-bold text-title">{msg.resultMsg}</span>
                    </div>
                  </div>
                </div>
               );
            }
            return null;
          })}
          <div ref={chatEndRef} />
        </div>

        <div className={`absolute bottom-6 left-0 right-0 z-20 px-4 md:px-8 transition-all duration-300 ${isDesktopSidebarOpen ? 'md:max-w-4xl lg:max-w-5xl md:mx-auto' : 'md:max-w-5xl lg:max-w-6xl md:mx-auto'}`}>
          <div className="rounded-[2rem] flex items-center px-2 py-2 shadow-2xl border border-stroke bg-background/90 backdrop-blur-2xl">
            <button className="hidden sm:flex w-12 h-12 items-center justify-center text-subtitle hover:text-title hover:bg-sidebar transition-colors rounded-full shrink-0"><Paperclip size={20} /></button>
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask Aura to generate or assign anything..." className="flex-1 bg-transparent border-none text-title px-4 focus:outline-none placeholder:text-subtitle text-[15px]" />
            <button onClick={() => handleSend()} disabled={!inputText.trim()} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${inputText.trim().length > 0 ? 'bg-primary text-black shadow-[0_0_15px_rgba(34,197,94,0.3)] cursor-pointer' : 'bg-sidebar border border-stroke text-subtitle cursor-default'}`}><ArrowUp size={20} strokeWidth={2.5} /></button>
          </div>
        </div>
      </div>

      {/* MODAL EDITOR OVERLAY */}
      {editStyle === 'modal' && editingMessageId && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden">
          <div className="w-full max-w-[1400px] bg-sidebar border border-stroke rounded-2xl shadow-2xl flex flex-col max-h-[95vh] animate-fade-in">
            <div className="px-4 md:px-6 py-4 border-b border-stroke flex justify-between items-center bg-background shrink-0 rounded-t-2xl">
              <h2 className="text-lg font-black text-title tracking-tight flex items-center gap-2"><Edit3 size={20} className="text-blue-500" /> AI Payload Editor</h2>
              <button onClick={cancelEdits} className="text-subtitle hover:text-alert transition-colors p-1 rounded-md hover:bg-alert-lite"><X size={20} /></button>
            </div>
            
            <div className="p-4 md:p-6 overflow-y-auto flex-1 custom-scrollbar">
              {messages.find(m => m.id === editingMessageId)?.action?.title === 'ASSIGN WORKOUT PLAN' ? renderWorkoutBuilderPreview() :
               messages.find(m => m.id === editingMessageId)?.action?.title === 'ASSIGN NUTRITION PLAN' ? renderNutritionPreview() :
               messages.find(m => m.id === editingMessageId)?.action?.title === 'BROADCAST NOTIFICATION' ? renderNotificationPreview() :
               messages.find(m => m.id === editingMessageId)?.action?.title === 'SITE ANALYTICS REPORT' ? renderAnalyticsPreview() :
               messages.find(m => m.id === editingMessageId)?.action?.title === 'CREATE SYSTEM ROLE' ? renderPermissionsPreview() : renderGenericForm()}
            </div>
            
            <div className="px-4 md:px-6 py-4 border-t border-stroke bg-background flex flex-col sm:flex-row justify-end gap-3 shrink-0 rounded-b-2xl">
              <button onClick={cancelEdits} className="px-5 py-3 sm:py-2.5 text-sm font-bold text-subtitle hover:text-title hover:bg-sidebar rounded-xl transition-colors border border-stroke sm:border-none">Cancel</button>
              <button onClick={saveEdits} className="flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 bg-blue-500 text-white text-sm font-bold rounded-xl shadow-md hover:bg-blue-600 transition-colors"><Save size={18} /> Apply Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
