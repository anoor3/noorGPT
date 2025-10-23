import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`px-4 py-5 transition-all duration-300 ${isUser ? 'text-right' : ''}`}>
      <div className={`inline-block max-w-[80%] ${isUser ? 'ml-auto' : 'mr-auto'}`}>
        <div
          className={`prose prose-invert max-w-none rounded-3xl border px-5 py-3 shadow-lg shadow-black/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/50 ${
            isUser
              ? 'border-blue-500/40 bg-gradient-to-br from-blue-500/80 via-cyan-500/70 to-emerald-500/80 text-white'
              : 'border-white/10 bg-slate-900/80'
          } ${isUser ? 'rounded-tr-md' : 'rounded-tl-md'}`}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}