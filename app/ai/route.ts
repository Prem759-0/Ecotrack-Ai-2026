import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        suggestions: [
          { id: 1, title: "Add API Key in Vercel", impact: "0kg CO₂", points: 0, diff: "Medium" }
        ]
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: "You are an eco-coach. Return JSON: array 'suggestions' with 2 tasks. Each object: 'id' (number), 'title' (string max 5 words), 'impact' (string e.g. 'Saves 2kg CO2'), 'points' (number 10-60), 'diff' ('Easy', 'Medium', 'Hard')." }],
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    return NextResponse.json(JSON.parse(data.choices[0].message.content));
  } catch (error) { return NextResponse.json({ error: "AI Failed" }, { status: 500 }); }
}
