import React, { useState } from 'react';
import { Filter, ArrowUpDown, MessageSquare, Megaphone, Shield, Clock, Activity, ExternalLink, Send, Dumbbell } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';
import './Support.css';

export function Support({ searchQuery }) {
  const [currentPage, setCurrentPage] = useState(1);
  const tickets = [
    { id: 'TK-8942', title: 'Hardware Malfunction', desc: 'The biometric turnstiles at the Eastside Downtown location are failing to authenticate members...', priority: 'HIGH PRIORITY', time: '2 mins ago', gym: 'Eastside Fitness', category: 'Infrastructure', status: 'Pending', statusColor: 'text-alert' },
    { id: 'TK-8939', title: 'Billing Adjustment', desc: 'Need to refund a member who was overcharged during the seasonal promotion period...', priority: 'NORMAL', time: '45 mins ago', gym: 'PowerHouse Gym', category: 'Financials', status: 'Open', statusColor: 'text-primary' },
    { id: 'TK-8935', title: 'New Trainer Inquiry', desc: 'How do I add a new specialized trainer to the \'Pro\' level directory listing for our region?', priority: 'INFORMATION', time: '2 hours ago', gym: 'Zenith Yoga', category: 'Library', status: 'Resolved', statusColor: 'text-success' }
  ];

  const filteredTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    ticket.id.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    ticket.gym.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    ticket.desc.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  return (
    <div className="support-page animate-fade-in">
      <div className="support-header-text">
        <h1 className="page-title">Aura Support</h1>
        <p className="page-subtitle">Manage incoming inquiries and system-wide communications.</p>
      </div>

      <div className="support-grid">
        <div className="support-main">
          <div className="support-stats-row">
            <div className="card stat-card animate-slide-up delay-1">
              <div className="stat-label">ACTIVE TICKETS</div>
              <div className="stat-value">142</div>
              <div className="stat-trend success"><Activity size={14} /><span>12% from yesterday</span></div>
            </div>
            <div className="card stat-card animate-slide-up delay-2">
              <div className="stat-label">AVG. RESPONSE</div>
              <div className="stat-value">17m 31s</div>
              <div className="stat-trend success"><Clock size={14} /><span>Within SLA</span></div>
            </div>
            <div className="card stat-card attention animate-slide-up delay-3">
              <div className="stat-label">PENDING REVIEW</div>
              <div className="stat-value">28</div>
              <div className="stat-trend alert"><Shield size={14} /><span>Needs Attention</span></div>
            </div>
            <div className="card stat-card animate-slide-up delay-4">
              <div className="stat-label">SYSTEM HEALTH</div>
              <div className="stat-value">99.9%</div>
              <div className="stat-trend success"><Activity size={14} /><span>All Systems Nominal</span></div>
            </div>
          </div>

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
                      <span className={`priority-badge ${ticket.priority.toLowerCase().replace(' ', '-')}`}>
                        {ticket.priority}
                      </span>
                      <span className="ticket-id">#{ticket.id} - {ticket.title}</span>
                    </div>
                    <span className="ticket-time">{ticket.time}</span>
                  </div>
                  <p className="ticket-desc">"{ticket.desc}"</p>
                  <div className="ticket-footer">
                    <div className="footer-meta">
                      <div className="meta-item"><Dumbbell size={14} /><span>{ticket.gym}</span></div>
                      <div className="meta-item"><MessageSquare size={14} /><span>{ticket.category}</span></div>
                      <div className="meta-item"><span className={`status-dot ${ticket.statusColor}`}></span><span>{ticket.status}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Pagination 
              totalItems={142}
              itemsPerPage={10}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              label="tickets"
            />
          </div>
        </div>

        <div className="support-sidebar">
          <div className="card broadcast-card animate-slide-up delay-4">
            <div className="card-header-simple">
              <Megaphone className="text-primary" size={20} />
              <h3 className="section-title">System Broadcast</h3>
            </div>
            <p className="section-desc">Send critical push notifications and dashboard alerts instantly.</p>
            <div className="broadcast-form">
              <div className="form-group"><label>BROADCAST TITLE</label><input type="text" placeholder="e.g., Scheduled Maintenance" /></div>
              <div className="form-grid-mini">
                <div className="form-group"><label>SEND TO</label><select className="form-select"><option>Gym Owners, Trainees</option></select></div>
                <div className="form-group"><label>PRIORITY</label><select className="form-select"><option>Normal</option></select></div>
              </div>
              <div className="form-group"><label>NOTIFICATION CONTENT</label><textarea placeholder="Type your message here..." rows={4} className="full-width-textarea"></textarea></div>
              <button className="btn-dispatch"><Send size={16} /><span>Dispatch Broadcast</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
