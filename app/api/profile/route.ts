import { NextResponse } from "next/server";
import prisma from "../../../lib/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    // 1. Identify the user securely from the cookie, NOT the frontend request
    const cookieStore = cookies();
    const sessionId = cookieStore.get("ecotrack_session")?.value;

    if (!sessionId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { transport, diet } = body;

    let totalEmission = 100; 
    if (transport === "bike") totalEmission -= 40;
    if (transport === "public") totalEmission -= 20;
    if (diet === "vegan") totalEmission -= 30;
    if (diet === "vegetarian") totalEmission -= 20;

    // 2. Perform updates using the secure sessionId
    await prisma.carbonEntry.create({
      data: {
        userId: sessionId,
        transportEmission: transport === "car" ? 50 : 10,
        foodEmission: diet === "meat" ? 50 : 20,
        energyEmission: 0,
        totalEmission: totalEmission
      }
    });

    // Award 100 points
    await prisma.points.update({
      where: { userId: sessionId },
      data: { totalPoints: { increment: 100 } }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
