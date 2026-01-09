import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function SignupPage({ onSignupSuccess, onGoLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  
  // 1. Local states for the form (Name, Email, Password)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  // Error handling for local validation
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. The Next Step Function (No Axios call here yet)
  const handleNextStep = (e) => {
    e.preventDefault();
    setError("");

    // Simple local validation before proceeding
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Pass the data to App.js to store in master state and move to Onboarding
    onSignupSuccess(formData); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 px-4">
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-zinc-100">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
            NITA Connect
          </h1>
          <p className="text-zinc-500 mt-2 text-sm">
            Connect • Collaborate • Grow
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleNextStep} className="space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Use your @nita.ac.in email if possible"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Create Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Choose a strong password"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm pr-12 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
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

          <button
            type="submit"
            className="w-full rounded-xl bg-zinc-900 text-white py-3 font-semibold hover:bg-zinc-800 transition flex items-center justify-center gap-2"
          >
            Continue to Profile Setup
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 mt-8">
          Already have an account?{" "}
          <button
            onClick={onGoLogin}
            className="font-semibold text-zinc-900 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}