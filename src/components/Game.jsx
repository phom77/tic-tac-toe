import React, { useState, useEffect } from 'react';
import Board from './Board';
import RestartButton from './RestartButton';
import GameHistory from './GameHistory';
import { RotateCcw } from 'lucide-react';
import { calculateWinner, getCurrentTimestamp } from '../Utils/gameLogic';

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), position: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const [allGames, setAllGames] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  // Kiểm tra game kết thúc
  useEffect(() => {
    const { winner } = calculateWinner(currentSquares);
    if (winner || currentMove === 9) {
      // Thêm vào lịch sử tổng
      const gameResult = {
        winner: winner || 'Hòa',
        moves: currentMove,
        timestamp: getCurrentTimestamp()
      };
      
      // Chỉ thêm nếu chưa có trong lịch sử
      if (allGames.length === 0 || allGames[allGames.length - 1].timestamp !== gameResult.timestamp) {
        setAllGames(prev => [...prev, gameResult]);
      }
      
      if (winner) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  }, [currentMove, currentSquares]);

  function handlePlay(nextSquares, position) {
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, position }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSort() {
    setIsAscending(!isAscending);
  }

  function handleRestart() {
    setHistory([{ squares: Array(9).fill(null), position: null }]);
    setCurrentMove(0);
  }

  const moves = history.map((step, move) => {
    const row = step.position !== null ? Math.floor(step.position / 3) + 1 : null;
    const col = step.position !== null ? (step.position % 3) + 1 : null;
    
    let description;
    if (move > 0) {
      description = `Nước đi #${move}`;
    } else {
      description = 'Bắt đầu game';
    }

    if (move === currentMove) {
      return (
        <li key={move} className="mb-2 animate-pulse">
          <div className="font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg border-2 border-blue-300">
            📍 Bạn đang ở nước đi #{move}
            {move > 0 && ` (${row}, ${col})`}
          </div>
        </li>
      );
    }

    return (
      <li key={move} className="mb-2">
        <button
          onClick={() => jumpTo(move)}
          className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gradient-to-r hover:from-purple-200 hover:to-pink-200 
            rounded-lg transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
        >
          {description}
          {move > 0 && <span className="text-gray-600 ml-2">({row}, {col})</span>}
        </button>
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8 relative overflow-hidden">
      {/* Hiệu ứng confetti khi thắng */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 20 + 20}px`
              }}
            >
              {['🎉', '🎊', '⭐', '✨', '🏆'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
          Tic Tac Toe 
        </h1>
        
        <div className="flex gap-8 flex-wrap justify-center mb-8">
          {/* Bàn cờ */}
          <div className="flex flex-col items-center gap-6">
            <Board 
              xIsNext={xIsNext} 
              squares={currentSquares} 
              onPlay={handlePlay} 
              currentMove={currentMove}
              lastMove={history[currentMove].position}
            />
            <RestartButton onRestart={handleRestart} />
          </div>

          {/* Lịch sử nước đi */}
          <div className="bg-white p-6 rounded-xl shadow-2xl min-w-[300px] max-h-[600px] overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Lịch sử nước đi</h2>
              <button
                onClick={toggleSort}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                  text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ml-6"
              >
                <RotateCcw size={18} />
                {isAscending ? 'Giảm dần' : 'Tăng dần'}
              </button>
            </div>
            <ol className="list-none overflow-y-auto max-h-[450px] pr-2">{sortedMoves}</ol>
          </div>
        </div>

        {/* Lịch sử tất cả các game */}
        <div className="mt-8">
          <GameHistory allGames={allGames} />
        </div>
      </div>
    </div>
  );
}

export default Game;