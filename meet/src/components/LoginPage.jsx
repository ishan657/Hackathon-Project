// import React from 'react';
// import Button from './ui/Button';
// import InputField from './ui/InputField';

// const LoginPage = ({ onLogin }) => {
//   return (
//     <div className="min-h-screen flex items-center justify-center p-6">
      
//       <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-zinc-100 w-full max-w-md animate-in zoom-in-95 duration-500">
        
//          <div className="text-center mb-8">
//             <h2 className="text-4xl font-bold text-zinc-900 tracking-tight">NITA Connect</h2>
//             <p className="text-zinc-500 mt-2 font-medium">NIT Agartala Enrollment Portal</p>
//          </div>
//          <div className="space-y-4">
//          <img
//              src="UI.png"
//              alt="college"
//              className="rounded-xl"
//            />
//            <button onClick={() => onLogin('Google User')} className="w-full h-14 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center gap-4 hover:bg-zinc-50 transition-all font-bold">
//              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" />
//              <span>Continue with Mail</span>
//            </button>
//            <div className="relative">
//               <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-100"></span></div>
//               <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-zinc-300 font-bold">Or Enrollment</span></div>
//            </div>
//            <InputField label="Enrollment ID" placeholder="e.g. 21BCE045" />
//            <InputField label="Password" type="password" />
//            <Button onClick={() => onLogin()} className="w-full h-14 text-lg">Sign In</Button>
//          </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage({ onLogin, onGoSignup }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 px-4">
      
      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-zinc-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
            NITA Connect
          </h1>
          <p className="text-zinc-500 mt-2 text-sm">
            Connect • Collaborate • Grow
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          
          {/* Email / Enrollment */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Email / Enrollment No.
            </label>
            <input
              type="text"
              placeholder="Enter your email or enrollment"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm pr-12 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-800"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={onLogin}
            className="w-full rounded-xl bg-zinc-900 text-white py-3 font-semibold hover:bg-zinc-800 transition"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-zinc-400 text-sm">
            <div className="h-px bg-zinc-200 flex-1" />
            OR
            <div className="h-px bg-zinc-200 flex-1" />
          </div>

          {/* Google Login */}
          <button
            className="w-full rounded-xl border border-zinc-300 py-3 font-medium flex items-center justify-center gap-3 hover:bg-zinc-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-600 mt-8">
          Don’t have an account?{" "}
          <button
            onClick={onGoSignup}
            className="font-semibold text-zinc-900 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
