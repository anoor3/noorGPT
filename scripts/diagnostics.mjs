#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadLocalEnv() {
  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) {
    return;
  }

  const contents = readFileSync(envPath, 'utf8');
  for (const line of contents.split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadLocalEnv();

const supabaseUrlRaw = process.env.VITE_SUPABASE_URL?.trim();
const supabaseKeyRaw = process.env.VITE_SUPABASE_ANON_KEY?.trim();
const supabaseUrl =
  supabaseUrlRaw && !supabaseUrlRaw.toLowerCase().includes('your-project')
    ? supabaseUrlRaw.replace(/\/$/, '')
    : undefined;
const supabaseAnonKey =
  supabaseKeyRaw && !supabaseKeyRaw.toLowerCase().includes('your-anon') ? supabaseKeyRaw : undefined;

const livePreviewUrl = process.env.VITE_LIVE_PREVIEW_URL?.trim();
const vercelIndicators = [
  process.env.VERCEL,
  process.env.VERCEL_ENV,
  process.env.VERCEL_URL,
  process.env.VERCEL_BRANCH_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
].filter(Boolean);

function logSection(title) {
  console.log(`\n=== ${title} ===`);
}

async function checkSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log('Supabase: ⚠️  Missing configuration.');
    console.log('  • Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are defined in your environment.');
    return { status: 'missing' };
  }

  const endpoint = `${supabaseUrl}/auth/v1/settings`;
  try {
    const response = await fetch(endpoint, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });

    if (response.ok) {
      console.log('Supabase: ✅ Connected.');
      console.log('  • The Auth service responded successfully. Remote persistence is ready.');
      return { status: 'connected' };
    }

    const text = await response.text();
    console.log('Supabase: ❌ Responded with an error.');
    console.log(`  • HTTP ${response.status} ${response.statusText}${text ? ` — ${text}` : ''}`);
    console.log('  • Verify that your database is provisioned and the anon key has access.');
    return { status: 'error' };
  } catch (error) {
    console.log('Supabase: ❌ Unable to reach the project.');
    console.log(`  • ${error instanceof Error ? error.message : error}`);
    console.log('  • Double-check the project URL and your local network connectivity.');
    return { status: 'error' };
  }
}

function inspectVercel() {
  if (vercelIndicators.length === 0) {
    console.log('Vercel: ℹ️  No Vercel environment variables detected.');
    console.log('  • This is expected when running locally.');
    console.log('  • Set VERCEL=1 (or run via `vercel` CLI) to emulate the production environment.');
  } else {
    console.log('Vercel: ✅ Detected Vercel environment variables.');
    vercelIndicators.forEach((value, index) => {
      console.log(`  • Indicator ${index + 1}: ${value}`);
    });
  }
}

function summarizeLivePreview() {
  if (!livePreviewUrl) {
    console.log('Live preview link: ℹ️  Not configured. The app will fall back to the current origin.');
  } else {
    console.log(`Live preview link: ✅ ${livePreviewUrl}`);
  }
}

async function main() {
  console.log('NoorGPT deployment diagnostics');
  logSection('Supabase');
  const supabaseResult = await checkSupabase();

  logSection('Vercel');
  inspectVercel();

  logSection('Live preview button');
  summarizeLivePreview();

  if (supabaseResult.status === 'connected') {
    process.exitCode = 0;
  } else {
    console.log('\nSupabase is not fully connected yet. Update your environment variables and re-run this script.');
    process.exitCode = 0; // surface warnings without failing CI
  }
}

main();
