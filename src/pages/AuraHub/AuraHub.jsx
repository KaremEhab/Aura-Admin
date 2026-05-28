import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, RefreshCw, Moon, Sun, Bell, ChevronDown, ChevronUp,
  Home, Newspaper, Dumbbell, Users, Bookmark,
  Plus,
  Star, MessageCircle, Share, Edit2, Trash2,
  Image as ImageIcon, Activity, FileText, Droplet,
  Globe, UserPlus, BarChart2, ArrowRight,
  TrendingUp, TrendingDown, ChevronRight, CheckCircle2, BadgeCheck,
  Crown, X, ArrowLeft, Eye, Clock, PieChart, Info, PlayCircle, Timer, Apple, Trophy
} from 'lucide-react';
import { Header } from '../../components/layout/Header';

function AuraBottomNav({ activeTab, setActiveTab, setActivePostId, setShowLeaderboard, setActiveCollectionId }) {
  const handleNav = (tab) => {
    setActiveTab(tab);
    setActivePostId(null);
    setShowLeaderboard(false);
    if (setActiveCollectionId) setActiveCollectionId(null);
  };

  const getBtnClass = (tab) => {
    return activeTab === tab
      ? "flex flex-col items-center justify-center text-[var(--primary)] w-16 bg-[var(--primary-lite)] rounded-[18px] py-2 relative overflow-hidden transition-all"
      : "flex flex-col items-center justify-center text-[var(--subtitle)] hover:text-[var(--title)] w-16 py-2 transition-all";
  };

  return (
    <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[400px] bg-[var(--sidebar)] backdrop-blur-xl border border-[var(--stroke)] rounded-[24px] z-50 flex justify-between items-center px-1.5 py-1.5 shadow-2xl">
      <button onClick={() => handleNav('home')} className={getBtnClass('home')}>
        <Home className="w-[20px] h-[20px] mb-1" fill={activeTab === 'home' ? "currentColor" : "none"} />
        <span className="text-[9px] font-bold tracking-wide">HOME</span>
        {activeTab === 'home' && <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[var(--primary)]" />}
      </button>
      <button onClick={() => handleNav('news')} className={getBtnClass('news')}>
        <Newspaper className="w-[20px] h-[20px] mb-1" />
        <span className="text-[9px] font-medium tracking-wide">NEWS</span>
        {activeTab === 'news' && <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[var(--primary)]" />}
      </button>
      <button onClick={() => handleNav('gyms')} className={getBtnClass('gyms')}>
        <Dumbbell className="w-[20px] h-[20px] mb-1" />
        <span className="text-[9px] font-medium tracking-wide">GYMS</span>
        {activeTab === 'gyms' && <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[var(--primary)]" />}
      </button>
      <button onClick={() => handleNav('friends')} className={getBtnClass('friends')}>
        <Users className="w-[20px] h-[20px] mb-1" />
        <span className="text-[9px] font-medium tracking-wide">FRIENDS</span>
        {activeTab === 'friends' && <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[var(--primary)]" />}
      </button>
      <button onClick={() => handleNav('saved')} className={getBtnClass('saved')}>
        <Bookmark className="w-[20px] h-[20px] mb-1" fill={activeTab === 'saved' ? "currentColor" : "none"} />
        <span className="text-[9px] font-medium tracking-wide">SAVED</span>
        {activeTab === 'saved' && <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[var(--primary)]" />}
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

export const getDummyUser = (name) => {
  let avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop';
  if (name.includes('Wilson')) avatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop';
  if (name.includes('Sophia')) avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop';
  if (name.includes('Ethan')) avatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop';
  if (name.includes('Kareem')) avatar = 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop';
  
  return {
    author: name,
    avatar: avatar,
    isMe: name.includes('Kareem'),
    isFollowing: true,
    verified: false,
    job: name.includes('Kareem') ? 'Trainer' : (name.includes('Wilson') || name.includes('Camelia') ? 'Trainer' : 'Trainee')
  };
};

export const ProfileHoverCard = ({ user }) => (
  <div className="absolute top-full left-0 pt-3 z-[100] opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 scale-95 group-hover:scale-100 origin-top-left">
    <div className="w-72 bg-[var(--formfield)] border border-[var(--stroke)] rounded-2xl shadow-2xl p-5 cursor-default flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-start">
        <img src={user.avatar} className="w-16 h-16 rounded-full object-cover border-[3px] border-[var(--primary)] shadow-md" alt={user.author || user.name} />
        {user.isMe ? (
          <button className="px-4 py-1.5 bg-[var(--sidebar)] border border-[var(--stroke)] text-[var(--title)] text-xs font-bold rounded-full hover:bg-[var(--stroke)] transition-colors">
            Edit Profile
          </button>
        ) : (
          <button className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors ${
            user.isFollowing 
            ? 'bg-[var(--sidebar)] border border-[var(--stroke)] text-[var(--title)]' 
            : 'bg-[var(--primary)] text-[var(--background)] hover:opacity-90'
          }`}>
            {user.isFollowing ? 'Friends' : 'Follow'}
          </button>
        )}
      </div>

      <div>
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-lg text-[var(--title)]">{user.author || user.name}</h3>
          {user.verified && <BadgeCheck className="w-4 h-4 text-[var(--primary)]" fill="currentColor" stroke="var(--formfield)" />}
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--primary-lite)] text-[var(--primary)] tracking-wide ml-1">{user.job || 'Trainee'}</span>
        </div>
        <p className="text-sm text-[var(--subtitle)] mt-0.5">@{(user.author || user.name).toLowerCase().replace(/[^a-z0-9]/g, '').replace('me', '').replace(/[() ]/g, '')}</p>
      </div>

      <p className="text-sm text-[var(--title)] leading-relaxed opacity-90 text-left whitespace-normal font-normal">
        Passionate about fitness, health, and continuous self-improvement. Always striving for the next level. Let's grow together! 💪
      </p>

      <div className="flex items-center gap-6 mt-2 pt-4 border-t border-[var(--stroke)] border-opacity-50">
        <div className="flex flex-col items-start">
          <span className="text-base font-bold text-[var(--title)]">{user.isMe ? '12.4K' : '8.2K'}</span>
          <span className="text-[10px] text-[var(--subtitle)] uppercase tracking-wider font-semibold">Followers</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-base font-bold text-[var(--title)]">{user.isMe ? '842' : '1.1K'}</span>
          <span className="text-[10px] text-[var(--subtitle)] uppercase tracking-wider font-semibold">Following</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-base font-bold text-[var(--title)]">{user.isMe ? '156' : '93'}</span>
          <span className="text-[10px] text-[var(--subtitle)] uppercase tracking-wider font-semibold">Posts</span>
        </div>
      </div>
      
      {!user.isMe && (
        <div className="flex items-center gap-2 mt-1 w-full border-t border-[var(--stroke)] border-opacity-50 pt-4">
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[var(--sidebar)] border border-[var(--stroke)] rounded-xl text-[var(--title)] text-xs font-bold hover:bg-[var(--primary-lite)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all group/btn">
            <MessageCircle className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" /> Chat
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[var(--sidebar)] border border-[var(--stroke)] rounded-xl text-[var(--title)] text-xs font-bold hover:bg-[var(--primary-lite)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all group/btn">
            <Star className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" /> Cheer
          </button>
        </div>
      )}
    </div>
  </div>
);

const MentionBadge = ({ name, inText }) => (
  <span className={`relative group cursor-pointer inline-flex items-center gap-1 ${
    inText 
    ? 'text-[10px] border border-[var(--primary)] text-[var(--primary)] rounded-full px-2 py-0.5 bg-transparent translate-y-[-1px]' 
    : 'text-[10px] font-medium border border-[var(--stroke)] rounded-full px-3 py-0.5 bg-[var(--background)] text-[var(--subtitle)] hover:text-[var(--title)] transition-colors'
  }`}>
    @ {name}
    <ProfileHoverCard user={getDummyUser(name)} />
  </span>
);

const mockCollections = [
  { id: 'c1', name: 'Leg Day Workouts', coverImage: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=400&auto=format&fit=crop', itemsCount: 12 },
  { id: 'c2', name: 'Healthy Recipes', coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&auto=format&fit=crop', itemsCount: 8 },
  { id: 'c3', name: 'Motivation', coverImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&auto=format&fit=crop', itemsCount: 45 },
];

const mockPosts = [
  {
    id: 'mock-workout-1',
    author: 'Aura Coach',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop',
    time: 'Just now',
    content: "Just dropped a new Push Day routine! Let's get these gains! 💪🔥",
    cheersCount: '+1.2K Cheers',
    isLiked: false,
    template: {
      type: 'workout',
      title: 'Push Day Alpha',
      tier: 'Global',
      goal: '45 minutes',
      difficulty: 'Advanced',
      exercises: [
        { type: 'single', name: 'Barbell Back Squat', sets: '4', reps: '8-10', rest: '90s' },
        { type: 'superset', exercises: [
          { name: 'Deadlift', sets: '3', reps: '10' },
          { name: 'Romanian Deadlift', sets: '3', reps: '12' }
        ]},
        { type: 'single', name: 'Pull-Up', sets: '4', reps: 'Max', rest: '60s' },
        { type: 'single', name: 'Overhead Press', sets: '3', reps: '8-10', rest: '90s' },
        { type: 'dropset', exercises: [
          { name: 'Dumbbell Row', sets: '3', reps: '12-10-8', dropBy: '-20%', rpe: '10' }
        ]},
        { type: 'single', name: 'Plank', sets: '3', duration: '60s', rest: '45s' }
      ]
    }
  },
  {
    id: 'mock-nutrition-1',
    author: 'Aura Nutritionist',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop',
    time: '2 hours ago',
    content: "Here is your Lean Bulk Day 1 plan! High protein, balanced carbs. 🥗🍗",
    cheersCount: '+3.5K Cheers',
    isLiked: true,
    template: {
      type: 'nutrition',
      title: 'Lean Bulk - Day 1',
      calories: 2305,
      macros: { p: 180, c: 250, f: 65 },
      meals: [
        { name: 'Breakfast', items: [{ name: 'Oats (Raw)', amount: 100, unit: 'g' }, { name: 'Quinoa (Cooked)', amount: 120, unit: 'g' }, { name: 'Chia Seeds', amount: 30, unit: 'g' }] },
        { name: 'Lunch', items: [{ name: 'Chicken Breast', amount: 200, unit: 'g' }, { name: 'White Rice', amount: 150, unit: 'g' }] },
        { name: 'Dinner', items: [{ name: 'Grilled Salmon', amount: 180, unit: 'g' }, { name: 'Quinoa', amount: 120, unit: 'g' }] },
        { name: 'Snack', items: [{ name: 'Greek Yogurt', amount: 100, unit: 'g' }, { name: 'Mixed Berries', amount: 80, unit: 'g' }] }
      ]
    }
  },
  {
    id: 'mock-hydration-1',
    author: 'Aura Wellness',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop',
    time: '4 hours ago',
    content: "Stay hydrated out there! This is the optimal water intake schedule for active rest days. 💧",
    cheersCount: '+800 Cheers',
    isLiked: false,
    template: {
      type: 'hydration',
      title: 'Active Rest Day Hydration',
      target: '3.5L',
      intervals: [
        { time: 'Morning (Wake up)', amount: '500ml' },
        { time: 'Pre-workout', amount: '500ml' },
        { time: 'During workout', amount: '1L' },
        { time: 'Evening', amount: '1.5L' }
      ]
    }
  },
  {
    id: 1,
    author: 'Camelia Jaison',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop',
    time: '2 minutes',
    mentions: ['Wilson John'],
    content: <>Had a great workout at the GYM today. Was lovely to meet 🔥 <MentionBadge name="Wilson John" inText={true} /> He was lovely to work with and a good match.</>,
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
  },
  {
    id: 5,
    author: 'David Chen',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop',
    time: '25 minutes',
    content: <>Finally hit my new personal record on the deadlift today! 405 lbs went up smoother than expected. Big thanks to my coach for the programming. Next stop: 450 lbs! 🚀💪</>,
    cheersCount: '+1.2M Cheers',
    isLiked: false
  },
  {
    id: 6,
    author: 'Sarah Jenkins',
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
    time: '1 hour',
    photosCount: 2,
    images: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop'
    ],
    cheersCount: '+890K Cheers',
    isLiked: true
  },
  {
    id: 7,
    author: 'Kareem Ehab (ME)',
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop',
    time: '2 hours',
    content: <>Leg day absolutely destroyed me today. Walking up the stairs to my apartment feels like climbing Everest. Anyone have good recovery routines? 🍗♿</>,
    cheersCount: '+2.1M Cheers',
    isLiked: false,
    isMe: true
  },
  {
    id: 8,
    author: 'Elena Rodriguez',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop',
    time: '3 hours',
    photosCount: 1,
    images: [
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop'
    ],
    content: <>Post-workout meal prepped for the entire week! Consistency starts in the kitchen. Quinoa, grilled chicken, and roasted veggies. 🥗✨</>,
    cheersCount: '+3.5M Cheers',
    isLiked: true
  },
  {
    id: 9,
    author: 'Marcus Johnson',
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop',
    time: '4 hours',
    mentions: ['Sarah Jenkins'],
    content: <>Great sparring session today with <MentionBadge name="Sarah Jenkins" inText={true} />! You're getting way too fast with those combinations. Need to up my game before the tournament. 🥊🔥</>,
    cheersCount: '+450K Cheers',
    isLiked: false
  },
  {
    id: 10,
    author: 'Isabella Rossi',
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop',
    time: '5 hours',
    content: <>"Discipline is doing what you hate to do, but doing it like you love it." - Mike Tyson. Waking up at 5AM is tough, but the results are always worth it. Keep pushing everyone! 🌅💯</>,
    cheersCount: '+1.8M Cheers',
    isLiked: true
  },
  {
    id: 11,
    author: 'Alex Thorne',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop',
    time: '6 hours',
    photosCount: 1,
    images: [
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop'
    ],
    cheersCount: '+5.2M Cheers',
    isLiked: true
  },
  {
    id: 12,
    author: 'Kareem Ehab (ME)',
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop',
    time: '8 hours',
    content: <>Just dropped a new workout plan for my trainees. Focus this month is explosive power and core stability. Let's get to work! 📊📈</>,
    cheersCount: '+4.7M Cheers',
    isLiked: true,
    isMe: true
  }
];

const mockComments = [
  {
    id: 1,
    postId: 1,
    author: 'Wilson John',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
    time: '1m',
    content: 'Great session indeed! My legs are still burning. 🔥',
    likes: 12,
    replies: [
      {
        id: 101,
        author: 'Camelia Jaison',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop',
        time: 'Just now',
        content: 'Haha, wait until tomorrow! Make sure you stretch. 🧘‍♀️',
        likes: 5,
      }
    ]
  },
  {
    id: 2,
    postId: 1,
    author: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
    time: '5m',
    content: 'Awesome! Keep up the hard work guys! 💪',
    likes: 3,
    replies: []
  },
  {
    id: 3,
    postId: 11,
    author: 'Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop',
    time: '2h',
    content: 'This lighting is absolutely insane! The definition is crazy 🔥🔥',
    likes: 156,
    replies: [
      {
        id: 102,
        author: 'Alex Thorne',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop',
        time: '1h',
        content: 'Thanks Elena! It took about 30 minutes just to get the shadows right 😂',
        likes: 24,
      },
      {
        id: 103,
        author: 'Marcus Johnson',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop',
        time: '45m',
        content: 'Bro is majestic 🦅',
        likes: 8,
      }
    ]
  },
  {
    id: 4,
    postId: 12,
    author: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop',
    time: '3h',
    content: 'Coach, this new core routine is going to end me 😭 I tried the first circuit and I can barely laugh without pain.',
    likes: 45,
    replies: [
      {
        id: 104,
        author: 'Kareem Ehab (ME)',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop',
        time: '2h',
        content: 'No pain no gain! Make sure you\'re engaging your transversus abdominis on those roll-outs. You\'ll get used to it in a week! 💪',
        likes: 89,
      }
    ]
  },
  {
    id: 5,
    postId: 12,
    author: 'Wilson John',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
    time: '1h',
    content: 'Just printed the PDF! Excited to start this tomorrow morning. 📝',
    likes: 12,
    replies: []
  },
  {
    id: 6,
    postId: 9,
    author: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop',
    time: '2h',
    content: 'What gloves are those? Look like the new Hayabusa series.',
    likes: 7,
    replies: []
  },
  {
    id: 7,
    postId: 10,
    author: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop',
    time: '4h',
    content: 'Preach! Setting the alarm for 4:45AM tomorrow. Let\'s get it! 🌅',
    likes: 22,
    replies: []
  }
];

const StickySidebar = ({ children, className }) => {
  const [top, setTop] = useState(24);
  const ref = useRef(null);

  useEffect(() => {
    const updateTop = () => {
      if (ref.current) {
        const height = ref.current.getBoundingClientRect().height;
        const viewportHeight = window.innerHeight;
        
        // Find header height to add 20px space underneath it
        const headerEl = document.querySelector('header');
        const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 90;
        const targetTopOffset = headerHeight + 20;

        // Check if sidebar is taller than viewport (minus padding)
        if (height > viewportHeight - targetTopOffset - 24) {
          // Sticks so bottom of sidebar aligns with bottom of viewport + 24px padding
          setTop(viewportHeight - height - 24);
        } else {
          // Sticks to top with 20px space under header
          setTop(targetTopOffset);
        }
      }
    };
    
    // ResizeObserver tracks content changes
    const observer = new ResizeObserver(() => updateTop());
    if (ref.current) observer.observe(ref.current);
    
    window.addEventListener('resize', updateTop);
    updateTop();
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateTop);
    };
  }, []);

  return (
    <div className={className} style={{ position: 'sticky', top: `${top}px` }} ref={ref}>
      {children}
    </div>
  );
};

const WorkoutTemplateViewer = ({ template }) => {
  const [expanded, setExpanded] = useState(false);
  const displayExercises = expanded ? template.exercises : template.exercises.slice(0, 1);

  const renderMetricsBoxes = (ex, themePrefix) => {
    const isTinted = !!themePrefix;
    const bgClass = isTinted ? `bg-[var(--${themePrefix}-lite)]` : 'bg-[var(--formfield)]';
    const borderClass = isTinted ? `border-[var(--${themePrefix}-border)]` : 'border-[var(--stroke)]';
    const labelClass = isTinted ? `text-[var(--${themePrefix})] opacity-80` : 'text-[var(--subtitle)]';
    const valueClass = 'text-[var(--title)]';

    return (
      <div className="flex gap-2 text-[13px] overflow-x-auto w-full pb-1" style={{ scrollbarWidth: 'none' }}>
        {ex.sets && (
          <div className={`flex-1 min-w-[70px] ${bgClass} border ${borderClass} rounded-lg p-2.5 flex flex-col gap-1.5`}>
            <span className={`${labelClass} text-[10px] tracking-wider font-bold uppercase`}>Sets</span>
            <span className={`font-medium ${valueClass}`}>{ex.sets}</span>
          </div>
        )}
        {ex.reps && (
          <div className={`flex-1 min-w-[70px] ${bgClass} border ${borderClass} rounded-lg p-2.5 flex flex-col gap-1.5`}>
            <span className={`${labelClass} text-[10px] tracking-wider font-bold uppercase`}>Reps</span>
            <span className={`font-medium ${valueClass}`}>{ex.reps}</span>
          </div>
        )}
        {ex.duration && (
          <div className={`flex-1 min-w-[70px] ${bgClass} border ${borderClass} rounded-lg p-2.5 flex flex-col gap-1.5`}>
            <span className={`${labelClass} text-[10px] tracking-wider font-bold uppercase`}>Duration</span>
            <span className={`font-medium ${valueClass}`}>{ex.duration}</span>
          </div>
        )}
        {ex.rest && (
          <div className={`flex-1 min-w-[70px] ${bgClass} border ${borderClass} rounded-lg p-2.5 flex flex-col gap-1.5`}>
            <span className={`${labelClass} text-[10px] tracking-wider font-bold uppercase`}>Rest</span>
            <span className={`font-medium ${valueClass}`}>{ex.rest}</span>
          </div>
        )}
        {ex.dropBy && (
          <div className={`flex-1 min-w-[70px] ${bgClass} border ${borderClass} rounded-lg p-2.5 flex flex-col gap-1.5`}>
            <span className={`${labelClass} text-[10px] tracking-wider font-bold uppercase`}>Drop by</span>
            <span className={`font-medium ${valueClass}`}>{ex.dropBy}</span>
          </div>
        )}
        {ex.rpe && (
          <div className={`flex-1 min-w-[70px] bg-[var(--alert-lite)] border border-[var(--alert-border)] rounded-lg p-2.5 flex flex-col gap-1.5`}>
            <span className={`text-[var(--alert)] opacity-80 text-[10px] tracking-wider font-bold uppercase`}>RPE</span>
            <span className={`font-medium text-[var(--alert)]`}>{ex.rpe}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-4 bg-[var(--background)] border border-[var(--stroke)] rounded-2xl overflow-hidden flex flex-col font-sans mb-2">
      <div className="p-5 flex justify-between items-start">
        <div className="flex gap-4">
          <Dumbbell className="w-7 h-7 text-[var(--title)] mt-0.5" strokeWidth={1.5} />
          <div>
            <h4 className="font-medium text-[var(--title)] text-[16px] mb-2.5 tracking-wide">{template.title}</h4>
            <div className="flex gap-2 text-[12px] font-medium text-[var(--title)]">
              <span className="bg-[var(--background)] border border-[var(--stroke)] px-3.5 py-1.5 rounded-lg">{template.difficulty}</span>
              <span className="bg-[var(--background)] border border-[var(--stroke)] px-3.5 py-1.5 rounded-lg">{template.goal}</span>
            </div>
          </div>
        </div>
        <div className="bg-[var(--sidebar)] border border-[var(--primary)] text-[var(--primary)] px-4 py-2.5 rounded-lg text-[12px] font-medium tracking-wide">
          {template.exercises.length} EXERCISES
        </div>
      </div>

      <div className="bg-[var(--sidebar)] p-4 flex flex-col gap-3 relative min-h-[120px]">
        {displayExercises.map((ex, i) => {
          if (ex.type === 'single') {
            return (
              <div key={i} className="bg-[var(--background)] rounded-xl p-4 border border-[var(--stroke)]">
                <h5 className="text-[var(--primary)] text-[13px] font-medium mb-3">{ex.name}</h5>
                {renderMetricsBoxes(ex, null)}
              </div>
            );
          } else if (ex.type === 'superset') {
            return (
              <div key={i} className="bg-[var(--primary-lite)] border border-[var(--primary-border)] rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-[var(--primary)] text-[13px] font-medium">Superset</h5>
                  <span className="text-[var(--primary)] opacity-80 text-[11px] font-medium">({ex.exercises?.length || 0} Exercises)</span>
                </div>
                <div className="flex flex-col gap-4">
                  {ex.exercises?.map((sub, j) => (
                    <div key={j} className="flex flex-col gap-2">
                      <span className="text-[var(--subtitle)] text-[12px] font-medium">{sub.name}</span>
                      {renderMetricsBoxes(sub, 'primary')}
                    </div>
                  ))}
                </div>
              </div>
            );
          } else if (ex.type === 'dropset') {
            return (
              <div key={i} className="bg-[var(--secondary-lite)] border border-[var(--secondary-border)] rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-[var(--secondary)] text-[13px] font-medium">Dropset</h5>
                  <span className="text-[var(--secondary)] opacity-80 text-[11px] font-medium">({ex.exercises?.length || 0} Exercises)</span>
                </div>
                <div className="flex flex-col gap-4">
                  {ex.exercises?.map((sub, j) => (
                    <div key={j} className="flex flex-col gap-2">
                      <span className="text-[var(--subtitle)] text-[12px] font-medium">{sub.name}</span>
                      {renderMetricsBoxes(sub, 'secondary')}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}

        {!expanded && template.exercises.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--sidebar)] via-[var(--sidebar)]/80 to-transparent flex items-end justify-center pb-4 rounded-b-xl pointer-events-none">
            <button 
              onClick={(e) => { e.stopPropagation(); setExpanded(true); }} 
              className="pointer-events-auto bg-[var(--background)]/95 border border-[var(--primary)]/60 text-[var(--primary)] px-6 py-2 rounded-full text-[12px] font-medium flex items-center gap-1.5 backdrop-blur-md hover:bg-[var(--background)] transition-colors"
            >
              See more <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {expanded && template.exercises.length > 1 && (
          <div className="flex items-center justify-center pt-2">
            <button 
              onClick={(e) => { e.stopPropagation(); setExpanded(false); }} 
              className="bg-[var(--background)]/95 border border-[var(--primary)]/60 text-[var(--primary)] px-6 py-2 rounded-full text-[12px] font-medium flex items-center gap-1.5 backdrop-blur-md hover:bg-[var(--background)] transition-colors"
            >
              See less <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="p-4 bg-[var(--background)] border-t border-[var(--stroke)]">
        <button className="w-full bg-[var(--primary)] hover:opacity-90 text-[var(--background)] font-bold py-3.5 rounded-xl text-[14px] transition-opacity active:scale-[0.98]">
          Save Plan
        </button>
      </div>
    </div>
  );
};

const NutritionTemplateViewer = ({ template }) => {
  const [expanded, setExpanded] = useState(false);
  const displayMeals = expanded ? template.meals : template.meals.slice(0, 2);

  return (
    <div className="mt-4 bg-[var(--background)] border border-[var(--stroke)] rounded-2xl overflow-hidden flex flex-col font-sans mb-2">
      <div className="p-5 flex justify-between items-start">
        <div className="flex gap-4">
          <Apple className="w-7 h-7 text-[var(--title)] mt-0.5" strokeWidth={1.5} />
          <div>
            <h4 className="font-medium text-[var(--title)] text-[16px] mb-2.5 tracking-wide">{template.title}</h4>
            <div className="flex gap-2 text-[12px] font-medium text-[var(--title)]">
              <span className="bg-[var(--background)] border border-[var(--stroke)] px-3.5 py-1.5 rounded-lg">P {template.macros.p}</span>
              <span className="bg-[var(--background)] border border-[var(--stroke)] px-3.5 py-1.5 rounded-lg">C {template.macros.c}</span>
              <span className="bg-[var(--background)] border border-[var(--stroke)] px-3.5 py-1.5 rounded-lg">F {template.macros.f}</span>
            </div>
          </div>
        </div>
        <div className="bg-[var(--sidebar)] border border-[var(--primary)] text-[var(--primary)] px-4 py-2.5 rounded-lg text-[12px] font-medium tracking-wide">
          KCAL {template.calories}
        </div>
      </div>

      <div className="bg-[var(--sidebar)] p-4 flex flex-col gap-3 relative min-h-[120px]">
        {displayMeals.map((meal, i) => (
          <div key={i} className="bg-[var(--background)] rounded-xl p-4 border border-[var(--stroke)]">
            <h5 className="text-[var(--primary)] text-[13px] font-medium mb-3.5">{meal.name}</h5>
            <div className="flex flex-col gap-2.5">
              {meal.items.map((item, j) => (
                <div key={j} className="flex justify-between items-center text-[13px] text-[var(--title)]">
                  <span>{item.name}</span>
                  <span className="font-medium text-[var(--title)]">{item.amount}{item.unit}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {!expanded && template.meals.length > 2 && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--sidebar)] via-[var(--sidebar)]/80 to-transparent flex items-end justify-center pb-4 rounded-b-xl pointer-events-none">
            <button 
              onClick={(e) => { e.stopPropagation(); setExpanded(true); }} 
              className="pointer-events-auto bg-[var(--background)]/95 border border-[var(--primary)]/60 text-[var(--primary)] px-6 py-2 rounded-full text-[12px] font-medium flex items-center gap-1.5 backdrop-blur-md hover:bg-[var(--background)] transition-colors"
            >
              See more <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {expanded && template.meals.length > 2 && (
          <div className="flex items-center justify-center pt-2">
            <button 
              onClick={(e) => { e.stopPropagation(); setExpanded(false); }} 
              className="bg-[var(--background)]/95 border border-[var(--primary)]/60 text-[var(--primary)] px-6 py-2 rounded-full text-[12px] font-medium flex items-center gap-1.5 backdrop-blur-md hover:bg-[var(--background)] transition-colors"
            >
              See less <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="p-4 bg-[var(--background)] border-t border-[var(--stroke)]">
        <button className="w-full bg-[var(--primary)] hover:opacity-90 text-[var(--background)] font-bold py-3.5 rounded-xl text-[14px] transition-opacity active:scale-[0.98]">
          Save Plan
        </button>
      </div>
    </div>
  );
};

const HydrationTemplateViewer = ({ template }) => (
  <div className="mt-3 bg-[var(--background)] border border-[var(--stroke)] rounded-xl overflow-hidden">
    <div className="p-4 border-b border-[var(--stroke)] bg-[var(--sidebar)] flex justify-between items-center">
      <div>
        <h4 className="font-bold text-[15px] flex items-center gap-2"><Droplet className="w-4 h-4 text-[#3cbdf6]" fill="currentColor" /> {template.title}</h4>
      </div>
      <div className="text-[13px] font-black text-[#3cbdf6] bg-[#3cbdf6]/10 px-3 py-1 rounded-lg border border-[#3cbdf6]/20">
        Target: {template.target}
      </div>
    </div>
    <div className="p-4 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
      {template.intervals.map((interval, i) => (
        <div key={i} className="min-w-[120px] bg-[var(--formfield)] border border-[var(--stroke)] p-3 rounded-xl flex flex-col items-center justify-center text-center gap-1.5">
          <Clock className="w-5 h-5 text-[var(--subtitle)]" />
          <span className="text-[10px] font-bold text-[var(--subtitle)] uppercase tracking-wider">{interval.time}</span>
          <span className="text-[14px] font-black text-[#3cbdf6]">{interval.amount}</span>
        </div>
      ))}
    </div>
  </div>
);

const PostItem = ({ 
  post, 
  editingPostId, 
  editContent, 
  setEditContent, 
  setEditingPostId, 
  handleSaveEdit, 
  handleDeletePost, 
  handleToggleLike, 
  handleToggleFollow,
  handleToggleSave,
  onCommentClick,
  isDetailsMode = false
}) => (
  <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-5 sm:p-6 mb-6`}>
    <div className="flex justify-between items-start mb-3">
      <div className="flex gap-3 w-full items-start">
        <div className="relative group cursor-pointer shrink-0 h-max">
          <img src={post.avatar} className={`w-10 h-10 rounded-full object-cover border border-[var(--stroke)] transition-transform group-hover:scale-105`} alt={post.author} />
          <ProfileHoverCard user={post} />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 relative group cursor-pointer">
              <h3 className={`font-bold text-[14px] text-[var(--title)] group-hover:underline decoration-[var(--primary)] underline-offset-2 transition-all`}>{post.author}</h3>
              {post.verified && <BadgeCheck className="w-4 h-4 text-[var(--primary)]" fill="currentColor" stroke="var(--formfield)" />}
              <ProfileHoverCard user={post} />
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className={`text-[11px] font-medium text-[var(--title)]`}>{post.time}</span>
              {post.isMe && (
                <div className="flex items-center gap-3">
                  <Edit2 
                    onClick={() => handleEditPost(post.id, post.content)} 
                    className="w-3.5 h-3.5 cursor-pointer text-[var(--subtitle)] hover:text-[var(--title)] transition-colors" 
                  />
                  <Trash2 
                    onClick={() => handleDeletePost(post.id)}
                    className="w-3.5 h-3.5 cursor-pointer text-red-500/80 hover:text-red-400 transition-colors" 
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-1.5">
            {post.isMe ? (
              <span className={`flex items-center gap-1.5 text-[10px] font-medium border border-[var(--stroke)] rounded-full px-2.5 py-0.5 bg-[var(--background)] text-[var(--title)]`}>
                <ImageIcon className="w-3 h-3"/> {post.photosCount || 0} Photos
              </span>
            ) : (
              <>
                <button 
                  onClick={() => handleToggleFollow(post.id)}
                  className={`flex items-center gap-1 text-[10px] font-bold border rounded-full px-3 py-0.5 transition-opacity ${
                    post.isFollowing 
                    ? 'bg-[var(--sidebar)] border-[var(--stroke)] text-[var(--title)]' 
                    : 'bg-transparent border-[var(--primary)] text-[var(--primary)] hover:opacity-80'
                  }`}
                >
                  {post.isFollowing ? <CheckCircle2 className="w-3 h-3"/> : <UserPlus className="w-3 h-3"/>}
                  {post.isFollowing ? 'Friends' : 'Follow'}
                </button>
                {post.mentions && post.mentions.map((m, i) => (
                  <MentionBadge key={i} name={m} inText={false} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>

    <div className="mt-1 ml-[20px] pl-[16px] sm:ml-[20px] sm:pl-[20px] border-l-[2px] border-[var(--stroke)] border-opacity-50">
      {editingPostId === post.id ? (
        <div className="mb-4">
          <textarea
            className="w-full bg-[var(--background)] border border-[var(--stroke)] rounded-xl p-3 resize-none outline-none text-sm text-[var(--title)] mt-2"
            rows={3}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className="flex gap-2 justify-end mt-2">
            <button onClick={() => setEditingPostId(null)} className="px-3 py-1 text-xs font-bold text-[var(--title)] border border-[var(--stroke)] rounded-lg hover:bg-[var(--sidebar)] transition-colors">Cancel</button>
            <button onClick={() => handleSaveEdit(post.id)} className="px-3 py-1 text-xs font-bold text-[var(--background)] bg-[var(--primary)] rounded-lg hover:opacity-90 transition-opacity">Save</button>
          </div>
        </div>
      ) : post.content && (
          <p className="text-[13px] sm:text-[14px] text-[var(--title)] leading-relaxed mb-4 opacity-90 whitespace-pre-wrap">
          {post.content}
        </p>
      )}

      {post.template && post.template.type === 'workout' && <WorkoutTemplateViewer template={post.template} />}
      {post.template && post.template.type === 'nutrition' && <NutritionTemplateViewer template={post.template} />}
      {post.template && post.template.type === 'hydration' && <HydrationTemplateViewer template={post.template} />}

      {post.images && post.images.length > 0 && (
        <div className={`mt-4 mb-5 ${isDetailsMode && post.images.length > 1 ? '' : 'rounded-xl overflow-hidden border border-[var(--stroke)]'}`}>
          {post.images.length === 1 && (
            <img src={post.images[0]} className="w-full h-auto max-h-[300px] object-cover hover:opacity-95 transition-opacity cursor-pointer" alt="Post media" />
          )}
          {post.images.length > 1 && isDetailsMode && (
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 pb-4 -ml-[76px] -mr-[40px] sm:-ml-[88px] sm:-mr-[48px] px-[92px] sm:px-[108px]" style={{ scrollbarWidth: 'none' }}>
              {post.images.map((img, idx) => (
                <img key={idx} src={img} className="shrink-0 w-[85%] sm:w-[70%] h-[320px] sm:h-[400px] object-cover rounded-2xl snap-center hover:opacity-95 transition-opacity cursor-pointer shadow-lg border border-[var(--stroke)]" alt={`Post media ${idx+1}`} />
              ))}
            </div>
          )}
          {post.images.length === 2 && !isDetailsMode && (
            <div className="flex w-full h-[200px]">
              <img src={post.images[0]} className="w-1/2 h-full object-cover border-r border-[var(--stroke)] hover:opacity-95 transition-opacity cursor-pointer" alt="Post media 1" />
              <img src={post.images[1]} className="w-1/2 h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" alt="Post media 2" />
            </div>
          )}
          {post.images.length >= 3 && !isDetailsMode && (
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

      <div className="flex justify-between items-center mt-3 pt-2">
        <div className="flex items-center gap-2 relative group cursor-pointer">
          <div className="flex -space-x-2">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop" className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[var(--formfield)] object-cover`} alt="cheer" />
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop" className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[var(--formfield)] object-cover`} alt="cheer" />
          </div>
          <span className={`text-[11px] sm:text-[12px] font-medium text-[var(--title)] opacity-80 group-hover:text-[var(--primary)] transition-colors`}>{post.cheersCount}</span>
        </div>
        
        <div className={`flex items-center gap-3 sm:gap-4 text-[var(--title)] opacity-70`}>
          <Star 
            onClick={() => handleToggleLike(post.id)}
            className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-[var(--primary)] hover:opacity-100 ${post.isLiked ? 'text-[var(--primary)] fill-[var(--primary)] opacity-100 scale-110' : ''}`} 
          />
          <MessageCircle onClick={() => onCommentClick(post.id)} className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-[var(--title)] hover:opacity-100`} />
          <Bookmark onClick={() => handleToggleSave?.(post.id)} className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-[var(--title)] hover:opacity-100 ${post.isSaved ? 'text-[var(--primary)] fill-[var(--primary)] opacity-100 scale-110' : ''}`} />
          <Share className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-[var(--title)] hover:opacity-100`} />
        </div>
      </div>
    </div>
  </div>
);

const CommentsFeed = ({ post, onBack, renderPostProps }) => {
  const [replyText, setReplyText] = useState('');
  const comments = mockComments.filter(c => c.postId === post?.id) || mockComments;

  return (
    <div className="flex flex-col h-full lg:min-h-0 pb-[80px] lg:pb-0 relative animate-fade-in">
      <div className="sticky top-0 z-50 bg-[var(--background)]/95 backdrop-blur-md px-3 sm:px-4 py-3.5 flex items-center justify-between mb-4 border-b border-[var(--stroke)] shadow-sm">
        <div className="flex items-center gap-1.5 text-[12px] font-bold text-[var(--subtitle)] uppercase tracking-wider">
           <span className="cursor-pointer hover:text-[var(--primary)] transition-colors" onClick={onBack}>AuraHub</span> 
           <span>/</span> 
           <span className="text-[var(--title)]">Thread</span>
        </div>
        <div className="text-[11px] sm:text-[12px] font-bold text-[var(--subtitle)] bg-[var(--formfield)] border border-[var(--stroke)] px-3 py-1 rounded-full shadow-sm">
          <span className="text-[var(--title)]">{comments.length}</span> Comments
        </div>
      </div>

      <div className="-mt-1 border-none shadow-none m-0">
        <PostItem post={post} {...renderPostProps} isDetailsMode={true} />
      </div>

      {/* Desktop Composer */}
      <div className="hidden lg:flex p-5 border border-[var(--stroke)] bg-[var(--formfield)] gap-3 rounded-[20px] mb-6 shadow-sm relative overflow-hidden">
         <div className="absolute top-0 left-0 w-1 h-full bg-[var(--primary)]"></div>
         <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop" className="w-10 h-10 rounded-full object-cover shrink-0 border border-[var(--stroke)]" alt="me"/>
         <div className="flex-1 flex flex-col">
           <textarea 
             placeholder={`Reply to ${post?.author}...`}
             className="w-full bg-transparent resize-none outline-none text-sm text-[var(--title)] placeholder-[var(--subtitle)] mt-2 min-h-[40px]"
             value={replyText}
             onChange={e => setReplyText(e.target.value)}
           />
           <div className="flex justify-between items-center mt-2 pt-2 border-t border-[var(--stroke)] border-opacity-50">
              <button className="p-2 -ml-2 rounded-full hover:bg-[var(--primary-lite)] text-[var(--primary)] transition-colors">
                 <ImageIcon className="w-4 h-4" />
              </button>
              <button className="px-5 py-1.5 bg-[var(--primary)] text-[var(--background)] text-[12px] font-bold rounded-full hover:opacity-90 transition-opacity disabled:opacity-50" disabled={!replyText.trim()}>
                Reply
              </button>
           </div>
         </div>
      </div>

      <div className="flex flex-col gap-4">
        {comments.map(comment => (
          <div key={comment.id} className="p-5 border border-[var(--stroke)] bg-[var(--formfield)] rounded-[20px] shadow-sm">
             <div className="flex gap-3">
               <div className="flex flex-col items-center">
                 <img src={comment.avatar} className="w-10 h-10 rounded-full object-cover shrink-0 z-10 border border-[var(--stroke)]" alt="avatar" />
                 {comment.replies?.length > 0 && (
                   <div className="w-[2px] bg-[var(--stroke)] flex-1 my-1 opacity-50"></div>
                 )}
               </div>
               <div className="flex-1 pb-2">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-1.5">
                     <h3 className="font-bold text-[14px] text-[var(--title)] hover:underline cursor-pointer">{comment.author}</h3>
                   </div>
                   <span className="text-[11px] font-medium text-[var(--subtitle)] bg-[var(--background)] px-2 py-0.5 rounded-md border border-[var(--stroke)]">{comment.time}</span>
                 </div>
                 <p className="text-[14px] text-[var(--title)] mt-1.5 opacity-90 leading-relaxed">{comment.content}</p>
                 <div className="flex items-center gap-4 mt-3">
                   <button className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--subtitle)] hover:text-[#ef4444] transition-colors">
                     <Star className="w-4 h-4" /> {comment.likes || ''}
                   </button>
                   <button className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--subtitle)] hover:text-[var(--primary)] transition-colors">
                     <MessageCircle className="w-4 h-4" /> Reply
                   </button>
                 </div>
               </div>
             </div>

             {comment.replies?.map(reply => (
               <div key={reply.id} className="flex gap-3 mt-4 relative">
                 <div className="absolute top-0 bottom-0 left-[19px] w-[2px] bg-[var(--stroke)] -z-10 -mt-4 opacity-50"></div>
                 <div className="w-10 flex justify-center shrink-0 relative">
                   <div className="absolute top-4 right-0 w-4 h-[2px] bg-[var(--stroke)] opacity-50"></div>
                 </div>
                 <img src={reply.avatar} className="w-8 h-8 rounded-full object-cover shrink-0 z-10 border border-[var(--stroke)]" alt="avatar" />
                 <div className="flex-1 pb-2">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-1.5">
                       <h3 className="font-bold text-[13px] text-[var(--title)] hover:underline cursor-pointer">{reply.author}</h3>
                     </div>
                     <span className="text-[11px] font-medium text-[var(--subtitle)]">{reply.time}</span>
                   </div>
                   <p className="text-[13px] text-[var(--title)] mt-1 opacity-90 leading-relaxed">{reply.content}</p>
                   <div className="flex items-center gap-4 mt-2">
                     <button className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--subtitle)] hover:text-[#ef4444] transition-colors">
                       <Star className="w-3.5 h-3.5" /> {reply.likes || ''}
                     </button>
                     <button className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--subtitle)] hover:text-[var(--primary)] transition-colors">
                       <MessageCircle className="w-3.5 h-3.5" /> Reply
                     </button>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        ))}
        {comments.length === 0 && (
           <div className="p-10 text-center text-[var(--subtitle)] font-medium bg-[var(--formfield)] rounded-[20px] border border-[var(--stroke)] shadow-sm border-dashed">
             No comments yet. Be the first to reply!
           </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Composer */}
      <div className="lg:hidden fixed bottom-[15px] left-0 right-0 p-3 bg-[var(--background)]/90 backdrop-blur-xl border-t border-[var(--stroke)] z-[100] shadow-[0_-8px_16px_rgba(0,0,0,0.1)]">
         <div className="flex items-center gap-3 bg-[var(--formfield)] border border-[var(--stroke)] rounded-full px-4 py-2 shadow-inner">
            <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop" className="w-7 h-7 rounded-full object-cover shrink-0 border border-[var(--stroke)]" alt="me"/>
            <input 
              type="text"
              placeholder={`Reply to ${post?.author}...`}
              className="w-full bg-transparent outline-none text-sm text-[var(--title)] placeholder-[var(--subtitle)]"
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
            />
            {replyText.trim() ? (
              <button className="text-[var(--background)] bg-[var(--primary)] px-3 py-1 rounded-full font-bold text-xs shrink-0 shadow-sm hover:opacity-90">Send</button>
            ) : (
              <button className="text-[var(--subtitle)] hover:text-[var(--title)] shrink-0 transition-colors p-1 rounded-full hover:bg-[var(--sidebar)]">
                <ImageIcon className="w-4 h-4" />
              </button>
            )}
         </div>
      </div>
    </div>
  );
};

const LeaderboardFeed = ({ onBack }) => {
  const fullLeaderboard = [
    { rank: 1, name: 'Kareem Ehab (ME)', gym: 'AURA HUB', points: '7,120', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop', trend: 'up', trendValue: '+2', streak: '37 🔥', workouts: 142 },
    { rank: 2, name: 'Camelia Jaison', gym: 'CEASERS GYM', points: '6,500', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop', trend: 'same', trendValue: '-', streak: '21 🔥', workouts: 98 },
    { rank: 3, name: 'Wilson', gym: 'IRONCLAD FITNESS', points: '4,800', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop', trend: 'up', trendValue: '+1', streak: '14 🔥', workouts: 76 },
    { rank: 4, name: 'Rafael Kim', gym: 'IRONCLAD FITNESS', points: '4,250', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop', trend: 'down', trendValue: '-2', streak: '5 🔥', workouts: 65 },
    { rank: 5, name: 'Sophia Lee', gym: 'VITALITY HUB', points: '3,980', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop', trend: 'up', trendValue: '+4', streak: '18 🔥', workouts: 61 },
    { rank: 6, name: 'Mateo Rivera', gym: 'PRIMAL STRENGTH', points: '3,800', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop', trend: 'same', trendValue: '-', streak: '7 🔥', workouts: 59 },
    { rank: 7, name: 'Ayesha Malik', gym: 'ZENITH WELLNESS', points: '3,450', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop', trend: 'down', trendValue: '-1', streak: '12 🔥', workouts: 52 },
    { rank: 8, name: 'David Chen', gym: 'AURA HUB', points: '3,100', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop', trend: 'up', trendValue: '+5', streak: '9 🔥', workouts: 45 },
    { rank: 9, name: 'Emma Wilson', gym: 'CEASERS GYM', points: '2,950', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop', trend: 'down', trendValue: '-3', streak: '4 🔥', workouts: 41 },
    { rank: 10, name: 'Lucas Silva', gym: 'VITALITY HUB', points: '2,800', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop', trend: 'same', trendValue: '-', streak: '2 🔥', workouts: 38 }
  ];

  return (
    <div className="flex flex-col h-full lg:min-h-0 pb-[80px] lg:pb-0 relative animate-fade-in">
      <div className="sticky top-0 z-50 bg-[var(--background)]/95 backdrop-blur-md px-3 sm:px-4 py-3.5 flex items-center justify-between mb-4 border-b border-[var(--stroke)] shadow-sm">
        <div className="flex items-center gap-1.5 text-[12px] font-bold text-[var(--subtitle)] uppercase tracking-wider">
           <span className="cursor-pointer hover:text-[var(--primary)] transition-colors" onClick={onBack}>AuraHub</span> 
           <span>/</span> 
           <span className="text-[var(--title)]">Leaderboard</span>
        </div>
        <div className="text-[11px] sm:text-[12px] font-bold text-[var(--subtitle)] bg-[var(--formfield)] border border-[var(--stroke)] px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
          <BarChart2 className="w-3.5 h-3.5 text-[var(--primary)]" /> Global Rank
        </div>
      </div>

      <div className="bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-5 sm:p-8 mb-6 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)] opacity-[0.03] rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="flex flex-col items-center justify-center text-center mb-8 relative z-10">
          <div className="w-16 h-16 rounded-full bg-[var(--primary-lite)] text-[var(--primary)] flex items-center justify-center mb-4 shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--title)] tracking-tight mb-2">Global Top 100</h2>
          <p className="text-sm text-[var(--subtitle)] max-w-[400px]">Compete with friends and athletes globally. Earn points through workouts and community engagement.</p>
        </div>

        <div className="flex flex-col gap-3 relative z-10">
          {fullLeaderboard.map((user, idx) => (
            <div key={user.rank} className={`flex items-center justify-between p-4 rounded-[16px] border ${idx < 3 ? 'border-[var(--primary)]/30 bg-[var(--primary-lite)]/30' : 'border-[var(--stroke)] bg-[var(--background)]'} transition-transform hover:scale-[1.01] cursor-pointer`}>
              <div className="flex items-center gap-4">
                <div className={`w-8 font-black text-center ${idx === 0 ? 'text-[#ffb5ae] text-2xl' : idx === 1 ? 'text-[#ffb5ae] text-xl' : idx === 2 ? 'text-[#3cbdf6] text-xl' : 'text-[var(--subtitle)] text-lg'}`}>
                  {user.rank}
                </div>
                <div className="relative hidden sm:block">
                  <img src={user.avatar} className={`w-12 h-12 rounded-full object-cover border-[2px] ${idx === 0 ? 'border-[var(--primary)] shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'border-[var(--formfield)]'}`} alt={user.name} />
                  {idx === 0 && <Crown className="absolute -top-3 -right-2 w-5 h-5 text-[var(--primary)] rotate-[15deg] fill-[var(--primary)]" />}
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-[var(--title)] flex items-center gap-2">
                    {user.name}
                    {user.trend === 'up' && <span className="text-[10px] text-green-500 font-bold bg-green-500/10 px-1.5 py-0.5 rounded flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> {user.trendValue}</span>}
                    {user.trend === 'down' && <span className="text-[10px] text-red-500 font-bold bg-red-500/10 px-1.5 py-0.5 rounded flex items-center"><TrendingDown className="w-3 h-3 mr-0.5" /> {user.trendValue}</span>}
                    {user.trend === 'same' && <span className="text-[10px] text-[var(--subtitle)] font-bold bg-[var(--sidebar)] px-1.5 py-0.5 rounded flex items-center">-</span>}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-medium text-[var(--subtitle)]">{user.gym}</span>
                    <span className="text-[10px] text-[var(--stroke)]">•</span>
                    <span className="text-[11px] font-medium text-[var(--subtitle)] flex items-center gap-1"><Dumbbell className="w-3 h-3" /> {user.workouts}</span>
                    <span className="text-[10px] text-[var(--stroke)] hidden sm:block">•</span>
                    <span className="text-[11px] font-medium text-[var(--subtitle)] hidden sm:block">Streak: <strong className="text-[var(--title)]">{user.streak}</strong></span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`font-black text-[16px] sm:text-[18px] ${idx < 3 ? 'text-[var(--primary)]' : 'text-[var(--title)]'}`}>{user.points}</span>
                <span className="text-[10px] font-bold text-[var(--subtitle)] uppercase tracking-wider">Points</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export function AuraHub({ onNavigate }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);

  // Interactivity State
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState(() => mockPosts.map((p, idx) => ({
    ...p,
    authorType: p.author.toLowerCase().includes('aura') ? 'aura' : (p.author.toLowerCase().includes('gym') ? 'gym' : 'user'),
    isFollowing: p.author === 'Sarah Jenkins' || p.author === 'Wilson John' || p.author === 'David Chen' || p.author === 'Marcus Johnson' ? true : !!p.isFollowing,
    isSaved: idx === 1 || idx === 3,
    collectionId: idx === 1 ? 'c1' : (idx === 3 ? 'c2' : null)
  })));
  const [activePostId, setActivePostId] = useState(null);
  const [newPostText, setNewPostText] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [attachedTemplate, setAttachedTemplate] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [activeCollectionId, setActiveCollectionId] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileComposer, setShowMobileComposer] = useState(false);

  // Scroll to top when a post or leaderboard is opened
  useEffect(() => {
    if (activePostId || showLeaderboard) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activePostId, showLeaderboard]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers
  const handleCreatePost = () => {
    if (!newPostText.trim() && !attachedTemplate) return;
    const newPost = {
      id: Date.now(),
      author: 'Kareem Ehab (ME)',
      verified: false,
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop',
      time: 'Just now',
      content: newPostText,
      cheersCount: '+0 Cheers',
      isLiked: false,
      isMe: true,
      photosCount: 0,
      template: attachedTemplate
    };
    setPosts([newPost, ...posts]);
    setNewPostText('');
    setAttachedTemplate(null);
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const handleEditPost = (id, currentContent) => {
    setEditingPostId(id);
    setEditContent(typeof currentContent === 'string' ? currentContent : '');
  };

  const handleSaveEdit = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, content: editContent } : p));
    setEditingPostId(null);
  };

  const handleToggleLike = (id) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        let newCount = p.cheersCount;
        if (newCount.includes('Cheers')) {
           const numStr = newCount.split(' ')[0].replace('+', '').replace('K', '').replace('M', '');
           let count = parseFloat(numStr);
           if (!isNaN(count)) {
               count = p.isLiked ? count - 0.1 : count + 0.1;
               newCount = `+${count.toFixed(1)}${p.cheersCount.includes('K') ? 'K' : p.cheersCount.includes('M') ? 'M' : ''} Cheers`;
           }
        }
        return { ...p, isLiked: !p.isLiked, cheersCount: newCount };
      }
      return p;
    }));
  };

  const handleToggleSave = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, isSaved: !p.isSaved } : p));
  };

  const handleToggleFollow = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, isFollowing: !p.isFollowing } : p));
  };

  const renderLeaderboard = () => (
    <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-6 mb-6`}>
      <div className="flex justify-between items-center mb-10">
        <h3 className={`text-sm font-bold text-[var(--title)] tracking-wider flex items-center gap-2`}>
          <BarChart2 className={`w-5 h-5 text-[var(--subtitle)]`} /> LEADERBOARD
        </h3>
        <button 
          onClick={() => setShowLeaderboard(true)}
          className="text-[12px] font-bold text-[var(--primary)] bg-[var(--primary-lite)] hover:bg-[var(--primary)] hover:text-white transition-colors px-3 py-1.5 rounded-xl flex items-center gap-1.5"
        >
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


  const renderLeaderboardInsights = () => (
    <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] overflow-hidden animate-fade-in`}>
      {/* My Standing */}
      <div className="p-5 border-b border-[var(--stroke)] flex flex-col relative">
         <h3 className={`text-xs font-bold text-[var(--subtitle)] tracking-wider mb-4 flex items-center gap-2`}>
           <Trophy className="w-4 h-4 text-[var(--primary)]" /> MY STANDING
         </h3>
         
         <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full border-2 border-[var(--primary)] overflow-hidden p-0.5">
               <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop" className="w-full h-full rounded-full object-cover" alt="Me" />
            </div>
            <div>
               <div className="flex items-center gap-2">
                 <span className="text-[12px] font-bold text-[var(--subtitle)] uppercase tracking-wider">Rank</span>
                 <span className="text-[24px] font-black text-[var(--title)]">#1</span>
               </div>
               <span className="text-[14px] font-bold text-[var(--primary)]">7,120 Pts</span>
            </div>
         </div>
         
         <div className="bg-[var(--sidebar)] rounded-xl p-3 mt-2 border border-[var(--stroke)]">
            <div className="flex justify-between items-center mb-1">
               <span className="text-[11px] font-bold text-[var(--subtitle)]">Distance to #2</span>
               <span className="text-[11px] font-bold text-[var(--title)]">620 Pts</span>
            </div>
            <div className="w-full bg-[var(--formfield)] h-2 rounded-full overflow-hidden mt-2">
               <div className="bg-[var(--primary)] h-full rounded-full" style={{ width: '80%' }}></div>
            </div>
         </div>
      </div>
      
      {/* Top Gyms */}
      <div className="p-5 flex flex-col">
         <h3 className={`text-xs font-bold text-[var(--subtitle)] tracking-wider mb-4 flex items-center gap-2`}>
           <Dumbbell className="w-4 h-4 text-[var(--primary)]" /> TOP GYMS
         </h3>
         
         <div className="space-y-4">
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <span className="text-[14px] font-black text-[#ffb5ae]">1</span>
                 <span className="text-[13px] font-bold text-[var(--title)]">CEASERS GYM</span>
               </div>
               <span className="text-[12px] font-bold text-[var(--subtitle)]">142K Pts</span>
            </div>
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <span className="text-[14px] font-black text-[#ffb5ae]">2</span>
                 <span className="text-[13px] font-bold text-[var(--title)]">AURA HUB</span>
               </div>
               <span className="text-[12px] font-bold text-[var(--subtitle)]">138K Pts</span>
            </div>
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <span className="text-[14px] font-black text-[#3cbdf6]">3</span>
                 <span className="text-[13px] font-bold text-[var(--title)]">IRONCLAD FITNESS</span>
               </div>
               <span className="text-[12px] font-bold text-[var(--subtitle)]">115K Pts</span>
            </div>
         </div>
      </div>
    </div>
  );

  const renderPostInsights = (post) => (
    <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] overflow-hidden animate-fade-in`}>
      {/* Author Header */}
      <div className="p-5 border-b border-[var(--stroke)] flex flex-col items-center relative">
         <div className="absolute top-4 right-4 text-[10px] bg-[var(--primary-lite)] text-[var(--primary)] px-2 py-1 rounded-md font-bold tracking-wide">AUTHOR</div>
         <img src={post.avatar} className="w-16 h-16 rounded-full object-cover border-[3px] border-[var(--stroke)] mt-2 mb-3 shadow-md" alt={post.author} />
         <h4 className="text-[16px] font-bold text-[var(--title)] flex items-center gap-1">
           {post.author} {post.verified && <BadgeCheck className="w-4 h-4 text-[var(--primary)]" fill="currentColor" stroke="var(--formfield)" />}
         </h4>
         <p className="text-[12px] text-[var(--subtitle)] mt-1 mb-4 text-center px-4 font-medium">Fitness Enthusiast & Member. Documenting the daily grind.</p>
         {!post.isMe && (
           <button className="w-full py-2 bg-[var(--title)] text-[var(--background)] text-sm font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
             <UserPlus className="w-4 h-4" /> Follow
           </button>
         )}
      </div>

      {/* Post Stats */}
      <div className="p-5 flex flex-col gap-4">
        <h3 className={`text-xs font-bold text-[var(--subtitle)] tracking-wider`}>POST INSIGHTS</h3>
        <div className="grid grid-cols-2 gap-3">
           <div className="bg-[var(--background)] p-3 rounded-xl border border-[var(--stroke)] flex flex-col gap-1 hover:border-[var(--primary)] transition-colors cursor-default">
             <Eye className="w-4 h-4 text-[var(--subtitle)]" />
             <span className="text-[15px] font-bold text-[var(--title)] mt-1">12.4K</span>
             <span className="text-[10px] text-[var(--subtitle)]">Views</span>
           </div>
           <div className="bg-[var(--background)] p-3 rounded-xl border border-[var(--stroke)] flex flex-col gap-1 hover:border-[var(--primary)] transition-colors cursor-default">
             <Star className="w-4 h-4 text-[var(--primary)]" />
             <span className="text-[15px] font-bold text-[var(--title)] mt-1">{post.cheersCount.split(' ')[0].replace('+', '')}</span>
             <span className="text-[10px] text-[var(--subtitle)]">Cheers</span>
           </div>
           <div className="bg-[var(--background)] p-3 rounded-xl border border-[var(--stroke)] flex flex-col gap-1 hover:border-[#3cbdf6] transition-colors cursor-default">
             <MessageCircle className="w-4 h-4 text-[#3cbdf6]" />
             <span className="text-[15px] font-bold text-[var(--title)] mt-1">142</span>
             <span className="text-[10px] text-[var(--subtitle)]">Replies</span>
           </div>
           <div className="bg-[var(--background)] p-3 rounded-xl border border-[var(--stroke)] flex flex-col gap-1 hover:border-[#a855f7] transition-colors cursor-default">
             <Share className="w-4 h-4 text-[#a855f7]" />
             <span className="text-[15px] font-bold text-[var(--title)] mt-1">89</span>
             <span className="text-[10px] text-[var(--subtitle)]">Shares</span>
           </div>
        </div>
      </div>
    </div>
  );

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'home') return true;
    if (activeTab === 'news') return post.authorType === 'aura';
    if (activeTab === 'gyms') return post.authorType === 'gym';
    if (activeTab === 'friends') return post.isFollowing;
    if (activeTab === 'saved') return post.isSaved;
    return true;
  });

  return (
    <div className={`min-h-screen bg-[var(--background)] text-[var(--title)] font-sans selection:bg-[var(--primary-lite)]`}>
      <Header 
        isAuraHub={true} 
        onNavigate={onNavigate} 
        onNotifClick={() => setIsActivitiesOpen(true)}
      />

      <div className="max-w-[1650px] mx-auto px-4 sm:px-[20px] pt-4 pb-[100px] lg:pb-[20px]">
        {/* Header Section (Desktop keeps Streak here, Mobile hides it) */}
        {!activePostId && !showLeaderboard && activeTab !== 'saved' && (
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--title)] tracking-tight mb-1">
                AuraHub <span className="text-[var(--primary)]">Community</span>
              </h1>
              <p className={`text-xs sm:text-sm text-[var(--subtitle)]`}>
                Stay on top with AURA.FIT—your go-to hub for the global fitness community!
              </p>
            </div>
            <div className="hidden lg:flex bg-[var(--formfield)] border border-[var(--stroke)] rounded-full px-4 py-2 items-center gap-3 w-fit shadow-sm">
              <span className="text-[11px] font-bold text-[var(--subtitle)] tracking-wider">STREAK</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[var(--title)]">37</span>
                <span className="text-lg leading-none">🔥</span>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Active Users (Stories) */}
        {!activePostId && !showLeaderboard && activeTab !== 'saved' && (
          <div className="lg:hidden flex gap-4 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {activeFriends.map((friend) => (
              <div key={`story-${friend.id}`} className="flex flex-col items-center gap-2 min-w-[56px]">
                <div className="relative w-14 h-14 cursor-pointer hover:scale-105 transition-transform">
                  <img src={friend.avatar} className="w-full h-full rounded-full object-cover border-[2px] border-[var(--stroke)] opacity-90 shadow-sm" alt={friend.name} />
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
        )}

        {/* Mobile Leaderboard */}
        {!activePostId && !showLeaderboard && activeTab === 'home' && (
          <div className="block lg:hidden">
            {renderLeaderboard()}
          </div>
        )}

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
          {/* ================= LEFT SIDEBAR ================= */}
          <div className="hidden lg:block lg:col-span-3">
            <StickySidebar className="space-y-6">
              {/* Navigation Menu */}
              <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] overflow-hidden flex flex-col shadow-sm`}>
                <button 
                  onClick={() => { setActiveTab('home'); setActivePostId(null); setShowLeaderboard(false); setActiveCollectionId(null); }}
                  className={`flex items-center gap-4 px-6 py-4 border-l-[4px] transition-colors group cursor-pointer
                    ${(!activePostId && !showLeaderboard && activeTab === 'home') ? 'border-l-[var(--primary)] bg-[var(--primary-lite)] text-[var(--primary)]' : 'border-l-transparent text-[var(--subtitle)] hover:text-[var(--title)] hover:bg-[var(--overlay)]'}`}
                >
                  <Home className="w-[18px] h-[18px]" fill={(!activePostId && !showLeaderboard && activeTab === 'home') ? "currentColor" : "none"} strokeWidth={1.5} /> 
                  <span className="font-bold text-xs tracking-wide">HOME</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('news'); setActivePostId(null); setShowLeaderboard(false); setActiveCollectionId(null); }}
                  className={`flex items-center gap-4 px-6 py-4 border-l-[4px] transition-colors group cursor-pointer
                    ${(!activePostId && !showLeaderboard && activeTab === 'news') ? 'border-l-[var(--primary)] bg-[var(--primary-lite)] text-[var(--primary)]' : 'border-l-transparent text-[var(--subtitle)] hover:text-[var(--title)] hover:bg-[var(--overlay)]'}`}
                >
                  <Newspaper className="w-[18px] h-[18px]" strokeWidth={1.5} /> 
                  <span className="font-bold text-xs tracking-wide">AURA NEWS</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('gyms'); setActivePostId(null); setShowLeaderboard(false); setActiveCollectionId(null); }}
                  className={`flex items-center gap-4 px-6 py-4 border-l-[4px] transition-colors group cursor-pointer
                    ${(!activePostId && !showLeaderboard && activeTab === 'gyms') ? 'border-l-[var(--primary)] bg-[var(--primary-lite)] text-[var(--primary)]' : 'border-l-transparent text-[var(--subtitle)] hover:text-[var(--title)] hover:bg-[var(--overlay)]'}`}
                >
                  <Dumbbell className="w-[18px] h-[18px]" strokeWidth={1.5} /> 
                  <span className="font-bold text-xs tracking-wide">GYMS</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('friends'); setActivePostId(null); setShowLeaderboard(false); setActiveCollectionId(null); }}
                  className={`flex items-center gap-4 px-6 py-4 border-l-[4px] transition-colors group cursor-pointer
                    ${(!activePostId && !showLeaderboard && activeTab === 'friends') ? 'border-l-[var(--primary)] bg-[var(--primary-lite)] text-[var(--primary)]' : 'border-l-transparent text-[var(--subtitle)] hover:text-[var(--title)] hover:bg-[var(--overlay)]'}`}
                >
                  <Users className="w-[18px] h-[18px]" strokeWidth={1.5} /> 
                  <span className="font-bold text-xs tracking-wide">FRIENDS</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('saved'); setActivePostId(null); setShowLeaderboard(false); setActiveCollectionId(null); }}
                  className={`flex items-center gap-4 px-6 py-4 border-l-[4px] transition-colors group cursor-pointer
                    ${(!activePostId && !showLeaderboard && activeTab === 'saved') ? 'border-l-[var(--primary)] bg-[var(--primary-lite)] text-[var(--primary)]' : 'border-l-transparent text-[var(--subtitle)] hover:text-[var(--title)] hover:bg-[var(--overlay)]'}`}
                >
                  <Bookmark className="w-[18px] h-[18px]" fill={(!activePostId && !showLeaderboard && activeTab === 'saved') ? "currentColor" : "none"} strokeWidth={1.5} /> 
                  <span className="font-bold text-xs tracking-wide">SAVED</span>
                </button>
              </div>

              {activeTab === 'saved' && (
                 <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-5 shadow-sm`}>
                    <h3 className="text-xs font-bold text-[var(--subtitle)] tracking-wider flex items-center gap-2 mb-4">
                       <Bookmark className="w-4 h-4" /> QUICK FILTERS
                    </h3>
                    <div className="flex flex-col gap-2">
                       <button className="flex items-center justify-between w-full p-2.5 rounded-xl hover:bg-[var(--background)] transition-colors group">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-[var(--primary-lite)] text-[var(--primary)] flex items-center justify-center">
                                <ImageIcon className="w-4 h-4" />
                             </div>
                             <span className="text-sm font-bold text-[var(--title)] group-hover:text-[var(--primary)] transition-colors">Photos</span>
                          </div>
                          <span className="text-xs font-bold text-[var(--subtitle)]">12</span>
                       </button>
                       <button className="flex items-center justify-between w-full p-2.5 rounded-xl hover:bg-[var(--background)] transition-colors group">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-[var(--primary-lite)] text-[var(--primary)] flex items-center justify-center">
                                <PlayCircle className="w-4 h-4" />
                             </div>
                             <span className="text-sm font-bold text-[var(--title)] group-hover:text-[var(--primary)] transition-colors">Videos</span>
                          </div>
                          <span className="text-xs font-bold text-[var(--subtitle)]">5</span>
                       </button>
                       <button className="flex items-center justify-between w-full p-2.5 rounded-xl hover:bg-[var(--background)] transition-colors group">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-[var(--primary-lite)] text-[var(--primary)] flex items-center justify-center">
                                <FileText className="w-4 h-4" />
                             </div>
                             <span className="text-sm font-bold text-[var(--title)] group-hover:text-[var(--primary)] transition-colors">Articles</span>
                          </div>
                          <span className="text-xs font-bold text-[var(--subtitle)]">28</span>
                       </button>
                    </div>
                 </div>
              )}

              {/* Recent Activities */}
              <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-0 overflow-hidden shadow-sm`}>
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
        </StickySidebar>
          </div>

          {/* ================= CENTER COLUMN ================= */}
          <div className="lg:col-span-6 space-y-6">
            {showLeaderboard ? (
              <LeaderboardFeed onBack={() => setShowLeaderboard(false)} />
            ) : activePostId ? (() => {
              const activePost = posts.find(p => p.id === activePostId);
              if (!activePost) return null;
              return (
                <CommentsFeed 
                  post={activePost} 
                  onBack={() => setActivePostId(null)}
                  renderPostProps={{
                    editingPostId, editContent, setEditContent, setEditingPostId,
                    handleSaveEdit, handleDeletePost, handleToggleLike, handleToggleFollow, handleToggleSave,
                    onCommentClick: (id) => setActivePostId(id)
                  }}
                />
              );
            })() : activeTab === 'saved' ? (
              <div className="animate-fade-in space-y-6">
                {activeCollectionId ? (
                   <>
                     <div className="bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-6 flex flex-col gap-4 relative overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between z-10 relative">
                           <div className="flex items-center gap-2 text-[10px] sm:text-[12px] font-bold tracking-wide text-[var(--subtitle)]">
                             <span className="cursor-pointer hover:text-[var(--title)] transition-colors" onClick={() => { setActiveTab('home'); setActiveCollectionId(null); }}>AURAHUB</span>
                             <span className="text-[var(--stroke)]">/</span>
                             <span className="cursor-pointer hover:text-[var(--title)] transition-colors" onClick={() => setActiveCollectionId(null)}>Saved Collections</span>
                             <span className="text-[var(--stroke)]">/</span>
                             <span className="text-[var(--primary)] truncate max-w-[120px] sm:max-w-[200px]">
                                {(() => {
                                  const col = mockCollections.find(c => c.id === activeCollectionId);
                                  return col?.name;
                                })()}
                             </span>
                           </div>
                           <div className="flex items-center gap-2">
                              <button className="p-2 bg-[var(--sidebar)] hover:bg-[var(--overlay)] border border-[var(--stroke)] rounded-xl transition-colors tooltip" title="Edit Collection">
                                 <Edit2 className="w-4 h-4 text-[var(--title)]" />
                              </button>
                              <button className="p-2 bg-[var(--sidebar)] hover:bg-[var(--primary-lite)] border border-[var(--stroke)] hover:border-[var(--primary)] rounded-xl transition-colors tooltip" title="Add Post">
                                 <Plus className="w-4 h-4 text-[var(--primary)]" />
                              </button>
                              <button className="p-2 bg-[var(--sidebar)] hover:bg-[var(--alert)]/10 border border-[var(--stroke)] hover:border-[var(--alert)] rounded-xl transition-colors tooltip" title="Delete Collection">
                                 <Trash2 className="w-4 h-4 text-[var(--alert)]" />
                              </button>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 z-10 relative mt-2">
                           {(() => {
                              const col = mockCollections.find(c => c.id === activeCollectionId);
                              return (
                                 <>
                                    <img src={col?.coverImage} className="w-16 h-16 rounded-xl object-cover shadow-sm border border-[var(--stroke)]" alt={col?.name} />
                                    <div>
                                       <h2 className="text-xl font-black text-[var(--title)]">{col?.name}</h2>
                                       <p className="text-sm text-[var(--subtitle)]">{col?.itemsCount} Saved Items</p>
                                    </div>
                                 </>
                              )
                           })()}
                        </div>
                     </div>
                     <div className="space-y-6">
                        {posts.filter(p => p.collectionId === activeCollectionId).map(post => (
                          <PostItem 
                            key={post.id} 
                            post={post} 
                            editingPostId={editingPostId}
                            editContent={editContent}
                            setEditContent={setEditContent}
                            setEditingPostId={setEditingPostId}
                            handleSaveEdit={handleSaveEdit}
                            handleDeletePost={handleDeletePost}
                            handleToggleLike={handleToggleLike}
                            handleToggleFollow={handleToggleFollow}
                            handleToggleSave={handleToggleSave}
                            onCommentClick={(id) => setActivePostId(id)}
                          />
                        ))}
                        {posts.filter(p => p.collectionId === activeCollectionId).length === 0 && (
                          <div className="flex flex-col items-center justify-center p-12 bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] text-center shadow-sm">
                            <div className="w-16 h-16 bg-[var(--sidebar)] border border-[var(--stroke)] rounded-full flex items-center justify-center mb-4">
                              <Bookmark className="w-8 h-8 text-[var(--subtitle)] opacity-50" />
                            </div>
                            <h3 className="text-[16px] font-bold text-[var(--title)] mb-2">No posts in this collection</h3>
                            <p className="text-[13px] text-[var(--subtitle)] max-w-[250px]">
                              Add posts to this collection by clicking the Add Post button.
                            </p>
                          </div>
                        )}
                     </div>
                   </>
                ) : (
                   <div className="animate-fade-in space-y-4 sm:space-y-6">
                     <div className="flex sm:hidden items-center justify-between bg-[var(--formfield)] border border-[var(--stroke)] rounded-2xl p-4 shadow-sm mb-2">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-[var(--primary-lite)] text-[var(--primary)] flex items-center justify-center">
                              <Bookmark className="w-5 h-5" />
                           </div>
                           <div>
                              <h3 className="text-sm font-black text-[var(--title)]">{mockCollections.length} Collections</h3>
                              <p className="text-[11px] text-[var(--subtitle)]">{mockCollections.reduce((acc, c) => acc + c.itemsCount, 0)} Total Saved Items</p>
                           </div>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-3 sm:gap-4">
                     {mockCollections.map(col => (
                        <div key={col.id} onClick={() => setActiveCollectionId(col.id)} className="bg-[var(--formfield)] border border-[var(--stroke)] rounded-[16px] sm:rounded-[20px] overflow-hidden group cursor-pointer hover:border-[var(--primary)] transition-all hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col">
                           <div className="h-24 sm:h-32 relative w-full overflow-hidden shrink-0">
                              <img src={col.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={col.name} />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                           </div>
                           <div className="p-3 sm:p-5 flex items-center justify-between flex-1">
                              <div className="min-w-0 flex-1">
                                 <h3 className="font-bold text-[13px] sm:text-[16px] text-[var(--title)] mb-0.5 group-hover:text-[var(--primary)] transition-colors truncate">{col.name}</h3>
                                 <p className="text-[10px] sm:text-[12px] text-[var(--subtitle)] truncate">{col.itemsCount} Saved Items</p>
                              </div>
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[var(--sidebar)] group-hover:bg-[var(--primary-lite)] flex items-center justify-center transition-colors shrink-0 ml-2">
                                 <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--subtitle)] group-hover:text-[var(--primary)]" />
                              </div>
                           </div>
                        </div>
                     ))}
                   </div>
                 </div>
                )}
              </div>
            ) : (
              <div className="animate-fade-in space-y-6">
                {/* Composer */}
                <div className={`${showMobileComposer ? 'block' : 'hidden'} sm:block bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-5 sm:p-6 shadow-sm relative`}>
                  {showMobileComposer && (
                    <button onClick={() => setShowMobileComposer(false)} className="absolute top-4 right-4 sm:hidden text-[var(--subtitle)] hover:text-[var(--title)]">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop" className={`w-10 h-10 rounded-full object-cover border border-[var(--stroke)]`} alt="Me" />
                      <div>
                        <h3 className="font-bold text-[14px]">Kareem Ehab</h3>
                        <div className="flex gap-1 mt-1">
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
                  
                  <textarea 
                      className="w-full bg-transparent resize-none outline-none text-sm sm:text-base text-[var(--title)] placeholder-[var(--subtitle)] mt-1 h-14"
                      placeholder="What's your fitness update?"
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                    />

                  {attachedTemplate && (
                    <div className="mt-2 mb-2 bg-[var(--sidebar)] border border-[var(--stroke)] rounded-lg p-3 flex justify-between items-center shadow-sm">
                      <div className="flex items-center gap-2">
                        {attachedTemplate.type === 'workout' && <Activity className="w-4 h-4 text-[var(--primary)]" />}
                        {attachedTemplate.type === 'nutrition' && <FileText className="w-4 h-4 text-blue-500" />}
                        {attachedTemplate.type === 'hydration' && <Droplet className="w-4 h-4 text-[#3cbdf6]" />}
                        <span className="text-[13px] font-bold text-[var(--title)]">Attached: {attachedTemplate.title}</span>
                      </div>
                      <button onClick={() => setAttachedTemplate(null)} className="p-1 hover:bg-[var(--overlay)] rounded-full transition-colors text-[var(--subtitle)] hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="flex gap-2 sm:gap-3 mt-4 pt-4 border-t border-[var(--stroke)] overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                    <button className="flex-1 py-2 px-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold text-[var(--primary)] border border-[var(--primary)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors bg-transparent whitespace-nowrap">
                      <ImageIcon className="w-3.5 h-3.5"/> Media
                    </button>
                    <button onClick={() => setAttachedTemplate(mockPosts.find(p => p.id === 'mock-workout-1').template)} className="flex-1 py-2 px-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold text-[var(--primary)] border border-[var(--primary)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors bg-transparent whitespace-nowrap">
                      <Activity className="w-3.5 h-3.5"/> Workout
                    </button>
                    <button onClick={() => setAttachedTemplate(mockPosts.find(p => p.id === 'mock-nutrition-1').template)} className="flex-1 py-2 px-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold text-[var(--primary)] border border-[var(--primary)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors bg-transparent whitespace-nowrap">
                      <FileText className="w-3.5 h-3.5"/> Nutrition
                    </button>
                    <button onClick={() => setAttachedTemplate(mockPosts.find(p => p.id === 'mock-hydration-1').template)} className="flex-1 py-2 px-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold text-[var(--primary)] border border-[var(--primary)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors bg-transparent whitespace-nowrap">
                      <Droplet className="w-3.5 h-3.5"/> Hydration
                    </button>
                    {(newPostText.trim() || attachedTemplate) && (
                      <button 
                        onClick={handleCreatePost}
                        className="px-4 py-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] font-bold text-[var(--background)] bg-[var(--primary)] rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm"
                      >
                        Post
                      </button>
                    )}
                  </div>
                </div>

                {/* Feed Posts */}
                {filteredPosts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-12 bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] text-center shadow-sm">
                    <div className="w-16 h-16 bg-[var(--sidebar)] border border-[var(--stroke)] rounded-full flex items-center justify-center mb-4">
                      {activeTab === 'saved' ? <Bookmark className="w-8 h-8 text-[var(--subtitle)] opacity-50" /> : <Newspaper className="w-8 h-8 text-[var(--subtitle)] opacity-50" />}
                    </div>
                    <h3 className="text-[16px] font-bold text-[var(--title)] mb-2">No posts found</h3>
                    <p className="text-[13px] text-[var(--subtitle)] max-w-[250px]">
                      {activeTab === 'saved' ? "You haven't saved any posts yet. Click the bookmark icon on any post to save it for later." : "There are no posts in this category yet."}
                    </p>
                  </div>
                ) : filteredPosts.map((post) => (
                  <PostItem 
                    key={post.id} 
                    post={post} 
                    editingPostId={editingPostId}
                    editContent={editContent}
                    setEditContent={setEditContent}
                    setEditingPostId={setEditingPostId}
                    handleSaveEdit={handleSaveEdit}
                    handleDeletePost={handleDeletePost}
                    handleToggleLike={handleToggleLike}
                    handleToggleFollow={handleToggleFollow}
                    handleToggleSave={handleToggleSave}
                    onCommentClick={(id) => setActivePostId(id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="hidden lg:block lg:col-span-3">
            <StickySidebar className="space-y-6">
              {(activePostId || showLeaderboard) ? (() => {
                if (showLeaderboard) return renderLeaderboardInsights();
                const activePost = posts.find(p => p.id === activePostId);
                if (!activePost) return null;
                return renderPostInsights(activePost);
              })() : activeTab === 'saved' ? (
                 <div className="animate-fade-in space-y-6">
                    {/* Saved Insights */}
                    <div className="bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-5 shadow-sm">
                       <h3 className="text-xs font-bold text-[var(--subtitle)] tracking-wider mb-5 flex items-center gap-2">
                          <PieChart className="w-4 h-4" /> SAVED INSIGHTS
                       </h3>
                       <div className="grid grid-cols-2 gap-3 mb-5">
                          <div className="bg-[var(--background)] border border-[var(--stroke)] rounded-xl p-3 flex flex-col items-center justify-center text-center">
                             <Dumbbell className="w-5 h-5 text-[#3cbdf6] mb-1.5" />
                             <span className="font-black text-lg text-[var(--title)]">42</span>
                             <span className="text-[10px] text-[var(--subtitle)]">Workouts</span>
                          </div>
                          <div className="bg-[var(--background)] border border-[var(--stroke)] rounded-xl p-3 flex flex-col items-center justify-center text-center">
                             <Apple className="w-5 h-5 text-[#22c55e] mb-1.5" />
                             <span className="font-black text-lg text-[var(--title)]">28</span>
                             <span className="text-[10px] text-[var(--subtitle)]">Recipes</span>
                          </div>
                       </div>
                       <button className="w-full py-2.5 text-xs text-[var(--primary)] font-bold bg-[var(--primary-lite)] border border-[var(--stroke)] hover:border-[var(--primary)] rounded-xl transition-colors">
                          View Full Analytics
                       </button>
                    </div>
                 </div>
              ) : (
                <div className="animate-fade-in space-y-6">
                  {/* Leaderboard */}
                  {renderLeaderboard()}

                  {/* Active Friends */}
                  <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-5 shadow-sm`}>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className={`text-xs font-bold text-[var(--subtitle)] tracking-wider flex items-center gap-2`}>
                        <div className="w-2 h-2 bg-[var(--primary)] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div> ACTIVE FRIENDS
                      </h3>
                      <span className="text-[10px] font-bold text-[var(--primary)] bg-[var(--primary-lite)] px-2 py-1 rounded-md tracking-wide">64 Online</span>
                    </div>
                    
                    <div className="space-y-5">
                      {activeFriends.map((friend) => (
                        <div key={friend.id} className="flex items-center gap-3 cursor-pointer group relative overflow-hidden p-2 -mb-0.5 -ml-3 rounded-xl hover:bg-[var(--background)] transition-colors">
                          <img src={friend.avatar} className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-[1.5px] border-[var(--stroke)] group-hover:border-[var(--primary)] transition-colors`} alt={friend.name} />
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-[14px] sm:text-[15px] font-bold flex items-center gap-1.5 truncate group-hover:text-[var(--primary)] transition-colors text-[var(--title)]`}>
                              {friend.name}
                              {friend.verified && <BadgeCheck className="w-3.5 h-3.5 text-[var(--primary)]" fill="currentColor" stroke="var(--formfield)" />}
                            </h4>
                            <p className={`text-[10px] sm:text-[11px] text-[var(--subtitle)] truncate mt-0.5 tracking-wide`}>
                              <span className={`text-[var(--title)] font-medium`}>{friend.gym}</span> • {friend.branch}
                            </p>
                          </div>
                          
                          {/* Hover actions */}
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 flex items-center gap-1 bg-[var(--background)] pl-3 shadow-[-12px_0_12px_var(--background)]">
                            <button className="p-1.5 rounded-full hover:bg-[var(--primary-lite)] text-[var(--primary)] transition-colors" title="Message">
                              <MessageCircle className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-full hover:bg-[var(--sidebar)] text-[var(--subtitle)] hover:text-[var(--primary)] transition-colors" title="Cheer">
                              <Star className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <button className="w-full py-2.5 mt-2 text-xs text-[var(--primary)] font-bold bg-[var(--primary-lite)] hover:bg-[var(--primary-border)] rounded-xl transition-colors flex items-center justify-center gap-1">
                        See more <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </StickySidebar>
          </div>
        </div>
      </div>

      {/* Activities Side Menu (Drawer) */}
      {isActivitiesOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsActivitiesOpen(false)} />
          <div className="relative w-full sm:w-[400px] sm:max-w-[400px] max-w-full bg-[var(--background)] h-full overflow-y-auto shadow-2xl flex flex-col animate-slide-in-right">
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
      {(!activePostId && !showLeaderboard && !activeCollectionId) && <AuraBottomNav activeTab={activeTab} setActiveTab={setActiveTab} setActivePostId={setActivePostId} setShowLeaderboard={setShowLeaderboard} setActiveCollectionId={setActiveCollectionId} />}

      {/* Floating Action Buttons */}
      <div className="fixed right-4 bottom-24 sm:bottom-8 z-[60] flex flex-col gap-3 items-end pointer-events-none">
        {/* Scroll to Top FAB */}
        <button 
          onClick={scrollToTop}
          className={`pointer-events-auto w-12 h-12 bg-[var(--formfield)] border border-[var(--stroke)] text-[var(--title)] hover:text-[var(--primary)] rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        
        {/* Mobile New Post FAB */}
        {!activePostId && !showLeaderboard && activeTab !== 'saved' && (
          <button onClick={() => setShowMobileComposer(true)} className="pointer-events-auto sm:hidden w-14 h-14 bg-[var(--primary)] text-[var(--background)] rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center transition-transform active:scale-95">
            <Plus className="w-7 h-7" />
          </button>
        )}
      </div>
    </div>
  );
}
