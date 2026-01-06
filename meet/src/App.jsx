import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, BookOpen, MapPin, Code, Search, MessageSquare, 
  User, LogOut, Send, ArrowRight, ChevronLeft, X, 
  CheckCircle2, Plus, Bell, Heart, Star, Sparkles, Loader2,
  GraduationCap, MapPinIcon, Calendar, Info, Trophy, Mic, Activity, Flame, Zap,
  MoreVertical, Phone, Video, Paperclip, Smile, Camera, Image as ImageIcon, Compass,
  Lock, Tent, Clock, Github, Linkedin, AlertCircle
} from 'lucide-react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';
import MatchesPage from './components/MatchesPage';
import Footer from './components/Footer';
import Button from './components/ui/Button';
import InputField from './components/ui/InputField';

/**
 * NITA Connect - NIT Agartala Exclusive
 * Updated: Navbar with Notification Status (Accepted/Rejected) and More (Three-dot) Menu.
 */









// --- App Root ---

export default function App() {
  const [page, setPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [showReason, setShowReason] = useState(false);
  const startExploringWithReason = () => {
    setPage("matches");      // show matches immediately
    setShowReason(true);     // show Gemini reason popup
  };
  

  // const handleLogin = (enrollment) => {
  //   const mockUser = {
  //     uid: enrollment || 'nita-user-123',
  //     name: enrollment || 'NITA Student',
  //     avatar: null,
  //     interests: []
  //   };
  //   setUser(mockUser);
  //   setPage('onboarding');
  // };
  const handleLogin = () => {
    // 🔴 TEMPORARY DUMMY AUTH
    setUser({
      id: "dummy-user",
      name: "NITA Student",
    });
  
    setPage("onboarding"); // move forward
  };
  

  const handleLogout = () => {
    setUser(null);
    setPage('landing');
  };

  return (
    // <div className="min-h-screen bg-[#FAF9F6] font-sans selection:bg-zinc-900 selection:text-white">
    // <div className="min-h-screen bg-[#FAF9F6] dark:bg-zinc-950">
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">


      
      <Navbar user={user} setPage={setPage} onLogout={handleLogout} />
      
      <main className="pt-24 flex-1">
        {page === 'landing' && <LandingPage setPage={setPage} user={user} />}
        
        {page === 'login' && <LoginPage onLogin={handleLogin} />}

        {page === 'onboarding' && <OnboardingForm setGlobalUser={setUser} onComplete={() => setPage('dashboard')} />}
        {/* {page === 'dashboard' && <Dashboard user={user} setPage={setPage} />} */}
        {page === "dashboard" && (
          <Dashboard
          user={user}
          setPage={setPage}
          onStartExploring={startExploringWithReason}
          />
         )}

        {page === 'chat' && <ChatPage setPage={setPage} />}
        {page === 'matches' && <MatchesPage setPage={setPage} />}
        {showReason && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-xl">

      <h2 className="text-xl font-semibold text-zinc-900 mb-2">
        🤖 Why Gemini recommended these matches
      </h2>

      <p className="text-sm text-zinc-600 mb-4">
        Gemini analyzed your profile and activity to find the most relevant matches.
      </p>

      <ul className="space-y-2 text-sm text-zinc-700">
        <li>• Strong overlap with your interests</li>
        <li>• Similar activity and engagement level</li>
        <li>• High compatibility with your goals</li>
      </ul>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={() => setShowReason(false)}
          className="bg-zinc-900 text-white rounded-xl px-6"
        >
          Got it
        </Button>
      </div>

    </div>
  </div>
        )}

      </main>

      <Footer />
    </div>
  );

}
