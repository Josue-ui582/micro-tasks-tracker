import { Task, Priority } from "@/src/types/task";
import { Status } from "@/src/types/task";

const API_URL = "http://localhost:5000/api/tasks";

const getOrCreateId = (): string => {
  let id = localStorage.getItem("x-client-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("x-client-id", id);
  }
  console.log(id)
  return id;
}

export const getTasks = async (priority?: string, search?: string, status?: string): Promise<Task[]> => {
  const params = new URLSearchParams();
  if (priority) params.append("priority", priority);
  if (search) params.append("search", search);
  if (status) params.append("status", status);

  try {
    const res = await fetch(`${API_URL}?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Erreur HTTP: ${res.status} (Impossible de charger les tâches)`);
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Le serveur est injoignable. Vérifiez votre connexion.");
  }
}


export const createTask = async (title: string, description: string, priority: Priority): Promise<Task> => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-client-id": getOrCreateId()
      },
      body: JSON.stringify({ title, description, priority }),
    });
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({})); 
      throw new Error(errorBody.error || `Erreur serveur : ${res.status}`);
    }

    return await res.json();

  } catch (error) {
    if(error instanceof Error) throw error;
    throw new Error("Une erreur inconnue est survenue");
  }
};


export const updateTaskStatus = async (id: string, status: Status): Promise<Task> => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Erreur HTTP: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Impossible de contacter le serveur");
  }
};
