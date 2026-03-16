import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Trophy } from 'lucide-react';
import { getGameById } from '../../data/games.config';

// Oyun tipleri için componentler
import QuizGame from './templates/QuizGame';
import MatchGame from './templates/MatchGame';
import BuilderGame from './templates/BuilderGame';
import InteractiveGame from './templates/InteractiveGame';

export default function GameTemplate() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  const game = gameId ? getGameById(gameId) : null;

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800">Oyun bulunamadı</h1>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  // Oyun tipine göre component seç
  const renderGame = () => {
    switch (game.type) {
      case 'quiz':
        return <QuizGame game={game} score={score} setScore={setScore} />;
      case 'match':
        return <MatchGame game={game} score={score} setScore={setScore} />;
      case 'builder':
        return <BuilderGame game={game} score={score} setScore={setScore} />;
      case 'interactive':
        return <InteractiveGame game={game} score={score} setScore={setScore} />;
      default:
        return <div>Oyun tipi desteklenmiyor</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Geri Dön</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-bold text-gray-800">{score}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{game.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{game.title}</h1>
              <p className="text-gray-600">{game.description}</p>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  {game.subcategory}
                </span>
                {game.grade > 0 && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {game.grade}. Sınıf
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="max-w-6xl mx-auto">{renderGame()}</div>
    </div>
  );
}
