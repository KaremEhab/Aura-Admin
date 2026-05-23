import React, { useState } from 'react';
import { 
  Search, Filter, Plus, ArrowLeft, MoreVertical, 
  MapPin, Star, Users, Calendar, Award, DollarSign,
  Globe, Edit2, Trash2, Mail, Phone,
  Clock, CheckCircle2, FileText, Fingerprint, Dumbbell, Apple, ClipboardList, Flame,
  Flag, Ban, CheckSquare, Key
} from 'lucide-react';
import { UserCard } from '../../components/ui/UserCard';
import './PersonalTrainers.css';

// --- MOCK DATA ---
const mockTrainers = [
  {
    id: 1,
    name: 'Marcus Johnson',
    role: 'Elite Head Coach',
    branch: 'Smouha Branch',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&auto=format&fit=crop',
    activeTrainees: 24,
    rating: 4.9,
    bio: 'Former Olympic weightlifter with 10+ years of experience in high-performance coaching and injury rehabilitation.',
    contact: { phone: '+20 123 456 7890', email: 'marcus.j@aurafit.com' },
    social: { instagram: '@marcuslifts', linkedin: 'marcusjohnson' },
    financials: {
      rate: '$30 / session',
      sessionsThisMonth: 45,
      projectedIncome: '$1,350',
    },
    billingHistory: [
      { id: 'PAY-2026-04', date: '01 May 2026', amount: '$1,200', type: 'Session Payouts', status: 'Paid', method: 'Direct Deposit' },
      { id: 'PAY-2026-03', date: '01 Apr 2026', amount: '$1,350', type: 'Session Payouts', status: 'Paid', method: 'Direct Deposit' }
    ],
    certificates: ['NASM Certified', 'CrossFit Level 2', 'Precision Nutrition L1'],
    awards: ['Coach of the Year 2024', 'Regional Weightlifting Champion'],
    schedule: [
      { day: 'Monday', time: '06:00 AM - 02:00 PM', type: 'Shift' },
      { day: 'Wednesday', time: '05:00 PM - 06:00 PM', type: 'HIIT Class' },
      { day: 'Friday', time: '08:00 AM - 04:00 PM', type: 'Shift' }
    ],
    trainees: [
      { id: 101, name: 'Alex Mercer', plan: 'VIP Elite', status: 'Active' },
      { id: 102, name: 'Sarah Connor', plan: 'Premium', status: 'Active' }
    ],
    workoutPlans: [
      {
        id: 'wp1',
        name: 'Advanced Hypertrophy Matrix',
        duration: '12 Weeks',
        level: 'Advanced',
        assignedTrainees: ['Alex Mercer', 'Chris Evans']
      },
      {
        id: 'wp2',
        name: 'Strength Foundation',
        duration: '8 Weeks',
        level: 'Beginner',
        assignedTrainees: ['Sarah Connor', 'John Doe']
      }
    ],
    nutritionPlans: [
      {
        id: 'np1',
        name: 'Aggressive Cut / High Protein',
        target: '2,200 kcal',
        type: 'Deficit',
        assignedTrainees: ['Sarah Connor']
      },
      {
        id: 'np2',
        name: 'Clean Lean Bulk',
        target: '3,400 kcal',
        type: 'Surplus',
        assignedTrainees: ['Alex Mercer', 'Chris Evans']
      }
    ],
    reviews: [
      { id: 1, author: 'Alex Mercer', rating: 5, date: '2 days ago', text: 'Marcus completely transformed my approach to lifting. Incredible attention to detail!' },
      { id: 2, author: 'Sarah Connor', rating: 5, date: '1 week ago', text: 'Best coach I\'ve ever had. Very professional and supportive.' }
    ],
    timeLogs: [
      { id: 301, date: '16 May 2026', clockIn: '05:55 AM', clockOut: '02:05 PM', duration: '8h 10m', status: 'On Time' },
      { id: 302, date: '15 May 2026', clockIn: '08:15 AM', clockOut: '04:00 PM', duration: '7h 45m', status: 'Late' }
    ],
    tasks: [
      { id: 1, title: 'Client Follow-up', desc: 'Call Alex Mercer to discuss new workout plan.', status: 'Pending', dueDate: '21 May 2026' }
    ],
    permissions: [
      { module: 'Workout Plans', canRead: true, canWrite: true, canDelete: true },
      { module: 'Diet Plans', canRead: true, canWrite: true, canDelete: false },
      { module: 'Member Profiles', canRead: true, canWrite: false, canDelete: false }
    ],
    specializations: ['Hypertrophy', 'Rehabilitation'],
    nextAvailableSlot: 'Tomorrow, 10:00 AM'
  },
  {
    id: 2,
    name: 'Elena Rodriguez',
    role: 'Senior Yoga Instructor',
    branch: 'Sporting Branch',
    status: 'On Leave',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop',
    activeTrainees: 45,
    rating: 4.8,
    bio: 'Specializing in Ashtanga Vinyasa and mindfulness practices. Helping members achieve holistic wellness.',
    contact: { phone: '+20 198 765 4321', email: 'elena.r@aurafit.com' },
    social: { instagram: '@elenayoga' },
    financials: { salary: '$2,800', commission: '10%', lastPayout: '$3,100' },
    certificates: ['500-RYT Yoga Alliance', 'Mindfulness Coach Certification'],
    awards: ['Best Class Attendance 2025'],
    schedule: [
      { day: 'Tuesday', time: '07:00 AM - 08:30 AM', type: 'Vinyasa Flow' },
      { day: 'Thursday', time: '06:00 PM - 07:30 PM', type: 'Power Yoga' }
    ],
    trainees: [
      { id: 103, name: 'John Doe', plan: 'Regular', status: 'Inactive' }
    ],
    workoutPlans: [
      {
        id: 'wp3',
        name: 'Vinyasa Flow Fundamentals',
        duration: 'Ongoing',
        level: 'All Levels',
        assignedTrainees: ['John Doe', 'Emma Stone']
      }
    ],
    nutritionPlans: [],
    reviews: [
      { id: 3, author: 'John Doe', rating: 4, date: '1 month ago', text: 'Great yoga classes, very relaxing environment.' }
    ],
    timeLogs: [
      { id: 303, date: '14 May 2026', clockIn: '06:50 AM', clockOut: '08:35 AM', duration: '1h 45m', status: 'On Time' }
    ],
    tasks: [
      { id: 2, title: 'Studio Setup', desc: 'Prepare yoga mats and ambient lighting for Vinyasa class.', status: 'Completed', dueDate: '20 May 2026' }
    ],
    permissions: [
      { module: 'Workout Plans', canRead: true, canWrite: true, canDelete: true },
      { module: 'Diet Plans', canRead: false, canWrite: false, canDelete: false }
    ],
    specializations: ['Ashtanga', 'Mindfulness'],
    nextAvailableSlot: 'Thursday, 06:00 PM'
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'Strength & Conditioning',
    branch: 'Smouha Branch',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop',
    activeTrainees: 18,
    rating: 4.7,
    bio: 'Dedicated to helping athletes break their plateaus and build functional, lasting strength.',
    contact: { phone: '+20 112 233 4455', email: 'david.c@aurafit.com' },
    social: { linkedin: 'davidchenstrength' },
    financials: { salary: '$2,500', commission: '12%', lastPayout: '$2,800' },
    certificates: ['CSCS', 'First Aid / CPR'],
    awards: [],
    schedule: [
      { day: 'Monday', time: '02:00 PM - 10:00 PM', type: 'Shift' },
      { day: 'Thursday', time: '02:00 PM - 10:00 PM', type: 'Shift' }
    ],
    trainees: [
      { id: 104, name: 'Chris Evans', plan: 'Premium', status: 'Active' },
      { id: 105, name: 'Emma Watson', plan: 'VIP Elite', status: 'Active' },
      { id: 106, name: 'Mark Ruffalo', plan: 'Regular', status: 'Active' }
    ],
    workoutPlans: [
      {
        id: 'wp4',
        name: '5x5 Powerlifting Peak',
        duration: '10 Weeks',
        level: 'Advanced',
        assignedTrainees: ['Mark Ruffalo', 'Emma Watson']
      }
    ],
    nutritionPlans: [
      {
        id: 'np3',
        name: 'Maintenance / Functional',
        target: '2,600 kcal',
        type: 'Maintenance',
        assignedTrainees: ['Emma Watson']
      }
    ],
    reviews: [
      { id: 4, author: 'Chris Evans', rating: 5, date: '3 days ago', text: 'David pushes you exactly as hard as you need to be pushed. Seeing great results.' },
      { id: 5, author: 'Mark Ruffalo', rating: 4, date: '2 weeks ago', text: 'Solid strength programming.' }
    ],
    timeLogs: [
      { id: 304, date: '14 May 2026', clockIn: '02:00 PM', clockOut: '09:30 PM', duration: '7h 30m', status: 'Early Leave' }
    ],
    tasks: [],
    permissions: [
      { module: 'Workout Plans', canRead: true, canWrite: true, canDelete: true },
      { module: 'Diet Plans', canRead: true, canWrite: true, canDelete: true }
    ],
    specializations: ['Powerlifting', 'Conditioning'],
    nextAvailableSlot: 'Today, 04:00 PM'
  }
];

