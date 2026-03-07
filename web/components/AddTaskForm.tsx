"use client";

import { useState } from "react";
import { Priority } from "@/type/task";
import { createTask } from "@/lib/api";

interface Props {
  onTaskAdded: () => void;
}

const priorities: Priority[] = ["low", "medium", "high"];

export default function AddTaskForm({ onTaskAdded }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await createTask(title, description, priority);
      setTitle("");
      setDescription("");
      setPriority("low");
      onTaskAdded();
    } catch (err) {
      console.error(err);
      alert("Impossible d'ajouter la tâche.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-6"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Titre de la tâche..."
        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />

      <textarea
        placeholder="Description détaillée (optionnel)..."
        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-20"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />

      <div className="flex gap-2">
        <select
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none flex-1"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          disabled={loading}
        >
          {priorities.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "..." : "Ajouter"}
        </button>
      </div>
    </form>
  );
}