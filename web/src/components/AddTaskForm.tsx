"use client";

import { useState, useRef } from "react";
import { Priority } from "../types/task";
import { createTask } from "../lib/api";
import { taskFormSchema } from "../lib/auth-schema";
import * as yup from "yup"

interface Props {
  onTaskAdded: () => void;
  onTaskClosed: () => void;
}

const initialState = {
  title: "",
  description: "",
  priority: "low" as Priority,
};

export default function AddTaskForm({ onTaskAdded, onTaskClosed }: Props) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  
  const isLoading = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading.current) return;

    try {
      const validatedData = await taskFormSchema.validate(form);
      isLoading.current = true;
      setError(null);
      await createTask(validatedData.title, validatedData.description || "", validatedData.priority as Priority);
      setForm(initialState);
      onTaskAdded();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue lors de la création.");
      }
    } finally {
      isLoading.current = false;
    }
  };

  return (
    <form className="flex flex-col gap-3 p-5 bg-white mb-6 relative shadow-sm" onSubmit={handleSubmit}>
      <button 
        type="button"
        className="p-2 rounded-lg text-white bg-red-500 hover:bg-red-600 font-bold cursor-pointer top-2 right-2 absolute text-xs" 
        onClick={onTaskClosed}
      >
        X
      </button>

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      <input
        name="title"
        type="text"
        placeholder="Titre de la tâche..."
        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description détaillée (optionnel)..."
        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-20"
        value={form.description}
        onChange={handleChange}
      />

      <div className="flex gap-2">
        <select
          name="priority"
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none flex-1"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors disabled:bg-gray-400 cursor-pointer"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
}
