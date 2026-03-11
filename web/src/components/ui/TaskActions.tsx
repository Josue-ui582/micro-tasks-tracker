"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddTaskForm from "../common/AddTaskForm";
import { AddIcon } from "../icon/addIcon";

export default function TaskActions() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleTaskAdded = () => {
    setIsOpen(false);
    router.refresh();
  };

  return (
    <div className="w-full sm:w-auto">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 active:scale-95 cursor-pointer"
      >
        <AddIcon />
        Nouvelle tâche
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative w-full max-w-lg transform animate-in zoom-in-95 slide-in-from-bottom-10 duration-300">
            <AddTaskForm 
              onTaskAdded={handleTaskAdded} 
              onTaskClosed={() => setIsOpen(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
