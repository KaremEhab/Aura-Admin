import React, { useState } from 'react';
import { 
  Search, Filter, Plus, ArrowLeft, MoreVertical, 
  MapPin, Star, Users, Calendar, DollarSign,
  Globe, Edit2, Trash2, Mail, Phone,
  Clock, CheckCircle2, FileText, Activity, ShieldAlert, Fingerprint, TrendingUp, AlertTriangle,
  Flag, Ban, CheckSquare, Key
} from 'lucide-react';
import { UserCard } from '../../components/ui/UserCard';
import './Managers.css';

const mockManagers = [
  {
    id: 1,
    name: 'James Sullivan',
    role: 'General Manager',
    branch: 'Smouha Branch',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&auto=format&fit=crop',
    metrics: { managedStaff: 45, branchRating: 4.8, performanceScore: '96%' },
    bio: 'Oversees all operations at the Smouha Branch. Ensures high standards of facility maintenance, staff performance, and member satisfaction.',
    department: 'Operations',
    projects: ['Q3 Equipment Upgrade', 'Staff Training Program'],
    budget: '$50,000 / month',
    contact: { phone: '+20 100 222 3344', email: 'james.s@aurafit.com' },
    social: { linkedin: 'jamessullivan' },
    financials: { salary: '$4,500', bonus: '$800 (Q1 Performance)', totalComp: '$5,300' },
    billingHistory: [
      { id: 'PAY-2026-04', date: '01 May 2026', amount: '$5,300', type: 'Salary + Bonus', status: 'Paid', method: 'Bank Transfer' },
      { id: 'PAY-2026-03', date: '01 Apr 2026', amount: '$4,500', type: 'Base Salary', status: 'Paid', method: 'Bank Transfer' }
    ],
    issues: [
      { id: 1, date: '18 May 2026', type: 'Equipment Maintenance', desc: 'Resolved an issue with 3 broken treadmills. Vendor contacted.' }
    ],
    schedule: [
      { day: 'Monday - Friday', time: '09:00 AM - 05:00 PM', type: 'Core Office Hours' },
      { day: 'Saturday', time: '10:00 AM - 02:00 PM', type: 'Branch Inspection' }
    ],
    managedStaffList: [
      { id: 101, name: 'Marcus Johnson', role: 'Head PT', status: 'Active' },
      { id: 102, name: 'Sarah Jenkins', role: 'Front Desk Lead', status: 'Active' },
      { id: 103, name: 'David Chen', role: 'Strength PT', status: 'Active' }
    ],
    reviews: [
      { id: 1, author: 'Regional Director', rating: 5, date: '1 month ago', text: 'James has consistently exceeded targets for Smouha branch.' }
    ],
    timeLogs: [
      { id: 301, date: '16 May 2026', clockIn: '08:50 AM', clockOut: '05:30 PM', duration: '8h 40m', status: 'On Time' }
    ],
    tasks: [
      { id: 1, title: 'Quarterly Staff Review', desc: 'Conduct performance reviews for all head trainers.', status: 'Pending', dueDate: '30 May 2026' },
      { id: 2, title: 'Vendor Meeting', desc: 'Renegotiate equipment maintenance contract.', status: 'In Progress', dueDate: '22 May 2026' }
    ],
    permissions: [
      { module: 'Staff Management', canRead: true, canWrite: true, canDelete: false },
      { module: 'Financials', canRead: true, canWrite: false, canDelete: false },
      { module: 'Branch Settings', canRead: true, canWrite: true, canDelete: true }
    ]
  },
  {
    id: 2,
    name: 'Olivia Martinez',
    role: 'Shift Supervisor',
    branch: 'Sporting Branch',
    status: 'On Leave',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop',
    metrics: { managedStaff: 12, branchRating: 4.6, performanceScore: '89%' },
    bio: 'Supervises evening shifts, ensuring smooth handovers and managing any member disputes or emergencies.',
    department: 'Customer Service',
    projects: ['Evening Member Engagement'],
    budget: '$5,000 / month',
    contact: { phone: '+20 111 444 5566', email: 'olivia.m@aurafit.com' },
    social: { linkedin: 'oliviamartinez' },
    financials: { salary: '$2,800', bonus: '$300 (Night Shift Premium)', totalComp: '$3,100' },
    billingHistory: [
      { id: 'PAY-2026-04', date: '01 May 2026', amount: '$3,100', type: 'Salary + Premium', status: 'Paid', method: 'Bank Transfer' },
      { id: 'PAY-2026-03', date: '01 Apr 2026', amount: '$3,100', type: 'Salary + Premium', status: 'Paid', method: 'Bank Transfer' }
    ],
    issues: [
      { id: 2, date: '10 May 2026', type: 'Member Dispute', desc: 'De-escalated a scheduling conflict between two personal trainers.' }
    ],
    schedule: [
      { day: 'Tuesday - Saturday', time: '04:00 PM - 12:00 AM', type: 'Evening Supervisor Shift' }
    ],
    managedStaffList: [
      { id: 104, name: 'Omar Hassan', role: 'Night Receptionist', status: 'Active' }
    ],
    reviews: [
      { id: 2, author: 'James Sullivan', rating: 4, date: '2 months ago', text: 'Reliable supervisor, handles pressure well.' }
    ],
    timeLogs: [
      { id: 303, date: '14 May 2026', clockIn: '03:55 PM', clockOut: '12:15 AM', duration: '8h 20m', status: 'On Time' }
    ],
    tasks: [
      { id: 3, title: 'Inventory Check', desc: 'Verify evening locker room supplies.', status: 'Completed', dueDate: '15 May 2026' }
    ],
    permissions: [
      { module: 'Staff Management', canRead: true, canWrite: false, canDelete: false },
      { module: 'Member Profiles', canRead: true, canWrite: true, canDelete: false }
    ]
  }
];

