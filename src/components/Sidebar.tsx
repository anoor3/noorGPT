import React from 'react';
import { PlusCircle, MessageSquare, Trash2 } from 'lucide-react';
import { Conversation } from '../types';

interface SidebarProps {
  conversations: Conversation[];
  currentConversation?: string;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
  onSelectConversation: (id: string) => void;
}

export function Sidebar({
  conversations,
  currentConversation,
  onNewChat,
  onDeleteChat,
  onSelectConversation,
}: SidebarProps) {
  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-black text-gray-100 h-screen flex flex-col border-r border-gray-800/50">
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 p-4 hover:bg-gray-800/50 w-full transition-colors"
      >
        <PlusCircle className="w-5 h-5 text-emerald-400" />
        New Chat
      </button>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`group flex items-center hover:bg-gray-800/50 transition-colors ${
              currentConversation === conv.id ? 'bg-gray-800/50' : ''
            }`}
          >
            <button
              onClick={() => onSelectConversation(conv.id)}
              className="flex items-center gap-2 p-4 flex-1 overflow-hidden"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="truncate">{conv.title}</span>
            </button>
            <button
              onClick={() => onDeleteChat(conv.id)}
              className="p-2 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all mr-2"
              title="Delete chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}