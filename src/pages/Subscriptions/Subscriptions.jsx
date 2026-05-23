import React, { useState } from 'react';
import { 
  Search, Filter, Download, MoreVertical, CheckCircle2, 
  AlertCircle, XCircle, Users, Activity, TrendingUp, Calendar, 
  RefreshCcw, Settings, ExternalLink, ShieldCheck
} from 'lucide-react';
import './Subscriptions.css';

const mockSubscriptions = [
  {
    id: 'SUB-1029',
    member: { name: 'Alex Mercer', email: 'alex.m@example.com', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop', engagement: 'High (4x/wk)', risk: 'Low' },
    plan: 'VIP Elite',
    status: 'Active',
    startDate: '12 Jan 2026',
    nextBilling: '12 Jun 2026',
    paymentMethod: 'Visa **4242',
    amount: '$150',
    history: 'Upgraded from Standard Pro (Mar 2026)',
    lifetimeValue: '$1,450'
  },
  {
    id: 'SUB-1030',
    member: { name: 'Emma Stone', email: 'emma.s@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop', engagement: 'Medium (2x/wk)', risk: 'Low' },
    plan: 'Standard Pro',
    status: 'Active',
    startDate: '15 Mar 2026',
    nextBilling: '15 Jun 2026',
    paymentMethod: 'Mastercard **8812',
    amount: '$85',
    history: 'No changes',
    lifetimeValue: '$255'
  },
  {
    id: 'SUB-1031',
    member: { name: 'Liam Carter', email: 'liam.c@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop', engagement: 'Low (0x/wk)', risk: 'High' },
    plan: 'Basic Access',
    status: 'Past Due',
    startDate: '01 Jan 2026',
    nextBilling: '01 May 2026 (Overdue)',
    paymentMethod: 'Cash',
    amount: '$50',
    history: 'Payment failed twice',
    lifetimeValue: '$200'
  },
  {
    id: 'SUB-1032',
    member: { name: 'Sophia Patel', email: 'sophia.p@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop', engagement: 'None', risk: 'Churned' },
    plan: 'Standard Pro',
    status: 'Canceled',
    startDate: '10 Feb 2025',
    nextBilling: '-',
    paymentMethod: 'Amex **3412',
    amount: '$85',
    history: 'Voluntary Cancellation (Moved away)',
    lifetimeValue: '$1,105'
  },
  {
    id: 'SUB-1033',
    member: { name: 'Noah Davis', email: 'noah.d@example.com', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop', engagement: 'High (5x/wk)', risk: 'Low' },
    plan: 'VIP Elite',
    status: 'Active',
    startDate: '20 Apr 2026',
    nextBilling: '20 Jun 2026',
    paymentMethod: 'Apple Pay',
    amount: '$150',
    history: 'Direct Sign-up via Web',
    lifetimeValue: '$300'
  },
  {
    id: 'SUB-1034',
    member: { name: 'Acme Corp Wellness', email: 'hr@acmecorp.com', avatar: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=100&auto=format&fit=crop', engagement: 'Mixed', risk: 'Low' },
    plan: 'Corporate Wellness',
    status: 'Active',
    startDate: '01 Nov 2025',
    nextBilling: '01 Jun 2026',
    paymentMethod: 'Wire Transfer',
    amount: '$2,250 (50 seats)',
    history: 'Added 10 seats (Jan 2026)',
    lifetimeValue: '$15,750'
  }
];

export function Subscriptions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Past Due': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Canceled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Active': return <CheckCircle2 size={12} className="mr-1 inline" />;
      case 'Past Due': return <AlertCircle size={12} className="mr-1 inline" />;
      case 'Canceled': return <XCircle size={12} className="mr-1 inline" />;
      default: return null;
    }
  };

  const filteredSubs = mockSubscriptions.filter(sub => {
    const matchesSearch = sub.member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sub.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sub.plan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || sub.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="subscriptions-container animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1>Subscription Ledger & Retention</h1>
          <p className="text-subtitle mt-1">Deep analytics on active memberships, churn risks, LTV, and renewals.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 bg-background border border-stroke px-4 py-2 rounded-xl text-sm font-bold text-title hover:bg-stroke transition-colors">
            <RefreshCcw size={16} /> Sync Stripe
          </button>
          <button className="flex items-center gap-2 bg-primary-lite text-primary border border-primary-border px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-colors">
            <Download size={16} /> Export Deep CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="sub-kpi-card">
          <div className="icon-wrapper bg-green-500/10 text-green-500 mb-2"><Users size={16} /></div>
          <span className="kpi-label">Active Subs</span>
          <h3 className="kpi-value text-xl">2,020</h3>
          <span className="text-[10px] font-bold text-green-500 mt-1 block">+24 this week</span>
        </div>
        
        <div className="sub-kpi-card">
          <div className="icon-wrapper bg-primary-lite text-primary mb-2"><TrendingUp size={16} /></div>
          <span className="kpi-label">Total MRR</span>
          <h3 className="kpi-value text-xl">$141,700</h3>
          <span className="text-[10px] font-bold text-green-500 mt-1 block">+5.2% vs last mo</span>
        </div>

        <div className="sub-kpi-card">
          <div className="icon-wrapper bg-blue-500/10 text-blue-500 mb-2"><ShieldCheck size={16} /></div>
          <span className="kpi-label">Avg LTV</span>
          <h3 className="kpi-value text-xl">$1,250</h3>
          <span className="text-[10px] font-bold text-green-500 mt-1 block">+12% YoY</span>
        </div>

        <div className="sub-kpi-card">
          <div className="icon-wrapper bg-yellow-500/10 text-yellow-500 mb-2"><AlertCircle size={16} /></div>
          <span className="kpi-label">Past Due</span>
          <h3 className="kpi-value text-xl">45</h3>
          <span className="text-[10px] font-bold text-yellow-500 mt-1 block">$3,250 at risk</span>
        </div>

        <div className="sub-kpi-card">
          <div className="icon-wrapper bg-red-500/10 text-red-500 mb-2"><Activity size={16} /></div>
          <span className="kpi-label">Churn (30D)</span>
          <h3 className="kpi-value text-xl">3.2%</h3>
          <span className="text-[10px] font-bold text-green-500 mt-1 block">-0.5% vs last mo</span>
        </div>
      </div>

      {/* Data Table */}
      <div className="sub-table-card">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            {['All', 'Active', 'Past Due', 'Canceled'].map(status => (
              <button 
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                  filterStatus === status ? 'bg-primary text-black' : 'bg-background border border-stroke text-subtitle hover:text-title'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtitle" size={16} />
            <input 
              type="text" 
              placeholder="Search by name, ID, or plan..." 
              className="w-full bg-background border border-stroke rounded-xl pl-9 pr-4 py-2 text-sm font-medium text-title focus:outline-none focus:border-primary transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stroke text-[11px] text-subtitle uppercase tracking-wider">
                <th className="pb-3 font-bold w-1/4">Subscriber & Engagement</th>
                <th className="pb-3 font-bold">Plan & History</th>
                <th className="pb-3 font-bold">Status</th>
                <th className="pb-3 font-bold">Dates</th>
                <th className="pb-3 font-bold text-right">Revenue (Amount / LTV)</th>
                <th className="pb-3 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubs.map((sub, idx) => (
                <tr key={idx} className="border-b border-stroke hover:bg-background transition-colors group">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img src={sub.member.avatar} alt={sub.member.name} className="w-10 h-10 rounded-xl object-cover border border-stroke shadow-sm" />
                      <div>
                        <span className="block font-bold text-title text-sm">{sub.member.name}</span>
                        <span className="block text-xs text-subtitle">{sub.member.email}</span>
                        <span className={`block text-[10px] font-bold uppercase mt-1 ${sub.member.risk === 'High' ? 'text-red-500' : 'text-primary'}`}>
                          <Activity size={10} className="inline mr-1"/> Eng: {sub.member.engagement}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="block font-bold text-title text-sm">{sub.plan}</span>
                    <span className="block text-xs text-subtitle mt-0.5 font-mono">ID: {sub.id}</span>
                    <span className="block text-[10px] text-subtitle mt-1 bg-background border border-stroke rounded px-1.5 py-0.5 w-fit">
                      {sub.history}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border flex w-fit items-center ${getStatusStyle(sub.status)}`}>
                      {getStatusIcon(sub.status)} {sub.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Calendar size={12} className="text-subtitle" />
                      <span className="text-xs font-bold text-title">Next: {sub.nextBilling}</span>
                    </div>
                    <span className="block text-xs text-subtitle pl-4">Started: {sub.startDate}</span>
                  </td>
                  <td className="py-4 text-right">
                    <span className="block font-black text-title text-sm">{sub.amount}</span>
                    <span className="block text-[10px] font-bold text-subtitle uppercase mt-0.5">{sub.paymentMethod}</span>
                    <span className="block text-xs text-primary font-bold mt-1">LTV: {sub.lifetimeValue}</span>
                  </td>
                  <td className="py-4 text-center">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-background border border-stroke rounded-lg hover:bg-primary-lite hover:text-primary transition-colors text-subtitle" title="View Profile">
                        <ExternalLink size={14} />
                      </button>
                      <button className="p-1.5 bg-background border border-stroke rounded-lg hover:bg-primary-lite hover:text-primary transition-colors text-subtitle" title="Manage Subscription">
                        <Settings size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSubs.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-subtitle font-medium">
                    No subscriptions match your search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-stroke">
          <span className="text-sm font-bold text-subtitle">Showing 1-10 of 2,020 Subscriptions</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-background border border-stroke rounded-lg text-sm font-bold text-subtitle hover:text-title hover:bg-stroke disabled:opacity-50">Prev</button>
            <button className="px-3 py-1.5 bg-primary text-black rounded-lg text-sm font-bold">1</button>
            <button className="px-3 py-1.5 bg-background border border-stroke rounded-lg text-sm font-bold text-subtitle hover:text-title hover:bg-stroke">2</button>
            <button className="px-3 py-1.5 bg-background border border-stroke rounded-lg text-sm font-bold text-subtitle hover:text-title hover:bg-stroke">3</button>
            <button className="px-3 py-1.5 bg-background border border-stroke rounded-lg text-sm font-bold text-subtitle hover:text-title hover:bg-stroke">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
