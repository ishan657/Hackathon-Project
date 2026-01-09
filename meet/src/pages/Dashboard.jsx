import React, { useState } from "react";
import {
  Heart,
  Trophy,
  Tent,
  BookOpen,
  Clock,
  Code,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Search,
  Edit3,
  Navigation,
  User,
  Users,
  Gamepad2,
  Music,
  Camera,
  Coffee,
  Dumbbell,
  Palette,
  Mic2,
} from "lucide-react";
import axios from "axios";
import Button from "../components/ui/Button";

const Dashboard = ({ user, setPage, onStartExploring, setGlobalUser }) => {
  const [loading, setLoading] = useState(false);
  const [intent, setIntent] = useState(
    user?.lookingFor || "Exploring campus vibes"
  );

  const categories = [
    {
      id: "dating",
      title: "Campus Dating",
      icon: <Heart size={18} />,
      color: "text-red-500",
    },
    {
      id: "hackathon",
      title: "Hackathon Partner",
      icon: <Trophy size={18} />,
      color: "text-amber-500",
    },
    {
      id: "trip",
      title: "Camp/Trip",
      icon: <Tent size={18} />,
      color: "text-emerald-500",
    },
    {
      id: "study",
      title: "Study Buddy",
      icon: <BookOpen size={18} />,
      color: "text-blue-500",
    },
    {
      id: "night",
      title: "Night Canteen",
      icon: <Clock size={18} />,
      color: "text-orange-500",
    },
    {
      id: "coding",
      title: "Coding Match",
      icon: <Code size={18} />,
      color: "text-zinc-600",
    },
    {
      id: "gaming",
      title: "Gaming Squad",
      icon: <Gamepad2 size={18} />,
      color: "text-purple-500",
    },
    {
      id: "gym",
      title: "Gym Partner",
      icon: <Dumbbell size={18} />,
      color: "text-slate-700",
    },
    {
      id: "music",
      title: "Jam Session",
      icon: <Music size={18} />,
      color: "text-pink-500",
    },
    {
      id: "photo",
      title: "Photography",
      icon: <Camera size={18} />,
      color: "text-cyan-500",
    },
    {
      id: "coffee",
      title: "Coffee Break",
      icon: <Coffee size={18} />,
      color: "text-yellow-700",
    },
    {
      id: "art",
      title: "Creative Arts",
      icon: <Palette size={18} />,
      color: "text-indigo-500",
    },
    {
      id: "talk",
      title: "Deep Talks",
      icon: <Mic2 size={18} />,
      color: "text-rose-500",
    },
  ];

  const handleFinalSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // 1. PATCH REQUEST
      console.log("📡 Step 1: Updating Profile Intent...");
      const patchRes = await axios.patch(
        "https://hackathon-project-owg6.onrender.com/api/users/profile",
        { lookingFor: intent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("✅ Profile Updated:", patchRes.data.lookingFor);

      // 2. GET SMART DISCOVERY
      console.log("📡 Step 2: Hitting Smart Discovery Route...");
      const discoveryRes = await axios.get(
        "https://hackathon-project-owg6.onrender.com/api/users/smart-discovery",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onStartExploring(discoveryRes.data);

      console.log("✅ Discovery Success! Matches received:", discoveryRes.data);

      // 3. COMPLETE
      onStartExploring(discoveryRes.data);
    } catch (err) {
      console.error("❌ DISCOVERY FAILED:", err.response?.data || err.message);
      alert(`Discovery Error: ${err.response?.data?.msg || "Check console"}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-6xl mx-auto pt-32 pb-20 px-6 space-y-24 text-zinc-900 dark:text-zinc-100 font-sans">
      {/* --- SECTION 1: AI-POWERED HEADER --- */}
      <div className="text-center space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 animate-pulse">
            <Sparkles size={14} className="text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Enhanced by Gemini AI
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-light tracking-tight leading-tight">
            Find your <span className="font-black italic">partner</span>,{" "}
            {user?.name?.split(" ")[0]}.<br />
            <span className="text-2xl md:text-3xl font-medium bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">
              using Gemini to match your profile in real-time
            </span>
          </h1>
        </div>

        <div className="max-w-3xl mx-auto group">
          <div className="relative flex items-center p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-700">
            <div className="pl-6 text-zinc-400">
              <Navigation size={22} className="rotate-45" />
            </div>
            <input
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              className="w-full bg-transparent px-6 py-4 text-xl font-medium focus:outline-none"
              placeholder="What's your plan at NITA today?"
            />
            <button
              onClick={handleFinalSubmit}
              disabled={loading}
              className="bg-zinc-900 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all active:scale-95 disabled:opacity-70 shadow-lg shadow-zinc-300 dark:shadow-none"
            >
              {loading ? "Syncing..." : "Start Discovery"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: HIGHLIGHTED QUICK MATCH --- */}
      <div className="space-y-12">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-zinc-100 dark:border-zinc-800"></div>
          </div>
          <div className="relative bg-[#FAF9F6] dark:bg-zinc-950 px-8">
            <h2 className="text-xl font-black uppercase tracking-[0.5em] text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
              <Zap className="text-yellow-500 fill-yellow-500" size={20} />
              Quick Match
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <div key={cat.id} className="relative group">
              <button
                onClick={() => setIntent(cat.title)}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl border transition-all duration-300 active:scale-90
                  ${
                    intent.startsWith(cat.title)
                      ? "bg-zinc-900 border-zinc-900 text-white shadow-xl -translate-y-1 scale-105"
                      : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-zinc-900 hover:text-zinc-900 text-zinc-500 dark:text-zinc-400"
                  }`}
              >
                <span
                  className={`${intent.startsWith(cat.title) ? "text-white" : cat.color} transition-colors`}
                >
                  {cat.icon}
                </span>
                <span className="font-black text-[10px] uppercase tracking-[0.2em]">
                  {cat.title}
                </span>
              </button>

              {/* Hover Tooltip Field */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <p className="text-[9px] font-black uppercase text-zinc-400 mb-2 tracking-tighter">
                  Explain more...
                </p>
                <input
                  type="text"
                  placeholder="breifly explain more this...."
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2.5 text-[11px] focus:ring-1 focus:ring-zinc-900 outline-none transition-all placeholder:text-zinc-400"
                  onChange={(e) => setIntent(`${cat.title}: ${e.target.value}`)}
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-zinc-900 rotate-45 border-r border-b border-zinc-200 dark:border-zinc-800"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- STATS BAR --- */}
      <div className="pt-10 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            500+ NITians Online
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Powered by Gemini 1.5 Flash
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
