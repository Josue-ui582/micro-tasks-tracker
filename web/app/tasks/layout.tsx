export default function TasksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-indigo-100">
      <aside className="hidden lg:flex w-72 flex-col border-r border-slate-100 bg-white/50 backdrop-blur-xl sticky top-0 h-screen overflow-y-auto">
        <div className="p-8 flex items-center gap-3">
          <div className="h-9 w-9 bg-linear-to-br from-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center text-white font-bold italic">
            T
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">TaskFlow</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Espaces</div>
          <NavItem icon="⚡" label="Tâches actives" active />
          <NavItem icon="⚙️" label="Paramètres" />
        </nav>

        <div className="p-6 mt-auto border-t border-slate-50">
          <div className="bg-linear-to-r from-indigo-50 to-blue-50 p-4 rounded-2xl border border-indigo-100/50">
            <p className="text-xs font-semibold text-indigo-700">Déconnexion</p>
            <p className="text-[11px] text-indigo-600/70 mt-1">Déconnectez-vous, revenez plus tard !</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-100 bg-white/60 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span>Workspace</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900">Tâches</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-700">
            JD
          </div>
        </header>

        <div className="p-6 lg:p-12 mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${active ? 'bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
      <span className="text-lg">{icon}</span>
      {label}
    </div>
  );
}
