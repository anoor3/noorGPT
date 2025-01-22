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
    <div className="p-4 bg-transparent">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <textarea
            className="w-full p-3 pr-12 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-emerald-500/50 focus:ring-0 resize-none text-gray-100 placeholder-gray-400"
            rows={1}
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
          <button
            className="absolute right-2 bottom-2 p-2 text-gray-400 hover:text-emerald-400 disabled:opacity-50 disabled:hover:text-gray-400 transition-colors"
            onClick={handleSubmit}
            disabled={disabled || !input.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}