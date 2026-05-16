import React, { useState } from 'react';
import { 
  Search, Filter, Plus, ArrowLeft, MoreVertical, 
  MapPin, Star, Users, Calendar, Award, DollarSign,
  Globe, Edit2, Trash2, Mail, Phone,
  Clock, CheckCircle2, FileText
} from 'lucide-react';
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
    financials: { salary: '$3,200', commission: '15%', lastPayout: '$3,850' },
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
    reviews: [
      { id: 1, author: 'Alex Mercer', rating: 5, date: '2 days ago', text: 'Marcus completely transformed my approach to lifting. Incredible attention to detail!' },
      { id: 2, author: 'Sarah Connor', rating: 5, date: '1 week ago', text: 'Best coach I\'ve ever had. Very professional and supportive.' }
    ]
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
    reviews: [
      { id: 3, author: 'John Doe', rating: 4, date: '1 month ago', text: 'Great yoga classes, very relaxing environment.' }
    ]
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
    reviews: [
      { id: 4, author: 'Chris Evans', rating: 5, date: '3 days ago', text: 'David pushes you exactly as hard as you need to be pushed. Seeing great results.' },
      { id: 5, author: 'Mark Ruffalo', rating: 4, date: '2 weeks ago', text: 'Solid strength programming.' }
    ]
  }
];

export function PersonalTrainers({ searchQuery }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'detail'
  const [selectedPT, setSelectedPT] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, trainees, schedule, awards, financials

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
            <div key={pt.id} className="pt-card" onClick={() => handleSelectPT(pt)}>
              <div className="absolute top-4 right-4">
                <span className={`w-2.5 h-2.5 rounded-full inline-block ${pt.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-yellow-500'}`}></span>
              </div>
              <div className="pt-card-header">
                <img src={pt.avatar} alt={pt.name} className="pt-avatar" />
                <div className="pt-info">
                  <h3>{pt.name}</h3>
                  <p>{pt.role}</p>
                  <p className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
                    <MapPin size={10} /> {pt.branch}
                  </p>
                </div>
              </div>
              <div className="pt-stats">
                <div className="stat-item">
                  <span className="stat-value">{pt.activeTrainees}</span>
                  <span className="stat-label">Trainees</span>
                </div>
                <div className="stat-item text-right">
                  <span className="stat-value flex items-center justify-end gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /> {pt.rating}</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </div>
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
            <button className="bg-primary-lite border border-primary-border p-2 rounded-lg text-primary hover:text-primary transition-colors">
              <Edit2 size={16} />
            </button>
            <button className="bg-alert-lite border border-alert-border p-2 rounded-lg text-alert hover:text-alert transition-colors">
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
          { id: 'trainees', label: 'Trainees', icon: Users },
          { id: 'schedule', label: 'Schedule & Classes', icon: Calendar },
          { id: 'awards', label: 'Awards & Certs', icon: Award },
          { id: 'financials', label: 'Financials', icon: DollarSign },
          { id: 'reviews', label: 'Reviews', icon: Star },
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
                  <span className="text-text font-bold text-xs uppercase">Avg Rating</span>
                  <span className="text-xl font-black text-title flex items-center gap-2"><Star size={18} className="text-yellow-400 fill-yellow-400"/> {pt.rating}</span>
                </div>
              </div>
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
                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">Last Payout</span>
                <span className="text-2xl font-black text-title">{pt.financials.lastPayout}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="info-card">
            <div className="flex justify-between items-center mb-6">
              <h3><Star size={18} className="text-primary" /> Trainee Reviews</h3>
              <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-lg text-sm font-bold border border-yellow-500/20">
                <Star size={16} className="fill-current" /> {pt.rating} Average
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {pt.reviews.map(review => (
                <div key={review.id} className="bg-background border border-stroke p-5 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-title text-sm">{review.author}</span>
                      <span className="text-xs text-text">{review.date}</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-stroke"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-text text-sm italic">"{review.text}"</p>
                </div>
              ))}
              {pt.reviews.length === 0 && <p className="text-text">No reviews yet.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
