import React, { useState, useEffect } from "react";
import {
  Users,
  BookOpen,
  MapPin,
  Code,
  Search,
  MessageSquare,
  User,
  LogOut,
  Send,
  ArrowRight,
  ChevronLeft,
  X,
  CheckCircle2,
  Plus,
  Bell,
  Heart,
  Star,
  Sparkles,
  Loader2,
  GraduationCap,
  MapPinIcon,
  Calendar,
  Info,
  Trophy,
  Mic,
  Activity,
  Flame,
  Zap,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
} from "lucide-react";

// --- Reusable UI Primitives ---

const Button = ({
  children,
  variant = "primary",
  className = "",
  loading = false,
  ...props
}) => {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100 disabled:bg-blue-400",
    secondary:
      "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    google:
      "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm flex items-center justify-center gap-3",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "text-red-600 hover:bg-red-50",
  };

  return (
    <button
      className={`px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 ${variants[variant]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" size={20} /> : children}
    </button>
  );
};

const InputField = ({ label, error, ...props }) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}
      </label>
    )}
    <input
      className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium ${error ? "border-red-500" : "border-slate-200"}`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
  </div>
);

const SelectField = ({ label, options, error, ...props }) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}
      </label>
    )}
    <select
      className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium appearance-none ${error ? "border-red-500" : "border-slate-200"}`}
      {...props}
    >
      <option value="">Select an option</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
  </div>
);

// --- Background Mesh Effect ---

const MeshBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px] animate-pulse"></div>
    <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-indigo-400/10 blur-[100px] animate-pulse"></div>
  </div>
);

// --- Onboarding Flow Component ---

const OnboardingForm = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    college: "",
    year: "",
    interests: [],
    topInterests: [],
    lookingFor: [],
    bio: "",
    location: "",
    availability: "",
  });

  const [errors, setErrors] = useState({});

  const interestOptions = [
    "Coding",
    "Competitive Programming",
    "Reading",
    "Music",
    "Gym",
    "Travel",
    "Startups",
    "Photography",
    "Gaming",
    "Cooking",
    "Cricket",
    "Singing",
    "AI/ML",
  ];
  const lookingForOptions = [
    "Library / Study Partner",
    "Project Teammate",
    "Trip Partner",
    "Campus Dating",
    "Hackathon Partner",
    "Cricket Match",
    "Singing / Jamming",
    "Event Companion",
  ];
  const locationOptions = [
    "Main Campus",
    "Block A Hostel",
    "Block B Hostel",
    "Block C Hostel",
    "Faculty Quarters",
    "Off-Campus",
  ];
  const timeOptions = ["Morning", "Afternoon", "Evening", "Night"];

  const validateStep1 = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.age || formData.age < 16 || formData.age > 35)
      newErrors.age = "Age 16-35 required";
    if (!formData.gender) newErrors.gender = "Gender required";
    if (!formData.college) newErrors.college = "College/Dept required";
    if (!formData.year) newErrors.year = "Year required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      const updated = exists
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const handleLookingForToggle = (item) => {
    setFormData((prev) => {
      const exists = prev.lookingFor.includes(item);
      return {
        ...prev,
        lookingFor: exists
          ? prev.lookingFor.filter((i) => i !== item)
          : [...prev.lookingFor, item],
      };
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.bio ||
      formData.interests.length === 0 ||
      !formData.location ||
      !formData.availability
    ) {
      alert("Please fill in your bio, interests, location, and availability!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <MeshBackground />
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Setup Your Profile
            </h2>
            <p className="text-slate-500 font-bold">Step {step} of 2</p>
          </div>
          <div className="flex gap-2">
            <div
              className={`h-2.5 w-12 rounded-full transition-all ${step >= 1 ? "bg-blue-600" : "bg-slate-200"}`}
            ></div>
            <div
              className={`h-2.5 w-12 rounded-full transition-all ${step >= 2 ? "bg-blue-600" : "bg-slate-200"}`}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100">
        {step === 1 ? (
          <div className="space-y-6">
            <InputField
              label="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={errors.name}
            />
            <div className="grid grid-cols-2 gap-6">
              <InputField
                label="Age"
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                error={errors.age}
              />
              <SelectField
                label="Gender"
                options={["Male", "Female", "Other", "Private"]}
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                error={errors.gender}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <InputField
                label="College / Dept"
                value={formData.college}
                onChange={(e) =>
                  setFormData({ ...formData, college: e.target.value })
                }
                error={errors.college}
              />
              <SelectField
                label="Year"
                options={["1st", "2nd", "3rd", "4th"]}
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                error={errors.year}
              />
            </div>
            <Button
              className="w-full py-4 mt-4"
              onClick={() => validateStep1() && setStep(2)}
            >
              Next Step <ArrowRight size={20} />
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-black text-slate-700 mb-4 uppercase tracking-wider">
                Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((opt) => (
                  <span
                    key={opt}
                    onClick={() => handleInterestToggle(opt)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-all border-2 ${formData.interests.includes(opt) ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-50 border-slate-100 text-slate-500"}`}
                  >
                    {opt}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-slate-700 mb-4 uppercase tracking-wider">
                Activities to find partners for
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lookingForOptions.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 cursor-pointer hover:border-blue-200 transition-all"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-blue-600"
                      checked={formData.lookingFor.includes(opt)}
                      onChange={() => handleLookingForToggle(opt)}
                    />
                    <span className="text-sm font-bold text-slate-700">
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-wider">
                Bio
              </label>
              <textarea
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none h-28 font-medium"
                placeholder="Tell others about yourself..."
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                label="Hostel / Location"
                options={locationOptions}
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
              <SelectField
                label="Best Time to Meet"
                options={timeOptions}
                value={formData.availability}
                onChange={(e) =>
                  setFormData({ ...formData, availability: e.target.value })
                }
              />
            </div>

            <div className="flex gap-4">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-[2] py-4"
                loading={loading}
                onClick={handleSubmit}
              >
                Complete Setup
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Auth Layout ---

