import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import OnboardingForm from './pages/OnboardingForm';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; 
import ChatPage from './components/chat/ChatInterface';
import MatchesPage from './pages/MatchesPage';
import ExplorePage from './pages/ExplorePage';

import Footer from './components/Footer';
import Button from './components/ui/Button';

export default function App() {
  const [page, setPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [showReason, setShowReason] = useState(false);
  const [signupData, setSignupData] = useState(null);
  
  // NEW STATE: Holds the AI matches globally
  const [aiMatches, setAiMatches] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setPage('dashboard');
    }
  }, []);

  // UPDATED: Now accepts matches data from the Dashboard
  const startExploringWithReason = (matches) => {
    setAiMatches(matches); // Save the JSON data
    setPage("matches");      
    setShowReason(true);     
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    if (!loggedInUser.bio) {
      setPage("onboarding");
    } else {
      setPage("dashboard"); 
    }
  };

  const handleSignupStepOne = (data) => {
    setSignupData(data);
    setPage('onboarding');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setSignupData(null);
    setAiMatches([]); // Clear matches on logout
    setPage('landing');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Navbar user={user} setPage={setPage} onLogout={handleLogout} />
      
      <main className="pt-24 flex-1">
        {page === 'landing' && <LandingPage setPage={setPage} user={user} />}
        
        {page === 'login' && (
          <LoginPage 
            onLogin={handleLogin} 
            onGoSignup={() => {
              setSignupData(null);
              setPage('signup');
            }} 
          />
        )}

        {page === 'signup' && (
          <SignupPage 
            onSignupSuccess={handleSignupStepOne} 
            onGoLogin={() => {
              setSignupData(null);
              setPage('login');
            }} 
          />
        )}

        {page === 'onboarding' && (
          <OnboardingForm 
            signupData={signupData} 
            setGlobalUser={setUser} 
            onComplete={() => {
              setSignupData(null);
              setPage('dashboard');
            }} 
          />
        )}

        {page === "dashboard" && (
          <Dashboard
            user={user}
            setPage={setPage}
            // Dashboard now sends data back up to this component
            onStartExploring={startExploringWithReason}
          />
        )}

        {page === 'chat' && <ChatPage setPage={setPage} user={user} />}
        {page === 'explore' && (
          <ExplorePage />
        )}
        
        {/* UPDATED: Pass the global aiMatches state to the matches page */}
        {page === 'matches' && (
          <MatchesPage 
            setPage={setPage} 
            user={user} 
            aiMatches={aiMatches} 
          />
        )}
        
        {showReason && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl text-zinc-900">
              <h2 className="text-xl font-semibold mb-2">
                🤖 Why Gemini recommended these matches
              </h2>
              <p className="text-sm text-zinc-600 mb-4">
                Gemini analyzed your profile and activity to find the most relevant matches.
              </p>
              <ul className="space-y-2 text-sm text-zinc-700 font-medium">
                <li>• Strong overlap with your interests</li>
                <li>• Similar academic year ({user?.academicYear})</li>
                <li>• High compatibility with your goals</li>
              </ul>
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setShowReason(false)}
                  className="bg-zinc-900 text-white rounded-xl px-6"
                >
                  Got it
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      {page !== 'chat' && <Footer />}
      {/* <Footer /> */}
    </div>
  );
}