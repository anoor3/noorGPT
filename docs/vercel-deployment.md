# Vercel Deployment Notes

## Quick answers
- **Language/framework selection:** choose the **Vite** template (which builds with Node.js 18+ under the hood). If Vercel only asks for a language, pick **Node.js**.
- **How to redeploy:** in Vercel, open your project → **Deployments** tab → click **Redeploy** on the latest commit (or push a new commit/trigger “Deploy” from the project overview).
- **Targeting the `main` branch:** open the project’s **Settings → Git** page and confirm that **Production Branch** is set to `main`. Triggering a redeploy (or pushing to `main`) will publish that branch.

## Supabase environment variables
This project expects the public Supabase credentials to be provided as Vite environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Uploading both keys in Vercel’s **Environment Variables** section is sufficient—no extra configuration is required inside Supabase unless you need additional policies or database changes. Make sure the variables are defined for every environment you deploy to (Preview/Production).

## Dependency audit
- Verified the project does not declare `@supabase/auth-helpers-nextjs` in `package.json`.
- Regenerated `package-lock.json` with `npm install` to ensure the dependency is not present in the lockfile.

## Deployment checklist
1. Install dependencies with `npm install` (no ETARGET error expected).
2. Build the Vite app with `npm run build`.
3. Optionally lint with `npm run lint` if you want CI-style validation before deploying.
4. Deploy via Vercel using the Vite/Node.js configuration noted above. Vercel will automatically run `npm install` and `npm run build` during the deployment.

> Automated tests: the project currently exposes `npm run build` and `npm run lint`. There is no dedicated `npm test` command to execute. Provide the Supabase environment variables noted above when deploying; no additional API keys are required locally unless you are exercising Supabase features.

> Redeployment from within this environment is not possible; trigger a new deployment from Vercel to confirm installation succeeds.
