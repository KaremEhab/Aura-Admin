import React, { useState } from 'react';
import { 
  Plus, Edit2, Trash2, CheckCircle2, XCircle, 
  Users, DollarSign, TrendingUp, Star, Crown, Shield, Activity, Calendar
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import './PricingPlans.css';

const mockPlans = [
  {
    id: 'plan_basic',
    name: 'Basic Access',
    price: 50,
    cycle: 'monthly',
    activeSubscribers: 450,
    mrr: 22500,
    churnRate: '4.5%',
    conversionRate: '12%',
    demographics: 'Mostly 18-24 (Students)',
    icon: Shield,
    color: 'text-blue-500',
    bgLight: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    popular: false,
    growthData: [{val: 400}, {val: 420}, {val: 410}, {val: 435}, {val: 450}],
    features: [
      { name: 'Gym Floor Access', included: true },
      { name: 'Locker Room', included: true },
      { name: 'Group Classes', included: false },
      { name: 'Personal Training', included: false },
      { name: 'Guest Passes', included: false },
      { name: 'Spa & Sauna', included: false },
      { name: 'App Nutrition Tracking', included: false },
    ]
  },
  {
    id: 'plan_standard',
    name: 'Standard Pro',
    price: 85,
    cycle: 'monthly',
    activeSubscribers: 820,
    mrr: 69700,
    churnRate: '2.8%',
    conversionRate: '24%',
    demographics: 'Mostly 25-35 (Professionals)',
    icon: Star,
    color: 'text-green-500',
    bgLight: 'bg-green-500/10',
    border: 'border-green-500/30',
    popular: true,
    growthData: [{val: 700}, {val: 740}, {val: 780}, {val: 800}, {val: 820}],
    features: [
      { name: 'Gym Floor Access', included: true },
      { name: 'Locker Room', included: true },
      { name: 'Group Classes', included: true },
      { name: 'Personal Training', included: false },
      { name: 'Guest Passes (1/mo)', included: true },
      { name: 'Spa & Sauna', included: false },
      { name: 'App Nutrition Tracking', included: true },
    ]
  },
  {
    id: 'plan_vip',
    name: 'VIP Elite',
    price: 150,
    cycle: 'monthly',
    activeSubscribers: 150,
    mrr: 22500,
    churnRate: '1.2%',
    conversionRate: '5%',
    demographics: 'Mostly 35+ (Executives)',
    icon: Crown,
    color: 'text-yellow-500',
    bgLight: 'bg-yellow-500/10',
    border: 'border-yellow-500/50',
    popular: false,
    growthData: [{val: 120}, {val: 125}, {val: 135}, {val: 145}, {val: 150}],
    features: [
      { name: 'Gym Floor Access', included: true },
      { name: 'Locker Room & VIP Lounge', included: true },
      { name: 'Group Classes (Unlimited)', included: true },
      { name: 'Personal Training (2/mo)', included: true },
      { name: 'Guest Passes (Unlimited)', included: true },
      { name: 'Spa & Sauna', included: true },
      { name: 'App Nutrition Tracking', included: true },
    ]
  },
  {
    id: 'plan_corporate',
    name: 'Corporate Wellness',
    price: 45,
    cycle: 'monthly (per head)',
    activeSubscribers: 600,
    mrr: 27000,
    churnRate: '0.5%',
    conversionRate: '40% (B2B)',
    demographics: 'Corporate Partners',
    icon: Users,
    color: 'text-purple-500',
    bgLight: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    popular: false,
    growthData: [{val: 200}, {val: 400}, {val: 600}, {val: 600}, {val: 600}],
    features: [
      { name: 'Gym Floor Access', included: true },
      { name: 'Locker Room', included: true },
      { name: 'Group Classes (Discounted)', included: true },
      { name: 'Personal Training', included: false },
      { name: 'Quarterly Health Audits', included: true },
      { name: 'Spa & Sauna', included: false },
      { name: 'Dedicated Account Manager', included: true },
    ]
  }
];

export function PricingPlans() {
  const [plans, setPlans] = useState(mockPlans);

  // Aggregate Metrics
  const totalSubs = plans.reduce((acc, plan) => acc + plan.activeSubscribers, 0);
  const totalMrr = plans.reduce((acc, plan) => acc + plan.mrr, 0);
  const arpu = totalSubs > 0 ? (totalMrr / totalSubs).toFixed(0) : 0;
  const avgChurn = (plans.reduce((acc, plan) => acc + parseFloat(plan.churnRate), 0) / plans.length).toFixed(1);

  return (
    <div className="pricing-container animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1>Pricing Plans & Tiers</h1>
          <p className="text-subtitle mt-1">Manage membership tiers, configure features, track cohort performance, and B2B packages.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-black px-5 py-2.5 rounded-xl text-sm font-black hover:scale-105 transition-transform shadow-[0_4px_15px_rgba(34,197,94,0.3)]">
          <Plus size={18} /> Create New Plan
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="plan-kpi-card">
          <div className="flex justify-between items-start mb-4">
            <div className="icon-wrapper bg-primary-lite text-primary"><DollarSign size={24} /></div>
            <span className="text-xs font-bold text-primary bg-primary-lite px-2 py-1 rounded-md">ARPU</span>
          </div>
          <span className="kpi-label">Avg Revenue Per User</span>
          <h3 className="kpi-value">${arpu}</h3>
        </div>
        
        <div className="plan-kpi-card">
          <div className="flex justify-between items-start mb-4">
            <div className="icon-wrapper bg-blue-500/10 text-blue-500"><Users size={24} /></div>
          </div>
          <span className="kpi-label">Total Active Subscribers</span>
          <h3 className="kpi-value">{totalSubs.toLocaleString()}</h3>
        </div>

        <div className="plan-kpi-card">
          <div className="flex justify-between items-start mb-4">
            <div className="icon-wrapper bg-yellow-500/10 text-yellow-500"><TrendingUp size={24} /></div>
          </div>
          <span className="kpi-label">Total MRR (From Plans)</span>
          <h3 className="kpi-value">${totalMrr.toLocaleString()}</h3>
        </div>

        <div className="plan-kpi-card">
          <div className="flex justify-between items-start mb-4">
            <div className="icon-wrapper bg-red-500/10 text-red-500"><Activity size={24} /></div>
          </div>
          <span className="kpi-label">Average Plan Churn</span>
          <h3 className="kpi-value">{avgChurn}%</h3>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular-card' : ''} ${plan.border}`}>
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            
            <div className="p-6 pb-2">
              <div className="flex justify-between items-center mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${plan.bgLight} ${plan.color}`}>
                  <plan.icon size={24} />
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-background border border-stroke rounded-lg hover:bg-primary-lite hover:text-primary hover:border-primary transition-colors text-subtitle">
                    <Edit2 size={16} />
                  </button>
                </div>
              </div>

              <h2 className="text-xl font-black text-title mb-1">{plan.name}</h2>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-black text-title">${plan.price}</span>
                <span className="text-xs font-bold text-subtitle uppercase">/ {plan.cycle}</span>
              </div>
              <p className="text-xs text-subtitle font-medium mb-4">{plan.demographics}</p>

              {/* Sparkline Chart */}
              <div className="h-10 w-full mb-4 opacity-70">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={plan.growthData}>
                    <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                    <Line type="monotone" dataKey="val" stroke={plan.popular ? '#10b981' : 'var(--subtitle)'} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="bg-background border border-stroke rounded-lg p-2 text-center">
                  <span className="text-[10px] font-bold text-subtitle uppercase block">Active Subs</span>
                  <span className="text-sm font-black text-title">{plan.activeSubscribers.toLocaleString()}</span>
                </div>
                <div className="bg-background border border-stroke rounded-lg p-2 text-center">
                  <span className="text-[10px] font-bold text-subtitle uppercase block">MRR</span>
                  <span className="text-sm font-black text-title">${(plan.mrr/1000).toFixed(1)}k</span>
                </div>
                <div className="bg-background border border-stroke rounded-lg p-2 text-center">
                  <span className="text-[10px] font-bold text-subtitle uppercase block">Churn</span>
                  <span className="text-sm font-black text-red-400">{plan.churnRate}</span>
                </div>
                <div className="bg-background border border-stroke rounded-lg p-2 text-center">
                  <span className="text-[10px] font-bold text-subtitle uppercase block">Conversion</span>
                  <span className="text-sm font-black text-green-400">{plan.conversionRate}</span>
                </div>
              </div>

              <div className="features-list flex flex-col gap-2">
                <h4 className="text-xs font-bold text-subtitle uppercase mb-1 tracking-wider">Features</h4>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {feature.included ? (
                      <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                    ) : (
                      <XCircle size={14} className="text-subtitle opacity-30 flex-shrink-0" />
                    )}
                    <span className={`text-xs font-medium ${feature.included ? 'text-title' : 'text-subtitle opacity-50'}`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 pt-4 mt-auto border-t border-stroke">
              <button className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                plan.popular 
                ? 'bg-primary text-black hover:scale-[1.02] shadow-[0_4px_15px_rgba(34,197,94,0.3)]' 
                : 'bg-background border border-stroke text-title hover:bg-stroke'
              }`}>
                <Users size={16}/> View Subscribers
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
