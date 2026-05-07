import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  Database,
  Edit2,
  Filter,
  History,
  MessageSquare,
  Pause,
  Play,
  Plus,
  Save,
  Settings,
  Share2,
  Trash2,
  X,
  Zap,
} from 'lucide-react';
import { createPortal } from 'react-dom';
import { Badge } from '../../components/ui/Badge';
import { Pagination } from '../../components/ui/Pagination';
import './Workflow.css';

const typeIcons = {
  Communication: MessageSquare,
  Retention: Activity,
  Financial: Database,
  Infrastructure: Settings,
  Marketing: Bell,
  Business: Zap,
};

const workflowTemplates = [
  {
    id: 'WF-001',
    name: 'Member Onboarding Sequence',
    trigger: 'New Subscription',
    actions: 4,
    executions: 1240,
    successRate: 99.2,
    status: 'ACTIVE',
    type: 'Communication',
    lastRun: '2 mins ago',
    description: 'Automatically sends welcome email, gym orientation invite, and profile setup guide to new members.',
    audience: 'New members during their first 24 hours',
    goal: 'Make the first visit feel guided, personal, and friction-free.',
    channels: ['Email', 'Push', 'Manager task'],
    impact: 'Cuts first-week support tickets by 31% and lifts class booking by 18%.',
    owner: 'Member Success',
    avgLatency: '18ms',
    nextRun: 'On next paid subscription',
    steps: [
      { title: 'Confirm the subscription', detail: 'Checks payment status, membership tier, home gym, and profile completeness before any message is sent.' },
      { title: 'Send the welcome email', detail: 'Delivers a friendly welcome with login links, app setup, and what the member should do first.' },
      { title: 'Invite them to orientation', detail: 'Creates an orientation booking prompt based on gym capacity and trainer availability.' },
      { title: 'Create a manager follow-up', detail: 'Adds a light-touch task so staff can greet high-value members on their first visit.' },
    ],
    timeline: ['Welcome email delivered', 'Push invite queued', 'Manager task created'],
  },
  {
    id: 'WF-002',
    name: 'Low Engagement Alert',
    trigger: 'No login > 7 days',
    actions: 2,
    executions: 450,
    successRate: 98.5,
    status: 'ACTIVE',
    type: 'Retention',
    lastRun: '45 mins ago',
    description: 'Triggers a push notification and assigns a task to the club manager to call the member.',
    audience: 'Members who are quietly drifting away',
    goal: 'Catch churn early with a human follow-up while the member still remembers the habit.',
    channels: ['Push', 'CRM task'],
    impact: 'Recovers 9.4% of inactive members within 72 hours.',
    owner: 'Retention Ops',
    avgLatency: '24ms',
    nextRun: 'Every morning at 8:00',
    steps: [
      { title: 'Find silent members', detail: 'Looks for active subscriptions with no app login, gate entry, or class booking for more than seven days.' },
      { title: 'Start a warm nudge', detail: 'Sends a personalized push notification and creates a call task for the member owner.' },
    ],
    timeline: ['284 members scanned', '18 nudges sent', '6 manager tasks opened'],
  },
  {
    id: 'WF-003',
    name: 'Subscription Renewal Notice',
    trigger: 'Expiring in 3 days',
    actions: 3,
    executions: 890,
    successRate: 100,
    status: 'ACTIVE',
    type: 'Financial',
    lastRun: '1 hr ago',
    description: 'Sends automated reminder emails and generates a discount code for early renewal.',
    audience: 'Members close to renewal',
    goal: 'Reduce accidental churn and make renewal feel simple.',
    channels: ['Email', 'SMS', 'Billing'],
    impact: 'Improves on-time renewal by 22% for monthly memberships.',
    owner: 'Revenue Ops',
    avgLatency: '31ms',
    nextRun: 'Hourly renewal sweep',
    steps: [
      { title: 'Check expiry windows', detail: 'Finds subscriptions ending in three days and skips members already renewed or cancelled.' },
      { title: 'Generate the offer', detail: 'Creates an eligible discount code when the member qualifies for early renewal incentives.' },
      { title: 'Send renewal reminders', detail: 'Sends the right message through email and SMS with direct payment links.' },
    ],
    timeline: ['71 subscriptions checked', '49 reminders sent', '12 renewals attributed'],
  },
  {
    id: 'WF-004',
    name: 'Hardware Offline Emergency',
    trigger: 'Biometric Disconnect',
    actions: 5,
    executions: 12,
    successRate: 75.0,
    status: 'PAUSED',
    type: 'Infrastructure',
    lastRun: '2 days ago',
    description: 'Immediate alert to IT team and failsafe unlock of emergency exits if turnstiles lose power.',
    audience: 'Operations, IT, and on-site gym teams',
    goal: 'Keep access control incidents visible and safe.',
    channels: ['Ops alert', 'IT ticket', 'Access control'],
    impact: 'Reduces average hardware incident response time from 42 minutes to 11 minutes.',
    owner: 'Infrastructure',
    avgLatency: '44ms',
    nextRun: 'Paused until hardware rule review',
    steps: [
      { title: 'Detect offline hardware', detail: 'Watches biometric devices and turnstiles for missed heartbeats or disconnect events.' },
      { title: 'Classify the severity', detail: 'Checks whether the device controls entry, exit, or emergency access before escalating.' },
      { title: 'Alert the right team', detail: 'Notifies local managers and IT with the gym, device ID, and suggested first action.' },
      { title: 'Open a service ticket', detail: 'Creates an incident record with logs and assigns ownership automatically.' },
      { title: 'Apply failsafe rules', detail: 'Queues emergency unlock procedures only when the configured safety policy allows it.' },
    ],
    timeline: ['Device heartbeat missed', 'Ticket HW-219 opened', 'Failsafe rule skipped'],
  },
  {
    id: 'WF-005',
    name: 'Gym Lead Auto-Responder',
    trigger: 'Inquiry Form Submit',
    actions: 1,
    executions: 2100,
    successRate: 99.8,
    status: 'ACTIVE',
    type: 'Marketing',
    lastRun: 'Just now',
    description: 'Sends instant WhatsApp message with membership brochure to interested prospects.',
    audience: 'New prospects who ask about memberships',
    goal: 'Respond while intent is hot and route serious leads to sales.',
    channels: ['WhatsApp'],
    impact: 'Cuts lead response time from 3h to under 10s.',
    owner: 'Growth',
    avgLatency: '9ms',
    nextRun: 'On next inquiry form submit',
    steps: [
      { title: 'Reply instantly', detail: 'Sends the correct brochure and pricing CTA based on the gym location selected in the form.' },
    ],
    timeline: ['Lead received', 'WhatsApp sent', 'Sales source tagged'],
  },
  {
    id: 'WF-006',
    name: 'High Revenue Milestone',
    trigger: 'Revenue > $50k',
    actions: 2,
    executions: 45,
    successRate: 100,
    status: 'ACTIVE',
    type: 'Business',
    lastRun: '4 hrs ago',
    description: 'Notifies executive board and adds a badge of excellence to the gyms directory listing.',
    audience: 'Executive team and gym operators',
    goal: 'Celebrate high performers and keep leadership aware of momentum.',
    channels: ['Executive alert', 'Directory badge'],
    impact: 'Makes revenue wins visible without manual reporting.',
    owner: 'Business Ops',
    avgLatency: '15ms',
    nextRun: 'Daily revenue close',
    steps: [
      { title: 'Verify revenue milestone', detail: 'Compares verified net revenue against the milestone threshold after refunds and adjustments.' },
      { title: 'Broadcast the win', detail: 'Notifies leadership and applies a visible badge to the gym directory listing.' },
    ],
    timeline: ['$52.8k verified revenue', 'Board alert delivered', 'Directory badge applied'],
  },
];

