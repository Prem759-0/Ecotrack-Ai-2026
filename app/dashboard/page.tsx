import prisma from "../../lib/db";
import AICards from "../../components/AICards";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // 1. Check for the secure session cookie
  const cookieStore = cookies();
  const sessionId = cookieStore.get("ecotrack_session")?.value;

  // 2. If no cookie, kick them to login
  if (!sessionId) {
    redirect("/login");
  }

  // 3. Fetch the real, logged-in user securely
  const user = await prisma.user.findUnique({
    where: { id: sessionId },
    include: { points: true }
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="p-10 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-white flex items-center gap-3">
        Dashboard
      </h1>
      <p className="text-slate-400 mb-8">Welcome back, {user.name} 👋</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        {/* Points Card */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-[-50%] right-[-10%] w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
          <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider relative z-10">Total Points</h3>
          <p className="text-5xl font-bold text-green-400 relative z-10">
            {user.points?.totalPoints || 0}
          </p>
        </div>

        {/* Streak Card */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm relative overflow-hidden">
           <div className="absolute top-[-50%] right-[-10%] w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
          <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider relative z-10">Current Streak</h3>
          <div className="flex items-center gap-2 relative z-10">
            <p className="text-5xl font-bold text-orange-400">
              {user.points?.streakDays || 0}
            </p>
            <span className="text-4xl">🔥</span>
          </div>
        </div>
      </div>

      <AICards userId={user.id} />
      
    </main>
  );
}
