import prisma from "../../lib/db";
import AICards from "../../components/AICards";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("ecotrack_session")?.value;

  if (!sessionId) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: sessionId },
    include: { points: true }
  });

  if (!user) redirect("/login");

  return (
    <main className="p-10 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-white">Dashboard</h1>
      <p className="text-slate-400 mb-8">Welcome back, {user.name} 👋</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 overflow-hidden relative">
          <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase">Total Points</h3>
          <p className="text-5xl font-bold text-green-400">{user.points?.totalPoints || 0}</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 overflow-hidden relative">
          <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase">Current Streak</h3>
          <div className="flex items-center gap-2">
            <p className="text-5xl font-bold text-orange-400">{user.points?.streakDays || 0}</p>
            <span className="text-4xl">🔥</span>
          </div>
        </div>
      </div>
      <AICards userId={user.id} />
    </main>
  );
}
