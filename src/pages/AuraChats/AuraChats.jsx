import React, { useState } from 'react';
import { 
  Search, MessageSquare, Phone, Video, MoreVertical, 
  Send, Paperclip, Smile, Users, Archive, Trash2, 
  Settings, Image as ImageIcon, Camera, Activity, 
  CheckCheck, Edit3, HeartPulse, ChevronRight, BellRing, User
} from 'lucide-react';
import './AuraChats.css';

// Extended Mock Data for New Architecture
const mockConversations = [
  { 
    id: 'c1', 
    name: 'Sarah Scott', 
    type: 'direct', 
    unread: 3, 
    time: '14:30', 
    lastMessage: 'Coach, can you review my breakfast targets?', 
    isOnline: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop',
    tier: 'VIP ELITE',
    phone: '+20 100 456 7890',
    joinDate: 'Oct 2024'
  },
  { 
    id: 'c2', 
    name: 'Omar Sherif', 
    type: 'direct', 
    unread: 0, 
    time: 'Yesterday', 
    lastMessage: 'Thanks for sending over the new diet plan!', 
    isOnline: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
    tier: 'GOLD',
    phone: '+20 111 222 3333',
    joinDate: 'Jan 2025'
  },
  { 
    id: 'c3', 
    name: 'Front Desk', 
    type: 'group', 
    unread: 0, 
    time: 'Tuesday', 
    lastMessage: 'System is back online.', 
    isOnline: true,
    avatar: null
  },
];

const mockChatHistory = [
  { id: 1, sender: 'System', text: 'Sarah Scott updated her nutrition log.', time: '14:00', type: 'system' },
  { id: 2, sender: 'Sarah Scott', text: 'Hey Coach! I hit my macros for the day but I feel a bit bloated. Coach, can you review my breakfast targets?', time: '14:30', isMe: false },
  { 
    id: 3, 
    sender: 'Sarah Scott', 
    text: '', 
    time: '14:31', 
    isMe: false,
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&auto=format&fit=crop' } 
  },
  { id: 4, sender: 'Kareem Ehab', text: 'Hey Sarah! Looking at your log now. The oatmeal looks great but we might need to adjust the dairy intake if you feel bloated.', time: '14:35', isMe: true, status: 'delivered' },
  { 
    id: 5, 
    sender: 'Kareem Ehab', 
    text: '', 
    time: '14:36', 
    isMe: true, 
    status: 'delivered',
    media: { 
      type: 'template', 
      title: 'Dairy-Free Alternate Plan',
      icon: Activity
    }
  },
];

