import React from 'react';
import { GameConfig } from '@/modules/games/engine/types/game.types';

interface GameCardProps {
  game: GameConfig;
  onPlay: () => void;
}

export default function GameCard({ game, onPlay }: GameCardProps) {
  const difficultyColors = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500',
  };

  const categoryIcons: Record<string, string> = {
    math: '🔢',
    logic: '🧩',
    language: '📚',
    reading: '📖',
    focus: '🎯',
    learning: '🧠',
  };

  return (
    <div className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-purple-500 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
      {/* Category Icon */}
      <div className="absolute -top-3 -right-3 text-4xl">
        {categoryIcons[game.category] || '🎮'}
      </div>

      {/* Game Info */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{game.name}</h3>

        {game.description && (
          <p className="text-white/60 text-sm line-clamp-2 mb-3">{game.description}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {game.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-white/10 rounded-lg text-xs text-white/80">
              {tag}
            </span>
          ))}
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-3 text-sm">
          {/* Difficulty */}
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${difficultyColors[game.difficulty]}`} />
            <span className="text-white/60 capitalize">{game.difficulty}</span>
          </div>

          {/* Grade Level */}
          <div className="text-white/60">
            {game.gradeMin === game.gradeMax
              ? `${game.gradeMin}. Sınıf`
              : `${game.gradeMin}-${game.gradeMax}. Sınıf`}
          </div>
        </div>
      </div>

      {/* Play Button */}
      <button
        onClick={onPlay}
        className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-bold transition-all transform group-hover:scale-105"
      >
        🎮 Oyna
      </button>
    </div>
  );
}
