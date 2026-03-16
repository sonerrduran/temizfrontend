import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const DirectionMatchGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetDirection, setTargetDirection] = useState('');
  const [arrows, setArrows] = useState<{ id: number; direction: string; rotation: number }[]>([]);
  const [feedback, setFeedback] = useState('');

  const directions = [
    { name: 'Yukarı', rotation: 0, emoji: '⬆️' },
    { name: 'Sağ', rotation: 90, emoji: '➡️' },
    { name: 'Aşağı', rotation: 180, emoji: '⬇️' },
    { name: 'Sol', rotation: 270, emoji: '⬅️' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const target = directions[Math.floor(Math.random() * directions.length)];
    setTargetDirection(target.name);

    const numArrows = Math.min(8 + level * 2, 16);
    const arrowData = [];

    for (let i = 0; i < numArrows; i++) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      arrowData.push({
        id: i,
        direction: dir.name,
        rotation: dir.rotation,
      });
    }

    setArrows(arrowData);
    setFeedback('');
  };

  const handleArrowClick = (arrow: { id: number; direction: string; rotation: number }) => {
    if (arrow.direction === targetDirection) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Doğru!');

      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete(score + points);
        }
      }, 1000);
    } else {
      setFeedback('❌ Yanlış! Tekrar dene.');
      setTimeout(() => setFeedback(''), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/10 rounded-xl">
              <span className="text-white font-black">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-yellow-500/90 rounded-xl">
              <span className="text-white font-black">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            🧭 Yönümü Buluyorum 🧭
          </h1>
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl px-8 py-4 inline-block">
            <p className="text-white text-3xl font-black">
              🎯 {targetDirection} yönündeki okları bul!
            </p>
          </div>
        </div>

        <div className="bg-white/10 rounded-3xl p-8 mb-8">
          <div className="grid grid-cols-4 md:grid-cols-4 gap-6">
            {arrows.map((arrow) => (
              <button
                key={arrow.id}
                onClick={() => handleArrowClick(arrow)}
                className="bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-2xl p-6 flex items-center justify-center transition-all transform hover:scale-110 h-24"
                style={{ transform: `rotate(${arrow.rotation}deg)` }}
              >
                <span className="text-6xl">⬆️</span>
              </button>
            ))}
          </div>

          {feedback && (
            <div
              className={`mt-8 text-center text-3xl font-black ${feedback.includes('Doğru') ? 'text-green-400' : 'text-red-400'}`}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectionMatchGame;
