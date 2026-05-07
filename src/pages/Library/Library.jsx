import { useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Eye,
  FileVideo,
  Filter,
  Globe2,
  HardDrive,
  LayoutGrid,
  List,
  PlayCircle,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  User,
  Wand2,
  X,
  Zap,
} from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';
import './Library.css';

const filterOptions = ['LIVE', 'UPLOADING', 'ERROR', 'CHEST', 'LEGS', 'CORE', 'STRENGTH', 'PT READY'];

export function Library({ searchQuery }) {
  const [viewType, setViewType] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const stats = [
    { label: 'ACTIVE ASSETS', value: '1,242', trend: '1,096 live', status: 'success', icon: FileVideo },
    { label: 'STORAGE USED', value: '4.2 TB', trend: '42% of plan', status: 'success', icon: HardDrive },
    { label: 'BANDWIDTH 24H', value: '864 GB', trend: '+12%', status: 'success', icon: Globe2 },
    { label: 'QUALITY ISSUES', value: '7', trend: 'Needs review', status: 'alert', icon: AlertCircle },
  ];

  const contentOps = [
    { label: 'AI form checks', value: '328', detail: 'videos scanned for unsafe movement cues' },
    { label: 'Awaiting approval', value: '24', detail: 'coach uploads pending publishing review' },
    { label: 'Localized clips', value: '186', detail: 'Arabic captions and gym-specific variants' },
    { label: 'Reused in plans', value: '8.7K', detail: 'workout templates using library assets' },
  ];

  const publishingPipeline = [
    { stage: 'Uploaded', count: 92, tone: 'blue' },
    { stage: 'AI checked', count: 76, tone: 'purple' },
    { stage: 'Coach approved', count: 61, tone: 'green' },
    { stage: 'Published', count: 54, tone: 'teal' },
  ];

  const taxonomyCoverage = [
    { label: 'Strength', coverage: 92 },
    { label: 'Hypertrophy', coverage: 81 },
    { label: 'Mobility', coverage: 68 },
    { label: 'Rehab-safe', coverage: 44 },
  ];

  const distribution = [
    { channel: 'Gym member apps', assets: 812, reach: '64.8K views' },
    { channel: 'Personal trainer plans', assets: 436, reach: '21.3K views' },
    { channel: 'Aura Direct programs', assets: 284, reach: '18.1K views' },
  ];

  const videos = [
    { id: 'GP-4921', title: 'Dumbbell Bench Press', duration: '00:45', tags: ['CHEST', 'STRENGTH', 'PT READY'], views: '12.4k', uploader: 'Coach Sarah', gymViews: '8.2k', ptViews: '4.2k', status: 'LIVE', quality: '98%', usage: '428 plans', thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop' },
    { id: 'GP-1029', title: 'Conventional Deadlift', duration: '01:20', tags: ['POSTERIOR', 'COMPOUND'], views: '8.9k', uploader: 'Gym Master Hany', gymViews: '5.1k', ptViews: '3.8k', status: 'LIVE', quality: '94%', usage: '212 plans', thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&auto=format&fit=crop' },
    { id: 'GP-8821', title: 'Overhead Press Form', tags: ['SHOULDERS', 'NEEDS ATTENTION'], status: 'ERROR', errorMsg: 'CONNECTION TIMEOUT', uploader: 'Kareem Ehab', quality: 'Blocked', usage: '0 plans', thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bc35e5?w=400&auto=format&fit=crop' },
    { id: 'GP-3342', title: 'Russian Kettlebell Swing', duration: '00:30', tags: ['GLUTES', 'METCON'], status: 'UPLOADING', progress: 85, uploader: 'Admin System', quality: 'Scanning', usage: 'Draft', thumbnail: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&auto=format&fit=crop' },
    { id: 'GP-2210', title: 'Barbell Squat Form', duration: '01:15', tags: ['LEGS', 'COMPOUND', 'PT READY'], views: '15.2k', uploader: 'Coach Alex', gymViews: '10.1k', ptViews: '5.1k', status: 'LIVE', quality: '96%', usage: '516 plans', thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop' },
    { id: 'GP-1105', title: 'Pull-up Technique', duration: '00:55', tags: ['BACK', 'BODYWEIGHT'], views: '6.4k', uploader: 'Gym Manager', gymViews: '4.2k', ptViews: '2.2k', status: 'LIVE', quality: '91%', usage: '184 plans', thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&auto=format&fit=crop' },
    { id: 'GP-9932', title: 'Cable Flys Setup', tags: ['CHEST', 'ISOLATION'], status: 'ERROR', errorMsg: 'FILE CORRUPTED', uploader: 'Coach Sarah', quality: 'Blocked', usage: '0 plans', thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bc35e5?w=400&auto=format&fit=crop' },
    { id: 'GP-4421', title: 'Plank Hold Guide', duration: '02:00', tags: ['CORE', 'STABILITY'], views: '1.2k', uploader: 'Kareem Ehab', gymViews: '0.8k', ptViews: '0.4k', status: 'UPLOADING', progress: 45, quality: 'Scanning', usage: 'Draft', thumbnail: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&auto=format&fit=crop' },
  ];

  const filteredVideos = videos.filter((video) => {
    const query = (searchQuery || '').toLowerCase();
    const matchesSearch =
      video.title.toLowerCase().includes(query) ||
      video.id.toLowerCase().includes(query) ||
      video.uploader.toLowerCase().includes(query) ||
      video.tags.join(' ').toLowerCase().includes(query);

    const matchesFilters =
      activeFilters.length === 0 ||
      activeFilters.every((filter) => video.status === filter || video.tags.includes(filter));

    return matchesSearch && matchesFilters;
  });

  const toggleFilter = (filter) => {
    setActiveFilters((prev) => (
      prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter]
    ));
  };

  return (
    <div className="library-page animate-fade-in">
      <section className="library-hero" id="library-overview">
        <div>
          <span className="library-kicker"><BookOpen size={14} /> Content operating system</span>
          <h1 className="page-title">Aura Library</h1>
          <p className="page-subtitle">Manage training videos, exercise education, coach uploads, AI quality checks, publishing, and distribution across the Aura network.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary"><Upload size={18} /><span>Bulk Upload</span></button>
          <button className="btn-primary"><Plus size={18} /><span>New Asset</span></button>
        </div>
      </section>

      <section className="library-stats-row" id="library-health">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`card stat-card ${stat.status === 'alert' ? 'attention' : ''} animate-slide-up delay-${i + 1}`}>
              <div className={`library-stat-icon ${stat.status}`}><Icon size={18} /></div>
              <div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-main">
                  <div className="stat-value">{stat.value}</div>
                  <div className={`stat-badge ${stat.status}`}>{stat.status === 'success' && <div className="dot" />}<span>{stat.trend}</span></div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="library-ops-grid" id="library-ops">
        {contentOps.map((item) => (
          <div className="card library-ops-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </div>
        ))}
      </section>

      <section className="library-insights-grid" id="library-publishing">
        <div className="card library-panel">
          <div className="library-panel-header">
            <div><span><Sparkles size={14} /> Publishing pipeline</span><h3>Content Readiness</h3></div>
            <button className="mini-action-btn"><Wand2 size={14} /> Auto-tag</button>
          </div>
          <div className="pipeline-list">
            {publishingPipeline.map((stage) => (
              <div className="pipeline-row" key={stage.stage}>
                <span className={`pipeline-dot ${stage.tone}`} />
                <strong>{stage.stage}</strong>
                <em>{stage.count}</em>
              </div>
            ))}
          </div>
        </div>

        <div className="card library-panel">
          <div className="library-panel-header">
            <div><span><ShieldCheck size={14} /> Exercise taxonomy</span><h3>Coverage Gaps</h3></div>
          </div>
          <div className="taxonomy-list">
            {taxonomyCoverage.map((item) => (
              <div className="taxonomy-row" key={item.label}>
                <div><strong>{item.label}</strong><span>{item.coverage}% covered</span></div>
                <div className="taxonomy-bar"><span style={{ width: `${item.coverage}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="card library-panel">
          <div className="library-panel-header">
            <div><span><Globe2 size={14} /> Distribution</span><h3>Where Assets Are Used</h3></div>
          </div>
          <div className="distribution-list">
            {distribution.map((item) => (
              <div className="distribution-row" key={item.channel}>
                <div><strong>{item.channel}</strong><span>{item.assets} assets</span></div>
                <em>{item.reach}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="library-filter-hub card animate-slide-up delay-4" id="library-assets">
        <div className="hub-top-row">
          <div className="hub-search-container">
            <Search size={20} className="hub-search-icon" />
            <input type="text" placeholder="Search via global header..." value={searchQuery || ''} disabled />
          </div>

          <div className="hub-actions">
            <button className={`hub-filter-trigger ${activeFilters.length ? 'has-active' : ''}`} onClick={() => setIsFilterOpen(true)}>
              <Filter size={18} /><span>Filters</span>{activeFilters.length > 0 && <b className="hub-badge">{activeFilters.length}</b>}
            </button>
            <div className="hub-view-toggles">
              <button className={`hub-toggle-btn ${viewType === 'grid' ? 'active' : ''}`} onClick={() => setViewType('grid')}><LayoutGrid size={18} /></button>
              <button className={`hub-toggle-btn ${viewType === 'list' ? 'active' : ''}`} onClick={() => setViewType('list')}><List size={18} /></button>
            </div>
          </div>
        </div>
        <div className="hub-bottom-row">
          <div className="quick-filter-scroll">
            {filterOptions.map((filter) => (
              <button key={filter} className={`quick-chip ${activeFilters.includes(filter) ? 'selected' : ''}`} onClick={() => toggleFilter(filter)}>
                {filter}
              </button>
            ))}
          </div>
          {activeFilters.length > 0 && <button className="clear-all-mini" onClick={() => setActiveFilters([])}>Clear</button>}
        </div>
      </section>

      <section className={`video-grid ${viewType}`}>
        {filteredVideos.map((video, index) => (
          <div key={video.id} className={`video-card animate-slide-up delay-${index + 1}`}>
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
              {video.status === 'LIVE' && <span className="play-overlay"><PlayCircle size={34} /></span>}
              {video.status === 'ERROR' && <div className="error-overlay"><AlertCircle size={24} /><span>{video.errorMsg}</span></div>}
            </div>

            <div className="video-info-compact">
              <div className="info-main">
                <h4 className="video-title-sm">{video.title}</h4>
                <div className="uploader-line"><User size={12} /><span>{video.uploader}</span></div>
              </div>

              {video.status === 'UPLOADING' ? (
                <div className="upload-mini">
                  <div className="progress-bar-tiny"><div className="progress-fill" style={{ width: `${video.progress}%` }} /></div>
                  <span className="progress-pct">{video.progress}%</span>
                </div>
              ) : (
                <div className="video-stats-row">
                  <div className="view-pill"><Eye size={12} /><span>{video.views || '0'}</span></div>
                  <div className="view-pill"><CheckCircle2 size={12} /><span>{video.quality}</span></div>
                  <div className="tag-group">{video.tags.slice(0, 1).map((tag) => <span key={tag} className="tag-mini">{tag}</span>)}</div>
                </div>
              )}
              <div className="asset-usage-line"><Zap size={12} /><span>{video.usage}</span></div>
            </div>
          </div>
        ))}
      </section>

      <Pagination totalItems={1248} itemsPerPage={8} currentPage={currentPage} onPageChange={setCurrentPage} label="videos" />

      <div className={`filter-drawer-overlay ${isFilterOpen ? 'open' : ''}`} onClick={() => setIsFilterOpen(false)}>
        <aside className="filter-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <h3>Library Filters</h3>
            <button className="close-drawer" onClick={() => setIsFilterOpen(false)}><X size={18} /></button>
          </div>
          <div className="drawer-content">
            <div className="filter-group">
              <label>Status, body part, and readiness</label>
              <div className="filter-options-grid">
                {filterOptions.map((filter) => (
                  <button key={filter} className={`option-btn ${activeFilters.includes(filter) ? 'selected' : ''}`} onClick={() => toggleFilter(filter)}>
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="drawer-footer">
            <button className="btn-reset" onClick={() => setActiveFilters([])}>Reset</button>
            <button className="btn-apply" onClick={() => setIsFilterOpen(false)}>Apply Filters</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
