import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-6 mb-4">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 flex items-center justify-center gap-3">
        <Sparkles className="w-8 h-8 text-yellow-500" />
        Life Balance Wheel
        <Sparkles className="w-8 h-8 text-yellow-500" />
      </h1>
      <p className="text-xl text-slate-600 mt-2">
        How is your life going? Drag the slices to reflect your current state.
      </p>
    </header>
  );
};

export default Header;
