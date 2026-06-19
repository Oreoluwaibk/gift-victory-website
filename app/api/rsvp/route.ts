import { NextResponse } from "next/server";
import { sendQrPassEmail } from "@/lib/email/send-qr-pass";
import { createGuest, DuplicateGuestError } from "@/lib/guest-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.fullName?.trim() || !body.email?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { error: "Full name, email, and phone are required." },
        { status: 400 }
      );
    }

    const guestsCount = Number(body.guestsCount);
    if (!guestsCount || guestsCount < 1 || guestsCount > 10) {
      return NextResponse.json(
        { error: "Guest count must be between 1 and 10." },
        { status: 400 }
      );
    }

    const guest = await createGuest({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      guestsCount,
      dietaryNotes: body.dietaryNotes,
      message: body.message,
    });

    const emailResult = await sendQrPassEmail(guest);

    return NextResponse.json({
      guest,
      alreadyRegistered: false,
      emailSent: emailResult.sent,
      emailError: emailResult.error,
    });
  } catch (err) {
    if (err instanceof DuplicateGuestError) {
      return NextResponse.json(
        {
          error: err.message,
          guest: err.guest,
          alreadyRegistered: true,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Unable to process RSVP. Please try again." },
      { status: 500 }
    );
  }
}
