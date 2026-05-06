import React from 'react';
import { GMVChart } from './components/GMVChart';
import { SystemAlerts } from './components/SystemAlerts';
import { StatCards } from './components/StatCards';
import { ApprovalsList } from './components/ApprovalsList';
import { GymDirectoryTable } from './components/GymDirectoryTable';
import { BusinessStats } from './components/BusinessStats';
import { QuickActions } from './components/QuickActions';
import { SystemEvents } from './components/SystemEvents';
import { dashboardData } from './mockData';
import './Dashboard.css';

export function Dashboard({ searchQuery }) {
  return (
    <div className="dashboard">
      <div className="dashboard-header-text" style={{ marginTop: '12px' }}>
        <h1 className="page-title">Aura Dashboard</h1>
        <p className="page-subtitle">Global administrative oversight for AURA.FIT infrastructure and revenue streams.</p>
      </div>

      <div className="flex flex-col gap-6 w-full mt-4">
        {/* Row 0: One-click Critical Actions */}
        <div className="animate-slide-up">
          <QuickActions />
        </div>

        {/* Row 1: Analytics & System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-slide-up delay-2">
          <div className="lg:col-span-8">
            <GMVChart data={dashboardData.gmv} />
          </div>
          <div className="lg:col-span-4">
            <SystemEvents />
          </div>
        </div>

        {/* Row 2: Key Performance Metrics */}
        <div className="animate-slide-up delay-1">
          <BusinessStats stats={dashboardData.stats.business} />
        </div>

        {/* Row 3: Infrastructure Pulse */}
        <div className="w-full animate-slide-up delay-3">
          <StatCards stats={dashboardData.stats.infrastructure} />
        </div>

        {/* Row 4: Operational Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6 animate-slide-up delay-4">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <ApprovalsList approvals={dashboardData.approvals} />
            <SystemAlerts alerts={dashboardData.alerts} />
          </div>
          <div className="lg:col-span-3">
            <GymDirectoryTable 
              directory={dashboardData.directory} 
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
