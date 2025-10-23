import React, { useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Sidebar } from './components/Sidebar';
import { LoadingDots } from './components/LoadingDots';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LivePreviewLink } from './components/LivePreviewLink';
import { ConnectionBanner } from './components/ConnectionBanner';
import { Message, Conversation } from './types';
import { generateResponse } from './lib/gemini';
import { PanelLeft } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleNewChat = () => {
    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      created_at: new Date().toISOString()
    };
    
    setConversations([newConversation, ...conversations]);
    setCurrentConversation(newConversation.id);
    setMessages([]);
  };

  const handleDeleteChat = (id: string) => {
    setConversations(conversations.filter(conv => conv.id !== id));
    if (currentConversation === id) {
      const nextConv = conversations.find(conv => conv.id !== id);
      if (nextConv) {
        setCurrentConversation(nextConv.id);
        setMessages(messages.filter(m => m.conversation_id === nextConv.id));
      } else {
        handleNewChat();
      }
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!currentConversation) return;

    setLoading(true);
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      created_at: new Date().toISOString(),
      conversation_id: currentConversation,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    try {
      const aiResponse = await generateResponse(content);
      
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: aiResponse,
        created_at: new Date().toISOString(),
        conversation_id: currentConversation,
      };
      
      setMessages([...newMessages, assistantMessage]);
      
      if (newMessages.length === 1 && conversations.length > 0) {
        const summary = content.slice(0, 30) + (content.length > 30 ? '...' : '');
        setConversations(conversations.map(conv => 
          conv.id === currentConversation 
            ? { ...conv, title: summary }
            : conv
        ));
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (conversations.length === 0) {
      handleNewChat();
    }
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.18),_transparent_60%)]" />
      </div>
      <div className="pointer-events-none absolute right-8 top-6 z-20">
        <LivePreviewLink />
      </div>
      <div className={`${sidebarVisible ? 'w-72' : 'w-0'} relative z-10 overflow-hidden transition-all duration-500`}>
        <Sidebar
          conversations={conversations}
          currentConversation={currentConversation}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          onSelectConversation={(id) => {
            setCurrentConversation(id);
            setMessages(messages.filter((m) => m.conversation_id === id));
          }}
        />
      </div>
      <div className="relative z-10 flex flex-1 flex-col">
        <button
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className="absolute top-6 left-6 flex items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 p-2 text-slate-300 shadow-lg shadow-black/40 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-emerald-400/60 hover:text-emerald-300"
        >
          <PanelLeft className={`h-5 w-5 transition-transform duration-300 ${!sidebarVisible ? 'rotate-180' : ''}`} />
        </button>
        <div className="glass-panel relative flex-1 overflow-y-auto px-6 pb-32 pt-24">
          <div className="pointer-events-none absolute inset-x-10 top-10 h-32 rounded-3xl border border-white/5 bg-white/5 blur-3xl" />
          <ConnectionBanner className="mb-6" />
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            messages.map((message) => <ChatMessage key={message.id} message={message} />)
          )}
          {loading && <LoadingDots />}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-28 h-32 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
}