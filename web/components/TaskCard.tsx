import { Task } from "@/type/task";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="p-2 m-2 bg-blue-700 rounded-md text-white">
      <h3 className="text-xl">{task.title}</h3>

      <p>Priority: {task.priority}</p>

      <p>Status: {task.status}</p>
    </div>
  );
}