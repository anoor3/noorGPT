import React from 'react';

export function LoadingDots() {
  return (
    <div className="flex space-x-2 p-4 max-w-3xl mx-auto">
      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
    </div>
  );
}