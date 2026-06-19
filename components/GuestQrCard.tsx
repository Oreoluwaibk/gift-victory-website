"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import { Download, Mail, QrCode } from "lucide-react";
import type { Guest } from "@/lib/guest-store";
import { wedding } from "@/lib/wedding-data";

type GuestQrCardProps = {
  guest: Guest;
  emailSent?: boolean;
  emailError?: string;
};

export function GuestQrCard({ guest, emailSent, emailError }: GuestQrCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const checkInUrl = `${wedding.siteUrl}/check-in/${guest.code}`;

  useEffect(() => {
    QRCode.toDataURL(checkInUrl, {
      width: 280,
      margin: 2,
      color: { dark: "#4a148c", light: "#ffffff" },
    }).then(setQrDataUrl);
  }, [checkInUrl]);

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
        {emailSent ? (
          <>
            Your QR pass has been sent to{" "}
            <span className="font-medium text-foreground">{guest.email}</span>.
            You can also save it below. Present it at the venue for seamless
            check-in.
          </>
        ) : (
          <>
            Save this QR code below.{" "}
            {emailError ? (
              <span className="block mt-2 text-amber-600 dark:text-amber-400">
                We couldn&apos;t email your pass automatically ({emailError}).
                Please download it or use the button below.
              </span>
            ) : (
              <>
                It will be sent to{" "}
                <span className="font-medium text-foreground">{guest.email}</span>.
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
        <p>
          <span className="text-muted-foreground">Party size:</span>{" "}
          <span className="font-medium">{guest.guestsCount}</span>
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={downloadQr}
          disabled={!qrDataUrl}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-purple-deep px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-rich disabled:opacity-50"
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
