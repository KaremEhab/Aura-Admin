import React, { useState } from 'react';
import {
  DollarSign, TrendingUp, TrendingDown, Activity, 
  Download, Filter, Wallet, CreditCard, ArrowUpRight, ArrowDownRight,
  PieChart as PieChartIconSvg, BarChart2, Layers, Briefcase, Calendar, 
  Users, RefreshCcw, ShieldAlert, Target, MapPin, Building
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area, ComposedChart
} from 'recharts';
import './Financials.css';

// --- ENHANCED MOCK DATA ---

const kpiData = {
  mrr: '$42,500', mrrGrowth: '+5.2%',
  arr: '$510,000', arrGrowth: '+12.4%',
  cac: '$45', cacTrend: '-2.1%',
  ltv: '$1,250', ltvTrend: '+8.5%',
  churnRate: '3.2%', churnTrend: '-0.5%',
  operatingMargin: '35%', marginTrend: '+2.0%',
  totalAssets: '$2.4M', assetGrowth: '+1.5%',
  totalLiabilities: '$320K', liabilityTrend: '-4.0%'
};

const yearlyFinancials = [
  { name: 'Jul', revenue: 42000, expenses: 27000, profit: 15000 },
  { name: 'Aug', revenue: 43500, expenses: 27500, profit: 16000 },
  { name: 'Sep', revenue: 41000, expenses: 26000, profit: 15000 },
  { name: 'Oct', revenue: 45000, expenses: 28000, profit: 17000 },
  { name: 'Nov', revenue: 48000, expenses: 30000, profit: 18000 },
  { name: 'Dec', revenue: 52000, expenses: 31000, profit: 21000 },
  { name: 'Jan', revenue: 50000, expenses: 29000, profit: 21000 },
  { name: 'Feb', revenue: 48000, expenses: 30000, profit: 18000 },
  { name: 'Mar', revenue: 52000, expenses: 31000, profit: 21000 },
  { name: 'Apr', revenue: 55000, expenses: 31500, profit: 23500 },
  { name: 'May', revenue: 58000, expenses: 32000, profit: 26000 },
  { name: 'Jun', revenue: 61000, expenses: 34000, profit: 27000 }
];

const branchPerformance = [
  { name: 'Main Branch (City Center)', revenue: 32000, expenses: 18000, margin: '43%', members: 850 },
  { name: 'Smouha Branch', revenue: 18000, expenses: 10000, margin: '44%', members: 420 },
  { name: 'Sporting Branch', revenue: 11000, expenses: 6000, margin: '45%', members: 300 }
];

const expenseBreakdown = [
  { name: 'Staff Salaries', value: 18000, percentage: '53%' },
  { name: 'Facility Rent', value: 6000, percentage: '18%' },
  { name: 'Utilities & Maint.', value: 4500, percentage: '13%' },
  { name: 'Marketing & Ads', value: 3500, percentage: '10%' },
  { name: 'Software & IT', value: 2000, percentage: '6%' }
];

const revenueBreakdown = [
  { name: 'Memberships', value: 38000, percentage: '62%' },
  { name: 'PT Sessions', value: 15000, percentage: '25%' },
  { name: 'Merchandise', value: 5000, percentage: '8%' },
  { name: 'Day Passes', value: 3000, percentage: '5%' }
];

const payrollData = [
  { role: 'Personal Trainers', count: 12, totalPayout: '$14,500', avgPerHead: '$1,208', trend: '+2%' },
  { role: 'Management', count: 3, totalPayout: '$10,500', avgPerHead: '$3,500', trend: '0%' },
  { role: 'Receptionists', count: 4, totalPayout: '$6,800', avgPerHead: '$1,700', trend: '+5%' },
  { role: 'Cleaning Staff', count: 5, totalPayout: '$4,000', avgPerHead: '$800', trend: '0%' }
];

