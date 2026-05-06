import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { AccountSettings } from './pages/Settings/AccountSettings';

import { Support } from './pages/Support/Support';
import { Library } from './pages/Library/Library';
import { Gyms } from './pages/Gyms/Gyms';
import { Trainers } from './pages/Trainers/Trainers';
import { Trainees } from './pages/Trainees/Trainees';
import { Infrastructure } from './pages/Infrastructure/Infrastructure';
import { Financials } from './pages/Financials/Financials';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSearchQuery(''); // Reset search on page change
  }, [currentPage]);

  const [branding, setBranding] = useState({
    name: 'AURA.FIT.',
    color: '#22C55E',
    logo: null,
  });

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
  };

  const updateBranding = (newBranding) => {
    setBranding(prev => {
      const updated = { ...prev, ...newBranding };
      if (newBranding.color) {
        document.documentElement.style.setProperty('--primary', newBranding.color);
        const rgb = hexToRgb(newBranding.color);
        if (rgb) {
          document.documentElement.style.setProperty('--primary-rgb', rgb);
        }
        // Update derivatives for lite and border with opacity
        document.documentElement.style.setProperty('--primary-lite', `${newBranding.color}15`);
        document.documentElement.style.setProperty('--primary-border', `${newBranding.color}30`);
      }
      return updated;
    });
  };

  const renderPage = () => {
    return (
      <div key={currentPage} className="page-transition-wrapper">
        {(() => {
          switch (currentPage) {
            case 'dashboard':
              return <Dashboard searchQuery={searchQuery} />;
            case 'settings':
              return (
                <AccountSettings 
                  branding={branding}
                  onBrandingChange={updateBranding}
                />
              );
            case 'support':
              return <Support searchQuery={searchQuery} />;
            case 'library':
              return <Library searchQuery={searchQuery} />;
            case 'gyms':
              return <Gyms searchQuery={searchQuery} />;
            case 'pt':
              return <Trainers searchQuery={searchQuery} />;
            case 'trainees':
              return <Trainees searchQuery={searchQuery} />;
            case 'infra':
              return <Infrastructure searchQuery={searchQuery} />;
            case 'financials':
              return <Financials searchQuery={searchQuery} />;
            default:
              return <Dashboard searchQuery={searchQuery} />;
          }
        })()}
      </div>
    );
  };

  return (
    <DashboardLayout 
      currentPage={currentPage} 
      onNavigate={setCurrentPage}
      branding={branding}
      searchQuery={searchQuery}
      onSearch={setSearchQuery}
    >
      {renderPage()}
    </DashboardLayout>
  );
}

export default App;