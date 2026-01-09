import React, { useState, useEffect, useMemo } from 'react';
import { Search, Users, Map, Coffee, Code, BookOpen, Heart, Gamepad2, Dumbbell, Music, Camera, Sparkles, Filter, ChevronRight, MessageCircle } from 'lucide-react';

// --- DUMMY DATA STRUCTURE ---
const INITIAL_DATA = {
  people: [
    { id: 1, name: "Aarav Sharma", type: "person", branch: "CSE", year: "3rd", tags: ["Coding", "Hackathons"], bio: "Looking for a backend dev for Smart India Hackathon.", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop" },
    { id: 2, name: "Isha Patel", type: "person", branch: "ECE", year: "2nd", tags: ["Music", "Jam Session"], bio: "Vocalist looking for a guitarist for the college fest.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
    { id: 3, name: "Rohan Das", type: "person", branch: "ME", year: "4th", tags: ["Gym Partner", "Fitness"], bio: "Looking for a spotter for morning sessions at the campus gym.", image: "b.png" },
    { id: 4, name: "Sanya Gupta", type: "person", branch: "EE", year: "1st", tags: ["Photography", "Travel"], bio: "Exploring the city every weekend. Join me?", image: "UI.png" },
  ],
  groups: [
    { id: 101, name: "The Bug Hunters", type: "group", members: 12, category: "Coding Match", description: "Weekly competitive programming sprints.", icon: <Code className="w-6 h-6" /> },
    { id: 102, name: "Midnight Maggi Club", type: "activity", members: 45, category: "Night Canteen", description: "Gathering at the night canteen for snacks and chats.", icon: <Coffee className="w-6 h-6" /> },
    { id: 103, name: "NITA Trekking Squad", type: "group", members: 89, category: "Trip / Camp", description: "Planning a trip to the nearby hills this Saturday.", icon: <Map className="w-6 h-6" /> },
    { id: 104, name: "Valorant Warriors", type: "group", members: 20, category: "Gaming Squad", description: "Looking for a high-rank duelist for the inter-college tourney.", icon: <Gamepad2 className="w-6 h-6" /> },
  ]
};

const CATEGORIES = [
  { label: "Coding Match", icon: <Code size={18} /> },
  { label: "Hackathon Partner", icon: <Sparkles size={18} /> },
  { label: "Study Buddy", icon: <BookOpen size={18} /> },
  { label: "Campus Dating", icon: <Heart size={18} /> },
  { label: "Trip / Camp", icon: <Map size={18} /> },
  { label: "Gaming Squad", icon: <Gamepad2 size={18} /> },
  { label: "Gym Partner", icon: <Dumbbell size={18} /> },
  { label: "Music / Jam", icon: <Music size={18} /> },
  { label: "Photography", icon: <Camera size={18} /> },
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [allData, setAllData] = useState([]);

  // Flatten and randomize data on initial load
  useEffect(() => {
    const combined = [...INITIAL_DATA.people, ...INITIAL_DATA.groups];
    setAllData(combined.sort(() => Math.random() - 0.5));
  }, []);

  // Filter Logic
  const filteredResults = useMemo(() => {
    let results = allData;

    if (selectedCategory !== "All") {
      results = results.filter(item => 
        (item.tags && item.tags.some(tag => tag.includes(selectedCategory.split(' ')[0]))) ||
        (item.category && item.category.includes(selectedCategory))
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(item => 
        item.name.toLowerCase().includes(q) ||
        (item.bio && item.bio.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    return results;
  }, [searchQuery, selectedCategory, allData]);

  const handleSearchChange = (e) => {
    setIsLoading(true);
    setSearchQuery(e.target.value);
    // Simulate real-time suggestions lag
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    // <div className="min-h-screen bg-gray-50 text-slate-900 font-sans pb-12">
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans pb-12">

      {/* Sticky Top Header - Now focused strictly on Search and Filters */}
      <header className="sticky top-0 z-30 bg-white/80  dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-100 px-4 py-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-5">
          
          {/* Search Bar - Main Focus */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              {/* <Search className={`w-5 h-5 ${isLoading ? 'animate-pulse text-indigo-400' : 'text-gray-400'}`} /> */}
              <Search
               className={`w-5 h-5 ${
    isLoading
      ? "animate-pulse text-indigo-400"
      : "text-gray-400 dark:text-zinc-400"
                }`}
                />

            </div>
            <input
              type="text"
              placeholder="What are you looking for? (hackathon, study buddy, trip...)"
              // className="w-full bg-gray-100 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm text-sm sm:text-base"
              className="w-full bg-gray-100 dark:bg-zinc-800 dark:text-zinc-100 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-zinc-900 transition-all shadow-sm"

              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide no-scrollbar">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                selectedCategory === "All" ? "bg-indigo-600 text-white shadow-md" : "bg-white border border-gray-200 dark:border-zinc-800 text-gray-600 hover:border-indigo-300"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  selectedCategory === cat.label ? "bg-indigo-600 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-zinc-100">
            {searchQuery || selectedCategory !== "All" ? "Search Results" : "Explore Discoveries"}
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-zinc-400">({filteredResults.length})</span>
          </h2>
          <button className="text-indigo-600 text-sm font-medium flex items-center hover:underline">
            Refine <Filter size={14} className="ml-1" />
          </button>
        </div>

        {/* Dynamic Grid */}
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResults.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState onReset={() => { setSearchQuery(""); setSelectedCategory("All"); }} />
        )}
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function Card({ item }) {
  const isPerson = item.type === "person";

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Visual Header */}
      <div className="relative h-40 bg-indigo-50 dark:bg-zinc-800 overflow-hidden">
        {isPerson ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                {item.icon}
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
            isPerson ? 'bg-white/80 text-indigo-600' : 'bg-black/20 text-white'
          }`}>
            {item.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="font-bold text-gray-900 dark:text-zinc-100 leading-tight mb-1 truncate">{item.name}</h3>
          <p className="text-xs text-gray-500 font-medium">
            {isPerson ? `${item.branch} • ${item.year} Year` : `${item.members} members • ${item.category}`}
          </p>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {isPerson ? item.bio : item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {(isPerson ? item.tags : [item.category]).map((tag, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-semibold rounded-md uppercase">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button className="mt-auto w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 group/btn">
          {isPerson ? "Connect" : "Join Group"}
          <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Search size={40} className="text-gray-300" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">No exact matches found</h3>
      <p className="text-gray-500 max-w-xs mb-8">
        We couldn't find exactly what you're looking for, but the campus is big! Try a broader keyword or browse categories.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button 
          onClick={onReset}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
        >
          Reset Filters
        </button>
        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center gap-2">
          <MessageCircle size={18} />
          Ask Campus AI
        </button>
      </div>
    </div>
  );
}