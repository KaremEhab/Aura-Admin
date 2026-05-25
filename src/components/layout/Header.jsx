import React, { useState, useEffect } from 'react';
import { Search, RefreshCcw, Moon, Sun, Bell, Plus, Menu, X, Minus, Square, MessageCircle, ChevronDown } from 'lucide-react';
import AuraLogo from '../../assets/Aura.svg';
import { useTheme } from '../../context/ThemeContext';
import { isTauri, minimizeWindow, maximizeWindow, closeWindow } from '../../lib/tauri';
import { ProfileHoverCard, getDummyUser } from '../../pages/AuraHub/AuraHub';
import './Header.css';

export function Header({ onMenuClick, branding, onRefresh, onNotifClick, onNavigate, searchQuery, onSearch, children, isAuraHub }) {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header data-tauri-drag-region className={`header ${scrolled ? 'scrolled' : ''} ${isAuraHub ? '!justify-between flex-wrap gap-y-2 pb-4 sm:pb-6' : ''}`}>
      <div className={`header-left ${isAuraHub ? '!w-auto !justify-start' : ''}`}>
        {!isAuraHub && (
          <button className="menu-btn" onClick={onMenuClick}>
            <Menu size={24} />
          </button>
        )}

        {isAuraHub && (
          <div className="relative group flex items-center h-max self-start z-10">
            <button className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full border border-[var(--primary-border)] bg-[var(--primary-lite)] hover:opacity-80 transition-all">
              <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover" alt="Profile" />
              <span className="text-[11px] sm:text-sm font-semibold text-[var(--primary)] tracking-wide">Kareem Ehab</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--primary)]" />
            </button>
            <ProfileHoverCard user={getDummyUser('Kareem Ehab (ME)')} />
          </div>
        )}

        {!isAuraHub && (
          <div className="mobile-logo" onClick={() => onNavigate && onNavigate('dashboard')} style={{ cursor: 'pointer' }}>
            {branding.logo ? (
              <img src={branding.logo} alt="Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            ) : (
              <div className="logo-icon-svg" />
            )}
            <span className="logo-text" style={{ color: 'var(--primary)' }}>{branding.name}</span>
          </div>
        )}
        
        <div className={`search-bar ${isAuraHub ? '!hidden lg:!flex' : ''}`}>
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search systems..." 
            value={searchQuery || ''}
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>
      </div>

      {isAuraHub && (
        <div className="absolute top-[20px] left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity z-0" onClick={() => onNavigate && onNavigate('dashboard')}>
          <img src={AuraLogo} alt="Aura Logo" className="h-7 sm:h-8 w-auto" />
        </div>
      )}

      <div className={`header-actions flex items-center gap-2 ${isAuraHub ? '!flex' : ''}`}>
        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--sidebar)] hover:bg-[var(--overlay)] border border-[var(--stroke)] flex items-center justify-center text-[var(--subtitle)] hover:text-[var(--title)] transition-colors" title="Refresh" onClick={onRefresh}>
          <RefreshCcw size={16} />
        </button>
        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--sidebar)] hover:bg-[var(--overlay)] border border-[var(--stroke)] flex items-center justify-center text-[var(--subtitle)] hover:text-[var(--title)] transition-colors" onClick={toggleTheme} title="Toggle Theme">
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--sidebar)] hover:bg-[var(--overlay)] border border-[var(--stroke)] flex items-center justify-center text-[var(--subtitle)] hover:text-[var(--title)] transition-colors relative" title="Notifications" onClick={onNotifClick}>
          <Bell size={16} />
          <span className="absolute -top-1 -right-1 bg-[var(--alert)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[var(--background)]">1</span>
        </button>
        
        {!isAuraHub && (
          <button className="icon-btn relative" title="Messages">
            <MessageCircle size={18} />
            <span className="notification-dot bg-[#ef4444]">5</span>
          </button>
        )}
        
        {!isAuraHub && (
          <button className="btn-primary">
            <Plus size={18} />
            <span>Add New Gym</span>
          </button>
        )}

        {children}

      </div>

      {/* Mobile Search & Streak (AuraHub Only) */}
      {isAuraHub && (
        <div className="flex lg:hidden w-full items-center gap-3">
          <div className="flex-1 flex items-center gap-2 align-items- center bg-[var(--sidebar)] border border-[var(--stroke)] rounded-full px-4 py-2.5 transition: border-color 0.2s">
            <Search className="w-4 h-4 text-[var(--subtitle)]" />
            <input type="text" placeholder="Search networks..." className="bg-transparent border-none outline-none text-sm text-[var(--title)] placeholder:text-[var(--subtitle)] w-full" />
          </div>
          <div className="bg-[var(--alert-lite)] border border-[var(--alert-border)] rounded-full px-4 py-2.5 flex items-center gap-2 whitespace-nowrap shadow-sm">
            <span className="text-xs font-bold text-[var(--alert)]">37 DAYS</span>
            <span className="text-sm leading-none">🔥</span>
          </div>
        </div>
      )}
    </header>
  );
}