export function Workflow({ searchQuery }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWF, setSelectedWF] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [automations, setAutomations] = useState(workflowTemplates);

  useEffect(() => {
    if (!isDrawerOpen) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isDrawerOpen]);

  const filteredAutomations = useMemo(() => {
    const query = (searchQuery || '').toLowerCase();
    return automations.filter((wf) =>
      wf.name.toLowerCase().includes(query) ||
      wf.id.toLowerCase().includes(query) ||
      wf.trigger.toLowerCase().includes(query) ||
      wf.type.toLowerCase().includes(query) ||
      wf.goal.toLowerCase().includes(query)
    );
  }, [automations, searchQuery]);

  const handleEdit = (wf) => {
    setSelectedWF({ ...wf, steps: [...wf.steps], channels: [...wf.channels], timeline: [...wf.timeline] });
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    setAutomations((prev) => prev.map((a) => (a.id === selectedWF.id ? selectedWF : a)));
    setIsDrawerOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this automation? This action cannot be undone.')) {
      setAutomations((prev) => prev.filter((a) => a.id !== id));
      if (selectedWF?.id === id) setIsDrawerOpen(false);
    }
  };

  const stats = [
    { label: 'Active Workflows', value: '24', icon: <Zap size={20} />, color: 'blue', trend: '+2 this week' },
    { label: 'Total Executions', value: '184.2K', icon: <Activity size={20} />, color: 'green', trend: '99.9% uptime' },
    { label: 'Failed Steps', value: '12', icon: <AlertCircle size={20} />, color: 'red', trend: '-5 from yesterday' },
    { label: 'Time Saved', value: '1,240h', icon: <Clock size={20} />, color: 'teal', trend: 'Est. this month' },
  ];

  return (
    <div className="workflow-page animate-fade-in">
      <div className="workflow-hero" id="workflow-overview">
        <div className="workflow-hero-copy">
          <span className="workflow-kicker"><Zap size={14} /> Automation cockpit</span>
          <h1 className="page-title">Workflow Automation</h1>
          <p className="page-subtitle">Understand what every automation does, why it runs, who it touches, and whether it is healthy.</p>
        </div>
        <button className="btn-primary workflow-create-btn">
          <Plus size={18} />
          <span>Create Automation</span>
        </button>
      </div>

      <div className="workflow-stats-grid">
        {stats.map((stat, i) => (
          <div key={stat.label} className="workflow-stat-card card animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className={`stat-icon-wrap ${stat.color}`}>{stat.icon}</div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-trend">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="workflow-playbook">
        {filteredAutomations.slice(0, 3).map((wf) => {
          const TypeIcon = typeIcons[wf.type] || Zap;
          return (
            <button key={wf.id} className="workflow-play-card" onClick={() => handleEdit(wf)}>
              <span className="play-card-icon"><TypeIcon size={18} /></span>
              <span className="play-card-content">
                <strong>{wf.name}</strong>
                <small>{wf.goal}</small>
              </span>
              <ArrowRight size={16} />
            </button>
          );
        })}
      </div>

      <div className="workflow-filters card animate-slide-up delay-4">
        <div className="filter-row">
          <div className="filter-group">
            <button className="filter-btn"><Filter size={16} /><span>All Types</span><ChevronDown size={14} /></button>
            <button className="filter-btn"><span>All Triggers</span><ChevronDown size={14} /></button>
            <button className="filter-btn"><span>Sort: Recent</span><ChevronDown size={14} /></button>
          </div>
          <div className="divider" />
          <div className="view-options">
            <Badge variant="success">Engine v2.4 Active</Badge>
            <span className="filter-hint">{filteredAutomations.length} automations ready to inspect</span>
          </div>
        </div>
      </div>

      <div className="workflow-table-container card animate-slide-up delay-5" id="workflow-table">
        <div className="workflow-table-scroll">
          <table className="directory-table workflow-table">
            <thead>
              <tr>
                <th>AUTOMATION</th>
                <th>TYPE</th>
                <th>TRIGGER</th>
                <th>WHAT IT DOES</th>
                <th>SUCCESS</th>
                <th>LAST RUN</th>
                <th>STATUS</th>
                <th className="text-right">MANAGE</th>
              </tr>
            </thead>
            <tbody>
              {filteredAutomations.map((wf) => {
                const TypeIcon = typeIcons[wf.type] || Zap;
                return (
                  <tr key={wf.id} onClick={() => handleEdit(wf)} className="workflow-row">
                    <td>
                      <div className="wf-identity">
                        <h4 className="wf-name">{wf.name}</h4>
                        <span className="wf-id">#{wf.id} • {wf.owner}</span>
                      </div>
                    </td>
                    <td>
                      <div className="wf-type-cell">
                        <TypeIcon size={14} />
                        <span>{wf.type}</span>
                      </div>
                    </td>
                    <td><span className="trigger-tag">{wf.trigger}</span></td>
                    <td>
                      <p className="wf-table-purpose">{wf.goal}</p>
                    </td>
                    <td>
                      <div className="success-rate-box">
                        <div className="rate-bar">
                          <div className="rate-fill" style={{ width: `${wf.successRate}%` }} />
                        </div>
                        <span>{wf.successRate}%</span>
                      </div>
                    </td>
                    <td className="text-subtitle text-xs">{wf.lastRun}</td>
                    <td><Badge variant={wf.status === 'ACTIVE' ? 'success' : 'neutral'}>{wf.status}</Badge></td>
                    <td className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="wf-actions-group">
                        <button className="btn-icon-sm" title={wf.status === 'ACTIVE' ? 'Pause' : 'Resume'} onClick={() => {
                          setAutomations((prev) => prev.map((a) => (a.id === wf.id ? { ...a, status: a.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : a)));
                        }}>
                          {wf.status === 'ACTIVE' ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                        <button className="btn-icon-sm" title="Inspect and edit" onClick={() => handleEdit(wf)}><Edit2 size={14} /></button>
                        <button className="btn-icon-sm delete" title="Delete" onClick={() => handleDelete(wf.id)}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination totalItems={filteredAutomations.length} itemsPerPage={10} currentPage={currentPage} onPageChange={setCurrentPage} label="workflows" />
      </div>

      {typeof document !== 'undefined' && createPortal(
        <div className={`wf-drawer-overlay ${isDrawerOpen ? 'open' : ''}`} onClick={() => setIsDrawerOpen(false)}>
        <aside className="wf-drawer" aria-label="Workflow details" onClick={(e) => e.stopPropagation()}>
          {selectedWF && (
            <>
              <div className="drawer-header">
                <div className="header-info">
                  <span className="wf-id-badge">#{selectedWF.id}</span>
                  <h3 className="drawer-title">{selectedWF.name}</h3>
                  <p>{selectedWF.goal}</p>
                </div>
                <button className="close-btn" onClick={() => setIsDrawerOpen(false)}><X size={20} /></button>
              </div>

              <div className="drawer-body">
                <div className="automation-brief">
                  <div className="brief-main">
                    <span className="brief-label">Plain English</span>
                    <p>{selectedWF.description}</p>
                  </div>
                  <div className={`brief-health ${selectedWF.successRate >= 90 ? 'healthy' : 'attention'}`}>
                    {selectedWF.successRate >= 90 ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <strong>{selectedWF.successRate}%</strong>
                    <span>success</span>
                  </div>
                </div>

                <div className="drawer-grid">
                  <div className="info-tile">
                    <span>Trigger</span>
                    <strong>{selectedWF.trigger}</strong>
                  </div>
                  <div className="info-tile">
                    <span>Audience</span>
                    <strong>{selectedWF.audience}</strong>
                  </div>
                  <div className="info-tile">
                    <span>Next run</span>
                    <strong>{selectedWF.nextRun}</strong>
                  </div>
                  <div className="info-tile">
                    <span>Impact</span>
                    <strong>{selectedWF.impact}</strong>
                  </div>
                </div>

                <div className="drawer-section">
                  <label>Automation Name</label>
                  <input
                    type="text"
                    value={selectedWF.name}
                    onChange={(e) => setSelectedWF({ ...selectedWF, name: e.target.value })}
                    className="drawer-input"
                  />
                </div>

                <div className="drawer-section">
                  <label>Description</label>
                  <textarea
                    value={selectedWF.description}
                    onChange={(e) => setSelectedWF({ ...selectedWF, description: e.target.value })}
                    className="drawer-textarea"
                    rows={3}
                  />
                </div>

                <div className="grid-2">
                  <div className="drawer-section">
                    <label>Trigger Event</label>
                    <select
                      value={selectedWF.trigger}
                      onChange={(e) => setSelectedWF({ ...selectedWF, trigger: e.target.value })}
                      className="drawer-select"
                    >
                      <option>New Subscription</option>
                      <option>No login &gt; 7 days</option>
                      <option>Expiring in 3 days</option>
                      <option>Biometric Disconnect</option>
                      <option>Inquiry Form Submit</option>
                      <option>Revenue &gt; $50k</option>
                    </select>
                  </div>
                  <div className="drawer-section">
                    <label>Workflow Type</label>
                    <select
                      value={selectedWF.type}
                      onChange={(e) => setSelectedWF({ ...selectedWF, type: e.target.value })}
                      className="drawer-select"
                    >
                      <option>Communication</option>
                      <option>Retention</option>
                      <option>Financial</option>
                      <option>Infrastructure</option>
                      <option>Marketing</option>
                      <option>Business</option>
                    </select>
                  </div>
                </div>

                <div className="drawer-section">
                  <div className="section-header-row">
                    <label>Workflow Steps ({selectedWF.steps.length})</label>
                    <button className="text-btn"><Plus size={14} /> Add Step</button>
                  </div>
                  <div className="steps-list">
                    {selectedWF.steps.map((step, i) => (
                      <div key={`${step.title}-${i}`} className="step-item">
                        <div className="step-number">{i + 1}</div>
                        <div className="step-content">
                          <p className="step-title">{step.title}</p>
                          <p className="step-desc">{step.detail}</p>
                        </div>
                        <ArrowRight size={14} className="text-subtitle" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="drawer-split">
                  <div className="drawer-section">
                    <label>Channels</label>
                    <div className="channel-list">
                      {selectedWF.channels.map((channel) => <span key={channel}>{channel}</span>)}
                    </div>
                  </div>
                  <div className="drawer-section">
                    <label>Recent Run</label>
                    <div className="timeline-list">
                      {selectedWF.timeline.map((item) => (
                        <div key={item} className="timeline-item">
                          <CheckCircle2 size={14} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="drawer-section">
                  <label>Execution Stats (Last 30D)</label>
                  <div className="mini-stats-grid">
                    <div className="mini-stat">
                      <span className="m-val">{selectedWF.executions.toLocaleString()}</span>
                      <span className="m-label">Runs</span>
                    </div>
                    <div className="mini-stat">
                      <span className="m-val">{selectedWF.successRate}%</span>
                      <span className="m-label">Success</span>
                    </div>
                    <div className="mini-stat">
                      <span className="m-val">{selectedWF.avgLatency}</span>
                      <span className="m-label">Avg Latency</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="drawer-footer">
                <div className="footer-left">
                  <button className="btn-footer-icon delete" title="Delete" onClick={() => handleDelete(selectedWF.id)}><Trash2 size={18} /></button>
                  <button className="btn-footer-icon" title="Share"><Share2 size={18} /></button>
                  <button className="btn-footer-icon" title="Duplicate"><Copy size={18} /></button>
                  <button className="btn-footer-icon" title="History"><History size={18} /></button>
                </div>
                <div className="footer-right">
                  <button className="btn-secondary" onClick={() => setIsDrawerOpen(false)}>Cancel</button>
                  <button className="btn-primary" onClick={handleSave}><Save size={16} /> <span>Save Changes</span></button>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>,
        document.body
      )}
    </div>
  );
}
