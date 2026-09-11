import { NextResponse } from "next/server";
import {
  clearAdminSessionCookie,
  createAdminSessionCookie,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const session = createAdminSessionCookie();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(session.name, session.value, session.options);
    return response;
  } catch {
    return NextResponse.json(
      { error: "Admin login is not configured." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const session = clearAdminSessionCookie();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(session.name, session.value, session.options);
  return response;
}
