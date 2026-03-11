import { getTasks } from "@/src/lib/api";
import TaskCard from "@/src/components/TaskCard";
import PriorityFilter from "@/src/components/PriorityFiltered";
import { Task } from "@/src/types/task";
import SearchBar from "@/src/components/ui/SearchBar";
import TaskActions from "@/src/components/TaskActions";

export default async function TasksPage({ searchParams }: { searchParams: Promise<{ priority?: string; search?: string }> }) {
  const { priority, search } = await searchParams;
  const tasks = await getTasks(priority as any, search);

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            • Live Update
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
            Vos priorités <span className="text-indigo-600">du jour</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-lg">
            Vous avez <span className="font-semibold text-slate-900">{tasks.length} tâches</span> en attente.
          </p>
        </div>
      </section>

      {/* Toolbar - Ultra Clean */}
      <section className="sticky top-20 z-40">
        <div className="bg-white/80 backdrop-blur-xl p-2 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row items-center gap-2">
          <div className="relative flex-1 w-full group">
            <SearchBar /> 
            {/* Note: Assurez-vous que SearchBar n'a pas de bordures par défaut */}
          </div>
          <div className="h-8 w-px bg-slate-100 hidden md:block" />
          <div className="flex items-center gap-2 w-full md:w-auto p-1">
            <PriorityFilter />
            <TaskActions />
          </div>
        </div>
      </section>

      {/* Grid avec animation visuelle */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 rounded-[2.5rem] bg-slate-50 border border-dashed border-slate-200">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-indigo-200 rounded-full opacity-50" />
            <span className="relative text-6xl">✨</span>
          </div>
          <h3 className="mt-6 text-xl font-bold text-slate-900">Tout est terminé !</h3>
          <p className="text-slate-500 mt-1">Profitez de votre temps libre ou créez une nouvelle tâche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {tasks.map((task: Task) => (
            <div key={task.id} className="group relative">
              <div className="absolute -inset-2 bg-linear-to-b from-indigo-50 to-white rounded-4xl opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative">
                <TaskCard task={task} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
