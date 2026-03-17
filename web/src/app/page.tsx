import Link from "next/link";
import FeatureCard from "@/src/components/ui/FeatureCard";
import { cardData } from "@/src/constants/cardData";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="text-center max-w-2xl space-y-6">
        
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Gérez vos tâches avec <span className="text-blue-600">simplicité</span>
        </h1>
        
        <p className="text-lg text-gray-600">
          Organisez votre quotidien, priorisez vos actions et restez productif. 
          Une interface épurée pour ne rien oublier.
        </p>

        <div className="pt-4">
          <Link
            href="/tasks"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            Accéder à mes tâches
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl">
        {
          cardData.map((cardItem) => (
            <FeatureCard key={cardItem.title} title={cardItem.title} description={cardItem.description} />
          ))
        }
      </div>
    </main>
  );
}