import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Safely parse incoming data for all types of user input
    let body = {};
    try {
      body = await req.json();
    } catch (e) {
      // Body is empty, which is fine
    }

    const apiKey = process.env.OPENAI_API_KEY;
    
    // If you haven't added your API key to Vercel yet, don't crash! Return safe placeholders.
    if (!apiKey) {
      return NextResponse.json({
        suggestions: [
          { id: 1, title: "Please Add OpenAI Key", impact: "0kg CO₂", points: 0, diff: "Setup" },
          { id: 2, title: "Go to Vercel Settings", impact: "0kg CO₂", points: 0, diff: "Setup" }
        ]
      });
    }

    // Call OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an eco-coach. Return a JSON object containing an array called 'suggestions' with 2 highly specific, actionable eco-friendly tasks. Each object must have: 'id' (number), 'title' (string, max 5 words), 'impact' (string, e.g., 'Saves X kg CO₂'), 'points' (number between 10 and 60), and 'diff' (string: 'Easy', 'Medium', or 'Hard')."
          }
        ],
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    
    // Parse the strict JSON output
    const parsedContent = JSON.parse(data.choices[0].message.content);
    
    return NextResponse.json(parsedContent);

  } catch (error) {
    return NextResponse.json({ error: "Failed to generate AI suggestions" }, { status: 500 });
  }
}
