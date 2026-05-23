import React from 'react';
import { 
  Server, HardDrive, Users, CreditCard, 
  Globe, Bell, Save, Info, RefreshCw, Key, ShieldCheck,
  Smartphone, Palette, Clock, Webhook, UploadCloud
} from 'lucide-react';
import './SystemConfiguration.css';

export function SystemConfiguration() {
  return (
    <div className="sysconfig-container animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1>System Configuration</h1>
          <p className="text-subtitle mt-1">Manage business quotas, tenant settings, API keys, and custom white-label branding.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-black px-6 py-2.5 rounded-xl text-sm font-black hover:scale-105 transition-transform shadow-[0_4px_15px_rgba(34,197,94,0.3)]">
          <Save size={18} /> Save Global Config
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* =========================================================
            LEFT COLUMN (Operational & Branding) 
        ========================================================= */}
        <div className="flex flex-col gap-8">
          
          {/* Card: White-Label Branding */}
          <div className="fin-chart-card border-t-4 border-t-primary">
            <h3 className="font-bold text-title flex items-center gap-2 mb-6 border-b border-stroke pb-4">
              <Palette size={18} className="text-primary"/> Mobile App Branding (White-Label)
            </h3>
            
            <p className="text-xs text-subtitle mb-6">Customize the look and feel of the Flutter app that your members download from the App Store.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-subtitle uppercase mb-2">Primary Color (Hex)</label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#22c55e] border border-stroke shrink-0 shadow-inner"></div>
                  <input type="text" defaultValue="#22c55e" className="w-full bg-background border border-stroke rounded-lg px-4 py-2 text-sm font-bold text-title focus:outline-none focus:border-primary uppercase font-mono" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-subtitle uppercase mb-2">App Name (Launcher)</label>
                <input type="text" defaultValue="Aura Fitness" className="w-full bg-background border border-stroke rounded-lg px-4 py-2.5 text-sm font-bold text-title focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-dashed border-stroke rounded-xl p-4 text-center hover:bg-sidebar transition-colors cursor-pointer group">
                <UploadCloud size={20} className="text-subtitle mx-auto mb-2 group-hover:text-primary transition-colors"/>
                <span className="block text-sm font-bold text-title">Upload App Logo</span>
                <span className="block text-[10px] text-subtitle mt-1">1024x1024 PNG, Transparent</span>
              </div>
              <div className="border border-dashed border-stroke rounded-xl p-4 text-center hover:bg-sidebar transition-colors cursor-pointer group">
                <UploadCloud size={20} className="text-subtitle mx-auto mb-2 group-hover:text-primary transition-colors"/>
                <span className="block text-sm font-bold text-title">Upload Splash Screen</span>
                <span className="block text-[10px] text-subtitle mt-1">1284x2778 PNG, Dark Mode</span>
              </div>
            </div>
          </div>

          {/* Card: Usage Quotas */}
          <div className="fin-chart-card">
            <h3 className="font-bold text-title flex items-center gap-2 mb-6 border-b border-stroke pb-4">
              <Server size={18} className="text-subtitle"/> Usage Quotas (VIP Plan)
            </h3>
            
            <div className="flex flex-col gap-6">
              {/* Member Capacity */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-subtitle"/>
                    <span className="text-sm font-bold text-title">Member Capacity</span>
                  </div>
                  <span className="text-xs font-black text-subtitle">12,482 / 15,000 Used</span>
                </div>
                <div className="w-full bg-stroke rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>

              {/* Media Storage */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <HardDrive size={16} className="text-subtitle"/>
                    <span className="text-sm font-bold text-title">Media Storage</span>
                  </div>
                  <span className="text-xs font-black text-subtitle">45 GB / 100 GB Used</span>
                </div>
                <div className="w-full bg-stroke rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 py-2.5 bg-sidebar border border-stroke rounded-xl text-sm font-bold text-title hover:bg-stroke hover:text-primary transition-colors">
              Upgrade Billing Tier
            </button>
          </div>

          {/* Card: Operating Hours */}
          <div className="fin-chart-card">
            <h3 className="font-bold text-title flex items-center gap-2 mb-6 border-b border-stroke pb-4">
              <Clock size={18} className="text-yellow-500"/> Facility Operating Hours
            </h3>
            <p className="text-xs text-subtitle mb-4">Set your gym hours. This controls when members can check-in via QR and is displayed in the member app.</p>
            
            <div className="flex flex-col gap-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className="flex items-center justify-between p-3 bg-background border border-stroke rounded-lg">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="accent-primary w-4 h-4" defaultChecked={day !== 'Sunday'} />
                    <span className="text-sm font-bold text-title w-24">{day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="time" defaultValue="06:00" disabled={day === 'Sunday'} className="bg-sidebar border border-stroke rounded text-xs px-2 py-1 text-title focus:outline-none focus:border-primary disabled:opacity-50" />
                    <span className="text-xs text-subtitle">to</span>
                    <input type="time" defaultValue="23:00" disabled={day === 'Sunday'} className="bg-sidebar border border-stroke rounded text-xs px-2 py-1 text-title focus:outline-none focus:border-primary disabled:opacity-50" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* =========================================================
            RIGHT COLUMN (Integrations & Dev) 
        ========================================================= */}
        <div className="flex flex-col gap-8">
          
          {/* Card: Payment Gateway Integration (Fawry) */}
          <div className="fin-chart-card border-t-4 border-t-yellow-500">
            <h3 className="font-bold text-title flex items-center gap-2 mb-6 border-b border-stroke pb-4">
              <CreditCard size={18} className="text-yellow-500"/> Fawry Payment Integration
            </h3>
            
            <p className="text-xs text-subtitle mb-4">Connect your Fawry Merchant account to process member credit card payments directly to your bank account.</p>
            
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-subtitle uppercase mb-2">Merchant ID</label>
                <div className="relative">
                  <Key size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtitle" />
                  <input type="text" defaultValue="FWY-982374928" className="w-full bg-background border border-stroke rounded-lg pl-9 pr-4 py-2.5 text-sm font-bold text-title focus:outline-none focus:border-yellow-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-subtitle uppercase mb-2">Security Secret Key</label>
                <div className="relative">
                  <ShieldCheck size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtitle" />
                  <input type="password" defaultValue="************************" className="w-full bg-background border border-stroke rounded-lg pl-9 pr-4 py-2.5 text-sm font-bold text-title focus:outline-none focus:border-yellow-500" />
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] uppercase font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">Connection Active</span>
                <button className="text-sm font-bold text-yellow-500 hover:underline">Update Credentials</button>
              </div>
            </div>
          </div>

          {/* Card: White-Labeling & Custom Domain */}
          <div className="fin-chart-card">
            <h3 className="font-bold text-title flex items-center gap-2 mb-6 border-b border-stroke pb-4">
              <Globe size={18} className="text-blue-500"/> Custom Domain Configuration
            </h3>
            
            <p className="text-xs text-subtitle mb-4">Point your own domain to the Aura servers so your staff and members see your brand in the URL (e.g. admin.yourgym.com).</p>

            <div className="mb-6">
              <label className="block text-xs font-bold text-subtitle uppercase mb-2">Your Custom Domain</label>
              <div className="flex gap-2">
                <input type="text" defaultValue="admin.caesarsgym.com" className="flex-1 bg-background border border-stroke rounded-lg px-4 py-2.5 text-sm font-bold text-title focus:outline-none focus:border-blue-500" />
                <button className="bg-sidebar border border-stroke px-4 py-2.5 rounded-lg text-sm font-bold text-title hover:bg-stroke transition-colors">Verify</button>
              </div>
            </div>

            <div className="bg-background border border-stroke rounded-xl p-4">
              <h4 className="text-xs font-bold text-title uppercase mb-3 flex items-center gap-2">
                <Info size={14} className="text-blue-500"/> DNS Configuration
              </h4>
              <p className="text-xs text-subtitle mb-4">Add the following CNAME record to your DNS provider (GoDaddy, Cloudflare, etc.).</p>
              
              <div className="bg-sidebar border border-stroke rounded-lg p-3 relative overflow-hidden font-mono text-xs">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between border-b border-stroke/50 pb-2">
                    <span className="text-subtitle">Type:</span>
                    <span className="text-title font-bold">CNAME</span>
                  </div>
                  <div className="flex justify-between border-b border-stroke/50 pb-2">
                    <span className="text-subtitle">Name/Host:</span>
                    <span className="text-title font-bold">admin</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-subtitle">Target/Value:</span>
                    <span className="text-blue-500 font-bold">cname.aurastart.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card: API & Webhooks */}
          <div className="fin-chart-card">
            <div className="flex justify-between items-center mb-6 border-b border-stroke pb-4">
              <h3 className="font-bold text-title flex items-center gap-2">
                <Webhook size={18} className="text-purple-500"/> Developer API & Webhooks
              </h3>
              <span className="text-[10px] uppercase font-bold text-title bg-sidebar px-2 py-1 rounded border border-stroke">Beta</span>
            </div>
            
            <p className="text-xs text-subtitle mb-4">Integrate Aura with your external ERP, Accounting, or Marketing tools.</p>
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center p-3 bg-background border border-stroke rounded-lg hover:border-purple-500/50 transition-colors cursor-pointer group">
                <div>
                  <span className="block text-sm font-bold text-title group-hover:text-purple-500 transition-colors">Member Created Webhook</span>
                  <span className="block text-[10px] text-subtitle mt-1">POST https://api.yourgym.com/hooks/new_member</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              </div>
              <div className="flex justify-between items-center p-3 bg-background border border-stroke rounded-lg hover:border-purple-500/50 transition-colors cursor-pointer group">
                <div>
                  <span className="block text-sm font-bold text-title group-hover:text-purple-500 transition-colors">Payment Success Webhook</span>
                  <span className="block text-[10px] text-subtitle mt-1">Not configured</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-stroke"></div>
              </div>
              
              <button className="w-full mt-2 py-2.5 border border-dashed border-stroke rounded-xl text-sm font-bold text-purple-500 hover:bg-purple-500/10 hover:border-purple-500/30 transition-colors flex justify-center items-center gap-2">
                <Plus size={16}/> Add Webhook Endpoint
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Add Plus import if not there
import { Plus } from 'lucide-react';
