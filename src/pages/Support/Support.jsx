import React, { useState } from 'react';
import { 
  MessageSquare, User, Tag, Clock, CheckCircle2, AlertTriangle, 
  Send, Search, Filter, Plus, FileText, UploadCloud, Server, LayoutTemplate, Paperclip
} from 'lucide-react';
import './Support.css';

// --- MOCK DATA ---
const mockMemberTickets = [
  { id: 'TKT-203', title: 'Cannot login to member app', user: 'Emma Stone', tier: 'Premium', status: 'Open', time: '1 hr ago', priority: 'High', pt: 'John Doe', messages: [
    { sender: 'Emma Stone', type: 'member', text: 'Hey, I changed my password but now the app crashes when I try to log in.', time: '1 hr ago' }
  ]},
  { id: 'TKT-204', title: 'Pause my subscription', user: 'Liam Carter', tier: 'Base', status: 'Pending', time: '2 hrs ago', priority: 'Medium', pt: 'Emma Stone', messages: [
    { sender: 'Liam Carter', type: 'member', text: 'I am traveling for a month. Can I freeze my sub?', time: '2 hrs ago' },
    { sender: 'Sarah (Reception)', type: 'staff', text: 'Hi Liam! Yes, I can process that for you. Note there is a $10 freeze fee.', time: '1 hr ago' }
  ]},
  { id: 'TKT-206', title: 'Question about macros', user: 'Alex Mercer', tier: 'VIP', status: 'Open', time: '3 hrs ago', priority: 'Low', pt: 'John Doe', messages: [
    { sender: 'Alex Mercer', type: 'member', text: 'Should I weigh my chicken raw or cooked?', time: '3 hrs ago' }
  ]},
];

const mockSaaSTickets = [
  { id: 'S-901', title: 'Fawry Webhook failing on renewals', category: 'Billing', status: 'In Progress', dev: 'Aura SaaS Team', time: '1 day ago' },
  { id: 'S-902', title: 'Request: Export Member List to CSV', category: 'Feature', status: 'Resolved', dev: 'Aura SaaS Team', time: '1 week ago' },
];

