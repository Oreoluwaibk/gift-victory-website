import type { Guest } from "@/lib/guest-store";
import { buildCheckInUrl } from "@/lib/site-url";

function toWhatsAppDigits(phone: string): string | null {
  let digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.startsWith("0") && digits.length >= 10) {
    digits = `234${digits.slice(1)}`;
  }
  if (digits.length < 10 || digits.length > 15) return null;
  return digits;
}

export function buildWhatsAppText(guest: Guest): string {
  return [
    "My Perfect Love wedding check-in pass",
    `Code: ${guest.code}`,
    "Save this image and show the QR code to the ushers at the venue.",
    "Do not open the check-in link yourself — only the usher should scan your QR.",
  ].join("\n");
}

export function buildWhatsAppHref(guest: Guest): string {
  const text = buildWhatsAppText(guest);
  const digits = toWhatsAppDigits(guest.phone);

  return digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
    : `https://wa.me/?text=${encodeURIComponent(text)}`;
}

async function dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type || "image/png" });
}

/** Share QR image via the device share sheet (WhatsApp on mobile). Falls back to wa.me link. */
export async function shareQrToWhatsApp(
  qrDataUrl: string,
  guest: Guest,
  checkInUrl: string
): Promise<"shared" | "fallback"> {
  const text = buildWhatsAppText(guest);
  const filename = `perfect-love-pass-${guest.code}.png`;

  try {
    const file = await dataUrlToFile(qrDataUrl, filename);
    const shareData: ShareData = {
      title: "Wedding QR Pass",
      text,
      files: [file],
    };

    if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
      await navigator.share(shareData);
      return "shared";
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return "shared";
    }
  }

  window.open(buildWhatsAppHref(guest), "_blank", "noopener,noreferrer");
  return "fallback";
}

export function getClientCheckInUrl(code: string): string {
  if (typeof window !== "undefined") {
    return buildCheckInUrl(code, window.location.origin);
  }
  return buildCheckInUrl(code);
}
