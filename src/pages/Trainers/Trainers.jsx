import { useState } from 'react';
import { Award, BadgeCheck, BarChart3, CheckCircle, ChevronDown, Clock, ExternalLink, MapPin, PowerOff, RefreshCcw, Search, Settings, Shield, Star, TrendingUp, Users, Wallet } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Pagination } from '../../components/ui/Pagination';
import './Trainers.css';

const getStatusVariant = (status) => {
  switch (status.toUpperCase()) {
    case 'ACTIVE': return 'success';
    case 'SUSPENDED': return 'danger';
    case 'PENDING': return 'warning';
    default: return 'neutral';
  }
};

const getActionIcon = (status) => {
  switch (status.toUpperCase()) {
    case 'ACTIVE': return <PowerOff size={16} />;
    case 'SUSPENDED': return <RefreshCcw size={16} />;
    case 'PENDING': return <CheckCircle size={16} />;
    default: return <Settings size={16} />;
  }
};

export function Trainers({ searchQuery }) {
  const [currentPage, setCurrentPage] = useState(1);

  const stats = [
    { label: 'Total coaches', value: '1,248', helper: '+12 this week', icon: Users, tone: 'blue' },
    { label: 'Network revenue', value: '$842.5K', helper: '+18.2%', icon: Wallet, tone: 'green' },
    { label: 'Avg rating', value: '4.85', helper: 'Top tier', icon: Star, tone: 'yellow' },
    { label: 'Pending reviews', value: '24', helper: 'Needs action', icon: Clock, tone: 'purple' },
  ];

  const verification = [
    { stage: 'Identity verified', count: 1184, pct: 95 },
    { stage: 'Certificates checked', count: 1072, pct: 86 },
    { stage: 'Insurance uploaded', count: 924, pct: 74 },
    { stage: 'Profile media complete', count: 842, pct: 67 },
  ];

  const specialties = [
    { name: 'Strength', coaches: 392, demand: 'High' },
    { name: 'Rehabilitation', coaches: 118, demand: 'Shortage' },
    { name: 'Yoga & Mobility', coaches: 214, demand: 'Stable' },
    { name: 'Nutrition coaching', coaches: 86, demand: 'Growing' },
  ];

  const trainerData = [
    { id: 'PT-9921', name: 'Marcus Sterling', specialty: 'Bodybuilding & Strength', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop', status: 'ACTIVE', revenue: 12400, trainees: 42, rating: 4.9, city: 'Cairo', retention: '91%' },
    { id: 'PT-1042', name: 'Elena Rodriguez', specialty: 'Yoga & Mindfulness', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop', status: 'ACTIVE', revenue: 8200.5, trainees: 28, rating: 5.0, city: 'Giza', retention: '94%' },
    { id: 'PT-3304', name: 'Sarah Jenkins', specialty: 'HIIT & Athletics', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop', status: 'PENDING', revenue: 0, trainees: 0, rating: 0, city: 'Alexandria', retention: 'New' },
    { id: 'PT-4412', name: 'David Chen', specialty: 'Rehabilitation', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop', status: 'SUSPENDED', revenue: 3400, trainees: 15, rating: 4.7, city: 'Cairo', retention: '78%' },
  ];

  const filtered = trainerData.filter((trainer) =>
    trainer.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    trainer.id.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    trainer.specialty.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  return (
    <div className="trainers-page animate-fade-in">
      <section className="trainers-hero" id="trainers-overview">
        <div>
          <span className="trainer-kicker"><Award size={14} /> Coach marketplace operations</span>
          <h1 className="page-title">Personal Trainers</h1>
          <p className="page-subtitle">Verify coaches, monitor performance, manage marketplace quality, track revenue, and spot specialty demand gaps.</p>
        </div>
        <button className="btn-primary-sm"><Award size={16} /><span>Verify New Trainer</span></button>
      </section>

      <section className="trainers-stats-grid" id="trainers-performance">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div className="trainer-stat-card card" key={stat.label}>
              <div className={`stat-icon-wrap ${stat.tone}`}><Icon size={20} /></div>
              <div className="stat-info"><span className="stat-label">{stat.label}</span><span className="stat-value">{stat.value}</span></div>
              <div className="stat-trend positive">{stat.helper}</div>
            </div>
          );
        })}
      </section>

      <section className="trainer-insights-grid" id="trainers-verification">
        <div className="card trainer-panel">
          <div className="trainer-panel-header"><span><Shield size={14} /> Verification</span><h3>Trust Pipeline</h3></div>
          {verification.map((item) => (
            <div className="trainer-progress-row" key={item.stage}>
              <div><strong>{item.stage}</strong><span>{item.count} coaches</span></div>
              <div className="trainer-progress"><span style={{ width: `${item.pct}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="card trainer-panel">
          <div className="trainer-panel-header"><span><BarChart3 size={14} /> Marketplace demand</span><h3>Specialty Coverage</h3></div>
          {specialties.map((item) => (
            <div className="specialty-row" key={item.name}><strong>{item.name}</strong><span>{item.coaches} coaches</span><em>{item.demand}</em></div>
          ))}
        </div>
        <div className="card trainer-panel">
          <div className="trainer-panel-header"><span><TrendingUp size={14} /> Growth notes</span><h3>Owner Signals</h3></div>
          <div className="trainer-note-list">
            <p><BadgeCheck size={15} /> Rehab coaches are under-supplied in Cairo by 34%.</p>
            <p><MapPin size={15} /> Alexandria has the fastest PT conversion growth this month.</p>
            <p><Star size={15} /> Coaches with intro videos convert 2.3x better.</p>
          </div>
        </div>
      </section>

      <section className="trainers-filter-hub card animate-slide-up delay-5">
        <div className="filter-controls">
          <div className="search-mini"><Search size={16} /><input type="text" placeholder="Search trainers by name or ID..." /></div>
          <div className="vertical-divider" />
          <div className="filter-selects">
            <button className="filter-select-mini">Specialty <ChevronDown size={14} /></button>
            <button className="filter-select-mini">Status <ChevronDown size={14} /></button>
            <button className="filter-select-mini">City <ChevronDown size={14} /></button>
          </div>
        </div>
      </section>

      <section className="trainers-table-container animate-slide-up delay-6" id="trainers-directory">
        <div className="table-responsive">
          <table className="directory-table">
            <thead><tr><th>COACH IDENTITY</th><th>SPECIALTY</th><th>CITY</th><th>TRAINEES</th><th>RETENTION</th><th>REVENUE</th><th>STATUS</th><th className="text-right">ACTIONS</th></tr></thead>
            <tbody>
              {filtered.map((trainer) => (
                <tr key={trainer.id}>
                  <td><div className="trainer-identity"><img src={trainer.image} alt={trainer.name} className="trainer-img" /><div className="trainer-info-meta"><h4>{trainer.name}</h4><div className="trainer-id-rating"><span className="t-id">#{trainer.id}</span>{trainer.rating > 0 && <span className="t-rating"><Star size={10} fill="var(--warning)" color="var(--warning)" /> {trainer.rating}</span>}</div></div></div></td>
                  <td className="whitespace-nowrap"><span className="specialty-tag">{trainer.specialty}</span></td>
                  <td className="whitespace-nowrap"><span className="city-cell">{trainer.city}</span></td>
                  <td className="whitespace-nowrap"><div className="trainee-count-cell"><Users size={14} /><span>{trainer.trainees}</span></div></td>
                  <td className="whitespace-nowrap"><span className="retention-pill">{trainer.retention}</span></td>
                  <td className="whitespace-nowrap"><span className="trainer-revenue">${trainer.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></td>
                  <td className="whitespace-nowrap"><Badge variant={getStatusVariant(trainer.status)}>{trainer.status}</Badge></td>
                  <td className="text-right whitespace-nowrap"><div className="action-group"><button className="btn-action-ghost" title="View Profile"><ExternalLink size={16} /></button><button className={`btn-action btn-${trainer.status.toLowerCase()}`}>{getActionIcon(trainer.status)}</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination totalItems={1248} itemsPerPage={8} currentPage={currentPage} onPageChange={setCurrentPage} label="coaches" />
      </section>
    </div>
  );
}
