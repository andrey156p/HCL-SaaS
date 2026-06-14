'use client';

import { 
  ClipboardList, 
  Settings, 
  Users, 
  Printer, 
  QrCode, 
  FileText,
  Smartphone,
  Check,
  RefreshCcw,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useStore } from '../../store/store';

export default function AdminDashboard() {
  const { tasks, teams, departments, fetchTasks, updateTask, markTasksAsDone } = useStore();
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Set default tab when teams load
  useEffect(() => {
    if (teams.length > 0 && !activeTabId) {
      setActiveTabId(teams[0].id);
    }
  }, [teams, activeTabId]);

  const handlePrint = () => {
    window.print();
  };

  const toggleTaskSelection = (taskId: string) => {
    const newSet = new Set(selectedTaskIds);
    if (newSet.has(taskId)) {
      newSet.delete(taskId);
    } else {
      newSet.add(taskId);
    }
    setSelectedTaskIds(newSet);
  };

  const handleCloseSelected = async () => {
    if (selectedTaskIds.size === 0) return;
    await markTasksAsDone(Array.from(selectedTaskIds));
    setSelectedTaskIds(new Set());
  };

  const handleMarkDone = async (taskId: string) => {
    await updateTask(taskId, { status: 'DONE' });
  };

  const handleTransferTeam = async (taskId: string, newTeamId: string) => {
    if (!newTeamId) return;
    await updateTask(taskId, { teamId: newTeamId });
  };

  // Filter tasks by active tab
  const activeTasks = tasks.filter(t => t.status !== 'DONE' && (t.teamId === activeTabId || (!t.teamId && activeTabId === 'ALL')));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans print:bg-white print:text-black" dir="rtl">
      
      {/* Top Header & Actions Bar */}
      <header className="print:hidden bg-white border-b border-slate-200 shadow-sm p-4">
        
        {/* Warning Banner (Mocked like in screenshot) */}
        <div className="flex justify-center mb-4 text-orange-600 font-bold text-sm bg-orange-50 py-1 px-4 rounded-full max-w-xl mx-auto border border-orange-100 items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>סיכום אזהרות: 1 להדפסה | 2 חריגות (48 שעות)!</span>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo Right Side */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-blue-800 tracking-tight leading-none text-center">לוח<br/>בקרה<br/>HCL</h1>
          </div>

          {/* Action Buttons Center/Left */}
          <div className="flex flex-wrap gap-2 justify-center flex-1 max-w-4xl mx-auto items-center">
            
            <Link href="/admin/settings" className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg text-sm font-bold transition-colors">
              <Settings className="w-4 h-4" />
              ניהול מערכות נבדקות
            </Link>
            
            <Link href="/admin/settings" className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg text-sm font-bold transition-colors">
              <Users className="w-4 h-4" />
              ניהול צוותים
            </Link>

            <button onClick={handleCloseSelected} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-bold transition-colors shadow-sm">
              <Check className="w-4 h-4" />
              סגור נבחרים
            </button>

            <button onClick={() => setSelectedTaskIds(new Set())} className="flex items-center gap-2 px-3 py-1.5 bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 rounded-lg text-sm font-bold transition-colors">
              בטל בחירה -
            </button>

            <Link href="/admin/settings" className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 rounded-lg text-sm font-bold transition-colors">
              <Users className="w-4 h-4" />
              ניהול עובדים
            </Link>
            
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-bold transition-colors shadow-sm">
              <QrCode className="w-4 h-4" />
              QR קודים
            </button>
            
            <button className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg text-sm font-bold transition-colors shadow-sm">
              <FileText className="w-4 h-4" />
              דוח מנהל
            </button>

            <button className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white hover:bg-purple-700 rounded-lg text-sm font-bold transition-colors shadow-sm">
              WorkerApp
              <Smartphone className="w-4 h-4" />
            </button>

            <button onClick={handlePrint} className="flex items-center gap-2 px-3 py-1.5 bg-orange-500 text-white hover:bg-orange-600 rounded-lg text-sm font-bold transition-colors shadow-sm">
              <Printer className="w-4 h-4" />
              הדפס
            </button>

            <select className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white font-medium text-slate-700 outline-none">
              <option>עברית (HE)</option>
            </select>

            <select className="px-2 py-1.5 border border-slate-300 rounded-lg text-sm bg-white font-medium text-slate-700 outline-none">
              <option>בחר עובד...</option>
            </select>

          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="print:hidden max-w-6xl mx-auto p-4 md:p-8">
        
        {/* Filters Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-wrap items-center gap-4 justify-center">
          
          <button className="px-6 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg font-bold transition-colors ml-auto">
            נקה סינון
          </button>
          
          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
            <span className="text-sm font-bold text-slate-500">מתאריך</span>
            <input type="date" className="bg-transparent text-slate-800 font-medium outline-none" defaultValue="2026-06-11" />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
            <span className="text-sm font-bold text-slate-500">מחלקה</span>
            <select className="bg-transparent text-slate-800 font-medium outline-none w-48">
              <option>כל המחלקות</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          
        </div>

        {/* Team Tabs */}
        <div className="flex border-b-2 border-slate-200 mb-6 overflow-x-auto">
          <button 
            onClick={() => setActiveTabId('ALL')}
            className={`px-6 py-3 font-bold text-sm transition-all whitespace-nowrap ${activeTabId === 'ALL' ? 'text-blue-600 border-b-2 border-blue-600 -mb-[2px]' : 'text-slate-500 hover:text-slate-700'}`}
          >
            כל המשימות (All)
          </button>
          {teams.map(team => (
            <button 
              key={team.id}
              onClick={() => setActiveTabId(team.id)}
              className={`px-6 py-3 font-bold text-sm transition-all whitespace-nowrap ${activeTabId === team.id ? 'text-blue-600 border-b-2 border-blue-600 -mb-[2px]' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {team.name.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {activeTasks.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-medium bg-white rounded-2xl border border-slate-200">
              אין משימות (No tasks found)
            </div>
          ) : (
            activeTasks.map(task => (
              <div key={task.id} className="bg-white rounded-2xl shadow-sm border border-orange-200 p-4 flex gap-4 items-stretch relative">
                
                {/* Left Actions */}
                <div className="w-48 shrink-0 flex flex-col items-center justify-center gap-3 border-l border-slate-100 pl-4">
                  <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-md text-xs font-bold w-full text-center border border-orange-100 flex flex-col items-center gap-1">
                    <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> במעבדת יורי</span>
                    <span className="flex items-center gap-1 text-[10px]"><RefreshCcw className="w-3 h-3"/> החזר לפתוח</span>
                  </div>
                  
                  <select 
                    className="w-full text-sm border border-slate-300 rounded bg-slate-50 px-2 py-1.5 outline-none font-medium"
                    onChange={(e) => handleTransferTeam(task.id, e.target.value)}
                    value={task.teamId || ''}
                  >
                    <option value="" disabled>העבר צוות...</option>
                    {teams.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>

                  <button 
                    onClick={() => handleMarkDone(task.id)}
                    className="w-full py-2 bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-lg font-bold transition-colors"
                  >
                    בוצע
                  </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col pr-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-pink-100 text-pink-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <QrCode className="w-3 h-3" />
                      דיווח צוות / QR
                    </span>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      עזרה מכלל בטיחות
                    </span>
                  </div>
                  
                  <h3 className="font-black text-lg text-slate-800 flex items-center gap-2">
                    <span>א 1</span>
                    <span className="text-slate-300">|</span>
                    <span>חדר: {task.room || 'לובי'}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-600">{task.actionType === 'REPAIR' ? 'תיקון' : 'החלפה'}</span>
                  </h3>
                  
                  <h4 className="font-bold text-slate-700 mt-1">{task.system?.name || task.systemName || 'תקלה חדשה'}</h4>
                  <p className="text-sm text-slate-500 mt-1">{task.notes}</p>
                  
                  <div className="mt-auto pt-4 flex items-center gap-4 text-[11px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 09:45 11/06/2026</span>
                    <span>צוות: לאב פול</span>
                  </div>
                </div>

                {/* Image */}
                <div className="w-32 h-32 shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                  <img src={task.photoUrl || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80"} alt="Defect" className="w-full h-full object-cover" />
                </div>

                {/* Checkbox */}
                <div className="pl-2 pr-4 flex items-center justify-center border-r border-slate-100">
                  <input 
                    type="checkbox" 
                    checked={selectedTaskIds.has(task.id)}
                    onChange={() => toggleTaskSelection(task.id)}
                    className="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                  />
                </div>

              </div>
            ))
          )}
        </div>
      </main>

      {/* Hidden Print Layout (Task Cards) */}
      <div className="hidden print:block w-full" dir="rtl">
        <div className="text-center font-bold text-lg mb-6 pt-4">
          <span>צוות: {teams.find(t => t.id === activeTabId)?.name || 'כללי'} | </span>
          <span>תאריך הדפסה: {new Date().toLocaleDateString('he-IL')}</span>
        </div>
        
        {/* Exactly 4 cards per A4 page. A4 is ~297mm height. Cards are 130mm height + gap = perfectly fits 2 rows per page */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 max-w-[190mm] mx-auto">
          {activeTasks.slice(0, 4).map(task => (
            <div key={task.id} className="break-inside-avoid border-2 border-black rounded-lg p-3 flex flex-col h-[130mm] bg-white relative">
              
              <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-2">
                <div className="border border-black px-3 py-0.5 font-bold text-sm">תוקן</div>
                <div className="text-lg font-black">חדר: {task.room}</div>
              </div>
              
              <div className="text-center font-bold text-base mb-2">
                {task.system?.name || task.systemName}<br/>
                <span className="text-xs font-normal text-slate-700">{task.notes}</span>
              </div>

              <div className="flex-grow flex items-center justify-center bg-slate-50 border border-slate-300 mb-2 overflow-hidden rounded">
                <img src={task.photoUrl || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80"} alt="Photo" className="object-cover h-full w-full grayscale" />
              </div>
              
              <div className="mt-auto pt-2 flex justify-between items-end text-xs font-bold border-t-2 border-dashed border-black pt-3">
                <div>עובד: ____________</div>
                <div>חתימה: ____________</div>
                <div>תאריך: ____________</div>
              </div>

            </div>
          ))}
          {/* Fill empty slots with dummy if less than 4, just to show layout */}
          {activeTasks.length < 4 && Array.from({ length: 4 - activeTasks.length }).map((_, i) => (
            <div key={`empty-${i}`} className="break-inside-avoid border-2 border-black rounded-lg p-3 flex flex-col h-[130mm] bg-white opacity-30">
              <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-2">
                <div className="border border-black px-3 py-0.5 font-bold text-sm">תוקן</div>
                <div className="text-lg font-black">חדר: ____</div>
              </div>
              <div className="flex-grow flex items-center justify-center bg-slate-50 border border-slate-300 mb-2"></div>
              <div className="mt-auto pt-2 flex justify-between items-end text-xs font-bold border-t-2 border-dashed border-black pt-3">
                <div>עובד: ____________</div>
                <div>חתימה: ____________</div>
                <div>תאריך: ____________</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
