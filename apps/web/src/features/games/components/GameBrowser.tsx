/**
 * Game Browser Component
 * Oyun tarayıcı bileşeni
 */

import React from 'react';
import type { GameMetadata, GameCategory } from '../types';

interface GameBrowserProps {
  games: GameMetadata[];
  category?: GameCategory;
  onGameSelect: (gameId: string) => void;
  onCategoryChange?: (category: GameCategory) => void;
}

export function GameBrowser({ games, category, onGameSelect, onCategoryChange }: GameBrowserProps) {
  const filteredGames = category ? games.filter((game) => game.category === category) : games;

  return (
    <div className="game-browser">
      <div className="game-browser-header">
        <h2>Oyunlar</h2>
        {onCategoryChange && (
          <div className="category-filter">{/* Kategori filtreleme butonları */}</div>
        )}
      </div>

      <div className="game-grid">
        {filteredGames.map((game) => (
          <div key={game.id} className="game-card" onClick={() => onGameSelect(game.id)}>
            <div className="game-icon">{game.icon}</div>
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <div className="game-meta">
              <span className="difficulty">{game.difficulty}</span>
              {game.gradeLevel && <span className="grade">{game.gradeLevel}. Sınıf</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
