const fallbackOrigin = typeof window !== 'undefined' ? window.location.origin : '/';

export const LIVE_PREVIEW_URL =
  import.meta.env.VITE_LIVE_PREVIEW_URL?.trim() || fallbackOrigin;
