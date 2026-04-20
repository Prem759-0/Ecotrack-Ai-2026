import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const { userId, points } = await req.json();
    if (!userId || !points) return NextResponse.json({ error: "Missing data" }, { status: 400 });

    const updatedPoints = await prisma.points.update({
      where: { userId: userId },
      data: { totalPoints: { increment: points }, lastActiveAt: new Date() }
    });
    return NextResponse.json({ success: true, updatedPoints });
  } catch (error) { return NextResponse.json({ error: "Transaction failed" }, { status: 500 }); }
}
