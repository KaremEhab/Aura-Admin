import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { PersonalTrainers } from './pages/PersonalTrainers/PersonalTrainers';
import { Receptionists } from './pages/Receptionists/Receptionists';
import { Trainees } from './pages/Trainees/Trainees';
import { TimeClock } from './pages/TimeClock/TimeClock';
import { Managers } from './pages/Managers/Managers';
import { Financials } from './pages/Financials/Financials';
import { PricingPlans } from './pages/PricingPlans/PricingPlans';
import { Subscriptions } from './pages/Subscriptions/Subscriptions';
import { Permissions } from './pages/Permissions/Permissions';
import { Support } from './pages/Support/Support';
import { AccountManagement } from './pages/AccountManagement/AccountManagement';

import { Library } from './pages/Library/Library';
import { Analytics } from './pages/Analytics/Analytics';
import { WorkoutPlans } from './pages/WorkoutPlans/WorkoutPlans';
import { WorkoutBuilder } from './pages/WorkoutPlans/WorkoutBuilder';
import { NutritionPlans } from './pages/NutritionPlans/NutritionPlans';
import { NutritionBuilder } from './pages/NutritionPlans/NutritionBuilder';
import { SystemConfiguration } from './pages/SystemConfiguration/SystemConfiguration';
import { AuraHub } from './pages/AuraHub/AuraHub';
import { AuraChats } from './pages/AuraChats/AuraChats';
import { AuraAI } from './pages/AuraAI/AuraAI';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) return <div style={{padding: '50px', color: 'white', background: 'red'}}><h1>App Crashed!</h1><pre>{this.state.error.toString()}</pre></div>;
    return this.props.children;
  }
}

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
    switch (currentPage) {
      case 'personal-trainers':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <PersonalTrainers searchQuery={searchQuery} />
          </div>
        );
      case 'receptionists':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <Receptionists searchQuery={searchQuery} />
          </div>
        );
      case 'trainees':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <Trainees searchQuery={searchQuery} />
          </div>
        );
      case 'time-clock':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <TimeClock />
          </div>
        );
      case 'managers':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <Managers searchQuery={searchQuery} />
          </div>
        );
      case 'financials':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <Financials />
          </div>
        );
      case 'pricing-plans':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <PricingPlans />
          </div>
        );
      case 'subscriptions':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <Subscriptions />
          </div>
        );
      case 'permissions':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <Permissions />
          </div>
        );
      case 'support':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <Support />
          </div>
        );
      case 'account-management':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <AccountManagement />
          </div>
        );
      case 'library':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <Library />
          </div>
        );
      case 'analytics':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <Analytics />
          </div>
        );
      case 'workout-plans':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <WorkoutPlans onNavigate={setCurrentPage} />
          </div>
        );
      case 'workout-builder':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <WorkoutBuilder onNavigate={setCurrentPage} />
          </div>
        );
      case 'nutrition-plans':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <NutritionPlans onNavigate={setCurrentPage} />
          </div>
        );
      case 'nutrition-builder':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <NutritionBuilder onNavigate={setCurrentPage} />
          </div>
        );
      case 'system-configuration':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <SystemConfiguration />
          </div>
        );
      case 'aura-chats':
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <AuraChats />
          </div>
        );
      case 'dashboard':
      default:
        return (
          <div key={currentPage} className="page-transition-wrapper">
            <Dashboard searchQuery={searchQuery} />
          </div>
        );
    }
  };

  const isFullScreenPage = currentPage === 'aura-ai' || currentPage === 'aura-hub';

  if (isFullScreenPage) {
    return (
      <ErrorBoundary>
        {currentPage === 'aura-ai' && <AuraAI onNavigate={setCurrentPage} />}
        {currentPage === 'aura-hub' && <AuraHub onNavigate={setCurrentPage} />}
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <DashboardLayout 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        branding={branding}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      >
        {renderPage()}
      </DashboardLayout>
    </ErrorBoundary>
  );
}

export default App;