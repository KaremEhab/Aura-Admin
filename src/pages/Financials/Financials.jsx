import { useState } from 'react';
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Building2,
  CalendarClock,
  ChevronDown,
  CreditCard,
  Download,
  FileText,
  Landmark,
  LineChart,
  Lock,
  PieChart,
  Receipt,
  RefreshCcw,
  Scale,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Pagination } from '../../components/ui/Pagination';
import './Financials.css';

const money = (value, compact = false) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: compact ? 1 : 2,
    notation: compact ? 'compact' : 'standard',
  }).format(value);

export function Financials() {
  const [period] = useState('This Month');
  const [currentPageLedger, setCurrentPageLedger] = useState(1);
  const [currentPagePayouts, setCurrentPagePayouts] = useState(1);

  const ownerMetrics = [
    { label: 'Cash Balance', value: '$2.84M', detail: 'Available across operating accounts', icon: Wallet, tone: 'green', trend: '+$318K this month' },
    { label: 'MRR', value: '$486.7K', detail: 'Recurring SaaS subscriptions', icon: RefreshCcw, tone: 'blue', trend: '+16.4% net growth' },
    { label: 'ARR', value: '$5.84M', detail: 'Projected recurring run-rate', icon: LineChart, tone: 'teal', trend: '+$820K YoY' },
    { label: 'Net Revenue Retention', value: '118%', detail: 'Expansion minus churn', icon: TrendingUp, tone: 'purple', trend: '+6 pts QoQ' },
    { label: 'Gross Margin', value: '72.4%', detail: 'After payment, hosting, support costs', icon: Scale, tone: 'yellow', trend: '+2.1 pts' },
    { label: 'Runway', value: '19.6 mo', detail: 'Current burn and reserves', icon: ShieldCheck, tone: 'green', trend: 'Healthy' },
  ];

  const revenueStreams = [
    { source: 'Gym SaaS Subscriptions', amount: 1842000, change: 12.4, percentage: 36.2, margin: '81%', ownerTake: 1842000 },
    { source: 'Aura Direct Trainee Plans', amount: 1024800, change: 42.8, percentage: 20.1, margin: '76%', ownerTake: 1024800 },
    { source: 'PT Marketplace Commission', amount: 924500, change: 8.1, percentage: 18.2, margin: '38%', ownerTake: 138675 },
    { source: 'App Premium Plans', amount: 612300, change: 24.6, percentage: 12.0, margin: '84%', ownerTake: 612300 },
    { source: 'Equipment Licensing', amount: 418200, change: -2.3, percentage: 8.2, margin: '58%', ownerTake: 418200 },
    { source: 'Merchandise & Events', amount: 268800, change: 9.4, percentage: 5.3, margin: '29%', ownerTake: 80640 },
  ];

  const cashFlow = [
    { label: 'Opening cash', amount: 2520000, kind: 'neutral' },
    { label: 'Subscription collections', amount: 2184000, kind: 'in' },
    { label: 'Marketplace commissions', amount: 326700, kind: 'in' },
    { label: 'Gym payouts', amount: -812400, kind: 'out' },
    { label: 'Refunds and disputes', amount: -38200, kind: 'out' },
    { label: 'Cloud, support, payroll', amount: -1279000, kind: 'out' },
    { label: 'Closing cash forecast', amount: 2901100, kind: 'neutral' },
  ];

  const unitEconomics = [
    { label: 'ARPA', value: '$41.20', helper: 'Average revenue per active account' },
    { label: 'CAC Payback', value: '4.8 mo', helper: 'Blended gym and trainer acquisition' },
    { label: 'LTV:CAC', value: '5.6x', helper: 'Healthy expansion engine' },
    { label: 'Churned MRR', value: '$18.4K', helper: '3.2% logo churn' },
  ];

  const receivables = [
    { entity: 'Titanium Fitness Group', amount: 84200, age: '3 days', status: 'COLLECTING' },
    { entity: 'Velocity Lab', amount: 28600, age: '11 days', status: 'FOLLOW UP' },
    { entity: 'Iron Forge Branches', amount: 72100, age: '5 days', status: 'COLLECTING' },
    { entity: 'North Coast Partner Gyms', amount: 19400, age: '21 days', status: 'AT RISK' },
  ];

  const expenses = [
    { category: 'Payment processing', amount: 146800, ratio: '2.9% of GMV' },
    { category: 'Cloud infrastructure', amount: 82400, ratio: '$0.08 per active member' },
    { category: 'Support operations', amount: 118600, ratio: '7.4% of net revenue' },
    { category: 'Sales incentives', amount: 96400, ratio: '18 new gym contracts' },
  ];

  const payoutSchedule = [
    { gym: 'Titanium Fitness (12 branches)', gross: 284200, fee: 42630, amount: 241570, dueDate: 'May 10, 2026', status: 'SCHEDULED' },
    { gym: 'Zenith Athletics (7 branches)', gross: 126400, fee: 18960, amount: 107440, dueDate: 'May 10, 2026', status: 'SCHEDULED' },
    { gym: 'Velocity Lab', gross: 38600, fee: 5790, amount: 32810, dueDate: 'May 15, 2026', status: 'PENDING REVIEW' },
    { gym: 'Iron Forge (8 branches)', gross: 172100, fee: 25815, amount: 146285, dueDate: 'May 15, 2026', status: 'SCHEDULED' },
  ];

  const taxCompliance = [
    { label: 'VAT collected', value: '$214.8K', note: 'Next filing due May 20' },
    { label: 'Withholding reserve', value: '$48.6K', note: 'Held for trainer payouts' },
    { label: 'Invoice coverage', value: '99.1%', note: '12 invoices need metadata' },
  ];

  const transactions = [
    { id: 'TXN-88422', type: 'DIRECT', entity: 'Aura Direct - Weekly Batch (1,240 subs)', amount: 61400, status: 'COMPLETED', date: 'May 06, 2026', method: 'In-App Purchase', fee: 1842 },
    { id: 'TXN-88421', type: 'PAYOUT', entity: 'Apex Performance Hub', amount: -42800, status: 'COMPLETED', date: 'May 06, 2026', method: 'Bank Transfer', fee: 0 },
    { id: 'TXN-88420', type: 'REVENUE', entity: 'Elena Rodriguez (PT)', amount: 3200, status: 'COMPLETED', date: 'May 05, 2026', method: 'Stripe', fee: 92.8 },
    { id: 'TXN-88419', type: 'REFUND', entity: 'Omar Hassan', amount: -180, status: 'PROCESSING', date: 'May 05, 2026', method: 'Stripe', fee: 0 },
    { id: 'TXN-88418', type: 'PAYOUT', entity: 'Iron Sanctuary NYC', amount: -38400, status: 'COMPLETED', date: 'May 04, 2026', method: 'Bank Transfer', fee: 0 },
    { id: 'TXN-88417', type: 'DIRECT', entity: 'Aura Direct - New Signups (86)', amount: 4290, status: 'COMPLETED', date: 'May 04, 2026', method: 'Stripe', fee: 124.4 },
    { id: 'TXN-88416', type: 'REVENUE', entity: 'App Premium - Batch', amount: 124600, status: 'COMPLETED', date: 'May 03, 2026', method: 'In-App Purchase', fee: 3738 },
  ];

  const getTypeClass = (type) => `type-${type.toLowerCase()}`;
  const getStatusVariant = (status) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
      case 'SCHEDULED':
      case 'COLLECTING':
        return 'success';
      case 'PROCESSING':
      case 'PENDING REVIEW':
      case 'FOLLOW UP':
        return 'warning';
      case 'FAILED':
      case 'AT RISK':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  const totalPayouts = payoutSchedule.reduce((sum, payout) => sum + payout.amount, 0);

  return (
    <div className="fin-page animate-fade-in">
      <section className="fin-hero" id="financial-overview">
        <div>
          <span className="fin-kicker"><Landmark size={14} /> Owner money command center</span>
          <h1 className="page-title">Financials</h1>
          <p className="page-subtitle">Track every dollar: recurring revenue, payouts, fees, cash flow, taxes, refunds, receivables, margins, and runway.</p>
        </div>
        <div className="fin-hero-actions">
          <button className="period-select">{period} <ChevronDown size={14} /></button>
          <button className="btn-secondary-sm"><Download size={14} /> Export Board Pack</button>
        </div>
      </section>

      <section className="fin-owner-grid" id="financial-kpis">
        {ownerMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div className="fin-owner-card card" key={metric.label}>
              <div className={`fin-owner-icon ${metric.tone}`}><Icon size={18} /></div>
              <div>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.detail}</p>
              </div>
              <small>{metric.trend}</small>
            </div>
          );
        })}
      </section>

      <section className="fin-grid-2" id="cash-flow">
        <div className="fin-section card">
          <div className="section-header">
            <h3 className="section-title"><Banknote size={18} /> Cash Flow Waterfall</h3>
            <Badge variant="success">Forecast healthy</Badge>
          </div>
          <div className="cash-flow-list">
            {cashFlow.map((item) => (
              <div className={`cash-flow-row ${item.kind}`} key={item.label}>
                <span>{item.label}</span>
                <strong>{money(item.amount)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="fin-section card">
          <div className="section-header">
            <h3 className="section-title"><PieChart size={18} /> Revenue Breakdown</h3>
            <button className="period-select">{period} <ChevronDown size={14} /></button>
          </div>
          <div className="revenue-streams">
            {revenueStreams.map((stream) => (
              <div key={stream.source} className="revenue-row">
                <div className="revenue-left">
                  <span className="revenue-source">{stream.source}</span>
                  <div className="revenue-bar-wrap"><div className="revenue-bar-fill" style={{ width: `${stream.percentage}%` }} /></div>
                </div>
                <div className="revenue-right">
                  <span className="revenue-amount">{money(stream.amount, true)}</span>
                  <span className={`revenue-change ${stream.change >= 0 ? 'positive' : 'negative'}`}>
                    {stream.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {Math.abs(stream.change)}%
                  </span>
                  <span className="revenue-pct">{stream.margin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fin-grid-4" id="unit-economics">
        {unitEconomics.map((item) => (
          <div className="unit-card card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.helper}</p>
          </div>
        ))}
      </section>

      <section className="fin-grid-3" id="risk-controls">
        <div className="fin-section card">
          <div className="section-header">
            <h3 className="section-title"><Receipt size={18} /> Receivables</h3>
            <span className="payout-total">{money(204300, true)} open</span>
          </div>
          <div className="compact-list">
            {receivables.map((item) => (
              <div className="compact-row" key={item.entity}>
                <div><strong>{item.entity}</strong><span>{item.age} outstanding</span></div>
                <em>{money(item.amount)}</em>
                <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="fin-section card">
          <div className="section-header">
            <h3 className="section-title"><FileText size={18} /> Tax & Compliance</h3>
            <Badge variant="warning">3 tasks</Badge>
          </div>
          <div className="tax-grid">
            {taxCompliance.map((item) => (
              <div className="tax-tile" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <small>{item.note}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="fin-section card">
          <div className="section-header">
            <h3 className="section-title"><AlertTriangle size={18} /> Money Risks</h3>
            <Badge variant="danger">Watch</Badge>
          </div>
          <div className="risk-list">
            <div><AlertTriangle size={16} /><span>Refund rate rose to 2.8% in two gyms.</span></div>
            <div><Lock size={16} /><span>12 invoices missing tax IDs before filing.</span></div>
            <div><CalendarClock size={16} /><span>One payout batch requires manual review.</span></div>
          </div>
        </div>
      </section>

      <section className="fin-grid-2" id="expenses">
        <div className="fin-section card">
          <div className="section-header">
            <h3 className="section-title"><CreditCard size={18} /> Expense Controls</h3>
            <button className="btn-secondary-sm">Set Budget Guardrails</button>
          </div>
          <div className="expense-list">
            {expenses.map((expense) => (
              <div className="expense-row" key={expense.category}>
                <div>
                  <strong>{expense.category}</strong>
                  <span>{expense.ratio}</span>
                </div>
                <em>{money(expense.amount)}</em>
              </div>
            ))}
          </div>
        </div>

        <div className="fin-section card">
          <div className="section-header">
            <h3 className="section-title"><Users size={18} /> Owner Take Summary</h3>
            <Badge variant="success">{money(4111615, true)} retained</Badge>
          </div>
          <div className="owner-take-list">
            {revenueStreams.map((stream) => (
              <div className="owner-take-row" key={stream.source}>
                <span>{stream.source}</span>
                <strong>{money(stream.ownerTake, true)}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fin-section card overflow-hidden" id="ledger">
        <div className="section-header p-4 pb-0">
          <h3 className="section-title"><CreditCard size={18} /> Transaction Ledger</h3>
          <button className="btn-secondary-sm"><Download size={14} /> Export CSV</button>
        </div>
        <div className="table-responsive">
          <div className="overflow-x-auto">
            <table className="directory-table min-w-[1000px]">
              <thead>
                <tr>
                  <th>TXN ID</th>
                  <th>TYPE</th>
                  <th>ENTITY</th>
                  <th>GROSS / NET</th>
                  <th>FEE</th>
                  <th>METHOD</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id}>
                    <td className="txn-id whitespace-nowrap">{txn.id}</td>
                    <td className="whitespace-nowrap"><span className={`type-badge ${getTypeClass(txn.type)}`}>{txn.type}</span></td>
                    <td className="entity-cell whitespace-nowrap">{txn.entity}</td>
                    <td className={`amount-cell whitespace-nowrap ${txn.amount < 0 ? 'negative' : 'positive'}`}>{money(txn.amount)}</td>
                    <td className="method-cell whitespace-nowrap">{money(txn.fee)}</td>
                    <td className="method-cell whitespace-nowrap">{txn.method}</td>
                    <td className="date-cell whitespace-nowrap">{txn.date}</td>
                    <td className="whitespace-nowrap"><Badge variant={getStatusVariant(txn.status)}>{txn.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination totalItems={842} itemsPerPage={7} currentPage={currentPageLedger} onPageChange={setCurrentPageLedger} label="transactions" />
      </section>

      <section className="fin-section card overflow-hidden" id="payouts">
        <div className="section-header p-4 pb-0">
          <h3 className="section-title"><Building2 size={18} /> Payout Command Queue</h3>
          <span className="payout-total">Total: {money(totalPayouts, true)}</span>
        </div>
        <div className="table-responsive">
          <div className="overflow-x-auto">
            <table className="directory-table min-w-[860px]">
              <thead>
                <tr>
                  <th>GYM / CHAIN</th>
                  <th>GROSS</th>
                  <th>AURA FEE</th>
                  <th>NET PAYOUT</th>
                  <th>DUE DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {payoutSchedule.map((payout) => (
                  <tr key={payout.gym}>
                    <td className="gym-payout-name whitespace-nowrap">{payout.gym}</td>
                    <td className="amount-cell positive whitespace-nowrap">{money(payout.gross)}</td>
                    <td className="method-cell whitespace-nowrap">{money(payout.fee)}</td>
                    <td className="amount-cell positive whitespace-nowrap">{money(payout.amount)}</td>
                    <td className="date-cell whitespace-nowrap">{payout.dueDate}</td>
                    <td className="whitespace-nowrap"><Badge variant={getStatusVariant(payout.status)}>{payout.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination totalItems={42} itemsPerPage={4} currentPage={currentPagePayouts} onPageChange={setCurrentPagePayouts} label="payouts" />
      </section>
    </div>
  );
}
