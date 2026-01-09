import React from "react";
import { Zap, Linkedin, Github, Heart, Globe, Command } from "lucide-react";

const Footer = () => {
  const developers = [
    { name: "Bitik", linkedin: "#", github: "#" },
    { name: "Ishan", linkedin: "#", github: "#" },
  ];

  const platformLinks = [
    { name: "Safety Center", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ];

  return (
    <footer className="w-full relative bg-white dark:bg-[#09090b] border-t border-zinc-200 dark:border-zinc-800/50 transition-all duration-300">
      {/* Aesthetic Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Brand Identity & Metadata */}
          <div className="space-y-4 text-center md:text-left">
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2.5 group cursor-pointer">
                <div className="p-1.5 bg-zinc-900 dark:bg-zinc-100 rounded-lg transition-transform group-hover:rotate-12">
                  <Zap size={16} className="text-white dark:text-zinc-900 fill-current" />
                </div>
                <span className="text-lg font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
                  CAMPUS CONNECT
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto md:mx-0">
                The exclusive synergy network for NIT Agartala students to match, meet, and collaborate.
              </p>
            </div>

            {/* Metadata: Copyright & Location */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center justify-center md:justify-start gap-3 text-[9px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                <span>© 2026 CAMPUS CONNECT</span>
                <div className="flex items-center gap-1.5 border-l border-zinc-200 dark:border-zinc-800 pl-3">
                  <Globe size={11} className="animate-spin-slow" />
                  <span>Agartala, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Centered Developers */}
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 flex items-center gap-2">
              <Command size={10} /> Created By
            </h4>
            <div className="space-y-4 w-full max-w-[120px]">
              {developers.map((dev) => (
                <div key={dev.name} className="flex flex-col items-center gap-1.5 group">
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    {dev.name}
                  </span>
                  <div className="flex gap-3.5 opacity-40 group-hover:opacity-100 transition-all duration-300">
                    <a href={dev.linkedin} className="hover:text-blue-500 transform hover:scale-110 transition-all">
                      <Linkedin size={13} />
                    </a>
                    <a href={dev.github} className="hover:text-zinc-900 dark:hover:text-white transform hover:scale-110 transition-all">
                      <Github size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Navigation & Credits */}
          <div className="space-y-4 text-center md:text-right flex flex-col items-center md:items-end">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">
              Platform
            </h4>
            <ul className="space-y-2 mb-2">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 pt-4 border-t border-zinc-100 dark:border-zinc-900/50 w-fit">
              <span>Made with</span>
              <Heart size={11} className="text-rose-500 fill-current animate-pulse" />
              <span>for Campus Innovation</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </footer>
  );
};


export default Footer;

