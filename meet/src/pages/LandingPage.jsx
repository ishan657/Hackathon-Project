import React from "react";
import { BookOpen, MapPin, Trophy, ArrowRight, Plane } from "lucide-react";
import Button from "../components/ui/Button";

const LandingPage = ({ setPage, user }) => {
  // Logic to handle redirection based on auth state
  const handleStartAction = () => {
    if (user) {
      setPage("dashboard");
    } else {
      setPage("login");
    }
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-zinc-200 min-h-screen overflow-x-hidden">
      {/* 1. New Glassmorphism Header - Matching the Bottom Button Style */}
      <header className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex flex-col items-center w-full p-8 md:p-16 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm relative overflow-hidden">
            {/* Subtle background visual anchor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-200/20 dark:bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center space-y-8">
              <div className="flex flex-col items-center gap-4">
                <p className="text-zinc-400 font-black tracking-[0.4em] uppercase text-[10px]">
                  Meet your partner
                </p>
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tighter text-zinc-900 dark:text-white uppercase">
                  Your campus life, <br />
                  <span className="italic font-serif font-light lowercase opacity-60">
                    synchronized.
                  </span>
                </h1>
              </div>

              <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto">
                The bridge for NITA students to find their perfect squads—for 2
                AM coding, canteen dates, or weekend expeditions.
              </p>

              <div className="flex flex-col items-center gap-6 pt-4">
                {/* The Button Container - Fixed logic */}
                <div className="p-1 border border-zinc-200 dark:border-zinc-700 rounded-[2rem] bg-white/80 dark:bg-zinc-800/50 shadow-sm inline-block">
                  <Button
                    variant="primary"
                    className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:scale-105 h-14 px-12 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl"
                    onClick={handleStartAction}
                  >
                    {user ? "Go to Dashboard" : "Get Started"}
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-[9px] tracking-widest">
                  <MapPin className="w-3 h-3" />
                  NITA Campus, Agartala
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Scrolling Sections - Straight Alignment */}

      {/* Study Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <BookOpen size={22} />
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Looking for Study Partners? <br />
              <span className="text-zinc-500">Sync your focus.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-sm">
              Find focus buddies for the Central Library or late-night group
              study sessions in the hostel.
            </p>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-zinc-900 shadow-2xl aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
              alt="NITA Study"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="py-20 px-6 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-zinc-900 shadow-2xl aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1639843091936-bb5fca7b5684?q=80&w=880&auto=format&fit=crop&q=80"
              alt="NITA Sports"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 md:order-2 space-y-6 md:pl-12">
            <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <Trophy size={22} />
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Need a Sports Squad? <br />
              <span className="text-zinc-500">Play with the best.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-sm">
              From Badminton pairs to Football teams on the main ground. Match
              with partners who match your energy.
            </p>
          </div>
        </div>
      </section>

      {/* Travel Section */}
      <section className="py-20 px-6 pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <Plane size={22} />
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Planning a Trip? <br />
              <span className="text-zinc-500">Explore together.</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-sm">
              Thinking of Neermahal or Unakoti this weekend? Match with fellow
              travelers and share the journey.
            </p>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-zinc-900 shadow-2xl aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800"
              alt="Travel"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Final Call to Action - The Reference Style */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center items-center gap-4 opacity-20">
            <div className="h-[1px] w-12 bg-zinc-900 dark:bg-zinc-100"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100"></div>
            <div className="h-[1px] w-12 bg-zinc-900 dark:bg-zinc-100"></div>
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl font-black tracking-tighter uppercase text-zinc-900 dark:text-white">
              The platform{" "}
              <span className="italic font-serif font-light lowercase">
                is live.
              </span>
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
              Join the growing network of NITA students. No barriers, just
              connections.
            </p>
          </div>

          <div className="inline-flex flex-col items-center p-1 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-sm">
            <Button
              variant="primary"
              className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:scale-[1.02] h-14 px-12 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] transition-all"
              onClick={handleStartAction}
            >
              {user ? "Enter Dashboard" : "Initialize Connection"}
            </Button>
          </div>

          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
            {user
              ? `Logged in as ${user.name}`
              : "Secure Login via Google Authentication"}
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
