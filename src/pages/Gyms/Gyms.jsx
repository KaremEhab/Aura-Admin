import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Power, ExternalLink, Globe, MapPin, Activity, Shield, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';
import './Gyms.css';

export function Gyms({ searchQuery }) {
  const [viewType, setViewType] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  
  const chains = [
    { name: 'Titanium Fitness', branches: 12, members: '15.4k', growth: '+8.2%' },
    { name: 'Iron Forge', branches: 8, members: '9.2k', growth: '+5.4%' },
    { name: 'Zenith Athletics', branches: 7, members: '11.8k', growth: '+12.1%' }
  ];

  const gymData = [
    { 
      id: 'GP-7721', 
      name: 'Apex Performance Hub', 
      tier: 'ELITE PERFORMANCE', 
      owner: 'Marcus Sterling', 
      location: 'Los Angeles, CA', 
      status: 'Active', 
      revenue: '$184,200', 
      active: true,
      capacity: '85%',
      equipmentHealth: 98,
      staffCount: 24,
      classesWeekly: 45,
      financials: {
        revenue: 184200,
        expenses: 112000,
        profit: 72200,
        arpu: 142
      }
    },
    { 
      id: 'GP-1092', 
      name: 'Iron Sanctuary NYC', 
      tier: 'STANDARD KINETIC', 
      owner: 'Elena Rodriguez', 
      location: 'New York, NY', 
      status: 'Pending', 
      revenue: '$0', 
      active: true,
      capacity: '0%',
      equipmentHealth: 100,
      staffCount: 12,
      classesWeekly: 0,
      financials: {
        revenue: 0,
        expenses: 45000,
        profit: -45000,
        arpu: 0
      }
    },
    { 
      id: 'GP-3304', 
      name: 'Velocity Lab', 
      tier: 'ELITE PERFORMANCE', 
      owner: 'Sarah Jenkins', 
      location: 'Austin, TX', 
      status: 'Suspended', 
      revenue: '$64,500', 
      active: false,
      capacity: '42%',
      equipmentHealth: 72,
      staffCount: 18,
      classesWeekly: 32,
      financials: {
        revenue: 64500,
        expenses: 58000,
        profit: 6500,
        arpu: 118
      }
    }
  ];

  const filteredGyms = gymData.filter(gym => 
    gym.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    gym.id.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    gym.location.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  return (
    <div className="gyms-page animate-fade-in">
      <div className="gyms-header">
        <h1 className="page-title">Aura Gyms</h1>
        <p className="page-subtitle">Manage and monitor the global network of AURA.FIT high-performance facilities.</p>
      </div>

      <div className="gyms-stats-grid">
        <div className="health-card animate-slide-up delay-1">
          <div className="card-label-top">
            <span className="label-text">NETWORK HEALTH</span>
            <span className="live-badge">LIVE MONITORING</span>
          </div>
          <h2 className="health-title">Active Growth Phase</h2>
          <div className="health-stats-row">
            <div className="h-stat-item">
              <span className="h-val">142</span>
              <span className="h-label">Total Facilities</span>
            </div>
            <div className="h-stat-item">
              <span className="h-val">89%</span>
              <span className="h-label">Peak Utilization</span>
            </div>
            <div className="h-stat-item">
              <span className="h-val">$4.2M</span>
              <span className="h-label">Monthly Recurring</span>
            </div>
          </div>
        </div>

        <div className="tier-card animate-slide-up delay-2">
          <span className="label-text">TIER DISTRIBUTION</span>
          <div className="tier-item">
            <div className="tier-info">
              <span className="tier-name">Elite Performance</span>
              <span className="tier-count">42</span>
            </div>
            <div className="tier-progress">
              <div className="progress-fill elite" style={{ width: '42%' }}></div>
            </div>
          </div>
          <div className="tier-item">
            <div className="tier-info">
              <span className="tier-name">Standard Kinetic</span>
              <span className="tier-count">100</span>
            </div>
            <div className="tier-progress">
              <div className="progress-fill kinetic" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* New Financials Overview Row */}
      <div className="gyms-financials-row animate-slide-up delay-3">
        <div className="financial-stat-card card">
          <div className="f-icon-wrap green"><Activity size={20} /></div>
          <div className="f-info">
            <span className="f-label">Global Net Margin</span>
            <span className="f-value">32.4%</span>
            <span className="f-trend positive">+2.1% this month</span>
          </div>
        </div>
        <div className="financial-stat-card card">
          <div className="f-icon-wrap blue"><Users size={20} /></div>
          <div className="f-info">
            <span className="f-label">Avg Revenue Per Member</span>
            <span className="f-value">$124.50</span>
            <span className="f-trend positive">High efficiency</span>
          </div>
        </div>
        <div className="financial-stat-card card">
          <div className="f-icon-wrap purple"><Shield size={20} /></div>
          <div className="f-info">
            <span className="f-label">Operational Efficiency</span>
            <span className="f-value">94%</span>
            <span className="f-trend positive">Optimized</span>
          </div>
        </div>
      </div>

      <div className="gyms-analytics-row">
        <div className="analytics-card animate-slide-up delay-4">
          <div className="card-header-flex">
            <h3 className="card-title-md">Top 5 Gym Chains by Scale</h3>
            <span className="full-report-link">Full Report <ExternalLink size={14} /></span>
          </div>
          <div className="overflow-x-auto">
            <table className="chains-table">
              <thead>
                <tr>
                  <th>GYM CHAIN</th>
                  <th>BRANCHES</th>
                  <th>MEMBERS</th>
                  <th>GROWTH</th>
                </tr>
              </thead>
              <tbody>
                {chains.map((chain, i) => (
                  <tr key={i}>
                    <td>{chain.name}</td>
                    <td>{chain.branches}</td>
                    <td>{chain.members}</td>
                    <td className="growth-positive">{chain.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="highlights-card animate-slide-up delay-4">
          <div className="highlight-item">
            <span className="highlight-label">Biggest Gym by Footprint</span>
            <span className="highlight-val">Titanium Grand Central</span>
            <span className="highlight-sub">45,000 sq ft • Chicago, IL</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-label">Newest Facility Launched</span>
            <span className="highlight-val">Pulse Fitness Arena</span>
            <span className="highlight-sub">Opening June 2024 • Miami, FL</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-label">Most Members Enrolled</span>
            <span className="highlight-val">Ironclad Strength Center</span>
            <span className="highlight-sub">3,200 Active Members • Dallas, TX</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-label">Most Diverse Class Offerings</span>
            <span className="highlight-val">Fusion Wellness Club</span>
            <span className="highlight-sub">50+ Classes Weekly • Seattle, WA</span>
          </div>
        </div>
      </div>

      <div className="gyms-filter-bar card animate-slide-up delay-5">
        <div className="filter-controls">
          <span className="filter-label">Filter By:</span>
          <button className="filter-select-mini">All Status <ChevronDown size={14} /></button>
          <button className="filter-select-mini">All Regions <ChevronDown size={14} /></button>
          <button className="filter-select-mini">All Tiers <ChevronDown size={14} /></button>
        </div>
      </div>

      <div className="gyms-table-container animate-slide-up delay-6">
        <div className="overflow-x-auto">
          <table className="gym-main-table min-w-[1200px]">
            <thead>
              <tr>
                <th>GYM ID</th>
                <th>NAME & TIER</th>
                <th>OWNER</th>
                <th>LOCATION</th>
                <th>STATS</th>
                <th>FINANCIALS</th>
                <th>STATUS</th>
                <th>KILL SWITCH</th>
              </tr>
            </thead>
            <tbody>
              {filteredGyms.map((gym, i) => (
                <tr key={i} className={`gym-row ${gym.status.toLowerCase()}`}>
                  <td className="gym-id-cell whitespace-nowrap">{gym.id}</td>
                  <td className="name-tier-cell whitespace-nowrap">
                    <span className="gym-name-val">{gym.name}</span>
                    <span className={`gym-tier-tag ${gym.tier.includes('ELITE') ? 'elite' : 'kinetic'}`}>{gym.tier}</span>
                  </td>
                  <td className="whitespace-nowrap">{gym.owner}</td>
                  <td className="whitespace-nowrap">{gym.location}</td>
                  <td className="whitespace-nowrap">
                    <div className="gym-mini-stats">
                      <span title="Capacity"><Users size={12} /> {gym.capacity}</span>
                      <span title="Equipment Health"><Activity size={12} /> {gym.equipmentHealth}%</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="gym-financial-summary">
                      <span className="rev-val">${gym.financials.revenue.toLocaleString()}</span>
                      <span className={`profit-val ${gym.financials.profit >= 0 ? 'pos' : 'neg'}`}>
                        {gym.financials.profit >= 0 ? '+' : ''}${gym.financials.profit.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <span className={`status-chip ${gym.status.toLowerCase()}`}>
                      <div className="dot" /> {gym.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap">
                    <button className={`kill-switch-btn ${gym.active ? 'active' : ''}`}>
                      <Power size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <Pagination 
          totalItems={filteredGyms.length}
          itemsPerPage={8}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          label="gyms"
        />
      </div>
    </div>
  );
}

