import { Task } from "@/type/task";

const API_URL = "http://localhost:5000/api/tasks";

export async function getTasks(priority?: string, search?: string): Promise<Task[]> {
  const params = new URLSearchParams();

  if (priority) params.append("priority", priority);
  if (search) params.append("search", search);

  const res = await fetch(`${API_URL}?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
}