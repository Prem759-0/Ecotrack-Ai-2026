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
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {}
    setLoading(false);
  };

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center p-6">
      <div className="bg-slate-800/80 p-10 rounded-3xl border border-slate-700/50 shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Join EcoTrack</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-8">
          <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-xl bg-slate-900/50 border border-slate-700 text-white" placeholder="First Name" />
          <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-4 rounded-xl bg-slate-900/50 border border-slate-700 text-white" placeholder="Email Address" />
          <button type="submit" disabled={loading} className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 text-white font-bold rounded-xl">{loading ? "Authenticating..." : "Continue ➔"}</button>
        </form>
      </div>
    </main>
  );
}
