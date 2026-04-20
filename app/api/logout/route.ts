import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // Delete the secure session cookie
  cookies().delete("ecotrack_session");
  return NextResponse.json({ success: true });
}
