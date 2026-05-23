import React, { useState } from 'react';
import { 
  Search, Filter, Plus, ArrowLeft, MoreVertical, 
  MapPin, Star, User, Activity, CreditCard, Dumbbell,
  Globe, Edit2, Trash2, Mail, Phone, Clock, FileText, Fingerprint, Calendar, CheckCircle2,
  HeartPulse, Camera, Apple, Flame, Stethoscope, AlertTriangle, Image as ImageIcon,
  ClipboardList, Flag, Ban, Key
} from 'lucide-react';
import { UserCard } from '../../components/ui/UserCard';
import './Trainees.css';

// --- MOCK DATA ---
const mockTrainees = [
  {
    id: 1,
    name: 'Alex Mercer',
    plan: 'Pro Plan',
    branch: 'Smouha Branch',
    status: 'Active',
    joinDate: '12 Jan 2025',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop',
    contact: { phone: '+20 122 333 4444', email: 'alex.mercer@example.com' },
    physical: { weight: '82 kg', height: '180 cm', bodyFat: '15%', goal: 'Muscle Gain' },
    medical: { 
      bloodType: 'O+', 
      allergies: 'None', 
      conditions: 'Mild asthma, managed with inhaler.',
      emergencyContact: 'Sarah Mercer (+20 111 222 3333)'
    },
    progress: {
      measurements: [
        { date: '01 May 2026', chest: '102 cm', waist: '82 cm', arms: '36 cm' },
        { date: '01 Apr 2026', chest: '100 cm', waist: '83 cm', arms: '35 cm' }
      ],
      images: [
        { type: 'Before (Jan 2025)', url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop' },
        { type: 'Current (May 2026)', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop' }
      ],
      medicalHistory: [
        { date: '12 Jan 2026', type: 'Injury', desc: 'Mild left knee strain. Cleared for light exercise.' }
      ]
    },
    permissions: [
      { module: 'App Access', canRead: true, canWrite: false, canDelete: false },
      { module: 'Class Booking', canRead: true, canWrite: true, canDelete: false }
    ],
    membershipTierDetails: 'Premium Access (All branches, 2 PT sessions/mo)',
    visitFrequency: '4 times / week',
    pastInjuries: ['Left knee strain (Jan 2026)'],
    membership: { nextBilling: '12 Jan 2027', paymentMethod: 'Visa ending in 4242', totalSpent: '$1,200' },
    billingHistory: [
      { id: 'INV-1029', date: '12 Jan 2026', amount: '$1,200', description: 'Annual Premium Plan', method: 'Visa **4242', status: 'Paid' },
      { id: 'INV-0912', date: '05 Dec 2025', amount: '$150', description: 'PT Package (5 Sessions)', method: 'Cash', status: 'Paid' }
    ],
    training: {
      assignedPT: 'Marcus Johnson',
      planName: 'Hypertrophy Phase 2',
      routine: [
        { day: 'Monday (Push)', workout: 'Bench Press 4x8, OHP 3x10, Incline DB Press 3x10, Tricep Extensions 3x15' },
        { day: 'Wednesday (Pull)', workout: 'Deadlifts 4x5, Pull-ups 3x8, Barbell Rows 3x10, Bicep Curls 3x12' },
        { day: 'Friday (Legs)', workout: 'Squats 4x8, Leg Press 3x10, Romanian Deadlifts 3x10, Calf Raises 4x15' }
      ],
      upcomingClasses: [
        { name: 'HIIT Core', date: 'Tomorrow', time: '06:00 PM' }
      ]
    },
    nutrition: {
      planName: 'Lean Bulking',
      calories: '3,200 kcal',
      macros: { protein: '180g', carbs: '400g', fats: '85g' },
      meals: [
        { time: '08:00 AM', name: 'Breakfast', items: '4 Eggs, 100g Oats, 1 Banana, Protein Shake' },
        { time: '01:00 PM', name: 'Lunch', items: '200g Chicken Breast, 250g Rice, Broccoli' },
        { time: '07:00 PM', name: 'Dinner', items: '250g Salmon, 200g Sweet Potato, Asparagus' }
      ]
    },
    checkIns: [
      { id: 101, date: '15 May 2026', checkIn: '06:00 PM', checkOut: '07:30 PM', duration: '1h 30m' },
      { id: 102, date: '13 May 2026', checkIn: '05:45 PM', checkOut: '07:15 PM', duration: '1h 30m' },
      { id: 103, date: '10 May 2026', checkIn: '06:10 PM', checkOut: '07:20 PM', duration: '1h 10m' }
    ]
  },
  {
    id: 2,
    name: 'Sophia Reynolds',
    plan: 'Basic Plan',
    branch: 'Sporting Branch',
    status: 'Inactive',
    joinDate: '20 Mar 2026',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop',
    contact: { phone: '+20 100 555 6666', email: 'sophia.r@example.com' },
    physical: { weight: '65 kg', height: '165 cm', bodyFat: '22%', goal: 'Weight Loss' },
    medical: { 
      bloodType: 'A-', 
      allergies: 'Peanuts', 
      conditions: 'None',
      emergencyContact: 'John Reynolds (+20 111 444 5555)'
    },
    progress: {
      measurements: [
        { date: '01 Mar 2026', chest: '90 cm', waist: '75 cm', arms: '28 cm' }
      ],
      images: [],
      medicalHistory: []
    },
    permissions: [],
    membershipTierDetails: 'Basic Access (Single branch only)',
    visitFrequency: '2 times / week',
    pastInjuries: ['None reported'],
    membership: { nextBilling: 'OVERDUE (01 May 2026)', paymentMethod: 'Cash', totalSpent: '$150' },
    billingHistory: [
      { id: 'INV-1150', date: '01 May 2026', amount: '$50', description: 'Monthly Basic Plan', method: 'Cash', status: 'Overdue' },
      { id: 'INV-1088', date: '01 Apr 2026', amount: '$50', description: 'Monthly Basic Plan', method: 'Cash', status: 'Paid' },
      { id: 'INV-1020', date: '01 Mar 2026', amount: '$50', description: 'Monthly Basic Plan', method: 'Cash', status: 'Paid' }
    ],
    training: {
      assignedPT: 'Elena Rodriguez',
      planName: 'Starter Weight Loss',
      routine: [
        { day: 'Tuesday (Full Body)', workout: 'Goblet Squats 3x12, DB Rows 3x12, Push-ups 3x10, Planks 3x30s' },
        { day: 'Thursday (Cardio & Core)', workout: '30 min Treadmill, Crunches 3x20, Russian Twists 3x20' }
      ],
      upcomingClasses: []
    },
    nutrition: {
      planName: 'Caloric Deficit (-500)',
      calories: '1,600 kcal',
      macros: { protein: '120g', carbs: '150g', fats: '55g' },
      meals: [
        { time: '09:00 AM', name: 'Breakfast', items: 'Greek Yogurt, Mixed Berries, Almonds' },
        { time: '02:00 PM', name: 'Lunch', items: 'Grilled Chicken Salad, Vinaigrette' },
        { time: '08:00 PM', name: 'Dinner', items: 'White Fish, Quinoa, Roasted Veggies' }
      ]
    },
    checkIns: [
      { id: 104, date: '28 Apr 2026', checkIn: '07:00 PM', checkOut: '08:00 PM', duration: '1h 00m' }
    ]
  }
];

export function Trainees({ searchQuery }) {
  const [viewMode, setViewMode] = useState('list');
  const [selectedTr, setSelectedTr] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const filteredTr = mockTrainees.filter(tr => 
    tr.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    tr.branch.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  const handleSelectTr = (tr) => {
    setSelectedTr(tr);
    setViewMode('detail');
    setActiveTab('overview');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedTr(null);
  };

  if (viewMode === 'list') {
    return (
      <div className="tr-container">
        <div className="tr-header">
          <h1>Trainees & Members</h1>
          <p>Manage gym members, track their progress, and oversee their assigned training plans.</p>
        </div>

        <div className="tr-actions">
          <div className="tr-search">
            <Search size={18} className="text-text" />
            <input type="text" placeholder="Search trainees by name or branch..." />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-primary border border-primary-border px-4 py-2 rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-colors">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#1ea34d] transition-colors">
              <Plus size={16} /> Add New Trainee
            </button>
          </div>
        </div>

        <div className="tr-grid">
          {filteredTr.map(tr => (
            <UserCard 
              key={tr.id} 
              user={{
                ...tr,
                customStats: [
                  { value: tr.checkIns.length, label: 'Visits' },
                  { value: tr.training.assignedPT.split(' ')[0], label: 'Trainer', alignRight: true }
                ]
              }} 
              onClick={handleSelectTr} 
              onQuickAction={(user, action) => console.log(`Action ${action} triggered for ${user.name}`)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!selectedTr) return null;
  const tr = selectedTr;

  return (
    <div className="tr-container">
      <button onClick={handleBackToList} className="flex items-center gap-2 text-primary hover:text-primary-lite font-bold text-sm mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Trainees
      </button>

      <div className="tr-profile-header">
        <div className="profile-main-info">
          <img src={tr.avatar} alt={tr.name} className="profile-avatar" />
          <div className="profile-name">
            <h2>{tr.name}</h2>
            <div className="profile-badges">
              <span className="badge primary"><Star size={12} className="fill-current" /> {tr.plan}</span>
              <span className="badge"><MapPin size={12} /> {tr.branch}</span>
              <span className="badge"><CheckCircle2 size={12} className={tr.status === 'Active' ? 'text-green-500' : 'text-yellow-500'} /> {tr.status}</span>
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
            <a href={`mailto:${tr.contact.email}`} className="social-btn"><Mail size={16} /></a>
            <a href={`tel:${tr.contact.phone}`} className="social-btn"><Phone size={16} /></a>
          </div>
        </div>
      </div>

      <div className="tr-tabs">
        {[
          { id: 'overview', label: 'Overview', icon: User },
          { id: 'training', label: 'Training & Progress', icon: Activity },
          { id: 'workout-plan', label: 'Workout Plan', icon: Dumbbell },
          { id: 'nutrition', label: 'Nutrition Plan', icon: Apple },
          { id: 'attendance', label: 'Check-ins', icon: Clock },
          { id: 'medical', label: 'Medical', icon: HeartPulse },
          { id: 'permissions', label: 'Permissions', icon: Key },
          { id: 'billing', label: 'Billing', icon: CreditCard },
        ].map(tab => (
          <button 
            key={tab.id}
            className={`tr-tab-btn flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="info-card lg:col-span-2">
              <h3><Activity size={18} className="text-primary" /> Body Stats & Goals</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-background border border-stroke p-4 rounded-xl text-center">
                  <span className="text-xs font-bold text-text uppercase block mb-1">Current Goal</span>
                  <span className="text-sm font-black text-primary">{tr.physical.goal}</span>
                </div>
                <div className="bg-background border border-stroke p-4 rounded-xl text-center">
                  <span className="text-xs font-bold text-text uppercase block mb-1">Weight</span>
                  <span className="text-sm font-black text-title">{tr.physical.weight}</span>
                </div>
                <div className="bg-background border border-stroke p-4 rounded-xl text-center">
                  <span className="text-xs font-bold text-text uppercase block mb-1">Height</span>
                  <span className="text-sm font-black text-title">{tr.physical.height}</span>
                </div>
                <div className="bg-background border border-stroke p-4 rounded-xl text-center">
                  <span className="text-xs font-bold text-text uppercase block mb-1">Body Fat</span>
                  <span className="text-sm font-black text-title">{tr.physical.bodyFat}</span>
                </div>
              </div>
              
              <h3 className="mt-8 mb-4 flex items-center gap-2"><HeartPulse size={18} className="text-alert" /> Medical & Emergency</h3>
              <div className="bg-background border border-stroke p-5 rounded-xl flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-text uppercase block mb-1">Blood Type</span>
                    <span className="text-sm font-bold text-title">{tr.medical.bloodType}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-text uppercase block mb-1">Allergies</span>
                    <span className={`text-sm font-bold ${tr.medical.allergies !== 'None' ? 'text-alert bg-alert-lite px-2 py-0.5 rounded border border-alert-border' : 'text-title'}`}>
                      {tr.medical.allergies}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-xs font-bold text-text uppercase block mb-1">Chronic Conditions / Injuries</span>
                    <span className="text-sm font-medium text-title leading-relaxed flex items-start gap-2">
                      <Stethoscope size={16} className="text-primary shrink-0 mt-0.5" /> 
                      {tr.medical.conditions}
                    </span>
                  </div>
                  <div className="md:col-span-2 border-t border-stroke pt-4 mt-2">
                    <span className="text-xs font-bold text-text uppercase block mb-1 text-alert flex items-center gap-1">
                      <AlertTriangle size={14} /> Emergency Contact
                    </span>
                    <span className="text-sm font-black text-title">{tr.medical.emergencyContact}</span>
                  </div>
                </div>
              </div>

              <h3 className="mt-8 mb-4"><Phone size={18} className="text-primary" /> Contact Information</h3>
              <div className="flex flex-col gap-3 text-text">
                <div className="flex items-center gap-3"><Phone size={16} className="text-text" /> {tr.contact.phone}</div>
                <div className="flex items-center gap-3"><Mail size={16} className="text-text" /> {tr.contact.email}</div>
                <div className="flex items-center gap-3"><Clock size={16} className="text-text" /> Member since: {tr.joinDate}</div>
              </div>
            </div>
            
            <div className="info-card">
              <h3><Activity size={18} className="text-primary" /> Member Profile</h3>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <span className="text-text font-bold text-xs uppercase">Tier</span>
                  <span className="text-sm font-black text-primary">{tr.membershipTierDetails || tr.plan}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <span className="text-text font-bold text-xs uppercase">Assigned PT</span>
                  <span className="text-sm font-black text-title">{tr.training.assignedPT}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <span className="text-text font-bold text-xs uppercase">Visit Freq</span>
                  <span className="text-sm font-black text-title">{tr.visitFrequency || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="info-card">
              <div className="flex justify-between items-center mb-6">
                <h3><ImageIcon size={18} className="text-primary" /> Transformation Gallery</h3>
                <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                  <Plus size={14} /> Upload Images
                </button>
              </div>
              {tr.progress.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {tr.progress.images.map((img, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden border border-stroke aspect-[3/4]">
                      <img src={img.url} alt={img.type} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <span className="text-white font-bold text-sm">{img.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-background border border-stroke rounded-xl p-8 text-center text-text flex flex-col items-center gap-3">
                  <Camera size={32} className="opacity-50" />
                  <p>No transformation images uploaded yet.</p>
                </div>
              )}
            </div>
            
            <div className="info-card">
              <div className="flex justify-between items-center mb-6">
                <h3><FileText size={18} className="text-primary" /> Measurement History</h3>
                <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                  <Plus size={14} /> Log Entry
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {tr.progress.measurements.map((measure, idx) => (
                  <div key={idx} className="bg-background border border-stroke p-5 rounded-xl">
                    <span className="text-sm font-bold text-primary block mb-3">{measure.date}</span>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <span className="text-xs text-text uppercase block">Chest</span>
                        <span className="text-sm font-black text-title">{measure.chest}</span>
                      </div>
                      <div>
                        <span className="text-xs text-text uppercase block">Waist</span>
                        <span className="text-sm font-black text-title">{measure.waist}</span>
                      </div>
                      <div>
                        <span className="text-xs text-text uppercase block">Arms</span>
                        <span className="text-sm font-black text-title">{measure.arms}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workout-plan' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="info-card lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3><ClipboardList size={18} className="text-primary" /> Current Workout Routine</h3>
                <span className="bg-primary-lite border border-primary-border px-3 py-1 rounded text-primary text-xs font-bold">
                  {tr.training.planName}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {tr.training.routine.map((day, idx) => (
                  <div key={idx} className="bg-background border border-stroke p-5 rounded-xl">
                    <span className="text-sm font-black text-title block mb-2">{day.day}</span>
                    <p className="text-sm text-text leading-relaxed">{day.workout}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="info-card">
                <h3><User size={18} className="text-primary" /> Assigned Coach</h3>
                <div className="mt-4 bg-background border border-stroke p-4 rounded-xl flex items-center justify-between">
                  <span className="font-bold text-title">{tr.training.assignedPT}</span>
                  <button className="text-xs text-primary font-bold hover:underline">Change PT</button>
                </div>
              </div>
              
              <div className="info-card flex-grow">
                <div className="flex justify-between items-center mb-4">
                  <h3><Calendar size={18} className="text-primary" /> Booked Classes</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {tr.training.upcomingClasses.map((cls, idx) => (
                    <div key={idx} className="bg-background border border-stroke p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-title text-sm">{cls.name}</h4>
                        <p className="text-xs text-text">{cls.date} at {cls.time}</p>
                      </div>
                      <button className="text-xs text-alert font-bold bg-alert-lite px-2 py-1 rounded">Cancel</button>
                    </div>
                  ))}
                  {tr.training.upcomingClasses.length === 0 && (
                    <p className="text-text text-sm">No classes booked.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="info-card lg:col-span-1">
              <h3><Activity size={18} className="text-primary" /> Diet Overview</h3>
              <div className="mt-6 bg-background border border-stroke p-5 rounded-xl text-center">
                <Flame size={32} className="text-alert mx-auto mb-2" />
                <span className="text-xs font-bold text-text uppercase tracking-wider block mb-1">Daily Caloric Target</span>
                <span className="text-4xl font-black text-title">{tr.nutrition.calories}</span>
                <p className="text-sm text-primary font-bold mt-2">{tr.nutrition.planName}</p>
              </div>

              <h3 className="mt-8 mb-4">Macronutrient Split</h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-xs font-bold text-text uppercase">Protein</span>
                  </div>
                  <span className="text-sm font-black text-title">{tr.nutrition.macros.protein}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <span className="text-xs font-bold text-text uppercase">Carbs</span>
                  </div>
                  <span className="text-sm font-black text-title">{tr.nutrition.macros.carbs}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <span className="text-xs font-bold text-text uppercase">Fats</span>
                  </div>
                  <span className="text-sm font-black text-title">{tr.nutrition.macros.fats}</span>
                </div>
              </div>
            </div>

            <div className="info-card lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3><Apple size={18} className="text-primary" /> Daily Meal Plan</h3>
                <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                  <Edit2 size={14} /> Edit Meals
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {tr.nutrition.meals.map((meal, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-background border border-stroke rounded-xl">
                    <div className="w-20 shrink-0 border-r border-stroke pr-4">
                      <span className="text-xs font-bold text-text block uppercase">{meal.name}</span>
                      <span className="text-xs font-bold text-primary">{meal.time}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-title leading-relaxed">{meal.items}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                  {tr.permissions && tr.permissions.map((perm, idx) => (
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
                  {(!tr.permissions || tr.permissions.length === 0) && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-text">No custom permissions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="info-card">
            <div className="flex justify-between items-center mb-6">
              <h3><Fingerprint size={18} className="text-primary" /> Gym Check-in History</h3>
              <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                <Filter size={14} /> Filter Dates
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stroke text-xs text-text uppercase tracking-wider">
                    <th className="pb-3 font-bold text-title">Date</th>
                    <th className="pb-3 font-bold text-title">Check In</th>
                    <th className="pb-3 font-bold text-title">Check Out</th>
                    <th className="pb-3 font-bold text-title">Session Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {tr.checkIns.map(session => (
                    <tr key={session.id} className="border-b border-stroke hover:bg-background transition-colors">
                      <td className="py-4 font-bold text-title">{session.date}</td>
                      <td className="py-4 text-text">{session.checkIn}</td>
                      <td className="py-4 text-text">{session.checkOut}</td>
                      <td className="py-4 text-text">{session.duration}</td>
                    </tr>
                  ))}
                  {tr.checkIns.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-text">No check-in history available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'medical' && (
           <div className="info-card">
            <div className="flex justify-between items-center mb-6">
              <h3><HeartPulse size={18} className="text-primary" /> Medical History Log</h3>
              <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                <Plus size={14} /> Log Entry
              </button>
            </div>
            <div className="flex flex-col gap-4">
                {tr.progress.medicalHistory && tr.progress.medicalHistory.map((entry, idx) => (
                  <div key={idx} className="bg-background border border-stroke p-5 rounded-xl">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-bold text-primary block">{entry.date}</span>
                        <span className="text-xs font-bold bg-alert-lite text-alert border border-alert-border px-2 py-0.5 rounded">{entry.type}</span>
                    </div>
                    <p className="text-sm text-text leading-relaxed">{entry.desc}</p>
                  </div>
                ))}
                {(!tr.progress.medicalHistory || tr.progress.medicalHistory.length === 0) && (
                   <div className="bg-background border border-stroke rounded-xl p-8 text-center text-text flex flex-col items-center gap-3">
                     <p>No medical history entries logged.</p>
                   </div>
                )}
              </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="info-card">
            <h3><CreditCard size={18} className="text-primary" /> Billing Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-background border border-stroke p-5 rounded-xl">
                <span className="text-xs font-bold text-text uppercase tracking-wider block mb-2">Next Renewal</span>
                <span className={`text-xl font-black ${tr.status === 'Active' ? 'text-title' : 'text-alert'}`}>
                  {tr.membership.nextBilling}
                </span>
              </div>
              <div className="bg-background border border-stroke p-5 rounded-xl">
                <span className="text-xs font-bold text-text uppercase tracking-wider block mb-2">Payment Method</span>
                <span className="text-lg font-bold text-title">{tr.membership.paymentMethod}</span>
              </div>
              <div className="bg-primary-lite border border-primary-border p-5 rounded-xl">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">Lifetime Value</span>
                <span className="text-2xl font-black text-title">{tr.membership.totalSpent}</span>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="flex items-center gap-2"><CreditCard size={18} className="text-primary" /> Billing History & Invoices</h3>
                <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                  <Filter size={14} /> Filter Range
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stroke text-xs text-text uppercase tracking-wider">
                      <th className="pb-3 font-bold text-title">Invoice ID</th>
                      <th className="pb-3 font-bold text-title">Date</th>
                      <th className="pb-3 font-bold text-title">Description</th>
                      <th className="pb-3 font-bold text-title">Method</th>
                      <th className="pb-3 font-bold text-title">Amount</th>
                      <th className="pb-3 font-bold text-title">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tr.billingHistory && tr.billingHistory.map((bill, idx) => (
                      <tr key={idx} className="border-b border-stroke hover:bg-background transition-colors">
                        <td className="py-4 font-bold text-title">{bill.id}</td>
                        <td className="py-4 text-text">{bill.date}</td>
                        <td className="py-4 text-title">{bill.description}</td>
                        <td className="py-4 text-text">{bill.method}</td>
                        <td className="py-4 font-black text-title">{bill.amount}</td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            bill.status === 'Paid' ? 'bg-green-500/20 text-green-500' :
                            'bg-red-500/20 text-red-500'
                          }`}>
                            {bill.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {(!tr.billingHistory || tr.billingHistory.length === 0) && (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-text">No billing records found.</td>
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
