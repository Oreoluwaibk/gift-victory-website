import { getStore } from "@netlify/blobs";
import { nanoid } from "nanoid";
import { promises as fs } from "fs";
import path from "path";

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

async function getAllGuests(): Promise<Guest[]> {
  if (useNetlifyBlobs()) {
    return readBlobGuests();
  }
  return readLocalGuests();
}

async function saveAllGuests(guests: Guest[]): Promise<void> {
  if (useNetlifyBlobs()) {
    await writeBlobGuests(guests);
    return;
  }
  await writeLocalGuests(guests);
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

export async function getGuestByEmail(email: string): Promise<Guest | null> {
  const guests = await getAllGuests();
  const normalizedEmail = email.trim().toLowerCase();
  return guests.find((g) => g.email === normalizedEmail) ?? null;
}

export async function createGuest(input: CreateGuestInput): Promise<Guest> {
  const guests = await getAllGuests();
  const normalizedEmail = input.email.trim().toLowerCase();

  const existing = guests.find((g) => g.email === normalizedEmail);
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

  guests.push(guest);
  await saveAllGuests(guests);
  return guest;
}

export async function getGuestByCode(code: string): Promise<Guest | null> {
  const guests = await getAllGuests();
  return guests.find((g) => g.code === code) ?? null;
}

export async function checkInGuest(code: string): Promise<Guest | null> {
  const guests = await getAllGuests();
  const index = guests.findIndex((g) => g.code === code);
  if (index === -1) return null;

  if (!guests[index].checkedInAt) {
    guests[index] = {
      ...guests[index],
      checkedInAt: new Date().toISOString(),
    };
    await saveAllGuests(guests);
  }

  return guests[index];
}