export function PersonalTrainers({ searchQuery }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'detail'
  const [selectedPT, setSelectedPT] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const filteredTrainers = mockTrainers.filter(pt => 
    pt.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    pt.branch.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  const handleSelectPT = (pt) => {
    setSelectedPT(pt);
    setViewMode('detail');
    setActiveTab('overview');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedPT(null);
  };

  // --- RENDER MASTER VIEW (LIST) ---
  if (viewMode === 'list') {
    return (
      <div className="pt-container">
        <div className="pt-header">
          <h1>Personal Trainers</h1>
          <p>Manage your coaching staff, schedules, and trainee assignments.</p>
        </div>

        <div className="pt-actions">
          <div className="pt-search">
            <Search size={18} className="text-text" />
            <input type="text" placeholder="Search trainers by name or branch..." />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-primary border border-primary-border px-4 py-2 rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-colors">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#1ea34d] transition-colors">
              <Plus size={16} /> Add New PT
            </button>
          </div>
        </div>

        <div className="pt-grid">
          {filteredTrainers.map(pt => (
            <UserCard 
              key={pt.id} 
              user={{
                ...pt,
                customStats: [
                  { value: pt.activeTrainees, label: 'Trainees' },
                  { value: pt.rating, label: 'Rating', isRating: true, alignRight: true }
                ]
              }} 
              onClick={handleSelectPT} 
              onQuickAction={(user, action) => console.log(`Action ${action} triggered for ${user.name}`)}
            />
          ))}
        </div>
      </div>
    );
  }

  // --- RENDER DETAIL VIEW (PROFILE) ---
  if (!selectedPT) return null;
  const pt = selectedPT;

  return (
    <div className="pt-container">
      <button onClick={handleBackToList} className="flex items-center gap-2 text-primary hover:text-primary-lite font-bold text-sm mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Trainers
      </button>

      {/* Profile Header */}
      <div className="pt-profile-header">
        <div className="profile-main-info">
          <img src={pt.avatar} alt={pt.name} className="profile-avatar" />
          <div className="profile-name">
            <h2>{pt.name}</h2>
            <div className="profile-badges">
              <span className="badge primary"><Star size={12} className="fill-current" /> {pt.role}</span>
              <span className="badge"><MapPin size={12} /> {pt.branch}</span>
              <span className="badge"><CheckCircle2 size={12} className={pt.status === 'Active' ? 'text-green-500' : 'text-yellow-500'} /> {pt.status}</span>
            </div>
          </div>
        </div>
        <div className="profile-actions flex flex-col items-end gap-3">
          <div className="flex gap-2">
            <button className="bg-primary-lite border border-primary-border p-2 rounded-lg text-primary hover:text-primary transition-colors" title="Edit Profile">
              <Edit2 size={16} />
            </button>
            <button className="bg-yellow-500/10 border border-yellow-500/20 p-2 rounded-lg text-yellow-500 hover:text-yellow-600 transition-colors" title="Report">
              <Flag size={16} />
            </button>
            <button className="bg-alert-lite border border-alert-border p-2 rounded-lg text-alert hover:text-alert transition-colors" title="Block User">
              <Ban size={16} />
            </button>
            <button className="bg-alert-lite border border-alert-border p-2 rounded-lg text-alert hover:text-alert transition-colors" title="Delete User">
              <Trash2 size={16} />
            </button>
          </div>
          <div className="social-links">
            {pt.social.instagram && <a href="#" className="social-btn"><Globe size={16} /></a>}
            {pt.social.linkedin && <a href="#" className="social-btn"><Globe size={16} /></a>}
            <a href={`mailto:${pt.contact.email}`} className="social-btn"><Mail size={16} /></a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="pt-tabs">
        {[
          { id: 'overview', label: 'Overview', icon: FileText },
          { id: 'tasks', label: 'Duties & Tasks', icon: CheckSquare },
          { id: 'trainees', label: 'Trainees', icon: Users },
          { id: 'workout-plans', label: 'Workout Plans', icon: Dumbbell },
          { id: 'nutrition-plans', label: 'Diet Plans', icon: Apple },
          { id: 'schedule', label: 'Schedule & Classes', icon: Calendar },
          { id: 'attendance', label: 'Attendance', icon: Fingerprint },
          { id: 'permissions', label: 'Permissions', icon: Key },
          { id: 'awards', label: 'Awards', icon: Award },
          { id: 'financials', label: 'Financials', icon: DollarSign },
        ].map(tab => (
          <button 
            key={tab.id}
            className={`pt-tab-btn flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="info-card lg:col-span-2">
              <h3><FileText size={18} className="text-primary" /> Biography</h3>
              <p className="text-text leading-relaxed">{pt.bio}</p>
              
              <h3 className="mt-8 mb-4"><Phone size={18} className="text-primary" /> Contact Information</h3>
              <div className="flex flex-col gap-3 text-text">
                <div className="flex items-center gap-3"><Phone size={16} className="text-text" /> {pt.contact.phone}</div>
                <div className="flex items-center gap-3"><Mail size={16} className="text-text" /> {pt.contact.email}</div>
              </div>
            </div>
            <div className="info-card">
              <h3><Users size={18} className="text-primary" /> Quick Stats</h3>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <span className="text-text font-bold text-xs uppercase">Active Trainees</span>
                  <span className="text-xl font-black text-title">{pt.activeTrainees}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <span className="text-text font-bold text-xs uppercase">Next Available Slot</span>
                  <span className="text-sm font-black text-primary">{pt.nextAvailableSlot || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <span className="text-text font-bold text-xs uppercase">Avg Rating</span>
                  <span className="text-xl font-black text-title flex items-center gap-2"><Star size={18} className="text-yellow-400 fill-yellow-400"/> {pt.rating}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="info-card">
            <div className="flex justify-between items-center mb-6">
              <h3><CheckSquare size={18} className="text-primary" /> Assigned Duties & Tasks</h3>
              <button className="flex items-center gap-2 bg-primary text-black px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#1ea34d] transition-colors">
                <Plus size={14} /> Assign New Task
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {pt.tasks && pt.tasks.map(task => (
                <div key={task.id} className="bg-background border border-stroke p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-title">{task.title}</h4>
                    <p className="text-sm text-text mt-1">{task.desc}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs font-bold flex items-center gap-1 text-subtitle">
                        <Calendar size={12} /> Due: {task.dueDate}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        task.status === 'Completed' ? 'bg-green-500/20 text-green-500' :
                        task.status === 'In Progress' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-sidebar border border-stroke rounded-lg hover:text-primary transition-colors"><Edit2 size={14} /></button>
                    <button className="p-2 bg-sidebar border border-stroke rounded-lg hover:text-alert transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
              {(!pt.tasks || pt.tasks.length === 0) && <p className="text-text text-sm">No tasks assigned.</p>}
            </div>
          </div>
        )}

        {activeTab === 'trainees' && (
          <div className="info-card">
            <div className="flex justify-between items-center mb-6">
              <h3><Users size={18} className="text-primary" /> Assigned Trainees</h3>
              <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                <Plus size={14} /> Assign Trainee
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stroke text-xs text-text uppercase tracking-wider">
                    <th className="pb-3 font-bold text-title">Trainee Name</th>
                    <th className="pb-3 font-bold text-title">Plan Tier</th>
                    <th className="pb-3 font-bold text-title">Status</th>
                    <th className="pb-3 font-bold text-title text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pt.trainees.map(t => (
                    <tr key={t.id} className="border-b border-stroke hover:bg-background transition-colors">
                      <td className="py-4 font-bold text-title">{t.name}</td>
                      <td className="py-4">
                        <span className="bg-stroke px-2 py-1 rounded text-xs font-bold text-text">{t.plan}</span>
                      </td>
                      <td className="py-4">
                        <span className={`flex items-center gap-2 text-xs font-bold ${t.status === 'Active' ? 'text-primary' : 'text-text'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${t.status === 'Active' ? 'bg-primary' : 'bg-text'}`}></span> {t.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-xs text-alert font-bold hover:text-red-300 px-2 py-1 bg-alert-lite rounded">Unassign</button>
                      </td>
                    </tr>
                  ))}
                  {pt.trainees.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-text">No trainees currently assigned.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'workout-plans' && (
          <div className="info-card">
            <div className="flex justify-between items-center mb-6">
              <h3><Dumbbell size={18} className="text-primary" /> Authored Workout Plans</h3>
              <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                <Plus size={14} /> Create Plan
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pt.workoutPlans.map(plan => (
                <div key={plan.id} className="bg-background border border-stroke p-5 rounded-xl flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-title text-lg">{plan.name}</h4>
                      <p className="text-xs text-text mt-1">Duration: <span className="font-bold text-primary">{plan.duration}</span> • Level: <span className="font-bold text-primary">{plan.level}</span></p>
                    </div>
                    <button className="text-text hover:text-primary transition-colors"><Edit2 size={16} /></button>
                  </div>
                  <div className="mt-auto border-t border-stroke pt-4">
                    <span className="text-xs font-bold text-text uppercase block mb-2">Assigned Trainees ({plan.assignedTrainees.length})</span>
                    <div className="flex flex-wrap gap-2">
                      {plan.assignedTrainees.map((tName, i) => (
                        <span key={i} className="bg-stroke text-title text-xs px-2 py-1 rounded font-medium">{tName}</span>
                      ))}
                      {plan.assignedTrainees.length === 0 && <span className="text-xs text-text italic">No trainees assigned</span>}
                    </div>
                  </div>
                </div>
              ))}
              {pt.workoutPlans.length === 0 && (
                <div className="lg:col-span-2 py-8 text-center text-text">No workout plans created yet.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'nutrition-plans' && (
          <div className="info-card">
            <div className="flex justify-between items-center mb-6">
              <h3><Apple size={18} className="text-primary" /> Authored Diet Plans</h3>
              <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                <Plus size={14} /> Create Plan
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pt.nutritionPlans.map(plan => (
                <div key={plan.id} className="bg-background border border-stroke p-5 rounded-xl flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-title text-lg">{plan.name}</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs font-bold bg-primary-lite text-primary px-2 py-1 rounded"><Flame size={12}/> {plan.target}</span>
                        <span className="text-xs font-bold text-text uppercase">{plan.type}</span>
                      </div>
                    </div>
                    <button className="text-text hover:text-primary transition-colors"><Edit2 size={16} /></button>
                  </div>
                  <div className="mt-auto border-t border-stroke pt-4">
                    <span className="text-xs font-bold text-text uppercase block mb-2">Assigned Trainees ({plan.assignedTrainees.length})</span>
                    <div className="flex flex-wrap gap-2">
                      {plan.assignedTrainees.map((tName, i) => (
                        <span key={i} className="bg-stroke text-title text-xs px-2 py-1 rounded font-medium">{tName}</span>
                      ))}
                      {plan.assignedTrainees.length === 0 && <span className="text-xs text-text italic">No trainees assigned</span>}
                    </div>
                  </div>
                </div>
              ))}
              {pt.nutritionPlans.length === 0 && (
                <div className="lg:col-span-2 py-8 text-center text-text">No nutrition plans created yet.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="info-card">
            <div className="flex justify-between items-center mb-6">
              <h3><Calendar size={18} className="text-primary" /> Weekly Schedule</h3>
              <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                <Plus size={14} /> Add Shift/Class
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {pt.schedule.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center bg-background border border-stroke p-4 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-lite text-primary flex flex-col items-center justify-center font-black uppercase text-xs">
                      {s.day.substring(0,3)}
                    </div>
                    <div>
                      <h4 className="font-bold text-title text-sm">{s.type}</h4>
                      <p className="text-xs text-text mt-1 flex items-center gap-1"><Clock size={12}/> {s.time}</p>
                    </div>
                  </div>
                  <button className="text-text hover:text-title"><MoreVertical size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="info-card">
            <div className="flex justify-between items-center mb-6">
              <h3><Fingerprint size={18} className="text-primary" /> Shift Attendance Logs</h3>
              <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                <Filter size={14} /> Filter Logs
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stroke text-xs text-text uppercase tracking-wider">
                    <th className="pb-3 font-bold text-title">Date</th>
                    <th className="pb-3 font-bold text-title">Clock In</th>
                    <th className="pb-3 font-bold text-title">Clock Out</th>
                    <th className="pb-3 font-bold text-title">Duration</th>
                    <th className="pb-3 font-bold text-title">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pt.timeLogs.map(log => (
                    <tr key={log.id} className="border-b border-stroke hover:bg-background transition-colors">
                      <td className="py-4 font-bold text-title">{log.date}</td>
                      <td className="py-4 text-text">{log.clockIn}</td>
                      <td className="py-4 text-text">{log.clockOut}</td>
                      <td className="py-4 text-text">{log.duration}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          log.status === 'On Time' ? 'bg-primary-lite text-primary border border-primary-border' :
                          log.status === 'Late' ? 'bg-alert-lite text-alert border border-alert-border' :
                          'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {pt.timeLogs.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-text">No attendance logs available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="info-card">
            <div className="flex justify-between items-center mb-6">
              <h3><Key size={18} className="text-primary" /> System Access & Permissions</h3>
              <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                <Plus size={14} /> Add Permission
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stroke text-xs text-text uppercase tracking-wider">
                    <th className="pb-3 font-bold text-title">Module</th>
                    <th className="pb-3 font-bold text-title text-center">Read</th>
                    <th className="pb-3 font-bold text-title text-center">Write</th>
                    <th className="pb-3 font-bold text-title text-center">Delete</th>
                    <th className="pb-3 font-bold text-title text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pt.permissions && pt.permissions.map((perm, idx) => (
                    <tr key={idx} className="border-b border-stroke hover:bg-background transition-colors">
                      <td className="py-4 font-bold text-title">{perm.module}</td>
                      <td className="py-4 text-center">
                        <CheckCircle2 size={16} className={`inline ${perm.canRead ? 'text-primary' : 'text-stroke'}`} />
                      </td>
                      <td className="py-4 text-center">
                        <CheckCircle2 size={16} className={`inline ${perm.canWrite ? 'text-primary' : 'text-stroke'}`} />
                      </td>
                      <td className="py-4 text-center">
                        <CheckCircle2 size={16} className={`inline ${perm.canDelete ? 'text-primary' : 'text-stroke'}`} />
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-xs text-primary font-bold hover:underline">Modify</button>
                      </td>
                    </tr>
                  ))}
                  {(!pt.permissions || pt.permissions.length === 0) && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-text">No custom permissions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'awards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="info-card">
              <h3><Award size={18} className="text-primary" /> Certificates</h3>
              <ul className="flex flex-col gap-3 mt-4">
                {pt.certificates.map((cert, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-text bg-background p-3 rounded-lg border border-stroke">
                    <CheckCircle2 size={16} className="text-primary" /> {cert}
                  </li>
                ))}
              </ul>
            </div>
            <div className="info-card">
              <h3><Star size={18} className="text-primary" /> Awards & Recognitions</h3>
              <ul className="flex flex-col gap-3 mt-4">
                {pt.awards.map((award, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-text bg-background p-3 rounded-lg border border-stroke">
                    <Award size={16} className="text-yellow-500" /> {award}
                  </li>
                ))}
                {pt.awards.length === 0 && <p className="text-text text-sm">No awards recorded yet.</p>}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="info-card">
            <h3><DollarSign size={18} className="text-primary" /> Compensation & Financials</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-background border border-stroke p-5 rounded-xl">
                <span className="text-xs font-bold text-text uppercase tracking-wider block mb-2">Base Salary</span>
                <span className="text-2xl font-black text-title">{pt.financials.salary} <span className="text-sm font-normal text-text">/mo</span></span>
              </div>
              <div className="bg-background border border-stroke p-5 rounded-xl">
                <span className="text-xs font-bold text-text uppercase tracking-wider block mb-2">Commission Rate</span>
                <span className="text-2xl font-black text-title">{pt.financials.commission}</span>
              </div>
              <div className="bg-primary-lite border border-primary-border p-5 rounded-xl">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">Projected Income</span>
                <span className="text-2xl font-black text-title">{pt.financials.projectedIncome}</span>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="flex items-center gap-2"><DollarSign size={18} className="text-primary" /> Payroll History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stroke text-xs text-text uppercase tracking-wider">
                      <th className="pb-3 font-bold text-title">Transaction ID</th>
                      <th className="pb-3 font-bold text-title">Date</th>
                      <th className="pb-3 font-bold text-title">Type</th>
                      <th className="pb-3 font-bold text-title">Method</th>
                      <th className="pb-3 font-bold text-title">Amount</th>
                      <th className="pb-3 font-bold text-title">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pt.billingHistory && pt.billingHistory.map((bill, idx) => (
                      <tr key={idx} className="border-b border-stroke hover:bg-background transition-colors">
                        <td className="py-4 font-bold text-title">{bill.id}</td>
                        <td className="py-4 text-text">{bill.date}</td>
                        <td className="py-4 text-title">{bill.type}</td>
                        <td className="py-4 text-text">{bill.method}</td>
                        <td className="py-4 font-black text-title">{bill.amount}</td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            bill.status === 'Paid' ? 'bg-green-500/20 text-green-500' :
                            'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {bill.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {(!pt.billingHistory || pt.billingHistory.length === 0) && (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-text">No payroll records found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
