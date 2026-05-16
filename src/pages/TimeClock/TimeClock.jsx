import React, { useState, useEffect } from 'react';
import { 
  User, Key, ScanLine, LogIn, LogOut, CheckCircle2, AlertCircle
} from 'lucide-react';
import './TimeClock.css';

export function TimeClock() {
  const [mode, setMode] = useState('manual'); // 'manual' | 'qr'
  const [time, setTime] = useState(new Date());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  const handleClockIn = () => {
    if (mode === 'manual' && (!email || !password)) {
      showToast('Please enter credentials to clock in.', 'error');
      return;
    }
    showToast(`Clocked IN successfully at ${time.toLocaleTimeString()}`, 'success');
    setEmail(''); setPassword('');
  };

  const handleClockOut = () => {
    if (mode === 'manual' && (!email || !password)) {
      showToast('Please enter credentials to clock out.', 'error');
      return;
    }
    showToast(`Clocked OUT successfully at ${time.toLocaleTimeString()}`, 'success');
    setEmail(''); setPassword('');
  };

  return (
    <div className="timeclock-container">
      <div className="kiosk-card">
        
        <div className="kiosk-header">
          <h1>Staff Kiosk</h1>
          <p>Please check in or out for your shift.</p>
        </div>

        <div className="clock-display">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>

        <div className="auth-tabs">
          <div 
            className={`auth-tab ${mode === 'manual' ? 'active' : ''}`}
            onClick={() => setMode('manual')}
          >
            <User size={16} /> Manual Entry
          </div>
          <div 
            className={`auth-tab ${mode === 'qr' ? 'active' : ''}`}
            onClick={() => setMode('qr')}
          >
            <ScanLine size={16} /> QR Scan
          </div>
        </div>

        {mode === 'manual' ? (
          <div className="manual-mode-wrapper animate-fadeIn">
            <div className="input-group">
              <label>Staff Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="kiosk-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="kiosk-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="qr-mode-wrapper animate-fadeIn flex flex-col items-center gap-4">
            <p className="text-text text-sm text-center">Hold your Staff ID QR Code up to the camera.</p>
            <div className="qr-scanner-container">
              <div className="text-subtitle flex flex-col items-center gap-3">
                <ScanLine size={48} className="opacity-20" />
                <span className="text-xs uppercase tracking-widest font-bold">Camera Active</span>
              </div>
              <div className="qr-overlay">
                <div className="qr-corner tl"></div>
                <div className="qr-corner tr"></div>
                <div className="qr-corner bl"></div>
                <div className="qr-corner br"></div>
                <div className="qr-scan-line"></div>
              </div>
            </div>
          </div>
        )}

        <div className="action-buttons">
          <button className="action-btn btn-clock-in" onClick={handleClockIn}>
            <LogIn size={20} /> CLOCK IN
          </button>
          <button className="action-btn btn-clock-out" onClick={handleClockOut}>
            <LogOut size={20} /> CLOCK OUT
          </button>
        </div>

      </div>

      {/* Toast Notification */}
      <div className={`toast ${toast.type} ${toast.show ? 'show' : ''}`}>
        {toast.type === 'success' ? <CheckCircle2 className="text-primary" /> : <AlertCircle className="text-alert" />}
        <span className="text-white font-bold">{toast.message}</span>
      </div>

    </div>
  );
}
