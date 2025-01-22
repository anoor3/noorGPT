import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`py-4 px-4 ${isUser ? 'text-right' : ''}`}>
      <div className={`inline-block max-w-[80%] ${isUser ? 'ml-auto' : 'mr-auto'}`}>
        <div className={`prose prose-invert max-w-none ${isUser ? 'bg-blue-600 rounded-2xl rounded-tr-sm' : 'bg-gray-800 rounded-2xl rounded-tl-sm'} px-4 py-2`}>
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}