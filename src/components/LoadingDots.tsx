import React from 'react';

export function LoadingDots() {
  return (
    <div className="mx-auto flex max-w-3xl items-center justify-center space-x-3 py-6">
      <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_theme(colors.emerald.400)] animate-bounce [animation-delay:-0.3s]" />
      <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_theme(colors.cyan.400)] animate-bounce [animation-delay:-0.15s]" />
      <div className="h-3 w-3 rounded-full bg-purple-400 shadow-[0_0_12px_theme(colors.purple.400)] animate-bounce" />
    </div>
  );
}