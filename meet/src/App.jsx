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

  const handleLogin = (enrollment) => {
    const mockUser = {
      uid: enrollment || 'nita-user-123',
      name: enrollment || 'NITA Student',
      avatar: null,
      interests: []
    };
    setUser(mockUser);
    setPage('onboarding');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('landing');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans selection:bg-zinc-900 selection:text-white">
      <Navbar user={user} setPage={setPage} onLogout={handleLogout} />
      
      <main>
        {page === 'landing' && <LandingPage setPage={setPage} user={user} />}
        
        {page === 'login' && <LoginPage onLogin={handleLogin} />}

        {page === 'onboarding' && <OnboardingForm setGlobalUser={setUser} onComplete={() => setPage('dashboard')} />}
        {page === 'dashboard' && <Dashboard user={user} setPage={setPage} />}
        {page === 'chat' && <ChatPage setPage={setPage} />}
        {page === 'matches' && <MatchesPage setPage={setPage} />}
      </main>

      <Footer />
    </div>
  );
}