"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const filtre = ["low", "medium", "high"]

export default function PriorityFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const currentPriority = params.get("priority");

  useEffect(() => {
    if (currentPriority) {
      localStorage.setItem("lastPriority", currentPriority);
    }else {
      const savedPriority = localStorage.getItem("lastPriority");
      if (savedPriority) {
        const query = new URLSearchParams(params.toString());
        query.set("priority", savedPriority);
        router.replace(`/tasks?${query.toString()}`);
      }
    }
  }, [currentPriority, router, params])

  const handleChange = (priority: string) => {
    const query = new URLSearchParams(params.toString());
    query.set("priority", priority);

    router.push(`/tasks?${query.toString()}`);
  };

  return (
    <div className="m-4">
      {
        filtre.map(filtre => (
            <button key={filtre} className="p-2 rounded bg-blue-500 text-white mr-2 cursor-pointer text-lg" onClick={() => handleChange(filtre)}>{filtre}</button>
        ))
      }
    </div>
  );
}