import React from 'react';

const InputField = ({ label, error, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest px-1 mb-2">{label}</label>}
    <input 
      className={`w-full px-5 py-4 bg-white border rounded-2xl focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all placeholder:text-zinc-300 font-medium ${error ? 'border-red-500' : 'border-zinc-200'}`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
  </div>
);

export default InputField;