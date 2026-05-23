import React, { useState } from 'react';
import { 
  Search, Filter, Plus, ArrowLeft, MoreVertical, 
  MapPin, Star, Users, Calendar, Award, DollarSign,
  Globe, Edit2, Trash2, Mail, Phone,
  Clock, CheckCircle2, FileText, Activity, ShieldAlert, Fingerprint,
  Flag, Ban, CheckSquare, Key
} from 'lucide-react';
import { UserCard } from '../../components/ui/UserCard';
import './Receptionists.css';

// --- MOCK DATA ---
const mockReceptionists = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Front Desk Lead',
    branch: 'Smouha Branch',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop',
    metrics: { membershipsSold: 145, avgCheckInTime: '1.2 mins', rating: 4.9 },
    bio: 'Highly experienced front desk lead with 5+ years in hospitality. Ensures smooth daily operations and excellent member experiences.',
    contact: { phone: '+20 123 456 7890', email: 'sarah.j@aurafit.com' },
    social: { linkedin: 'sarahjenkins' },
    financials: { salary: '$1,800', commission: '5% on sales', lastPayout: '$2,100' },
    billingHistory: [
      { id: 'PAY-2026-04', date: '01 May 2026', amount: '$2,100', type: 'Salary + Commission', status: 'Paid', method: 'Direct Deposit' },
      { id: 'PAY-2026-03', date: '01 Apr 2026', amount: '$1,950', type: 'Salary + Commission', status: 'Paid', method: 'Direct Deposit' }
    ],
    issues: [
      { id: 1, date: '12 May 2026', type: 'Positive Feedback', desc: 'Member praised Sarah for quick issue resolution.' }
    ],
    schedule: [
      { day: 'Monday', time: '08:00 AM - 04:00 PM', type: 'Morning Shift' },
      { day: 'Wednesday', time: '08:00 AM - 04:00 PM', type: 'Morning Shift' },
      { day: 'Friday', time: '08:00 AM - 04:00 PM', type: 'Morning Shift' }
    ],
    registrations: [
      { id: 201, memberName: 'Liam Carter', type: 'Annual VIP', date: '15 May 2026' },
      { id: 202, memberName: 'Emma Stone', type: 'Monthly Standard', date: '14 May 2026' }
    ],
    reviews: [
      { id: 1, author: 'Liam Carter', rating: 5, date: '1 day ago', text: 'Sarah was super helpful and welcoming!' }
    ],
    timeLogs: [
      { id: 301, date: '16 May 2026', clockIn: '05:50 AM', clockOut: '02:00 PM', duration: '8h 10m', status: 'On Time' },
      { id: 302, date: '15 May 2026', clockIn: '06:05 AM', clockOut: '02:00 PM', duration: '7h 55m', status: 'Late' }
    ],
    tasks: [
      { id: 1, title: 'Inventory Restock', desc: 'Restock towels and water bottles in front lobby.', status: 'Pending', dueDate: '19 May 2026' }
    ],
    permissions: [
      { module: 'Member Registration', canRead: true, canWrite: true, canDelete: false },
      { module: 'Billing', canRead: true, canWrite: false, canDelete: false },
      { module: 'Staff Management', canRead: false, canWrite: false, canDelete: false }
    ],
    languages: ['English', 'Spanish'],
    certifications: ['CPR', 'First Aid']
  },
  {
    id: 2,
    name: 'Omar Hassan',
    role: 'Night Receptionist',
    branch: 'Sporting Branch',
    status: 'Off-duty',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop',
    metrics: { membershipsSold: 32, avgCheckInTime: '0.8 mins', rating: 4.7 },
    bio: 'Dedicated night shift receptionist handling late check-ins and facility closing procedures.',
    contact: { phone: '+20 198 765 4321', email: 'omar.h@aurafit.com' },
    social: {},
    financials: { salary: '$1,500', commission: '5% on sales', lastPayout: '$1,650' },
    billingHistory: [
      { id: 'PAY-2026-04', date: '01 May 2026', amount: '$1,650', type: 'Salary + Commission', status: 'Paid', method: 'Direct Deposit' }
    ],
    issues: [
      { id: 2, date: '10 May 2026', type: 'Incident Report', desc: 'Handled a minor maintenance issue in the locker room efficiently.' }
    ],
    schedule: [
      { day: 'Tuesday', time: '04:00 PM - 12:00 AM', type: 'Evening Shift' },
      { day: 'Thursday', time: '04:00 PM - 12:00 AM', type: 'Evening Shift' }
    ],
    registrations: [
      { id: 203, memberName: 'Noah Smith', type: 'Day Pass', date: '13 May 2026' }
    ],
    reviews: [
      { id: 2, author: 'Noah Smith', rating: 4, date: '3 days ago', text: 'Quick and easy check-in process.' }
    ],
    timeLogs: [
      { id: 303, date: '14 May 2026', clockIn: '04:00 PM', clockOut: '11:45 PM', duration: '7h 45m', status: 'Early Leave' }
    ]
  }
];

