import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MessageSquare,
  LogOut,
  Bell,
  Moon,
  Sun,
  Zap,
  X,
  Check,
} from "lucide-react";
import Button from "./ui/Button";

const Navbar = ({ user, setPage, onLogout, setActiveChatFriend }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);
  const [hasUnreadChats, setHasUnreadChats] = useState(false);
  const [processingIds, setProcessingIds] = useState([]);

  // 1. Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Theme Toggle Effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // 3. Fetch Data Logic
  const fetchUpdates = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        "https://hackathon-project-owg6.onrender.com/api/notifications/recent",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update notifications while protecting currently processing items from flickering
      setNotifications((prev) => {
        const incoming = response.data;
        return incoming.map(newNotif => {
          if (processingIds.includes(newNotif.sender?._id)) {
            const existing = prev.find(p => p.sender?._id === newNotif.sender?._id);
            return existing || newNotif;
          }
          return newNotif;
        });
      });

      const chatRes = await axios.get(
        "https://hackathon-project-owg6.onrender.com/api/users/my-friends",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const unread = chatRes.data.some((f) => f.unreadCount > 0);
      setHasUnreadChats(unread);
    } catch (err) {
      console.error("Fetch failed:", err.message);
    }
  };

  // 4. Action Logic (Accept/Reject)
  const handleAction = async (action, senderId) => {
    setProcessingIds((prev) => [...prev, senderId]);

    // Optimistic Update: Change UI immediately to stop flicker
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.sender?._id === senderId) {
          return {
            ...n,
            type: action === "accept" ? "REQUEST_ACCEPTED" : "REQUEST_REJECTED",
            isProcessed: true,
          };
        }
        return n;
      })
    );

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://hackathon-project-owg6.onrender.com/api/users/${action}/${senderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Wait 3 seconds to ensure DB sync before allowing polling to overwrite
      setTimeout(() => {
        setProcessingIds((prev) => prev.filter((id) => id !== senderId));
        fetchUpdates();
      }, 3000);

    } catch (err) {
      console.error("Action failed", err);
      setProcessingIds((prev) => prev.filter((id) => id !== senderId));
      fetchUpdates();
    }
  };

  // 5. Polling Effect
  useEffect(() => {
    if (user?._id) {
      fetchUpdates();
      const interval = setInterval(fetchUpdates, 10000); // 10s polling
      return () => clearInterval(interval);
    }
  }, [user?._id]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${
        isScrolled
          ? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md py-3 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage("landing")}>
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5 fill-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">NITA Connect</span>
        </div>

        {user ? (
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center gap-6 mr-2 text-zinc-900 dark:text-zinc-100 font-bold text-sm">
              <button onClick={() => setPage("dashboard")}>Dashboard</button>
              <button onClick={() => setPage("explore")}>Explore</button>
            </div>

            <button onClick={toggleTheme} className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-900 dark:text-zinc-100 transition-all">
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div className="relative">
              <button
                onClick={() => {
                  setShowStatus(!showStatus);
                  if (!showStatus) fetchUpdates();
                }}
                className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-900 dark:text-zinc-100 relative transition-all"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white dark:border-zinc-950 animate-pulse"></span>
                )}
              </button>

              {showStatus && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 p-4 z-[100]">
                  <h4 className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-3 px-2">Recent Updates</h4>
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-[10px] text-zinc-400 text-center py-4 italic">No updates yet</p>
                    ) : (
                      notifications.map((notif) => {
                        const isProcessing = processingIds.includes(notif.sender?._id);
                        const isAccepted = notif.type === "REQUEST_ACCEPTED" || (isProcessing && notif.isProcessed);

                        return (
                          <div key={notif._id} className="group relative p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-zinc-100 overflow-hidden flex-shrink-0">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${notif.sender?.name}`} alt="avatar" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                                  {notif.sender?.name}{" "}
                                  <span className="font-normal opacity-70">
                                    {isAccepted ? "is now your friend" : notif.type === "REQUEST_REJECTED" ? "request declined" : "sent a request"}
                                  </span>
                                </p>

                                {notif.type === "SYSTEM_ALERT" && !isProcessing ? (
                                  <div className="flex gap-2 mt-3">
                                    <button
                                      onClick={() => handleAction("accept", notif.sender?._id)}
                                      className="flex-1 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1"
                                    >
                                      <Check size={12} /> Accept
                                    </button>
                                    <button
                                      onClick={() => handleAction("reject", notif.sender?._id)}
                                      className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 text-zinc-500 text-[10px] font-bold rounded-lg hover:text-red-500"
                                    >
                                      <X size={12} />
                                    </button>
                                  </div>
                                ) : (
                                  isAccepted && (
                                    <div className="mt-2 py-1.5 text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                                      <Check size={12} /> Request Accepted
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => {setPage("chat"); setHasUnreadChats(false);}} className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-900 dark:text-zinc-100 transition-all relative">
              <MessageSquare size={20} />
              {hasUnreadChats && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-950 animate-bounce"></span>}
            </button>

            <div className="h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>

            <div className="relative group">
  {/* Profile Trigger */}
  <div className="flex items-center gap-3 cursor-pointer">
    <div className="text-right hidden lg:block">
      <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
        {user.name || "NITian"}
      </p>
      <p className="text-[10px] uppercase tracking-widest text-zinc-400">
        {user.branch || "Student"}
      </p>
    </div>

    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-800 shadow-sm overflow-hidden bg-zinc-100">
      <img
        src={
          user.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
        }
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Hover Card */}
  <div className="absolute right-0 top-full mt-4 w-80 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">

    {/* User Info */}
    <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
      <p className="text-sm font-bold">{user.name}</p>
      <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
        {user.bio || "No bio added yet"}
      </p>
    </div>

    {/* Friends Preview */}
    <div className="p-4">
      <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-3">
        Friends
      </p>

      <div className="flex -space-x-3 mb-4">
        {(user.friends || []).slice(0, 5).map((friend, i) => (
          <img
            key={i}
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.name}`}
            className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-100"
          />
        ))}

        {(!user.friends || user.friends.length === 0) && (
          <p className="text-xs text-zinc-500">No friends yet</p>
        )}
      </div>

      {/* Actions */}
      <button
        onClick={() => setPage("onboarding")}
        className="w-full mb-2 py-2 text-sm font-semibold rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 transition"
      >
        Edit Profile
      </button>

      <button
        onClick={onLogout}
        className="w-full py-2 text-sm font-semibold rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        Logout
      </button>
    </div>
  </div>
</div>


            {/* <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setPage("onboarding")}>
              <div className="text-right hidden lg:block text-zinc-900 dark:text-zinc-100">
                <p className="text-sm font-bold leading-none">{user.name || "NITian"}</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1 tracking-widest">Profile</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-800 shadow-sm overflow-hidden bg-zinc-100 hover:ring-2 hover:ring-zinc-900 transition-all">
                <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div> */}

            {/* <div className="relative group">
              <button className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 transition-all">
                <MoreVertical size={20} />
              </button>
              <div className="absolute top-full right-0 mt-3 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] py-2">
                <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div> */}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="px-4 dark:text-white" onClick={() => setPage("login")}>Login</Button>
            <Button variant="primary" onClick={() => setPage("login")}>Join NITA</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;