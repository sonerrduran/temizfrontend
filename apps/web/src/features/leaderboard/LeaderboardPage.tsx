/**
 * Leaderboard Page
 * Liderlik tablosu sayfası
 */

import React, { useState } from 'react';

type LeaderboardScope = 'global' | 'school' | 'classroom';

export function LeaderboardPage() {
  const [scope, setScope] = useState<LeaderboardScope>('global');

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-container">
        <h1>Liderlik Tablosu</h1>

        <div className="leaderboard-filters">
          <button className={scope === 'global' ? 'active' : ''} onClick={() => setScope('global')}>
            Global
          </button>
          <button className={scope === 'school' ? 'active' : ''} onClick={() => setScope('school')}>
            Okulum
          </button>
          <button
            className={scope === 'classroom' ? 'active' : ''}
            onClick={() => setScope('classroom')}
          >
            Sınıfım
          </button>
        </div>

        <div className="leaderboard-list">
          {/* Leaderboard entries will be rendered here */}
          <div className="leaderboard-entry">
            <span className="rank">1</span>
            <span className="username">Kullanıcı 1</span>
            <span className="score">18,950</span>
          </div>
          <div className="leaderboard-entry">
            <span className="rank">2</span>
            <span className="username">Kullanıcı 2</span>
            <span className="score">15,420</span>
          </div>
          <div className="leaderboard-entry">
            <span className="rank">3</span>
            <span className="username">Kullanıcı 3</span>
            <span className="score">14,230</span>
          </div>
        </div>
      </div>
    </div>
  );
}
