import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LIVE_PREVIEW_URL } from '../config';

export function LivePreviewLink() {
  return (
    <div className="pointer-events-auto">
      <a
        href={LIVE_PREVIEW_URL}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 shadow-lg shadow-black/30 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-emerald-400/60 hover:text-emerald-200"
      >
        <span>Open Live Preview</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
