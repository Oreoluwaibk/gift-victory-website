import QRCode from "qrcode";
import { Resend } from "resend";
import type { Guest } from "@/lib/guest-store";
import { wedding } from "@/lib/wedding-data";

export type SendQrEmailResult = {
  sent: boolean;
  error?: string;
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function getFromAddress() {
  return (
    process.env.RESEND_FROM_EMAIL ??
    "Perfect Love Wedding <onboarding@resend.dev>"
  );
}

export async function sendQrPassEmail(guest: Guest): Promise<SendQrEmailResult> {
  const resend = getResendClient();
  if (!resend) {
    return {
      sent: false,
      error: "Email service is not configured (missing RESEND_API_KEY).",
    };
  }

  const checkInUrl = `${wedding.siteUrl}/check-in/${guest.code}`;
  const qrBuffer = await QRCode.toBuffer(checkInUrl, {
    width: 400,
    margin: 2,
    color: { dark: "#4a148c", light: "#ffffff" },
  });

  try {
    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to: guest.email,
      subject: `Your QR Pass — ${wedding.groom.shortName} & ${wedding.bride.shortName}'s Wedding`,
      html: buildEmailHtml(guest, checkInUrl),
      attachments: [
        {
          filename: `perfect-love-pass-${guest.code}.png`,
          content: qrBuffer,
        },
      ],
    });

    if (error) {
      return { sent: false, error: error.message };
    }

    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    return { sent: false, error: message };
  }
}

function buildEmailHtml(guest: Guest, checkInUrl: string): string {
  const firstName = guest.fullName.split(" ")[0];

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background:#fafafa;font-family:Georgia,'Times New Roman',serif;color:#1a1025;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:32px 16px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #e8dff0;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(135deg,#4a148c,#6a1b9a);padding:32px 24px;text-align:center;">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.25em;text-transform:uppercase;color:#ce93d8;">${wedding.hashtag}</p>
                <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;">You're Confirmed!</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 24px;">
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#5c4a6e;">
                  Dear ${firstName},
                </p>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#5c4a6e;">
                  Thank you for confirming your attendance at the wedding of
                  <strong style="color:#4a148c;">${wedding.groom.name}</strong> and
                  <strong style="color:#4a148c;">${wedding.bride.name}</strong>.
                  Your personal QR pass is attached — please save it and present it at the venue for check-in.
                </p>

                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3eef8;border-radius:16px;margin-bottom:24px;">
                  <tr>
                    <td style="padding:20px;">
                      <p style="margin:0 0 8px;font-size:13px;color:#5c4a6e;">Guest name</p>
                      <p style="margin:0 0 16px;font-size:16px;font-weight:600;color:#1a1025;">${guest.fullName}</p>
                      <p style="margin:0 0 8px;font-size:13px;color:#5c4a6e;">Party size</p>
                      <p style="margin:0;font-size:16px;font-weight:600;color:#1a1025;">${guest.guestsCount} ${guest.guestsCount === 1 ? "guest" : "guests"}</p>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 12px;font-size:14px;color:#5c4a6e;">Or open your pass directly:</p>
                <a href="${checkInUrl}" style="display:inline-block;background:#4a148c;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:999px;font-size:14px;font-weight:600;">
                  View Check-in Pass
                </a>

                <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#9c4dcc;text-align:center;">
                  With love,<br />${wedding.groom.shortName} & ${wedding.bride.shortName}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}
