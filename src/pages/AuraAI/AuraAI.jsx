import React, { useState, useRef, useEffect } from 'react';
import { MessageFormatter } from './components/MessageFormatter';
import { MentionDropdown } from './components/MentionDropdown';
import { WorkoutTemplateCard } from './components/WorkoutTemplateCard';
import { SocialPostCard } from './components/SocialPostCard';
import { PlansModal } from './components/PlansModal';
import { SearchModal } from './components/SearchModal';
import { SettingsModal } from './components/SettingsModal';
import { TemplatesModal } from './components/TemplatesModal';
import { FeaturePreviewModal } from './components/FeaturePreviewModal';
import { Repeat } from 'lucide-react';
import AuraLogo from '../../assets/Aura.svg';
import AuraOutlinedLogoBlack from '../../assets/Aura-outlined-black.svg';
import AuraOutlinedLogoWhite from '../../assets/Aura-outlined-white.svg';
import { 
  User, Menu, Paperclip, ArrowUp, ChevronDown, ChevronRight, ChevronLeft,
  Copy, Puzzle, Headphones, ThumbsUp, ThumbsDown, Folder, Plus, Search,
  Bot, MoreVertical, Edit3, Trash2, CheckCircle2, XCircle, Loader2,
  Star, StarOff, ArrowLeftRight, Share2,
  ArrowLeft, Zap, Play, Target, UserPlus, Save, X, GripVertical, RefreshCw,
  Key, Shield, Bell, Utensils, Database, PieChart, Activity, Eye, MessageSquare,
  CalendarDays, Grid, Settings, LogOut, Send, Dumbbell, FileText, BarChart2,
  TrendingDown, LinkIcon, DollarSign, TrendingUp, Users, Award
} from 'lucide-react';
import './AuraAI.css';

// --- MOCK DATA ---
const MOCK_PEOPLE = [
  { id: 'p1', name: 'Omar Alaa', role: 'Trainee', icon: <User size={14}/> },
  { id: 'p2', name: 'Hajer Ahmed', role: 'Trainee', icon: <User size={14}/> },
  { id: 'p3', name: 'Sarah Jenkins', role: 'Staff', icon: <User size={14}/> },
  { id: 'p4', name: 'Alex Morgan', role: 'Trainer', icon: <User size={14}/> }
];
const MOCK_TEMPLATES = [
  { id: 't1', code: 'tmp_workout', name: 'Workout Template', icon: <Dumbbell size={14}/> },
  { id: 't2', code: 'tmp_nutrition', name: 'Nutrition Template', icon: <Utensils size={14}/> },
  { id: 't3', code: 'tmp_analytics', name: 'Analytics Report', icon: <Activity size={14}/> }
];
const MOCK_PLANS = [
  { id: 'pl1', code: 'pl_vip', name: 'VIP Plan - Premium Plan', icon: <FileText size={14}/> },
  { id: 'pl2', code: 'pl_basic', name: 'Basic Starter Plan', icon: <FileText size={14}/> },
  { id: 'pl3', code: 'pl_shred', name: 'Summer Shred', icon: <FileText size={14}/> }
];

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
  },
  {
    id: 's7', title: 'Social Media Post',
    messages: [
      { id: 'msg-s7-1', type: 'user', content: 'Create a new Instagram post for our summer promotion.' },
      {
        id: 'msg-s7-3', type: 'ai_action_proposal', content: "I've generated a draft for the Instagram summer promotion post.",
        action: { 
          title: "CREATE SOCIAL POST", 
          icon: <Share2 size={18} className="text-pink-500"/>, 
          details: [{ label: "Platform", value: "Instagram" }], 
          postData: { 
            platform: 'Instagram', 
            targetAudience: ['All Members'], 
            publishDate: 'Immediate', 
            tags: ['#SummerFitness', '#AuraGym'], 
            caption: 'Ready to crush your goals this summer? Join our new 30-day challenge! 💪🔥 #SummerFitness #AuraGym' 
          } 
        }, 
        status: 'pending'
      }
    ]
  }
];

