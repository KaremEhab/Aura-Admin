import React, { useState } from 'react';
import { 
  BarChart2, TrendingUp, Users, Activity, 
  Clock, AlertTriangle, Target, DollarSign, Award, LineChart, PieChart as PieChartIcon
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, Legend, ComposedChart, Line, Cell, PieChart, Pie
} from 'recharts';
import './Analytics.css';

// -------------------------------------------------------------
// MOCK DATA ENGINE
// -------------------------------------------------------------

const pipelineData = [
  { month: 'Jan', renewals: 25000, newSignups: 8000, ltvAvg: 900 },
  { month: 'Feb', renewals: 26000, newSignups: 7500, ltvAvg: 920 },
  { month: 'Mar', renewals: 27500, newSignups: 9000, ltvAvg: 950 },
  { month: 'Apr', renewals: 27000, newSignups: 8500, ltvAvg: 980 },
  { month: 'May', renewals: 29000, newSignups: 10000, ltvAvg: 1050 },
  { month: 'Jun', renewals: 31000, newSignups: 11500, ltvAvg: 1100 },
];

const peakHoursData = [
  { hour: '5 AM', volume: 45 }, { hour: '6 AM', volume: 120 }, { hour: '7 AM', volume: 180 },
  { hour: '8 AM', volume: 210 }, { hour: '9 AM', volume: 150 }, { hour: '10 AM', volume: 90 },
  { hour: '11 AM', volume: 75 }, { hour: '12 PM', volume: 110 }, { hour: '1 PM', volume: 130 },
  { hour: '2 PM', volume: 85 }, { hour: '3 PM', volume: 100 }, { hour: '4 PM', volume: 190 },
  { hour: '5 PM', volume: 280 }, { hour: '6 PM', volume: 340 }, { hour: '7 PM', volume: 310 },
  { hour: '8 PM', volume: 220 }, { hour: '9 PM', volume: 140 }, { hour: '10 PM', volume: 60 },
];

const atRiskData = [
  { segment: 'Active (0-3)', count: 850, fill: '#22c55e' },
  { segment: 'Slipping (4-7)', count: 420, fill: '#84cc16' },
  { segment: 'Warning (8-14)', count: 210, fill: '#eab308' },
  { segment: 'At Risk (15-30)', count: 145, fill: '#f97316' },
  { segment: 'Ghosted (30+)', count: 85, fill: '#ef4444' },
];

const ptPerformanceData = [
  { name: 'Emma S.', sessions: 162, conversion: 88 },
  { name: 'John D.', sessions: 145, conversion: 82 },
  { name: 'Sarah J.', sessions: 130, conversion: 75 },
  { name: 'Mike R.', sessions: 98, conversion: 65 },
];

const revenueByTierData = [
  { name: 'Standard', value: 120000, fill: '#3b82f6' },
  { name: 'Premium', value: 85000, fill: '#a855f7' },
  { name: 'VIP', value: 45000, fill: '#f59e0b' },
];

// -------------------------------------------------------------
// CUSTOM TOOLTIPS
// -------------------------------------------------------------

const customTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-sidebar border border-stroke p-3 rounded-xl shadow-xl">
        <p className="font-bold text-title mb-2">{label}</p>
        {payload.map((pld, idx) => (
          <p key={idx} style={{ color: pld.color || pld.fill }} className="text-sm font-medium">
            {pld.name || pld.dataKey}: {pld.name?.includes('LTV') || pld.name?.includes('Revenue') ? '$' : ''}{pld.value.toLocaleString()}
            {pld.name?.includes('Conversion') ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------

export function Analytics() {
  const [dateRange, setDateRange] = useState('Last 6 Months');
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Executive Overview', icon: Activity },
    { id: 'financials', label: 'Financials & Sales', icon: DollarSign },
    { id: 'attendance', label: 'Attendance & Churn', icon: Users },
    { id: 'staff', label: 'Staff Performance', icon: Award },
  ];

  return (
    <div className="analytics-container animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1>Global Analytics</h1>
          <p className="text-subtitle mt-1">Operational intelligence to track revenue pipelines, facility utilization, and staff performance.</p>
        </div>
        <select 
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="bg-background border border-stroke rounded-xl px-4 py-2 text-sm font-bold text-title focus:outline-none focus:border-primary"
        >
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
          <option>Last 6 Months</option>
          <option>Year to Date</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="fin-tabs flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-stroke">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id 
              ? 'bg-sidebar text-primary border-t border-l border-r border-stroke shadow-inner' 
              : 'bg-transparent text-subtitle hover:text-title hover:bg-sidebar border-transparent'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* =========================================
          TAB: OVERVIEW
      ============================================= */}
      {activeTab === 'overview' && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="fin-kpi-card border-l-4 border-primary">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-subtitle uppercase">Monthly Revenue</span>
                <div className="bg-primary-lite p-1.5 rounded-lg text-primary"><DollarSign size={16}/></div>
              </div>
              <h3 className="text-3xl font-black text-title mb-1">$42,500</h3>
              <p className="text-sm text-primary font-bold flex items-center gap-1"><TrendingUp size={14}/> +15% vs last month</p>
            </div>
            <div className="fin-kpi-card border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-subtitle uppercase">Active Members</span>
                <div className="bg-blue-500/10 p-1.5 rounded-lg text-blue-500"><Users size={16}/></div>
              </div>
              <h3 className="text-3xl font-black text-title mb-1">1,204</h3>
              <p className="text-sm text-green-500 font-bold flex items-center gap-1"><TrendingUp size={14}/> +42 new this week</p>
            </div>
            <div className="fin-kpi-card border-l-4 border-yellow-500">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-subtitle uppercase">Facility Utilization</span>
                <div className="bg-yellow-500/10 p-1.5 rounded-lg text-yellow-500"><Activity size={16}/></div>
              </div>
              <h3 className="text-3xl font-black text-title mb-1">68%</h3>
              <p className="text-sm text-subtitle font-medium">Optimal capacity is 75%</p>
            </div>
          </div>

          <div className="fin-chart-card mb-8 border-2 border-stroke">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-title flex items-center gap-2"><BarChart2 size={18} className="text-primary"/> The Revenue Pipeline</h3>
                <p className="text-xs text-subtitle mt-1">Tracking the health of renewals against new acquisitions, overlaid with average LTV.</p>
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={pipelineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRenewals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--subtitle)" tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="var(--subtitle)" tickFormatter={(val) => `$${val/1000}k`} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="var(--yellow-500)" tickFormatter={(val) => `$${val}`} tickLine={false} axisLine={false} />
                  <RechartsTooltip content={customTooltip} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--title)', paddingTop: '20px' }}/>
                  <Area yAxisId="left" type="monotone" dataKey="renewals" name="Recurring Renewals" stackId="1" stroke="#22c55e" fill="url(#colorRenewals)" />
                  <Area yAxisId="left" type="monotone" dataKey="newSignups" name="New Acquisitions" stackId="1" stroke="#3b82f6" fill="url(#colorNew)" />
                  <Line yAxisId="right" type="monotone" dataKey="ltvAvg" name="Avg LTV Growth" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          TAB: FINANCIALS
      ============================================= */}
      {activeTab === 'financials' && (
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="fin-chart-card">
            <div className="mb-6">
              <h3 className="font-bold text-title flex items-center gap-2"><PieChartIcon size={18} className="text-primary"/> Revenue by Tier</h3>
              <p className="text-xs text-subtitle mt-1">Distribution of monthly recurring revenue.</p>
            </div>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByTierData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {revenueByTierData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                    ))}
                  </Pie>
                  <RechartsTooltip content={customTooltip} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="fin-chart-card">
            <div className="mb-6">
              <h3 className="font-bold text-title flex items-center gap-2"><LineChart size={18} className="text-blue-500"/> LTV to CAC Ratio</h3>
              <p className="text-xs text-subtitle mt-1">Lifetime Value vs Customer Acquisition Cost over time.</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={pipelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--subtitle)" tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--subtitle)" tickLine={false} axisLine={false} />
                  <RechartsTooltip content={customTooltip} />
                  <Bar dataKey="newSignups" name="CAC Spend (Est.)" fill="#3b82f6" radius={[4,4,0,0]} barSize={20} />
                  <Line type="monotone" dataKey="ltvAvg" name="LTV Growth" stroke="#22c55e" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          TAB: ATTENDANCE & CHURN
      ============================================= */}
      {activeTab === 'attendance' && (
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="fin-chart-card">
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-title flex items-center gap-2"><AlertTriangle size={18} className="text-alert"/> At-Risk Churn Funnel</h3>
                <p className="text-xs text-subtitle mt-1">Members grouped by days since last check-in.</p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={atRiskData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke)" horizontal={false} />
                  <XAxis type="number" stroke="var(--subtitle)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis dataKey="segment" type="category" stroke="var(--title)" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} width={100} />
                  <RechartsTooltip cursor={{ fill: 'var(--stroke)', opacity: 0.2 }} contentStyle={{ backgroundColor: 'var(--sidebar)', borderColor: 'var(--stroke)', borderRadius: '8px' }} />
                  <Bar dataKey="count" name="Members" radius={[0, 4, 4, 0]} barSize={24}>
                    {atRiskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="fin-chart-card">
            <div className="mb-6">
              <h3 className="font-bold text-title flex items-center gap-2"><Clock size={18} className="text-primary"/> Peak Hours Heatmap</h3>
              <p className="text-xs text-subtitle mt-1">Average foot traffic per hour to schedule floor trainers.</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHoursData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke)" vertical={false} />
                  <XAxis dataKey="hour" stroke="var(--subtitle)" fontSize={10} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                  <YAxis stroke="var(--subtitle)" fontSize={10} tickLine={false} axisLine={false} />
                  <RechartsTooltip cursor={{ fill: 'var(--stroke)', opacity: 0.2 }} contentStyle={{ backgroundColor: 'var(--sidebar)', borderColor: 'var(--stroke)', borderRadius: '8px' }} />
                  <Bar dataKey="volume" name="Check-ins" radius={[4, 4, 0, 0]}>
                    {peakHoursData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.volume > 200 ? 'var(--primary)' : entry.volume > 100 ? '#84cc16' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          TAB: STAFF PERFORMANCE
      ============================================= */}
      {activeTab === 'staff' && (
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="fin-chart-card">
            <div className="mb-6">
              <h3 className="font-bold text-title flex items-center gap-2"><Award size={18} className="text-primary"/> PT Session Volume</h3>
              <p className="text-xs text-subtitle mt-1">Total sessions delivered by top trainers.</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ptPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--subtitle)" tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--subtitle)" tickLine={false} axisLine={false} />
                  <RechartsTooltip cursor={{ fill: 'var(--stroke)', opacity: 0.2 }} contentStyle={{ backgroundColor: 'var(--sidebar)', borderColor: 'var(--stroke)', borderRadius: '8px' }} />
                  <Bar dataKey="sessions" name="Sessions Delivered" radius={[4, 4, 0, 0]} barSize={40}>
                    {ptPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="var(--primary)" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="fin-chart-card">
            <div className="mb-6">
              <h3 className="font-bold text-title flex items-center gap-2"><Target size={18} className="text-yellow-500"/> Lead Conversion Rates</h3>
              <p className="text-xs text-subtitle mt-1">Percentage of trial members converted to paid clients.</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ptPerformanceData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} stroke="var(--subtitle)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="var(--title)" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} width={80} />
                  <RechartsTooltip cursor={{ fill: 'var(--stroke)', opacity: 0.2 }} contentStyle={{ backgroundColor: 'var(--sidebar)', borderColor: 'var(--stroke)', borderRadius: '8px' }} />
                  <Bar dataKey="conversion" name="Conversion Rate %" radius={[0, 4, 4, 0]} barSize={24}>
                    {ptPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.conversion >= 80 ? '#f59e0b' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
