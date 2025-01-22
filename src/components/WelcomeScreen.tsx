import React from 'react';

export function WelcomeScreen() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 text-transparent bg-clip-text animate-gradient">
          NoorGPT
        </h1>
        <p className="mt-4 text-gray-400">How can I assist you today?</p>
      </div>
    </div>
  );
}