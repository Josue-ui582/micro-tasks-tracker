"use client"

import { Task, Status } from "@/src/types/task";
import { useState, useRef, useEffect } from "react";
import { updateTaskStatus } from "@/src/lib/api";

export default function TaskCard({ task }: { task: Task }) {
  const [currentStatus, setCurrentStatus] = useState(task.status);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const statusOptions: Status[] = ["En cours", "Terminée"];

  const handleStatusChange = async (newStatus: Status) => {
    const previousStatus = currentStatus;
    setCurrentStatus(newStatus);
    setShowMenu(false);
    try {
      await updateTaskStatus(task.id, newStatus);
    } catch (err) {
      setCurrentStatus(previousStatus);
      alert("Erreur lors de la mise à jour ! Le statut a été rétabli.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const getPriorityColor = (p: string) => {
    switch (p.toLowerCase()) {
      case 'haute': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'moyenne': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200 transition-all duration-300">
      
      <div className="flex justify-between items-start mb-4">
        <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </div>
        
        <div className="relative">
          <button 
            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>

          {showMenu && (
            <div 
              ref={menuRef} 
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in duration-200"
            >
              <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">Modifier le statut</div>
              {statusOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleStatusChange(opt)}
                  className="w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 text-left transition-colors flex items-center gap-2"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${opt === 'Terminée' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  Passer à {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
          {task.title}
        </h3>
        
        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${currentStatus === 'Terminée' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
          <span className="text-xs font-semibold text-slate-600">{currentStatus}</span>
        </div>
        
        <div className="h-6 w-6 rounded-full bg-linear-to-tr from-indigo-100 to-indigo-50 border border-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-500">
          U
        </div>
      </div>
    </div>
  );
}
