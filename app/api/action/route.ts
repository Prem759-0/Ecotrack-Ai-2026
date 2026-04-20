import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, points } = body;

    if (!userId || !points) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Update the points ledger securely
    const updatedPoints = await prisma.points.update({
      where: { userId: userId },
      data: {
        totalPoints: { increment: points },
        lastActiveAt: new Date()
      }
    });

    return NextResponse.json({ success: true, updatedPoints });
  } catch (error) {
    return NextResponse.json({ error: "Database transaction failed" }, { status: 500 });
  }
}
