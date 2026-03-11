export type Priority = "low" | "medium" | "high";

export type Status = "En cours" | "Terminée";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}