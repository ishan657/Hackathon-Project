import React from 'react';
import { Heart, Trophy, Tent, BookOpen, Clock, Code, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

const Dashboard = ({ user, setPage,onStartExploring }) => {
  const categories = [
    { id: 'dating', title: 'Campus Dating', icon: <Heart className="fill-red-500 text-red-500" />, desc: 'Find that special connection.' },
    { id: 'hackathon', title: 'Hackathon Partner', icon: <Trophy className="text-amber-500" />, desc: 'Form the ultimate tech squad.' },
    { id: 'trip', title: 'Camp/Trip', icon: <Tent className="text-emerald-500" />, desc: 'Join or host an adventure.' },
    { id: 'study', title: 'Study Buddy', icon: <BookOpen className="text-blue-500" />, desc: 'Focus on your goals together.' },
    { id: 'night', title: 'Night Canteen Buddy', icon: <Clock className="text-orange-500" />, desc: 'Late night snack companion.' },
    { id: 'coding', title: 'Coding Match', icon: <Code className="text-zinc-600" />, desc: 'Pair program and build things.' },
  ];

  return (
    <div className="max-w-7xl mx-auto pt-32 pb-20 px-6 space-y-16 animate-in fade-in duration-500">
      <div className="bg-zinc-900 text-white rounded-[3rem] p-12 lg:p-20 relative overflow-hidden shadow-xl flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-zinc-300 text-[10px] font-black uppercase tracking-[0.2em]">Smart Matching Live</div>
          <h2 className="text-5xl font-bold tracking-tight leading-tight">Welcome to NITA Tribe, <br/><span className="italic font-serif text-zinc-400">{user?.name?.split(' ')[0] || 'NITian'}</span></h2>
          <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-md">Your perfect partner for {user?.interests?.[0] || 'projects'} is ready to connect.</p>
          {/* <Button onClick={() => setPage('matches')} className="bg-white text-zinc-900 px-10 h-14 rounded-2xl">Start Exploring <ArrowRight /></Button> */}
          <Button onClick={onStartExploring}>
          Start Exploring
         <ArrowRight className="w-5 h-5" />
          </Button>

        </div>
        <div className="w-full lg:w-1/3 aspect-square bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-inner">
           {/* <MapPin size={120} className="text-white/10" /> */}
           <img
             src="b.png"
             alt="college"
             className="rounded-xl"
           />

        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer" onClick={() => setPage('matches')}>
            <div className="mb-6 w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-2">{cat.title}</h3>
            <p className="text-zinc-500 font-medium leading-relaxed">{cat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;