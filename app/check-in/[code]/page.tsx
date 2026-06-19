"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FadeIn } from "@/components/PageTransition";
import type { Guest } from "@/lib/guest-store";
import { wedding } from "@/lib/wedding-data";

export default function CheckInPage() {
  const params = useParams<{ code: string }>();
  const code = params.code;
  const [loading, setLoading] = useState(true);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!code) return;

    fetch(`/api/check-in/${code}`, { method: "POST" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        setGuest(data.guest);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <Loader2 className="h-10 w-10 animate-spin text-purple-rich" />
      </main>
    );
  }

  if (notFound || !guest) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <FadeIn>
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h1 className="font-display text-3xl font-bold">Guest Not Found</h1>
          <p className="mt-3 text-muted-foreground">
            This QR code is not registered. Please RSVP first or contact the
            couple if you believe this is an error.
          </p>
          <Link
            href="/rsvp"
            className="mt-8 inline-flex rounded-full bg-purple-deep px-6 py-3 text-sm font-semibold text-white hover:bg-purple-rich"
          >
            RSVP Now
          </Link>
        </FadeIn>
      </main>
    );
  }

  const isCheckedIn = Boolean(guest.checkedInAt);

  return (
    <main className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <FadeIn className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
            isCheckedIn ? "bg-green-500/15 text-green-600" : "bg-purple-rich/15 text-purple-rich"
          }`}
        >
          {isCheckedIn ? (
            <CheckCircle2 className="h-10 w-10" />
          ) : (
            <UserCheck className="h-10 w-10" />
          )}
        </motion.div>

        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          {isCheckedIn ? "Welcome!" : "Guest Verified"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {isCheckedIn
            ? "You have been checked in successfully."
            : "Registration confirmed — enjoy the celebration!"}
        </p>
      </FadeIn>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-surface mt-8 space-y-4 rounded-3xl p-6 sm:p-8"
      >
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-deep text-lg font-bold text-white">
            {guest.fullName.charAt(0)}
          </div>
          <div>
            <p className="font-display text-xl font-semibold">{guest.fullName}</p>
            <p className="text-sm text-muted-foreground">{guest.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl bg-muted/60 p-4">
            <Users className="mb-2 h-5 w-5 text-purple-rich" />
            <p className="text-muted-foreground">Party size</p>
            <p className="text-lg font-semibold">{guest.guestsCount}</p>
          </div>
          <div className="rounded-xl bg-muted/60 p-4">
            <CheckCircle2 className="mb-2 h-5 w-5 text-purple-rich" />
            <p className="text-muted-foreground">Status</p>
            <p className="text-lg font-semibold">
              {isCheckedIn ? "Checked in" : "Registered"}
            </p>
          </div>
        </div>

        {guest.dietaryNotes && (
          <p className="text-sm">
            <span className="text-muted-foreground">Dietary notes:</span>{" "}
            {guest.dietaryNotes}
          </p>
        )}

        <p className="text-center text-xs text-muted-foreground">
          {wedding.groom.shortName} & {wedding.bride.shortName} · {wedding.hashtag}
        </p>
      </motion.div>
    </main>
  );
}
