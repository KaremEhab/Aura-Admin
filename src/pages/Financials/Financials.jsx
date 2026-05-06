import React, { useState } from 'react';
import { DollarSign, CreditCard, ArrowUpRight, ArrowDownRight, Download, ChevronDown, Wallet, PieChart, Receipt, Building2, Users } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Pagination } from '../../components/ui/Pagination';
import './Financials.css';

export function Financials() {
  const [period, setPeriod] = useState('This Month');
  const [currentPageLedger, setCurrentPageLedger] = useState(1);
  const [currentPagePayouts, setCurrentPagePayouts] = useState(1);

  const revenueStreams = [
    { source: 'Gym Subscriptions', amount: 1842000, change: +12.4, percentage: 36.2 },
    { source: 'Aura Direct Subscriptions', amount: 1024800, change: +42.8, percentage: 20.1 },
    { source: 'PT Session Fees', amount: 924500, change: +8.1, percentage: 18.2 },
    { source: 'App Premium Plans', amount: 612300, change: +24.6, percentage: 12.0 },
    { source: 'Equipment Licensing', amount: 418200, change: -2.3, percentage: 8.2 },
    { source: 'Merchandise & Events', amount: 268800, change: +9.4, percentage: 5.3 },
  ];

  const transactions = [
    { id: 'TXN-88422', type: 'DIRECT', entity: 'Aura Direct — Weekly Batch (1,240 subs)', amount: 61400.00, status: 'COMPLETED', date: 'May 03, 2024', method: 'In-App Purchase' },
    { id: 'TXN-88421', type: 'PAYOUT', entity: 'Apex Performance Hub', amount: 42800.00, status: 'COMPLETED', date: 'May 03, 2024', method: 'Bank Transfer' },
    { id: 'TXN-88420', type: 'REVENUE', entity: 'Elena Rodriguez (PT)', amount: 3200.00, status: 'COMPLETED', date: 'May 03, 2024', method: 'Stripe' },
    { id: 'TXN-88419', type: 'REFUND', entity: 'Omar Hassan', amount: -180.00, status: 'PROCESSING', date: 'May 02, 2024', method: 'Stripe' },
    { id: 'TXN-88418', type: 'PAYOUT', entity: 'Iron Sanctuary NYC', amount: 38400.00, status: 'COMPLETED', date: 'May 02, 2024', method: 'Bank Transfer' },
    { id: 'TXN-88417', type: 'DIRECT', entity: 'Aura Direct — New Signups (86)', amount: 4290.00, status: 'COMPLETED', date: 'May 01, 2024', method: 'Stripe' },
    { id: 'TXN-88416', type: 'REVENUE', entity: 'App Premium — Batch', amount: 124600.00, status: 'COMPLETED', date: 'May 01, 2024', method: 'In-App Purchase' },
  ];

  const payoutSchedule = [
    { gym: 'Titanium Fitness (12 branches)', amount: 184200, dueDate: 'May 10, 2024', status: 'SCHEDULED' },
    { gym: 'Zenith Athletics (7 branches)', amount: 96400, dueDate: 'May 10, 2024', status: 'SCHEDULED' },
    { gym: 'Velocity Lab', amount: 28600, dueDate: 'May 15, 2024', status: 'PENDING REVIEW' },
    { gym: 'Iron Forge (8 branches)', amount: 72100, dueDate: 'May 15, 2024', status: 'SCHEDULED' },
  ];

  const getTypeClass = (type) => {
    switch (type) {
      case 'REVENUE': return 'type-revenue';
      case 'PAYOUT': return 'type-payout';
      case 'REFUND': return 'type-refund';
      case 'DIRECT': return 'type-direct';
      default: return '';
    }
  };

  const getStatusVariant = (status) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED': case 'SCHEDULED': return 'success';
      case 'PROCESSING': return 'warning';
      case 'FAILED': return 'danger';
      case 'PENDING REVIEW': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <div className="fin-page animate-fade-in">
      <div className="fin-header">
        <div>
          <h1 className="page-title">Financials</h1>
          <p className="page-subtitle">Revenue analytics, transaction ledger, and payout management for the Aura network.</p>
        </div>
      </div>

      <div className="fin-kpi-grid">
        <div className="fin-kpi-card card animate-slide-up delay-1">
          <div className="stat-icon-wrap green"><DollarSign size={20} /></div>
          <div className="stat-info">
            <span className="stat-label">Gross Revenue</span>
            <span className="stat-value">$4.21M</span>
          </div>
          <div className="stat-trend positive"><ArrowUpRight size={12} /> +14.2% vs last month</div>
        </div>

        <div className="fin-kpi-card card animate-slide-up delay-2">
          <div className="stat-icon-wrap blue"><Wallet size={20} /></div>
          <div className="stat-info">
            <span className="stat-label">Net Profit</span>
            <span className="stat-value">$1.86M</span>
          </div>
          <div className="stat-trend positive"><ArrowUpRight size={12} /> +9.8%</div>
        </div>

        <div className="fin-kpi-card card animate-slide-up delay-3">
          <div className="stat-icon-wrap yellow"><Receipt size={20} /></div>
          <div className="stat-info">
            <span className="stat-label">Pending Payouts</span>
            <span className="stat-value">$381.3K</span>
          </div>
          <div className="stat-trend warning">12 gyms awaiting</div>
        </div>

        <div className="fin-kpi-card card animate-slide-up delay-4">
          <div className="stat-icon-wrap purple"><Users size={20} /></div>
          <div className="stat-info">
            <span className="stat-label">Direct Sub Revenue</span>
            <span className="stat-value">$1.02M</span>
          </div>
          <div className="stat-trend positive"><ArrowUpRight size={12} /> +42.8% growth</div>
        </div>
      </div>

      <div className="fin-section card animate-slide-up delay-5">
        <div className="section-header">
          <h3 className="section-title"><PieChart size={18} /> Revenue Breakdown</h3>
          <button className="period-select">
            {period} <ChevronDown size={14} />
          </button>
        </div>
        <div className="revenue-streams">
          {revenueStreams.map((stream, i) => (
            <div key={i} className="revenue-row">
              <div className="revenue-left">
                <span className="revenue-source">{stream.source}</span>
                <div className="revenue-bar-wrap">
                  <div className="revenue-bar-fill" style={{ width: `${stream.percentage}%` }} />
                </div>
              </div>
              <div className="revenue-right">
                <span className="revenue-amount">${(stream.amount / 1000).toFixed(1)}K</span>
                <span className={`revenue-change ${stream.change >= 0 ? 'positive' : 'negative'}`}>
                  {stream.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {Math.abs(stream.change)}%
                </span>
                <span className="revenue-pct">{stream.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fin-section card animate-slide-up delay-6 overflow-hidden">
        <div className="section-header p-4 pb-0">
          <h3 className="section-title"><CreditCard size={18} /> Transaction Ledger</h3>
          <button className="btn-secondary-sm"><Download size={14} /> Export CSV</button>
        </div>
        <div className="table-responsive">
          <div className="overflow-x-auto">
            <table className="directory-table min-w-[900px]">
              <thead>
                <tr>
                  <th>TXN ID</th>
                  <th>TYPE</th>
                  <th>ENTITY</th>
                  <th>AMOUNT</th>
                  <th>METHOD</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, i) => (
                  <tr key={i}>
                    <td className="txn-id whitespace-nowrap">{txn.id}</td>
                    <td className="whitespace-nowrap"><span className={`type-badge ${getTypeClass(txn.type)}`}>{txn.type}</span></td>
                    <td className="entity-cell whitespace-nowrap">{txn.entity}</td>
                    <td className={`amount-cell whitespace-nowrap ${txn.amount < 0 ? 'negative' : 'positive'}`}>
                      {txn.amount < 0 ? '-' : ''}${Math.abs(txn.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="method-cell whitespace-nowrap">{txn.method}</td>
                    <td className="date-cell whitespace-nowrap">{txn.date}</td>
                    <td className="whitespace-nowrap"><Badge variant={getStatusVariant(txn.status)}>{txn.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination 
          totalItems={842}
          itemsPerPage={7}
          currentPage={currentPageLedger}
          onPageChange={setCurrentPageLedger}
          label="transactions"
        />
      </div>

      <div className="fin-section card animate-slide-up delay-6 overflow-hidden mt-6">
        <div className="section-header p-4 pb-0">
          <h3 className="section-title"><Building2 size={18} /> Upcoming Payouts</h3>
          <span className="payout-total">Total: ${(payoutSchedule.reduce((s, p) => s + p.amount, 0) / 1000).toFixed(1)}K</span>
        </div>
        <div className="table-responsive">
          <div className="overflow-x-auto">
            <table className="directory-table min-w-[700px]">
              <thead>
                <tr>
                  <th>GYM / CHAIN</th>
                  <th>PAYOUT AMOUNT</th>
                  <th>DUE DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {payoutSchedule.map((payout, i) => (
                  <tr key={i}>
                    <td className="gym-payout-name whitespace-nowrap">{payout.gym}</td>
                    <td className="amount-cell positive whitespace-nowrap">
                      ${payout.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="date-cell whitespace-nowrap">{payout.dueDate}</td>
                    <td className="whitespace-nowrap"><Badge variant={getStatusVariant(payout.status)}>{payout.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination 
          totalItems={42}
          itemsPerPage={4}
          currentPage={currentPagePayouts}
          onPageChange={setCurrentPagePayouts}
          label="payouts"
        />
      </div>
    </div>
  );
}
