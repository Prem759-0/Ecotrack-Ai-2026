"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    transport: "car",
    diet: "meat",
    energy: "high"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@eco.com", ...formData }),
      });
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Failed to save profile");
    }
    setLoading(false);
  };

  return (
    <main className="p-10 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-white">Your Baseline</h1>
      <p className="text-slate-400 mb-8">Set your opening balance. We use this to calculate your AI missions.</p>

      <form onSubmit={handleSubmit} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 flex flex-col gap-6">
        
        {/* Transport */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-300 font-medium">Primary Transport</label>
          <select 
            value={formData.transport}
            onChange={(e) => setFormData({...formData, transport: e.target.value})}
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-green-500"
          >
            <option value="car">Car (Gasoline)</option>
            <option value="ev">Electric Vehicle</option>
            <option value="public">Public Transit</option>
            <option value="bike">Bicycle / Walking</option>
          </select>
        </div>

        {/* Diet */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-300 font-medium">Dietary Habits</label>
          <select 
            value={formData.diet}
            onChange={(e) => setFormData({...formData, diet: e.target.value})}
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-green-500"
          >
            <option value="meat">Heavy Meat Eater</option>
            <option value="mixed">Average Mixed Diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="mt-4 w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? "Saving to Ledger..." : "Save Profile & Claim +100 XP"}
        </button>
      </form>
    </main>
  );
}
