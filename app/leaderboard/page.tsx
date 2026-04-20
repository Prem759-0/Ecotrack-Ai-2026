import prisma from "../../lib/db";
export const revalidate = 0; 

export default async function Leaderboard() {
  const leaderboard = await prisma.points.findMany({
    orderBy: { totalPoints: "desc" },
    take: 50,
    include: { user: true }
  });

  return (
    <main className="p-10 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">🏆 Global Leaderboard</h1>
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-700/50 text-slate-400 text-sm font-semibold uppercase bg-slate-900/50">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-6">Eco-Warrior</div>
          <div className="col-span-4 text-right">Total XP</div>
        </div>
        {leaderboard.map((entry, index) => {
          const userName = entry.user?.name || "Eco Anonymous";
          return (
            <div key={entry.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b border-slate-700/50 last:border-0 hover:bg-slate-700/30">
              <div className="col-span-2 text-center text-3xl font-bold">{index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : <span className="text-xl text-slate-500">#{index + 1}</span>}</div>
              <div className="col-span-6 font-medium text-slate-200 text-lg flex items-center gap-4">{userName}</div>
              <div className="col-span-4 text-right font-bold text-green-400 text-2xl">{entry.totalPoints}</div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
