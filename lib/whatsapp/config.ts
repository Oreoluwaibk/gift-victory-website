/**
 * WhatsApp Cloud API env vars must live in `.env.local` (local) or Netlify env settings.
 * `.env.example` is documentation only — Next.js does not load it.
 *
 * Setup: Meta Developer → WhatsApp → API Setup
 * https://developers.facebook.com/docs/whatsapp/cloud-api/get-started
 */
export function getWhatsAppConfig() {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME?.trim();
  const templateLanguage =
    process.env.WHATSAPP_TEMPLATE_LANGUAGE?.trim() || "en";

  if (!accessToken && !phoneNumberId) {
    return {
      accessToken: null as string | null,
      phoneNumberId: null as string | null,
      templateName: templateName || null,
      templateLanguage,
      setupError:
        "Missing WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID. " +
        "Add them to .env.local or Netlify to send QR passes on WhatsApp.",
    } as const;
  }

  if (!accessToken || !phoneNumberId) {
    return {
      accessToken: accessToken ?? null,
      phoneNumberId: phoneNumberId ?? null,
      templateName: templateName || null,
      templateLanguage,
      setupError:
        "WhatsApp is partially configured. Set both WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID.",
    } as const;
  }

  return {
    accessToken,
    phoneNumberId,
    templateName: templateName || null,
    templateLanguage,
    setupError: null,
  } as const;
}

export function formatWhatsAppError(message: string): string {
  const lower = message.toLowerCase();

  if (
    lower.includes("not a valid whatsapp user") ||
    lower.includes("invalid phone") ||
    lower.includes("(#100)")
  ) {
    return "That phone number does not look like a valid WhatsApp account. Use country code, e.g. +234…";
  }

  if (
    lower.includes("template") ||
    lower.includes("132000") ||
    lower.includes("132001")
  ) {
    return (
      "WhatsApp template issue. Approve a template in Meta Business Manager and set WHATSAPP_TEMPLATE_NAME, " +
      "or message the guest first so a freeform reply is allowed."
    );
  }

  if (lower.includes("131047") || lower.includes("re-engagement")) {
    return (
      "WhatsApp only allows freeform messages within 24 hours of the guest messaging you. " +
      "Use an approved template (WHATSAPP_TEMPLATE_NAME) for RSVP confirmation messages."
    );
  }

  if (lower.includes("oauth") || lower.includes("access token") || lower.includes("190")) {
    return "WhatsApp access token is missing or expired. Generate a new token in Meta Developer settings.";
  }

  return message;
}

/** Digits-only international number for the Cloud API (no +). Defaults NG +234 for local 0… numbers. */
export function toWhatsAppDigits(
  phone: string,
  defaultCountryCode = "234"
): string | null {
  let digits = phone.replace(/\D/g, "");
  if (!digits) return null;

  if (digits.startsWith("0") && digits.length >= 10) {
    digits = defaultCountryCode + digits.slice(1);
  }

  if (digits.length < 10 || digits.length > 15) return null;
  return digits;
}
