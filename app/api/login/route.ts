import { NextResponse } from "next/server";
import prisma from "../../../lib/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email input" }, { status: 400 });
    }

    // Safely find or create the user in the database
    const user = await prisma.user.upsert({
      where: { email: email.toLowerCase() },
      update: {}, // If they exist, do nothing
      create: {
        email: email.toLowerCase(),
        name: name || "Eco Warrior",
        points: {
          create: { totalPoints: 0, streakDays: 1, lastActiveAt: new Date() }
        }
      }
    });

    // Set a secure HTTP-only cookie with the user ID
    cookies().set("ecotrack_session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}
