import { useState } from 'react';
import { Activity, CheckCircle, ChevronDown, CreditCard, ExternalLink, Flame, HeartPulse, PowerOff, RefreshCcw, Search, Settings, Sparkles, TrendingUp, Users, Clock } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Pagination } from '../../components/ui/Pagination';
import './Trainees.css';

const getStatusVariant = (status) => {
  switch (status.toUpperCase()) {
    case 'ACTIVE': return 'success';
    case 'SUSPENDED':
    case 'EXPIRED': return 'danger';
    case 'PENDING': return 'warning';
    default: return 'neutral';
  }
};

const getActionIcon = (status) => {
  switch (status.toUpperCase()) {
    case 'ACTIVE': return <PowerOff size={16} />;
    case 'SUSPENDED':
    case 'EXPIRED': return <RefreshCcw size={16} />;
    case 'PENDING': return <CheckCircle size={16} />;
    default: return <Settings size={16} />;
  }
};

export function Trainees({ searchQuery }) {
  const [currentPage, setCurrentPage] = useState(1);

  const stats = [
    { label: 'Total members', value: '24,812', helper: '+186 this week', icon: Users, tone: 'blue' },
    { label: 'Active subs', value: '21,340', helper: '85.9% retention', icon: CreditCard, tone: 'green' },
    { label: 'Aura direct', value: '6,420', helper: '+340 this month', icon: Sparkles, tone: 'yellow' },
    { label: 'Expiring soon', value: '312', helper: 'Within 7 days', icon: Clock, tone: 'purple' },
  ];

  const lifecycle = [
    { label: 'Trials', value: 1320, pct: 22 },
    { label: 'Activated', value: 18420, pct: 74 },
    { label: 'At-risk', value: 1840, pct: 18 },
    { label: 'Renewed', value: 9210, pct: 61 },
  ];

  const segments = [
    { name: 'High value gym members', count: '4,812', note: 'Spend > $400/year' },
    { name: 'Direct app subscribers', count: '6,420', note: 'No gym attached' },
    { name: 'No workout in 10 days', count: '1,184', note: 'Retention workflow ready' },
    { name: 'PT matched members', count: '3,906', note: '+14% conversion' },
  ];

  const traineeData = [
    { 
      id: 'TR-4401', 
      name: 'Ahmed Khalil', 
      plan: 'Elite 12-Month', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop', 
      status: 'ACTIVE', 
      source: 'GYM', 
      gym: 'Apex Performance Hub', 
      coach: 'Marcus Sterling', 
      joinDate: 'Jan 15, 2026', 
      spent: 2400, 
      engagement: '92%', 
      risk: 'Low',
      financials: {
        ltv: 2400,
        lastPayment: 200,
        nextBilling: 'Feb 15, 2026',
        billingStatus: 'HEALTHY'
      }
    },
    { 
      id: 'TR-4402', 
      name: 'Lina Morales', 
      plan: 'Standard Monthly', 
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop', 
      status: 'ACTIVE', 
      source: 'GYM', 
      gym: 'Iron Sanctuary NYC', 
      coach: 'Elena Rodriguez', 
      joinDate: 'Mar 02, 2026', 
      spent: 780, 
      engagement: '81%', 
      risk: 'Low',
      financials: {
        ltv: 780,
        lastPayment: 65,
        nextBilling: 'Apr 02, 2026',
        billingStatus: 'HEALTHY'
      }
    },
    { 
      id: 'TR-4403', 
      name: 'Omar Hassan', 
      plan: 'Elite 6-Month', 
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop', 
      status: 'EXPIRED', 
      source: 'PT', 
      gym: 'Velocity Lab', 
      coach: 'Sarah Jenkins', 
      joinDate: 'Aug 20, 2025', 
      spent: 1200, 
      engagement: '22%', 
      risk: 'High',
      financials: {
        ltv: 1200,
        lastPayment: 200,
        nextBilling: 'Expired',
        billingStatus: 'FAILED'
      }
    },
    { 
      id: 'TR-4404', 
      name: 'Sofia Nguyen', 
      plan: 'Trial - 14 Days', 
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop', 
      status: 'PENDING', 
      source: 'DIRECT', 
      gym: null, 
      coach: null, 
      joinDate: 'Apr 28, 2026', 
      spent: 0, 
      engagement: 'New', 
      risk: 'Medium',
      financials: {
        ltv: 0,
        lastPayment: 0,
        nextBilling: 'May 12, 2026',
        billingStatus: 'TRIAL'
      }
    },
    { 
      id: 'TR-4405', 
      name: "James O'Brien", 
      plan: 'Standard Monthly', 
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop', 
      status: 'SUSPENDED', 
      source: 'GYM', 
      gym: 'Titanium Fitness', 
      coach: 'David Chen', 
      joinDate: 'Nov 10, 2025', 
      spent: 560, 
      engagement: '36%', 
      risk: 'High',
      financials: {
        ltv: 560,
        lastPayment: 80,
        nextBilling: 'Paused',
        billingStatus: 'PAUSED'
      }
    },
    { 
      id: 'TR-4406', 
      name: 'Nadia El-Amin', 
      plan: 'Aura Direct Monthly', 
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop', 
      status: 'ACTIVE', 
      source: 'DIRECT', 
      gym: null, 
      coach: null, 
      joinDate: 'Apr 12, 2026', 
      spent: 49.99, 
      engagement: '68%', 
      risk: 'Medium',
      financials: {
        ltv: 49.99,
        lastPayment: 49.99,
        nextBilling: 'May 12, 2026',
        billingStatus: 'HEALTHY'
      }
    },
  ];

  const filtered = traineeData.filter((trainee) =>
    trainee.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    trainee.id.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    (trainee.gym || '').toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  return (
    <div className="trainees-page animate-fade-in">
      <section className="trainees-hero" id="trainees-overview">
        <div>
          <span className="trainee-kicker"><HeartPulse size={14} /> Member lifecycle center</span>
          <h1 className="page-title">Trainees</h1>
          <p className="page-subtitle">Track subscriptions, engagement, churn risk, renewal windows, gym assignment, PT matching, and member revenue.</p>
        </div>
        <button className="btn-primary-sm"><Users size={16} /><span>Add Member</span></button>
      </section>

      <section className="trainees-stats-grid" id="trainees-engagement">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return <div className="trainee-stat-card card" key={stat.label}><div className={`stat-icon-wrap ${stat.tone}`}><Icon size={20} /></div><div className="stat-info"><span className="stat-label">{stat.label}</span><span className="stat-value">{stat.value}</span></div><div className="stat-trend positive">{stat.helper}</div></div>;
        })}
      </section>

      <section className="trainee-insights-grid" id="trainees-lifecycle">
        <div className="card trainee-panel">
          <div className="trainee-panel-header"><span><Activity size={14} /> Lifecycle funnel</span><h3>Conversion Health</h3></div>
          {lifecycle.map((item) => <div className="lifecycle-row" key={item.label}><div><strong>{item.label}</strong><span>{item.value.toLocaleString()} members</span></div><div className="lifecycle-bar"><span style={{ width: `${item.pct}%` }} /></div></div>)}
        </div>
        <div className="card trainee-panel">
          <div className="trainee-panel-header"><span><Flame size={14} /> Segments</span><h3>Actionable Groups</h3></div>
          {segments.map((item) => <div className="segment-row" key={item.name}><div><strong>{item.name}</strong><span>{item.note}</span></div><em>{item.count}</em></div>)}
        </div>
        <div className="card trainee-panel">
          <div className="trainee-panel-header"><span><TrendingUp size={14} /> Owner signals</span><h3>Growth & Retention</h3></div>
          <div className="trainee-note-list">
            <p><Sparkles size={15} /> Direct subscribers convert best after 3 saved workouts.</p>
            <p><Clock size={15} /> 312 renewals need contact before the weekend.</p>
            <p><CreditCard size={15} /> Annual plans lift LTV by 2.8x compared with monthly.</p>
          </div>
        </div>
      </section>

      <section className="trainees-filter-hub card animate-slide-up delay-5">
        <div className="filter-controls">
          <div className="search-mini"><Search size={16} /><input type="text" placeholder="Search members by name, ID, or gym..." /></div>
          <div className="vertical-divider" />
          <div className="filter-selects"><button className="filter-select-mini">Source <ChevronDown size={14} /></button><button className="filter-select-mini">Plan <ChevronDown size={14} /></button><button className="filter-select-mini">Status <ChevronDown size={14} /></button><button className="filter-select-mini">Risk <ChevronDown size={14} /></button></div>
        </div>
      </section>

      <section className="trainees-table-container animate-slide-up delay-6" id="trainees-directory">
        <div className="table-responsive">
          <div className="overflow-x-auto">
            <table className="directory-table min-w-[1200px]">
              <thead>
                <tr>
                  <th>MEMBER</th>
                  <th>ASSIGNMENT</th>
                  <th>ENGAGEMENT</th>
                  <th>FINANCIALS</th>
                  <th>STATUS</th>
                  <th className="text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((trainee) => (
                  <tr key={trainee.id}>
                    <td className="whitespace-nowrap">
                      <div className="trainee-identity">
                        <img src={trainee.image} alt={trainee.name} className="trainee-img" />
                        <div className="trainee-info-meta">
                          <h4>{trainee.name}</h4>
                          <span className="t-id">#{trainee.id}</span>
                          <span className={`plan-tag ${trainee.plan.includes('Elite') || trainee.plan.includes('Aura Direct') ? 'elite' : trainee.plan.includes('Trial') ? 'trial' : 'standard'}`}>{trainee.plan}</span>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="assignment-cell">
                        <span className="gym-name">{trainee.gym || 'No Gym'}</span>
                        <span className="coach-name">{trainee.coach || 'No Coach'}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="engagement-cell">
                        <div className="eng-row">
                          <span className="engagement-pill">{trainee.engagement}</span>
                          <span className={`risk-pill risk-${trainee.risk.toLowerCase()}`}>{trainee.risk}</span>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="trainee-financials">
                        <span className="ltv-val">LTV: ${trainee.financials.ltv.toLocaleString()}</span>
                        <div className="billing-summary">
                          <span className="billing-label">Next:</span>
                          <span className="billing-date">{trainee.financials.nextBilling}</span>
                          <div className={`status-dot-mini ${trainee.financials.billingStatus.toLowerCase() === 'healthy' ? 'green' : trainee.financials.billingStatus.toLowerCase() === 'trial' ? 'purple' : 'red'}`} />
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap"><Badge variant={getStatusVariant(trainee.status)}>{trainee.status}</Badge></td>
                    <td className="text-right whitespace-nowrap"><div className="action-group"><button className="btn-action-ghost" title="View Profile"><ExternalLink size={16} /></button><button className={`btn-action btn-${trainee.status.toLowerCase()}`}>{getActionIcon(trainee.status)}</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination totalItems={24812} itemsPerPage={10} currentPage={currentPage} onPageChange={setCurrentPage} label="members" />
      </section>
    </div>
  );
}

