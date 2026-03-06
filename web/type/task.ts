export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type Status = "PENDING" | "COMPLETED";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}