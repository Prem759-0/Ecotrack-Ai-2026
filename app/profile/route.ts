import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, transport, diet } = body;

    // A very rough logic engine to calculate an emission score based on inputs
    let totalEmission = 100; 
    if (transport === "bike") totalEmission -= 40;
    if (transport === "public") totalEmission -= 20;
    if (diet === "vegan") totalEmission -= 30;
    if (diet === "vegetarian") totalEmission -= 20;

    // 1. Find the user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 2. Perform the database updates in a strict sequence
    await prisma.carbonEntry.create({
      data: {
        userId: user.id,
        transportEmission: transport === "car" ? 50 : 10,
        foodEmission: diet === "meat" ? 50 : 20,
        energyEmission: 0,
        totalEmission: totalEmission
      }
    });

    // Award 100 points for completing the setup!
    await prisma.points.update({
      where: { userId: user.id },
      data: { totalPoints: { increment: 100 } }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
