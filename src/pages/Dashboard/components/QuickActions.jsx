import React from 'react';
import { Shield, Zap, Bell, MessageSquare, Radio, Globe, Lock, ShieldCheck } from 'lucide-react';
import './QuickActions.css';

export function QuickActions() {
  const actions = [
    { icon: <Radio size={18} />, label: 'Broadcast', desc: 'Alert all GYMs', color: 'purple' },
    { icon: <MessageSquare size={18} />, label: 'Support', desc: '12 tickets open', color: 'blue' },
    { icon: <ShieldCheck size={18} />, label: 'Audit', desc: 'View 24h logs', color: 'green' },
    { icon: <Lock size={18} />, label: 'Maintenance', desc: 'Toggle Read-only', color: 'red' },
  ];

  return (
    <div className="quick-actions-grid">
      {actions.map((action, i) => (
        <div key={i} className={`quick-action-card card delay-${i+1}`}>
          <div className={`action-icon-box ${action.color}`}>
            {action.icon}
          </div>
          <div className="action-info">
            <span className="action-label">{action.label}</span>
            <span className="action-desc">{action.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