export function Managers({ searchQuery }) {
  const [viewMode, setViewMode] = useState('list');
  const [selectedMgr, setSelectedMgr] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const filteredMgrs = mockManagers.filter(mgr => 
    mgr.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    mgr.branch.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  const handleSelectMgr = (mgr) => {
    setSelectedMgr(mgr);
    setViewMode('detail');
    setActiveTab('overview');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedMgr(null);
  };

  if (viewMode === 'list') {
    return (
      <div className="mgr-container">
        <div className="mgr-header">
          <h1>Managers & Supervisors</h1>
          <p>Oversee your leadership team, track branch performance, and manage operations.</p>
        </div>

        <div className="mgr-actions">
          <div className="mgr-search">
            <Search size={18} className="text-text" />
            <input type="text" placeholder="Search managers by name or branch..." />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-primary border border-primary-border px-4 py-2 rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-colors">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#1ea34d] transition-colors">
              <Plus size={16} /> Add New Manager
            </button>
          </div>
        </div>

        <div className="mgr-grid">
          {filteredMgrs.map(mgr => (
            <UserCard 
              key={mgr.id} 
              user={{
                ...mgr,
                customStats: [
                  { value: mgr.metrics.managedStaff, label: 'Staff' },
                  { value: mgr.metrics.branchRating, label: 'Branch Rating', isRating: true, alignRight: true }
                ]
              }} 
              onClick={handleSelectMgr} 
              onQuickAction={(user, action) => console.log(`Action ${action} triggered for ${user.name}`)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!selectedMgr) return null;
  const mgr = selectedMgr;

  return (
    <div className="mgr-container">
      <button onClick={handleBackToList} className="flex items-center gap-2 text-primary hover:text-primary-lite font-bold text-sm mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Managers
      </button>

      <div className="mgr-profile-header">
        <div className="profile-main-info">
          <img src={mgr.avatar} alt={mgr.name} className="profile-avatar" />
          <div className="profile-name">
            <h2>{mgr.name}</h2>
            <div className="profile-badges">
              <span className="badge primary"><Star size={12} className="fill-current" /> {mgr.role}</span>
              <span className="badge"><MapPin size={12} /> {mgr.branch}</span>
              <span className="badge"><CheckCircle2 size={12} className={mgr.status === 'Active' ? 'text-green-500' : 'text-yellow-500'} /> {mgr.status}</span>
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
            {mgr.social.linkedin && <a href="#" className="social-btn"><Globe size={16} /></a>}
            <a href={`mailto:${mgr.contact.email}`} className="social-btn"><Mail size={16} /></a>
          </div>
        </div>
      </div>

      <div className="mgr-tabs">
        {[
          { id: 'overview', label: 'Overview', icon: FileText },
          { id: 'tasks', label: 'Duties & Tasks', icon: CheckSquare },
          { id: 'staff', label: 'Managed Staff', icon: Users },
          { id: 'performance', label: 'Branch Performance', icon: TrendingUp },
          { id: 'schedule', label: 'Schedule', icon: Calendar },
          { id: 'permissions', label: 'Permissions', icon: Key },
          { id: 'financials', label: 'Financials', icon: DollarSign },
        ].map(tab => (
          <button 
            key={tab.id}
            className={`mgr-tab-btn flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
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
              <h3><FileText size={18} className="text-primary" /> Executive Summary</h3>
              <p className="text-text leading-relaxed">{mgr.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-background border border-stroke p-4 rounded-xl">
                  <span className="text-xs font-bold text-text uppercase block mb-1">Department</span>
                  <span className="text-sm font-bold text-title">{mgr.department}</span>
                </div>
                <div className="bg-background border border-stroke p-4 rounded-xl">
                  <span className="text-xs font-bold text-text uppercase block mb-1">Budget Responsibility</span>
                  <span className="text-sm font-bold text-title">{mgr.budget}</span>
                </div>
                <div className="bg-background border border-stroke p-4 rounded-xl md:col-span-2">
                  <span className="text-xs font-bold text-text uppercase block mb-2">Active Projects</span>
                  <div className="flex flex-wrap gap-2">
                    {mgr.projects.map((proj, idx) => (
                      <span key={idx} className="bg-primary-lite border border-primary-border text-primary px-3 py-1 rounded text-xs font-bold">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <h3 className="mt-8 mb-4"><Phone size={18} className="text-primary" /> Contact Information</h3>
              <div className="flex flex-col gap-3 text-text">
                <div className="flex items-center gap-3"><Phone size={16} className="text-text" /> {mgr.contact.phone}</div>
                <div className="flex items-center gap-3"><Mail size={16} className="text-text" /> {mgr.contact.email}</div>
              </div>
            </div>
            <div className="info-card">
              <h3><Activity size={18} className="text-primary" /> Leadership Stats</h3>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <span className="text-text font-bold text-xs uppercase">Managed Staff</span>
                  <span className="text-xl font-black text-title">{mgr.metrics.managedStaff}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <span className="text-text font-bold text-xs uppercase">Performance Score</span>
                  <span className="text-xl font-black text-primary">{mgr.metrics.performanceScore}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background rounded-xl border border-stroke">
                  <span className="text-text font-bold text-xs uppercase">Branch Rating</span>
                  <span className="text-xl font-black text-title flex items-center gap-2"><Star size={18} className="text-yellow-400 fill-yellow-400"/> {mgr.metrics.branchRating}</span>
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
              {mgr.tasks.map(task => (
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
                  {mgr.permissions.map((perm, idx) => (
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
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="info-card">
            <div className="flex justify-between items-center mb-6">
              <h3><Users size={18} className="text-primary" /> Managed Staff List</h3>
              <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                <Plus size={14} /> Add Staff to Team
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stroke text-xs text-text uppercase tracking-wider">
                    <th className="pb-3 font-bold text-title">Staff Member</th>
                    <th className="pb-3 font-bold text-title">Role</th>
                    <th className="pb-3 font-bold text-title">Status</th>
                    <th className="pb-3 font-bold text-title text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mgr.managedStaffList.map(staff => (
                    <tr key={staff.id} className="border-b border-stroke hover:bg-background transition-colors">
                      <td className="py-4 font-bold text-title">{staff.name}</td>
                      <td className="py-4">
                        <span className="bg-stroke px-2 py-1 rounded text-xs font-bold text-text">{staff.role}</span>
                      </td>
                      <td className="py-4">
                        <span className={`flex items-center gap-2 text-xs font-bold ${staff.status === 'Active' ? 'text-primary' : 'text-text'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Active' ? 'bg-primary' : 'bg-text'}`}></span> {staff.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-xs text-primary font-bold hover:underline">View Profile</button>
                      </td>
                    </tr>
                  ))}
                  {mgr.managedStaffList.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-text">No staff currently assigned.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="info-card">
              <h3><ShieldAlert size={18} className="text-primary" /> Incident & Operations Logs</h3>
              <ul className="flex flex-col gap-3 mt-4">
                {mgr.issues.map(issue => (
                  <li key={issue.id} className="flex flex-col gap-1 text-text bg-background p-4 rounded-lg border border-stroke">
                    <div className="flex justify-between">
                      <span className="font-bold text-title flex items-center gap-2">
                        <AlertTriangle size={14} className="text-alert" /> {issue.type}
                      </span>
                      <span className="text-xs text-subtitle">{issue.date}</span>
                    </div>
                    <p className="text-sm mt-1">{issue.desc}</p>
                  </li>
                ))}
                {mgr.issues.length === 0 && <p className="text-text text-sm">No action logs recorded.</p>}
              </ul>
            </div>
            <div className="info-card">
              <div className="flex justify-between items-center mb-4">
                <h3><Star size={18} className="text-primary" /> Executive Reviews</h3>
              </div>
              <div className="flex flex-col gap-4">
                {mgr.reviews.map(review => (
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
                {mgr.reviews.length === 0 && <p className="text-text text-sm">No reviews yet.</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="info-card">
            <div className="flex justify-between items-center mb-6">
              <h3><Calendar size={18} className="text-primary" /> Shift Schedule</h3>
              <button className="flex items-center gap-2 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:bg-stroke transition-colors">
                <Plus size={14} /> Add Shift
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {mgr.schedule.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center bg-background border border-stroke p-4 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-lite text-primary flex flex-col items-center justify-center font-black uppercase text-xs text-center leading-tight">
                      {s.day.split(' ')[0].substring(0,3)}
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

        {activeTab === 'financials' && (
          <div className="info-card">
            <h3><DollarSign size={18} className="text-primary" /> Compensation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-background border border-stroke p-5 rounded-xl">
                <span className="text-xs font-bold text-text uppercase tracking-wider block mb-2">Base Salary</span>
                <span className="text-2xl font-black text-title">{mgr.financials.salary} <span className="text-sm font-normal text-text">/mo</span></span>
              </div>
              <div className="bg-background border border-stroke p-5 rounded-xl">
                <span className="text-xs font-bold text-text uppercase tracking-wider block mb-2">Bonuses</span>
                <span className="text-lg font-black text-primary">{mgr.financials.bonus}</span>
              </div>
              <div className="bg-primary-lite border border-primary-border p-5 rounded-xl">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">Total Comp</span>
                <span className="text-2xl font-black text-title">{mgr.financials.totalComp}</span>
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
                    {mgr.billingHistory && mgr.billingHistory.map((bill, idx) => (
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
                    {(!mgr.billingHistory || mgr.billingHistory.length === 0) && (
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
