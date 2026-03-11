"use client";

import { useSearchParams, useRouter } from "next/navigation";

const filteredStatus = ["En cours", "Terminée"];

export default function StatusFiltered() {
  const router = useRouter();
  const params = useSearchParams();
  const currentStatus = params.get("status") || "";

  const handleChange = (status: string) => {
    const query = new URLSearchParams(params.toString());
    if (status) {
      query.set("status", status);
    } else {
      query.delete("status");
    }
    router.replace(`/tasks?${query.toString()}`);
  };

  return (
    <div className="relative group">
      <span className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-black uppercase tracking-widest text-slate-400 z-10">
        Statut
      </span>
      
      <div className="relative flex items-center">
        <div className="absolute left-4 z-10 flex items-center pointer-events-none">
           <div className={`w-2 h-2 rounded-full ${
             currentStatus === "Terminée" ? "bg-emerald-500" : 
             currentStatus === "En cours" ? "bg-amber-500 animate-pulse" : "bg-slate-300"
           }`} />
        </div>

        <select
          value={currentStatus}
          onChange={(e) => handleChange(e.target.value)}
          className="
            appearance-none pl-10 pr-10 py-2.5 
            bg-white border border-slate-200 rounded-xl
            text-sm font-bold text-slate-700
            hover:border-indigo-300 hover:bg-slate-50
            focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
            transition-all cursor-pointer outline-none
            min-w-40 shadow-sm
          "
        >
          <option value="">Tous les statuts</option>
          {filteredStatus.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <div className="absolute right-3 pointer-events-none text-slate-400 group-hover:text-indigo-500 transition-colors">
          <svg xmlns="http://www.w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
