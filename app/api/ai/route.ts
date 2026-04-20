import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // We safely parse the body just to handle all types of user input
    let body = {};
    try { body = await req.json(); } catch (e) {}

    // Pulling the new FREE key from Vercel
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        suggestions: [
          { id: 1, title: "Please Add Groq Key", impact: "0kg CO₂", points: 0, diff: "Easy" },
          { id: 2, title: "Go to Vercel Settings", impact: "0kg CO₂", points: 0, diff: "Easy" }
        ]
      });
    }

    // Calling Groq's free API endpoint instead of OpenAI
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // This is Meta's Llama 3 model, running for free
        messages: [
          {
            role: "system",
            content: "You are an eco-coach. Return a JSON object containing an array called 'suggestions' with 2 highly specific, actionable eco-friendly tasks. Each object must have: 'id' (number), 'title' (string, max 5 words), 'impact' (string, e.g., 'Saves 2kg CO₂'), 'points' (number between 10 and 60), and 'diff' (string: 'Easy', 'Medium', or 'Hard')."
          }
        ],
        // Forcing strict JSON so it never breaks our dashboard
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    const parsedContent = JSON.parse(data.choices[0].message.content);
    
    return NextResponse.json(parsedContent);

  } catch (error) {
    return NextResponse.json({ error: "Failed to generate AI suggestions" }, { status: 500 });
  }
}