export function AuraAI({ onNavigate }) {
  const [inputText, setInputText] = useState('');
  const [sessions, setSessions] = useState(initialSessions);
  const [activeSessionId, setActiveSessionId] = useState('s1');
  const [mentionState, setMentionState] = useState({ active: false, type: null, query: '', startIndex: -1, items: [], selectedIndex: 0 });
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const inputRef = useRef(null);
  const overlayRef = useRef(null);

  const handleInputChange = (e) => {
    let val = e.target.value;
    
    // Auto-replace shortcuts
    val = val.replace(/\btmp_workout\b/g, '[WORKOUT TEMPLATE]');
    val = val.replace(/\btmp_nutrition\b/g, '[NUTRITION TEMPLATE]');
    val = val.replace(/\bpl_vip\b/g, '[VIP PLAN]');
    val = val.replace(/\bpl_basic\b/g, '[BASIC PLAN]');
    val = val.replace(/\btmp_post\b/g, '[SOCIAL POST TEMPLATE]');

    setInputText(val);

    // Auto-resize textarea
    e.target.style.height = '24px';
    const newHeight = Math.min(e.target.scrollHeight, 24 * 4);
    e.target.style.height = `${newHeight}px`;
    if (overlayRef.current) overlayRef.current.style.height = `${newHeight}px`;
    
    // Simple mention logic
    const cursor = e.target.selectionStart;
    const textBeforeCursor = val.slice(0, cursor);
    const lastWord = textBeforeCursor.split(/\s/).pop();

    if (lastWord.startsWith('@')) {
      const q = lastWord.slice(1);
      const items = MOCK_PEOPLE.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
      setMentionState({ active: true, type: '@', query: q, startIndex: cursor - lastWord.length, items, selectedIndex: 0 });
    } else if (lastWord.startsWith('tmp_')) {
      const q = lastWord.slice(4);
      const items = MOCK_TEMPLATES.filter(t => t.name.toLowerCase().includes(q.toLowerCase()) || t.code.includes(q.toLowerCase()));
      setMentionState({ active: true, type: 'tmp_', query: q, startIndex: cursor - lastWord.length, items, selectedIndex: 0 });
    } else if (lastWord.startsWith('pl_')) {
      const q = lastWord.slice(3);
      const items = MOCK_PLANS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.code.includes(q.toLowerCase()));
      setMentionState({ active: true, type: 'pl_', query: q, startIndex: cursor - lastWord.length, items, selectedIndex: 0 });
    } else {
      setMentionState({ active: false, type: null, query: '', startIndex: -1, items: [], selectedIndex: 0 });
    }
  };

  const handleMentionSelect = (replacement) => {
    const before = inputText.slice(0, mentionState.startIndex);
    const after = inputText.slice(inputText.length); // Just append for now, or find end of word
    // Actually we should slice up to the current cursor position which might be tricky if we don't have it,
    // but a simple replace of the last typed word works.
    const words = inputText.split(' ');
    words[words.length - 1] = replacement;
    setInputText(words.join(' ') + ' ');
    setMentionState({ active: false, type: null, query: '', startIndex: -1 });
  };

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
    if (mentionState.active && mentionState.items.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setMentionState(prev => ({ ...prev, selectedIndex: (prev.selectedIndex + 1) % prev.items.length }));
        return;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setMentionState(prev => ({ ...prev, selectedIndex: prev.selectedIndex - 1 < 0 ? prev.items.length - 1 : prev.selectedIndex - 1 }));
        return;
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = mentionState.items[mentionState.selectedIndex];
        const prefix = mentionState.type === '@' ? '@' : '';
        handleMentionSelect(prefix + (item.code || item.name));
        return;
      }
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleScrollSync = (e) => {
    if (overlayRef.current) {
      overlayRef.current.scrollLeft = e.target.scrollLeft;
      overlayRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const renderInputOverlay = (text) => {
    if (!text) return <span className="text-subtitle">Ask Aura.AI.</span>;
    const parts = text.split(/(\[.*?\]|\*{1,2}.*?\*{1,2})/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-bold text-title"><span className="text-transparent">**</span>{part.slice(2, -2)}<span className="text-transparent">**</span></strong>;
      if (part.startsWith('*') && part.endsWith('*')) return <strong key={i} className="font-bold text-title"><span className="text-transparent">*</span>{part.slice(1, -1)}<span className="text-transparent">*</span></strong>;
      
      if (part.startsWith('[') && part.endsWith('TEMPLATE]')) {
         return <span key={i} className="bg-primary-lite text-primary rounded px-1"><span className="text-transparent">[</span>{part.slice(1, -1)}<span className="text-transparent">]</span></span>;
      }
      if (part.startsWith('[') && part.endsWith('PLAN]')) {
         return <span key={i} className="bg-purple-500/30 text-purple-400 rounded px-1"><span className="text-transparent">[</span>{part.slice(1, -1)}<span className="text-transparent">]</span></span>;
      }
      if (part.startsWith('[') && part.endsWith('POST TEMPLATE]')) {
         return <span key={i} className="bg-pink-500/30 text-pink-400 rounded px-1"><span className="text-transparent">[</span>{part.slice(1, -1)}<span className="text-transparent">]</span></span>;
      }
      if (part.startsWith('[@') && part.endsWith(']')) {
         return <span key={i} className="bg-orange-500/30 text-orange-400 rounded px-1"><span className="text-transparent">[</span>{part.slice(1, -1)}<span className="text-transparent">]</span></span>;
      }
      
      const subParts = part.split(/(@[A-Za-z0-9_ ]+|tmp_[a-z_]+|pl_[a-z_]+)/g);
      return subParts.map((sub, j) => {
         if (sub.startsWith('@')) return <span key={`${i}-${j}`} className="text-orange-400">{sub}</span>;
         if (sub.startsWith('tmp_')) return <span key={`${i}-${j}`} className="text-primary">{sub}</span>;
         if (sub.startsWith('pl_')) return <span key={`${i}-${j}`} className="text-purple-400">{sub}</span>;
         return <span key={`${i}-${j}`} className="text-title">{sub}</span>;
      });
    });
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
                 <button onClick={() => handleAddWorkoutBlock('dropset')} className="flex items-center gap-1 bg-purple-500/10 text-purple-500 border border-purple-500/20 px-2 py-1.5 rounded-lg text-[10px] font-bold hover:bg-purple-500 hover:text-title transition-colors"><TrendingDown size={12} /> + Drop</button>
                 <button onClick={() => handleAddWorkoutBlock('superset')} className="flex items-center gap-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-1.5 rounded-lg text-[10px] font-bold hover:bg-blue-500 hover:text-title transition-colors"><LinkIcon size={12} /> + Super</button>
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

  const renderSidebarContent = (isMobile = false) => (
    <>
      {/* Logo Area */}
      <div className="p-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={AuraLogo} alt="Aura Logo" className="w-6 h-6 object-contain" />
          <span className="text-xl font-black tracking-widest text-title ml-1">AURA.AI<span className="text-primary">.</span></span>
        </div>
        <button onClick={() => isMobile ? setIsMobileSidebarOpen(false) : setIsDesktopSidebarOpen(false)} className="w-8 h-8 rounded-full bg-sidebar border border-stroke flex items-center justify-center text-subtitle hover:text-title transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
      </div>

      {/* New Chat Button */}
      <div className="px-6 flex items-center gap-3">
        <button onClick={() => { handleNewSession(); if (isMobile) setIsMobileSidebarOpen(false); }} className="flex-1 bg-primary hover:bg-[#3b82f6] transition-colors text-black font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(74,222,128,0.3)]">
          <Plus size={16} strokeWidth={3} /> New Chat
        </button>
        <button onClick={() => setIsTemplatesModalOpen(true)} className="w-11 h-11 rounded-full border border-stroke flex items-center justify-center text-subtitle hover:text-title hover:bg-sidebar transition-all cursor-pointer">
          <Grid size={18} />
        </button>
      </div>

      {/* Chat Lists */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-12 mt-2 custom-scrollbar flex flex-col gap-6 mask-bottom-edge">
        
        {/* Pinned/Recent Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative h-24 rounded-2xl overflow-hidden border border-stroke group cursor-pointer">
            <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, var(--background) 5%, transparent 100%)' }}></div>
            <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop" alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-500" />
            <div className="relative z-20 p-3 h-full flex flex-col justify-end">
               <span className="text-[9px] text-title absolute top-2 right-2 bg-sidebar px-2 py-0.5 rounded-full backdrop-blur-sm border border-stroke">now</span>
               <span className="text-[11px] leading-tight font-black text-primary uppercase truncate">OMAR ALAA</span>
               <span className="text-[9px] font-bold text-subtitle uppercase tracking-wider mt-0.5 truncate">WORKOUT PLAN</span>
            </div>
          </div>
          
          <div className="relative h-24 rounded-2xl overflow-hidden border border-stroke group cursor-pointer">
            <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, var(--background) 5%, transparent 100%)' }}></div>
            <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop" alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-500" />
            <div className="relative z-20 p-3 h-full flex flex-col justify-end">
               <span className="text-[9px] text-title absolute top-2 right-2 bg-sidebar px-2 py-0.5 rounded-full backdrop-blur-sm border border-stroke">14m</span>
               <span className="text-[11px] leading-tight font-black text-primary uppercase truncate">HAJER AHMED</span>
               <span className="text-[9px] font-bold text-subtitle uppercase tracking-wider mt-0.5 truncate">NUTRITION PLAN</span>
            </div>
          </div>
        </div>

        {/* Today */}
        <div className="flex flex-col gap-2">
          <div className="px-2 flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-subtitle uppercase tracking-widest">TODAY</span>
            <button className="text-[10px] font-bold text-[#f87171] hover:text-red-400 uppercase tracking-widest">Clear all</button>
          </div>
          {sessions.slice(0, 3).map(session => (
            session.id === activeSessionId ? (
              <div key={session.id} className="active-chat-item flex items-center justify-between pl-5 py-2.5 group">
                 <div className="absolute left-2 top-2 bottom-2 w-1 bg-primary rounded-full"></div>
                 <span className="text-[13px] font-bold text-primary truncate pr-2 cursor-pointer w-full z-10" onClick={() => { handleSessionSelect(session.id); if (isMobile) setIsMobileSidebarOpen(false); }}>{session.title}</span>
                 <div className="flex items-center gap-2 shrink-0 bg-sidebar px-3 py-1.5 rounded-full z-10 shadow-sm border border-stroke">
                   <Edit3 size={14} className="text-subtitle hover:text-title cursor-pointer"/>
                   <Trash2 size={14} className="text-alert hover:text-red-400 cursor-pointer"/>
                 </div>
              </div>
            ) : (
              <button key={session.id} onClick={() => { handleSessionSelect(session.id); if (isMobile) setIsMobileSidebarOpen(false); }} className="text-left px-3 py-2 text-[13px] text-subtitle hover:text-title truncate transition-colors w-full">{session.title}</button>
            )
          ))}
        </div>

        {/* History */}
        {sessions.length > 3 && (
        <div className="flex flex-col gap-2 mt-4">
          <div className="px-2 flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-subtitle uppercase tracking-widest">CHATS HISTORY</span>
            <button className="text-[10px] font-bold text-[#f87171] hover:text-red-400 uppercase tracking-widest">Clear all</button>
          </div>
          {sessions.slice(3).map(session => (
            session.id === activeSessionId ? (
              <div key={session.id} className="active-chat-item flex items-center justify-between pl-5 py-2.5 group">
                 <div className="absolute left-2 top-2 bottom-2 w-1 bg-primary rounded-full"></div>
                 <span className="text-[13px] font-bold text-primary truncate pr-2 cursor-pointer w-full z-10" onClick={() => { handleSessionSelect(session.id); if (isMobile) setIsMobileSidebarOpen(false); }}>{session.title}</span>
                 <div className="flex items-center gap-2 shrink-0 bg-sidebar px-3 py-1.5 rounded-full z-10 shadow-sm border border-stroke">
                   <Edit3 size={14} className="text-subtitle hover:text-title cursor-pointer"/>
                   <Trash2 size={14} className="text-alert hover:text-red-400 cursor-pointer"/>
                 </div>
              </div>
            ) : (
              <button key={session.id} onClick={() => { handleSessionSelect(session.id); if (isMobile) setIsMobileSidebarOpen(false); }} className="text-left px-3 py-2 text-[13px] text-subtitle hover:text-title truncate transition-colors w-full">{session.title}</button>
            )
          ))}
        </div>
        )}

      </div>

      {/* Bottom Area */}
      <div className="p-5 flex flex-col gap-4 border-t border-stroke">
        <div className="flex items-center gap-2">
          <div onClick={() => setIsSearchModalOpen(true)} className="flex-1 bg-sidebar rounded-full px-3 py-2.5 flex items-center gap-2 border border-stroke hover:border-primary transition-all cursor-pointer">
            <Search size={14} className="text-subtitle"/>
            <input type="text" readOnly placeholder="Search conversations..." className="bg-transparent border-none text-[12px] text-title focus:outline-none w-full placeholder:text-subtitle pointer-events-none" />
          </div>
          <button onClick={() => setIsSettingsModalOpen(true)} className="w-10 h-10 rounded-full bg-sidebar border border-stroke flex items-center justify-center text-subtitle hover:text-title transition-colors shrink-0 cursor-pointer">
            <Settings size={16} />
          </button>
        </div>
        <button onClick={() => setIsPlansModalOpen(true)} className="w-full relative group overflow-hidden rounded-2xl p-[1px]">
          <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary opacity-70 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
          <div className="relative bg-background group-hover:bg-transparent transition-all duration-300 rounded-2xl py-3 px-4 flex items-center justify-center gap-2">
            <Zap size={16} className="text-primary group-hover:text-black transition-colors" />
            <span className="font-bold text-sm tracking-wide text-primary group-hover:text-black transition-colors">Upgrade to Pro</span>
          </div>
        </button>
      </div>
    </>
  );

  return (
    <div className="h-screen w-full relative overflow-hidden bg-background flex font-sans text-title">
      
      {/* ================= MOBILE DRAWER ================= */}
      <div className={`md:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${isMobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         {/* Backdrop */}
         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)}></div>
         {/* Drawer */}
         <div className={`absolute inset-0 w-full bg-background/80 backdrop-blur-2xl overflow-hidden flex flex-col z-50 transition-transform duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Mesh Gradients for Mobile Menu */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(74,222,128,0.5)_0%,_transparent_60%),_radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.5)_0%,_transparent_60%),_radial-gradient(circle_at_50%_60%,_rgba(59,130,246,0.4)_0%,_transparent_70%)] mix-blend-screen opacity-100 theme-logo-dark pointer-events-none"></div>
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(74,222,128,0.7)_0%,_transparent_60%),_radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.7)_0%,_transparent_60%),_radial-gradient(circle_at_50%_60%,_rgba(59,130,246,0.5)_0%,_transparent_70%)] mix-blend-multiply opacity-100 theme-logo-light pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col h-full w-full">
               {renderSidebarContent(true)}
            </div>
         </div>
      </div>

      {/* ================= LEFT SIDEBAR (EXPANDED) ================= */}
      <div className={`hidden lg:flex transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden shrink-0 relative z-50 ${isDesktopSidebarOpen ? 'w-[300px] h-[calc(100vh-32px)] my-4 ml-4 opacity-100' : 'w-0 h-[calc(100vh-32px)] my-4 ml-0 opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full w-[300px] shrink-0 bg-background border border-stroke rounded-[32px] z-20 overflow-hidden shadow-2xl">
          {renderSidebarContent(false)}
        </div>
      </div>

      {/* ================= LEFT SIDEBAR (COLLAPSED) ================= */}
      <div className={`hidden md:flex transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden shrink-0 relative z-50 ${!isDesktopSidebarOpen ? 'w-[80px] opacity-100' : 'w-[80px] opacity-100 lg:w-0 lg:opacity-0 lg:pointer-events-none'}`}>
        <div className="flex flex-col h-full w-[80px] shrink-0 bg-background py-6 px-3 items-center z-20">
          
          <div className="flex flex-col items-center gap-6 w-full">
            <button onClick={handleNewSession} className="w-12 h-12 rounded-full bg-sidebar border border-stroke flex items-center justify-center text-primary hover:text-title hover:bg-sidebar transition-colors">
              <Plus size={20} strokeWidth={2.5}/>
            </button>

            <div className="w-full bg-sidebar rounded-full py-4 flex flex-col items-center gap-5 border border-stroke">
              <button onClick={() => setIsTemplatesModalOpen(true)} className="text-subtitle hover:text-title transition-colors"><Grid size={18}/></button>
              <button onClick={() => setIsSearchModalOpen(true)} className="text-subtitle hover:text-title transition-colors"><Search size={18}/></button>
              <button onClick={() => setIsSettingsModalOpen(true)} className="text-subtitle hover:text-title transition-colors"><Settings size={18}/></button>
            </div>

            <button onClick={() => setIsDesktopSidebarOpen(true)} className="w-12 h-12 rounded-full bg-sidebar border border-stroke hidden lg:flex items-center justify-center text-subtitle hover:text-title transition-colors">
              <LogOut size={18} className="ml-1"/>
            </button>
          </div>
        </div>
      </div>


      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col relative z-10 w-full h-full bg-background">
         {/* Top Header Blur Backdrop */}
         <div className={`absolute top-0 left-0 right-0 h-28 bg-background/60 backdrop-blur-md z-20 pointer-events-none mask-bottom-edge transition-opacity duration-500 ${activeSession.messages.length > 1 ? (!isDesktopSidebarOpen || isPlansModalOpen ? 'opacity-100' : 'opacity-100 lg:opacity-0') : 'opacity-0'}`}></div>
         
         {/* Top Header (Responsive) */}
        <div className={`absolute left-0 right-0 flex justify-between md:justify-center items-center z-30 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] px-4 md:px-0 ${(!isDesktopSidebarOpen || isPlansModalOpen) ? 'top-4 md:top-6 opacity-100 scale-100' : 'top-4 md:top-6 lg:-top-20 opacity-100 md:opacity-100 lg:opacity-0 md:scale-100 lg:scale-90'}`}>
              
              {/* Mobile Only: Hamburger */}
              <button onClick={() => setIsMobileSidebarOpen(true)} className="md:hidden w-12 h-12 rounded-full bg-sidebar/50 backdrop-blur-md border border-stroke flex items-center justify-center text-title shadow-[0_0_20px_rgba(0,0,0,0.1)]">
                <Menu size={20} />
              </button>

              {/* Center Logo Pill */}
              <div className="bg-sidebar/50 backdrop-blur-md border border-stroke rounded-full p-1.5 pl-5 flex items-center gap-5 shadow-[0_0_30px_rgba(74,222,128,0.1)]">
                 <div className="flex items-center gap-2">
                   <img src={AuraLogo} alt="Aura Logo" className="w-5 h-5 object-contain" />
                   <span className="text-base font-black tracking-widest text-title ml-1">AURA.AI<span className="text-primary">.</span></span>
                 </div>
                 <button onClick={() => setIsPlansModalOpen(!isPlansModalOpen)} className="flex items-center gap-1 text-[11px] font-bold text-primary bg-primary-lite border border-primary-border px-3 py-1 rounded-full transition-colors hover:bg-primary hover:text-black">
                    Basic <ChevronDown size={12} strokeWidth={3}/>
                 </button>
              </div>

              {/* Mobile Only: New Chat */}
              <button onClick={handleNewSession} className="md:hidden w-12 h-12 rounded-full bg-sidebar/50 backdrop-blur-md border border-stroke flex items-center justify-center text-primary shadow-[0_0_20px_rgba(0,0,0,0.1)]">
                <Plus size={20} strokeWidth={2.5} />
              </button>
        </div>

        <PlansModal isOpen={isPlansModalOpen} onClose={() => setIsPlansModalOpen(false)} hideTab={isDesktopSidebarOpen} />

        {/* Central Chat Area (Empty State) */}
        {activeSession.messages.length === 1 && activeSession.messages[0].type === 'ai_text_template' ? (
          <div className="flex-1 flex flex-col relative overflow-hidden">
            {/* Mesh Gradients */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(74,222,128,0.5)_0%,_transparent_60%),_radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.5)_0%,_transparent_60%),_radial-gradient(circle_at_50%_60%,_rgba(59,130,246,0.4)_0%,_transparent_70%)] mix-blend-screen opacity-100 theme-logo-dark pointer-events-none"></div>
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(74,222,128,0.7)_0%,_transparent_60%),_radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.7)_0%,_transparent_60%),_radial-gradient(circle_at_50%_60%,_rgba(59,130,246,0.5)_0%,_transparent_70%)] mix-blend-multiply opacity-100 theme-logo-light pointer-events-none"></div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 mt-12">
              
              {/* Center Icon & Text */}
              <div className="flex flex-col items-center mb-10">
                <img src={AuraOutlinedLogoBlack} alt="Aura Logo" className="w-[52px] h-[52px] mb-5 opacity-80 object-contain theme-logo-light" />
                <img src={AuraOutlinedLogoWhite} alt="Aura Logo" className="w-[52px] h-[52px] mb-5 opacity-80 object-contain theme-logo-dark" />
                <div className="text-[18px] md:text-[24px] font-normal tracking-wide text-title text-center leading-tight">Try a template or describe an idea in chat</div>
              </div>

              {/* Template Buttons Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full max-w-[600px] md:max-w-4xl mb-12">
                {[
                  { id: 'workout', icon: <Dumbbell size={20} />, title: 'Workout Template', desc: 'Generate a customized 4-week program', prompt: 'Create a workout plan' },
                  { id: 'post', icon: <FileText size={20} />, title: 'Post on Hub', desc: 'Draft a social media post for members', prompt: 'Draft a social post' },
                  { id: 'nutrition', icon: <Utensils size={20} />, title: 'Nutrition Template', desc: 'Personalized meal plans and macros', prompt: 'Create a nutrition plan' },
                  { id: 'broadcast', icon: <Bell size={20} />, title: 'Broadcast', desc: 'Draft an announcement for all members', prompt: 'Draft notification' },
                  { id: 'data', icon: <BarChart2 size={20} />, title: 'Browse Data', desc: 'Explore members and financial data', prompt: 'Browse data' },
                  { id: 'analytics', icon: <Activity size={20} />, title: 'Analysis', desc: 'Get AI insights on your revenue', prompt: 'Give me analytics' },
                ].map((feature, idx) => (
                  <button key={idx} onClick={() => setSelectedFeature(feature)} className="flex flex-col items-start gap-3 bg-sidebar/40 backdrop-blur-sm border border-stroke rounded-2xl p-4 md:p-5 hover:border-primary hover:shadow-[0_0_20px_rgba(74,222,128,0.15)] transition-all text-left group">
                    <div className="bg-background border border-stroke p-2.5 rounded-xl group-hover:text-primary transition-colors text-subtitle">
                       {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-[13px] md:text-sm text-title mb-1 group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-[11px] md:text-xs text-subtitle leading-relaxed">{feature.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <div className="w-full max-w-3xl relative">
                <MentionDropdown mentionState={mentionState} items={mentionState.items} selectedIndex={mentionState.selectedIndex} onSelect={handleMentionSelect} />
                <div className="bg-sidebar/80 backdrop-blur-md border border-stroke rounded-full pl-6 pr-2 py-2 flex items-center gap-4 shadow-xl transition-all">
                  <button onClick={() => setIsTemplatesModalOpen(true)} className="text-subtitle hover:text-title transition-colors"><Grid size={20}/></button>
                  <div className="relative flex-1 min-h-[24px] overflow-hidden">
                    <div ref={overlayRef} className="absolute inset-0 text-[15px] font-medium pointer-events-none whitespace-pre overflow-hidden leading-[24px]" aria-hidden="true">
                      {renderInputOverlay(inputText)}
                    </div>
                    <textarea 
                      rows={1}
                      ref={inputRef}
                      value={inputText} 
                      onChange={handleInputChange} 
                      onKeyDown={handleKeyDown}
                      onScroll={handleScrollSync}
                      placeholder={!inputText ? "Ask Aura.AI." : ""}
                      className="w-full h-full bg-transparent border-none text-[15px] leading-[24px] focus:outline-none placeholder:text-subtitle font-medium z-10 resize-none"
                      style={{ color: 'transparent', caretColor: 'white', scrollbarWidth: 'none' }}
                    />
                  </div>
                  <button 
                    onClick={() => handleSend()}
                    className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center transition-all shadow-[0_0_15px_rgba(74,222,128,0.3)] ${inputText.trim() ? 'bg-primary text-black' : 'bg-primary text-black'}`}
                  >
                    <Send size={16} strokeWidth={2.5} className="ml-0.5"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Active Chat View */
          <div className="flex-1 flex flex-col px-6 pb-6 pt-0 w-full max-w-7xl mx-auto h-full overflow-hidden">
             <div className={`flex-1 overflow-y-auto pr-4 pb-4 custom-scrollbar flex flex-col gap-6 mask-bottom-edge pt-28 ${isDesktopSidebarOpen ? 'lg:pt-6' : ''}`}>
                {messages.map((msg) => {
                  if (msg.type === 'ai_text_template') return null;
                  if (msg.type === 'user') return (
                    <div key={msg.id} className="self-end max-w-[95%] md:max-w-[85%] flex flex-col items-end gap-2 group">
                      <div className="bg-sidebar border border-stroke rounded-2xl rounded-tr-sm px-5 py-3 text-[15px] font-medium text-title">
                         <MessageFormatter content={msg.content} />
                      </div>
                      <div className="flex items-center bg-sidebar border border-stroke rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity mr-2">
                        <button onClick={() => navigator.clipboard.writeText(msg.content)} className="p-2 text-subtitle hover:text-title transition-colors border-r border-stroke">
                          <Copy size={14} />
                        </button>
                        <button className="p-2 text-subtitle hover:text-title transition-colors border-r border-stroke">
                          <Edit3 size={14} />
                        </button>
                        <button className="p-2 text-alert hover:text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                  if (msg.type === 'ai_text') return (
                    <div key={msg.id} className="self-start max-w-[95%] md:max-w-[85%] flex flex-col gap-2 group">
                      <div className="flex items-start gap-4">
                         <div className="flex items-center justify-center shrink-0 mt-1">
                           <img src={AuraOutlinedLogoBlack} alt="Aura AI" className="w-6 h-6 object-contain opacity-80 theme-logo-light" />
                           <img src={AuraOutlinedLogoWhite} alt="Aura AI" className="w-6 h-6 object-contain opacity-80 theme-logo-dark" />
                         </div>
                         <div className="text-[15px] text-title leading-relaxed font-medium mt-1.5 w-full">
                           <MessageFormatter content={msg.content} />
                         </div>
                      </div>
                      <div className="flex items-center bg-sidebar border border-stroke rounded-full overflow-hidden mt-2 opacity-0 group-hover:opacity-100 transition-opacity w-fit ml-12">
                         <button className="p-2 px-3 text-subtitle hover:text-title transition-colors border-r border-stroke">
                           <ArrowLeftRight size={16} />
                         </button>
                         <button className="p-2 px-3 text-subtitle hover:text-title transition-colors border-r border-stroke">
                           <Star size={16} />
                         </button>
                         <button className="p-2 px-3 text-subtitle hover:text-title transition-colors border-r border-stroke">
                           <StarOff size={16} />
                         </button>
                         <button onClick={() => navigator.clipboard.writeText(msg.content)} className="p-2 px-3 text-subtitle hover:text-title transition-colors border-r border-stroke">
                           <Copy size={16} />
                         </button>
                         <button className="p-2 px-3 text-subtitle hover:text-title transition-colors">
                           <RefreshCw size={16} />
                         </button>
                      </div>
                    </div>
                  );
                  if (msg.type === 'ai_action_proposal') return (
                    <div key={msg.id} className="self-center flex items-start gap-4 w-full">
                       <div className="flex items-center justify-center shrink-0 mt-1">
                         <img src={AuraOutlinedLogoBlack} alt="Aura AI" className="w-6 h-6 object-contain opacity-80 theme-logo-light" />
                         <img src={AuraOutlinedLogoWhite} alt="Aura AI" className="w-6 h-6 object-contain opacity-80 theme-logo-dark" />
                       </div>
                       <div className="w-full">
                          <div className="text-[15px] text-title leading-relaxed font-medium mb-4"><MessageFormatter content={msg.content} /></div>
                          {msg.action.title === 'ASSIGN WORKOUT PLAN' ? (
                            <WorkoutTemplateCard data={msg.action.planData || {}} onApprove={() => handleActionApprove(msg.id)} onReject={() => handleActionReject(msg.id)} status={msg.status} />
                          ) : msg.action.title === 'CREATE SOCIAL POST' ? (
                            <SocialPostCard data={msg.action.postData || {}} onApprove={() => handleActionApprove(msg.id)} onReject={() => handleActionReject(msg.id)} status={msg.status} />
                          ) : (
                          <div className="bg-sidebar border border-stroke rounded-2xl overflow-hidden w-full">
                             <div className="bg-sidebar border-b border-stroke px-5 py-3 flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                  <div className="bg-background p-1.5 rounded-lg border border-stroke">{msg.action.icon}</div>
                                  <span className="text-sm font-bold text-title">{msg.action.title}</span>
                               </div>
                               {msg.status !== 'success' && <span className="bg-yellow-500/10 text-yellow-500 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full border border-yellow-500/20">Pending</span>}
                             </div>
                             <div className="p-5">
                               <div className="flex flex-col gap-4">
                                 {msg.action.details.map((detail, idx) => (
                                   <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 border-b border-stroke pb-2 last:border-0 last:pb-0">
                                     <span className="text-xs font-bold text-subtitle uppercase tracking-wider w-40 shrink-0 pt-0.5">{detail.label}</span>
                                     <span className="text-sm text-gray-200 font-medium flex-1">{detail.value}</span>
                                   </div>
                                 ))}
                               </div>
                             </div>
                             {msg.status !== 'success' && (
                               <div className="bg-background border-t border-stroke p-3 flex justify-end gap-3 items-center">
                                  <button onClick={() => handleActionReject(msg.id)} disabled={msg.status === 'loading'} className="px-3 py-1.5 rounded-lg text-xs font-bold text-subtitle hover:text-red-500 transition-colors uppercase tracking-wider">Reject</button>
                                  <button disabled={msg.status === 'loading'} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-600 text-title hover:text-title hover:border-gray-400 transition-colors uppercase tracking-wider">Save</button>
                                  <button onClick={() => startEditing(msg)} disabled={msg.status === 'loading'} className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 flex items-center gap-1.5 transition-colors uppercase tracking-wider"><Edit3 size={14} /> Edit</button>
                                  <button onClick={() => handleActionApprove(msg.id)} disabled={msg.status === 'loading'} className="px-4 py-1.5 rounded-lg text-xs font-black bg-primary text-black hover:bg-[#3b82f6] transition-all flex justify-center items-center min-w-[100px] uppercase tracking-wider">
                                    {msg.status === 'loading' ? <span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> ...</span> : "Approve"}
                                  </button>
                               </div>
                             )}
                          </div>
                          )}
                       </div>
                    </div>
                  );
                  if (msg.type === 'ai_action_result') return (
                    <div key={msg.id} className="self-center max-w-[80%] flex items-start gap-4 my-2 w-full">
                       <div className={`w-full border rounded-2xl p-4 flex items-center justify-center gap-3 ${msg.status === 'success' ? 'bg-primary/10 border-[#4ade80]/30 text-primary' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}>
                         {msg.status === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                         <span className="text-sm font-bold">{msg.resultMsg}</span>
                       </div>
                    </div>
                  );
                  return null;
                })}
                <div ref={chatEndRef} />
             </div>

             {/* Active Chat Input */}
             <div className="pt-6 flex justify-center shrink-0">
                <div className="w-full max-w-3xl relative bg-sidebar border border-stroke rounded-full pl-6 pr-2 py-2 flex items-center gap-4 shadow-xl transition-all">
                  <MentionDropdown mentionState={mentionState} items={mentionState.items} selectedIndex={mentionState.selectedIndex} onSelect={handleMentionSelect} />
                  <button onClick={() => setIsTemplatesModalOpen(true)} className="text-subtitle hover:text-title transition-colors"><Grid size={20}/></button>
                  <div className="relative flex-1 min-h-[24px] overflow-hidden">
                    <div ref={overlayRef} className="absolute inset-0 text-[15px] font-medium pointer-events-none whitespace-pre overflow-hidden leading-[24px]" aria-hidden="true">
                      {renderInputOverlay(inputText)}
                    </div>
                      <textarea 
                        rows={1}
                        ref={inputRef}
                        value={inputText} 
                        onChange={handleInputChange} 
                        onKeyDown={handleKeyDown}
                        onScroll={handleScrollSync}
                        className="w-full h-full bg-transparent border-none text-[15px] leading-[24px] focus:outline-none z-10 resize-none"
                        style={{ color: 'transparent', caretColor: 'var(--title)', scrollbarWidth: 'none' }}
                      />
                  </div>
                  <button 
                    onClick={() => handleSend()}
                    disabled={!inputText.trim()}
                    className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center transition-all ${inputText.trim() ? 'bg-primary text-black shadow-[0_0_15px_rgba(74,222,128,0.3)]' : 'bg-primary text-black'}`}
                  >
                    <Send size={16} strokeWidth={2.5} className="ml-0.5"/>
                  </button>
                </div>
             </div>
          </div>
        )}
      </div>

      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} sessions={sessions} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
      <TemplatesModal isOpen={isTemplatesModalOpen} onClose={() => setIsTemplatesModalOpen(false)} sessions={sessions} />
      <FeaturePreviewModal isOpen={!!selectedFeature} onClose={() => setSelectedFeature(null)} feature={selectedFeature} onUseFeature={handleSend} />
    </div>
  );
}
