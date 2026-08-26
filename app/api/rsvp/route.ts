import { NextResponse } from "next/server";
import { sendQrPassEmail } from "@/lib/email/send-qr-pass";
import { sendQrPassWhatsApp } from "@/lib/whatsapp/send-qr-pass";
import { createGuest, DuplicateGuestError } from "@/lib/guest-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.fullName?.trim() || !body.email?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { error: "Full name, email, and WhatsApp number are required." },
        { status: 400 }
      );
    }

    if (!body.message?.trim()) {
      return NextResponse.json(
        { error: "A message to the couple is required." },
        { status: 400 }
      );
    }

    const guest = await createGuest({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      guestsCount: 1,
      dietaryNotes: body.dietaryNotes,
      message: body.message,
    });

    const [emailResult, whatsappResult] = await Promise.all([
      sendQrPassEmail(guest),
      sendQrPassWhatsApp(guest),
    ]);

    return NextResponse.json({
      guest,
      alreadyRegistered: false,
      emailSent: emailResult.sent,
      emailError: emailResult.error,
      whatsappSent: whatsappResult.sent,
      whatsappError: whatsappResult.error,
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
