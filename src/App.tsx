import React, { useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Sidebar } from './components/Sidebar';
import { LoadingDots } from './components/LoadingDots';
import { WelcomeScreen } from './components/WelcomeScreen';
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
    <div className="flex h-screen">
      <div className={`${sidebarVisible ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}>
        <Sidebar
          conversations={conversations}
          currentConversation={currentConversation}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          onSelectConversation={(id) => {
            setCurrentConversation(id);
            setMessages(messages.filter(m => m.conversation_id === id));
          }}
        />
      </div>
      <div className="flex-1 flex flex-col glass-panel relative">
        <button
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className="absolute top-4 left-4 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
        >
          <PanelLeft className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${!sidebarVisible ? 'rotate-180' : ''}`} />
        </button>
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          {loading && <LoadingDots />}
        </div>
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
}