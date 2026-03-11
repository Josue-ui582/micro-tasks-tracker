"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get("search") || "");

  useEffect(() => {
    setSearch(params.get("search") || "");
  }, [params]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const query = new URLSearchParams(params.toString());

      if (search) {
        query.set("search", search);
      } else {
        query.delete("search");
      }

      router.push(`/tasks?${query.toString()}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder="Rechercher une tâche..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   transition-all duration-200 ease-in-out placeholder-gray-400"
      />
    </div>
  );
}