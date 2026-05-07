import { useState } from 'react';
import { ArrowUpDown, Bot, CheckCircle2, Clock, Dumbbell, Filter, Headphones, Megaphone, MessageSquare, Send, Shield, Siren, Sparkles, Zap } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';
import './Support.css';

export function Support({ searchQuery }) {
  const [currentPage, setCurrentPage] = useState(1);

  const metrics = [
    { label: 'Active tickets', value: '142', helper: '28 need review', icon: Headphones, tone: 'blue' },
    { label: 'Avg response', value: '17m', helper: 'Inside 30m SLA', icon: Clock, tone: 'green' },
    { label: 'Escalations', value: '11', helper: 'Infrastructure + billing', icon: Siren, tone: 'red' },
    { label: 'CSAT', value: '94%', helper: '+3 pts this week', icon: Sparkles, tone: 'purple' },
  ];

  const slaQueues = [
    { name: 'Critical hardware', open: 8, sla: '12m left', health: 'at-risk' },
    { name: 'Billing disputes', open: 19, sla: '42m avg', health: 'healthy' },
    { name: 'Trainer onboarding', open: 34, sla: '2h avg', health: 'healthy' },
    { name: 'Library upload issues', open: 7, sla: 'Needs retry', health: 'warning' },
  ];

  const channels = [
    { label: 'In-app chat', volume: 482, solved: '81%' },
    { label: 'Gym owner portal', volume: 126, solved: '74%' },
    { label: 'Email', volume: 98, solved: '69%' },
    { label: 'System alerts', volume: 37, solved: '92%' },
  ];

  const tickets = [
    { id: 'TK-8942', title: 'Hardware Malfunction', desc: 'Biometric turnstiles at Eastside Downtown are failing to authenticate members during evening peak.', priority: 'HIGH PRIORITY', time: '2 mins ago', gym: 'Eastside Fitness', category: 'Infrastructure', status: 'Pending', owner: 'Infra Ops', sla: '18m left', statusColor: 'text-alert' },
    { id: 'TK-8939', title: 'Billing Adjustment', desc: 'Refund request for a seasonal promotion overcharge. Payment log and invoice are attached.', priority: 'NORMAL', time: '45 mins ago', gym: 'PowerHouse Gym', category: 'Financials', status: 'Open', owner: 'Finance Support', sla: '2h left', statusColor: 'text-primary' },
    { id: 'TK-8935', title: 'New Trainer Inquiry', desc: 'Gym owner needs to add a specialized trainer to their Pro directory listing.', priority: 'INFORMATION', time: '2 hours ago', gym: 'Zenith Yoga', category: 'Trainers', status: 'Resolved', owner: 'Partner Success', sla: 'Met', statusColor: 'text-success' },
    { id: 'TK-8928', title: 'Video Upload Failed', desc: 'Coach library upload fails after transcoding step. Asset stuck in review queue.', priority: 'NORMAL', time: '3 hours ago', gym: 'Titanium Fitness', category: 'Library', status: 'Open', owner: 'Content Ops', sla: '5h left', statusColor: 'text-primary' },
  ];

  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    ticket.id.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    ticket.gym.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    ticket.desc.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  return (
    <div className="support-page animate-fade-in">
      <section className="support-hero" id="support-overview">
        <div>
          <span className="support-kicker"><MessageSquare size={14} /> Support command center</span>
          <h1 className="page-title">Aura Support</h1>
          <p className="page-subtitle">Manage tickets, broadcasts, SLA risk, escalations, and customer health across gyms, trainers, and trainees.</p>
        </div>
        <button className="btn-dispatch support-hero-btn"><Megaphone size={16} /><span>New Broadcast</span></button>
      </section>

      <section className="support-stats-row" id="support-sla">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="card stat-card support-metric-card">
              <div className={`support-metric-icon ${metric.tone}`}><Icon size={18} /></div>
              <div className="stat-label">{metric.label}</div>
              <div className="stat-value">{metric.value}</div>
              <div className="stat-trend success"><span>{metric.helper}</span></div>
            </div>
          );
        })}
      </section>

      <section className="support-insights-grid" id="support-queues">
        <div className="card support-panel">
          <div className="support-panel-header"><span><Shield size={14} /> SLA queues</span><h3>Response Risk</h3></div>
          <div className="support-queue-list">
            {slaQueues.map((queue) => (
              <div className="support-queue-row" key={queue.name}>
                <div><strong>{queue.name}</strong><small>{queue.open} open tickets</small></div>
                <span className={queue.health}>{queue.sla}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card support-panel">
          <div className="support-panel-header"><span><Bot size={14} /> AI triage</span><h3>Automation Assist</h3></div>
          <div className="support-ai-box">
            <strong>71 tickets auto-classified today</strong>
            <p>Billing and infrastructure tickets are being routed automatically with suggested replies and linked account context.</p>
            <button className="btn-action-outline"><Zap size={14} /> Review Rules</button>
          </div>
        </div>
        <div className="card support-panel">
          <div className="support-panel-header"><span><CheckCircle2 size={14} /> Channels</span><h3>Resolution Mix</h3></div>
          <div className="channel-list">
            {channels.map((channel) => (
              <div className="channel-row" key={channel.label}>
                <strong>{channel.label}</strong>
                <span>{channel.volume} cases</span>
                <em>{channel.solved} solved</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="support-grid" id="support-tickets">
        <div className="support-main">
          <div className="card tickets-card animate-slide-up delay-3">
            <div className="tickets-header">
              <h3 className="section-title">Incoming Support Tickets</h3>
              <div className="tickets-actions">
                <button className="btn-action-outline"><Filter size={14} /><span>Filter</span></button>
                <button className="btn-action-outline"><ArrowUpDown size={14} /><span>Sort</span></button>
              </div>
            </div>

            <div className="tickets-list">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="ticket-item">
                  <div className="ticket-top">
                    <div className="ticket-meta-header">
                      <span className={`priority-badge ${ticket.priority.toLowerCase().replace(' ', '-')}`}>{ticket.priority}</span>
                      <span className="ticket-id">#{ticket.id} - {ticket.title}</span>
                    </div>
                    <span className="ticket-time">{ticket.time}</span>
                  </div>
                  <p className="ticket-desc">"{ticket.desc}"</p>
                  <div className="ticket-footer">
                    <div className="footer-meta">
                      <div className="meta-item"><Dumbbell size={14} /><span>{ticket.gym}</span></div>
                      <div className="meta-item"><MessageSquare size={14} /><span>{ticket.category}</span></div>
                      <div className="meta-item"><Clock size={14} /><span>{ticket.sla}</span></div>
                      <div className="meta-item"><span className={`status-dot ${ticket.statusColor}`} /><span>{ticket.status} by {ticket.owner}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Pagination totalItems={142} itemsPerPage={10} currentPage={currentPage} onPageChange={setCurrentPage} label="tickets" />
          </div>
        </div>

        <aside className="support-sidebar" id="support-broadcasts">
          <div className="card broadcast-card animate-slide-up delay-4">
            <div className="card-header-simple">
              <Megaphone className="text-primary" size={20} />
              <h3 className="section-title">System Broadcast</h3>
            </div>
            <p className="section-desc">Send push notifications, dashboard alerts, and email updates to targeted platform audiences.</p>
            <div className="broadcast-form">
              <div className="form-group"><label>Broadcast title</label><input type="text" placeholder="e.g., Scheduled Maintenance" /></div>
              <div className="form-grid-mini">
                <div className="form-group"><label>Send to</label><select className="form-select"><option>Gym Owners, Trainers, Trainees</option></select></div>
                <div className="form-group"><label>Priority</label><select className="form-select"><option>Normal</option><option>Critical</option></select></div>
              </div>
              <div className="form-group"><label>Notification content</label><textarea placeholder="Type your message here..." rows={4} className="full-width-textarea" /></div>
              <button className="btn-dispatch"><Send size={16} /><span>Dispatch Broadcast</span></button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
