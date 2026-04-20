import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET() {
  try {
    const user = await prisma.user.upsert({
      where: { email: "test@eco.com" },
      update: {},
      create: {
        email: "test@eco.com",
        name: "Test User",
        points: {
          create: {
            totalPoints: 150,
            streakDays: 3,
            lastActiveAt: new Date()
          }
        }
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Test user created! You can now view the dashboard.", 
      user 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Database not connected yet." }, { status: 500 });
  }
}
