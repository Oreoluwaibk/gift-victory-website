"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import { Download, Loader2, MessageCircle, QrCode } from "lucide-react";
import type { Guest } from "@/lib/guest-store";
import { generateQrPassImage } from "@/lib/qr-pass-image";
import {
  getClientCheckInUrl,
  shareQrToWhatsApp,
} from "@/lib/share-qr-whatsapp";

type GuestQrCardProps = {
  guest: Guest;
  alreadyRegistered?: boolean;
  promptWhatsApp?: boolean;
};

export function GuestQrCard({
  guest,
  alreadyRegistered,
  promptWhatsApp = false,
}: GuestQrCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [passImageUrl, setPassImageUrl] = useState<string>("");
  const [sharingWhatsApp, setSharingWhatsApp] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [checkInUrl, setCheckInUrl] = useState(() => getClientCheckInUrl(guest.code));
  const whatsappPrompted = useRef(false);

  useEffect(() => {
    setCheckInUrl(getClientCheckInUrl(guest.code));
  }, [guest.code]);

  useEffect(() => {
    QRCode.toDataURL(checkInUrl, {
      width: 400,
      margin: 2,
      color: { dark: "#4a148c", light: "#ffffff" },
    }).then(setQrDataUrl);
  }, [checkInUrl]);

  useEffect(() => {
    if (!checkInUrl) return;
    generateQrPassImage({
      guestName: guest.fullName,
      code: guest.code,
      checkInUrl,
    }).then(setPassImageUrl);
  }, [checkInUrl, guest.fullName, guest.code]);

  const shareImageUrl = passImageUrl || qrDataUrl;

  const sendToWhatsApp = async () => {
    if (!shareImageUrl) return;
    setSharingWhatsApp(true);
    try {
      await shareQrToWhatsApp(shareImageUrl, guest, checkInUrl);
    } finally {
      setSharingWhatsApp(false);
    }
  };

  useEffect(() => {
    if (!promptWhatsApp || !shareImageUrl || whatsappPrompted.current) return;
    whatsappPrompted.current = true;
    void sendToWhatsApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptWhatsApp, shareImageUrl]);

  const downloadQr = async () => {
    if (!shareImageUrl) return;
    setDownloading(true);
    try {
      const imageUrl =
        passImageUrl ||
        (await generateQrPassImage({
          guestName: guest.fullName,
          code: guest.code,
          checkInUrl,
        }));

      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `perfect-love-pass-${guest.code}.png`;
      link.click();
    } finally {
      setDownloading(false);
    }
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
            You have already confirmed with this email. Save or download your
            existing QR pass below for check-in at the venue.
          </>
        ) : (
          <>
            Tap WhatsApp to send your pass image to{" "}
            <span className="font-medium text-foreground">{guest.phone}</span>,
            or download it below. Each link works only once at the venue.
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
        <p className="mt-2 max-w-[280px] break-all text-center text-xs text-muted-foreground">
          {checkInUrl}
        </p>
      </div>

      <div className="mb-6 rounded-xl bg-muted/60 p-4 text-sm leading-relaxed text-muted-foreground">
        <p className="font-medium text-foreground">How to use your pass</p>
        <ol className="mt-2 list-decimal space-y-1 pl-4">
          <li>Download or save the pass image on your phone.</li>
          <li>Show the QR code to the ushers when you arrive.</li>
          <li>Your check-in link works only once — keep it private.</li>
        </ol>
      </div>

      <div className="space-y-2 rounded-xl bg-muted/60 p-4 text-sm">
        <p>
          <span className="text-muted-foreground">Guest:</span>{" "}
          <span className="font-medium">{guest.fullName}</span>
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={sendToWhatsApp}
          disabled={!shareImageUrl || sharingWhatsApp}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-purple-deep px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-rich disabled:opacity-50"
        >
          {sharingWhatsApp ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MessageCircle className="h-4 w-4" />
          )}
          Send QR to WhatsApp
        </button>
        <button
          type="button"
          onClick={downloadQr}
          disabled={!shareImageUrl || downloading}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:border-purple-soft hover:text-purple-rich disabled:opacity-50"
        >
          {downloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Download Pass
        </button>
      </div>
    </motion.div>
  );
}
