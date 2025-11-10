import React from 'react';

function Square({ value, onSquareClick, isWinning, isLatest }) {
  return (
    <button
      className={`
        w-24 h-24 border-4 text-5xl font-bold 
        rounded-lg transition-all duration-300 transform
        ${isWinning 
          ? 'bg-gradient-to-br from-green-400 to-green-600 text-white border-green-700 scale-105 shadow-2xl animate-pulse' 
          : isLatest
          ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white border-blue-700 shadow-lg'
          : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 hover:scale-105 hover:shadow-xl'
        }
        ${!value && !isWinning ? 'hover:bg-gradient-to-br hover:from-purple-100 hover:to-pink-100' : ''}
        active:scale-95
      `}
      onClick={onSquareClick}
    >
      <span className={`inline-block ${value === 'X' ? 'text-blue-600' : 'text-red-600'} drop-shadow-lg`}>
        {value}
      </span>
    </button>
  );
}

export default Square;