import React from 'react';
import { Database, Zap, Cloud, Users } from 'lucide-react';
import './StatCards.css';

export function StatCards({ stats }) {
  return (
    <div className="stat-cards-container">
      {/* Supabase DB */}
      <div className="card stat-card">
        <div className="stat-header">
          <Database size={16} className="stat-icon" />
          <span>SUPABASE DB</span>
        </div>
        <div className="stat-value-group">
          <span className="stat-value">{stats.supabase.size}</span>
          <span className="stat-label">TOTAL SIZE</span>
        </div>
        <div className="stat-progress-container">
          <div className="stat-progress-bar">
            <div className="stat-progress-fill" style={{ width: `${stats.supabase.usage}%` }}></div>
          </div>
          <div className="stat-progress-labels">
            <span>{stats.supabase.usage}% Usage</span>
            <span>{stats.supabase.provisioned}</span>
          </div>
        </div>
      </div>

      {/* Edge Functions */}
      <div className="card stat-card">
        <div className="stat-header">
          <Zap size={16} className="stat-icon" />
          <span>EDGE FUNCTIONS</span>
        </div>
        <div className="stat-value-group">
          <span className="stat-value">{stats.edgeFunctions.invocations}</span>
          <span className="stat-label">TOTAL INVOCATIONS</span>
        </div>
        <div className="stat-footer">
          <TrendingIcon />
          <span className="text-primary">{stats.edgeFunctions.avgLatency} Latency</span>
        </div>
      </div>

      {/* Cloudflare R2 */}
      <div className="card stat-card">
        <div className="stat-header">
          <Cloud size={16} className="stat-icon" />
          <span>CLOUDFLARE R2</span>
        </div>
        <div className="stat-value-group">
          <span className="stat-value">{stats.cloudflare.egress}</span>
          <span className="stat-label">MEDIA EGRESS</span>
        </div>
        <div className="stat-footer">
          <span className="text-primary">{stats.cloudflare.cacheEfficiency}% Cache Efficiency</span>
        </div>
      </div>

      {/* System Health */}
      <div className="card stat-card">
        <div className="stat-header">
          <Zap size={16} className="stat-icon" />
          <span>SYSTEM HEALTH</span>
        </div>
        <div className="stat-value-group">
          <span className="stat-value">{stats.systemHealth.uptime}</span>
          <span className="stat-label">PLATFORM UPTIME</span>
        </div>
        <div className="stat-footer">
          <span className="status-dot"></span>
          <span>Error Rate: {stats.systemHealth.errorRate}</span>
        </div>
      </div>
    </div>
  );
}

function TrendingIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
      <polyline points="16 7 22 7 22 13"></polyline>
    </svg>
  );
}
