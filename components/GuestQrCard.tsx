"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import { Download, Mail, MessageCircle, QrCode } from "lucide-react";
import type { Guest } from "@/lib/guest-store";
import { wedding } from "@/lib/wedding-data";

type GuestQrCardProps = {
  guest: Guest;
  emailSent?: boolean;
  emailError?: string;
  alreadyRegistered?: boolean;
  promptWhatsApp?: boolean;
};

function toWhatsAppDigits(phone: string): string | null {
  let digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.startsWith("0") && digits.length >= 10) {
    digits = `234${digits.slice(1)}`;
  }
  if (digits.length < 10 || digits.length > 15) return null;
  return digits;
}

function buildWhatsAppHref(guest: Guest, checkInUrl: string): string {
  const whatsappDigits = toWhatsAppDigits(guest.phone);
  const whatsappShareText = [
    `My Perfect Love wedding check-in pass`,
    checkInUrl,
    `Code: ${guest.code}`,
  ].join("\n");

  return whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(whatsappShareText)}`
    : `https://wa.me/?text=${encodeURIComponent(whatsappShareText)}`;
}

export function GuestQrCard({
  guest,
  emailSent,
  emailError,
  alreadyRegistered,
  promptWhatsApp = false,
}: GuestQrCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const whatsappOpened = useRef(false);
  const checkInUrl = `${wedding.siteUrl}/check-in/${guest.code}`;
  const whatsappHref = buildWhatsAppHref(guest, checkInUrl);

  useEffect(() => {
    QRCode.toDataURL(checkInUrl, {
      width: 280,
      margin: 2,
      color: { dark: "#4a148c", light: "#ffffff" },
    }).then(setQrDataUrl);
  }, [checkInUrl]);

  useEffect(() => {
    if (!promptWhatsApp || whatsappOpened.current) return;
    whatsappOpened.current = true;
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  }, [promptWhatsApp, whatsappHref]);

  const downloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `perfect-love-rsvp-${guest.code}.png`;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card-surface mx-auto max-w-md rounded-3xl p-6 sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3 text-purple-rich">
        <QrCode className="h-6 w-6" />
        <h3 className="font-display text-2xl font-semibold">Your Entry Pass</h3>
      </div>

      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        {alreadyRegistered ? (
          <>
            You have already confirmed with{" "}
            <span className="font-medium text-foreground">{guest.email}</span>.
            Save or download your existing QR pass below for check-in at the venue.
          </>
        ) : (
          <>
            {emailSent ? (
              <>
                Your QR pass has been emailed to{" "}
                <span className="font-medium text-foreground">{guest.email}</span>.
                Tap WhatsApp below to save it to{" "}
                <span className="font-medium text-foreground">{guest.phone}</span>{" "}
                as well.
              </>
            ) : emailError ? (
              <>
                We couldn&apos;t email your pass ({emailError}). Use WhatsApp or
                download below to save it.
              </>
            ) : (
              <>
                Save your QR pass below. Tap WhatsApp to send it to{" "}
                <span className="font-medium text-foreground">{guest.phone}</span>.
              </>
            )}{" "}
            Present it at the venue for seamless check-in.
          </>
        )}
      </p>

      <div className="mx-auto mb-6 flex w-fit flex-col items-center rounded-2xl border border-border bg-white p-4">
        {qrDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={qrDataUrl}
            alt={`QR code for ${guest.fullName}`}
            width={280}
            height={280}
            className="rounded-lg"
          />
        ) : (
          <div className="flex h-[280px] w-[280px] items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
            Generating QR…
          </div>
        )}
        <p className="mt-3 font-mono text-xs text-muted-foreground">{guest.code}</p>
      </div>

      <div className="space-y-2 rounded-xl bg-muted/60 p-4 text-sm">
        <p>
          <span className="text-muted-foreground">Guest:</span>{" "}
          <span className="font-medium">{guest.fullName}</span>
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-purple-deep px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-rich"
        >
          <MessageCircle className="h-4 w-4" />
          Send to WhatsApp
        </a>
        <button
          type="button"
          onClick={downloadQr}
          disabled={!qrDataUrl}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:border-purple-soft hover:text-purple-rich disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          Download QR
        </button>
        <a
          href={`mailto:${guest.email}?subject=${encodeURIComponent("Your Perfect Love Wedding QR Pass")}&body=${encodeURIComponent(`Your check-in link: ${checkInUrl}`)}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:border-purple-soft hover:text-purple-rich"
        >
          <Mail className="h-4 w-4" />
          Email Pass
        </a>
      </div>
    </motion.div>
  );
}
