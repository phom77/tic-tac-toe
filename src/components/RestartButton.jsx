import React from 'react';
import { RotateCcw } from 'lucide-react';

function RestartButton({ onRestart }) {
  return (
    <button
      onClick={onRestart}
      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 
        text-white font-bold rounded-xl shadow-lg hover:shadow-2xl 
        hover:scale-105 active:scale-95 transition-all duration-300
        hover:from-red-600 hover:to-pink-600"
    >
      <RotateCcw className="animate-spin-slow" size={24} />
      <span>Bắt đầu lại</span>
    </button>
  );
}

export default RestartButton;