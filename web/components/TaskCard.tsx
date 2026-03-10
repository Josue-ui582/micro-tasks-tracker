"use client"

import { Task, Status } from "@/type/task";
import { useState, useRef, useEffect } from "react";
import { updateTaskStatus } from "@/lib/api";

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

  return (
    <div className="p-2 m-2 bg-blue-700 rounded-md text-white relative group">
      <h3 className="text-xl">{task.title}</h3>
      
      <span 
        className="absolute right-2 top-2 cursor-pointer hidden group-hover:block"
        onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
      >
        ...
      </span>

      {showMenu && (
        <div 
          ref={menuRef} 
          className="absolute right-1 top-8 bg-white text-black shadow-xl rounded border z-20 flex flex-col overflow-hidden"
        >
          {statusOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => handleStatusChange(opt)}
              className="px-4 py-2 hover:bg-blue-100 text-left text-sm transition-colors"
            >
              Passer à {opt}
            </button>
          ))}
        </div>
      )}

      <p><span className="text-lg font-bold">Description</span>: {task.description}</p>

      <p><span className="text-lg font-bold">Priorité</span>: {task.priority}</p>
      <p><span className="text-lg font-bold">Statut</span>: <span className="font-bold">{currentStatus}</span></p>
    </div>
  );
}