import { Task, Priority } from "@/type/task";

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

export async function createTask(title: string, description: string, priority: Priority): Promise<Task[]> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, priority }),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la création de la tâche");
  }

  return res.json();
}