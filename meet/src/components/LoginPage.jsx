import React from 'react';
import Button from './ui/Button';
import InputField from './ui/InputField';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-zinc-100 w-full max-w-md animate-in zoom-in-95 duration-500">
         <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-zinc-900 tracking-tight">NITA Connect</h2>
            <p className="text-zinc-500 mt-2 font-medium">NIT Agartala Enrollment Portal</p>
         </div>
         <div className="space-y-4">
           <button onClick={() => onLogin('Google User')} className="w-full h-14 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center gap-4 hover:bg-zinc-50 transition-all font-bold">
             <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" />
             <span>Google for NITA</span>
           </button>
           <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-100"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-zinc-300 font-bold">Or Enrollment</span></div>
           </div>
           <InputField label="Enrollment ID" placeholder="e.g. 21BCE045" />
           <InputField label="Password" type="password" />
           <Button onClick={() => onLogin()} className="w-full h-14 text-lg">Sign In</Button>
         </div>
      </div>
    </div>
  );
};

export default LoginPage;