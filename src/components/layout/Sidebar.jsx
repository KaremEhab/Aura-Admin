import React, { useState } from 'react';
import { 
  Home, User, Users, Briefcase, 
  DollarSign, Layers, Repeat,
  Bot, Share2, MessageSquare,
  BookOpen, BarChart2, Dumbbell, Activity, Server,
  Shield, HelpCircle, LogOut, X, ChevronRight, CheckCircle2,
  Settings, Database, Wallet, Globe
} from 'lucide-react';
import './Sidebar.css';
import auraLogo from '../../assets/Aura.svg';

export function Sidebar({ isOpen, onClose, currentPage, onNavigate, branding }) {
  const [openGroups, setOpenGroups] = useState({
    'management': true,
    'money-flows': true,
    'community': true,
    'data-information': true,
    'support-settings': true,
  });

  const toggleGroup = (id) => {
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNavigate = (pageId) => {
    onNavigate(pageId);
    onClose?.();
  };

  const navSections = [
    {
      items: [
        { id: 'dashboard', icon: Home, label: 'DASHBOARD' },
      ]
    },
    {
      id: 'management',
      label: 'Management',
      icon: Users,
      items: [
        { id: 'personal-trainers', icon: User, label: 'PERSONAL TRAINERS' },
        { id: 'receptionists', icon: Users, label: 'RECEPTIONISTS' },
        { id: 'trainees', icon: Users, label: 'TRAINEES' },
        { id: 'managers', icon: Briefcase, label: 'MANAGERS' },
      ]
    },
    {
      id: 'money-flows',
      label: 'Money Flows',
      icon: Wallet,
      items: [
        { id: 'financials', icon: DollarSign, label: 'FINANCIALS' },
        { id: 'pricing-plans', icon: Layers, label: 'PRICING PLANS' },
        { id: 'subscriptions', icon: Repeat, label: 'SUBSCRIPTIONS' },
      ]
    },
    {
      id: 'community',
      label: 'Community',
      icon: Globe,
      items: [
        { id: 'aura-ai', icon: Bot, label: 'AURA AI' },
        { id: 'aura-hub', icon: Share2, label: 'AURA HUB' },
        { id: 'aura-chats', icon: MessageSquare, label: 'AURA CHATS', badge: 5 },
      ]
    },
    {
      id: 'data-information',
      label: 'Data Information',
      icon: Database,
      items: [
        { id: 'library', icon: BookOpen, label: 'LIBRARY' },
        { id: 'analytics', icon: BarChart2, label: 'ANALYTICS' },
        { id: 'workout-plans', icon: Dumbbell, label: 'WORKOUT PLANS' },
        { id: 'nutrition-plans', icon: Activity, label: 'NUTRITION PLANS' },
        { id: 'infrastructure', icon: Server, label: 'INFRASTRUCTURE' },
      ]
    },
    {
      id: 'support-settings',
      label: 'Settings',
      icon: Settings,
      items: [
        { id: 'permissions', icon: Shield, label: 'PERMISSIONS' },
        { id: 'support', icon: HelpCircle, label: 'SUPPORT' },
      ]
    }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo" onClick={() => handleNavigate('dashboard')} style={{ cursor: 'pointer' }}>
        <div className="logo-brand flex items-center gap-3">
          <div className="gym-avatar">
            <CheckCircle2 size={24} color="#f59e0b" />
          </div>
          <div className="flex flex-col">
            <span className="logo-text var-title font-bold" style={{ fontSize: '1.1rem' }}>Caesars</span>
            <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: '500' }}>
              <span style={{ color: '#22c55e' }}>VIP Plan</span> • since 2022
            </span>
          </div>
        </div>

        <button className="close-sidebar-btn" onClick={(e) => { e.stopPropagation(); onClose?.(); }}>
          <X size={16} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navSections.map((section, idx) => (
            <React.Fragment key={idx}>
              {section.label && (
                <li className="nav-section-header" onClick={() => toggleGroup(section.id)}>
                  <div className="flex items-center justify-between w-full text-xs text-gray-400 font-bold uppercase tracking-wider px-2 mt-4 mb-2 cursor-pointer hover:text-gray-300 transition-colors">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {section.icon ? <section.icon size={12} /> : <HelpCircle size={12} />} {section.label}
                    </span>
                    <ChevronRight 
                      size={14} 
                      style={{ 
                        transform: openGroups[section.id] ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }} 
                    />
                  </div>
                </li>
              )}
              {(!section.id || openGroups[section.id]) && section.items.map((item) => (
                <li key={item.id} className={`${currentPage === item.id || (currentPage === 'dashboard' && item.id === 'dashboard') ? 'active' : ''}`}>
                  <button 
                    className="nav-btn"
                    onClick={() => handleNavigate(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="ml-auto bg-[#ef4444] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      </nav>

      <div className="sidebar-bottom mt-auto">
        {/* <div className="sidebar-promo-card">
          <p>"Momentum is built through precision tracking and elite discipline."</p>
        </div> */}

        <div className="user-profile mt-4" onClick={() => handleNavigate('dashboard')}>
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop" alt="User" />
          <div className="user-info">
            <h4>KAREEM EHAB</h4>
            <a href="#" onClick={(e) => { e.preventDefault(); }}>Manage profile</a>
          </div>
          <ChevronRight size={16} className="arrow ml-auto" />
        </div>

        <button className="sign-out mt-3 w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20 bg-[#1f191f]">
          <LogOut size={16} />
          <span className="font-semibold tracking-wider">END SHIFT</span>
        </button>

        <div className="mt-3 flex justify-center">
          <span className="text-primary text-[15px] font-bold tracking-widest flex items-center gap-2">
            <img src={auraLogo} alt="Aura Logo" className="w-3.5 h-3.5" /> AURA.FIT.
          </span>
        </div>
      </div>
    </aside>
  );
}
