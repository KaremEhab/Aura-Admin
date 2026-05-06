export const dashboardData = {
  gmv: {
    total: 4128940.22,
    growth: 14.2,
    history: [
      { month: 'Jan', value: 1200000 },
      { month: 'Feb', value: 1500000 },
      { month: 'Mar', value: 1800000 },
      { month: 'Apr', value: 1700000 },
      { month: 'May', value: 2100000 },
      { month: 'Jun', value: 2500000 },
      { month: 'Jul', value: 2400000 },
      { month: 'Aug', value: 3100000 },
      { month: 'Sep', value: 3400000 },
      { month: 'Oct', value: 4128940 }
    ]
  },
  alerts: [
    { id: 1, type: 'error', title: 'Webhook Failure: Gym #402', description: 'Retry attempts exhausted (403 Forbidden)' },
    { id: 2, type: 'success', title: 'Financial Sync Complete', description: 'Monthly Fawry reconciliation finalized.' },
    { id: 3, type: 'info', title: 'Db Backup Finished', description: 'Duration: 1.2s | Size: 1.4GB' }
  ],
  stats: {
    business: {
      totalGyms: { value: 142, growth: 8.4 },
      activePTs: { value: 852, growth: 12.1 },
      receptionists: { value: 342, growth: 3.2 },
      totalTrainees: { value: '12,894', growth: 18.5 },
      activeSubscriptions: { value: '8,921', growth: 14.2 },
      arpu: { value: '$320.15', growth: 5.4 }
    },
    infrastructure: {
      supabase: { size: '2.4 TB', provisioned: '4.0 TB', usage: 72 },
      edgeFunctions: { invocations: '42.8M', avgLatency: '12ms' },
      cloudflare: { egress: '12.5 PB', cacheEfficiency: 99.2 },
      systemHealth: { uptime: '99.99%', errorRate: '0.001%' }
    }
  },
  approvals: [
    { id: 1, name: 'Iron Temple Cairo', tier: 'Premium Branch (Downtown)', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=150&auto=format&fit=crop' },
    { id: 2, name: 'Velocity Athletics', tier: 'Standard Tier (Giza)', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=150&auto=format&fit=crop' },
    { id: 3, name: 'Oasis Fitness Hub', tier: 'Enterprise Partner', image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=150&auto=format&fit=crop' }
  ],
  directory: [
    { id: 'GP-001', name: 'Iron Temple Cairo', tier: 'Premium Branch', trainees: 452, location: 'Downtown, Cairo', revenue: 45200.00, status: 'ACTIVE', lastActive: '2 mins ago', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=150&auto=format&fit=crop' },
    { id: 'GP-402', name: 'Velocity Athletics', tier: 'Standard Tier', trainees: 128, location: 'Giza, Egypt', revenue: 12180.50, status: 'SUSPENDED', lastActive: '4 days ago', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=150&auto=format&fit=crop' },
    { id: 'GP-122', name: 'Oasis Fitness Hub', tier: 'Enterprise Partner', trainees: 894, location: 'Sheikh Zayed', revenue: 89400.00, status: 'ACTIVE', lastActive: 'Just now', image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=150&auto=format&fit=crop' },
    { id: 'GP-125', name: 'Summit Strength Center', tier: 'Elite Membership', trainees: 245, location: 'Maadi, Cairo', revenue: 33750.75, status: 'PENDING', lastActive: '1 hr ago', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=150&auto=format&fit=crop' }
  ]
};
