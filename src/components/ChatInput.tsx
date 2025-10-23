import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent px-6 pb-10 pt-6">
      <div className="mx-auto max-w-3xl">
        <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 p-1 shadow-xl shadow-black/30 backdrop-blur">
          <textarea
            className="h-20 w-full resize-none rounded-xl border border-transparent bg-transparent px-4 pb-12 pt-4 text-base text-slate-100 placeholder-slate-400 focus:border-emerald-400/60 focus:outline-none"
            rows={1}
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
          <button
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-slate-900 shadow-lg shadow-emerald-500/40 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
            onClick={handleSubmit}
            disabled={disabled || !input.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}