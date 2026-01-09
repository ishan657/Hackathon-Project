import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  MessageSquare, User, LogOut, Bell, Moon, Sun, Zap, AlertCircle, 
  CheckCircle2, MoreVertical, Lock, X, Check
} from 'lucide-react';
import Button from './ui/Button';

const Navbar = ({ user, setPage, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);
  // New state for chat notifications
  const [hasUnreadChats, setHasUnreadChats] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  const fetchUpdates = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Fetch notifications
      const response = await axios.get('http://localhost:5000/api/notifications/recent', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response.data);

      // Fetch friends/chats to check for new messages
      // Note: Assuming your friends endpoint returns a "hasUnread" or similar field
      const chatRes = await axios.get('http://localhost:5000/api/users/my-friends', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Logic: If any friend has a lastMessage that is newer than your last visit to chat
      // For now, checking if any conversation has unread status
      const unread = chatRes.data.some(f => f.unreadCount > 0);
      setHasUnreadChats(unread);

    } catch (err) {
      console.error("Connection failed.", err.message);
    }
  };

  const handleAction = async (action, senderId) => {
    setNotifications(prev => prev.map(n => {
      if (n.sender?._id === senderId && n.type === 'SYSTEM_ALERT') {
        return { 
          ...n, 
          type: action === 'accept' ? 'REQUEST_ACCEPTED' : 'REQUEST_REJECTED',
          isProcessed: true 
        };
      }
      return n;
    }));

    try {
      const token = localStorage.getItem('token');
      const endpoint = `http://localhost:5000/api/users/${action}/${senderId}`;
      await axios.post(endpoint, {}, { headers: { Authorization: `Bearer ${token}` } });
      setTimeout(() => fetchUpdates(), 500); 
    } catch (err) {
      console.error("Action error:", err);
      fetchUpdates(); 
    }
  };
  
  useEffect(() => {
    if (user?._id) {
        fetchUpdates();
        // Set an interval to check for new chats/notifications every 30 seconds
        const interval = setInterval(fetchUpdates, 30000);
        return () => clearInterval(interval);
    }
  }, [user?._id]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md py-3 shadow-sm' 
        : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('landing')}>
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5 fill-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
            NITA Connect
          </span>
        </div>

        {user ? (
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center gap-6 mr-2 text-zinc-900 dark:text-zinc-100 font-bold text-sm">
              <button onClick={() => setPage('dashboard')}>Dashboard</button>
              <button onClick={() => setPage('matches')}>Explore</button>
            </div>

            <button onClick={toggleTheme} className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-900 dark:text-zinc-100 transition-all active:scale-90">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowStatus(!showStatus);
                  if (!showStatus) fetchUpdates(); 
                }}
                className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-900 dark:text-zinc-100 relative transition-all active:scale-90"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white dark:border-zinc-950 animate-pulse"></span>
                )}
              </button>
              
              {showStatus && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 p-4 animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
                  <h4 className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-3 px-2">Recent Updates</h4>
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-[10px] text-zinc-400 text-center py-4 italic">No updates yet</p>
                    ) : (
                      notifications.map((notif) => (
                        <div key={notif._id} className="group relative p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 transition-all">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-100 overflow-hidden flex-shrink-0">
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${notif.sender?.name}`} alt="avatar" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                                {notif.sender?.name} <span className="font-normal opacity-70">
                                  {notif.type === 'REQUEST_ACCEPTED' ? 'friend request accepted' : 
                                   notif.type === 'REQUEST_REJECTED' ? 'friend request rejected' : 'sent a request'}
                                </span>
                              </p>
                              {notif.type === 'SYSTEM_ALERT' && !notif.isProcessed && (
                                <div className="flex gap-2 mt-3">
                                  <button onClick={() => handleAction('accept', notif.sender?._id)} className="flex-1 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1">
                                    <Check size={12} /> Accept
                                  </button>
                                  <button onClick={() => handleAction('reject', notif.sender?._id)} className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 text-zinc-500 text-[10px] font-bold rounded-lg hover:text-red-500">
                                    <X size={12} />
                                  </button>
                                </div>
                              )}
                              {(notif.type === 'REQUEST_ACCEPTED' || notif.isProcessed) && notif.type !== 'REQUEST_REJECTED' && (
                                <button onClick={() => { setPage('chat'); setHasUnreadChats(false); }} className="w-full mt-2 py-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors">
                                   <MessageSquare size={12} /> Send Hi
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Chat Icon with Notification Sign */}
            <button 
                onClick={() => {
                    setPage('chat');
                    setHasUnreadChats(false); // Clear badge when clicking chat
                }} 
                className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-900 dark:text-zinc-100 transition-all active:scale-90 relative"
            >
              <MessageSquare size={20} />
              {hasUnreadChats && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-950 animate-bounce"></span>
              )}
            </button>

            <div className="h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>

            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setPage('onboarding')}>
              <div className="text-right hidden lg:block text-zinc-900 dark:text-zinc-100">
                <p className="text-sm font-bold leading-none">{user.name || 'NITian'}</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1 tracking-widest">Profile</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-800 shadow-sm overflow-hidden bg-zinc-100 hover:ring-2 hover:ring-zinc-900 transition-all">
                <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="relative group">
              <button className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 transition-all active:scale-90">
                <MoreVertical size={20} />
              </button>
              <div className="absolute top-full right-0 mt-3 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] py-2">
                <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="px-4 dark:text-white" onClick={() => setPage('login')}>Login</Button>
            <Button variant="primary" onClick={() => setPage('login')}>Join NITA</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;