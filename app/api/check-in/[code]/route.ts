import { NextResponse } from "next/server";
import { checkInGuest } from "@/lib/guest-store";

type RouteContext = {
  params: Promise<{ code: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  try {
    const { code } = await context.params;

    if (!code?.trim()) {
      return NextResponse.json({ error: "Invalid code." }, { status: 400 });
    }

    const guest = await checkInGuest(code.trim());

    if (!guest) {
      return NextResponse.json({ error: "Guest not found." }, { status: 404 });
    }

    return NextResponse.json({ guest });
  } catch {
    return NextResponse.json(
      { error: "Unable to verify guest." },
      { status: 500 }
    );
  }
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { code } = await context.params;
    const { getGuestByCode } = await import("@/lib/guest-store");
    const guest = await getGuestByCode(code.trim());

    if (!guest) {
      return NextResponse.json({ error: "Guest not found." }, { status: 404 });
    }

    return NextResponse.json({ guest });
  } catch {
    return NextResponse.json(
      { error: "Unable to look up guest." },
      { status: 500 }
    );
  }
}
