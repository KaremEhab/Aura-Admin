import { Dumbbell, UserCheck, Users, Contact, TrendingUp, CreditCard, DollarSign } from 'lucide-react';
import './BusinessStats.css';

export function BusinessStats({ stats }) {
  const items = [
    { label: 'Total Gyms', value: stats.totalGyms.value, growth: stats.totalGyms.growth, icon: Dumbbell, color: 'var(--primary)' },
    { label: 'Active PTs', value: stats.activePTs.value, growth: stats.activePTs.growth, icon: UserCheck, color: 'var(--secondary)' },
    { label: 'Total Trainees', value: stats.totalTrainees.value, growth: stats.totalTrainees.growth, icon: Users, color: '#EC4899' },
    { label: 'Receptionists', value: stats.receptionists.value, growth: stats.receptionists.growth, icon: Contact, color: '#6366F1' },
    { label: 'Subscriptions', value: stats.activeSubscriptions.value, growth: stats.activeSubscriptions.growth, icon: CreditCard, color: '#F59E0B' },
    { label: 'ARPU (30D)', value: stats.arpu.value, growth: stats.arpu.growth, icon: DollarSign, color: '#10B981' },
  ];

  return (
    <div className="business-stats-grid">
      {items.map((item, idx) => (
        <div key={idx} className="card business-stat-card">
          {/* <div className="stat-icon-wrapper" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
            <item.icon size={18} />
          </div> */}
          <div className="stat-content">
            <p className="stat-label">{item.label}</p>
            <div className="stat-value-row">
              <h3 className="stat-value">{item.value}</h3>
              <div className="stat-growth">
                <span className="text-primary">+{item.growth}%</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
