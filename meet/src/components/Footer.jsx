import React from 'react';
import { Zap, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-zinc-100 bg-white rounded-t-[4rem]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-zinc-900">
              <Zap size={20} className="fill-zinc-900" />
              <span className="text-sm font-black tracking-tight uppercase">NITA CONNECT</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              The exclusive synergy network for NIT Agartala students to match, meet, and collaborate.
            </p>
          </div>

          {/* Developer Profiles */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Core Developers</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between group border-b border-zinc-50 pb-2">
                <span className="text-sm font-bold text-zinc-900">Bitik</span>
                <div className="flex gap-3">
                  <a href="https://linkedin.com/in/username1" target="_blank" className="text-zinc-300 hover:text-zinc-900 transition-colors"><Linkedin size={16}/></a>
                  <a href="https://github.com/username1" target="_blank" className="text-zinc-300 hover:text-zinc-900 transition-colors"><Github size={16}/></a>
                </div>
              </div>
              <div className="flex items-center justify-between group border-b border-zinc-50 pb-2">
                <span className="text-sm font-bold text-zinc-900">Ishan </span>
                <div className="flex gap-3">
                  <a href="https://linkedin.com/in/username2" target="_blank" className="text-zinc-300 hover:text-zinc-900 transition-colors"><Linkedin size={16}/></a>
                  <a href="https://github.com/username2" target="_blank" className="text-zinc-300 hover:text-zinc-900 transition-colors"><Github size={16}/></a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:text-right">
            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Platform</h4>
            <ul className="text-xs font-bold text-zinc-900 space-y-3">
              <li><a href="#" className="hover:underline">Safety Center</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-50 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-400 font-bold uppercase tracking-widest text-[9px]">
          <p>© 2024 NIT Agartala Synergy Network</p>
          <p>Made for Campus Innovation</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;