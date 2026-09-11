import { getStore } from "@netlify/blobs";
import { nanoid } from "nanoid";
import { promises as fs } from "fs";
import path from "path";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  type GuestRow,
} from "@/lib/supabase/admin-client";

export type Guest = {
  id: string;
  code: string;
  fullName: string;
  email: string;
  phone: string;
  guestsCount: number;
  dietaryNotes: string;
  message: string;
  registeredAt: string;
  checkedInAt: string | null;
};

const STORE_NAME = "wedding-guests";
const LOCAL_FILE = path.join(process.cwd(), "data", "guests.json");

function rowToGuest(row: GuestRow): Guest {
  return {
    id: row.id,
    code: row.code,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    guestsCount: row.guests_count,
    dietaryNotes: row.dietary_notes,
    message: row.message,
    registeredAt: row.registered_at,
    checkedInAt: row.checked_in_at,
  };
}

function guestToRow(guest: Guest): GuestRow {
  return {
    id: guest.id,
    code: guest.code,
    full_name: guest.fullName,
    email: guest.email,
    phone: guest.phone,
    guests_count: guest.guestsCount,
    dietary_notes: guest.dietaryNotes,
    message: guest.message,
    registered_at: guest.registeredAt,
    checked_in_at: guest.checkedInAt,
  };
}

async function readLocalGuests(): Promise<Guest[]> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf-8");
    return JSON.parse(raw) as Guest[];
  } catch {
    return [];
  }
}

async function writeLocalGuests(guests: Guest[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(guests, null, 2));
}

async function readBlobGuests(): Promise<Guest[]> {
  const store = getStore(STORE_NAME);
  const data = await store.get("all-guests", { type: "json" });
  return (data as Guest[] | null) ?? [];
}

async function writeBlobGuests(guests: Guest[]): Promise<void> {
  const store = getStore(STORE_NAME);
  await store.setJSON("all-guests", guests);
}

function useNetlifyBlobs(): boolean {
  return Boolean(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT);
}

async function getAllGuestsLegacy(): Promise<Guest[]> {
  if (useNetlifyBlobs()) {
    return readBlobGuests();
  }
  return readLocalGuests();
}

async function saveAllGuestsLegacy(guests: Guest[]): Promise<void> {
  if (useNetlifyBlobs()) {
    await writeBlobGuests(guests);
    return;
  }
  await writeLocalGuests(guests);
}

async function getAllGuestsFromSupabase(): Promise<Guest[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("registered_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data as GuestRow[]).map(rowToGuest);
}

export type CreateGuestInput = {
  fullName: string;
  email: string;
  phone: string;
  guestsCount: number;
  dietaryNotes?: string;
  message?: string;
};

export class DuplicateGuestError extends Error {
  guest: Guest;

  constructor(guest: Guest) {
    super("This email address has already been used to confirm attendance.");
    this.name = "DuplicateGuestError";
    this.guest = guest;
  }
}

export async function listGuests(): Promise<Guest[]> {
  if (isSupabaseConfigured()) {
    return getAllGuestsFromSupabase();
  }
  const guests = await getAllGuestsLegacy();
  return guests.sort(
    (a, b) =>
      new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
  );
}

export async function getGuestByEmail(email: string): Promise<Guest | null> {
  const normalizedEmail = email.trim().toLowerCase();

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data ? rowToGuest(data as GuestRow) : null;
  }

  const guests = await getAllGuestsLegacy();
  return guests.find((g) => g.email === normalizedEmail) ?? null;
}

export async function createGuest(input: CreateGuestInput): Promise<Guest> {
  const normalizedEmail = input.email.trim().toLowerCase();
  const existing = await getGuestByEmail(normalizedEmail);
  if (existing) {
    throw new DuplicateGuestError(existing);
  }

  const guest: Guest = {
    id: nanoid(12),
    code: nanoid(10),
    fullName: input.fullName.trim(),
    email: normalizedEmail,
    phone: input.phone.trim(),
    guestsCount: input.guestsCount,
    dietaryNotes: input.dietaryNotes?.trim() ?? "",
    message: input.message?.trim() ?? "",
    registeredAt: new Date().toISOString(),
    checkedInAt: null,
  };

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("guests")
      .insert(guestToRow(guest))
      .select("*")
      .single();

    if (error) {
      if (error.code === "23505") {
        const duplicate = await getGuestByEmail(normalizedEmail);
        if (duplicate) {
          throw new DuplicateGuestError(duplicate);
        }
      }
      throw error;
    }

    return rowToGuest(data as GuestRow);
  }

  const guests = await getAllGuestsLegacy();
  guests.push(guest);
  await saveAllGuestsLegacy(guests);
  return guest;
}

export async function getGuestByCode(code: string): Promise<Guest | null> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .eq("code", code)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data ? rowToGuest(data as GuestRow) : null;
  }

  const guests = await getAllGuestsLegacy();
  return guests.find((g) => g.code === code) ?? null;
}

export async function checkInGuest(
  code: string
): Promise<{ guest: Guest; alreadyCheckedIn: boolean } | null> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const existing = await getGuestByCode(code);
    if (!existing) return null;

    const alreadyCheckedIn = Boolean(existing.checkedInAt);
    if (alreadyCheckedIn) {
      return { guest: existing, alreadyCheckedIn: true };
    }

    const checkedInAt = new Date().toISOString();
    const { data, error } = await supabase
      .from("guests")
      .update({ checked_in_at: checkedInAt })
      .eq("code", code)
      .select("*")
      .single();

    if (error) {
      throw error;
    }

    return {
      guest: rowToGuest(data as GuestRow),
      alreadyCheckedIn: false,
    };
  }

  const guests = await getAllGuestsLegacy();
  const index = guests.findIndex((g) => g.code === code);
  if (index === -1) return null;

  const alreadyCheckedIn = Boolean(guests[index].checkedInAt);

  if (!alreadyCheckedIn) {
    guests[index] = {
      ...guests[index],
      checkedInAt: new Date().toISOString(),
    };
    await saveAllGuestsLegacy(guests);
  }

  return { guest: guests[index], alreadyCheckedIn };
}
