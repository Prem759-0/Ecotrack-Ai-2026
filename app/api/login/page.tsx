"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (data.success) {
        // Route them to the setup flow to get their baseline
        router.push("/profile");
        router.refresh();
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center p-6 bg-slate-900">
      <div className="bg-slate-800/80 p-10 rounded-3xl border border-slate-700/50 shadow-2xl max-w-md w-full backdrop-blur-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join EcoTrack</h1>
          <p className="text-slate-400">Enter your details to start playing.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-medium text-slate-300 mb-1 block">First Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-4 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-green-500 transition-colors"
              placeholder="e.g. Prashant"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-300 mb-1 block">Email Address</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-4 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-green-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 py-4 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(22,163,74,0.4)] disabled:shadow-none"
          >
            {loading ? "Authenticating..." : "Continue ➔"}
          </button>
        </form>
      </div>
    </main>
  );
}
