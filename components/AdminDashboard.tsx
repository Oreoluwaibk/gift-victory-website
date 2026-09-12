"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Users, X } from "lucide-react";
import type { Guest } from "@/lib/guest-store";

type AdminDashboardProps = {
  guests: Guest[];
};

function formatDate(value: string | null): string {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function DetailRow({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-foreground">{value || "—"}</p>
    </div>
  );
}

function GuestDetailModal({
  guest,
  onClose,
}: {
  guest: Guest;
  onClose: () => void;
}) {
  const checkInUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/check-in/${encodeURIComponent(guest.code)}`
      : `/check-in/${encodeURIComponent(guest.code)}`;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="card-surface relative my-auto w-full max-w-lg rounded-3xl p-6 sm:p-8"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guest-detail-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition hover:border-purple-soft"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 pr-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-rich">
            Guest details
          </p>
          <h2 id="guest-detail-title" className="mt-2 font-display text-2xl font-semibold">
            {guest.fullName}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {guest.checkedInAt ? "Checked in" : "Registered"} ·{" "}
            {formatDate(guest.registeredAt)}
          </p>
        </div>

        <div className="space-y-4 rounded-2xl bg-muted/40 p-4">
          <DetailRow label="Full name" value={guest.fullName} />
          <DetailRow label="Email" value={guest.email} />
          <DetailRow label="Phone / WhatsApp" value={guest.phone} />
          <DetailRow label="QR code" value={guest.code} />
          <DetailRow
            label="Check-in link"
            value={checkInUrl}
            className="break-all"
          />
          <DetailRow label="Dietary notes" value={guest.dietaryNotes} />
          <DetailRow label="Message to the couple" value={guest.message} />
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailRow label="Registered" value={formatDate(guest.registeredAt)} />
            <DetailRow label="Checked in" value={formatDate(guest.checkedInAt)} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AdminDashboard({ guests }: AdminDashboardProps) {
  const router = useRouter();
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-rich">
              Admin
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold">RSVP Registrations</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Click a guest to view full details.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:border-purple-soft hover:text-purple-rich"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>

        <div className="card-surface mb-8 rounded-3xl p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-deep/10 text-purple-rich">
              <Users className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">Total registered</p>
              <p className="font-display text-4xl font-bold">{guests.length}</p>
            </div>
          </div>
        </div>

        <div className="card-surface overflow-hidden rounded-3xl">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold sm:px-6">Name</th>
                  <th className="px-4 py-3 font-semibold sm:px-6">Phone</th>
                  <th className="hidden px-4 py-3 font-semibold md:table-cell sm:px-6">
                    Email
                  </th>
                  <th className="hidden px-4 py-3 font-semibold lg:table-cell sm:px-6">
                    Registered
                  </th>
                  <th className="px-4 py-3 font-semibold sm:px-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {guests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-muted-foreground sm:px-6"
                    >
                      No registrations yet.
                    </td>
                  </tr>
                ) : (
                  guests.map((guest) => (
                    <tr
                      key={guest.id}
                      onClick={() => setSelectedGuest(guest)}
                      className="cursor-pointer border-b border-border transition hover:bg-muted/40 last:border-0"
                    >
                      <td className="px-4 py-4 font-medium sm:px-6">{guest.fullName}</td>
                      <td className="px-4 py-4 sm:px-6">{guest.phone}</td>
                      <td className="hidden px-4 py-4 md:table-cell sm:px-6">
                        {guest.email}
                      </td>
                      <td className="hidden px-4 py-4 lg:table-cell sm:px-6">
                        {formatDate(guest.registeredAt)}
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        {guest.checkedInAt ? (
                          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-400">
                            Checked in
                          </span>
                        ) : (
                          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                            Registered
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedGuest && (
              <GuestDetailModal
                key={selectedGuest.id}
                guest={selectedGuest}
                onClose={() => setSelectedGuest(null)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
