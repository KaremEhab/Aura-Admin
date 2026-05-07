import { Activity, AlertTriangle, ArrowUpRight, Bot, Building2, Clock, CreditCard, MapPin, ShieldCheck, Sparkles, Users, Zap } from 'lucide-react';
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

const commandMetrics = [
  { label: 'Gyms online', value: '128', detail: '7 added this month', icon: Building2, tone: 'blue' },
  { label: 'Members active today', value: '18.4K', detail: '+12% vs yesterday', icon: Users, tone: 'green' },
  { label: 'Payments captured', value: '$42.8K', detail: 'Fawry success 98.7%', icon: CreditCard, tone: 'teal' },
  { label: 'Risk queue', value: '9', detail: 'Needs owner review', icon: AlertTriangle, tone: 'red' },
];

const growthSignals = [
  { city: 'Cairo', gyms: 54, revenue: '$168K', momentum: '+18%', fill: '82%' },
  { city: 'Alexandria', gyms: 21, revenue: '$61K', momentum: '+9%', fill: '58%' },
  { city: 'Giza', gyms: 18, revenue: '$44K', momentum: '+14%', fill: '66%' },
];

const automationPulse = [
  { name: 'Member onboarding', status: 'Healthy', runs: '1,240', saved: '84h' },
  { name: 'Renewal reminders', status: 'Healthy', runs: '890', saved: '61h' },
  { name: 'Hardware offline', status: 'Review', runs: '12', saved: '3h' },
];

const attentionItems = [
  { title: '3 gyms waiting for verification', detail: 'Media, tax ID, and owner identity are ready for final review.', icon: ShieldCheck },
  { title: 'Peak capacity in Nasr City', detail: 'Class slots are 91% full between 6 PM and 9 PM.', icon: Clock },
  { title: 'Trainer response time improved', detail: 'Average lead reply time dropped to 7 minutes.', icon: Zap },
];

export function Dashboard({ searchQuery }) {
  return (
    <div className="dashboard">
      <div className="dashboard-header-text" style={{ marginTop: '12px' }}>
        <h1 className="page-title">Aura Dashboard</h1>
        <p className="page-subtitle">Global administrative oversight for AURA.FIT infrastructure and revenue streams.</p>
      </div>

      <div className="flex flex-col gap-6 w-full mt-4">
        <div className="dashboard-command-center animate-slide-up" id="top">
          <div className="command-copy">
            <span className="dashboard-kicker"><Sparkles size={14} /> Live operator brief</span>
            <h2>Today across the Aura network</h2>
            <p>Track gyms, subscriptions, payments, automations, and risk from one control room.</p>
          </div>
          <div className="command-metrics-grid">
            {commandMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div className="command-metric" key={metric.label}>
                  <span className={`command-metric-icon ${metric.tone}`}><Icon size={18} /></span>
                  <div>
                    <small>{metric.label}</small>
                    <strong>{metric.value}</strong>
                    <p>{metric.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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

        <div className="dashboard-insights-grid animate-slide-up delay-2" id="dashboard-insights">
          <div className="card market-card">
            <div className="dashboard-card-header">
              <div>
                <span className="dashboard-card-eyebrow"><MapPin size={14} /> Market heat</span>
                <h3>City Growth Signals</h3>
              </div>
              <button className="dashboard-ghost-btn">Open Map <ArrowUpRight size={14} /></button>
            </div>
            <div className="city-signal-list">
              {growthSignals.map((city) => (
                <div className="city-signal" key={city.city}>
                  <div className="city-row">
                    <strong>{city.city}</strong>
                    <span>{city.momentum}</span>
                  </div>
                  <div className="city-meta">
                    <span>{city.gyms} gyms</span>
                    <span>{city.revenue} revenue</span>
                  </div>
                  <div className="city-bar"><span style={{ width: city.fill }} /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="card automation-card">
            <div className="dashboard-card-header">
              <div>
                <span className="dashboard-card-eyebrow"><Bot size={14} /> Workflow engine</span>
                <h3>Automation Pulse</h3>
              </div>
              <span className="engine-status"><Activity size={13} /> v2.4 live</span>
            </div>
            <div className="automation-pulse-list">
              {automationPulse.map((item) => (
                <div className="automation-pulse-row" key={item.name}>
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.runs} runs this month</small>
                  </div>
                  <span className={item.status === 'Healthy' ? 'pulse-healthy' : 'pulse-review'}>{item.status}</span>
                  <em>{item.saved} saved</em>
                </div>
              ))}
            </div>
          </div>

          <div className="card attention-card">
            <div className="dashboard-card-header">
              <div>
                <span className="dashboard-card-eyebrow"><AlertTriangle size={14} /> Needs attention</span>
                <h3>Operator Notes</h3>
              </div>
            </div>
            <div className="attention-list">
              {attentionItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div className="attention-item" key={item.title}>
                    <span><Icon size={16} /></span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 3: Infrastructure Pulse */}
        <div className="w-full animate-slide-up delay-3">
          <StatCards stats={dashboardData.stats.infrastructure} />
        </div>

        {/* Row 4: Operational Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6 animate-slide-up delay-4" id="dashboard-directory">
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
