export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
  conversation_id: string;
}

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
}