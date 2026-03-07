export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type Status = "En cours" | "Terminée";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}