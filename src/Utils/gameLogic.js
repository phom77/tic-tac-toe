// Tính toán người thắng
export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Hàng 1
    [3, 4, 5], // Hàng 2
    [6, 7, 8], // Hàng 3
    [0, 3, 6], // Cột 1
    [1, 4, 7], // Cột 2
    [2, 5, 8], // Cột 3
    [0, 4, 8], // Đường chéo chính
    [2, 4, 6], // Đường chéo phụ
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  
  return { winner: null, line: null };
}

// Format thời gian
export function getCurrentTimestamp() {
  const now = new Date();
  return now.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}