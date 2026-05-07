import React, { useState } from 'react';
import { PowerOff, RefreshCcw, CheckCircle, Settings, Users, MapPin, Clock, DollarSign } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Pagination } from '../../../components/ui/Pagination';
import './GymDirectoryTable.css';

const getStatusVariant = (status) => {
  switch (status) {
    case 'ACTIVE': return 'success';
    case 'SUSPENDED': return 'danger';
    case 'PENDING': return 'warning';
    default: return 'neutral';
  }
};

const getActionIcon = (status) => {
  switch (status) {
    case 'ACTIVE': return <PowerOff size={16} />;
    case 'SUSPENDED': return <RefreshCcw size={16} />;
    case 'PENDING': return <CheckCircle size={16} />;
    default: return <Settings size={16} />;
  }
};

const getActionTitle = (status) => {
  switch (status) {
    case 'ACTIVE': return 'Kill Switch';
    case 'SUSPENDED': return 'Reactivate';
    case 'PENDING': return 'Activate';
    default: return 'Manage';
  }
};

export function GymDirectoryTable({ directory, searchQuery }) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const filteredDirectory = directory.filter(gym => 
    gym.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    gym.id.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    gym.location.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  return (
    <div className="bg-sidebar border border-stroke rounded-xl overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-stroke flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="font-bold text-[var(--title)] flex items-center gap-2">
          Gym Directory Control 
          <span className="text-[var(--primary)] text-xs bg-[var(--primary-lite)] px-2 py-1 rounded-full">{filteredDirectory.length} GYMs</span>
          <span className="text-blue-500 text-xs bg-blue-500/10 px-2 py-1 rounded-full">43 PTs</span>
        </h3>
        <div className="flex gap-2">
          <button className="btn-secondary-sm">Bulk Actions</button>
          <button className="btn-secondary-sm">Export CSV</button>
          <button className="btn-secondary-sm">Full Registry</button>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="min-w-[900px] w-full text-left directory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>GYM NAME</th>
              <th>PLAN</th>
              <th>LOCATION</th>
              <th>TRAINEES</th>
              <th>REVENUE (30D)</th>
              <th>STATUS</th>
              <th>LAST ACTIVE</th>
              <th className="text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredDirectory.map(gym => (
              <tr key={gym.id} className="hover:bg-[var(--primary-lite)] transition-colors">
                <td className="gym-id-cell whitespace-nowrap">#{gym.id}</td>
                <td className="whitespace-nowrap">
                  <div className="gym-name-cell">
                    <h4 className="font-bold text-sm">{gym.name}</h4>
                  </div>
                </td>
                <td className="whitespace-nowrap">
                  <span className="text-xs opacity-70 font-medium">{gym.tier}</span>
                </td>
                <td className="text-xs whitespace-nowrap">
                  <div className="flex items-center gap-1 opacity-70">
                    <MapPin size={12} />
                    {gym.location}
                  </div>
                </td>
                <td className="text-sm font-bold whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-[var(--primary)]" />
                    {gym.trainees}
                  </div>
                </td>
                <td className="gym-revenue text-sm whitespace-nowrap">
                  <div className="flex items-center gap-0.5">
                    <DollarSign size={14} />
                    {gym.revenue.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                  </div>
                </td>
                <td className="whitespace-nowrap">
                  <Badge variant={getStatusVariant(gym.status)}>{gym.status}</Badge>
                </td>
                <td className="text-xs whitespace-nowrap">
                  <div className="flex items-center gap-1 opacity-60">
                    <Clock size={12} />
                    {gym.lastActive}
                  </div>
                </td>
                <td className="text-right whitespace-nowrap">
                  <button 
                    className={`btn-action btn-${gym.status.toLowerCase()}`} 
                    title={getActionTitle(gym.status)}
                  >
                    {getActionIcon(gym.status)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination 
        totalItems={filteredDirectory.length}
        itemsPerPage={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        label="gyms"
      />
    </div>
  );
}
