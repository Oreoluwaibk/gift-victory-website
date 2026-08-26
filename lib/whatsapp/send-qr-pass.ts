import QRCode from "qrcode";
import type { Guest } from "@/lib/guest-store";
import { wedding } from "@/lib/wedding-data";
import {
  formatWhatsAppError,
  getWhatsAppConfig,
  toWhatsAppDigits,
} from "./config";

const GRAPH_API = "https://graph.facebook.com/v21.0";

export type SendQrWhatsAppResult = {
  sent: boolean;
  error?: string;
  messageId?: string;
};

type GraphErrorBody = {
  error?: { message?: string; code?: number; error_data?: { details?: string } };
};

export async function sendQrPassWhatsApp(
  guest: Guest
): Promise<SendQrWhatsAppResult> {
  const { accessToken, phoneNumberId, templateName, templateLanguage, setupError } =
    getWhatsAppConfig();

  if (!accessToken || !phoneNumberId || setupError) {
    return {
      sent: false,
      error: setupError ?? "WhatsApp is not configured.",
    };
  }

  const to = toWhatsAppDigits(guest.phone);
  if (!to) {
    return {
      sent: false,
      error:
        "Invalid phone number. Include your country code (e.g. +234…) so we can WhatsApp your pass.",
    };
  }

  const checkInUrl = `${wedding.siteUrl}/check-in/${guest.code}`;
  const firstName = guest.fullName.split(" ")[0];
  const caption = buildCaption(firstName, checkInUrl);

  try {
    if (templateName) {
      return await sendTemplateMessage({
        accessToken,
        phoneNumberId,
        to,
        templateName,
        templateLanguage,
        firstName,
        checkInUrl,
      });
    }

    return await sendImageMessage({
      accessToken,
      phoneNumberId,
      to,
      guest,
      checkInUrl,
      caption,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send WhatsApp";
    console.error("[whatsapp] unexpected error:", err);
    return { sent: false, error: formatWhatsAppError(message) };
  }
}

function buildCaption(firstName: string, checkInUrl: string): string {
  return [
    `Dear ${firstName},`,
    "",
    `You're confirmed for ${wedding.groom.shortName} & ${wedding.bride.shortName}'s wedding.`,
    "Your personal QR pass is attached — please save it and present it at the venue for check-in.",
    "",
    `Or open your pass: ${checkInUrl}`,
    "",
    `With love,`,
    `${wedding.groom.shortName} & ${wedding.bride.shortName}`,
    wedding.hashtag,
  ].join("\n");
}

async function sendTemplateMessage(opts: {
  accessToken: string;
  phoneNumberId: string;
  to: string;
  templateName: string;
  templateLanguage: string;
  firstName: string;
  checkInUrl: string;
}): Promise<SendQrWhatsAppResult> {
  const payload = {
    messaging_product: "whatsapp",
    to: opts.to,
    type: "template",
    template: {
      name: opts.templateName,
      language: { code: opts.templateLanguage },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: opts.firstName },
            { type: "text", text: opts.checkInUrl },
          ],
        },
      ],
    },
  };

  const result = await postMessage(opts.phoneNumberId, opts.accessToken, payload);
  return result;
}

async function sendImageMessage(opts: {
  accessToken: string;
  phoneNumberId: string;
  to: string;
  guest: Guest;
  checkInUrl: string;
  caption: string;
}): Promise<SendQrWhatsAppResult> {
  const qrBuffer = await QRCode.toBuffer(opts.checkInUrl, {
    width: 400,
    margin: 2,
    color: { dark: "#4a148c", light: "#ffffff" },
  });

  const mediaId = await uploadQrMedia(
    opts.accessToken,
    opts.phoneNumberId,
    qrBuffer,
    `perfect-love-pass-${opts.guest.code}.png`
  );

  if (!mediaId.ok) {
    return { sent: false, error: mediaId.error };
  }

  const payload = {
    messaging_product: "whatsapp",
    to: opts.to,
    type: "image",
    image: {
      id: mediaId.id,
      caption: opts.caption.slice(0, 1024),
    },
  };

  return postMessage(opts.phoneNumberId, opts.accessToken, payload);
}

async function uploadQrMedia(
  accessToken: string,
  phoneNumberId: string,
  qrBuffer: Buffer,
  filename: string
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const form = new FormData();
  form.append("messaging_product", "whatsapp");
  form.append("type", "image/png");
  form.append(
    "file",
    new Blob([new Uint8Array(qrBuffer)], { type: "image/png" }),
    filename
  );

  const res = await fetch(`${GRAPH_API}/${phoneNumberId}/media`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: form,
  });

  const body = (await res.json()) as GraphErrorBody & { id?: string };

  if (!res.ok || !body.id) {
    const raw =
      body.error?.error_data?.details ||
      body.error?.message ||
      `Media upload failed (${res.status})`;
    console.error("[whatsapp] media upload failed:", body);
    return { ok: false, error: formatWhatsAppError(raw) };
  }

  return { ok: true, id: body.id };
}

async function postMessage(
  phoneNumberId: string,
  accessToken: string,
  payload: Record<string, unknown>
): Promise<SendQrWhatsAppResult> {
  const res = await fetch(`${GRAPH_API}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = (await res.json()) as GraphErrorBody & {
    messages?: Array<{ id?: string }>;
  };

  if (!res.ok) {
    const raw =
      body.error?.error_data?.details ||
      body.error?.message ||
      `WhatsApp send failed (${res.status})`;
    console.error("[whatsapp] send failed:", body);
    return { sent: false, error: formatWhatsAppError(raw) };
  }

  return { sent: true, messageId: body.messages?.[0]?.id };
}
