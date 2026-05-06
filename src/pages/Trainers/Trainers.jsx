import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Power, ExternalLink, Globe, MapPin, Activity, Shield, Users, PowerOff, RefreshCcw, CheckCircle, Settings, Award, Star, TrendingUp, Clock } from 'lucide-react';
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

const getActionTitle = (status) => {
  switch (status.toUpperCase()) {
    case 'ACTIVE': return 'Suspend Access';
    case 'SUSPENDED': return 'Reactivate';
    case 'PENDING': return 'Approve Trainer';
    default: return 'Manage';
  }
};

export function Trainers() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const trainerData = [
    { id: 'PT-9921', name: 'Marcus Sterling', specialty: 'Bodybuilding & Strength', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop', status: 'ACTIVE', revenue: 12400.00, trainees: 42, rating: 4.9 },
    { id: 'PT-1042', name: 'Elena Rodriguez', specialty: 'Yoga & Mindfulness', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop', status: 'ACTIVE', revenue: 8200.50, trainees: 28, rating: 5.0 },
    { id: 'PT-3304', name: 'Sarah Jenkins', specialty: 'HIIT & Athletics', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop', status: 'PENDING', revenue: 0, trainees: 0, rating: 0 },
    { id: 'PT-4412', name: 'David Chen', specialty: 'Rehabilitation', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop', status: 'SUSPENDED', revenue: 3400.00, trainees: 15, rating: 4.7 }
  ];

  return (
    <div className="trainers-page animate-fade-in">
      <div className="trainers-header">
        <h1 className="page-title">Personal Trainers</h1>
        <p className="page-subtitle">Oversee Aura's elite coaching network, verify certifications, and monitor performance.</p>
      </div>

      <div className="trainers-stats-grid">
        <div className="trainer-stat-card card animate-slide-up delay-1">
          <div className="stat-icon-wrap blue">
            <Users size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Coaches</span>
            <span className="stat-value">1,248</span>
          </div>
          <div className="stat-trend positive">+12 this week</div>
        </div>

        <div className="trainer-stat-card card animate-slide-up delay-2">
          <div className="stat-icon-wrap green">
            <TrendingUp size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Network Revenue</span>
            <span className="stat-value">$842.5k</span>
          </div>
          <div className="stat-trend positive">+18.2%</div>
        </div>

        <div className="trainer-stat-card card animate-slide-up delay-3">
          <div className="stat-icon-wrap yellow">
            <Star size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Avg. Rating</span>
            <span className="stat-value">4.85</span>
          </div>
          <div className="stat-trend neutral">Top Tier</div>
        </div>

        <div className="trainer-stat-card card animate-slide-up delay-4">
          <div className="stat-icon-wrap purple">
            <Clock size={20} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Pending Reviews</span>
            <span className="stat-value">24</span>
          </div>
          <div className="stat-trend warning">Action required</div>
        </div>
      </div>

      <div className="trainers-filter-hub card animate-slide-up delay-5">
        <div className="filter-controls">
          <div className="search-mini">
            <Search size={16} />
            <input type="text" placeholder="Search trainers by name or ID..." />
          </div>
          <div className="vertical-divider" />
          <div className="filter-selects">
            <button className="filter-select-mini">Specialty <ChevronDown size={14} /></button>
            <button className="filter-select-mini">Status <ChevronDown size={14} /></button>
          </div>
        </div>
        <button className="btn-primary-sm">
          <Award size={16} />
          <span>Verify New Trainer</span>
        </button>
      </div>

      <div className="trainers-table-container animate-slide-up delay-6">
        <div className="table-responsive">
          <table className="directory-table">
            <thead>
              <tr>
                <th>COACH IDENTITY</th>
                <th>SPECIALTY</th>
                <th>TRAINEES</th>
                <th>REVENUE</th>
                <th>STATUS</th>
                <th className="text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {trainerData.map(trainer => (
                <tr key={trainer.id}>
                  <td>
                    <div className="trainer-identity">
                      <img src={trainer.image} alt={trainer.name} className="trainer-img" />
                      <div className="trainer-info-meta">
                        <h4>{trainer.name}</h4>
                        <div className="trainer-id-rating">
                          <span className="t-id">#{trainer.id}</span>
                          {trainer.rating > 0 && (
                            <span className="t-rating"><Star size={10} fill="var(--warning)" color="var(--warning)" /> {trainer.rating}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <span className="specialty-tag">{trainer.specialty}</span>
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="trainee-count-cell">
                      <Users size={14} />
                      <span>{trainer.trainees}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <span className="trainer-revenue">
                      ${trainer.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="whitespace-nowrap">
                    <Badge variant={getStatusVariant(trainer.status)}>{trainer.status}</Badge>
                  </td>
                  <td className="text-right whitespace-nowrap">
                    <div className="action-group">
                      <button className="btn-action-ghost" title="View Profile">
                        <ExternalLink size={16} />
                      </button>
                      <button 
                        className={`btn-action btn-${trainer.status.toLowerCase()}`} 
                        title={getActionTitle(trainer.status)}
                      >
                        {getActionIcon(trainer.status)}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <Pagination 
          totalItems={1248}
          itemsPerPage={8}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          label="coaches"
        />
      </div>
    </div>
  );
}
