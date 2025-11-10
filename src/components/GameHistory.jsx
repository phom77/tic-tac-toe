import React from 'react';
import { Trophy, Award, Users } from 'lucide-react';

function GameHistory({ allGames }) {
  if (allGames.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="text-yellow-500" />
          Lịch sử các Game
        </h2>
        <p className="text-gray-500 italic">Chưa có game nào hoàn thành</p>
      </div>
    );
  }

  // Đảo ngược mảng để hiển thị game mới nhất lên đầu
  const reversedGames = allGames.slice().reverse();

return (
    // --- CONTAINER CHÍNH ---
    // Thêm flex flex-col, bỏ overflow-y-auto ở đây
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col max-h-96">
      
      {/* --- TIÊU ĐỀ --- */}
      {/* Bỏ sticky, top-0, z-10 */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 pb-3 border-b-2 border-gray-100 flex-shrink-0">
        <Trophy className="text-yellow-500" />
        Lịch sử các Game ({allGames.length})
      </h2>
      
      {/* --- CONTAINER CUỘN MỚI --- */}
      {/* Div này sẽ chịu trách nhiệm cho việc cuộn */}
      <div className="overflow-y-auto flex-grow">
        <div className="space-y-3 pt-2 pr-2"> {/* Thêm pr-2 để scrollbar không dính vào nội dung */}
          {reversedGames.map((game, index) => {
            const gameNumber = allGames.length - index;
            return (
              <div
                key={index}
                className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 
                  border-2 border-gray-200 hover:shadow-md transition-all duration-300
                  hover:scale-99"
              >
                {/* ... (Nội dung bên trong không thay đổi) ... */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {game.winner === 'Hòa' ? (
                      <Users className="text-yellow-500" size={24} />
                    ) : (
                      <Award className="text-green-500" size={24} />
                    )}
                    <div>
                      <p className="font-bold text-lg">
                        Game #{gameNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        {game.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {game.winner === 'Hòa' ? (
                      <span className="px-4 py-2 bg-yellow-200 text-yellow-800 rounded-full font-bold">
                        Hòa
                      </span>
                    ) : (
                      <span className="px-4 py-2 bg-green-200 text-green-800 rounded-full font-bold">
                        {game.winner} Thắng
                      </span>
                    )}
                    <p className="text-sm text-gray-600 mt-1">
                      {game.moves} nước đi
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GameHistory;