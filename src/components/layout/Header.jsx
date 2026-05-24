import React, { useState, useEffect } from 'react';
import { Search, RefreshCcw, Moon, Sun, Bell, Plus, Menu, X, Minus, Square, MessageCircle, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { isTauri, minimizeWindow, maximizeWindow, closeWindow } from '../../lib/tauri';
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
    <header data-tauri-drag-region className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="mobile-logo" onClick={() => onNavigate && onNavigate('dashboard')} style={{ cursor: 'pointer' }}>
          {branding.logo ? (
            <img src={branding.logo} alt="Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          ) : (
            <div className="logo-icon-svg" />
          )}
          <span className="logo-text" style={{ color: 'var(--primary)' }}>{branding.name}</span>
        </div>
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search systems..." 
            value={searchQuery || ''}
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="header-actions">
        <button className="icon-btn" title="Refresh" onClick={onRefresh}>
          <RefreshCcw size={18} />
        </button>
        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="icon-btn relative" title="Notifications" onClick={onNotifClick}>
          <Bell size={18} />
          <span className="notification-dot">3</span>
        </button>
        <button className="icon-btn relative" title="Messages">
          <MessageCircle size={18} />
          <span className="notification-dot bg-[#ef4444]">5</span>
        </button>
        
        {!isAuraHub && (
          <button className="btn-primary">
            <Plus size={18} />
            <span>Add New Gym</span>
          </button>
        )}

        {children}

        {isAuraHub && (
          <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-[var(--primary-border)] bg-[var(--primary-lite)] hover:opacity-80 transition-all ml-2" style={{ border: '1px solid var(--primary-border)' }}>
            <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop" className="w-8 h-8 rounded-full object-cover" alt="Profile" />
            <span className="text-sm font-semibold text-[var(--primary)] tracking-wide">Kareem Ehab</span>
            <ChevronDown className="w-4 h-4 text-[var(--primary)]" />
          </button>
        )}
      </div>
    </header>
  );
}
