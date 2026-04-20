"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define the shape of our AI data
type Suggestion = {
  id: number;
  title: string;
  impact: string;
  points: number;
  diff: string;
};

export default function AICards({ userId }: { userId: string }) {
  const [loadingPoints, setLoadingPoints] = useState(false);
  const [loadingAI, setLoadingAI] = useState(true);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const router = useRouter();

  // Fetch the AI suggestions when the component loads
  useEffect(() => {
    const fetchAI = async () => {
      try {
        const res = await fetch("/api/ai", { method: "POST" });
        const data = await res.json();
        if (data.suggestions) {
          setSuggestions(data.suggestions);
        }
      } catch (err) {
        console.error("AI fetch failed");
      }
      setLoadingAI(false);
    };
    fetchAI();
  }, []);

  const handleComplete = async (points: number, id: number) => {
    setLoadingPoints(true);
    try {
      await fetch("/api/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, points }),
      });
      
      // Remove the completed card from the screen
      setSuggestions(prev => prev.filter(s => s.id !== id));
      router.refresh();
    } catch (error) {
      console.error("Failed to update points");
    }
    setLoadingPoints(false);
  };

  return (
    <div className="w-full mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
          <span>🤖</span> Live AI Recommended Actions
        </h3>
      </div>
      
      {loadingAI ? (
        <div className="animate-pulse flex gap-4">
          <div className="flex-1 h-32 bg-slate-800 rounded-xl border border-slate-700"></div>
          <div className="flex-1 h-32 bg-slate-800 rounded-xl border border-slate-700"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((s) => (
            <div key={s.id} className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 hover:border-green-500/50 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-white text-lg">{s.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-md text-white ${
                  s.diff === 'Easy' ? 'bg-green-600' : s.diff === 'Medium' ? 'bg-orange-500' : 'bg-red-600'
                }`}>
                  {s.diff}
                </span>
              </div>
              <p className="text-green-400 font-medium text-sm mb-4">🌱 {s.impact}</p>
              <button 
                onClick={() => handleComplete(s.points, s.id)}
                disabled={loadingPoints || s.points === 0}
                className="w-full py-2 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
              >
                {loadingPoints ? "Updating..." : `Complete for +${s.points} XP`}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
