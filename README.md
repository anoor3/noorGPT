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

The UI can surface a "Live preview" button that opens the deployed site in a new tab. This is controlled by the optional `VITE_LIVE_PREVIEW_URL` environment variable.

- Create a `.env` (or provider-specific UI entry) with the key `VITE_LIVE_PREVIEW_URL` pointing to your deployed URL, e.g.
  ```env
  VITE_LIVE_PREVIEW_URL=https://noorgpt.netlify.app
  ```
- If the variable is omitted, the app gracefully falls back to using the current browser origin, so you do **not** need to set any Supabase or other service keys to run the UI.

For convenience, copy `.env.example` and fill in your values before building or deploying.
