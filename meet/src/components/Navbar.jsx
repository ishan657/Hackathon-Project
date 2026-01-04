import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, MapPin, Code, Search, MessageSquare, 
  User, LogOut, Send, ArrowRight, ChevronLeft, X, 
  CheckCircle2, Plus, Bell, Heart, Star, Sparkles, Loader2,
  GraduationCap, MapPinIcon, Calendar, Info, Trophy, Mic, Activity, Flame, Zap,
  MoreVertical, Phone, Video, Paperclip, Smile, Camera, Image as ImageIcon, Compass,
  Lock, Tent, Clock, Github, Linkedin, AlertCircle
} from 'lucide-react';
import Button from './ui/Button';

const Navbar = ({ user, setPage, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('landing')}>
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5 fill-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900">NITA Connect</span>
        </div>

        {user ? (
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center gap-6 mr-2">
              <button onClick={() => setPage('dashboard')} className="text-sm font-bold text-zinc-600 hover:text-zinc-900 transition-colors">Dashboard</button>
              <button onClick={() => setPage('matches')} className="text-sm font-bold text-zinc-600 hover:text-zinc-900 transition-colors">Explore</button>
            </div>

            {/* Request Status / Notification Icon */}
            <div className="relative">
              <button 
                onClick={() => setShowStatus(!showStatus)}
                className="p-2.5 hover:bg-zinc-100 rounded-full text-zinc-600 relative transition-all active:scale-90"
                title="Requests Status"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
              </button>
              
              {showStatus && (
                <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-zinc-100 p-4 animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
                  <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-3 px-2">Recent Updates</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <CheckCircle2 className="text-emerald-500 w-4 h-4 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-emerald-900">Request Accepted</p>
                        <p className="text-[10px] text-emerald-600">Sneha accepted your coding invite.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded-2xl border border-red-100">
                      <AlertCircle className="text-red-500 w-4 h-4 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-red-900">Request Declined</p>
                        <p className="text-[10px] text-red-600">Library buddy session rejected.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => setPage('chat')} className="p-2.5 hover:bg-zinc-100 rounded-full text-zinc-600 relative transition-all active:scale-90">
              <MessageSquare size={20} />

            </button>

            <div className="h-8 w-[1px] bg-zinc-200 hidden sm:block"></div>

            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setPage('onboarding')}>
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold text-zinc-900 leading-none">{user.name || 'NITian'}</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1 tracking-widest">Profile</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-zinc-100 hover:ring-2 hover:ring-zinc-900 transition-all">
                <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=NITA`} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Tree Dot / More Menu Button */}
            <div className="relative group">
              <button className="p-2.5 hover:bg-zinc-100 rounded-full text-zinc-600 transition-all active:scale-90">
                <MoreVertical size={20} />
              </button>
              <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-zinc-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] py-2">
                <button className="w-full text-left px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 flex items-center gap-3">
                  <User size={16} /> Account
                </button>
                <button className="w-full text-left px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 flex items-center gap-3">
                  <Lock size={16} /> Privacy
                </button>
                <div className="h-[1px] bg-zinc-100 my-1 mx-2"></div>
                <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-3">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="px-4" onClick={() => setPage('login')}>Login</Button>
            <Button variant="primary" onClick={() => setPage('login')}>Join NITA</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;