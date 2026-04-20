import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-6 bg-slate-900 text-center relative overflow-hidden">
      {/* Background glowing ambient effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="z-10 max-w-4xl flex flex-col items-center mt-[-40px]">
        <span className="px-4 py-1.5 mb-8 text-sm font-bold tracking-wide text-green-400 bg-green-400/10 border border-green-400/20 rounded-full">
          ECOTRACK AI IS LIVE 🌍
        </span>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
          Turn saving the planet into a <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            multiplayer game.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl font-medium">
          Track your carbon footprint, complete dynamic AI-powered eco-missions, and compete on the global leaderboard. The world's first actionable climate ledger.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mx-auto">
          {/* This securely points to your setup route so new visitors instantly generate test data without crashing */}
          <Link 
            href="/api/setup" 
            className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)] w-full sm:w-auto text-lg flex items-center justify-center gap-2"
          >
            Start Playing 🚀
          </Link>
          <Link 
            href="/leaderboard" 
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold rounded-xl transition-all w-full sm:w-auto text-lg flex items-center justify-center"
          >
            View Leaderboard
          </Link>
        </div>
      </div>
    </main>
  );
}
