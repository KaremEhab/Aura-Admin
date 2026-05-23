import React, { useState } from 'react';
import { 
  Video, Image as ImageIcon, Link as LinkIcon, Plus, 
  UploadCloud, Search, Filter, Lock, Globe, Eye,
  Clock, PlayCircle, MoreVertical, CheckCircle2,
  Trash2, Download, AlertCircle
} from 'lucide-react';
import './Library.css';

const mockGymAssets = [
  { id: 'VID-001', type: 'video', title: 'Aura Fitness Promo 2026', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop', duration: '1:45', uploadedBy: 'Marketing Team', date: '2 days ago', size: '124 MB', visibility: 'Public' },
  { id: 'VID-002', type: 'link', title: 'Squat Form Masterclass', url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop', source: 'YouTube', uploadedBy: 'John Doe (PT)', date: '1 week ago', visibility: 'Members Only' },
  { id: 'IMG-003', type: 'image', title: 'New Equipment Showcase', url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&auto=format&fit=crop', uploadedBy: 'Kareem Ehab', date: '2 weeks ago', size: '4.2 MB', visibility: 'Public' },
];

const mockProgressPhotos = [
  { 
    id: 'PRG-101', 
    trainee: 'Alex Mercer', 
    pt: 'John Doe',
    date: '15 May 2026',
    beforeImg: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&auto=format&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop',
    weightDiff: '-12 lbs',
    privacy: 'Private to PT & Trainee',
    allowPromo: false
  },
  { 
    id: 'PRG-102', 
    trainee: 'Sarah Jenkins', 
    pt: 'Emma Stone',
    date: '10 May 2026',
    beforeImg: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&auto=format&fit=crop',
    afterImg: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&auto=format&fit=crop',
    weightDiff: '+5 lbs (Muscle)',
    privacy: 'Gym Promo Allowed',
    allowPromo: true
  },
];

export function Library() {
  const [activeTab, setActiveTab] = useState('gym-assets');
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);

  return (
    <div className="library-container animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1>Media Library</h1>
          <p className="text-subtitle mt-1">Manage gym promotional videos, PT tutorials, and trainee progress photos.</p>
        </div>
        <button 
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-black px-5 py-2.5 rounded-xl text-sm font-black hover:scale-105 transition-transform shadow-[0_4px_15px_rgba(34,197,94,0.3)]"
        >
          <Plus size={18} /> Upload Media / Link
        </button>
      </div>

      <div className="fin-tabs flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-stroke">
        {[
          { id: 'gym-assets', label: 'Gym Promos & PT Videos', icon: Video },
          { id: 'progress', label: 'Trainee Progress (Before/After)', icon: ImageIcon },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id 
              ? 'bg-sidebar text-primary border-t border-l border-r border-stroke shadow-inner' 
              : 'bg-transparent text-subtitle hover:text-title hover:bg-sidebar border-transparent'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* GYM ASSETS TAB */}
      {activeTab === 'gym-assets' && (
        <div className="animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtitle" size={16} />
              <input type="text" placeholder="Search videos or images..." className="w-full bg-background border border-stroke rounded-lg pl-9 pr-4 py-2 text-sm font-medium text-title focus:outline-none focus:border-primary" />
            </div>
            <div className="flex gap-2">
              <button className="bg-background border border-stroke px-3 py-1.5 rounded-lg text-sm font-bold text-title hover:bg-stroke transition-colors">
                <Filter size={14} className="inline mr-1"/> All Types
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockGymAssets.map(asset => (
              <div key={asset.id} className="media-card group">
                <div className="media-thumbnail relative">
                  <img src={asset.url} alt={asset.title} className="w-full h-48 object-cover rounded-t-xl opacity-80 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase flex items-center gap-1">
                    {asset.type === 'video' ? <Video size={12}/> : asset.type === 'link' ? <LinkIcon size={12}/> : <ImageIcon size={12}/>}
                    {asset.type}
                  </div>
                  {asset.duration && (
                    <div className="absolute bottom-3 right-3 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-bold text-white">
                      {asset.duration}
                    </div>
                  )}
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 rounded-t-xl">
                    <button className="p-2 bg-primary text-black rounded-full hover:scale-110 transition-transform shadow-lg">
                      {asset.type === 'image' ? <Eye size={18}/> : <PlayCircle size={18}/>}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-sidebar border-x border-b border-stroke rounded-b-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-title text-sm line-clamp-1">{asset.title}</h3>
                    <button className="text-subtitle hover:text-title"><MoreVertical size={16}/></button>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase bg-background border border-stroke px-1.5 py-0.5 rounded flex items-center gap-1">
                      {asset.visibility === 'Public' ? <Globe size={10} className="text-green-500"/> : <Lock size={10} className="text-yellow-500"/>}
                      {asset.visibility}
                    </span>
                    {asset.size && <span className="text-[10px] text-subtitle">{asset.size}</span>}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-stroke text-xs text-subtitle">
                    <span>By {asset.uploadedBy}</span>
                    <span>{asset.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROGRESS PHOTOS TAB */}
      {activeTab === 'progress' && (
        <div className="animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
             <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtitle" size={16} />
              <input type="text" placeholder="Search trainee name..." className="w-full bg-background border border-stroke rounded-lg pl-9 pr-4 py-2 text-sm font-medium text-title focus:outline-none focus:border-primary" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mockProgressPhotos.map(prog => (
              <div key={prog.id} className="progress-card bg-sidebar border border-stroke rounded-xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-stroke flex justify-between items-center bg-background/50">
                  <div>
                    <h3 className="font-bold text-title text-base">{prog.trainee}</h3>
                    <span className="text-xs text-subtitle font-medium">Trainer: {prog.pt} • {prog.date}</span>
                  </div>
                  
                  {/* PRIVACY GUARD */}
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase ${
                    prog.allowPromo 
                    ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                    : 'bg-red-500/10 border-red-500/20 text-red-500'
                  }`}>
                    {prog.allowPromo ? <Globe size={12}/> : <Lock size={12}/>}
                    {prog.privacy}
                  </div>
                </div>
                
                {/* STRICT TWO-COLUMN GRID COMPARISON */}
                <div className="grid grid-cols-2 relative h-[300px]">
                  <div className="relative border-r border-stroke">
                    <img src={prog.beforeImg} alt="Before" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                      <span className="text-xs font-black tracking-widest text-white uppercase">Before</span>
                    </div>
                  </div>
                  <div className="relative">
                    <img src={prog.afterImg} alt="After" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-lg border border-black/10">
                      <span className="text-xs font-black tracking-widest text-black uppercase">After</span>
                    </div>
                  </div>
                  
                  {/* Central Result Badge */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black border-2 border-primary rounded-full px-4 py-2 shadow-xl z-10 whitespace-nowrap">
                    <span className="text-sm font-black text-primary">{prog.weightDiff}</span>
                  </div>
                </div>

                <div className="p-4 bg-background/50 flex justify-between items-center border-t border-stroke">
                  {prog.allowPromo ? (
                    <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                      <Download size={14}/> Download for Marketing
                    </button>
                  ) : (
                    <span className="text-xs text-subtitle italic flex items-center gap-1">
                      <AlertCircle size={14}/> Not cleared for marketing use
                    </span>
                  )}
                  <button className="text-xs font-bold text-red-500 hover:bg-red-500/10 px-2 py-1 rounded flex items-center gap-1 transition-colors">
                    <Trash2 size={14}/> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* UPLOAD MODAL MOCKUP */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setUploadModalOpen(false)}>
          <div className="bg-sidebar border border-stroke rounded-2xl w-full max-w-md p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-title mb-1">Add Media</h2>
            <p className="text-xs text-subtitle mb-6">Upload a file or paste a video link (YouTube/Vimeo).</p>
            
            <div className="flex gap-2 mb-6">
              <button className="flex-1 bg-primary text-black py-2 rounded-lg text-sm font-bold border border-primary">Upload File</button>
              <button className="flex-1 bg-background text-subtitle hover:text-title py-2 rounded-lg text-sm font-bold border border-stroke">Paste Link</button>
            </div>

            <div className="border-2 border-dashed border-stroke rounded-xl p-8 flex flex-col items-center justify-center text-center mb-6 hover:bg-background/50 hover:border-primary transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-background border border-stroke rounded-full flex items-center justify-center mb-3 group-hover:border-primary group-hover:text-primary transition-colors">
                <UploadCloud size={24} />
              </div>
              <span className="text-sm font-bold text-title mb-1">Click to browse or drag and drop</span>
              <span className="text-xs text-subtitle">MP4, JPG, PNG up to 500MB</span>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-subtitle uppercase mb-2">Visibility / Privacy</label>
              <select className="w-full bg-background border border-stroke rounded-lg px-4 py-2 text-sm text-title focus:outline-none focus:border-primary">
                <option>Public (Gym Promo)</option>
                <option>Members Only</option>
                <option>Private to PT & Trainee</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stroke">
              <button onClick={() => setUploadModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-bold text-subtitle hover:bg-stroke">Cancel</button>
              <button onClick={() => setUploadModalOpen(false)} className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:scale-105 transition-transform">
                Upload Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
