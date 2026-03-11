"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { DeleteIcon } from "../icon/deleteIcon";

const filtre = ["low", "medium", "high"];

export default function PriorityFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const currentPriority = params.get("priority");

  useEffect(() => {
    if (currentPriority) {
      localStorage.setItem("lastPriority", currentPriority);
    } else {
      const savedPriority = localStorage.getItem("lastPriority");
      if (savedPriority) {
        const query = new URLSearchParams(params.toString());
        query.set("priority", savedPriority);
        router.replace(`/tasks?${query.toString()}`);
      }
    }
  }, [currentPriority, router, params]);

  const handleChange = (priority: string) => {
    const query = new URLSearchParams(params.toString());
    query.set("priority", priority);
    router.push(`/tasks?${query.toString()}`);
  };

  const getStyle = (f: string) => {
    const isActive = currentPriority === f;
    if (isActive) {
      switch (f) {
        case "high": return "bg-rose-100 text-rose-700 border-rose-200 shadow-sm";
        case "medium": return "bg-amber-100 text-amber-700 border-amber-200 shadow-sm";
        default: return "bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm";
      }
    }
    return "bg-transparent text-slate-500 hover:bg-slate-100 border-transparent";
  };

  return (
    <div className="inline-flex items-center p-1.5 bg-slate-50 border border-slate-200 rounded-2xl gap-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 hidden sm:block">
        Priorité
      </span>

      <div className="flex items-center gap-1">
        {filtre.map((f) => (
          <button
            key={f}
            onClick={() => handleChange(f)}
            className={`
              relative px-4 py-2 rounded-xl text-xs font-bold capitalize 
              transition-all duration-200 ease-out border
              flex items-center gap-2 cursor-pointer
              ${getStyle(f)}
            `}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${
              f === "high" ? "bg-rose-500" : f === "medium" ? "bg-amber-500" : "bg-emerald-500"
            }`} />
            
            {f}

            {currentPriority === f && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-current rounded-full opacity-50" />
            )}
          </button>
        ))}
      </div>

      {currentPriority && (
        <button 
          onClick={() => router.push('/tasks')}
          className="ml-1 p-2 text-slate-400 hover:text-rose-500 transition-colors"
          title="Effacer le filtre"
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
}
