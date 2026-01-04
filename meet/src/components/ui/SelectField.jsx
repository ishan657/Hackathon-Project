import React from 'react';

const SelectField = ({ label, options, error, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest px-1 mb-2">{label}</label>}
    <select 
      className={`w-full px-5 py-4 bg-white border rounded-2xl focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all font-medium appearance-none cursor-pointer ${error ? 'border-red-500' : 'border-zinc-200'}`}
      {...props}
    >
      <option value="">Select an option</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default SelectField;