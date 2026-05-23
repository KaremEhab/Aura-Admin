import React, { useState, useRef } from 'react';
import { 
  Image, Video, Smile, MapPin, Send, MessageSquare, 
  Heart, Share2, Flame, Trophy, Activity, Camera, 
  TrendingUp, MoreHorizontal, ArrowLeft, Users, 
  Calendar, ShoppingBag, Bookmark, Search, UserPlus, Plus
} from 'lucide-react';
import './AuraHub.css';

const mockPosts = [
  {
    id: 1,
    author: 'Camelia Jaison',
    role: 'Gold Member',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop',
    time: '2 hours ago',
    content: 'Finally hit my 100kg deadlift PR today! Huge thanks to Coach Ahmed for the programming. Next stop: 120kg! 🏋️‍♀️🔥',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop',
    workoutLog: {
      title: 'Heavy Lower Body',
      volume: '8,500 lbs',
      duration: '1h 15m'
    },
    likes: 245,
    comments: 18,
    isLiked: true
  },
  {
    id: 2,
    author: 'Coach Ahmed',
    role: 'Head Trainer',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop',
    time: '5 hours ago',
    content: 'Form Check Friday! Here is a quick breakdown of proper squat depth. Remember, mobility is key before loading the bar.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop',
    likes: 892,
    comments: 45,
    isLiked: false
  }
];

export function AuraHub({ onNavigate }) {
  const [postText, setPostText] = useState('');
  const [showFAB, setShowFAB] = useState(false);
  const feedRef = useRef(null);

  const handleScroll = () => {
    if (feedRef.current) {
      if (feedRef.current.scrollTop > 150) {
        setShowFAB(true);
      } else {
        setShowFAB(false);
      }
    }
  };

  const handleFABClick = () => {
    if (feedRef.current) {
      feedRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="aurahub-container animate-fade-in flex flex-col h-screen overflow-y-auto bg-background p-6 custom-scrollbar relative"
      ref={feedRef}
      onScroll={handleScroll}
    >
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('dashboard')} className="p-2 bg-sidebar border border-stroke rounded-xl text-subtitle hover:text-primary transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-title tracking-tight">Aura<span className="text-primary">Community</span></h1>
            <p className="text-xs font-bold text-subtitle uppercase tracking-widest mt-1">The Professional Gym Network</p>
          </div>
        </div>
        
        {/* Global Search */}
        <div className="hidden md:flex relative w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtitle" />
          <input 
            type="text" 
            placeholder="Search network..." 
            className="w-full bg-sidebar border border-stroke rounded-xl pl-10 pr-4 py-2 text-sm text-title focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Professional Composer (Above the 3 columns) */}
      <div className="bg-sidebar border border-stroke rounded-2xl p-4 shadow-lg mb-6 shrink-0 w-full animate-fade-in">
        <div className="flex gap-4 mb-4">
          <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop" alt="Profile" className="w-12 h-12 rounded-full object-cover shrink-0" />
          <textarea 
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's your fitness update?"
            className="w-full bg-background border border-stroke rounded-xl px-4 py-3 text-sm text-title font-medium focus:outline-none focus:border-primary resize-none h-14 hover:border-primary/50 transition-colors"
          ></textarea>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-stroke/50">
          <div className="flex gap-1 md:gap-4">
            <button className="flex items-center gap-2 p-2 rounded-lg text-subtitle hover:text-blue-500 hover:bg-blue-500/10 transition-colors text-xs font-bold">
              <Image size={16}/> <span className="hidden sm:inline">Photo</span>
            </button>
            <button className="flex items-center gap-2 p-2 rounded-lg text-subtitle hover:text-orange-500 hover:bg-orange-500/10 transition-colors text-xs font-bold">
              <Video size={16}/> <span className="hidden sm:inline">Video</span>
            </button>
            <button className="flex items-center gap-2 p-2 rounded-lg text-subtitle hover:text-primary hover:bg-primary/10 transition-colors text-xs font-bold">
              <Activity size={16}/> <span className="hidden sm:inline">Workout Log</span>
            </button>
          </div>
          <button className="flex items-center gap-2 bg-primary text-black px-6 py-2 rounded-lg text-sm font-black hover:scale-105 transition-transform shadow-[0_4px_15px_rgba(34,197,94,0.3)]">
            <Send size={14}/> Post
          </button>
        </div>
      </div>

      {/* 3-COLUMN PROFESSIONAL NETWORK GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* ================= LEFT COLUMN: Navigation & Profile (w-1/4 / col-span-3) ================= */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 sticky top-0 h-max pb-10">
          
          {/* Enhanced Profile Card */}
          <div className="bg-sidebar border border-stroke rounded-2xl relative overflow-hidden group shadow-lg">
            {/* Banner Background */}
            <div className="h-20 w-full bg-gradient-to-r from-primary/80 to-blue-600/80"></div>
            
            <div className="px-6 pb-6 relative flex flex-col items-center text-center mt-[-40px]">
              <img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop" 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover border-4 border-sidebar mb-3 shadow-[0_0_15px_rgba(34,197,94,0.2)]" 
              />
              <h3 className="text-lg font-black text-title">Kareem Ehab</h3>
              <p className="text-xs text-primary font-bold tracking-widest uppercase mb-4">Aura Master Elite</p>
              
              <div className="w-full text-left mb-4">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-subtitle">Next Tier</span>
                  <span className="text-primary">85%</span>
                </div>
                <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[85%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-2 border-t border-stroke pt-4">
                <div className="flex flex-col items-center hover:bg-background/50 rounded-lg p-2 cursor-pointer transition-colors">
                  <span className="text-lg font-black text-title">842</span>
                  <span className="text-[10px] text-subtitle uppercase font-bold">Connections</span>
                </div>
                <div className="flex flex-col items-center hover:bg-background/50 rounded-lg p-2 cursor-pointer transition-colors border-l border-stroke">
                  <span className="text-lg font-black text-title">12</span>
                  <span className="text-[10px] text-subtitle uppercase font-bold">Groups</span>
                </div>
              </div>
            </div>
          </div>

          {/* Facebook-style Navigation Menu */}
          <div className="bg-background border border-stroke rounded-2xl p-3 shadow-sm">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-sidebar text-subtitle hover:text-primary transition-all group">
              <Users size={20} className="group-hover:scale-110 transition-transform"/>
              <span className="text-sm font-bold">My Groups</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-sidebar text-subtitle hover:text-blue-400 transition-all group">
              <Calendar size={20} className="group-hover:scale-110 transition-transform"/>
              <span className="text-sm font-bold">Events</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-sidebar text-subtitle hover:text-yellow-500 transition-all group">
              <Bookmark size={20} className="group-hover:scale-110 transition-transform"/>
              <span className="text-sm font-bold">Saved Posts</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-sidebar text-subtitle hover:text-purple-400 transition-all group">
              <Activity size={20} className="group-hover:scale-110 transition-transform"/>
              <span className="text-sm font-bold">Find Partners</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-sidebar text-subtitle hover:text-orange-400 transition-all group">
              <ShoppingBag size={20} className="group-hover:scale-110 transition-transform"/>
              <span className="text-sm font-bold">Marketplace</span>
            </button>
          </div>

        </div>

        {/* ================= CENTER COLUMN: Composer & Feed (w-1/2 / col-span-6) ================= */}
        <div className="col-span-1 lg:col-span-6 flex flex-col gap-6 pb-20">
          
          {/* Feed Posts */}
          <div className="flex flex-col gap-6">
            {mockPosts.map((post) => (
              <div key={post.id} className="bg-background border border-stroke rounded-2xl overflow-hidden hover:border-stroke/80 transition-all duration-300 shadow-md hover:shadow-xl">
                
                {/* Post Header */}
                <div className="p-5 flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full object-cover border border-stroke" />
                    <div>
                      <h4 className="text-sm font-black text-title flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                        {post.author} 
                        {post.role === 'Head Trainer' && <span className="bg-blue-500/20 text-blue-500 border border-blue-500/30 text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Staff</span>}
                      </h4>
                      <p className="text-[11px] text-subtitle font-medium">{post.role} • {post.time}</p>
                    </div>
                  </div>
                  <button className="text-subtitle hover:text-title p-2 hover:bg-sidebar rounded-full transition-colors"><MoreHorizontal size={18}/></button>
                </div>

                {/* Post Content */}
                <div className="px-5 pb-4">
                  <p className="text-sm text-title/90 leading-relaxed font-medium">{post.content}</p>
                </div>

                {/* Optional Workout Attachment Card */}
                {post.workoutLog && (
                  <div className="mx-5 mb-4 p-4 border border-stroke bg-sidebar/50 rounded-xl flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Activity size={20} className="text-primary"/>
                      </div>
                      <div>
                        <h5 className="text-sm font-black text-title">{post.workoutLog.title}</h5>
                        <p className="text-xs text-subtitle font-bold mt-0.5">{post.workoutLog.volume} • {post.workoutLog.duration}</p>
                      </div>
                    </div>
                    <button className="text-primary text-xs font-black uppercase hover:underline">View Log</button>
                  </div>
                )}

                {/* Post Media (Premium Aspect Ratio) */}
                {post.image && (
                  <div className="w-full bg-black relative overflow-hidden max-h-[500px]">
                    <img src={post.image} alt="Post media" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity cursor-pointer" />
                  </div>
                )}

                {/* Engagement Metrics (Likes/Comments count) */}
                <div className="px-5 py-3 border-b border-stroke/50 flex justify-between items-center text-xs text-subtitle font-bold">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:underline">
                    <div className="bg-primary p-1 rounded-full"><Heart size={10} fill="black" stroke="black"/></div>
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="cursor-pointer hover:underline">{post.comments} Spots</span>
                    <span className="cursor-pointer hover:underline">12 Shares</span>
                  </div>
                </div>

                {/* Custom Terminology Action Buttons */}
                <div className="px-2 py-1 flex justify-between items-center bg-sidebar">
                  <button className={`flex-1 flex justify-center items-center gap-2 py-3 rounded-lg text-sm font-bold transition-colors ${post.isLiked ? 'text-primary bg-primary/5' : 'text-subtitle hover:bg-background hover:text-title'}`}>
                    <Heart size={20} fill={post.isLiked ? "currentColor" : "none"} /> 
                    Cheer
                  </button>
                  <button className="flex-1 flex justify-center items-center gap-2 py-3 rounded-lg text-sm font-bold text-subtitle hover:bg-background hover:text-title transition-colors">
                    <MessageSquare size={20} /> 
                    Spot
                  </button>
                  <button className="flex-1 flex justify-center items-center gap-2 py-3 rounded-lg text-sm font-bold text-subtitle hover:bg-background hover:text-title transition-colors">
                    <Share2 size={20} /> 
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Community & Discovery (w-1/4 / col-span-3) ================= */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 sticky top-0 h-max pb-10">
          
          {/* Upcoming Events */}
          <div className="bg-sidebar border border-stroke rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-bold text-title uppercase tracking-wider flex items-center gap-2">
                <Calendar size={14} className="text-blue-500"/> Upcoming Events
              </h4>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 group cursor-pointer hover:bg-background p-2 -mx-2 rounded-xl transition-colors">
                <div className="flex flex-col items-center justify-center bg-blue-500/10 text-blue-500 rounded-lg w-12 h-12 shrink-0 border border-blue-500/20">
                  <span className="text-[10px] font-black uppercase leading-none">Jun</span>
                  <span className="text-lg font-black leading-none mt-1">12</span>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-title group-hover:text-blue-400 transition-colors">Summer Shred Kickoff</h5>
                  <p className="text-xs text-subtitle mt-0.5">Smouha Branch • 6:00 PM</p>
                </div>
              </div>
              <div className="flex gap-3 group cursor-pointer hover:bg-background p-2 -mx-2 rounded-xl transition-colors">
                <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-lg w-12 h-12 shrink-0 border border-primary/20">
                  <span className="text-[10px] font-black uppercase leading-none">Jun</span>
                  <span className="text-lg font-black leading-none mt-1">15</span>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-title group-hover:text-primary transition-colors">Powerlifting Meetup</h5>
                  <p className="text-xs text-subtitle mt-0.5">Alexandria Branch • 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested Connections */}
          <div className="bg-sidebar border border-stroke rounded-2xl p-5 shadow-sm">
             <h4 className="text-xs font-bold text-title uppercase tracking-wider mb-4 flex items-center gap-2">
                <UserPlus size={14} className="text-primary"/> Suggested Partners
             </h4>
             <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                   <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop" className="w-10 h-10 rounded-full object-cover" alt="User" />
                   <div className="flex-1">
                      <h5 className="text-sm font-bold text-title cursor-pointer hover:underline">Tarek Hossam</h5>
                      <p className="text-[10px] text-subtitle">Powerlifter • Same Gym</p>
                   </div>
                   <button className="text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors border border-primary/20">
                     Connect
                   </button>
                </div>
                <div className="flex items-center gap-3">
                   <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop" className="w-10 h-10 rounded-full object-cover" alt="User" />
                   <div className="flex-1">
                      <h5 className="text-sm font-bold text-title cursor-pointer hover:underline">Mona Zaki</h5>
                      <p className="text-[10px] text-subtitle">Crossfit • Mutual Friends</p>
                   </div>
                   <button className="text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors border border-primary/20">
                     Connect
                   </button>
                </div>
             </div>
          </div>

          {/* Live Pulse Ticker */}
          <div className="bg-background border border-stroke rounded-2xl p-5">
            <h4 className="text-xs font-bold text-subtitle uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity size={14} className="text-primary animate-pulse"/> Live Gym Pulse
            </h4>
            
            <div className="flex flex-col gap-4 relative">
              <div className="absolute left-1.5 top-2 bottom-2 w-px bg-stroke"></div>
              
              <div className="relative pl-6">
                <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20"></div>
                <p className="text-xs text-title"><span className="font-bold hover:underline cursor-pointer">Marcus K.</span> checked into Smouha.</p>
                <span className="text-[10px] text-subtitle font-bold">2 mins ago</span>
              </div>
              <div className="relative pl-6">
                <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
                <p className="text-xs text-title"><span className="font-bold hover:underline cursor-pointer">Sarah L.</span> crushed a new PR!</p>
                <span className="text-[10px] text-subtitle font-bold">15 mins ago</span>
              </div>
              <div className="relative pl-6">
                <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-yellow-500 ring-4 ring-yellow-500/20"></div>
                <p className="text-xs text-title"><span className="font-bold hover:underline cursor-pointer">Coach Ali</span> published a class.</p>
                <span className="text-[10px] text-subtitle font-bold">1 hour ago</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Action Button - Fixed to viewport */}
      {showFAB && (
        <button 
          onClick={handleFABClick}
          className="fixed bottom-8 right-8 z-50 bg-primary text-black w-14 h-14 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-110 transition-transform flex items-center justify-center animate-fade-in"
          title="Create Post"
        >
          <Plus size={24} />
        </button>
      )}

    </div>
  );
}
