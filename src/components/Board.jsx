import React from 'react';
import Square from './Square';
import { calculateWinner } from '../Utils/gameLogic';

function Board({ xIsNext, squares, onPlay, currentMove, lastMove }) {
  function handleClick(i) {
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares, i);
  }

  const { winner, line } = calculateWinner(squares);
  let status;
  let statusClass = '';

  if (winner) {
    status = '🎉 Người chiến thắng: ' + winner + ' 🎉';
    statusClass = 'text-green-600 animate-bounce';
  } else if (currentMove === 9) {
    status = '🤝 Kết quả: Hòa! 🤝';
    statusClass = 'text-yellow-600';
  } else {
    status = 'Người chơi tiếp theo: ' + (xIsNext ? 'X' : 'O');
    statusClass = xIsNext ? 'text-blue-600' : 'text-red-600';
  }

  // Sử dụng 2 vòng lặp để tạo bảng
  const board = [];
  for (let row = 0; row < 3; row++) {
    const rowSquares = [];
    for (let col = 0; col < 3; col++) {
      const squareIndex = row * 3 + col;
      rowSquares.push(
        <Square
          key={squareIndex}
          value={squares[squareIndex]}
          onSquareClick={() => handleClick(squareIndex)}
          isWinning={line && line.includes(squareIndex)}
          isLatest={lastMove === squareIndex}
        />
      );
    }
    board.push(
      <div key={row} className="flex gap-3">
        {rowSquares}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`text-2xl font-bold mb-6 px-6 py-3 rounded-xl bg-white shadow-lg ${statusClass} transition-all duration-300`}>
        {status}
      </div>
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl shadow-2xl">
        <div className="flex flex-col gap-3">
          {board}
        </div>
      </div>
    </div>
  );
}

export default Board;