import React, { useState } from 'react';
import { 
  Search, RefreshCw, Moon, Sun, Bell, ChevronDown, 
  Home, Newspaper, Dumbbell, Users, Bookmark,
  Star, MessageCircle, Share, Edit2, Trash2,
  Image as ImageIcon, Activity, FileText, Droplet,
  Globe, UserPlus, BarChart2, ArrowRight,
  TrendingUp, TrendingDown, ChevronRight, CheckCircle2, BadgeCheck,
  Crown, X
} from 'lucide-react';
import { Header } from '../../components/layout/Header';

function AuraBottomNav() {
  return (
    <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[400px] bg-[var(--sidebar)] backdrop-blur-xl border border-[var(--stroke)] rounded-[24px] z-50 flex justify-between items-center px-1.5 py-1.5 shadow-2xl">
      <button className="flex flex-col items-center justify-center text-[var(--primary)] w-16 bg-[var(--primary-lite)] rounded-[18px] py-2 relative overflow-hidden">
        <Home className="w-[20px] h-[20px] mb-1" fill="currentColor" />
        <span className="text-[9px] font-bold tracking-wide">HOME</span>
        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[var(--primary)]" />
      </button>
      <button className="flex flex-col items-center justify-center text-[var(--subtitle)] hover:text-[var(--title)] w-16 py-2 transition-colors">
        <Newspaper className="w-[20px] h-[20px] mb-1" />
        <span className="text-[9px] font-medium tracking-wide">NEWS</span>
      </button>
      <button className="flex flex-col items-center justify-center text-[var(--subtitle)] hover:text-[var(--title)] w-16 py-2 transition-colors">
        <Dumbbell className="w-[20px] h-[20px] mb-1" />
        <span className="text-[9px] font-medium tracking-wide">GYMS</span>
      </button>
      <button className="flex flex-col items-center justify-center text-[var(--subtitle)] hover:text-[var(--title)] w-16 py-2 transition-colors">
        <Users className="w-[20px] h-[20px] mb-1" />
        <span className="text-[9px] font-medium tracking-wide">FRIENDS</span>
      </button>
      <button className="flex flex-col items-center justify-center text-[var(--subtitle)] hover:text-[var(--title)] w-16 py-2 transition-colors">
        <Bookmark className="w-[20px] h-[20px] mb-1" />
        <span className="text-[9px] font-medium tracking-wide">SAVED</span>
      </button>
    </div>
  );
}

