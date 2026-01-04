import React from 'react';
import { MessageSquare } from 'lucide-react';
import Button from './ui/Button';

const ChatPage = ({ setPage }) => {
  return (
    <div className="pt-40 px-6 text-center">
      <MessageSquare size={48} className="mx-auto text-zinc-200 mb-6" />
      <h2 className="text-2xl font-bold">Chats are coming soon!</h2>
      <Button variant="ghost" onClick={() => setPage('dashboard')}>Back</Button>
    </div>
  );
};

export default ChatPage;