import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import CryptoJS from 'crypto-js';
import { 
  Send, Smile, Paperclip, Phone, Video, Info, MessageSquare, 
  Search, MoreVertical, CheckCheck 
} from 'lucide-react';

// Dynamic API URL for Vercel/Render compatibility
const API_URL = import.meta.env.VITE_API_URL || "https://hackathon-project-owg6.onrender.com";

// Initialize Socket.io connection with polling fallback for Render stability
const socket = io(API_URL, {
  transports: ['websocket', 'polling'],
  withCredentials: true
});

// MUST match your backend secret exactly
const SECRET_KEY = "your_very_secret_key"; 

const ChatInterface = ({ user, setPage, activeChatFriend, setActiveChatFriend }) => {
  const [friends, setFriends] = useState([]);
  const [activeFriend, setActiveFriend] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();

  // --- 1. DECRYPTION LOGIC ---
  const decryptText = (encryptedText, iv) => {
    try {
      if (!encryptedText || !iv) return "";
      const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY, {
        iv: CryptoJS.enc.Hex.parse(iv),
      });
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      console.error("Decryption failed:", err);
      return "🔒 Decryption Error";
    }
  };

  // --- 2. FETCH FRIENDS LIST ---
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/api/users/my-friends`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFriends(res.data);

        if (activeChatFriend) {
          const friendInList = res.data.find(f => f._id === activeChatFriend._id);
          setActiveFriend(friendInList || activeChatFriend);
        }
      } catch (err) {
        console.error("Error fetching friends:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, [activeChatFriend]);

  // --- 3. SOCKET & MESSAGE HISTORY ---
  useEffect(() => {
    if (!activeFriend?.conversationId) return;

    socket.emit('join_room', activeFriend.conversationId);

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/api/messages/${activeFriend.conversationId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const decryptedHistory = res.data.map(msg => ({
          ...msg,
          text: decryptText(msg.encryptedText, msg.iv)
        }));
        setChatHistory(decryptedHistory);
      } catch (err) {
        console.error("History fetch error:", err);
      }
    };

    fetchMessages();

    // LISTEN FOR LIVE MESSAGES
    socket.on('receive_message', (data) => {
      // ONLY add if it's the current chat AND NOT from me (I handle mine locally)
      if (data.conversationId === activeFriend.conversationId && data.sender !== user._id) {
        const decryptedMsg = {
          ...data,
          text: decryptText(data.encryptedText, data.iv)
        };
        setChatHistory((prev) => [...prev, decryptedMsg]);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [activeFriend, user._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // --- 4. SEND MESSAGE (INSTANT UI UPDATE) ---
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !activeFriend) return;

    const iv = CryptoJS.lib.WordArray.random(16).toString();
    const encrypted = CryptoJS.AES.encrypt(message, SECRET_KEY, {
      iv: CryptoJS.enc.Hex.parse(iv),
    }).toString();

    const messageData = {
      conversationId: activeFriend.conversationId,
      sender: user._id,
      encryptedText: encrypted,
      iv: iv,
      text: message, // Plain text for instant local display
      createdAt: new Date().toISOString()
    };

    // 1. Emit live via socket
    socket.emit('send_message', messageData);
    
    // 2. INSTANT UI UPDATE: Add my message to state immediately
    setChatHistory((prev) => [...prev, messageData]);

    setMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-100px)] mt-24 max-w-7xl mx-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
      
      {/* SIDEBAR */}
      <div className="w-80 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Messages</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-6 text-center text-zinc-400 animate-pulse">Loading Tribes...</div>
          ) : (
            friends.map(friend => (
              <div
                key={friend._id}
                onClick={() => {
                   setActiveFriend(friend);
                   if(setActiveChatFriend) setActiveChatFriend(null);
                }}
                className={`p-4 flex items-center gap-3 cursor-pointer transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 ${activeFriend?._id === friend._id ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
              >
                <div className="w-12 h-12 rounded-full bg-zinc-200 overflow-hidden border-2 border-white dark:border-zinc-700">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.name}`} alt="avatar" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate">{friend.name}</p>
                  <p className="text-xs text-zinc-500 truncate">Start vibing...</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CHAT WINDOW */}
      <div className="flex-1 flex flex-col bg-zinc-50/30 dark:bg-zinc-900/10">
        {activeFriend ? (
          <>
            <div className="p-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeFriend.name}`} className="w-10 h-10 rounded-full" alt="avatar" />
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 leading-none">{activeFriend.name}</h3>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">Connected</span>
                </div>
              </div>
              <div className="flex gap-4 text-zinc-400">
                <Phone size={18} className="cursor-pointer hover:text-zinc-900" />
                <Video size={18} className="cursor-pointer hover:text-zinc-900" />
                <Info size={18} className="cursor-pointer hover:text-zinc-900" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === user._id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.sender === user._id ? 'bg-zinc-900 text-white rounded-tr-none' : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-none'}`}>
                    {msg.text}
                    <div className="flex items-center justify-end gap-1 mt-1 opacity-50 text-[9px]">
                      {new Date(msg.createdAt || msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {msg.sender === user._id && <CheckCheck size={10} />}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <button type="button" className="p-2 text-zinc-400 hover:text-zinc-900"><Paperclip size={20} /></button>
                <input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type an encrypted message..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-900 dark:text-zinc-100 px-2"
                />
                <button type="submit" className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 p-2.5 rounded-xl hover:scale-105 transition-all">
                  <Send size={18} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-400">
            <MessageSquare size={64} className="mb-4 opacity-10" />
            <p className="font-bold text-zinc-500">Pick a friend to start vibing</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;