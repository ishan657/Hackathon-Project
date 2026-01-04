import React from 'react';
import { useState } from "react";
import { MessageSquare } from 'lucide-react';
import Button from './ui/Button';
import Chatsidebar from "./chat/Chatsidebar";
import Chatwindow from "./chat/Chatwindow";

export default function ChatPage() {
  const [activeFriend, setActiveFriend] = useState(null);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Chatsidebar
        activeFriend={activeFriend}
        setActiveFriend={setActiveFriend}
      />
      <Chatwindow activeFriend={activeFriend} />
    </div>
  );
}


