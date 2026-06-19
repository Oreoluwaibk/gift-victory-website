/**
 * Resend env vars must live in `.env.local` (local) or Netlify env settings (production).
 * `.env.example` is documentation only — Next.js does not load it.
 */
export function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const legacyPublicKey = process.env.NEXT_PUBLIC_RESEND_API_KEY?.trim();
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();
  const legacyPublicFrom = process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL?.trim();

  if (!apiKey && legacyPublicKey) {
    return {
      apiKey: null as string | null,
      fromEmail: fromEmail ?? legacyPublicFrom ?? null,
      setupError:
        "Found NEXT_PUBLIC_RESEND_API_KEY, but the server reads RESEND_API_KEY. " +
        "Rename the variable in .env.local and Netlify (never use NEXT_PUBLIC_ for secret keys).",
    };
  }

  return {
    apiKey: apiKey ?? null,
    fromEmail:
      fromEmail ??
      legacyPublicFrom ??
      "Perfect Love Wedding <onboarding@resend.dev>",
    setupError: apiKey
      ? null
      : "Missing RESEND_API_KEY. Add it to .env.local locally or Netlify environment variables.",
  } as const;
}

export function formatResendError(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("only send testing emails to your own email")) {
    return (
      "Resend test mode: with onboarding@resend.dev you can only send to the email " +
      "address on your Resend account. RSVP with that email to test, or verify a custom domain."
    );
  }

  if (lower.includes("domain is not verified") || lower.includes("not verified")) {
    return (
      "The sender domain is not verified in Resend. Use onboarding@resend.dev for testing " +
      "or verify your domain at resend.com/domains."
    );
  }

  if (lower.includes("invalid from") || lower.includes("from address")) {
    return (
      "Invalid RESEND_FROM_EMAIL format. Use: Perfect Love Wedding <onboarding@resend.dev>"
    );
  }

  return message;
}
