import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import InputField from './ui/InputField';
import SelectField from './ui/SelectField';

const OnboardingForm = ({ setGlobalUser, onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', age: '', dept: '', year: '', interests: [], bio: '', gender: 'Male'
  });

  const interestOptions = ['Coding', 'Music', 'Gym', 'Travel', 'Startups', 'Gaming', 'Cricket', 'AI/ML'];

  const handleComplete = () => {
    setLoading(true);
    setTimeout(() => {
      setGlobalUser(prev => ({ ...prev, ...formData }));
      setLoading(false);
      onComplete();
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto pt-40 pb-20 px-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-zinc-100 shadow-xl space-y-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Setup Your NITA Profile</h2>
          <p className="text-zinc-500 mt-2">Step {step} of 2</p>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
             <InputField label="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
             <div className="grid grid-cols-2 gap-4">
               <InputField label="Age" type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
               <SelectField label="Year" options={['1st', '2nd', '3rd', '4th']} value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
             </div>
             <InputField label="Department" value={formData.dept} placeholder="e.g. CSE, ECE, Mechanical" onChange={e => setFormData({...formData, dept: e.target.value})} />
             <Button className="w-full h-14 text-lg" onClick={() => setStep(2)}>Next Step <ArrowRight size={20} /></Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Your Interests</label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => setFormData(p => ({...p, interests: p.interests.includes(opt) ? p.interests.filter(i => i !== opt) : [...p.interests, opt]}))}
                    className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${formData.interests.includes(opt) ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white border-zinc-100 text-zinc-500 hover:border-zinc-300'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <InputField label="Short Bio" placeholder="Tell other NITA students about you..." value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
            <div className="flex gap-4 pt-4">
              <Button variant="secondary" className="flex-1 h-14" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-[2] h-14" loading={loading} onClick={handleComplete}>Save & Explore</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingForm;