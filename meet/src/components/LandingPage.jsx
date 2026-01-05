import React, { useState } from 'react';
import { 
  Users, BookOpen, MapPin, Code, Search, MessageSquare, 
  User, LogOut, Send, ArrowRight, ChevronLeft, X, 
  CheckCircle2, Plus, Bell, Heart, Star, Sparkles, Loader2,
  GraduationCap, MapPinIcon, Calendar, Info, Trophy, Mic, Activity, Flame, Zap,
  MoreVertical, Phone, Video, Paperclip, Smile, Camera, Image as ImageIcon, Compass,
  Lock, Tent, Clock, Github, Linkedin, AlertCircle
} from 'lucide-react';
import Button from './ui/Button';

const LandingPage = ({ setPage, user }) => {
  const [prefs, setPrefs] = useState({
    purpose: 'hackathon',
    timing: 'evening',
    gender: 'any'
  });

  const [activePurposeIdx, setActivePurposeIdx] = useState(0);

  const purposes = [
    { 
      id: 'coding', 
      label: 'Coding', 
      icon: Code, 
      desc: 'Late-night coding or project squads for NITA devs.',
      img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400'
    },
    { 
      id: 'library', 
      label: 'Study', 
      icon: BookOpen, 
      desc: 'Focus buddies for NITA Central Library sessions.',
      img: 'https://images.unsplash.com/photo-1521714161819-15534968fc5f?auto=format&fit=crop&q=80&w=400'
    },
    { 
      id: 'dating', 
      label: 'Dating', 
      icon: Heart, 
      desc: 'Genuine campus connections & canteen coffee dates.',
      img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400'
    },
    { 
      id: 'singing', 
      label: 'Singing', 
      icon: Mic, 
      desc: 'Jam sessions and musical collabs for college fests.',
      img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400'
    },
    { 
      id: 'hackathon', 
      label: 'Hackathon', 
      icon: Trophy, 
      desc: 'Build winning teams for inter-NIT tech hackathons.',
      img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400'
    },
  ];

  const timings = [
    { id: 'morning', label: 'Morning', icon: Clock },
    { id: 'evening', label: 'Evening', icon: Clock },
    { id: 'night', label: 'Late Night', icon: Clock },
  ];

  return (
    // <div className="pt-32 pb-20 space-y-32">
    <div className="pt-32 pb-20 space-y-32
                bg-transparent
                text-zinc-900 dark:text-zinc-100">


      {/* Hero Section */}
      <section className="px-6 animate-in fade-in duration-700">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/40
                border border-blue-100 dark:border-blue-900
                text-blue-600 dark:text-blue-300">
              <MapPin className="w-4 h-4" />
              <span>Exclusively for NIT Agartala Students</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-zinc-900 dark:text-zinc-100 leading-[1.1] tracking-tight">
              Match with your <br />
              <span className="text-zinc-500 italic font-serif">NITA Tribe.</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
              Connect with NITA students for projects, late-night coding, trips, or sports based on your schedule.
            </p>

            {/* <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-200/40 space-y-6 max-w-xl"> */}
            <div className="bg-white dark:bg-zinc-900
                p-8 rounded-[2.5rem]
                border border-zinc-100 dark:border-zinc-800
                shadow-xl shadow-zinc-200/40 dark:shadow-black/40
                space-y-6 max-w-xl">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] px-1">Initial Preference</label>
                <div className="flex flex-wrap gap-2">
                  {purposes.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => setPrefs({...prefs, purpose: p.id})}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm transition-all ${
                        prefs.purpose === p.id ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg' : 'bg-white border-zinc-100 text-zinc-500 hover:border-zinc-300'
                      }`}
                    >
                      <p.icon size={16} /> {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] px-1">Timing?</label>
                  <div className="flex flex-col gap-2">
                    {timings.map(t => (
                      <button 
                        key={t.id}
                        onClick={() => setPrefs({...prefs, timing: t.id})}
                        className={`flex items-center gap-3 px-4 py-2 rounded-xl border font-bold text-xs transition-all ${
                          prefs.timing === t.id ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white border-zinc-100 text-zinc-500 hover:border-zinc-300'
                        }`}
                      >
                        <t.icon size={14} /> {t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] px-1">Gender Pref.</label>
                  <div className="flex flex-col gap-2">
                    {['Any', 'Male', 'Female'].map(g => (
                      <button 
                        key={g}
                        onClick={() => setPrefs({...prefs, gender: g.toLowerCase()})}
                        className={`flex items-center justify-center px-4 py-2 rounded-xl border font-bold text-xs transition-all ${
                          prefs.gender === g.toLowerCase() ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white border-zinc-100 text-zinc-500 hover:border-zinc-300'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button variant="primary" className="w-full h-14 text-lg group" onClick={() => setPage(user ? 'dashboard' : 'login')}>
                {user ? 'Go to Dashboard' : 'Find My Tribe'} 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-zinc-200/50 rounded-[3rem] blur-2xl -z-10 animate-pulse"></div>
            <div className="relative bg-zinc-900 rounded-[3rem] p-4 shadow-2xl border-[8px] border-zinc-800 w-full max-w-[380px] mx-auto overflow-hidden">
              <div className="bg-[#FAF9F6] dark:bg-zinc-950 rounded-[2.2rem] h-[600px] overflow-hidden flex flex-col p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=NITA_STUDENT" alt="avatar" />
                  </div>
                  <MessageSquare className="w-6 h-6 text-zinc-400" />
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 shadow-sm border border-zinc-100 flex-grow mb-4">
                  <div className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 rounded-2xl mb-4 overflow-hidden relative shadow-inner">
                    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Student Life" />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-lg">NITA Connect</h3>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Matching Students Daily</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Purpose Showcase */}
      {/* <section className="px-6 py-20 bg-zinc-50/50 border-y border-zinc-100"> */}
      <section className="px-6 py-20
                    bg-zinc-50/50 dark:bg-zinc-950
                    border-y border-zinc-100 dark:border-zinc-800">

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">One App, Many Tribes.</h2>
            <p className="text-zinc-900 dark:text-zinc-100 font-bold uppercase tracking-widest text-[10px]">What are you connecting for today?</p>
          </div>

          <div className="bg-white dark:bg-zinc-900
                rounded-[3rem]
                border border-zinc-100 dark:border-zinc-800
                shadow-2xl overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row items-stretch min-h-[400px]">
          {/* <div className="bg-white dark:bg-zinc-900
                rounded-[3rem]
                border border-zinc-100 dark:border-zinc-800
                shadow-2xl"> */}

            {/* Sidebar Navigation */}
            <div className="w-full md:w-1/3 bg-zinc-50/50 border-r border-zinc-100 p-4 space-y-2">
              {purposes.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActivePurposeIdx(idx)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                    activePurposeIdx === idx 
                    ? 'bg-zinc-900 text-white shadow-lg' 
                    : 'text-zinc-500 hover:bg-zinc-100'
                  }`}
                >
                  <p.icon size={18} />
                  <span className="font-bold text-sm">{p.label}</span>
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center animate-in fade-in duration-500">
               <div className="flex flex-col md:flex-row items-center gap-8">
                 <div className="flex-1 space-y-4 text-center md:text-left">
                   <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{purposes[activePurposeIdx].label} Partners</h3>
                   <p className="text-zinc-500 dark:text-zinc-100 font-medium leading-relaxed">{purposes[activePurposeIdx].desc}</p>
                   <Button variant="ghost" className="mt-2 text-zinc-900 dark:text-zinc-100 font-black group" onClick={() => setPage('login')}>
                     Start Matching <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                   </Button>
                 </div>
                 {/* SMALL REAL IMAGE */}
                 <div className="w-40 h-40 md:w-56 md:h-56 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl rotate-3 shrink-0">
                    <img 
                      src={purposes[activePurposeIdx].img} 
                      className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" 
                      alt={purposes[activePurposeIdx].label} 
                    />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;