export function Receptionists({ searchQuery }) {
  const [viewMode, setViewMode] = useState('list');
  const [selectedRC, setSelectedRC] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const filteredRCs = mockReceptionists.filter(rc => 
    rc.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    rc.branch.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  const handleSelectRC = (rc) => {
    setSelectedRC(rc);
    setViewMode('detail');
    setActiveTab('overview');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedRC(null);
  };

  if (viewMode === 'list') {
    return (
      <div className="rc-container">
        <div className="rc-header">
          <h1>Receptionists</h1>
          <p>Manage front-desk staff, shifts, and performance metrics.</p>
        </div>

        <div className="rc-actions">
          <div className="rc-search">
            <Search size={18} className="text-text" />
            <input type="text" placeholder="Search receptionists by name or branch..." />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-primary border border-primary-border px-4 py-2 rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-colors">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#1ea34d] transition-colors">
              <Plus size={16} /> Add New Receptionist
            </button>
          </div>
        </div>

        <div className="rc-grid">
          {filteredRCs.map(rc => (
            <UserCard 
              key={rc.id} 
              user={{
                ...rc,
                customStats: [
                  { value: rc.metrics.membershipsSold, label: 'Sales' },
                  { value: rc.metrics.rating, label: 'Rating', isRating: true, alignRight: true }
                ]
              }} 
              onClick={handleSelectRC} 
              onQuickAction={(user, action) => console.log(`Action ${action} triggered for ${user.name}`)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!selectedRC) return null;
  const rc = selectedRC;

  return (
    <div className="rc-container">
      <button onClick={handleBackToList} className="flex items-center gap-2 text-primary hover:text-primary-lite font-bold text-sm mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Receptionists
      </button>

      <div className="rc-profile-header">
        <div className="profile-main-info">
          <img src={rc.avatar} alt={rc.name} className="profile-avatar" />
          <div className="profile-name">
            <h2>{rc.name}</h2>
            <div className="profile-badges">
              <span className="badge primary"><Star size={12} className="fill-current" /> {rc.role}</span>
              <span className="badge"><MapPin size={12} /> {rc.branch}</span>
              <span className="badge"><CheckCircle2 size={12} className={rc.status === 'Active' ? 'text-green-500' : 'text-gray-500'} /> {rc.status}</span>
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
            {rc.social.linkedin && <a href="#" className="social-btn"><Globe size={16} /></a>}
            <a href={`mailto:${rc.contact.email}`} className="social-btn"><Mail size={16} /></a>
          </div>
        </div>
      </div>

      <div className="rc-tabs">
        {[
          { id: 'overview', label: 'Overview', icon: FileText },
          { id: 'tasks', label: 'Duties & Tasks', icon: CheckSquare },
          { id: 'performance', label: 'Performance', icon: Activity },
          { id: 'schedule', label: 'Shift Schedule', icon: Calendar },
          { id: 'attendance', label: 'Attendance', icon: Fingerprint },
          { id: 'permissions', label: 'Permissions', icon: Key },
          { id: 'financials', label: 'Financials', icon: DollarSign },
        ].map(tab => (
          <button 
            key={tab.id}
            className={`rc-tab-btn flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
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
              <h3><FileText size={18} className="text-primary" /> Biography</h3>
              <p className="text-text leading-relaxed">{rc.bio}</p>
              
              <h3 className="mt-8 mb-4"><Phone size={18} className="text-primary" /> Contact Information</h3>
              <div className="flex flex-col gap-3 text-text">
                <div className="flex items-center gap-3"><Phone size={16} className="text-text" /> {rc.contact.phone}</div>
                <div className="flex items-center gap-3"><Mail size={16} className="text-text" /> {rc.contact.email}</div>
              </div>
            </div>
            <div className="info-card">
              <h3><Activity size={18} className="text-primary" /> Key Metrics</h3>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <span className="text-text font-bold text-xs uppercase">Memberships Sold</span>
                  <span className="text-xl font-black text-title">{rc.metrics.membershipsSold}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <span className="text-text font-bold text-xs uppercase">Languages</span>
                  <span className="text-sm font-black text-primary">{rc.languages?.join(', ') || 'English'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <span className="text-text font-bold text-xs uppercase">Customer Rating</span>
                  <span className="text-xl font-black text-title flex items-center gap-2"><Star size={18} className="text-yellow-400 fill-yellow-400"/> {rc.metrics.rating}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="info-card">
            <div className="flex justify-between items-center mb-6">
              <h3><Calendar size={18} className="text-primary" /> Weekly Shifts</h3>
              <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                <Plus size={14} /> Add Shift
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {rc.schedule.map((s, idx) => (
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
                  {rc.timeLogs.map(log => (
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
                  {rc.timeLogs.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-text">No attendance logs available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'registrations' && (
          <div className="info-card">
            <div className="flex justify-between items-center mb-6">
              <h3><Users size={18} className="text-primary" /> Recent Memberships Sold</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stroke text-xs text-text uppercase tracking-wider">
                    <th className="pb-3 font-bold text-title">Member Name</th>
                    <th className="pb-3 font-bold text-title">Plan Type</th>
                    <th className="pb-3 font-bold text-title">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rc.registrations.map(r => (
                    <tr key={r.id} className="border-b border-stroke hover:bg-background transition-colors">
                      <td className="py-4 font-bold text-title">{r.memberName}</td>
                      <td className="py-4">
                        <span className="bg-stroke px-2 py-1 rounded text-xs font-bold text-text">{r.type}</span>
                      </td>
                      <td className="py-4 text-text">{r.date}</td>
                    </tr>
                  ))}
                  {rc.registrations.length === 0 && (
                    <tr>
                      <td colSpan="3" className="py-8 text-center text-text">No recent registrations.</td>
                    </tr>
                  )}
                </tbody>
              </table>
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
              {rc.tasks && rc.tasks.map(task => (
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
              {(!rc.tasks || rc.tasks.length === 0) && <p className="text-text text-sm">No tasks assigned.</p>}
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="info-card">
              <h3><ShieldAlert size={18} className="text-primary" /> Action Logs & Issues</h3>
              <ul className="flex flex-col gap-3 mt-4">
                {rc.issues.map(issue => (
                  <li key={issue.id} className="flex flex-col gap-1 text-text bg-background p-4 rounded-lg border border-stroke">
                    <div className="flex justify-between">
                      <span className="font-bold text-title">{issue.type}</span>
                      <span className="text-xs text-subtitle">{issue.date}</span>
                    </div>
                    <p className="text-sm">{issue.desc}</p>
                  </li>
                ))}
                {rc.issues.length === 0 && <p className="text-text text-sm">No action logs recorded.</p>}
              </ul>
            </div>
            <div className="info-card">
              <div className="flex justify-between items-center mb-4">
                <h3><Star size={18} className="text-primary" /> Customer Reviews</h3>
                <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-lg text-xs font-bold border border-yellow-500/20">
                  <Star size={14} className="fill-current" /> {rc.metrics.rating}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {rc.reviews.map(review => (
                  <div key={review.id} className="bg-background border border-stroke p-4 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-title text-sm">{review.author}</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-stroke"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-text text-xs italic">"{review.text}"</p>
                  </div>
                ))}
                {rc.reviews.length === 0 && <p className="text-text text-sm">No reviews yet.</p>}
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
                  {rc.permissions && rc.permissions.map((perm, idx) => (
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
                  {(!rc.permissions || rc.permissions.length === 0) && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-text">No custom permissions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="info-card">
            <h3><DollarSign size={18} className="text-primary" /> Compensation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-background border border-stroke p-5 rounded-xl">
                <span className="text-xs font-bold text-text uppercase tracking-wider block mb-2">Base Salary</span>
                <span className="text-2xl font-black text-title">{rc.financials.salary} <span className="text-sm font-normal text-text">/mo</span></span>
              </div>
              <div className="bg-background border border-stroke p-5 rounded-xl">
                <span className="text-xs font-bold text-text uppercase tracking-wider block mb-2">Commission</span>
                <span className="text-2xl font-black text-title">{rc.financials.commission}</span>
              </div>
              <div className="bg-primary-lite border border-primary-border p-5 rounded-xl">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">Last Payout</span>
                <span className="text-2xl font-black text-title">{rc.financials.lastPayout}</span>
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
                    {rc.billingHistory && rc.billingHistory.map((bill, idx) => (
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
                    {(!rc.billingHistory || rc.billingHistory.length === 0) && (
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