const AuthLayout = ({ children, title, subtitle, footer }) => (
  <div className="relative min-h-screen flex items-center justify-center p-4">
    <div className="absolute inset-0 -z-20">
      <img
        src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2070"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-[2px]"></div>
    </div>
    <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl w-full max-w-md border border-white/50 animate-in zoom-in-95 duration-500">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="text-slate-600 mt-2 font-medium">{subtitle}</p>
      </div>
      {children}
      <div className="mt-8 text-center border-t pt-6 font-bold text-slate-500">
        {footer}
      </div>
    </div>
  </div>
);

// --- Navbar ---

const Navbar = ({ user, setPage, logout }) => (
  <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
    <div
      className="flex items-center gap-2 cursor-pointer group"
      onClick={() => setPage("dashboard")}
    >
      <div className="bg-blue-600 p-2 rounded-lg text-white font-bold text-xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
        N
      </div>
      <span className="font-bold text-xl text-slate-800 tracking-tight">
        Nita Connect
      </span>
    </div>
    {user && (
      <div className="flex items-center gap-2 sm:gap-6">
        <button
          onClick={() => setPage("chat")}
          className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
        >
          <MessageSquare size={20} />
        </button>
        <button
          onClick={logout}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
        </button>
      </div>
    )}
  </nav>
);

// --- Dashboard ---

