import prisma from "../../lib/db";
import AICards from "../../components/AICards"; // Import the new component

export default async function Dashboard() {
  const user = await prisma.user.findFirst({
    where: { email: "test@eco.com" },
    include: { points: true }
  });

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center">
          <h2 className="text-2xl mb-2 text-white">No User Found</h2>
          <p className="text-slate-400">Please go to /api/setup first!</p>
        </div>
      </div>
    );
  }

  return (
    <main className="p-10 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-white">Dashboard</h1>
      <p className="text-slate-400 mb-8">Welcome back, {user.name} 👋</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        {/* Points Card */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
          <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Total Points</h3>
          <p className="text-5xl font-bold text-green-400">
            {user.points?.totalPoints || 0}
          </p>
        </div>

        {/* Streak Card */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
          <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">Current Streak</h3>
          <div className="flex items-center gap-2">
            <p className="text-5xl font-bold text-orange-400">
              {user.points?.streakDays || 0}
            </p>
            <span className="text-4xl">🔥</span>
          </div>
        </div>
      </div>

      {/* Render the interactive AI Cards and pass the userId */}
      <AICards userId={user.id} />
      
    </main>
  );
}
