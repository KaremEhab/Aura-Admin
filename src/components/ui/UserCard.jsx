import React from 'react';
import { Mail, Phone, Edit2, MessageSquare, MapPin, Star, Calendar, ClipboardList, Activity, ArrowRight } from 'lucide-react';
import './UserCard.css';

export function UserCard({ user, onClick, onQuickAction }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]';
      case 'on leave': return 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)]';
      case 'inactive': return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]';
      default: return 'bg-gray-400';
    }
  };

  const handleAction = (e, actionType) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    if (onQuickAction) {
      onQuickAction(user, actionType);
    }
  };

  return (
    <div className="premium-user-card" onClick={() => onClick && onClick(user)}>
      <div className="card-bg-glow"></div>
      
      <div className="card-header">
        <div className="avatar-wrapper">
          <img src={user.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop'} alt={user.name} className="user-avatar" />
          <span className={`status-indicator ${getStatusColor(user.status)}`}></span>
        </div>
        
        <div className="user-info-section">
          <h3 className="user-name">{user.name}</h3>
          <p className="user-role">{user.role || user.plan || 'Staff Member'}</p>
          <div className="user-location">
            <MapPin size={12} className="text-primary" /> 
            <span>{user.branch || 'Aura Fitness Main'}</span>
          </div>
        </div>
      </div>

      {user.customStats && (
        <div className="user-stats">
          {user.customStats.map((stat, idx) => (
            <div key={idx} className={`stat-item ${stat.alignRight ? 'text-right' : ''}`}>
              <span className={`stat-value ${stat.isRating ? 'rating-value' : ''}`}>
                {stat.isRating && <Star size={14} className="star-icon" />}
                {stat.value}
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="card-action-bar">
        {user.plan ? (
          // Trainee / Member specific actions
          <>
            <button className="action-btn" onClick={(e) => handleAction(e, 'progress')} title="View Progress">
              <Activity size={16} />
            </button>
            <button className="action-btn" onClick={(e) => handleAction(e, 'plan')} title="Change Plan">
              <ClipboardList size={16} />
            </button>
          </>
        ) : (
          // Staff specific actions
          <>
            <button className="action-btn" onClick={(e) => handleAction(e, 'schedule')} title="View Schedule">
              <Calendar size={16} />
            </button>
            <button className="action-btn" onClick={(e) => handleAction(e, 'task')} title="Assign Task">
              <ClipboardList size={16} />
            </button>
          </>
        )}
        <button className="action-btn" onClick={(e) => handleAction(e, 'message')} title="Send Message">
          <MessageSquare size={16} />
        </button>
        <button className="action-btn" onClick={(e) => handleAction(e, 'edit')} title="Edit Profile">
          <Edit2 size={16} />
        </button>
        
        <button className="action-btn view-profile-btn" onClick={(e) => handleAction(e, 'view')} title="View Full Profile">
          <span className="text-xs font-bold mr-1">PROFILE</span> <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