const Dashboard = ({ user, setPage }) => {
  const categories = [
    {
      id: "dating",
      title: "Campus Dating",
      icon: <Heart className="fill-red-500 text-red-500" />,
      color: "red",
      desc: "Find your special someone right here on campus.",
    },
    {
      id: "hackathon",
      title: "Hackathon Partner",
      icon: <Trophy />,
      color: "amber",
      desc: "Form the ultimate tech squad for the next big hack.",
    },
    {
      id: "cricket",
      title: "Cricket Match",
      icon: <Activity />,
      color: "emerald",
      desc: "Need an 11th player? Join a match happening now.",
    },
    {
      id: "singing",
      title: "Singing / Jamming",
      icon: <Mic />,
      color: "orange",
      desc: "Collaborate with fellow vocalists and musicians.",
    },
    {
      id: "study",
      title: "Library Partner",
      icon: <BookOpen />,
      color: "blue",
      desc: "Find someone to crush that syllabus with.",
    },
    {
      id: "trip",
      title: "Trip Partner",
      icon: <MapPin />,
      color: "indigo",
      desc: "Planning a Shillong trip? Find fellow travelers.",
    },
    {
      id: "project",
      title: "Project Team",
      icon: <Code />,
      color: "pink",
      desc: "Build the next big thing with a solid team.",
    },
    {
      id: "social",
      title: "Social Hangout",
      icon: <Users />,
      color: "purple",
      desc: "Connect with people who share your passion.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-12">
      <MeshBackground />
      <section className="relative bg-white/60 backdrop-blur-2xl rounded-[3.5rem] overflow-hidden shadow-2xl border border-white min-h-[500px] flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center z-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-blue-200">
              <Zap size={12} className="fill-white" /> Trending Now
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Meet your <span className="text-blue-600">campus</span> partner.
          </h2>
          <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-lg mb-8">
            The profile you just setup helps us find the best matches for your
            goals. Start exploring now!
          </p>
          <Button
            onClick={() => setPage("matches")}
            className="px-10 py-4 text-lg rounded-2xl w-fit"
          >
            Discover Matches <Search size={20} />
          </Button>
        </div>
        <div className="lg:w-1/2 relative h-80 lg:h-auto overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=2069"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white/60 to-transparent hidden lg:block backdrop-blur-sm"></div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-lg border border-white hover:shadow-2xl hover:-translate-y-2 transition-all group cursor-pointer"
            onClick={() => setPage("matches")}
          >
            <div
              className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ${cat.id === "dating" ? "bg-red-500" : "bg-blue-600"} text-white`}
            >
              {React.cloneElement(cat.icon, { size: 28 })}
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-1">
              {cat.title}
            </h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              {cat.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- App Root ---

const App = () => {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessage, setChatMessage] = useState("");

  const login = () => {
    setUser({ name: "Alex" });
    setPage("onboarding");
  };

  const chats = [
    {
      id: 1,
      name: "Sneha Sharma",
      lastMsg: "See you at the library!",
      time: "10:42 AM",
      unread: 2,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
      status: "online",
    },
    {
      id: 2,
      name: "Rahul Verma",
      lastMsg: "Did you finish the assignment?",
      time: "09:15 AM",
      unread: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      status: "last seen today at 8:00 AM",
    },
    {
      id: 3,
      name: "Cricket Group",
      lastMsg: "Who's playing at 5 PM?",
      time: "Yesterday",
      unread: 15,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Group",
      status: "Ananya, Rohit, +12 others",
    },
    {
      id: 4,
      name: "Ananya Kapur",
      lastMsg: "The Shillong trip plan is ready!",
      time: "Monday",
      unread: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
      status: "online",
    },
  ];

  const messages = [
    {
      id: 1,
      text: "Hey! I saw we matched for the library study session.",
      time: "10:30 AM",
      isMe: false,
    },
    {
      id: 2,
      text: "Yeah! I'm planning to work on Discrete Maths today. You?",
      time: "10:32 AM",
      isMe: true,
    },
    {
      id: 3,
      text: "Same here. I'm struggling with the probability section.",
      time: "10:33 AM",
      isMe: false,
    },
    {
      id: 4,
      text: "No worries, we can solve it together. I'll be there in 15 mins.",
      time: "10:35 AM",
      isMe: true,
    },
    { id: 5, text: "See you at the library!", time: "10:42 AM", isMe: false },
  ];

  return (
    <div className="min-h-screen text-slate-900 selection:bg-blue-100 font-sans">
      {page !== "login" && page !== "signup" && (
        <Navbar
          user={user}
          setPage={setPage}
          logout={() => {
            setUser(null);
            setPage("login");
          }}
        />
      )}

      <main>
        {page === "login" && (
          <AuthLayout
            title="Nita Connect"
            subtitle="Campus life, upgraded."
            footer={
              <>
                New here?{" "}
                <button
                  onClick={() => setPage("signup")}
                  className="text-blue-600 font-black"
                >
                  Join Now
                </button>
              </>
            }
          >
            <div className="space-y-4">
              <Button
                variant="google"
                onClick={login}
                className="w-full py-3.5 mb-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </Button>
              <InputField label="ID Number" placeholder="e.g. 21BCE045" />
              <InputField label="Password" type="password" />
              <Button onClick={login} className="w-full py-4 mt-2">
                Enter Campus
              </Button>
            </div>
          </AuthLayout>
        )}

        {page === "signup" && (
          <AuthLayout
            title="Get Started"
            subtitle="Connect with your peers."
            footer={
              <>
                Already a member?{" "}
                <button
                  onClick={() => setPage("login")}
                  className="text-blue-600 font-black"
                >
                  Login
                </button>
              </>
            }
          >
            <div className="space-y-4">
              <Button
                variant="google"
                onClick={login}
                className="w-full py-3.5 mb-2"
              >
                Continue with Google
              </Button>
              <InputField label="ID Number" />
              <InputField label="Password" type="password" />
              <Button onClick={login} className="w-full py-4">
                Create Account
              </Button>
            </div>
          </AuthLayout>
        )}

        {page === "onboarding" && (
          <OnboardingForm onSuccess={() => setPage("dashboard")} />
        )}
        {page === "dashboard" && <Dashboard user={user} setPage={setPage} />}
        {page === "matches" && (
          <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in zoom-in-95 duration-500">
            <h2 className="text-4xl font-black text-slate-900 text-center">
              Top Matches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="bg-white p-8 rounded-[3rem] shadow-lg border border-slate-100 flex flex-col items-center text-center"
                >
                  <img
                    src={chat.avatar}
                    className="w-24 h-24 rounded-[2rem] bg-blue-50 mb-6 shadow-md"
                  />
                  <h3 className="text-2xl font-black text-slate-800">
                    {chat.name}
                  </h3>
                  <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-1 mb-6">
                    98% Compatible
                  </p>
                  <div className="flex gap-3 w-full">
                    <Button variant="secondary" className="flex-1 rounded-2xl">
                      Profile
                    </Button>
                    <Button
                      onClick={() => {
                        setActiveChat(chat);
                        setPage("chat");
                      }}
                      className="flex-1 rounded-2xl"
                    >
                      Hi!
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === "chat" && (
          <div className="max-w-7xl mx-auto h-[calc(100vh-100px)] p-4">
            <MeshBackground />
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 h-full flex overflow-hidden">
              {/* WhatsApp Left Sidebar */}
              <div
                className={`w-full md:w-80 lg:w-96 border-r flex flex-col bg-slate-50/30 ${activeChat ? "hidden md:flex" : "flex"}`}
              >
                <div className="p-6 border-b bg-white flex items-center justify-between">
                  <h3 className="font-black text-2xl tracking-tight">Chats</h3>
                  <div className="flex gap-2 text-slate-400">
                    <button className="p-2 hover:bg-slate-100 rounded-lg">
                      <Plus size={20} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Search matches..."
                    />
                  </div>
                </div>
                <div className="overflow-y-auto flex-1">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setActiveChat(chat)}
                      className={`p-4 flex items-center gap-4 cursor-pointer transition-all border-b border-slate-50/50 
                        ${activeChat?.id === chat.id ? "bg-white border-l-4 border-l-blue-600" : "hover:bg-white/50"}`}
                    >
                      <img
                        src={chat.avatar}
                        className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100"
                        alt={chat.name}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <h4 className="font-black text-slate-800 truncate">
                            {chat.name}
                          </h4>
                          <span
                            className={`text-[10px] font-bold ${chat.unread > 0 ? "text-blue-600" : "text-slate-400"}`}
                          >
                            {chat.time}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-slate-500 font-medium truncate flex-1">
                            {chat.lastMsg}
                          </p>
                          {chat.unread > 0 && (
                            <span className="bg-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-blue-200">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp Main Window */}
              <div
                className={`flex-1 flex flex-col bg-white ${!activeChat ? "hidden md:flex items-center justify-center text-center" : "flex"}`}
              >
                {activeChat ? (
                  <>
                    {/* Header */}
                    <header className="p-4 border-b flex items-center justify-between px-6 md:px-8 bg-white/50 backdrop-blur-sm z-10">
                      <div className="flex items-center gap-4">
                        <button
                          className="md:hidden p-2 -ml-2 text-slate-400"
                          onClick={() => setActiveChat(null)}
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <div className="relative">
                          <img
                            src={activeChat.avatar}
                            className="w-12 h-12 rounded-2xl bg-slate-50 shadow-sm border border-slate-100"
                            alt={activeChat.name}
                          />
                          {activeChat.status === "online" && (
                            <span className="absolute -bottom-1 -right-1 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-black text-slate-800 leading-none mb-1.5">
                            {activeChat.name}
                          </h4>
                          <p
                            className={`text-[10px] font-black uppercase tracking-widest ${activeChat.status === "online" ? "text-green-500" : "text-slate-400"}`}
                          >
                            {activeChat.status}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 md:gap-4 text-slate-400">
                        <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                          <Video size={20} />
                        </button>
                        <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                          <Phone size={20} />
                        </button>
                        <div className="w-[1px] bg-slate-100 h-8 mx-1 hidden md:block"></div>
                        <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                          <Search size={20} />
                        </button>
                        <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                          <MoreVertical size={20} />
                        </button>
                      </div>
                    </header>

                    {/* Chat Body */}
                    <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#f0f2f5] relative">
                      {/* Optional Background Pattern */}
                      <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                          backgroundImage:
                            "url('https://www.transparenttextures.com/patterns/cubes.png')",
                        }}
                      ></div>

                      <div className="flex justify-center mb-8">
                        <span className="bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">
                          Today
                        </span>
                      </div>

                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.isMe ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                        >
                          <div
                            className={`relative p-4 rounded-3xl max-w-[85%] md:max-w-[70%] shadow-sm ${msg.isMe ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-slate-700 rounded-tl-none border border-slate-100"}`}
                          >
                            <p className="font-medium text-sm leading-relaxed">
                              {msg.text}
                            </p>
                            <div
                              className={`flex items-center gap-1 mt-1.5 ${msg.isMe ? "justify-end" : "justify-start"}`}
                            >
                              <span
                                className={`text-[9px] font-bold ${msg.isMe ? "text-blue-100" : "text-slate-400"}`}
                              >
                                {msg.time}
                              </span>
                              {msg.isMe && (
                                <CheckCircle2
                                  size={10}
                                  className="text-blue-200"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </main>

                    {/* Footer Input */}
                    <footer className="p-4 md:p-6 bg-white border-t flex items-center gap-3 md:gap-4">
                      <div className="flex gap-1">
                        <button className="p-2.5 text-slate-400 hover:text-blue-600 transition-colors">
                          <Smile size={22} />
                        </button>
                        <button className="p-2.5 text-slate-400 hover:text-blue-600 transition-colors">
                          <Paperclip size={22} />
                        </button>
                      </div>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && setChatMessage("")
                          }
                          placeholder="Type a message..."
                          className="w-full p-4 bg-slate-50 border-none rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 outline-none font-medium placeholder:text-slate-400"
                        />
                      </div>
                      {chatMessage.trim() ? (
                        <button
                          onClick={() => setChatMessage("")}
                          className="bg-blue-600 w-14 h-14 rounded-2xl text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center active:scale-95"
                        >
                          <Send size={24} />
                        </button>
                      ) : (
                        <button className="bg-slate-100 w-14 h-14 rounded-2xl text-slate-400 hover:bg-slate-200 transition-all flex items-center justify-center">
                          <Mic size={24} />
                        </button>
                      )}
                    </footer>
                  </>
                ) : (
                  <div className="p-12 animate-in fade-in duration-1000">
                    <div className="w-24 h-24 bg-blue-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-blue-600">
                      <MessageSquare size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">
                      Connect Instantly
                    </h2>
                    <p className="text-slate-500 font-medium max-w-sm mx-auto">
                      Select a match from the sidebar to start a conversation
                      and plan your next campus activity.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-12 px-6 border-t bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-2 rounded-xl text-white font-black text-xs">
              NC
            </div>
            <span className="font-black text-slate-800 uppercase tracking-widest text-sm">
              Nita Connect
            </span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
            Designed for Campus Synergy • 2024
          </p>
          <div className="flex gap-8 text-slate-400 font-bold text-xs uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600">
              Privacy
            </a>
            <a href="#" className="hover:text-blue-600">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
