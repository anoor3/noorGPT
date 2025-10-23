import React from 'react';

export function WelcomeScreen() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative max-w-xl text-center">
        <div className="absolute inset-x-10 -top-16 h-32 rounded-full bg-emerald-400/30 blur-3xl" />
        <div className="absolute inset-x-0 -bottom-10 h-40 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="relative rounded-3xl border border-white/10 bg-slate-900/60 px-10 py-16 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 text-slate-900 shadow-lg shadow-emerald-500/40">
            <span className="text-2xl font-bold">N</span>
          </div>
          <h1 className="mt-6 bg-gradient-to-r from-emerald-300 via-cyan-200 to-purple-300 bg-clip-text text-5xl font-bold text-transparent animate-gradient">
            NoorGPT
          </h1>
          <p className="mt-4 text-base text-slate-300">Your creative AI companion is ready. Start a conversation or continue an existing one.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-400">
            <span className="rounded-full border border-white/10 px-4 py-1 backdrop-blur">Summarize ideas</span>
            <span className="rounded-full border border-white/10 px-4 py-1 backdrop-blur">Draft an email</span>
            <span className="rounded-full border border-white/10 px-4 py-1 backdrop-blur">Brainstorm topics</span>
          </div>
        </div>
      </div>
    </div>
  );
}