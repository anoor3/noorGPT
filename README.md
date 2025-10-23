# NoorGPT UI

This repository contains the NoorGPT chat experience built with **React** and **Vite**. The UI showcases a glassmorphism-inspired layout, ambient gradients, and a convenient entry point to open the live deployment of the project.

## Getting started

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the development server
   ```bash
   npm run dev
   ```
3. Build for production
   ```bash
   npm run build
   ```

## Deployment notes

When you deploy the project (for example on Netlify, Vercel, or another static hosting provider):

- **Framework preset**: choose **Vite** (or "Vite + React") as the framework. If that option is not available, a generic React preset also works because the build command uses Vite.
- **Build command**: `npm run build`
- **Publish directory**: `dist`

## Environment variables

The chat UI supports two types of configuration: Supabase credentials (for persisting data remotely) and the optional live preview link.

### Supabase configuration

Set the following variables to wire the interface to your Supabase project. Copy `.env.example` to `.env` and replace the placeholder values.

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

With valid credentials, the app will verify connectivity at runtime and expose a banner that shows whether the remote backend is reachable. When the values are missing, the UI falls back to in-memory storage so you can still iterate locally.

### Live preview button

The UI can surface a "Live preview" button that opens the deployed site in a new tab. Configure it with:

```env
VITE_LIVE_PREVIEW_URL=https://noorgpt.netlify.app
```

If the variable is omitted, the app gracefully falls back to using the current browser origin.

## Connection diagnostics

Run the bundled diagnostic script to confirm your environment before deploying:

```bash
npm run diagnostics
```

The script checks three things:

1. **Supabase** – validates the Auth endpoint using the anon key so you know the project URL and key are correct.
2. **Vercel** – inspects whether Vercel-provided environment variables are present, which helps troubleshoot build contexts.
3. **Live preview** – reports the URL that will be exposed through the in-app button.

If Supabase is unreachable, the script prints actionable remediation steps without failing the command, so you can iterate quickly while fixing your credentials.

## Vercel deployment tips

When deploying to Vercel, keep the following in mind to avoid common hiccups:

- Enable **Build Multiple Deployments Simultaneously** so previews are not blocked by the production queue.
- Upgrade to a **larger build machine** if your queue is frequently saturated — this alone can improve build speeds by up to 40%.
- Use Vercel's **frontend-backend version sync** (available on Pro plans) to prevent mismatches between the UI bundle and any server-side routes.
- Remember to replicate the `.env` settings above inside your Vercel project, either via the dashboard or `vercel env pull`.

Once the environment variables are in place, Vercel will run `npm run build` (as configured earlier), producing the same optimized bundle you test locally.