export function Support() {
  const [mainTab, setMainTab] = useState('member_crm'); // 'saas_helpdesk' or 'member_crm'
  
  // CRM State
  const [activeTicketId, setActiveTicketId] = useState('TKT-203');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [replyText, setReplyText] = useState('');

  const activeTicket = mockMemberTickets.find(t => t.id === activeTicketId);

  // Helper Styles
  const getPriorityColor = (p) => {
    switch(p) {
      case 'High': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Low': return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-subtitle bg-background border-stroke';
    }
  };

  return (
    <div className="support-container animate-fade-in flex flex-col h-[calc(100vh-100px)]">
      
      {/* HEADER & MAIN TABS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4 shrink-0">
        <div>
          <h1>Support Hub</h1>
          <p className="text-subtitle mt-1">Manage B2C member inquiries or contact the Aura SaaS B2B development team.</p>
        </div>
        
        {/* Top-Level Tab Switcher */}
        <div className="flex bg-sidebar rounded-xl p-1 border border-stroke">
          <button 
            onClick={() => setMainTab('member_crm')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              mainTab === 'member_crm' ? 'bg-primary text-black shadow-md' : 'text-subtitle hover:text-title'
            }`}
          >
            <MessageSquare size={16} /> Member Help Desk (CRM)
          </button>
          <button 
            onClick={() => setMainTab('saas_helpdesk')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              mainTab === 'saas_helpdesk' ? 'bg-blue-500 text-white shadow-md' : 'text-subtitle hover:text-title'
            }`}
          >
            <Server size={16} /> Platform Help Desk (SaaS)
          </button>
        </div>
      </div>

      {/* =========================================================
          TAB A: SaaS PLATFORM HELP DESK
      ========================================================= */}
      {mainTab === 'saas_helpdesk' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 animate-fade-in overflow-y-auto">
          {/* Left: Submit Form */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="fin-chart-card bg-blue-500/5 border-blue-500/20">
              <h3 className="font-bold text-title flex items-center gap-2 mb-4 text-blue-500">
                <AlertTriangle size={18} /> Contact Aura Developers
              </h3>
              <p className="text-sm text-subtitle mb-6">Submit bug reports, billing issues, or feature requests directly to the software team.</p>
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-subtitle uppercase mb-2">Issue Category</label>
                  <select className="w-full bg-background border border-stroke rounded-lg px-4 py-2 text-sm font-medium text-title focus:border-blue-500 outline-none">
                    <option>Bug Report</option>
                    <option>Billing / Payment Issue</option>
                    <option>Feature Request</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-subtitle uppercase mb-2">Subject</label>
                  <input type="text" className="w-full bg-background border border-stroke rounded-lg px-4 py-2 text-sm text-title focus:border-blue-500 outline-none" placeholder="Brief description..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-subtitle uppercase mb-2">Details</label>
                  <textarea className="w-full bg-background border border-stroke rounded-lg px-4 py-2 text-sm text-title focus:border-blue-500 outline-none h-32 resize-none" placeholder="Please provide exact steps or error messages..."></textarea>
                </div>
                <div className="border border-dashed border-stroke rounded-xl p-6 text-center hover:bg-sidebar transition-colors cursor-pointer">
                  <UploadCloud size={24} className="text-subtitle mx-auto mb-2"/>
                  <span className="text-sm font-bold text-title">Click to upload screenshots</span>
                  <p className="text-xs text-subtitle">PDF, PNG, JPG (Max 5MB)</p>
                </div>
                <button className="w-full bg-blue-500 text-white font-black py-3 rounded-xl mt-2 hover:bg-blue-600 transition-colors">
                  Submit Ticket
                </button>
              </div>
            </div>
          </div>

          {/* Right: History & Knowledge Base */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="fin-chart-card">
              <h3 className="font-bold text-title flex items-center gap-2 mb-4"><FileText size={18} className="text-primary"/> Knowledge Base Quick Answers</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-sidebar border border-stroke rounded-xl hover:border-primary cursor-pointer transition-colors">
                  <h4 className="font-bold text-title text-sm mb-1">Fawry POS Integration Guide</h4>
                  <p className="text-xs text-subtitle">How to link your terminal.</p>
                </div>
                <div className="p-4 bg-sidebar border border-stroke rounded-xl hover:border-primary cursor-pointer transition-colors">
                  <h4 className="font-bold text-title text-sm mb-1">Setting up Push Notifications</h4>
                  <p className="text-xs text-subtitle">Firebase config checklist.</p>
                </div>
              </div>
            </div>

            <div className="fin-chart-card flex-1">
              <h3 className="font-bold text-title flex items-center gap-2 mb-4"><Clock size={18} className="text-subtitle"/> My SaaS Support History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stroke text-xs text-subtitle uppercase tracking-wider">
                      <th className="pb-3 font-bold">Ticket</th>
                      <th className="pb-3 font-bold">Status</th>
                      <th className="pb-3 font-bold text-right">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSaaSTickets.map((tkt, idx) => (
                      <tr key={idx} className="border-b border-stroke hover:bg-background transition-colors">
                        <td className="py-4">
                          <span className="block font-bold text-title text-sm">{tkt.title}</span>
                          <span className="block text-xs text-subtitle mt-0.5">{tkt.id} • {tkt.category}</span>
                        </td>
                        <td className="py-4">
                          <span className="px-2 py-1 rounded text-[10px] font-bold uppercase border bg-sidebar border-stroke text-title">
                            {tkt.status}
                          </span>
                        </td>
                        <td className="py-4 text-right text-xs text-subtitle font-medium">
                          {tkt.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB B: MEMBER HELP DESK (3-PANE CRM)
      ========================================================= */}
      {mainTab === 'member_crm' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 min-h-0 animate-fade-in border border-stroke rounded-2xl overflow-hidden shadow-2xl">
          
          {/* PANE 1: Ticket Queue */}
          <div className="lg:col-span-3 bg-background border-r border-stroke flex flex-col h-full">
            <div className="p-4 border-b border-stroke bg-sidebar">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtitle" />
                <input type="text" placeholder="Search members..." className="w-full bg-background border border-stroke rounded-lg pl-9 pr-3 py-2 text-sm text-title focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
              {mockMemberTickets.map(tkt => (
                <div 
                  key={tkt.id}
                  onClick={() => setActiveTicketId(tkt.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    activeTicketId === tkt.id 
                      ? 'bg-primary/5 border-primary shadow-[inset_4px_0_0_var(--primary)]' 
                      : 'bg-transparent border-transparent hover:bg-sidebar'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-title text-sm truncate pr-2">{tkt.user}</span>
                    <span className="text-[10px] text-subtitle whitespace-nowrap">{tkt.time}</span>
                  </div>
                  <h4 className="text-xs font-bold text-subtitle truncate mb-2">{tkt.title}</h4>
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getPriorityColor(tkt.priority)}`}>
                      {tkt.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PANE 2: Live Conversation Thread */}
          <div className="lg:col-span-6 bg-background flex flex-col h-full">
            {/* Thread Header */}
            <div className="p-4 border-b border-stroke bg-sidebar flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-bold text-title flex items-center gap-2">{activeTicket?.title}</h3>
                <span className="text-xs text-subtitle font-mono mt-0.5 inline-block">{activeTicket?.id}</span>
              </div>
              <button className="flex items-center gap-1.5 bg-background border border-stroke px-3 py-1.5 rounded-lg text-xs font-bold text-title hover:border-green-500 hover:text-green-500 transition-colors">
                <CheckCircle2 size={14} /> Resolve
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {activeTicket?.messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col max-w-[80%] ${msg.type === 'staff' ? 'self-end items-end' : 'self-start items-start'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-subtitle">{msg.sender}</span>
                    <span className="text-[10px] text-stroke">{msg.time}</span>
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.type === 'staff' 
                      ? 'bg-primary text-black rounded-tr-sm shadow-[0_4px_15px_rgba(34,197,94,0.2)] font-medium' 
                      : 'bg-sidebar border border-stroke text-title rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Composer */}
            <div className="p-4 border-t border-stroke bg-sidebar shrink-0">
              <div className="flex justify-between items-center mb-3">
                <div className="flex gap-2">
                  <button className="text-xs font-bold text-subtitle bg-background border border-stroke px-2 py-1 rounded hover:text-title flex items-center gap-1"><LayoutTemplate size={12}/> Snippets</button>
                  <button className="text-xs font-bold text-subtitle bg-background border border-stroke px-2 py-1 rounded hover:text-title flex items-center gap-1"><Paperclip size={12}/> Attach</button>
                </div>
                {/* Internal Note Toggle */}
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${isInternalNote ? 'text-yellow-500' : 'text-subtitle'}`}>Internal Note</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={isInternalNote} onChange={() => setIsInternalNote(!isInternalNote)} />
                    <div className="w-9 h-5 bg-stroke peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-title after:border-stroke after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <textarea 
                  placeholder={isInternalNote ? "Type a private note for staff..." : "Reply to member..."}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className={`flex-1 bg-background border rounded-xl px-4 py-3 text-sm focus:outline-none resize-none h-14 ${
                    isInternalNote ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/5' : 'border-stroke text-title focus:border-primary'
                  }`}
                />
                <button className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform hover:scale-105 shadow-lg ${
                  isInternalNote ? 'bg-yellow-500 text-black' : 'bg-primary text-black'
                }`}>
                  <Send size={18} className="ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* PANE 3: Member Context Panel */}
          <div className="lg:col-span-3 bg-sidebar border-l border-stroke flex flex-col h-full overflow-y-auto">
            <div className="p-6 border-b border-stroke text-center">
              <div className="w-20 h-20 mx-auto bg-background border-2 border-primary rounded-full flex items-center justify-center mb-4 overflow-hidden">
                <User size={32} className="text-primary"/>
              </div>
              <h3 className="text-lg font-black text-title">{activeTicket?.user}</h3>
              <span className="inline-block px-3 py-1 mt-2 rounded-full text-xs font-bold bg-primary-lite text-primary border border-primary-border">
                {activeTicket?.tier} Member
              </span>
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              <div>
                <h4 className="text-xs font-bold text-subtitle uppercase mb-3 tracking-wider">Quick Details</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-subtitle">Status</span>
                    <span className="font-bold text-green-500">Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-subtitle">Assigned PT</span>
                    <span className="font-bold text-title">{activeTicket?.pt}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-subtitle">LTV</span>
                    <span className="font-bold text-title">$450</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-subtitle uppercase mb-3 tracking-wider">Recent Activity</h4>
                <div className="border-l-2 border-stroke pl-3 flex flex-col gap-3">
                  <div>
                    <span className="block text-xs font-bold text-title">Checked In (Main Gate)</span>
                    <span className="block text-[10px] text-subtitle">Today, 06:15 AM</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-title">Purchased Protein Shake</span>
                    <span className="block text-[10px] text-subtitle">Yesterday, 08:30 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
