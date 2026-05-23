import React, { useState } from 'react';
import { 
  User, Shield, Bell, Settings, Lock, Smartphone, 
  Mail, Edit2, Save, CreditCard, Key, Receipt,
  Activity, Globe, Download
} from 'lucide-react';
import './AccountManagement.css';

export function AccountManagement() {
  const [activeTab, setActiveTab] = useState('profile'); // profile, security, notifications, billing, activity

  return (
    <div className="account-container animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1>My Profile & Account Settings</h1>
          <p className="text-subtitle mt-1">Manage your super-admin details, security preferences, billing, and logs.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Menu */}
        <div className="w-full lg:w-64 flex flex-col gap-2 shrink-0">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${activeTab === 'profile' ? 'bg-primary text-black shadow-md' : 'bg-sidebar border border-stroke text-subtitle hover:text-title hover:bg-background'}`}
          >
            <User size={18} /> Personal Details
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${activeTab === 'security' ? 'bg-primary text-black shadow-md' : 'bg-sidebar border border-stroke text-subtitle hover:text-title hover:bg-background'}`}
          >
            <Shield size={18} /> Login & Security
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${activeTab === 'notifications' ? 'bg-primary text-black shadow-md' : 'bg-sidebar border border-stroke text-subtitle hover:text-title hover:bg-background'}`}
          >
            <Bell size={18} /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('billing')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${activeTab === 'billing' ? 'bg-primary text-black shadow-md' : 'bg-sidebar border border-stroke text-subtitle hover:text-title hover:bg-background'}`}
          >
            <CreditCard size={18} /> Billing & Invoices
          </button>
          <button 
            onClick={() => setActiveTab('activity')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${activeTab === 'activity' ? 'bg-primary text-black shadow-md' : 'bg-sidebar border border-stroke text-subtitle hover:text-title hover:bg-background'}`}
          >
            <Activity size={18} /> Activity Log
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 fin-chart-card overflow-hidden">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="animate-fade-in flex flex-col gap-8">
              <h3 className="font-bold text-title flex items-center gap-2 border-b border-stroke pb-4"><User size={18} className="text-primary"/> Personal Profile</h3>
              
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop" alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-primary shadow-lg" />
                  <button className="absolute bottom-0 right-0 p-1.5 bg-background border border-stroke rounded-full text-title hover:bg-primary hover:text-black transition-colors shadow-md">
                    <Edit2 size={14} />
                  </button>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-title">Kareem Ehab</h2>
                  <p className="text-sm text-subtitle font-medium">Super Admin • Aura Fitness</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-subtitle uppercase mb-2">Full Name</label>
                  <input type="text" defaultValue="Kareem Ehab" className="w-full bg-background border border-stroke rounded-lg px-4 py-2.5 text-sm font-medium text-title focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-subtitle uppercase mb-2">Email Address</label>
                  <input type="email" defaultValue="kareem.admin@aurafitness.com" className="w-full bg-background border border-stroke rounded-lg px-4 py-2.5 text-sm font-medium text-title focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-subtitle uppercase mb-2">Phone Number</label>
                  <input type="tel" defaultValue="+20 100 123 4567" className="w-full bg-background border border-stroke rounded-lg px-4 py-2.5 text-sm font-medium text-title focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-subtitle uppercase mb-2">Timezone</label>
                  <select className="w-full bg-background border border-stroke rounded-lg px-4 py-2.5 text-sm font-medium text-title focus:outline-none focus:border-primary transition-colors">
                    <option>Africa/Cairo (GMT+3)</option>
                    <option>Europe/London (GMT+1)</option>
                    <option>America/New_York (EST)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-subtitle uppercase mb-2">Biography / Internal Note</label>
                <textarea rows="3" defaultValue="Lead Administrator for all branch operations." className="w-full bg-background border border-stroke rounded-lg px-4 py-3 text-sm font-medium text-title focus:outline-none focus:border-primary resize-none"></textarea>
              </div>

              <div className="flex justify-end pt-4 border-t border-stroke">
                <button className="flex items-center gap-2 bg-primary text-black px-6 py-2.5 rounded-xl text-sm font-black hover:scale-105 transition-transform shadow-[0_4px_15px_rgba(34,197,94,0.3)]">
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="animate-fade-in flex flex-col gap-8">
              <h3 className="font-bold text-title flex items-center gap-2 border-b border-stroke pb-4"><Shield size={18} className="text-blue-500"/> Login & Security</h3>
              
              <div className="flex flex-col gap-6">
                {/* Password Section */}
                <div className="bg-background border border-stroke rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-title mb-1 flex items-center gap-2"><Key size={16} className="text-subtitle"/> Password</h4>
                    <p className="text-xs text-subtitle">It's a good idea to use a strong password that you're not using elsewhere.</p>
                  </div>
                  <button className="bg-sidebar border border-stroke px-4 py-2 rounded-lg text-sm font-bold text-title hover:bg-stroke hover:text-blue-500 transition-colors whitespace-nowrap">
                    Change Password
                  </button>
                </div>

                {/* 2FA Section */}
                <div className="bg-background border border-stroke rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-title mb-1 flex items-center gap-2"><Smartphone size={16} className="text-subtitle"/> Two-Factor Authentication (2FA)</h4>
                    <p className="text-xs text-subtitle">Add an extra layer of security to your account using an authenticator app.</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold uppercase rounded tracking-wider">Enabled via Google Auth</span>
                  </div>
                  <button className="bg-sidebar border border-stroke px-4 py-2 rounded-lg text-sm font-bold text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-colors whitespace-nowrap">
                    Disable 2FA
                  </button>
                </div>

                {/* Active Sessions */}
                <div className="bg-background border border-stroke rounded-xl p-5">
                  <h4 className="text-sm font-bold text-title mb-4 flex items-center gap-2 border-b border-stroke pb-3">Active Login Sessions</h4>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex justify-between items-center pb-4 border-b border-stroke">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Globe size={18}/></div>
                        <div>
                          <span className="block text-sm font-bold text-title">Windows PC • Chrome</span>
                          <span className="block text-xs text-subtitle mt-0.5">Alexandria, Egypt (192.168.1.4)</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-primary bg-primary-lite border border-primary-border px-2 py-1 rounded">Active Now</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-sidebar rounded-lg text-subtitle border border-stroke"><Smartphone size={18}/></div>
                        <div>
                          <span className="block text-sm font-bold text-title">iPhone 14 Pro • Safari</span>
                          <span className="block text-xs text-subtitle mt-0.5">Cairo, Egypt (10.0.0.5) • 2 hours ago</span>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-red-500 hover:underline">Revoke Access</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="animate-fade-in flex flex-col gap-8">
              <h3 className="font-bold text-title flex items-center gap-2 border-b border-stroke pb-4"><Bell size={18} className="text-yellow-500"/> Notification Preferences</h3>
              
              <div className="bg-background border border-stroke rounded-xl p-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-stroke text-xs text-subtitle uppercase tracking-wider">
                      <th className="pb-4 font-bold w-1/2">Event Trigger</th>
                      <th className="pb-4 font-bold text-center">Email</th>
                      <th className="pb-4 font-bold text-center">Push / App</th>
                      <th className="pb-4 font-bold text-center">SMS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { event: 'New Membership Sign-up', email: true, push: true, sms: false },
                      { event: 'Payment Failed / Past Due', email: true, push: true, sms: true },
                      { event: 'New Support Ticket Created', email: true, push: false, sms: false },
                      { event: 'Daily Financial Summary', email: true, push: true, sms: false },
                      { event: 'Security Alert (New Login)', email: true, push: true, sms: true },
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-stroke last:border-0 hover:bg-sidebar transition-colors">
                        <td className="py-4 px-2 text-sm font-medium text-title">{row.event}</td>
                        <td className="py-4 text-center">
                          <input type="checkbox" defaultChecked={row.email} className="accent-yellow-500 w-4 h-4 cursor-pointer" />
                        </td>
                        <td className="py-4 text-center">
                          <input type="checkbox" defaultChecked={row.push} className="accent-yellow-500 w-4 h-4 cursor-pointer" />
                        </td>
                        <td className="py-4 text-center">
                          <input type="checkbox" defaultChecked={row.sms} className="accent-yellow-500 w-4 h-4 cursor-pointer" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-stroke">
                <button className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-2.5 rounded-xl text-sm font-black hover:scale-105 transition-transform shadow-[0_4px_15px_rgba(234,179,8,0.3)]">
                  <Save size={18} /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* BILLING & INVOICES TAB */}
          {activeTab === 'billing' && (
            <div className="animate-fade-in flex flex-col gap-8">
              <h3 className="font-bold text-title flex items-center gap-2 border-b border-stroke pb-4"><CreditCard size={18} className="text-purple-500"/> SaaS Billing & Invoices</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Plan */}
                <div className="bg-background border border-stroke rounded-xl p-5 border-t-4 border-t-purple-500">
                  <span className="text-xs font-bold text-subtitle uppercase">Current Plan</span>
                  <h4 className="text-2xl font-black text-title mt-1 mb-4">Aura VIP Multi-Branch</h4>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-black text-title">$199</span>
                    <span className="text-subtitle font-medium pb-1">/ month</span>
                  </div>
                  <p className="text-xs text-subtitle mb-6">Your next billing date is <strong className="text-title">June 1, 2026</strong>.</p>
                  <button className="w-full bg-sidebar border border-stroke py-2.5 rounded-lg text-sm font-bold text-title hover:border-purple-500 hover:text-purple-500 transition-colors">
                    Manage Subscription
                  </button>
                </div>

                {/* Payment Method */}
                <div className="bg-background border border-stroke rounded-xl p-5">
                  <span className="text-xs font-bold text-subtitle uppercase mb-4 block">Payment Method</span>
                  <div className="flex items-center gap-4 p-4 border border-stroke bg-sidebar rounded-lg mb-4">
                    <div className="w-12 h-8 bg-background border border-stroke rounded flex items-center justify-center font-bold text-xs">VISA</div>
                    <div>
                      <span className="block text-sm font-bold text-title">Visa ending in 4242</span>
                      <span className="block text-xs text-subtitle">Expires 12/28</span>
                    </div>
                  </div>
                  <button className="text-sm font-bold text-purple-500 hover:underline">Update Payment Method</button>
                </div>
              </div>

              {/* Invoice History */}
              <div className="bg-background border border-stroke rounded-xl overflow-hidden">
                <div className="p-4 border-b border-stroke bg-sidebar">
                  <h4 className="font-bold text-title flex items-center gap-2"><Receipt size={16}/> Invoice History</h4>
                </div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-stroke text-xs text-subtitle uppercase tracking-wider bg-background">
                      <th className="py-3 px-4 font-bold">Date</th>
                      <th className="py-3 px-4 font-bold">Amount</th>
                      <th className="py-3 px-4 font-bold">Status</th>
                      <th className="py-3 px-4 font-bold text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-stroke hover:bg-sidebar transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-title">May 1, 2026</td>
                      <td className="py-4 px-4 text-sm font-medium text-title">$199.00</td>
                      <td className="py-4 px-4"><span className="text-[10px] font-bold uppercase text-green-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">Paid</span></td>
                      <td className="py-4 px-4 text-right"><button className="text-subtitle hover:text-primary"><Download size={16}/></button></td>
                    </tr>
                    <tr className="hover:bg-sidebar transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-title">Apr 1, 2026</td>
                      <td className="py-4 px-4 text-sm font-medium text-title">$199.00</td>
                      <td className="py-4 px-4"><span className="text-[10px] font-bold uppercase text-green-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">Paid</span></td>
                      <td className="py-4 px-4 text-right"><button className="text-subtitle hover:text-primary"><Download size={16}/></button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ACTIVITY LOG TAB */}
          {activeTab === 'activity' && (
            <div className="animate-fade-in flex flex-col gap-8">
              <h3 className="font-bold text-title flex items-center gap-2 border-b border-stroke pb-4"><Activity size={18} className="text-green-500"/> Account Activity Log</h3>
              
              <div className="bg-background border border-stroke rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-stroke text-xs text-subtitle uppercase tracking-wider bg-sidebar">
                      <th className="py-3 px-4 font-bold">Action</th>
                      <th className="py-3 px-4 font-bold">IP Address</th>
                      <th className="py-3 px-4 font-bold text-right">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-stroke hover:bg-sidebar transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-title">Logged in successfully</td>
                      <td className="py-4 px-4 text-sm font-mono text-subtitle">192.168.1.4</td>
                      <td className="py-4 px-4 text-sm text-subtitle text-right">Today, 09:12 AM</td>
                    </tr>
                    <tr className="border-b border-stroke hover:bg-sidebar transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-title">Updated Push Notification Settings</td>
                      <td className="py-4 px-4 text-sm font-mono text-subtitle">192.168.1.4</td>
                      <td className="py-4 px-4 text-sm text-subtitle text-right">Yesterday, 14:30 PM</td>
                    </tr>
                    <tr className="hover:bg-sidebar transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-title">Exported Revenue Report (CSV)</td>
                      <td className="py-4 px-4 text-sm font-mono text-subtitle">10.0.0.5</td>
                      <td className="py-4 px-4 text-sm text-subtitle text-right">May 20, 2026, 11:15 AM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center mt-2">
                <button className="text-sm font-bold text-primary hover:underline">Load More Logs...</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
