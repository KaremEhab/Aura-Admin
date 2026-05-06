import React, { useState } from 'react';
import { Search, Filter, HardDrive, Zap, AlertCircle, LayoutGrid, List, Upload, Plus, Eye, User, ChevronDown } from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';
import './Library.css';

export function Library({ searchQuery }) {
  const [viewType, setViewType] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const stats = [
    { label: 'ACTIVE STREAMS', value: '1,242', trend: '99.5%', status: 'success' },
    { label: 'STORAGE USED', value: '4.2 TB', trend: 'of 10 TB', status: 'success' },
    { label: 'BANDWIDTH (24H)', value: '864 GB', trend: '+ 12%', status: 'success' },
    { label: 'NETWORK ERRORS', value: '7', trend: 'Actions Required', status: 'alert' }
  ];

  const videos = [
    { id: 'GP-4921', title: 'Dumbbell Bench Press', duration: '00:45', tags: ['CHEST', 'STRENGTH'], views: '12.4k', uploader: 'Coach Sarah', gymViews: '8.2k', ptViews: '4.2k', status: 'LIVE', thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop' },
    { id: 'GP-1029', title: 'Conventional Deadlift', duration: '01:20', tags: ['POSTERIOR', 'COMPOUND'], views: '8.9k', uploader: 'Gym Master Hany', gymViews: '5.1k', ptViews: '3.8k', status: 'LIVE', thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&auto=format&fit=crop' },
    { id: 'GP-8821', title: 'Overhead Press Form', tags: ['SHOULDERS', 'NEEDS ATTENTION'], status: 'ERROR', errorMsg: 'CONNECTION TIMEOUT', uploader: 'Kareem Ehab', thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bc35e5?w=400&auto=format&fit=crop' },
    { id: 'GP-3342', title: 'Russian Kettlebell Swing', duration: '00:30', tags: ['GLUTES', 'METCON'], status: 'UPLOADING', progress: 85, uploader: 'Admin System', thumbnail: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&auto=format&fit=crop' },
    { id: 'GP-2210', title: 'Barbell Squat Form', duration: '01:15', tags: ['LEGS', 'COMPOUND'], views: '15.2k', uploader: 'Coach Alex', gymViews: '10.1k', ptViews: '5.1k', status: 'LIVE', thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop' },
    { id: 'GP-1105', title: 'Pull-up Technique', duration: '00:55', tags: ['BACK', 'BODYWEIGHT'], views: '6.4k', uploader: 'Gym Manager', gymViews: '4.2k', ptViews: '2.2k', status: 'LIVE', thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&auto=format&fit=crop' },
    { id: 'GP-9932', title: 'Cable Flys Setup', tags: ['CHEST', 'ISOLATION'], status: 'ERROR', errorMsg: 'FILE CORRUPTED', uploader: 'Coach Sarah', thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bc35e5?w=400&auto=format&fit=crop' },
    { id: 'GP-4421', title: 'Plank Hold Guide', duration: '02:00', tags: ['CORE', 'STABILITY'], views: '1.2k', uploader: 'Kareem Ehab', gymViews: '0.8k', ptViews: '0.4k', status: 'UPLOADING', progress: 45, thumbnail: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&auto=format&fit=crop' }
  ];

  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    video.id.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    video.uploader.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  return (
    <div className="library-page animate-fade-in">
      <div className="library-header">
        <div className="dashboard-header-text">
          <h1 className="page-title">Aura Library</h1>
          <p className="page-subtitle">Managing {filteredVideos.length} assets across the global network.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Upload size={18} />
            <span>Bulk Upload</span>
          </button>
          <button className="btn-primary">
            <Plus size={18} />
            <span>New Video</span>
          </button>
        </div>
      </div>

      <div className="library-stats-row">
        {stats.map((stat, i) => (
          <div key={i} className={`card stat-card ${stat.status === 'alert' ? 'attention' : ''} animate-slide-up delay-${i+1}`}>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-main">
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-badge ${stat.status}`}>
                {stat.status === 'success' && <div className="dot" />}
                <span>{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="library-filter-hub card bg-sidebar border border-stroke rounded-2xl p-4 animate-slide-up delay-4">
        <div className="hub-top-row flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          <div className="hub-search-container relative flex-1 opacity-50 pointer-events-none">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtitle" />
            <input 
              type="text" 
              placeholder="Search via global header..." 
              value={searchQuery}
              disabled
              className="w-full bg-background border border-stroke rounded-xl py-3 pl-10 pr-4 focus:border-primary outline-none transition-all"
            />
          </div>
          
          <div className="hub-actions flex items-center justify-between lg:justify-end gap-3">
            <button 
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-stroke transition-all flex-1 lg:flex-none ${isFilterOpen ? 'bg-primary text-white border-primary' : 'bg-background text-title hover:border-primary'}`}
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter size={18} />
              <span className="xs:inline">Filters</span>
            </button>
            <div className="hub-view-toggles flex bg-background p-1 rounded-xl border border-stroke shrink-0">
              <button 
                className={`p-2 rounded-lg transition-all ${viewType === 'grid' ? 'bg-sidebar text-primary shadow-sm' : 'text-subtitle'}`} 
                onClick={() => setViewType('grid')}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                className={`p-2 rounded-lg transition-all ${viewType === 'list' ? 'bg-sidebar text-primary shadow-sm' : 'text-subtitle'}`} 
                onClick={() => setViewType('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`video-grid ${viewType}`}>
        {filteredVideos.map((video, index) => (
          <div key={index} className={`video-card animate-slide-up delay-${index + 1}`}>
            <div className="card-status-header">
              <div className="status-group">
                {video.status === 'LIVE' && <span className="status-indicator live"><div className="dot" /> LIVE</span>}
                {video.status === 'ERROR' && <span className="status-indicator error"><AlertCircle size={12} /> ERROR</span>}
                {video.status === 'UPLOADING' && <span className="status-indicator uploading"><Upload size={12} /> UPLOADING</span>}
              </div>
              <span className="asset-id-top">#{video.id}</span>
            </div>

            <div className="thumbnail-wrapper square-thumb">
              <img src={video.thumbnail} alt={video.title} className="thumbnail" />
              {video.duration && <span className="duration">{video.duration}</span>}
              {video.status === 'ERROR' && (
                <div className="error-overlay">
                  <AlertCircle size={24} />
                  <span>{video.errorMsg}</span>
                </div>
              )}
            </div>

            <div className="video-info-compact">
              <div className="info-main">
                <h4 className="video-title-sm">{video.title}</h4>
                <div className="uploader-line">
                   <User size={12} />
                   <span>{video.uploader}</span>
                </div>
              </div>

              {video.status === 'UPLOADING' ? (
                <div className="upload-mini">
                  <div className="progress-bar-tiny">
                    <div className="progress-fill" style={{ width: `${video.progress}%` }}></div>
                  </div>
                  <span className="progress-pct">{video.progress}%</span>
                </div>
              ) : (
                <div className="video-stats-row">
                  <div className="view-pill">
                    <Eye size={12} />
                    <span>{video.views}</span>
                  </div>
                  <div className="tag-group">
                    {video.tags.slice(0, 1).map(tag => (
                      <span key={tag} className="tag-mini">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Pagination 
        totalItems={1248}
        itemsPerPage={8}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        label="videos"
      />
    </div>
  );
}
