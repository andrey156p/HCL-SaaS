'use client';

import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon,
  Users,
  Building2,
  MapPin,
  Wrench,
  ArrowLeft,
  Plus,
  Trash2,
  Save
} from 'lucide-react';
import Link from 'next/link';
import { useStore } from '../../../store/store';

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState('teams');

  const { teams, departments, areas, systems, fetchDictionaries, deleteTeam, deleteSystem } = useStore();

  useEffect(() => {
    fetchDictionaries();
  }, [fetchDictionaries]);

  return (
    <div className="min-h-screen bg-[#0b131e] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Top Navbar */}
      <header className="bg-white/5 border-b border-white/10 px-8 py-4 flex items-center gap-4 sticky top-0 z-20 backdrop-blur-md">
        <Link href="/admin" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-400" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-slate-600">
            <SettingsIcon className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">System Settings</h1>
            <p className="text-xs text-slate-400">Dictionaries & Configuration</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-6xl mx-auto flex gap-8">
        
        {/* Sidebar Tabs */}
        <div className="w-64 shrink-0 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('teams')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'teams' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
          >
            <Users className="w-5 h-5" /> Teams (צוותים)
          </button>
          <button 
            onClick={() => setActiveTab('departments')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'departments' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
          >
            <Building2 className="w-5 h-5" /> Departments (מחלקות)
          </button>
          <button 
            onClick={() => setActiveTab('areas')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'areas' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
          >
            <MapPin className="w-5 h-5" /> Areas (אזורי בדיקה)
          </button>
          <button 
            onClick={() => setActiveTab('systems')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'systems' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
          >
            <Wrench className="w-5 h-5" /> Systems (מערכות נבדקות)
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[500px]">
          
          {/* TEAMS */}
          {activeTab === 'teams' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Manage Teams</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20">
                  <Plus className="w-4 h-4" /> Add Team
                </button>
              </div>
              <div className="flex flex-col gap-3" dir="rtl">
                {teams.map(t => (
                  <div key={t.id} className="flex justify-between items-center bg-slate-800/50 border border-slate-700 p-4 rounded-xl">
                    <span className="font-medium text-lg">{t.name}</span>
                    <button onClick={() => deleteTeam(t.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DEPARTMENTS */}
          {activeTab === 'departments' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Manage Departments</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20">
                  <Plus className="w-4 h-4" /> Add Department
                </button>
              </div>
              <div className="text-slate-400 text-center py-20">
                Department list will appear here...
              </div>
            </div>
          )}

          {/* AREAS */}
          {activeTab === 'areas' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Manage Areas (Rooms/Zones)</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20">
                  <Plus className="w-4 h-4" /> Add Area
                </button>
              </div>
              <div className="text-slate-400 text-center py-20">
                Areas list will appear here...
              </div>
            </div>
          )}

          {/* SYSTEMS */}
          {activeTab === 'systems' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Manage Inspected Systems</h2>
                  <p className="text-sm text-slate-400 mt-1">Configure auto-routing to teams.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20">
                  <Plus className="w-4 h-4" /> Add System
                </button>
              </div>
              <div className="flex flex-col gap-3" dir="rtl">
                {systems.map(s => (
                  <div key={s.id} className="flex justify-between items-center bg-slate-800/50 border border-slate-700 p-4 rounded-xl">
                    <span className="font-medium text-lg w-1/3">{s.name}</span>
                    <div className="flex-1 flex items-center gap-2 px-4 border-r border-slate-600 text-slate-300">
                      <span className="text-sm">Auto-Assign:</span>
                      <select className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-1 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none" defaultValue={s.teamId}>
                        <option value="">-- No Team --</option>
                        {teams.map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                    <button onClick={() => deleteSystem(s.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors mr-4">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
