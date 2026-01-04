import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ children, variant = 'primary', className = '', loading = false, ...props }) => {
  const variants = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 disabled:bg-zinc-400',
    secondary: 'bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all duration-300',
    ghost: 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors',
    outline: 'border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all',
  };

  return (
    <button 
      className={`px-6 py-3 rounded-full font-bold transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 ${variants[variant]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" size={20} /> : children}
    </button>
  );
};

export default Button;