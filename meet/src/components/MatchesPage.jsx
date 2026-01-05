import React from 'react';
import Button from './ui/Button';

const MatchesPage = ({ setPage }) => {
  return (
    <div className="max-w-7xl mx-auto pt-32 pb-20 px-6 space-y-12 animate-in fade-in duration-500 text-center">
       <h2 className="text-5xl font-black text-zinc-400 dark:text-zinc-100 tracking-tighter">Discover NITA Tribes</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="bg-white dark:bg-zinc-900
           p-8 rounded-[3rem]
           border border-zinc-100 dark:border-zinc-800
          shadow-sm dark:shadow-black/40
          flex flex-col items-center
         group hover:shadow-xl
         transition-all">
               <div className="w-20 h-20 rounded-[2rem]
                bg-zinc-50 dark:bg-zinc-800
                mb-6 overflow-hidden
                border-2 border-white dark:border-zinc-700
                shadow-md">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=NITA_${i}`} alt="student" />
               </div>
               <h4 className="font-bold text-lg mb-1">NITian {i}</h4>
               <p className="text-zinc-400 dark:text-zinc-100 text-[10px] font-black uppercase mb-6 tracking-widest">NITA • CSE • 2nd Year</p>
               <div className="flex gap-2 w-full">
                  <Button variant="secondary" className="flex-1 rounded-2xl text-[10px] h-10 px-0">Profile</Button>
                  <Button onClick={() => setPage('chat')} className="flex-1 rounded-2xl text-[10px] h-10 px-0">Connect</Button>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};

export default MatchesPage;