const recentTransactions = [
  { id: 'TRX-901', date: '20 May 2026, 14:30', category: 'Revenue', subCategory: 'Annual Plan', account: 'Stripe', by: 'Alex Mercer', amount: 1200, status: 'Completed', incoming: true },
  { id: 'TRX-902', date: '19 May 2026, 09:15', category: 'Expense', subCategory: 'Equipment Repair', account: 'Corporate Bank', by: 'GymTech Services', amount: 3500, status: 'Completed', incoming: false },
  { id: 'TRX-903', date: '18 May 2026, 18:45', category: 'Revenue', subCategory: 'PT Package', account: 'POS - Main', by: 'Sarah Jenkins (Staff)', amount: 300, status: 'Completed', incoming: true },
  { id: 'TRX-904', date: '18 May 2026, 08:00', category: 'Expense', subCategory: 'Utility Bill', account: 'Auto-Pay', by: 'City Water Dept', amount: 450, status: 'Completed', incoming: false },
  { id: 'TRX-905', date: '17 May 2026, 12:20', category: 'Revenue', subCategory: 'Merch (Supplements)', account: 'POS - Smouha', by: 'Emma Stone', amount: 85, status: 'Completed', incoming: true },
  { id: 'TRX-906', date: '16 May 2026, 09:00', category: 'Expense', subCategory: 'Marketing (Meta Ads)', account: 'Credit Card', by: 'Facebook Inc.', amount: 1200, status: 'Completed', incoming: false },
  { id: 'TRX-907', date: '15 May 2026, 10:00', category: 'Payroll', subCategory: 'Salary Processing', account: 'Corporate Bank', by: 'James Sullivan', amount: 35800, status: 'Pending', incoming: false },
  { id: 'TRX-908', date: '15 May 2026, 15:30', category: 'Revenue', subCategory: 'Monthly Plan', account: 'Stripe', by: 'Liam Carter', amount: 50, status: 'Failed', incoming: true },
];

const COLORS_EXPENSE = ['#ef4444', '#f97316', '#f59e0b', '#8b5cf6', '#64748b'];
const COLORS_REVENUE = ['#22c55e', '#10b981', '#06b6d4', '#3b82f6'];

