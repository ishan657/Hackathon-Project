import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";

export default function LoginPage({ onLogin, onGoSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email, 
        password
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        onLogin(response.data.user); 
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.msg || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
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

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Email / Enrollment No.
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or enrollment"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all dark:bg-white dark:text-zinc-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm pr-12 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all dark:bg-white dark:text-zinc-900"
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
            disabled={loading}
            className="w-full rounded-xl bg-zinc-900 text-white py-3 font-semibold hover:bg-zinc-800 transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
          </button>

          <div className="flex items-center gap-3 text-zinc-400 text-sm">
            <div className="h-px bg-zinc-200 flex-1" />
            OR
            <div className="h-px bg-zinc-200 flex-1" />
          </div>

          <button
            type="button"
            className="w-full rounded-xl border border-zinc-300 py-3 font-medium flex items-center justify-center gap-3 hover:bg-zinc-50 transition text-zinc-900"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 mt-8">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={onGoSignup} // Linked to redirection logic
            className="font-semibold text-zinc-900 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}