export function AuraChats() {
  const [activeQueue, setActiveQueue] = useState('all'); // all, unassigned
  const [activeChatId, setActiveChatId] = useState('c1');
  const [message, setMessage] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const activeChat = mockConversations.find(c => c.id === activeChatId);

  return (
    <div className="aura-chats-container animate-fade-in flex flex-col h-[calc(100vh-100px)] overflow-hidden bg-[#070A12] p-4 lg:p-6 text-white font-sans">
      
      {/* 3-COLUMN ARCHITECTURE GRID */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 h-full">
        
        {/* ================= A. LEFT COLUMN: The Smart Inbox Queue (25%) ================= */}
        <div className="w-full lg:w-1/4 flex flex-col shrink-0 gap-4">
          
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2 mb-2">
            Inbox <span className="text-primary text-sm bg-primary/10 px-2 py-0.5 rounded border border-primary/20">Pro</span>
          </h1>

          {/* Platform Selector Segment */}
          <div className="flex bg-[#0D1222] rounded-xl p-1 border border-white/5 shadow-lg">
            <button 
              onClick={() => setActiveQueue('all')}
              className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${activeQueue === 'all' ? 'bg-primary text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'text-gray-400 hover:text-white'}`}
            >All Messages</button>
            <button 
              onClick={() => setActiveQueue('unassigned')}
              className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${activeQueue === 'unassigned' ? 'bg-primary text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'text-gray-400 hover:text-white'}`}
            >Unassigned Tickets</button>
          </div>

          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input type="text" placeholder="Search members..." className="w-full bg-[#0D1222] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors shadow-inner" />
          </div>

          {/* Conversation Thread Cards */}
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1 pr-2">
            {mockConversations.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChatId(chat.id)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                  activeChatId === chat.id 
                    ? 'bg-[#0D1222] border-white/10 shadow-lg' 
                    : 'border-transparent hover:bg-[#0D1222]/50'
                }`}
              >
                {/* Avatar with Status Dot */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#141B30] border border-white/5 flex items-center justify-center overflow-hidden">
                    {chat.avatar ? <img src={chat.avatar} alt="Avatar" className="w-full h-full object-cover"/> : <Users size={20} className="text-gray-400"/>}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#070A12] ${chat.isOnline ? 'bg-primary shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-gray-600'}`}></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold text-white truncate">{chat.name}</h4>
                    <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap ml-2">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate w-[90%]">
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Unread Badge */}
                {chat.unread > 0 && (
                  <div className="shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-black text-black shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= B. CENTER COLUMN: The Live Messaging Canvas (50%) ================= */}
        <div className="w-full lg:w-1/2 flex flex-col bg-[#0D1222] border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative z-10">
          
          {/* Header Dock */}
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0D1222]/80 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-black text-lg text-white">{activeChat?.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeChat?.isOnline ? 'bg-primary animate-pulse' : 'bg-gray-500'}`}></span>
                  <span className="text-xs text-gray-400 font-medium">
                    {activeChat?.isOnline ? 'Online now (App)' : 'Offline - Last active 2h ago'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="Video Call"><Video size={18}/></button>
              <div className="w-px h-6 bg-white/10 mx-1"></div>
              <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Archive Thread"><Archive size={18}/></button>
              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete Thread"><Trash2 size={18}/></button>
            </div>
          </div>

          {/* The Dialogue Grid */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
            <div className="text-center mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 bg-[#070A12] px-4 py-1.5 rounded-full border border-white/5">Today</span>
            </div>
            
            {mockChatHistory.map(msg => {
              if (msg.type === 'system') {
                return (
                  <div key={msg.id} className="text-center my-2">
                    <span className="text-xs font-medium text-gray-400 bg-white/5 px-3 py-1 rounded-md">{msg.text}</span>
                  </div>
                );
              }

              return (
                <div key={msg.id} className={`flex flex-col max-w-[75%] ${msg.isMe ? 'self-end items-end' : 'self-start items-start'}`}>
                  {!msg.isMe && <span className="text-[10px] font-bold text-gray-500 mb-1 ml-1">{msg.sender}</span>}
                  
                  {/* Inline Rich Media Preview */}
                  {msg.media && msg.media.type === 'image' && (
                    <div className="mb-2 rounded-xl overflow-hidden border border-white/10 shadow-lg max-w-[250px]">
                      <img src={msg.media.url} alt="Attached media" className="w-full h-auto object-cover"/>
                    </div>
                  )}

                  {msg.media && msg.media.type === 'template' && (
                    <div className="mb-2 rounded-xl border border-primary/30 bg-primary/5 p-3 flex items-center gap-3 w-64 shadow-lg cursor-pointer hover:bg-primary/10 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                        <msg.media.icon size={20} className="text-primary"/>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white">{msg.media.title}</h4>
                        <span className="text-[10px] text-primary font-bold">Attached Plan</span>
                      </div>
                    </div>
                  )}

                  {msg.text && (
                    <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-md ${
                      msg.isMe 
                        ? 'bg-[#1A233A] border border-white/5 text-white rounded-tr-sm' 
                        : 'bg-[#141B30] border border-white/5 text-gray-200 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  )}

                  {/* Delivery Status & Timestamp */}
                  <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-gray-500 font-medium">
                    <span>{msg.time}</span>
                    {msg.isMe && (
                      <CheckCheck size={14} className="text-primary drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]"/>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Composer */}
          <div className="p-4 bg-[#0D1222] border-t border-white/5 shrink-0">
            <div className="flex items-center gap-3 bg-[#070A12] border border-white/10 rounded-xl p-2 focus-within:border-primary/50 transition-colors shadow-inner">
              <button className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><Smile size={18}/></button>
              <button className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><Paperclip size={18}/></button>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message Sarah..." 
                className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none px-2 placeholder-gray-600"
              />
              <button className="h-10 px-5 bg-primary text-black rounded-lg flex items-center justify-center shrink-0 hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(34,197,94,0.3)] font-black text-sm gap-2">
                Send <Send size={14}/>
              </button>
            </div>
          </div>

        </div>

        {/* ================= C. RIGHT COLUMN: The Context Intelligence Panel (25%) ================= */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4 shrink-0 overflow-y-auto custom-scrollbar pr-2 pb-10">
          
          {/* Profile Snapshot Block */}
          {activeChat?.avatar ? (
            <div className="bg-[#0D1222] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-primary to-blue-500"></div>
              <img src={activeChat.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-[#070A12] shadow-xl mb-4" />
              <h3 className="text-lg font-black text-white">{activeChat.name}</h3>
              {activeChat.tier && (
                <span className="text-[10px] font-black tracking-widest uppercase bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-2.5 py-0.5 rounded mt-2">
                  {activeChat.tier}
                </span>
              )}
              <div className="w-full h-px bg-white/5 my-4"></div>
              <div className="w-full flex flex-col gap-2 text-left">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <Phone size={14} className="text-gray-500"/> {activeChat.phone || 'N/A'}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <User size={14} className="text-gray-500"/> Member since {activeChat.joinDate || 'N/A'}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#0D1222] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg h-48">
               <Users size={32} className="text-gray-500 mb-3"/>
               <h3 className="text-sm font-black text-white">Group Details</h3>
               <p className="text-xs text-gray-500 mt-1">Select a direct message for insights.</p>
            </div>
          )}

          {/* System Notification Toggle */}
          <div className="bg-[#0D1222] border border-white/5 rounded-2xl p-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-gray-400"><BellRing size={16}/></div>
              <div>
                <h4 className="text-xs font-bold text-white">Automated Alerts</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">Check-in rules & nudges</p>
              </div>
            </div>
            {/* Neomorphic Track Switch */}
            <div 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-10 h-5 rounded-full p-0.5 cursor-pointer transition-colors border ${notificationsEnabled ? 'bg-primary border-primary' : 'bg-[#070A12] border-white/10'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-black shadow-sm transform transition-transform ${notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </div>

          {/* Dynamic Structural Stats List */}
          <div className="bg-[#0D1222] border border-white/5 rounded-2xl p-5 shadow-lg">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">App Consistency</h4>
             <div className="flex flex-col gap-3">
               <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                 <div className="flex items-center gap-3">
                   <HeartPulse size={16} className="text-red-400"/>
                   <span className="text-xs font-bold text-white">Workouts Recorded</span>
                 </div>
                 <span className="text-sm font-black text-white">9</span>
               </div>
               <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                 <div className="flex items-center gap-3">
                   <Activity size={16} className="text-green-400"/>
                   <span className="text-xs font-bold text-white">Diet Logs</span>
                 </div>
                 <span className="text-sm font-black text-white">14</span>
               </div>
             </div>
          </div>

          {/* The Media & Attachment Gallery Grid */}
          <div className="bg-[#0D1222] border border-white/5 rounded-2xl p-5 shadow-lg">
             <div className="flex justify-between items-center mb-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Media</h4>
                <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline">243 Photos <ChevronRight size={10} className="inline"/></span>
             </div>
             <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square bg-white/10 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                   <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=150&auto=format&fit=crop" className="w-full h-full object-cover" alt="Media"/>
                </div>
                <div className="aspect-square bg-white/10 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                   <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=150&auto=format&fit=crop" className="w-full h-full object-cover" alt="Media"/>
                </div>
                <div className="aspect-square bg-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors border border-white/5">
                   <span className="text-xs font-bold text-white">+241</span>
                </div>
             </div>
          </div>

          {/* Internal Staff Scratchpad Area */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 shadow-lg relative mt-auto">
             <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
               <Edit3 size={14} className="text-black"/>
             </div>
             <h4 className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-2">Staff Scratchpad</h4>
             <textarea 
               className="w-full bg-transparent border-none text-xs text-yellow-100 placeholder-yellow-700/50 focus:outline-none resize-none h-20"
               placeholder="Write private notes about this member here... (Hidden from app)"
               defaultValue="Sarah is focusing on glute hypertrophy. Check in on her hip mobility next week."
             ></textarea>
          </div>

        </div>

      </div>
    </div>
  );
}
