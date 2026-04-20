import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-bold text-green-500 flex items-center gap-2">
          🌍 EcoTrack
        </Link>
        <div className="flex gap-6 text-sm font-medium text-slate-300">
          <Link href="/dashboard" className="hover:text-green-400 transition-colors">Dashboard</Link>
          <Link href="/leaderboard" className="hover:text-green-400 transition-colors">Leaderboard</Link>
          <Link href="/profile" className="hover:text-green-400 transition-colors">Profile</Link>
        </div>
      </div>
    </nav>
  );
}
