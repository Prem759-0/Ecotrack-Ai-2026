import prisma from "../../lib/db";
import Link from "next/link";

// This tells Vercel not to cache this page, so the ranks are always live!
export const revalidate = 0; 

export default async function Leaderboard() {
  // Fetch the top 50 users from the database, ordered by points
  const leaderboard = await prisma.points.findMany({
    orderBy: { totalPoints: "desc" },
    take: 50,
    include: { user: true }
  });

  return (
    <main className="p-10 max-w-4xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white flex items-center gap-3">
          🏆 Global Leaderboard
        </h1>
        <Link 
          href="/dashboard" 
          className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg border border-slate-700 hover:bg-slate-700 hover:text-white transition-all"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm shadow-xl">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-700/50 text-slate-400 text-sm font-semibold uppercase tracking-wider bg-slate-900/50">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-6">Eco-Warrior</div>
          <div className="col-span-4 text-right">Total XP</div>
        </div>

        {/* Table Rows */}
        {leaderboard.map((entry, index) => {
          // Safeguard to make it working for all types of user input (even if name is missing)
          const userName = entry.user?.name || "Eco Anonymous";
          const initial = userName.charAt(0).toUpperCase();

          return (
            <div 
              key={entry.id} 
              className={`grid grid-cols-12 gap-4 p-4 items-center border-b border-slate-700/50 last:border-0 hover:bg-slate-700/30 transition-colors ${
                index === 0 ? "bg-amber-900/10" : ""
              }`}
            >
              <div className="col-span-2 text-center text-3xl font-bold">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : <span className="text-xl text-slate-500">#{index + 1}</span>}
              </div>
              
              <div className="col-span-6 font-medium text-slate-200 text-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                  {initial}
                </div>
                {userName}
              </div>
              
              <div className="col-span-4 text-right font-bold text-green-400 text-2xl">
                {entry.totalPoints}
              </div>
            </div>
          );
        })}

        {/* Empty State Fallback */}
        {leaderboard.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            No users ranked yet. Start completing challenges!
          </div>
        )}
      </div>
    </main>
  );
}
