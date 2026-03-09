"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddTaskForm from "./AddTaskForm";

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
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
      >
        {isOpen ? "Annuler" : "+ Créer une tâche"}
      </button>

      {isOpen && (
        <div className="p-4 rounded-lg hover:shadow-lg bg-white absolute right-0 top-10">
          <AddTaskForm onTaskAdded={handleTaskAdded} onTaskClosed={() => setIsOpen(!isOpen)} />
        </div>
      )}
    </div>
  );
}