"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { GuestQrCard } from "@/components/GuestQrCard";
import { FadeIn } from "@/components/PageTransition";
import type { Guest } from "@/lib/guest-store";
import { wedding } from "@/lib/wedding-data";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  guestsCount: number;
  dietaryNotes: string;
  message: string;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  guestsCount: 1,
  dietaryNotes: "",
  message: "",
};

export default function RsvpPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [guest, setGuest] = useState<Guest | null>(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAlreadyRegistered(false);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 409 && data.alreadyRegistered) {
        setGuest(data.guest);
        setAlreadyRegistered(true);
        return;
      }

      if (!res.ok) {
        throw new Error(data.error ?? "Registration failed");
      }

      setGuest(data.guest);
      setAlreadyRegistered(false);
      setEmailSent(Boolean(data.emailSent));
      setEmailError(data.emailError);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (guest) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <FadeIn className="mb-8 text-center">
          <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-purple-rich" />
          <h1 className="font-display text-4xl font-bold">
            {alreadyRegistered ? "Already Confirmed!" : "You're on the list!"}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {alreadyRegistered
              ? `This email has already been used to RSVP. Here is your existing pass, ${guest.fullName.split(" ")[0]}.`
              : `Thank you for confirming your attendance, ${guest.fullName.split(" ")[0]}.`}
          </p>
        </FadeIn>
        <GuestQrCard
          guest={guest}
          emailSent={emailSent}
          emailError={emailError}
          alreadyRegistered={alreadyRegistered}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <FadeIn className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-rich">
          Reserve Your Seat
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">RSVP</h1>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Kindly confirm your attendance for the wedding of {wedding.groom.name}{" "}
          and {wedding.bride.name} on {wedding.dateDisplay}. Each email can only
          RSVP once — you&apos;ll receive a unique QR pass for check-in at the venue.
        </p>
      </FadeIn>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="card-surface space-y-5 rounded-3xl p-6 sm:p-8"
      >
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium">
            Full name *
          </label>
          <input
            id="fullName"
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple-soft focus:ring-2 focus:ring-purple-soft/20"
            placeholder="Your full name"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple-soft focus:ring-2 focus:ring-purple-soft/20"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
              Phone *
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple-soft focus:ring-2 focus:ring-purple-soft/20"
              placeholder="+234 ..."
            />
          </div>
        </div>

        <div>
          <label htmlFor="guestsCount" className="mb-1.5 block text-sm font-medium">
            Number of guests (including you) *
          </label>
          <select
            id="guestsCount"
            value={form.guestsCount}
            onChange={(e) =>
              setForm({ ...form, guestsCount: Number(e.target.value) })
            }
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple-soft focus:ring-2 focus:ring-purple-soft/20"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dietaryNotes" className="mb-1.5 block text-sm font-medium">
            Dietary requirements
          </label>
          <input
            id="dietaryNotes"
            value={form.dietaryNotes}
            onChange={(e) => setForm({ ...form, dietaryNotes: e.target.value })}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple-soft focus:ring-2 focus:ring-purple-soft/20"
            placeholder="Allergies, vegetarian, etc."
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
            Message to the couple
          </label>
          <textarea
            id="message"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-purple-soft focus:ring-2 focus:ring-purple-soft/20"
            placeholder="Share your warm wishes..."
          />
        </div>

        {error && (
          <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-purple-deep px-6 py-4 text-sm font-semibold text-white transition hover:bg-purple-rich disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Confirm Attendance
            </>
          )}
        </button>
      </motion.form>
    </main>
  );
}
