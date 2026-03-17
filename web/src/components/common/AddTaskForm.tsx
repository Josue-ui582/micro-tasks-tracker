"use client";

import { useState, useRef } from "react";
import { Priority } from "@/src/types/task";
import { createTask } from "@/src/services/api";
import { taskFormSchema } from "@/src/services/auth-schema";
import * as yup from "yup";
import { CloseIcon } from "../icon/closeIcon";

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
    <form 
      className="bg-white rounded-4xl shadow-2xl border border-slate-100 overflow-hidden" 
      onSubmit={handleSubmit}
    >
      <div className="px-8 pt-8 pb-4 flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Nouvelle tâche</h2>
        <button 
          type="button"
          className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors cursor-pointer" 
          onClick={onTaskClosed}
        >
          <CloseIcon />
        </button>
      </div>

      <div className="p-8 space-y-5">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold animate-pulse">
            ⚠️ {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Titre</label>
          <input
            name="title"
            type="text"
            placeholder="Que faut-il faire ?"
            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Description</label>
          <textarea
            name="description"
            placeholder="Ajoutez des détails"
            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all font-medium min-h-30 resize-none"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Priorité</label>
            <div className="relative">
              <select
                name="priority"
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 appearance-none transition-all cursor-pointer"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="low">🟢 low</option>
                <option value="medium">🟡 medium</option>
                <option value="high">🔴 high</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.98] disabled:bg-slate-200 cursor-pointer"
            >
              Créer la tâche
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
