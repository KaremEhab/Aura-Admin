import React, { useState } from 'react';
import { Server, Database, Wifi, Shield, Activity, HardDrive, Cpu, MemoryStick, Globe, ExternalLink, RefreshCcw, Zap, ArrowUpRight } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Pagination } from '../../components/ui/Pagination';
import './Infrastructure.css';

export function Infrastructure({ searchQuery }) {
  const [refreshing, setRefreshing] = useState(false);
  const [currentPageServices, setCurrentPageServices] = useState(1);
  const [currentPageDB, setCurrentPageDB] = useState(1);

  const systemStatus = [
    { name: 'API Gateway', status: 'OPERATIONAL', uptime: '99.98%', latency: '42ms', region: 'US-East', icon: <Globe size={18} /> },
    { name: 'Auth Service', status: 'OPERATIONAL', uptime: '99.99%', latency: '18ms', region: 'US-East', icon: <Shield size={18} /> },
    { name: 'Payment Engine', status: 'DEGRADED', uptime: '99.84%', latency: '156ms', region: 'EU-West', icon: <Zap size={18} /> },
    { name: 'Media CDN', status: 'OPERATIONAL', uptime: '100%', latency: '8ms', region: 'Global', icon: <Wifi size={18} /> },
    { name: 'Notification Hub', status: 'OPERATIONAL', uptime: '99.97%', latency: '31ms', region: 'US-West', icon: <Activity size={18} /> },
    { name: 'Analytics Pipeline', status: 'MAINTENANCE', uptime: '98.20%', latency: '—', region: 'US-East', icon: <Database size={18} /> },
  ];

  const dbMetrics = [
    { name: 'Firestore (Primary)', type: 'NoSQL', size: '248 GB', reads: '1.2M/hr', writes: '340K/hr', connections: 842, status: 'HEALTHY' },
    { name: 'PostgreSQL (Analytics)', type: 'SQL', size: '1.4 TB', reads: '680K/hr', writes: '120K/hr', connections: 214, status: 'HEALTHY' },
    { name: 'Redis Cache', type: 'In-Memory', size: '32 GB', reads: '4.8M/hr', writes: '2.1M/hr', connections: 1024, status: 'HEALTHY' },
    { name: 'Elasticsearch', type: 'Search', size: '86 GB', reads: '520K/hr', writes: '45K/hr', connections: 96, status: 'WARNING' },
  ];

  const filteredServices = systemStatus.filter(s => 
    s.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    s.region.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  const filteredDBs = dbMetrics.filter(db => 
    db.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    db.type.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  const getStatusVariant = (status) => {
    switch (status.toUpperCase()) {
      case 'OPERATIONAL': case 'HEALTHY': case 'RESOLVED': return 'success';
      case 'DEGRADED': case 'WARNING': case 'INVESTIGATING': return 'warning';
      case 'DOWN': case 'CRITICAL': case 'HIGH': return 'danger';
      case 'MAINTENANCE': case 'PLANNED': case 'LOW': case 'MEDIUM': return 'neutral';
      default: return 'neutral';
    }
  };

  const overallHealth = systemStatus.filter(s => s.status === 'OPERATIONAL').length;
  const totalServices = systemStatus.length;

  return (
    <div className="infra-page animate-fade-in">
      <div className="infra-header">
        <div>
          <h1 className="page-title">Infrastructure</h1>
          <p className="page-subtitle">Real-time system health, database performance, and incident tracking.</p>
        </div>
      </div>

      <div className={`health-banner card animate-slide-up delay-1 ${overallHealth === totalServices ? 'all-clear' : 'has-issues'}`}>
        <div className="health-banner-left">
          <div className={`health-dot ${overallHealth === totalServices ? 'green' : 'yellow'}`} />
          <div>
            <h3 className="health-banner-title">
              {overallHealth === totalServices ? 'All Systems Operational' : 'Partial System Degradation'}
            </h3>
            <p className="health-banner-sub">
              {overallHealth}/{totalServices} services healthy — Last checked 30s ago
            </p>
          </div>
        </div>
        <button className="btn-refresh" onClick={() => setRefreshing(!refreshing)}>
          <RefreshCcw size={16} className={refreshing ? 'spin' : ''} />
          Refresh
        </button>
      </div>

      <div className="infra-stats-grid">
        <div className="infra-stat-card card animate-slide-up delay-1">
          <div className="stat-icon-wrap green"><Cpu size={20} /></div>
          <div className="stat-info"><span className="stat-label">CPU Usage</span><span className="stat-value">34%</span></div>
          <div className="usage-bar"><div className="usage-fill green" style={{ width: '34%' }} /></div>
        </div>
        <div className="infra-stat-card card animate-slide-up delay-2">
          <div className="stat-icon-wrap blue"><MemoryStick size={20} /></div>
          <div className="stat-info"><span className="stat-label">Memory</span><span className="stat-value">12.4 / 32 GB</span></div>
          <div className="usage-bar"><div className="usage-fill blue" style={{ width: '39%' }} /></div>
        </div>
        <div className="infra-stat-card card animate-slide-up delay-3">
          <div className="stat-icon-wrap yellow"><HardDrive size={20} /></div>
          <div className="stat-info"><span className="stat-label">Storage</span><span className="stat-value">1.8 / 4 TB</span></div>
          <div className="usage-bar"><div className="usage-fill yellow" style={{ width: '45%' }} /></div>
        </div>
        <div className="infra-stat-card card animate-slide-up delay-4">
          <div className="stat-icon-wrap purple"><Activity size={20} /></div>
          <div className="stat-info"><span className="stat-label">Bandwidth</span><span className="stat-value">842 Mbps</span></div>
          <div className="stat-trend positive"><ArrowUpRight size={12} /> 12% headroom</div>
        </div>
      </div>

      <div className="infra-section card animate-slide-up delay-5 overflow-hidden">
        <div className="section-header p-4 pb-0">
          <h3 className="section-title"><Server size={18} /> Service Status</h3>
          <span className="live-indicator"><span className="pulse-dot" /> Live</span>
        </div>
        <div className="table-responsive">
          <div className="overflow-x-auto">
            <table className="directory-table min-w-[800px]">
              <thead>
                <tr>
                  <th>SERVICE</th>
                  <th>STATUS</th>
                  <th>UPTIME (30D)</th>
                  <th>LATENCY</th>
                  <th>REGION</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service, i) => (
                  <tr key={i}>
                    <td>
                      <div className="service-identity">
                        <div className={`service-icon ${service.status === 'OPERATIONAL' ? 'ok' : service.status === 'DEGRADED' ? 'warn' : 'maint'}`}>
                          {service.icon}
                        </div>
                        <span className="service-name whitespace-nowrap">{service.name}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap"><Badge variant={getStatusVariant(service.status)}>{service.status}</Badge></td>
                    <td className="uptime-cell whitespace-nowrap">{service.uptime}</td>
                    <td className={`latency-cell whitespace-nowrap ${parseInt(service.latency) > 100 ? 'high' : ''}`}>{service.latency}</td>
                    <td className="region-cell whitespace-nowrap">{service.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination 
          totalItems={filteredServices.length}
          itemsPerPage={10}
          currentPage={currentPageServices}
          onPageChange={setCurrentPageServices}
          label="services"
        />
      </div>

      <div className="infra-section card animate-slide-up delay-6 overflow-hidden mt-6">
        <div className="section-header p-4 pb-0">
          <h3 className="section-title"><Database size={18} /> Database Performance</h3>
          <button className="btn-secondary-sm">View Queries <ExternalLink size={14} /></button>
        </div>
        <div className="table-responsive">
          <div className="overflow-x-auto">
            <table className="directory-table min-w-[900px]">
              <thead>
                <tr>
                  <th>DATABASE</th>
                  <th>TYPE</th>
                  <th>SIZE</th>
                  <th>READS/HR</th>
                  <th>WRITES/HR</th>
                  <th>CONNECTIONS</th>
                  <th>HEALTH</th>
                </tr>
              </thead>
              <tbody>
                {filteredDBs.map((db, i) => (
                  <tr key={i}>
                    <td className="db-name whitespace-nowrap">{db.name}</td>
                    <td className="whitespace-nowrap"><span className="type-tag">{db.type}</span></td>
                    <td className="mono-cell whitespace-nowrap">{db.size}</td>
                    <td className="mono-cell whitespace-nowrap">{db.reads}</td>
                    <td className="mono-cell whitespace-nowrap">{db.writes}</td>
                    <td className="mono-cell whitespace-nowrap">{db.connections.toLocaleString()}</td>
                    <td className="whitespace-nowrap"><Badge variant={getStatusVariant(db.status)}>{db.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination 
          totalItems={filteredDBs.length}
          itemsPerPage={5}
          currentPage={currentPageDB}
          onPageChange={setCurrentPageDB}
          label="databases"
        />
      </div>
    </div>
  );
}
