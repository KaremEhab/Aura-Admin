import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, ChevronDown, CheckCircle2, Rocket, 
  ChevronRight, PlayCircle, Edit2, Trash2, PlusSquare, 
  Search, Filter, Settings, Snowflake, Pause, FileText, CheckCircle, Users, Image, Clock, Zap, Bot, Headset, Radio
} from 'lucide-react';
import './Dashboard.css';

export function Dashboard() {
  const [finTab, setFinTab] = useState('DAILY');
  const [assetTab, setAssetTab] = useState('WORKOUTS');
  const [page, setPage] = useState(1);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header-text">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Real-time health and revenue monitoring for AURA.FIT. global infrastructure.</p>
      </div>

      <div className="dashboard-grid-row-1 mt-6">
        <div className="metrics-stack">
          <div className="metric-card">
            <span className="metric-eyebrow">ACTIVE MEMBERS</span>
            <div className="metric-value-row">
              <h2>12,482</h2>
            </div>
            <span className="metric-trend positive"><TrendingUp size={14} /> +4.2% this month</span>
          </div>
          <div className="metric-card">
            <span className="metric-eyebrow">CHURN RATE</span>
            <div className="metric-value-row">
              <h2>1.8%</h2>
            </div>
            <span className="metric-trend negative"><TrendingDown size={14} /> -0.3% improvement</span>
          </div>
          <div className="metric-card">
            <div className="flex justify-between items-start">
              <span className="metric-eyebrow">TOTAL BRANCHES</span>
            </div>
            <div className="metric-value-row">
              <h2>24</h2>
            </div>
            <span className="metric-trend positive"><TrendingUp size={14} /> +2 this year</span>
          </div>
        </div>

        <div className="metrics-stack">
          <div className="metric-card">
            <div className="flex flex-col xl:flex-row justify-between items-start gap-2 xl:gap-0">
              <span className="metric-eyebrow">LIVE CAPACITY</span>
              <div className="branch-tag">
                Smouha branch <ChevronDown size={12} />
              </div>
            </div>
            <div className="metric-value-row">
              <h2>142 <span className="opacity-50 text-xl font-normal">/ 250</span></h2>
            </div>
            <div className="capacity-bar-bg mt-2">
              <div className="capacity-bar-fill" style={{ width: '56.8%' }}></div>
            </div>
          </div>
          <div className="metric-card">
            <span className="metric-eyebrow">TOTAL REVENUE</span>
            <div className="metric-value-row">
              <h2>$142.5k</h2>
            </div>
            <span className="metric-subtext">May, 2026 Gross Monthly Recurring</span>
          </div>
          <div className="metric-card">
            <div className="flex justify-between items-start">
              <span className="metric-eyebrow">NEW SIGNUPS</span>
            </div>
            <div className="metric-value-row">
              <h2>845</h2>
            </div>
            <span className="metric-trend positive"><TrendingUp size={14} /> +12% this week</span>
          </div>
        </div>

        <div className="upgrade-card relative overflow-hidden flex flex-col h-full">
          
          <div className="upgrade-top flex-1 z-10 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="upgrade-badge"><Zap size={14} /> SUPERIOR TIER AVAILABLE</span>
            </div>
            <h3 className="upgrade-title mb-6" style={{fontSize: "1.3rem"}}>AuraElite:<br/><span className="text-[#22c55e] font-normal">Global Command</span></h3>
            <ul className="upgrade-perks flex flex-col gap-4">
              <li className="flex items-center gap-3"><Bot size={16} className="text-primary" /> <span className="text-title text-sm">Unlimited AI Features</span></li>
              <li className="flex items-center gap-3"><Headset size={16} className="text-primary" /> <span className="text-title text-sm">Priority 24/7 Support</span></li>
              <li className="flex items-center gap-3"><Radio size={16} className="text-primary" /> <span className="text-title text-sm">Mass Broadcasting</span></li>
            </ul>
          </div>

          <div className="upgrade-price-box z-10 flex flex-col items-center justify-center p-5 rounded-2xl w-full">
            <span className="limited-offer mb-2 tracking-widest text-gray-400 font-bold text-[0.65rem]">LIMITED UPGRADE OFFER</span>
            <div className="price-row mb-5 flex items-baseline gap-3">
              <span className="old-price text-gray-500 line-through text-md">$199.99</span>
              <span className="new-price font-bold text-3xl tracking-tight" style={{color: "var(--primary)"}}>$149.99 <span className="text-sm  font-normal tracking-normal">/mo</span></span>
            </div>
            <button className="btn-upgrade w-full justify-center py-3 rounded-xl text-black font-bold tracking-wider text-sm flex gap-2">
              UPGRADE TO ELITE <Rocket size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="financial-card mt-6">
        <div className="fin-header flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h3 className="text-sm font-bold text-gray-400 tracking-wider">FINANCIAL PERFORMANCE OVERVIEW</h3>
          <div className="fin-toggles flex">
            {['DAILY', 'WEEKLY', 'MONTHLY'].map(tab => (
              <button 
                key={tab}
                className={finTab === tab ? 'active' : ''}
                onClick={() => setFinTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="fin-stats-grid">
          <div className="fin-stat-item">
            <span className="stat-label">TOTAL REVENUE</span>
            <h4>EGP 142,500</h4>
            <span className="stat-trend positive"><TrendingUp size={14} /> + 8.2%</span>
          </div>
          <div className="fin-stat-item">
            <span className="stat-label">FAWRY PAY</span>
            <h4>EGP 98,200</h4>
            <span className="stat-subtext">68% of Total</span>
          </div>
          <div className="fin-stat-item">
            <span className="stat-label">CASH / POS</span>
            <h4>EGP 44,300</h4>
            <span className="stat-subtext">31% of Total</span>
          </div>
          <div className="fin-stat-item">
            <span className="stat-label">AVG ORDER VALUE</span>
            <h4 className="text-green">EGP 1,240</h4>
            <span className="stat-subtext">Target: 1,150</span>
          </div>
        </div>

        <div className="fin-chart-container mt-6 relative h-[180px] w-full flex items-end">
          <div className="chart-grid-lines absolute inset-0 flex flex-col justify-between z-0 pointer-events-none pb-8 pt-2">
            <div className="border-t border-stroke w-full"></div>
            <div className="border-t border-stroke w-full"></div>
            <div className="border-t border-stroke w-full"></div>
            <div className="border-t border-stroke w-full"></div>
          </div>
          <div className="bars-wrapper relative z-10 w-full flex items-end justify-between px-2 h-full pb-8">
            {[{h: 40, l: 'Mon'}, {h: 50, l: 'Tue'}, {h: 45, l: 'Wed'}, {h: 65, l: 'Thu'}, {h: 60, l: 'Fri'}, {h: 58, l: 'Sat'}, {h: 85, l: 'Sun'}, {h: 90, l: 'Mon'}, {h: 100, l: 'Tue'}].map((item, i) => (
              <div key={i} className="chart-col flex flex-col items-center justify-end h-full gap-3 group relative">
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] py-1 px-2 rounded font-bold tracking-wider z-20 shadow-lg pointer-events-none">
                  {item.h}k
                </div>
                <div className="chart-bar-fill" style={{ height: `${item.h}%` }}></div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider absolute -bottom-6">{item.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row-3-grid mt-6">
        <div className="pricing-col flex flex-col gap-4">
          <div className="pricing-plan-card">
            <div className="plan-header">
              <div>
                <h3 className="text-green font-bold text-lg">REGULAR PLAN</h3>
                <p className="text-xs text-gray-400">Standard high-access offering</p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold">$59.99</h2>
                <p className="text-[10px] text-gray-400 font-bold tracking-wider">PER MONTH</p>
              </div>
            </div>
            <ul className="plan-features mt-4">
              <li><CheckCircle2 size={16} className="text-green" /> Unlimited Gym Access</li>
              <li><CheckCircle2 size={16} className="text-green" /> 1,200+ Video Library</li>
              <li><CheckCircle2 size={16} className="text-green" /> 2 Personal Training Sessions / mo</li>
              <li><CheckCircle2 size={16} className="text-green" /> Monthly Nutrition Coaching</li>
            </ul>
            <div className="plan-actions mt-6 flex gap-3">
              <button className="btn-edit-pricing flex-1">Edit Pricing</button>
              <button className="btn-manage-perks flex-1">Manage Perks</button>
            </div>
          </div>

          <div className="pricing-plan-card premium-plan relative">
            <div className="best-value-ribbon">BEST VALUE</div>
            <div className="plan-header">
              <div>
                <h3 className="text-green font-bold text-lg">STANDARD PLAN</h3>
                <p className="text-xs text-gray-400">Full ecosystem access</p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold">$129.99</h2>
                <p className="text-[10px] text-gray-400 font-bold tracking-wider">PER MONTH</p>
              </div>
            </div>
            <ul className="plan-features mt-4">
              <li><CheckCircle2 size={16} className="text-green" /> All Regular Features</li>
              <li><CheckCircle2 size={16} className="text-green" /> Daily Bio-Metric Analysis</li>
              <li><CheckCircle2 size={16} className="text-green" /> Custom Diet Template Access</li>
              <li><CheckCircle2 size={16} className="text-green" /> Personalized Workout Plans</li>
            </ul>
            <div className="plan-actions mt-6 flex gap-3">
              <button className="btn-edit-pricing flex-1">Edit Pricing</button>
              <button className="btn-manage-perks flex-1">Manage Perks</button>
            </div>
          </div>
        </div>

        <div className="asset-library-card flex flex-col">
          <div className="asset-header flex justify-between items-center mb-6">
            <div className="flex items-center gap-3" style={{ color: "var(--title)", fontWeight: "500", fontSize: "1.1rem" }}>
              <Image size={24} className="text-gray-400" strokeWidth={1.5} /> Asset Library
            </div>
            <button className="asset-count-btn text-xs font-bold flex items-center gap-1 rounded-full px-4 py-2" style={{letterSpacing: "0.5px"}}>
              1,248 ASSETS <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="asset-tabs flex justify-between mb-6">
            {['WORKOUTS', 'DIETS', 'TEMPLATES'].map(tab => (
              <button 
                key={tab}
                className={`tab-btn font-bold ${assetTab === tab ? 'active' : ''}`}
                onClick={() => setAssetTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="asset-list flex flex-col gap-4 flex-1">
            <div className="asset-item">
              <div className="asset-thumb">
                <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=100&q=80" alt="Workout" />
                <div className="play-overlay"><PlayCircle size={24} /></div>
              </div>
              <div className="asset-info">
                <h4>High-Intensity Back Blast</h4>
                <div className="asset-meta flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={13} /> 12:45</span>
                  <span className="flex items-center gap-1"><Zap size={13} /> Intermediate</span>
                </div>
                <div className="asset-tags mt-2">
                  <span className="tag border-tag">STRENGTH</span>
                  <span className="tag border-tag">HYPERTROPHY</span>
                </div>
              </div>
              <div className="asset-actions flex gap-4 pr-2">
                <Edit2 size={18} className="text-[#22c55e] cursor-pointer hover:scale-110 transition-transform" />
                <Trash2 size={18} className="text-[#ef4444] cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="asset-item">
              <div className="asset-thumb">
                <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=100&q=80" alt="Workout" />
                <div className="play-overlay"><PlayCircle size={24} /></div>
              </div>
              <div className="asset-info">
                <h4>Core Stability Circuit</h4>
                <div className="asset-meta flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={13} /> 15:00</span>
                  <span className="flex items-center gap-1"><Zap size={13} /> Beginner</span>
                </div>
                <div className="asset-tags mt-2">
                  <span className="tag border-tag">ENDURANCE</span>
                  <span className="tag border-tag">STABILITY</span>
                </div>
              </div>
              <div className="asset-actions flex gap-4 pr-2">
                <Edit2 size={18} className="text-[#22c55e] cursor-pointer hover:scale-110 transition-transform" />
                <Trash2 size={18} className="text-[#ef4444] cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="asset-item">
              <div className="asset-thumb">
                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=100&q=80" alt="Workout" />
                <div className="play-overlay"><PlayCircle size={24} /></div>
              </div>
              <div className="asset-info">
                <h4>Dynamic Flexibility Flow</h4>
                <div className="asset-meta flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={13} /> 10:30</span>
                  <span className="flex items-center gap-1"><Zap size={13} /> Advanced</span>
                </div>
                <div className="asset-tags mt-2">
                  <span className="tag border-tag">MOBILITY</span>
                  <span className="tag border-tag">FLEXIBILITY</span>
                </div>
              </div>
              <div className="asset-actions flex gap-4 pr-2">
                <Edit2 size={18} className="text-[#22c55e] cursor-pointer hover:scale-110 transition-transform" />
                <Trash2 size={18} className="text-[#ef4444] cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>

          <button className="btn-create-template mt-6 w-full flex items-center justify-center gap-2 tracking-widest uppercase">
            <PlusSquare size={18} /> CREATE CUSTOM TEMPLATE
          </button>
        </div>
      </div>

      <div className="dashboard-grid-row-4 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="financial-card flex flex-col lg:col-span-2">
          <div className="fin-header mb-6">
            <h3 className="text-sm font-bold text-gray-400 tracking-wider">RECENT MEMBERS LATEST LOGINS</h3>
          </div>
          <div className="table-responsive overflow-x-auto w-full pb-2 custom-scrollbar">
            <table className="db-table w-full text-left min-w-[600px]">
              <thead>
                <tr className="text-xs text-gray-400 font-bold uppercase tracking-wider border-b border-white/5">
                  <th className="pb-3">NAME</th>
                  <th className="pb-3">PLAN</th>
                  <th className="pb-3">JOIN DATE</th>
                  <th className="pb-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { n: 'Marcus King', p: 'PREMIUM', d: 'Oct 12, 2023', s: 'Active' },
                  { n: 'Sarah Lopez', p: 'VIP ELITE', d: 'Oct 11, 2023', s: 'Active' },
                  { n: 'David Chen', p: 'REGULAR', d: 'Oct 10, 2023', s: 'Offline' },
                  { n: 'Emma Watson', p: 'PREMIUM', d: 'Oct 09, 2023', s: 'Active' },
                  { n: 'James Smith', p: 'VIP ELITE', d: 'Oct 08, 2023', s: 'Active' },
                  { n: 'Olivia Jones', p: 'REGULAR', d: 'Oct 07, 2023', s: 'Offline' },
                  { n: 'William Brown', p: 'PREMIUM', d: 'Oct 06, 2023', s: 'Active' },
                  { n: 'Sophia Taylor', p: 'VIP ELITE', d: 'Oct 05, 2023', s: 'Active' },
                  { n: 'Lucas Anderson', p: 'REGULAR', d: 'Oct 04, 2023', s: 'Offline' },
                  { n: 'Mia Thomas', p: 'PREMIUM', d: 'Oct 03, 2023', s: 'Active' }
                ].map((user, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-bold" style={{ color: "var(--title)" }}>{user.n}</td>
                    <td className="py-3">
                      <span className={`tier-badge ${user.p === 'VIP ELITE' ? 'elite' : user.p === 'PREMIUM' ? 'premium' : ''} text-[10px]`}>
                        {user.p}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400">{user.d}</td>
                    <td className="py-3">
                      <span className={`flex items-center gap-2 ${user.s === 'Active' ? 'text-green-400' : 'text-gray-500'}`}>
                        <span className={`w-2 h-2 rounded-full ${user.s === 'Active' ? 'bg-green-400' : 'bg-gray-500'}`}></span> {user.s}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="financial-card flex flex-col">
          <div className="fin-header mb-6">
            <h3 className="text-sm font-bold text-gray-400 tracking-wider">PEAK HOURS</h3>
          </div>
          <div className="flex-1 flex flex-col justify-end gap-2">
            <div className="flex items-end justify-between h-[250px] mt-4 px-2 pb-6">
              {[{h: 20, l: '6AM'}, {h: 40, l: '9AM'}, {h: 55, l: '12PM'}, {h: 80, l: '3PM'}, {h: 100, l: '6PM'}, {h: 65, l: '9PM'}].map((item, i) => (
                <div key={i} className="flex flex-col items-center justify-end h-full gap-2 group relative w-full px-1 sm:px-2">
                  <div className="absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] py-1 px-2 rounded font-bold tracking-wider z-20 shadow-lg pointer-events-none -translate-y-full">
                    {item.h}%
                  </div>
                  <div className="w-full max-w-[40px] rounded-t-md transition-all duration-300 group-hover:-translate-y-1" style={{ height: `${item.h}%`, background: 'linear-gradient(to top, rgba(34, 197, 94, 0.2), #22c55e)' }}></div>
                  <span className="text-[10px] text-gray-500 font-bold absolute -bottom-6">{item.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="trainees-db-card mt-6">
        <div className="db-header flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center" style={{ color: "var(--title)", gap: "8px", fontWeight: "bold" }}>
            <Users size={20} className="text-gray-400 shrink-0" /> Trainees Database
          </div>
          <div className="db-actions flex flex-wrap gap-3 w-full md:w-auto">
            <div className="search-input-wrapper relative flex-1 min-w-[200px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" placeholder="Search members..." className="db-search w-full" />
            </div>
            <button className="btn-filter flex items-center gap-2 whitespace-nowrap">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        <div className="table-responsive overflow-x-auto w-full pb-4 custom-scrollbar">
          <table className="db-table w-full text-left min-w-[900px]">
            <thead>
              <tr className="text-xs text-gray-400 font-bold uppercase tracking-wider border-b border-white/5">
                <th className="pb-4">MEMBER</th>
                <th className="pb-4">TIER</th>
                <th className="pb-4">STATUS</th>
                <th className="pb-4">LAST ACTIVITY</th>
                <th className="pb-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar-initials bg-green-500/20 text-green-400 font-bold rounded p-2 text-xs">MK</div>
                    <div>
                      <div className="font-bold" style={{ color: "var(--title)" }}>Marcus King</div>
                      <div className="text-xs text-gray-500">m.king@email.com</div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className="tier-badge premium">PREMIUM</span>
                </td>
                <td className="py-4">
                  <span className="status-badge flex items-center gap-2 text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span> Active
                  </span>
                </td>
                <td className="py-4 text-gray-400">Today, 08:45 AM</td>
                <td className="py-4 text-right">
                  <div className="flex justify-end gap-3 text-gray-500">
                    <Settings size={18} className="hover:text-white cursor-pointer" />
                    <Snowflake size={18} className="hover:text-white cursor-pointer" />
                    <Trash2 size={18} className="hover:text-red-500 cursor-pointer text-red-400/50" />
                  </div>
                </td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar-initials bg-gray-500/20 text-gray-400 font-bold rounded p-2 text-xs">SL</div>
                    <div>
                      <div className="font-bold" style={{ color: "var(--title)" }}>Sarah Lopez</div>
                      <div className="text-xs text-gray-500">sarah.l@gmail.com</div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className="tier-badge elite">VIP ELITE</span>
                </td>
                <td className="py-4">
                  <span className="status-badge flex items-center gap-2 text-blue-400">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span> Frozen
                  </span>
                </td>
                <td className="py-4 text-gray-400">12 Oct, 2023</td>
                <td className="py-4 text-right">
                  <div className="flex justify-end gap-3 text-gray-500">
                    <Settings size={18} className="hover:text-white cursor-pointer" />
                    <Pause size={18} className="hover:text-white cursor-pointer" />
                    <Trash2 size={18} className="hover:text-red-500 cursor-pointer text-red-400/50" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="db-pagination flex justify-between items-center mt-6 text-xs text-gray-500">
          <span>Showing {(page - 1) * 10 + 1}-{Math.min(page * 10, 12482)} of 12,482 members</span>
          <div className="flex items-center gap-1">
            <button 
              className="px-2 py-1 rounded hover:bg-white/5"
              onClick={() => setPage(Math.max(1, page - 1))}
            >&lt;</button>
            
            {[1, 2, 3].map(p => (
              <button 
                key={p}
                className={`px-2 py-1 rounded ${page === p ? 'bg-green-500/20 text-green-400 font-bold' : 'hover:bg-white/5 hover:text-white'}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            
            <span>...</span>
            <button 
              className={`px-2 py-1 rounded ${page === 52 ? 'bg-green-500/20 text-green-400 font-bold' : 'hover:bg-white/5 hover:text-white'}`}
              onClick={() => setPage(52)}
            >
              52
            </button>
            
            <button 
              className="px-2 py-1 rounded hover:bg-white/5"
              onClick={() => setPage(Math.min(52, page + 1))}
            >&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZapIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );
}
