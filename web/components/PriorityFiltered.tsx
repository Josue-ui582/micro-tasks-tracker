"use client";

import { useRouter, useSearchParams } from "next/navigation";

const filtre = ["low", "medium", "high"]

export default function PriorityFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const handleChange = (priority: string) => {
    const query = new URLSearchParams(params.toString());

    if (priority === "ALL") {
      query.delete("priority");
    } else {
      query.set("priority", priority);
    }

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