import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type GuestRow = {
  id: string;
  code: string;
  full_name: string;
  email: string;
  phone: string;
  guests_count: number;
  dietary_notes: string;
  message: string;
  registered_at: string;
  checked_in_at: string | null;
};

let client: SupabaseClient | null = null;

function getServiceRoleKey(): string | undefined {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SERVICE_ROLE_KEY;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && getServiceRoleKey());
}

export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = getServiceRoleKey();

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  if (!client) {
    client = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return client;
}
