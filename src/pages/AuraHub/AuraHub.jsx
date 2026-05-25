import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, RefreshCw, Moon, Sun, Bell, ChevronDown, 
  Home, Newspaper, Dumbbell, Users, Bookmark,
  Star, MessageCircle, Share, Edit2, Trash2,
  Image as ImageIcon, Activity, FileText, Droplet,
  Globe, UserPlus, BarChart2, ArrowRight,
  TrendingUp, TrendingDown, ChevronRight, CheckCircle2, BadgeCheck,
  Crown, X, ArrowLeft, Eye
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

const mockPosts = [
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
        // Check if sidebar is taller than viewport (minus padding)
        if (height > viewportHeight - 48) {
          // Sticks so bottom of sidebar aligns with bottom of viewport + 24px padding
          setTop(viewportHeight - height - 24);
        } else {
          // Sticks to top with 24px padding
          setTop(24);
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
  onCommentClick
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
          <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors hover:text-[var(--title)] hover:opacity-100`} />
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
        <PostItem post={post} {...renderPostProps} />
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

export function AuraHub({ onNavigate }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);

  // Interactivity State
  const [posts, setPosts] = useState(mockPosts);
  const [activePostId, setActivePostId] = useState(null);
  const [newPostText, setNewPostText] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState('');

  // Handlers
  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
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
      photosCount: 0
    };
    setPosts([newPost, ...posts]);
    setNewPostText('');
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

  const handleToggleFollow = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, isFollowing: !p.isFollowing } : p));
  };

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

  return (
    <div className={`min-h-screen bg-[var(--background)] text-[var(--title)] font-sans selection:bg-[var(--primary-lite)]`}>
      <Header 
        isAuraHub={true} 
        onNavigate={onNavigate} 
        onNotifClick={() => setIsActivitiesOpen(true)}
      />

      <div className="max-w-[1650px] mx-auto px-4 sm:px-[20px] pt-4 pb-[100px] lg:pb-[20px]">
        {/* Header Section (Desktop keeps Streak here, Mobile hides it) */}
        {!activePostId && (
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
        {!activePostId && (
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
        {!activePostId && (
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
                  onClick={activePostId ? () => setActivePostId(null) : undefined}
                  className={`flex items-center gap-4 px-6 py-4 border-l-[4px] transition-colors group cursor-pointer
                    ${!activePostId ? 'border-l-[var(--primary)] bg-[var(--primary-lite)] text-[var(--primary)]' : 'border-l-transparent text-[var(--subtitle)] hover:text-[var(--title)] hover:bg-[var(--overlay)]'}`}
                >
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
            {activePostId ? (() => {
              const activePost = posts.find(p => p.id === activePostId);
              if (!activePost) return null;
              return (
                <CommentsFeed 
                  post={activePost} 
                  onBack={() => setActivePostId(null)}
                  renderPostProps={{
                    editingPostId, editContent, setEditContent, setEditingPostId,
                    handleSaveEdit, handleDeletePost, handleToggleLike, handleToggleFollow,
                    onCommentClick: (id) => setActivePostId(id)
                  }}
                />
              );
            })() : (
              <div className="animate-fade-in space-y-6">
                {/* Composer */}
                <div className={`bg-[var(--formfield)] border border-[var(--stroke)] rounded-[20px] p-5 sm:p-6 shadow-sm`}>
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
                  <div className="flex gap-2 sm:gap-3 mt-4 pt-4 border-t border-[var(--stroke)] overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                    <button className="flex-1 py-2 px-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold text-[var(--primary)] border border-[var(--primary)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors bg-transparent whitespace-nowrap">
                      <ImageIcon className="w-3.5 h-3.5"/> Media
                    </button>
                    <button className="flex-1 py-2 px-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold text-[var(--primary)] border border-[var(--primary)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors bg-transparent whitespace-nowrap">
                      <Activity className="w-3.5 h-3.5"/> Workout
                    </button>
                    <button className="flex-1 py-2 px-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold text-[var(--primary)] border border-[var(--primary)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors bg-transparent whitespace-nowrap">
                      <FileText className="w-3.5 h-3.5"/> Nutrition
                    </button>
                    <button className="flex-1 py-2 px-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold text-[var(--primary)] border border-[var(--primary)] rounded-xl hover:bg-[var(--primary-lite)] transition-colors bg-transparent whitespace-nowrap">
                      <Droplet className="w-3.5 h-3.5"/> Hydration
                    </button>
                    {newPostText.trim() && (
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
                {posts.map((post) => (
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
                    onCommentClick={(id) => setActivePostId(id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="hidden lg:block lg:col-span-3">
            <StickySidebar className="space-y-6">
              {activePostId ? (() => {
                const activePost = posts.find(p => p.id === activePostId);
                if (!activePost) return null;
                return renderPostInsights(activePost);
              })() : (
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
      {!activePostId && <AuraBottomNav />}
    </div>
  );
}
