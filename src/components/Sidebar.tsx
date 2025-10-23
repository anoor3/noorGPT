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
    <div className="flex h-full w-72 flex-col border-r border-white/5 bg-slate-950/80 text-slate-100 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="border-b border-white/5 p-6">
        <div className="text-sm uppercase tracking-[0.4em] text-slate-400">Chats</div>
        <h2 className="mt-3 text-2xl font-semibold text-white">NoorGPT</h2>
        <button
          onClick={onNewChat}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 py-2 text-sm font-medium text-slate-900 shadow-lg shadow-emerald-500/40 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/50"
        >
          <PlusCircle className="h-4 w-4" />
          New Conversation
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`group mx-3 mb-2 flex items-center rounded-xl border border-transparent px-3 transition-all duration-300 hover:border-white/10 hover:bg-white/5 ${
              currentConversation === conv.id
                ? 'border-emerald-400/40 bg-white/10 shadow-lg shadow-emerald-500/20'
                : ''
            }`}
          >
            <button
              onClick={() => onSelectConversation(conv.id)}
              className="flex flex-1 items-center gap-3 py-4 text-left"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-emerald-400 shadow-inner shadow-black/40">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{conv.title}</p>
                <p className="mt-1 text-xs text-slate-400">{new Date(conv.created_at).toLocaleString()}</p>
              </div>
            </button>
            <button
              onClick={() => onDeleteChat(conv.id)}
              className="ml-2 rounded-lg p-2 text-slate-500 opacity-0 transition-all group-hover:opacity-100 hover:text-rose-400"
              title="Delete chat"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}