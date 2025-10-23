# Vercel Deployment Notes

## Dependency audit
- Verified the project does not declare `@supabase/auth-helpers-nextjs` in `package.json`.
- Regenerated `package-lock.json` with `npm install` to ensure the dependency is not present in the lockfile.

## Deployment checklist
1. Install dependencies with `npm install` (no ETARGET error expected).
2. Build the Vite app with `npm run build`.
3. Deploy via Vercel as usual.

> Redeployment from within this environment is not possible; trigger a new deployment from Vercel to confirm installation succeeds.
