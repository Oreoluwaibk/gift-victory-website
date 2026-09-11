"use client";

import { useRouter } from "next/navigation";
import { LogOut, Users } from "lucide-react";
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

export function AdminDashboard({ guests }: AdminDashboardProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-rich">
            Admin
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold">RSVP Registrations</h1>
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
                  <tr key={guest.id} className="border-b border-border last:border-0">
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
  );
}
