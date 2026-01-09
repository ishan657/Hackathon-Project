import React, { useState } from 'react';
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';
import SelectField from '../components/ui/SelectField';

const OnboardingForm = ({ signupData, setGlobalUser, onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Local state for profile details matching your UserSchema
  const [details, setDetails] = useState({
    age: '', 
    gender: 'Male',
    academicYear: '1st', 
    dept: '', 
    interests: [], 
    bio: '',
  });

  const interestOptions = ['Coding', 'Music', 'Gym', 'Travel', 'Startups', 'Gaming', 'Cricket', 'AI/ML'];

  const handleFinalSubmit = async () => {
    // Basic validation
    if (!details.age || !details.dept) {
      setError("Please fill in all basic details.");
      return;
    }

    setLoading(true);
    setError("");

    // Combine SignupData (name, email, password) with Details (age, bio, etc.)
    const finalPayload = {
      ...signupData,
      ...details,
      age: Number(details.age), 
      lookingFor: "",
      friends: [],
      friendRequests: []
    };

    try {
      const response = await axios.post("https://hackathon-project-owg6.onrender.com/api/auth/register",
finalPayload
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setGlobalUser(response.data.user);
        onComplete(); 
      }
    } catch (err) {
      console.error("Registration Error:", err.response?.data);
      setError(err.response?.data?.msg || "Something went wrong. Check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-12 px-4">
      {/* Compacted max-width (max-w-md) and padding (p-8) */}
      <div className="w-full max-w-md bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Compact Header */}
        <div className="text-center">
          <div className="inline-flex p-2.5 bg-zinc-900 rounded-2xl mb-3">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight uppercase">
            Profile <span className="italic font-serif lowercase font-light opacity-60">setup.</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-2">
             <div className={`h-1 w-8 rounded-full ${step === 1 ? 'bg-zinc-900' : 'bg-zinc-100'}`} />
             <div className={`h-1 w-8 rounded-full ${step === 2 ? 'bg-zinc-900' : 'bg-zinc-100'}`} />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-xl text-center">
            {error}
          </div>
        )}

        {step === 1 ? (
          <div className="space-y-4 animate-in slide-in-from-right-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Age" type="number" value={details.age} onChange={e => setDetails({...details, age: e.target.value})} />
              <SelectField 
                label="Year" 
                options={['1st Year', '2nd Year', '3rd Year', '4th Year']} 
                value={details.academicYear} 
                onChange={e => setDetails({...details, academicYear: e.target.value})} 
              />
            </div>
            
            <InputField label="Department" value={details.dept} placeholder="e.g. CSE or ECE" onChange={e => setDetails({...details, dept: e.target.value})} />
            
            <SelectField 
              label="Gender" 
              options={['Male', 'Female', 'Non-binary', 'Other']} 
              value={details.gender} 
              onChange={e => setDetails({...details, gender: e.target.value})} 
            />
            
            <Button className="w-full h-12 text-xs font-black uppercase tracking-widest rounded-xl" onClick={() => setStep(2)}>
              Next Step <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="space-y-3">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest px-1">Choose Interests</label>
              <div className="flex flex-wrap gap-1.5">
                {interestOptions.map(opt => (
                  <button 
                    key={opt} 
                    type="button"
                    onClick={() => setDetails(p => ({...p, interests: p.interests.includes(opt) ? p.interests.filter(i => i !== opt) : [...p.interests, opt]}))}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all ${details.interests.includes(opt) ? 'bg-zinc-900 border-zinc-900 text-white shadow-md' : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
               <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest px-1">Bio</label>
               <textarea 
                 className="w-full rounded-xl border border-zinc-200 p-3 text-xs focus:ring-1 focus:ring-zinc-900 outline-none min-h-[80px] resize-none"
                 placeholder="Tell us about yourself..."
                 value={details.bio}
                 onChange={e => setDetails({...details, bio: e.target.value})}
               />
            </div>

            <div className="flex gap-3">
              <button 
                type="button"
                className="flex-1 h-12 rounded-xl font-bold text-[10px] uppercase tracking-widest border border-zinc-200 text-zinc-500"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <Button 
                className="flex-[2] h-12 rounded-xl font-black text-[10px] uppercase tracking-widest bg-zinc-900 text-white shadow-lg" 
                loading={loading} 
                onClick={handleFinalSubmit}
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Complete Setup"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingForm;