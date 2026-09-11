import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listGuests } from "@/lib/guest-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const guests = await listGuests();

    return NextResponse.json({
      count: guests.length,
      guests: guests.map((guest) => ({
        id: guest.id,
        fullName: guest.fullName,
        phone: guest.phone,
        email: guest.email,
        registeredAt: guest.registeredAt,
        checkedInAt: guest.checkedInAt,
      })),
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to load guest registrations." },
      { status: 500 }
    );
  }
}
