import { getTasks } from "@/src/lib/api";
import TaskCard from "@/src/components/TaskCard";
import PriorityFilter from "@/src/components/PriorityFiltered";
import { Task } from "@/src/types/task";
import SearchBar from "@/src/components/ui/SearchBar";
import TaskActions from "@/src/components/TaskActions";

interface Props {
  searchParams: Promise<{
    priority?: string;
    search?: string;
  }>;
}

export default async function TasksPage({ searchParams }: Props) {
  const priority = (await searchParams).priority;
  const search = (await searchParams).search;
  
  const tasks = await getTasks(priority as any, search);

  return (
    <div className="w-full min-h-screen p-4">
      <h1 className="text-2xl text-center font-extrabold my-4">
        Application de gestion de tâche
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <SearchBar />
        <PriorityFilter />
        <TaskActions />
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-red-500 font-semibold">
          Aucune tâche trouvée.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {tasks.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}