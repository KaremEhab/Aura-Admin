import React, { useState } from 'react';
import { 
  Search, RefreshCw, Moon, Sun, Bell, ChevronDown, 
  Home, Newspaper, Dumbbell, Users, Bookmark,
  Star, MessageSquare, Share, Edit2, Trash2,
  Image as ImageIcon, Activity, FileText, Droplet,
  Globe, UserPlus, BarChart2, ArrowRight,
  TrendingUp, TrendingDown, ChevronRight, CheckCircle2, BadgeCheck
} from 'lucide-react';
import AuraLogo from '../../assets/Aura.svg';
import { Header } from '../../components/layout/Header';

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
  { id: 3, name: 'Sofia Leung', verified: false, gym: 'VITALITY HUB', branch: 'Uptown Center', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop' },
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
    content: <>Had a great workout at the GYM today. Was lovely to meet 🔥 <span className="inline-flex items-center gap-1 text-[10px] border border-[var(--primary-border)] text-[var(--primary)] rounded-full px-2 py-0.5 bg-[var(--primary-lite)] translate-y-[-1px]">@ Wilson John</span> He was lovely to work with and a good match.</>,
    cheersCount: '+475K Cheers',
    isLiked: false
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
    isLiked: false
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
    isLiked: false
  },
  {
    id: 5,
    author: 'Alex Mercer',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop',
    time: '24 minutes',
    content: <>Just dropped my new Push-Pull-Legs split for the community! 🏋️‍♂️ Feel free to fork it and track your own progress. Consistency is key.</>,
    template: { type: 'workout', title: 'Aesthetic PPL Routine', icon: <Activity className="w-4 h-4 text-blue-400" /> },
    cheersCount: '+1.2M Cheers',
    isLiked: false
  },
  {
    id: 6,
    author: 'Sarah Chen',
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop',
    time: '45 minutes',
    content: <>Meal prep Sunday is complete! 🥦 Hit my macros perfectly this week. Here is the high-protein template I've been following to lean out.</>,
    template: { type: 'nutrition', title: 'Lean Bulk Macros', icon: <FileText className="w-4 h-4 text-[var(--primary)]" /> },
    cheersCount: '+890K Cheers',
    isLiked: true
  },
  {
    id: 7,
    author: 'David Rodriguez',
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop',
    time: '1 hour',
    content: <>Reminder to stay hydrated! 💧 Just hit my 1-gallon daily goal. Tracking your water intake is severely underrated for recovery.</>,
    template: { type: 'hydration', title: 'Daily Gallon Log', icon: <Droplet className="w-4 h-4 text-blue-300" /> },
    cheersCount: '+250K Cheers',
    isLiked: false
  },
  {
    id: 8,
    author: 'Elena Rostova',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop',
    time: '3 hours',
    content: <>PR on the deadlift today! 140kg x 3 reps. 😤 It's been a long journey but the programming is finally paying off.</>,
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop'],
    cheersCount: '+2.1M Cheers',
    isLiked: false
  }
];

