"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-bold text-green-500 flex items-center gap-2">
          🌍 EcoTrack
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/dashboard" className="hover:text-green-400 transition-colors">Dashboard</Link>
          <Link href="/leaderboard" className="hover:text-green-400 transition-colors">Leaderboard</Link>
          <button 
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-400 transition-colors font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
