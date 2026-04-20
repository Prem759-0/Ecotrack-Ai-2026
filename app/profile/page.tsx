"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ transport: "car", diet: "meat" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      router.push("/dashboard");
      router.refresh();
    } catch (error) {}
    setLoading(false);
  };

  return (
    <main className="p-10 max-w-2xl mx-auto min-h-[calc(100vh-64px)]">
      <h1 className="text-4xl font-bold mb-2 text-white">Your Baseline</h1>
      <p className="text-slate-400 mb-8">Set your opening balance.</p>
      <form onSubmit={handleSubmit} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 flex flex-col gap-6">
        <select value={formData.transport} onChange={e => setFormData({...formData, transport: e.target.value})} className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white">
          <option value="car">Car (Gasoline)</option><option value="ev">Electric Vehicle</option><option value="public">Public Transit</option><option value="bike">Bicycle / Walking</option>
        </select>
        <select value={formData.diet} onChange={e => setFormData({...formData, diet: e.target.value})} className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white">
          <option value="meat">Heavy Meat Eater</option><option value="mixed">Average Mixed</option><option value="vegetarian">Vegetarian</option><option value="vegan">Vegan</option>
        </select>
        <button type="submit" disabled={loading} className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl">{loading ? "Saving..." : "Save & Claim +100 XP"}</button>
      </form>
    </main>
  );
}
