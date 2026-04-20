"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AICards({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // We are using hardcoded "AI" scenarios for today so you don't 
  // have to pay for OpenAI API credits just to test the UI.
  const suggestions = [
    { id: 1, title: "Go Meatless Today", impact: "Saves 3.5kg CO₂", points: 50, diff: "Medium" },
    { id: 2, title: "Unplug Idle Devices", impact: "Saves 1.2kg CO₂", points: 20, diff: "Easy" }
  ];

  const handleComplete = async (points: number) => {
    setLoading(true);
    try {
      await fetch("/api/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, points }),
      });
      
      // Refresh the page to show the new points from the database
      router.refresh();
    } catch (error) {
      console.error("Failed to update points");
    }
    setLoading(false);
  };

  return (
    <div className="w-full mt-8">
      <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
        <span>🤖</span> AI Recommended Actions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((s) => (
          <div key={s.id} className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 hover:border-green-500/50 transition-all">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-white text-lg">{s.title}</h4>
              <span className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded-md">
                {s.diff}
              </span>
            </div>
            <p className="text-green-400 font-medium text-sm mb-4">🌱 {s.impact}</p>
            <button 
              onClick={() => handleComplete(s.points)}
              disabled={loading}
              className="w-full py-2 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
            >
              {loading ? "Updating..." : `Complete for +${s.points} XP`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