const recentActivities = [
  { id: 1, action: 'Cheered your post !', user: 'Camelia Jaison', cheers: '476K Cheers', time: '4 sec', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop', unread: true },
  { id: 2, action: 'Commented on your post !', user: 'Camelia Jaison', cheers: '476K Cheers', time: '56 sec', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop', unread: true },
  { id: 3, action: 'Commented on your post !', user: 'Camelia Jaison', cheers: '476K Cheers', time: '1 min', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop', unread: true },
  { id: 4, action: 'Cheered your post !', user: 'Rafael Kim', cheers: '13K Cheers', time: '2 min', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop', unread: false },
  { id: 5, action: 'Commented on your post !', user: 'Mateo Rivera', cheers: '475K Cheers', time: '2 min', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop', unread: false },
  { id: 6, action: 'Cheered your post !', user: 'Sofia Leung', cheers: '4K Cheers', time: '17 min', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop', unread: false },
  { id: 7, action: 'Cheered your post !', user: 'Mateo Rivera', cheers: '475K Cheers', time: '1 h', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop', unread: false },
  { id: 8, action: 'Shared a new post !', user: 'Camelia Jaison', cheers: 'Public', time: '3 h', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop', unread: false },
];

const activeFriends = [
  { id: 1, name: 'Camelia Jaison', verified: true, gym: 'CEASERS GYM', branch: 'Smouha Branch', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop' },
  { id: 2, name: 'Rafael Kim', verified: false, gym: 'IRONCLAD FITNESS', branch: 'Downtown Studio', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop' },
  { id: 3, name: 'Sophia Lee', verified: false, gym: 'VITALITY HUB', branch: 'Uptown Center', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop' },
  { id: 4, name: 'Mateo Rivera', verified: false, gym: 'PRIMAL STRENGTH', branch: 'Eastside Garage', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop' },
  { id: 5, name: 'Ayesha Malik', verified: false, gym: 'ZENITH WELLNESS', branch: 'Central Park Branch', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop' },
];

const mockPosts = [
  {
    id: 1,
    author: 'Camelia Jaison',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop',
    time: '2 minutes',
    mentions: ['Wilson John'],
    content: <>Had a great workout at the GYM today. Was lovely to meet 🔥 <span className="inline-flex items-center gap-1 text-[10px] border border-[var(--primary)] text-[var(--primary)] rounded-full px-2 py-0.5 bg-transparent translate-y-[-1px]">@ Wilson John</span> He was lovely to work with and a good match.</>,
    cheersCount: '+475K Cheers',
    isLiked: true
  },
  {
    id: 2,
    author: "Liam O'Connor",
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
    time: '5 minutes',
    mentions: ['Sophia Lee'],
    content: <>Just finished an intense yoga session! Feeling refreshed and energized. 🧘‍♂️ The instructor was amazing and really helped me focus.</>,
    cheersCount: '+300K Cheers',
    isLiked: true
  },
  {
    id: 3,
    author: 'Kareem Ehab (ME)',
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop',
    time: '7 minutes',
    photosCount: 3,
    images: [
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&auto=format&fit=crop'
    ],
    cheersCount: '+9.4M Cheers',
    isLiked: true,
    isMe: true
  },
  {
    id: 4,
    author: 'Maya Patel',
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop',
    time: '10 minutes',
    mentions: ['Ethan Wright'],
    content: <>Morning run by the lake was breathtaking. Met some inspiring runners who motivated me to push harder. 🏃‍♀️ Can't wait for the next one!</>,
    cheersCount: '+600K Cheers',
    isLiked: true
  }
];

export function AuraHub({ onNavigate }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);

  const renderLeaderboard = () => (
    <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-6 mb-6`}>
      <div className="flex justify-between items-center mb-10">
        <h3 className={`text-sm font-bold text-[var(--title)] tracking-wider flex items-center gap-2`}>
          <BarChart2 className={`w-5 h-5 text-[var(--subtitle)]`} /> LEADERBOARD
        </h3>
        <button className="text-[12px] font-bold text-[var(--primary)] bg-[var(--primary-lite)] transition-colors px-3 py-1.5 rounded-xl flex items-center gap-1.5">
          See all <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
      
      {/* Podium Visualization */}
      <div className="flex items-end justify-center h-[260px] gap-1 relative pb-2 mt-4 px-2">
         {/* Rank 2 */}
         <div className="flex flex-col items-center w-[30%] relative hover:-translate-y-2 transition-transform cursor-pointer z-10">
            <div className="flex items-center mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffb5ae] relative z-10 border border-[var(--formfield)]"></div>
              <span className={`text-[12px] text-[var(--title)] ml-1.5 font-medium`}>6,500</span>
            </div>
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop" className={`w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full border-[3px] border-[var(--formfield)] object-cover z-20 -mb-6 sm:-mb-8 shadow-md`} alt="Rank 2" />
            <div className="w-full h-[140px] bg-[#ffb5ae] rounded-tl-[40px] rounded-bl-[20px] rounded-br-[20px] rounded-tr-[16px] flex flex-col items-center justify-center pt-8 relative">
               <span className="text-[40px] sm:text-[48px] font-black text-white leading-none tracking-tighter mb-1">2</span>
               <span className="text-[12px] sm:text-[14px] font-bold text-white mt-0.5">Camelia</span>
            </div>
         </div>
         
         {/* Rank 1 */}
         <div className="flex flex-col items-center w-[40%] relative hover:-translate-y-2 transition-transform cursor-pointer z-20">
            <div className="flex items-center mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffb5ae] relative z-10 border border-[var(--formfield)]"></div>
              <span className={`text-[12px] text-[var(--title)] ml-1.5 font-medium`}>7,120</span>
            </div>
            <div className="relative z-20 -mb-8 sm:-mb-10">
               <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop" className={`w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] rounded-full border-[3px] border-[var(--formfield)] object-cover shadow-md`} alt="Rank 1" />
               <Crown className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 text-[var(--primary)] rotate-[15deg] drop-shadow-sm fill-[var(--primary)]" stroke="white" strokeWidth="1" />
            </div>
            <div className="w-full bg-[var(--primary-lite)] rounded-t-[30px] rounded-b-[20px] p-[5px] relative">
               <div className="w-full h-[160px] bg-[var(--primary)] rounded-t-[25px] rounded-b-[15px] flex flex-col items-center justify-center pt-10 pb-2">
                  <span className="text-[50px] sm:text-[60px] font-black text-[var(--background)] leading-none tracking-tighter mb-1">1</span>
                  <div className="flex flex-col items-center leading-tight">
                    <span className="text-[12px] sm:text-[14px] font-bold text-[var(--background)]">Kareem</span>
                    <span className="text-[10px] sm:text-[12px] font-bold text-[var(--background)]">(ME)</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Rank 3 */}
         <div className="flex flex-col items-center w-[30%] relative hover:-translate-y-2 transition-transform cursor-pointer z-10">
            <div className="flex items-center mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffb5ae] relative z-10 border border-[var(--formfield)]"></div>
              <span className={`text-[12px] text-[var(--title)] ml-1.5 font-medium`}>4,800</span>
            </div>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop" className={`w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full border-[3px] border-[var(--formfield)] object-cover z-20 -mb-6 sm:-mb-8 shadow-md`} alt="Rank 3" />
            <div className="w-full h-[120px] bg-[#3cbdf6] rounded-tr-[40px] rounded-br-[20px] rounded-bl-[20px] rounded-tl-[16px] flex flex-col items-center justify-center pt-8 relative">
               <span className="text-[40px] sm:text-[48px] font-black text-white leading-none tracking-tighter mb-1">3</span>
               <span className="text-[12px] sm:text-[14px] font-bold text-white mt-0.5">Wilson</span>
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-[var(--background)] text-[var(--title)] font-sans selection:bg-[var(--primary-lite)]`}>


      <Header 
        isAuraHub={true} 
        onNavigate={onNavigate} 
        onNotifClick={() => setIsActivitiesOpen(true)}
      />

      <div className="max-w-[1650px] mx-auto px-4 sm:px-[20px] pt-4 pb-[100px] lg:pb-[20px]">
        
        {/* Search & Streak moved to Header */}

        {/* Header Section (Desktop keeps Streak here, Mobile hides it) */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--title)] tracking-tight mb-1">
              AuraHub <span className="text-[var(--primary)]">Community</span>
            </h1>
            <p className={`text-xs sm:text-sm text-[var(--subtitle)]`}>
              Stay on top with AURA.FIT—your go-to hub for the global fitness community!
            </p>
          </div>
          
          <div className="hidden lg:flex bg-[var(--formfield)] border border-[var(--stroke)] rounded-full px-4 py-2 items-center gap-3 w-fit">
            <span className="text-[11px] font-bold text-[var(--subtitle)] tracking-wider">STREAK</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-[var(--title)]">37</span>
              <span className="text-lg leading-none">🔥</span>
            </div>
          </div>
        </div>

        {/* Mobile Active Users (Stories) */}
        <div className="lg:hidden flex gap-4 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {activeFriends.map((friend) => (
            <div key={`story-${friend.id}`} className="flex flex-col items-center gap-2 min-w-[56px]">
              <div className="relative w-14 h-14 cursor-pointer hover:scale-105 transition-transform">
                <img src={friend.avatar} className="w-full h-full rounded-full object-cover border-[2px] border-[var(--stroke)] opacity-90" alt={friend.name} />
                {friend.verified && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[var(--primary)] border-2 border-[var(--background)] rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>
              <span className="text-[10px] text-[var(--title)] font-medium truncate w-full text-center">{friend.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>

        {/* Mobile Leaderboard */}
        <div className="block lg:hidden">
          {renderLeaderboard()}
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ================= LEFT SIDEBAR ================= */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            
            {/* Navigation Menu */}
            <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] overflow-hidden flex flex-col`}>
              <button className="flex items-center gap-4 px-6 py-4 border-l-[4px] border-l-[var(--primary)] bg-[var(--primary-lite)] text-[var(--primary)] transition-colors">
                <Home className="w-[18px] h-[18px]" fill="currentColor" strokeWidth={1.5} /> 
                <span className="font-bold text-xs tracking-wide">HOME</span>
              </button>
              <button className={`flex items-center gap-4 px-6 py-4 border-l-[4px] border-l-transparent text-[var(--subtitle)] hover:text-[var(--title)] hover:bg-[var(--overlay)] transition-colors group`}>
                <Newspaper className="w-[18px] h-[18px]" strokeWidth={1.5} /> 
                <span className="font-bold text-xs tracking-wide">AURA NEWS</span>
              </button>
              <button className={`flex items-center gap-4 px-6 py-4 border-l-[4px] border-l-transparent text-[var(--subtitle)] hover:text-[var(--title)] hover:bg-[var(--overlay)] transition-colors group`}>
                <Dumbbell className="w-[18px] h-[18px]" strokeWidth={1.5} /> 
                <span className="font-bold text-xs tracking-wide">GYMS</span>
              </button>
              <button className={`flex items-center gap-4 px-6 py-4 border-l-[4px] border-l-transparent text-[var(--subtitle)] hover:text-[var(--title)] hover:bg-[var(--overlay)] transition-colors group`}>
                <Users className="w-[18px] h-[18px]" strokeWidth={1.5} /> 
                <span className="font-bold text-xs tracking-wide">FRIENDS</span>
              </button>
              <button className={`flex items-center gap-4 px-6 py-4 border-l-[4px] border-l-transparent text-[var(--subtitle)] hover:text-[var(--title)] hover:bg-[var(--overlay)] transition-colors group`}>
                <Bookmark className="w-[18px] h-[18px]" strokeWidth={1.5} /> 
                <span className="font-bold text-xs tracking-wide">SAVED</span>
              </button>
            </div>

            {/* Recent Activities */}
            <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-0 overflow-hidden`}>
              <div className="p-5 pb-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xs font-bold text-[var(--subtitle)] tracking-wider flex items-center gap-2`}>
                    <TrendingUp className="w-4 h-4" /> RECENT ACTIVITIES
                  </h3>
                  <span className="bg-[var(--primary-lite)] text-[var(--primary)] text-[10px] px-2 py-1 rounded-md font-bold tracking-wide">
                    {recentActivities.filter(a => a.unread).length} unread
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 pb-4">
                 {(() => {
                   const grouped = [];
                   let currentGroup = [];
                   recentActivities.forEach(act => {
                     if (act.unread) {
                       currentGroup.push(act);
                     } else {
                       if (currentGroup.length > 0) {
                         grouped.push({ type: 'unread', items: currentGroup });
                         currentGroup = [];
                       }
                       grouped.push({ type: 'read', item: act });
                     }
                   });
                   if (currentGroup.length > 0) {
                     grouped.push({ type: 'unread', items: currentGroup });
                   }

                   return grouped.map((group, gIdx) => {
                     if (group.type === 'unread') {
                       return (
                         <div key={`group-${gIdx}`} className="bg-[var(--formfield)] border border-[var(--stroke)] rounded-[15px] overflow-hidden mx-4 shadow-sm">
                           {group.items.map((activity, idx) => (
                             <div key={activity.id} className={`flex items-center gap-3 px-4 py-3 cursor-pointer bg-[var(--background)] ${idx !== group.items.length - 1 ? 'border-b border-[var(--stroke)]' : ''} border-l-[4px] border-l-[var(--primary)] hover:opacity-90 transition-opacity`}>
                               <img src={activity.avatar} className="w-9 h-9 rounded-full object-cover border border-[var(--stroke)]" alt="User" />
                               <div className="flex-1 min-w-0">
                                 <p className="text-[12px] font-semibold truncate text-[var(--title)]">{activity.action}</p>
                                 <div className="flex items-center gap-1.5 text-[10px] text-[var(--subtitle)] mt-0.5">
                                   <span className="text-[var(--primary)] truncate max-w-[80px]">{activity.user}</span>
                                   {activity.user === 'Camelia Jaison' && <BadgeCheck className="w-3 h-3 text-[var(--primary)]" fill="currentColor" stroke="var(--background)" />}
                                   <span>•</span>
                                   <span>{activity.cheers}</span>
                                 </div>
                               </div>
                               <span className="text-[10px] text-[var(--subtitle)] whitespace-nowrap">{activity.time}</span>
                             </div>
                           ))}
                         </div>
                       );
                     } else {
                       const activity = group.item;
                       return (
                         <div key={activity.id} className="flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors border-l-[4px] border-l-transparent hover:bg-[var(--overlay)]">
                           <img src={activity.avatar} className="w-9 h-9 rounded-full object-cover border border-[var(--stroke)]" alt="User" />
                           <div className="flex-1 min-w-0">
                             <p className="text-[12px] font-semibold truncate text-[var(--title)]">{activity.action}</p>
                             <div className="flex items-center gap-1.5 text-[10px] text-[var(--subtitle)] mt-0.5">
                               <span className="text-[var(--primary)] truncate max-w-[80px]">{activity.user}</span>
                               {activity.user === 'Camelia Jaison' && <BadgeCheck className="w-3 h-3 text-[var(--primary)]" fill="currentColor" stroke="var(--formfield)" />}
                               <span>•</span>
                               <span>{activity.cheers}</span>
                             </div>
                           </div>
                           <span className="text-[10px] text-[var(--subtitle)] whitespace-nowrap">{activity.time}</span>
                         </div>
                       );
                     }
                   });
                 })()}
              </div>
              
              <div className="p-4 pt-0">
                <button className="w-full py-2.5 text-xs text-[var(--primary)] font-bold bg-[var(--primary-lite)] hover:bg-[var(--primary-border)] rounded-xl transition-colors flex items-center justify-center gap-1">
                  See more <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

          {/* ================= CENTER COLUMN ================= */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Composer */}
            <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-5 sm:p-6`}>
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop" className={`w-10 h-10 rounded-full object-cover border border-[var(--stroke)]`} alt="Me" />
                  <div>
                    <h3 className="font-bold text-[14px]">Kareem Ehab</h3>
                    <div className="flex gap-2 mt-1">
                      <button className={`flex items-center gap-1 text-[10px] font-medium border border-[var(--stroke)] rounded-full px-2.5 py-0.5 bg-[var(--background)] text-[var(--subtitle)] hover:text-[var(--title)] transition-colors`}>
                        <Globe className="w-3 h-3"/> Public
                      </button>
                      <button className={`flex items-center gap-1 text-[10px] font-medium border border-[var(--stroke)] rounded-full px-2.5 py-0.5 bg-[var(--background)] text-[var(--subtitle)] hover:text-[var(--title)] transition-colors`}>
                        @ Mention
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <input 
                type="text" 
                placeholder="What's your fitness update?" 
                className={`w-full bg-transparent border-none outline-none text-[15px] text-[var(--title)] placeholder:text-[var(--subtitle)] mb-5`}
              />
              
              <div className="flex gap-2">
                <button className="flex-1 py-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-bold text-[var(--primary)] border border-[var(--primary)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors bg-transparent">
                  <ImageIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5"/> Media
                </button>
                <button className="flex-1 py-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-bold text-[var(--primary)] border border-[var(--primary)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors bg-transparent">
                  <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5"/> Workout
                </button>
                <button className="flex-1 py-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-bold text-[var(--primary)] border border-[var(--primary)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors bg-transparent">
                  <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5"/> Nutrition
                </button>
                <button className="flex-1 py-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-bold text-[var(--primary)] border border-[var(--primary)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors bg-transparent">
                  <Droplet className="w-3 h-3 sm:w-3.5 sm:h-3.5"/> Hydration
                </button>
              </div>
            </div>

            {/* Feed Posts */}
            {mockPosts.map((post) => (
              <div key={post.id} className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-5 sm:p-6`}>
                
                {/* Post Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-3 w-full">
                    <img src={post.avatar} className={`w-10 h-10 rounded-full object-cover border border-[var(--stroke)] shrink-0`} alt={post.author} />
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <h3 className={`font-bold text-[14px] text-[var(--title)]`}>{post.author}</h3>
                          {post.verified && <BadgeCheck className="w-4 h-4 text-[var(--primary)]" fill="currentColor" stroke="var(--formfield)" />}
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className={`text-[11px] font-medium text-[var(--title)]`}>{post.time}</span>
                          {post.isMe && (
                            <div className="flex items-center gap-2">
                              <Edit2 className="w-3.5 h-3.5 cursor-pointer text-[var(--subtitle)] hover:text-[var(--title)] transition-colors" />
                              <Trash2 className="w-3.5 h-3.5 cursor-pointer text-red-500/80 hover:text-red-400 transition-colors" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        {post.isMe ? (
                          <span className={`flex items-center gap-1.5 text-[10px] font-medium border border-[var(--stroke)] rounded-full px-2.5 py-0.5 bg-[var(--background)] text-[var(--title)]`}>
                            <ImageIcon className="w-3 h-3"/> {post.photosCount} Photos
                          </span>
                        ) : (
                          <>
                            <button className="flex items-center gap-1 text-[10px] font-bold border border-[var(--primary)] text-[var(--primary)] rounded-full px-3 py-0.5 bg-transparent hover:opacity-80 transition-opacity">
                              <UserPlus className="w-3 h-3"/> Follow
                            </button>
                            {post.mentions && post.mentions.map((m, i) => (
                              <button key={i} className={`flex items-center gap-1 text-[10px] font-medium border border-[var(--stroke)] rounded-full px-3 py-0.5 bg-[var(--background)] text-[var(--subtitle)] hover:text-[var(--title)] transition-colors`}>
                                @ {m}
                              </button>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Block & Footer with Vertical Thread Line */}
                <div className="mt-1 ml-[20px] pl-[16px] sm:ml-[20px] sm:pl-[20px] border-l-[2px] border-[var(--stroke)] border-opacity-50">
                  {/* Text Content */}
                  {post.content && (
                     <p className="text-[13px] sm:text-[14px] text-[var(--title)] leading-relaxed mb-4 opacity-90">
                      {post.content}
                    </p>
                  )}

                  {/* Media Grid (Collage) */}
                  {post.images && post.images.length > 0 && (
                    <div className={`mt-3 mb-4 rounded-xl overflow-hidden border border-[var(--stroke)]`}>
                      {post.images.length === 1 && (
                        <img src={post.images[0]} className="w-full h-auto max-h-[300px] object-cover hover:opacity-95 transition-opacity cursor-pointer" alt="Post media" />
                      )}
                      {post.images.length === 2 && (
                        <div className="flex w-full h-[200px]">
                          <img src={post.images[0]} className="w-1/2 h-full object-cover border-r border-[var(--stroke)] hover:opacity-95 transition-opacity cursor-pointer" alt="Post media 1" />
                          <img src={post.images[1]} className="w-1/2 h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" alt="Post media 2" />
                        </div>
                      )}
                      {post.images.length >= 3 && (
                        <div className="flex w-full h-[250px]">
                          <img src={post.images[0]} className="w-2/3 h-full object-cover border-r border-[var(--stroke)] hover:opacity-95 transition-opacity cursor-pointer" alt="Post media 1" />
                          <div className="w-1/3 h-full flex flex-col">
                            <img src={post.images[1]} className="w-full h-1/2 object-cover border-b border-[var(--stroke)] hover:opacity-95 transition-opacity cursor-pointer" alt="Post media 2" />
                            <div className="w-full h-1/2 relative group cursor-pointer">
                              <img src={post.images[2]} className="w-full h-full object-cover hover:opacity-95 transition-opacity" alt="Post media 3" />
                              {post.images.length > 3 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-colors group-hover:bg-black/60">
                                  <span className="text-white font-bold text-lg">+{post.images.length - 3}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Post Footer / Actions */}
                  <div className="flex justify-between items-center mt-3 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop" className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[var(--formfield)] object-cover`} alt="cheer" />
                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop" className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[var(--formfield)] object-cover`} alt="cheer" />
                      </div>
                      <span className={`text-[11px] sm:text-[12px] font-medium text-[var(--title)] opacity-80`}>{post.cheersCount}</span>
                    </div>
                    
                    <div className={`flex items-center gap-3 sm:gap-4 text-[var(--title)] opacity-70`}>
                      <Star className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-[var(--primary)] hover:opacity-100 ${post.isLiked ? 'text-[var(--primary)] fill-[var(--primary)] opacity-100' : ''}`} />
                      <MessageCircle className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-[var(--title)] hover:opacity-100`} />
                      <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-[var(--title)] hover:opacity-100`} />
                      <Share className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-[var(--title)] hover:opacity-100`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            
            {/* Leaderboard */}
            {renderLeaderboard()}

            {/* Active Friends */}
            <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-5`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xs font-bold text-[var(--subtitle)] tracking-wider flex items-center gap-2`}>
                  <div className="w-2 h-2 bg-[var(--primary)] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div> ACTIVE FRIENDS
                </h3>
                <span className="text-[10px] font-bold text-[var(--primary)] bg-[var(--primary-lite)] px-2 py-1 rounded-md tracking-wide">64 Online</span>
              </div>
              
              <div className="space-y-5">
                {activeFriends.map((friend) => (
                  <div key={friend.id} className="flex items-center gap-3 cursor-pointer group">
                    <img src={friend.avatar} className={`w-10 h-10 rounded-full object-cover border border-[var(--stroke)] group-hover:border-[var(--primary)] transition-colors`} alt={friend.name} />
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-[13px] font-bold flex items-center gap-1.5 truncate group-hover:text-[var(--primary)] transition-colors text-[var(--title)]`}>
                        {friend.name}
                        {friend.verified && <BadgeCheck className="w-3.5 h-3.5 text-[var(--primary)]" fill="currentColor" stroke="var(--formfield)" />}
                      </h4>
                      <p className={`text-[10px] text-[var(--subtitle)] truncate mt-0.5 tracking-wide`}>
                        <span className={`text-[var(--title)] font-medium`}>{friend.gym}</span> • {friend.branch}
                      </p>
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-2.5 mt-2 text-xs text-[var(--primary)] font-bold bg-[var(--primary-lite)] hover:bg-[var(--primary-border)] rounded-xl transition-colors flex items-center justify-center gap-1">
                  See more <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

          <div style={{ paddingBottom: '15px' }} />
        </div>
      </div>

      {/* Activities Side Menu (Drawer) */}
      {isActivitiesOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsActivitiesOpen(false)} />
          <div className="relative w-full max-w-[340px] bg-[var(--background)] h-full overflow-y-auto shadow-2xl flex flex-col animate-slide-in-right">
            <div className="sticky top-0 bg-[var(--background)] z-10 flex items-center justify-between p-5 border-b border-[var(--stroke)]">
              <h3 className="text-sm font-bold text-[var(--title)] tracking-wider">RECENT ACTIVITIES</h3>
              <button onClick={() => setIsActivitiesOpen(false)} className="p-1 rounded-full hover:bg-[var(--sidebar)] text-[var(--subtitle)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3 items-start cursor-pointer hover:bg-[var(--sidebar)] p-2 -mx-2 rounded-xl transition-colors">
                  <div className="relative shrink-0 mt-1">
                    <img src={activity.avatar} className="w-9 h-9 rounded-full border border-[var(--stroke)] object-cover" alt={activity.user} />
                    {activity.unread && <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[var(--alert)] border-2 border-[var(--background)] rounded-full animate-pulse" />}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-bold text-[var(--title)]">{activity.user}</span>
                    <span className="text-[11px] text-[var(--subtitle)]">{activity.action}</span>
                    <span className="text-[10px] text-[var(--primary)] font-medium mt-0.5">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <AuraBottomNav />
    </div>
  );
}