export function AuraHub({ onNavigate }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className={`min-h-screen bg-[var(--background)] text-[var(--title)] font-sans selection:bg-[var(--primary-lite)]`}>
      
      {/* Global Header */}
      <Header 
        branding={{ name: 'AURA.FIT.', color: '#22C55E' }} 
        onNavigate={onNavigate}
        onNotifClick={() => setShowNotifications(!showNotifications)}
        isAuraHub={true}
      >
        <div className="relative">
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className={`absolute top-8 right-0 w-80 bg-[var(--formfield)] border border-[var(--stroke)] rounded-2xl shadow-xl overflow-hidden z-50`}>
              <div className={`p-4 border-b border-[var(--stroke)] flex justify-between items-center`}>
                <h3 className="font-bold text-sm">Notifications</h3>
                <span className="text-[var(--primary)] text-xs font-bold cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className={`p-3 flex items-start gap-3 border-b border-[var(--stroke)] cursor-pointer hover:opacity-80 ${activity.unread ? 'bg-[var(--primary-lite)] border-l-[3px] border-l-[var(--primary)]' : ''}`}>
                     <img src={activity.avatar} className={`w-9 h-9 rounded-full object-cover border border-[var(--stroke)]`} alt="User" />
                     <div className="flex-1 min-w-0">
                       <p className={`text-xs font-semibold text-[var(--title)]`}>
                         {activity.user} <span className="font-normal">{activity.action.replace('your post !', 'your post')}</span>
                       </p>
                       <span className={`text-[10px] text-[var(--subtitle)] mt-0.5 block`}>{activity.time}</span>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Header>

      {/* Main Container */}
      <div className="max-w-[1650px] mx-auto px-[20px] py-[20px]">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--title)] tracking-tight mb-1">
            AuraHub <span className="text-[var(--primary)]">Community</span>
          </h1>
          <p className={`text-sm text-[var(--subtitle)]`}>
            Stay on top with AURA.FIT—your go-to hub for the global fitness community!
          </p>
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ================= LEFT SIDEBAR ================= */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Navigation Menu */}
            <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] overflow-hidden flex flex-col`}>
              <button className="flex items-center gap-4 px-6 py-4 border-l-[4px] border-l-[var(--primary)] bg-[var(--primary-lite)] text-[var(--primary)] transition-colors">
                <Home className="w-5 h-5" fill="currentColor" strokeWidth={1.5} /> 
                <span className="font-bold text-sm tracking-wide">HOME</span>
              </button>
              <button className={`flex items-center gap-4 px-6 py-4 border-l-[4px] border-l-transparent text-[var(--subtitle)] hover:text-[var(--title)] hover:bg-[var(--overlay)] transition-colors group`}>
                <Newspaper className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} /> 
                <span className="font-bold text-sm tracking-wide">AURA NEWS</span>
              </button>
              <button className={`flex items-center gap-4 px-6 py-4 border-l-[4px] border-l-transparent text-[var(--subtitle)] hover:text-[var(--title)] hover:bg-[var(--overlay)] transition-colors group`}>
                <Dumbbell className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} /> 
                <span className="font-bold text-sm tracking-wide">GYMS</span>
              </button>
              <button className={`flex items-center gap-4 px-6 py-4 border-l-[4px] border-l-transparent text-[var(--subtitle)] hover:text-[var(--title)] hover:bg-[var(--overlay)] transition-colors group`}>
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} /> 
                <span className="font-bold text-sm tracking-wide">FRIENDS</span>
              </button>
              <button className={`flex items-center gap-4 px-6 py-4 border-l-[4px] border-l-transparent text-[var(--subtitle)] hover:text-[var(--title)] hover:bg-[var(--overlay)] transition-colors group`}>
                <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} /> 
                <span className="font-bold text-sm tracking-wide">SAVED</span>
              </button>
            </div>

            {/* Active Streak */}
            <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] px-5 py-4 flex items-center justify-between`}>
              <span className={`text-xs font-bold text-[var(--subtitle)] tracking-wider`}>ACTIVE STREAK</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">37 DAYS</span>
                <span className="text-lg leading-none">🔥</span>
              </div>
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
              
              <div className="space-y-0 pb-2">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-colors ${activity.unread ? 'bg-[var(--background)] border-l-[4px] border-l-[var(--primary)]' : 'border-l-[4px] border-l-transparent hover:bg-[var(--overlay)]'}`}>
                    <img src={activity.avatar} className={`w-10 h-10 rounded-full object-cover border border-[var(--stroke)]`} alt="User" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-[13px] font-semibold truncate text-[var(--title)]`}>{activity.action}</p>
                      <div className={`flex items-center gap-1.5 text-[10px] text-[var(--subtitle)] mt-0.5`}>
                        <span className="text-[var(--primary)] truncate max-w-[80px]">{activity.user}</span>
                        {activity.user === 'Camelia Jaison' && <BadgeCheck className="w-3.5 h-3.5 text-[var(--primary)]" fill="currentColor" stroke={activity.unread ? "var(--background)" : "var(--formfield)"} />}
                        <span>•</span>
                        <span>{activity.cheers}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] text-[var(--subtitle)] whitespace-nowrap`}>{activity.time}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-4 pt-2">
                <button className="w-full py-2.5 text-xs text-[var(--primary)] font-bold bg-[var(--primary-lite)] hover:bg-[var(--primary-border)] rounded-xl transition-colors flex items-center justify-center gap-1">
                  See more <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

          {/* ================= CENTER COLUMN ================= */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Composer */}
            <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-6`}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop" className={`w-12 h-12 rounded-full object-cover border border-[var(--stroke)]`} alt="Me" />
                  <div>
                    <h3 className="font-bold text-[15px]">Kareem Ehab</h3>
                    <div className="flex gap-2 mt-1.5">
                      <button className={`flex items-center gap-1.5 text-[11px] font-medium border border-[var(--stroke)] rounded-full px-3 py-1 bg-[var(--background)] text-[var(--subtitle)] hover:text-[var(--title)] transition-colors`}>
                        <Globe className="w-3 h-3"/> Public
                      </button>
                      <button className={`flex items-center gap-1.5 text-[11px] font-medium border border-[var(--stroke)] rounded-full px-3 py-1 bg-[var(--background)] text-[var(--subtitle)] hover:text-[var(--title)] transition-colors`}>
                        @ Mention
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <input 
                type="text" 
                placeholder="What's your fitness update?" 
                className={`w-full bg-transparent border-none outline-none text-base text-[var(--title)] placeholder:text-[var(--subtitle)] mb-6`}
              />
              
              <div className="flex gap-3">
                <button className="flex-1 py-2.5 px-2 flex items-center justify-center gap-2 text-[11px] font-bold text-[var(--primary)] border border-[var(--primary-border)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors">
                  <ImageIcon className="w-3.5 h-3.5"/> Media Files
                </button>
                <button className="flex-1 py-2.5 px-2 flex items-center justify-center gap-2 text-[11px] font-bold text-[var(--primary)] border border-[var(--primary-border)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors">
                  <Activity className="w-3.5 h-3.5"/> Workout Template
                </button>
                <button className="flex-1 py-2.5 px-2 flex items-center justify-center gap-2 text-[11px] font-bold text-[var(--primary)] border border-[var(--primary-border)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors">
                  <FileText className="w-3.5 h-3.5"/> Nutrition Template
                </button>
                <button className="flex-1 py-2.5 px-2 flex items-center justify-center gap-2 text-[11px] font-bold text-[var(--primary)] border border-[var(--primary-border)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors">
                  <Droplet className="w-3.5 h-3.5"/> Hydration Log
                </button>
              </div>
            </div>

            {/* Feed Posts */}
            {mockPosts.map((post) => (
              <div key={post.id} className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-6`}>
                
                {/* Post Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <img src={post.avatar} className={`w-12 h-12 rounded-full object-cover border border-[var(--formfield)] z-10`} alt={post.author} />
                    <div className="pt-0.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className={`font-bold text-[15px] text-[var(--title)]`}>{post.author}</h3>
                        {post.verified && <BadgeCheck className="w-4 h-4 text-[var(--primary)]" fill="currentColor" stroke="var(--formfield)" />}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.isMe ? (
                          <span className={`flex items-center gap-1.5 text-[11px] font-medium border border-[var(--stroke)] rounded-full px-3 py-1 bg-[var(--background)] text-[var(--title)]`}>
                            <ImageIcon className="w-3 h-3"/> {post.photosCount} Photos
                          </span>
                        ) : (
                          <>
                            <button className="flex items-center gap-1 text-[11px] font-bold border border-[var(--primary-border)] text-[var(--primary)] rounded-full px-3 py-0.5 bg-[var(--primary-lite)] hover:opacity-80 transition-opacity">
                              <UserPlus className="w-3 h-3"/> Follow
                            </button>
                            {post.mentions && post.mentions.map((m, i) => (
                              <button key={i} className={`flex items-center gap-1 text-[11px] font-medium border border-[var(--stroke)] rounded-full px-3 py-0.5 bg-[var(--background)] text-[var(--subtitle)] hover:text-[var(--title)] transition-colors`}>
                                @ {m}
                              </button>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[12px] font-medium text-[var(--subtitle)] pt-1`}>{post.time}</span>
                </div>

                {/* Content Block with Vertical Line */}
                <div className={`ml-6 pl-5 border-l-[2px] border-[var(--stroke)] pb-2`}>
                  {/* Text Content */}
                  {post.content && (
                     <p className={`text-[14px] text-[var(--title)] leading-relaxed mb-5 pt-1`} style={{ opacity: 0.9 }}>
                      {post.content}
                    </p>
                  )}

                  {/* Template Card */}
                  {post.template && (
                    <div className={`bg-[var(--background)] border border-[var(--stroke)] rounded-xl p-4 mb-5 flex items-center justify-between hover:opacity-90 transition-opacity cursor-pointer group`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-[var(--overlay)] border border-[var(--stroke)] flex items-center justify-center transition-colors`}>
                          {post.template.icon}
                        </div>
                        <div>
                          <p className={`text-[11px] text-[var(--subtitle)] font-medium tracking-wide uppercase mb-0.5`}>Attached Template</p>
                          <h4 className={`font-bold text-[var(--title)] text-sm`}>{post.template.title}</h4>
                        </div>
                      </div>
                      <button className={`bg-[var(--overlay)] hover:bg-[var(--primary-lite)] text-[var(--title)] text-xs font-bold px-4 py-2 rounded-lg transition-colors`}>
                        View
                      </button>
                    </div>
                  )}

                  {/* Media Grid */}
                  {post.images && post.images.length > 0 && (
                    <div className={`grid ${post.images.length > 1 ? 'grid-cols-2 gap-2 h-[300px]' : 'grid-cols-1'} mb-5 rounded-xl overflow-hidden`}>
                      <img src={post.images[0]} className={`w-full object-cover hover:opacity-95 transition-opacity cursor-pointer ${post.images.length === 1 ? 'h-[300px]' : 'h-full'}`} alt="Post media 1" />
                      {post.images.length > 1 && (
                        <div className="grid grid-rows-2 gap-2">
                          <img src={post.images[1]} className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" alt="Post media 2" />
                          <img src={post.images[2]} className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" alt="Post media 3" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Post Footer / Actions (Now aligned to bottom of threaded line) */}
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop" className={`w-6 h-6 rounded-full border-2 border-[var(--formfield)] object-cover`} alt="cheer" />
                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop" className={`w-6 h-6 rounded-full border-2 border-[var(--formfield)] object-cover`} alt="cheer" />
                        <img src={post.avatar} className={`w-6 h-6 rounded-full border-2 border-[var(--formfield)] object-cover`} alt="cheer" />
                      </div>
                      <span className={`text-[12px] font-medium text-[var(--subtitle)]`}>{post.cheersCount}</span>
                    </div>
                    
                    <div className={`flex items-center gap-5 text-[var(--subtitle)]`}>
                      <Star className={`w-5 h-5 cursor-pointer transition-colors hover:text-[var(--primary)] ${post.isLiked ? 'text-[var(--primary)] fill-[var(--primary)]' : ''}`} />
                      <MessageSquare className={`w-5 h-5 cursor-pointer transition-colors hover:text-[var(--title)]`} />
                      <Bookmark className={`w-5 h-5 cursor-pointer transition-colors hover:text-[var(--title)]`} />
                      <Share className={`w-5 h-5 cursor-pointer transition-colors hover:text-[var(--title)]`} />
                      {post.isMe && (
                        <>
                          <Edit2 className={`w-4 h-4 cursor-pointer transition-colors hover:text-[var(--title)] ml-2`} />
                          <Trash2 className="w-4 h-4 cursor-pointer transition-colors text-red-500/80 hover:text-red-400" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Leaderboard */}
            <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-6`}>
              <div className="flex justify-between items-center mb-10">
                <h3 className={`text-sm font-bold text-[var(--title)] tracking-wider flex items-center gap-2`}>
                  <BarChart2 className={`w-5 h-5 text-[var(--subtitle)]`} /> LEADERBOARD
                </h3>
                <button className="text-[12px] font-bold text-[var(--primary)] bg-[var(--primary-lite)] hover:bg-[var(--primary-border)] transition-colors px-4 py-2 rounded-xl flex items-center gap-1.5">
                  See all <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              
              {/* Podium Visualization */}
              <div className="flex items-end justify-center h-[260px] gap-1.5 relative pb-2 mt-4 px-2">
                 
                 {/* Rank 2 */}
                 <div className="flex flex-col items-center w-[30%] relative hover:-translate-y-2 transition-transform cursor-pointer z-10">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-3 rounded-full bg-[#ffb5ae] relative z-10"></div>
                      <div className="w-3 h-3 rounded-full bg-[var(--primary)] -ml-1.5 relative z-0"></div>
                      <span className={`text-[13px] text-[var(--title)] ml-2 font-medium`}>6,500</span>
                    </div>
                    
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop" className={`w-[60px] h-[60px] rounded-full border-[3px] border-[var(--formfield)] object-cover z-20 -mb-6 shadow-md`} alt="Rank 2" />
                    
                    <div className="w-full h-[140px] bg-[#ffb5ae] rounded-tl-[40px] rounded-tr-[16px] rounded-b-[16px] flex flex-col items-center justify-center pt-8 relative">
                       <span className="text-[48px] font-black text-white leading-none tracking-tighter mb-1">2</span>
                       <span className="text-[14px] font-bold text-white mt-1">Camelia</span>
                    </div>
                 </div>
                 
                 {/* Rank 1 */}
                 <div className="flex flex-col items-center w-[40%] relative hover:-translate-y-2 transition-transform cursor-pointer z-20">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-3 rounded-full bg-[#ffb5ae] relative z-10"></div>
                      <div className="w-3 h-3 rounded-full bg-[var(--primary)] -ml-1.5 relative z-0"></div>
                      <span className={`text-[13px] text-[var(--title)] ml-2 font-medium`}>7,120</span>
                    </div>
                    
                    <div className="relative z-20 -mb-8">
                       <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop" className={`w-[72px] h-[72px] rounded-full border-[3px] border-[var(--formfield)] object-cover shadow-md`} alt="Rank 1" />
                       <svg className="absolute -top-1 -right-4 w-7 h-7 text-[var(--primary)] rotate-[20deg] drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
                    </div>
                    
                    <div className="w-full bg-[var(--primary-lite)] rounded-[24px] p-[6px] relative">
                       <div className="w-full h-[160px] bg-[var(--primary)] rounded-[18px] flex flex-col items-center justify-center pt-10 pb-2">
                          <span className="text-[60px] font-black text-[var(--background)] leading-none tracking-tighter mb-1">1</span>
                          <div className="flex flex-col items-center leading-tight">
                            <span className="text-[14px] font-bold text-[var(--background)]">Kareem</span>
                            <span className="text-[12px] font-bold text-[var(--background)]">(ME)</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Rank 3 */}
                 <div className="flex flex-col items-center w-[30%] relative hover:-translate-y-2 transition-transform cursor-pointer z-10">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-3 rounded-full bg-[#ffb5ae] relative z-10"></div>
                      <div className="w-3 h-3 rounded-full bg-[var(--primary)] -ml-1.5 relative z-0"></div>
                      <span className={`text-[13px] text-[var(--title)] ml-2 font-medium`}>4,800</span>
                    </div>
                    
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop" className={`w-[60px] h-[60px] rounded-full border-[3px] border-[var(--formfield)] object-cover z-20 -mb-6 shadow-md`} alt="Rank 3" />
                    
                    <div className="w-full h-[120px] bg-[#3cbdf6] rounded-tr-[40px] rounded-tl-[16px] rounded-b-[16px] flex flex-col items-center justify-center pt-6 relative">
                       <span className="text-[48px] font-black text-white leading-none tracking-tighter mb-1">3</span>
                       <span className="text-[14px] font-bold text-white mt-1">Wilson</span>
                    </div>
                 </div>
              </div>
            </div>

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

        </div>
      </div>

    </div>
  );
}
