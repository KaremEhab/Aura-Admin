import React, { useState } from 'react';
import { 
  Shield, CheckCircle2, AlertTriangle, Users, Lock, 
  Key, Plus, Eye, Edit2, Trash2, FileText, Database, ShieldAlert, Zap
} from 'lucide-react';
import './Permissions.css';

// --- MOCK DATA ---
const mockRoles = [
  { id: 'role_sa', name: 'Super Admin', level: 'Highest', color: 'text-red-500 bg-red-500/10 border-red-500/20' },
  { id: 'role_mgr', name: 'Gym Manager', level: 'Level 2', color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
  { id: 'role_pt', name: 'Personal Trainer', level: 'Level 3', color: 'text-primary bg-primary-lite border-primary-border' },
  { id: 'role_rec', name: 'Receptionist', level: 'Level 4', color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' },
];

const mockAssignedStaff = [
  { id: 's1', name: 'Kareem Ehab', roleId: 'role_sa', status: 'Active' },
  { id: 's2', name: 'James Sullivan', roleId: 'role_mgr', status: 'Active' },
  { id: 's3', name: 'Emma Stone', roleId: 'role_pt', status: 'Active' },
  { id: 's4', name: 'John Doe', roleId: 'role_pt', status: 'Active' },
  { id: 's5', name: 'Sarah Jenkins', roleId: 'role_rec', status: 'Active' },
];

const permissionsMatrixTemplate = {
  financials: { label: 'Financials & Revenue', view: true, create: false, edit: false, delete: false, dualAuth: true },
  members: { label: 'Member Management', view: true, create: true, edit: true, delete: false, dualAuth: false },
  workouts: { label: 'Workout & Nutrition Plans', view: true, create: true, edit: true, delete: false, dualAuth: false },
  system: { label: 'System Configuration', view: false, create: false, edit: false, delete: false, dualAuth: true },
};

export function Permissions() {
  const [activeRoleId, setActiveRoleId] = useState('role_pt');
  
  // Local state for the matrix (in real app, fetched based on role)
  const [matrix, setMatrix] = useState(JSON.parse(JSON.stringify(permissionsMatrixTemplate)));
  const [scope, setScope] = useState('owned'); // 'global' or 'owned'

  const activeRole = mockRoles.find(r => r.id === activeRoleId);
  const assignedStaff = mockAssignedStaff.filter(s => s.roleId === activeRoleId);

  const togglePermission = (module, action) => {
    if (activeRoleId === 'role_sa') return; // Cannot edit Super Admin
    setMatrix({
      ...matrix,
      [module]: {
        ...matrix[module],
        [action]: !matrix[module][action]
      }
    });
  };

  const PermissionToggle = ({ label, isActive, onClick, locked }) => (
    <button 
      onClick={locked ? undefined : onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
        isActive 
          ? 'bg-primary-lite border-primary text-primary' 
          : 'bg-background border-stroke text-subtitle hover:text-title hover:border-subtitle'
      } ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-primary' : 'bg-stroke'}`}></div>
      {label}
    </button>
  );

  const isSuperAdmin = activeRoleId === 'role_sa';

  return (
    <div className="perm-container animate-fade-in flex flex-col h-[calc(100vh-100px)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4 shrink-0">
        <div>
          <h1>Role-Based Access Control</h1>
          <p className="text-subtitle mt-1">Configure granular system permissions, data scopes, and dual-authorization limits.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-black px-5 py-2.5 rounded-xl text-sm font-black hover:scale-105 transition-transform shadow-[0_4px_15px_rgba(34,197,94,0.3)]">
          <Save size={16} /> Save Changes
        </button>
      </div>

      {/* 3-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* =========================================================
            LEFT COLUMN: ROLE REGISTRY 
        ========================================================= */}
        <div className="lg:col-span-3 flex flex-col gap-4 overflow-y-auto">
          <button className="w-full flex items-center justify-center gap-2 bg-sidebar border border-stroke hover:border-primary border-dashed py-3 rounded-xl text-sm font-bold text-primary transition-colors">
            <Plus size={16} /> Create Custom Role
          </button>
          
          <div className="flex flex-col gap-3">
            {mockRoles.map(role => (
              <div 
                key={role.id} 
                onClick={() => setActiveRoleId(role.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeRoleId === role.id 
                    ? 'bg-sidebar border-primary shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                    : 'bg-background border-stroke hover:border-subtitle'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-title">{role.name}</h3>
                  <Shield size={16} className={activeRoleId === role.id ? 'text-primary' : 'text-subtitle'} />
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border w-fit ${role.color}`}>
                  {role.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            CENTER COLUMN: PERMISSION MATRIX
        ========================================================= */}
        <div className="lg:col-span-6 flex flex-col gap-6 overflow-y-auto fin-chart-card !p-0">
          <div className="p-6 border-b border-stroke bg-sidebar/50 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
            <div>
              <h2 className="text-xl font-black text-title flex items-center gap-2">
                <Key size={20} className="text-primary"/> {activeRole.name} Permissions
              </h2>
              <p className="text-xs text-subtitle mt-1">{isSuperAdmin ? 'Super Admins have immutable access.' : 'Define CRUD capabilities for this role.'}</p>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-8">
            
            {/* Advanced Settings */}
            <div className="bg-background border border-stroke rounded-xl p-5">
              <h3 className="text-sm font-bold text-title flex items-center gap-2 mb-4 uppercase tracking-wider">
                <Zap size={14} className="text-yellow-500"/> Data Scope & Overrides
              </h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center pb-4 border-b border-stroke">
                  <div>
                    <h4 className="font-bold text-title text-sm">Data Boundary Scope</h4>
                    <p className="text-xs text-subtitle mt-1">Determine what data records this role can see.</p>
                  </div>
                  <div className="flex bg-sidebar rounded-lg p-1 border border-stroke">
                    <button 
                      disabled={isSuperAdmin}
                      onClick={() => setScope('global')}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${scope === 'global' ? 'bg-primary text-black' : 'text-subtitle'}`}
                    >
                      Global (All Data)
                    </button>
                    <button 
                      disabled={isSuperAdmin}
                      onClick={() => setScope('owned')}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${scope === 'owned' ? 'bg-blue-500 text-white' : 'text-subtitle'}`}
                    >
                      Owned-Only (Assigned to them)
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-title text-sm">Require Dual-Authorization</h4>
                    <p className="text-xs text-subtitle mt-1">High-risk actions require an Admin PIN override.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={!isSuperAdmin} disabled />
                    <div className="w-11 h-6 bg-stroke peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-title after:border-stroke after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Matrix Accordions */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-title flex items-center gap-2 uppercase tracking-wider">
                <Database size={14} className="text-blue-500"/> Granular Access Matrix
              </h3>
              
              {Object.keys(matrix).map(modKey => (
                <div key={modKey} className="bg-sidebar border border-stroke rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="px-5 py-4 flex justify-between items-center bg-background border-b border-stroke">
                    <h4 className="font-bold text-title">{matrix[modKey].label}</h4>
                  </div>
                  <div className="p-5 flex flex-wrap gap-4 bg-sidebar/50">
                    <PermissionToggle 
                      label={<span><Eye size={12} className="inline mr-1"/> View</span>} 
                      isActive={isSuperAdmin ? true : matrix[modKey].view} 
                      onClick={() => togglePermission(modKey, 'view')}
                      locked={isSuperAdmin}
                    />
                    <PermissionToggle 
                      label={<span><Plus size={12} className="inline mr-1"/> Create</span>} 
                      isActive={isSuperAdmin ? true : matrix[modKey].create} 
                      onClick={() => togglePermission(modKey, 'create')}
                      locked={isSuperAdmin}
                    />
                    <PermissionToggle 
                      label={<span><Edit2 size={12} className="inline mr-1"/> Edit</span>} 
                      isActive={isSuperAdmin ? true : matrix[modKey].edit} 
                      onClick={() => togglePermission(modKey, 'edit')}
                      locked={isSuperAdmin}
                    />
                    <PermissionToggle 
                      label={<span><Trash2 size={12} className="inline mr-1 text-red-500"/> Delete</span>} 
                      isActive={isSuperAdmin ? true : matrix[modKey].delete} 
                      onClick={() => togglePermission(modKey, 'delete')}
                      locked={isSuperAdmin}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN: FULFILLMENT & LOGS
        ========================================================= */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto">
          {/* Assigned Staff */}
          <div className="fin-chart-card flex flex-col p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-title flex items-center gap-2"><Users size={16} className="text-primary"/> Assigned Staff</h3>
              <span className="text-xs font-bold bg-sidebar px-2 py-1 rounded border border-stroke text-subtitle">{assignedStaff.length} Users</span>
            </div>
            
            <div className="flex flex-col gap-2">
              {assignedStaff.length === 0 ? (
                <div className="text-center p-4 text-xs text-subtitle border border-dashed border-stroke rounded-xl">No users assigned.</div>
              ) : (
                assignedStaff.map(staff => (
                  <div key={staff.id} className="flex items-center gap-3 bg-sidebar border border-stroke p-3 rounded-xl group cursor-pointer hover:border-primary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary-lite flex items-center justify-center text-primary font-bold text-xs">
                      {staff.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-title group-hover:text-primary transition-colors">{staff.name}</h4>
                      <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">{staff.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button className="w-full mt-4 text-xs font-bold text-title bg-background border border-stroke py-2 rounded-lg hover:bg-stroke transition-colors">
              Manage Assignments
            </button>
          </div>

          {/* Audit Snippet */}
          <div className="fin-chart-card flex flex-col p-5 bg-yellow-500/5 border-yellow-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-title flex items-center gap-2 text-yellow-500"><ShieldAlert size={16}/> Role Audit Log</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="border-l-2 border-yellow-500 pl-3">
                <span className="block text-xs font-bold text-title">Scope changed to 'Owned-Only'</span>
                <span className="block text-[10px] text-subtitle mt-0.5">By Kareem Ehab • 2 hrs ago</span>
              </div>
              <div className="border-l-2 border-stroke pl-3">
                <span className="block text-xs font-bold text-subtitle">Added 'Financials: View'</span>
                <span className="block text-[10px] text-subtitle mt-0.5">By Kareem Ehab • 1 day ago</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Ensure you import Save if not already imported
import { Save } from 'lucide-react';
