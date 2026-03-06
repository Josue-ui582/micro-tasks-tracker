import { getTasks } from "@/lib/api";
import TaskCard from "@/components/TaskCard";
import PriorityFilter from "@/components/PriorityFiltered";

interface Props {
  searchParams: {
    priority?: string;
    search?: string;
  };
}

export default async function TasksPage({ searchParams }: Props) {
  const tasks = await getTasks(searchParams.priority, searchParams.search);

  return (
    <div className="w-full h-screen">
      <h1 className="text-2xl text-center font-extrabold my-4">Application de gestion de tâche</h1>

      <PriorityFilter />
      <div className="grid grid-cols-4 border p-2 m-4 rounded-lg border-gray-200">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}