export function Financials() {
  const [activeView, setActiveView] = useState('overview'); // overview, revenue, expenses, transactions
  const [timeRange, setTimeRange] = useState('6M');

  const filteredYearly = timeRange === '6M' ? yearlyFinancials.slice(-6) : 
                         timeRange === '3M' ? yearlyFinancials.slice(-3) : 
                         timeRange === '1M' ? yearlyFinancials.slice(-1) : yearlyFinancials;

  return (
    <div className="fin-container">
      {/* Header */}
      <div className="fin-header flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1>Financial Intelligence HQ</h1>
          <p className="text-subtitle mt-1">Deep analytics, cash flow tracking, asset management, and operational accounting for Aura Fitness.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 bg-background border border-stroke px-4 py-2 rounded-xl text-sm font-bold text-title hover:bg-stroke transition-colors">
            <RefreshCcw size={16} /> Sync ERP Data
          </button>
          <button className="flex items-center gap-2 bg-background border border-stroke px-4 py-2 rounded-xl text-sm font-bold text-title hover:bg-stroke transition-colors">
            <Filter size={16} /> Filter Date Range
          </button>
          <button className="flex items-center gap-2 bg-primary-lite text-primary border border-primary-border px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-colors">
            <Download size={16} /> Export Financial Report
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="fin-tabs flex gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Executive Overview', icon: BarChart2 },
          { id: 'revenue', label: 'Revenue Streams & Branches', icon: TrendingUp },
          { id: 'expenses', label: 'Operating Expenses & Payroll', icon: TrendingDown },
          { id: 'transactions', label: 'Master Ledger', icon: Layers },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeView === tab.id 
              ? 'bg-primary text-black shadow-[0_4px_15px_rgba(34,197,94,0.3)]' 
              : 'bg-sidebar border border-stroke text-subtitle hover:text-title hover:bg-background'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* --- EXECUTIVE OVERVIEW --- */}
      {activeView === 'overview' && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="fin-kpi-micro">
              <span className="kpi-label">MRR</span>
              <div className="flex items-end justify-between">
                <h3 className="kpi-value text-lg lg:text-xl">{kpiData.mrr}</h3>
                <span className="text-[10px] font-bold text-green-500">{kpiData.mrrGrowth}</span>
              </div>
            </div>
            <div className="fin-kpi-micro">
              <span className="kpi-label">ARR</span>
              <div className="flex items-end justify-between">
                <h3 className="kpi-value text-lg lg:text-xl">{kpiData.arr}</h3>
                <span className="text-[10px] font-bold text-green-500">{kpiData.arrGrowth}</span>
              </div>
            </div>
            <div className="fin-kpi-micro">
              <span className="kpi-label">CAC</span>
              <div className="flex items-end justify-between">
                <h3 className="kpi-value text-lg lg:text-xl">{kpiData.cac}</h3>
                <span className="text-[10px] font-bold text-green-500">{kpiData.cacTrend}</span>
              </div>
            </div>
            <div className="fin-kpi-micro">
              <span className="kpi-label">LTV</span>
              <div className="flex items-end justify-between">
                <h3 className="kpi-value text-lg lg:text-xl">{kpiData.ltv}</h3>
                <span className="text-[10px] font-bold text-green-500">{kpiData.ltvTrend}</span>
              </div>
            </div>
            <div className="fin-kpi-micro">
              <span className="kpi-label">Churn</span>
              <div className="flex items-end justify-between">
                <h3 className="kpi-value text-lg lg:text-xl">{kpiData.churnRate}</h3>
                <span className="text-[10px] font-bold text-green-500">{kpiData.churnTrend}</span>
              </div>
            </div>
            <div className="fin-kpi-micro">
              <span className="kpi-label">Margin</span>
              <div className="flex items-end justify-between">
                <h3 className="kpi-value text-lg lg:text-xl">{kpiData.operatingMargin}</h3>
                <span className="text-[10px] font-bold text-green-500">{kpiData.marginTrend}</span>
              </div>
            </div>
            <div className="fin-kpi-micro bg-primary-lite border-primary-border">
              <span className="kpi-label text-primary">Total Assets</span>
              <div className="flex items-end justify-between">
                <h3 className="kpi-value text-lg lg:text-xl text-primary">{kpiData.totalAssets}</h3>
                <span className="text-[10px] font-bold text-green-500">{kpiData.assetGrowth}</span>
              </div>
            </div>
            <div className="fin-kpi-micro bg-red-500/10 border-red-500/20">
              <span className="kpi-label text-red-500">Liabilities</span>
              <div className="flex items-end justify-between">
                <h3 className="kpi-value text-lg lg:text-xl text-red-500">{kpiData.totalLiabilities}</h3>
                <span className="text-[10px] font-bold text-green-500">{kpiData.liabilityTrend}</span>
              </div>
            </div>
          </div>

          {/* Main Profitability Chart */}
          <div className="fin-chart-card mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-title flex items-center gap-2"><Activity size={18} className="text-primary"/> Cash Flow & Profitability Trend</h3>
              <div className="flex bg-background border border-stroke rounded-lg p-1">
                {['3M', '6M', '1Y'].map(range => (
                  <button 
                    key={range}
                    className={`px-3 py-1 text-xs font-bold rounded-md ${timeRange === range ? 'bg-primary text-black' : 'text-subtitle hover:text-title'}`}
                    onClick={() => setTimeRange(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={filteredYearly} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--subtitle)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--subtitle)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                  <RechartsTooltip 
                    cursor={{ fill: 'var(--stroke)', opacity: 0.2 }}
                    contentStyle={{ backgroundColor: 'var(--sidebar)', borderColor: 'var(--stroke)', borderRadius: '12px', color: 'var(--title)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--title)', paddingTop: '20px' }}/>
                  <Bar dataKey="revenue" name="Total Revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="expenses" name="Total Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
                  <Area type="monotone" dataKey="profit" name="Net Profit" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdowns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="fin-chart-card flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 w-full h-[250px]">
                <h3 className="font-bold text-title flex items-center gap-2 mb-4"><PieChartIconSvg size={18} className="text-primary"/> Revenue Breakdown</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={revenueBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                      {revenueBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS_REVENUE[index % COLORS_REVENUE.length]} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: 'var(--sidebar)', borderColor: 'var(--stroke)', borderRadius: '8px', color: 'var(--title)' }} formatter={(value) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 w-full flex flex-col gap-3">
                {revenueBreakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-background border border-stroke p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS_REVENUE[idx] }}></span>
                      <span className="text-sm font-bold text-title">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm font-black text-title">${item.value.toLocaleString()}</span>
                      <span className="block text-xs text-subtitle">{item.percentage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fin-chart-card flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 w-full h-[250px]">
                <h3 className="font-bold text-title flex items-center gap-2 mb-4"><PieChartIconSvg size={18} className="text-alert"/> Expense Breakdown</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                      {expenseBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS_EXPENSE[index % COLORS_EXPENSE.length]} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: 'var(--sidebar)', borderColor: 'var(--stroke)', borderRadius: '8px', color: 'var(--title)' }} formatter={(value) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 w-full flex flex-col gap-2">
                {expenseBreakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-background border border-stroke p-2.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS_EXPENSE[idx] }}></span>
                      <span className="text-xs font-bold text-title">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm font-black text-title">${item.value.toLocaleString()}</span>
                      <span className="block text-[10px] text-subtitle">{item.percentage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- REVENUE STREAMS & BRANCHES --- */}
      {activeView === 'revenue' && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="fin-kpi-card bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30">
              <span className="kpi-label">Active Subscriptions Revenue</span>
              <h3 className="kpi-value text-3xl text-green-500 mb-2">$38,000 / mo</h3>
              <p className="text-sm text-title font-medium flex items-center gap-2"><Target size={14}/> Target: $40,000 (95% Achieved)</p>
            </div>
            <div className="fin-kpi-card bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/30">
              <span className="kpi-label">PT Sessions & Upsells</span>
              <h3 className="kpi-value text-3xl text-blue-500 mb-2">$15,000 / mo</h3>
              <p className="text-sm text-title font-medium flex items-center gap-2"><TrendingUp size={14}/> +15% vs Last Month</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="fin-chart-card lg:col-span-2 h-[400px]">
               <h3 className="font-bold text-title flex items-center gap-2 mb-6"><TrendingUp size={18} className="text-primary"/> Revenue Growth by Stream</h3>
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={filteredYearly} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                       <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" stroke="var(--stroke)" vertical={false} />
                   <XAxis dataKey="name" stroke="var(--subtitle)" />
                   <YAxis stroke="var(--subtitle)" tickFormatter={(val) => `$${val/1000}k`} />
                   <RechartsTooltip contentStyle={{ backgroundColor: 'var(--sidebar)', borderColor: 'var(--stroke)' }} />
                   <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
            <div className="fin-chart-card overflow-y-auto">
               <h3 className="font-bold text-title flex items-center gap-2 mb-6"><Building size={18} className="text-primary"/> Branch Performance</h3>
               <div className="flex flex-col gap-4">
                 {branchPerformance.map((branch, idx) => (
                   <div key={idx} className="bg-background border border-stroke rounded-xl p-4">
                     <h4 className="text-sm font-bold text-title mb-3 flex items-center gap-2"><MapPin size={14} className="text-subtitle"/> {branch.name}</h4>
                     <div className="grid grid-cols-2 gap-2 mb-2">
                        <div>
                          <span className="block text-[10px] font-bold text-subtitle uppercase">Revenue</span>
                          <span className="block text-sm font-black text-green-500">${branch.revenue.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold text-subtitle uppercase">Expenses</span>
                          <span className="block text-sm font-black text-red-500">${branch.expenses.toLocaleString()}</span>
                        </div>
                     </div>
                     <div className="flex justify-between items-center pt-2 border-t border-stroke">
                        <span className="text-xs text-subtitle">Margin: <span className="font-bold text-title">{branch.margin}</span></span>
                        <span className="text-xs text-subtitle">Members: <span className="font-bold text-title">{branch.members}</span></span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {/* --- OPERATING EXPENSES & PAYROLL --- */}
      {activeView === 'expenses' && (
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="fin-chart-card lg:col-span-2">
            <h3 className="font-bold text-title flex items-center gap-2 mb-6"><Users size={18} className="text-primary"/> Payroll Distribution</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stroke text-xs text-subtitle uppercase tracking-wider">
                    <th className="pb-3 font-bold">Department / Role</th>
                    <th className="pb-3 font-bold text-center">Headcount</th>
                    <th className="pb-3 font-bold text-right">Avg Per Head</th>
                    <th className="pb-3 font-bold text-right">Total Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollData.map((pr, idx) => (
                    <tr key={idx} className="border-b border-stroke hover:bg-background transition-colors">
                      <td className="py-4 font-bold text-title flex items-center gap-2"><Briefcase size={14} className="text-subtitle"/> {pr.role}</td>
                      <td className="py-4 text-center font-bold text-title">{pr.count}</td>
                      <td className="py-4 text-right text-subtitle">{pr.avgPerHead}</td>
                      <td className="py-4 text-right">
                        <span className="block font-black text-title">{pr.totalPayout}</span>
                        <span className="block text-[10px] font-bold text-red-500">{pr.trend} vs last mo</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="fin-chart-card">
            <h3 className="font-bold text-title flex items-center gap-2 mb-6"><ShieldAlert size={18} className="text-alert"/> Alerts & Anomalies</h3>
            <div className="flex flex-col gap-4">
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                <span className="text-xs font-bold text-red-500 uppercase block mb-1">Equipment Repair (Smouha)</span>
                <p className="text-sm text-title">Treadmill repair costs exceeded monthly budget by 15% ($500 over). Vendor flagged for review.</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
                <span className="text-xs font-bold text-yellow-500 uppercase block mb-1">Utility Spike (Main)</span>
                <p className="text-sm text-title">Water & Electricity bill is 8% higher than the 6-month moving average.</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                <span className="text-xs font-bold text-green-500 uppercase block mb-1">Marketing ROI</span>
                <p className="text-sm text-title">Meta Ads campaign resulted in $3,200 New MRR against a $1,200 spend. Highly efficient.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TRANSACTION LEDGER --- */}
      {activeView === 'transactions' && (
        <div className="animate-fade-in fin-chart-card">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h3 className="font-bold text-title flex items-center gap-2"><Layers size={18} className="text-primary"/> Comprehensive Transaction Ledger</h3>
            <div className="flex gap-2 w-full md:w-auto">
              <input type="text" placeholder="Search ID, Name, Account..." className="bg-background border border-stroke rounded-lg px-3 py-1.5 text-sm text-title focus:outline-none focus:border-primary flex-1" />
              <button className="bg-background border border-stroke px-3 py-1.5 rounded-lg text-sm font-bold text-title hover:bg-stroke transition-colors">
                All Accounts
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stroke text-xs text-subtitle uppercase tracking-wider">
                  <th className="pb-3 font-bold">Transaction ID / Date</th>
                  <th className="pb-3 font-bold">Category</th>
                  <th className="pb-3 font-bold">Source / Account</th>
                  <th className="pb-3 font-bold">Party (By/For)</th>
                  <th className="pb-3 font-bold text-right">Amount</th>
                  <th className="pb-3 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((trx, idx) => (
                  <tr key={idx} className="border-b border-stroke hover:bg-background transition-colors">
                    <td className="py-4">
                      <span className="block font-bold text-title text-sm font-mono">{trx.id}</span>
                      <span className="block text-xs text-subtitle mt-0.5">{trx.date}</span>
                    </td>
                    <td className="py-4">
                      <span className="block font-bold text-title text-sm">{trx.category}</span>
                      <span className="block text-xs text-subtitle mt-0.5 bg-background border border-stroke rounded w-fit px-1.5 py-0.5">{trx.subCategory}</span>
                    </td>
                    <td className="py-4 text-title text-sm font-medium">{trx.account}</td>
                    <td className="py-4 font-medium text-title text-sm">{trx.by}</td>
                    <td className={`py-4 text-right font-black ${trx.incoming ? 'text-green-500' : 'text-title'}`}>
                      {trx.incoming ? '+' : '-'}${trx.amount.toLocaleString()}
                    </td>
                    <td className="py-4 text-right">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        trx.status === 'Completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        trx.status === 'Failed' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                        'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                      }`}>
                        {trx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
