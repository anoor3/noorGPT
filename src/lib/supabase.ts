import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

const sanitizedUrl = rawUrl && !rawUrl.toLowerCase().includes('your-project')
  ? rawUrl.replace(/\/$/, '')
  : undefined;

const sanitizedAnonKey = rawAnonKey && !rawAnonKey.toLowerCase().includes('your-anon')
  ? rawAnonKey
  : undefined;

let client: SupabaseClient | null = null;

if (sanitizedUrl && sanitizedAnonKey) {
  client = createClient(sanitizedUrl, sanitizedAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}

export const supabase = client;
export const supabaseUrl = sanitizedUrl;
export const supabaseAnonKey = sanitizedAnonKey;

export function isSupabaseConfigured(): client is SupabaseClient {
  return Boolean(client);
}

type PingStatus =
  | { status: 'missing'; message: string }
  | { status: 'connected'; message: string }
  | { status: 'error'; message: string };

export async function pingSupabase(): Promise<PingStatus> {
  if (!sanitizedUrl || !sanitizedAnonKey || !client) {
    return {
      status: 'missing',
      message:
        'Supabase environment variables are not configured. Conversations will remain in-memory only.',
    };
  }

  const endpoint = `${sanitizedUrl}/auth/v1/settings`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        apikey: sanitizedAnonKey,
        Authorization: `Bearer ${sanitizedAnonKey}`,
      },
    });

    if (response.ok) {
      return {
        status: 'connected',
        message: 'Supabase responded successfully. Remote persistence is available.',
      };
    }

    const text = await response.text();
    return {
      status: 'error',
      message: `Supabase returned ${response.status} ${response.statusText}${
        text ? ` — ${text}` : ''
      }`,
    };
  } catch (error) {
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Unknown error while contacting Supabase.',
    };
  }
}
