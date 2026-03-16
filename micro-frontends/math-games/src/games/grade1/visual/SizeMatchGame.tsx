import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const SizeMatchGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetSize, setTargetSize] = useState<'big' | 'small'>('big');
  const [shapes, setShapes] = useState<{ id: number; size: number; emoji: string }[]>([]);
  const [feedback, setFeedback] = useState('');

  const emojis = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const target = Math.random() > 0.5 ? 'big' : 'small';
    setTargetSize(target);

    const numShapes = Math.min(6 + level, 12);
    const shapeData = [];

    for (let i = 0; i < numShapes; i++) {
      const size = Math.random() > 0.5 ? 60 + Math.random() * 40 : 20 + Math.random() * 30;
      shapeData.push({
        id: i,
        size,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      });
    }

    setShapes(shapeData);
    setFeedback('');
  };

  const handleShapeClick = (shape: { id: number; size: number; emoji: string }) => {
    const isBig = shape.size > 50;
    const isCorrect = (targetSize === 'big' && isBig) || (targetSize === 'small' && !isBig);

    if (isCorrect) {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 p-4 md:p-8">
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
            📐 Büyük mü Küçük mü? 📐
          </h1>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl px-8 py-4 inline-block">
            <p className="text-white text-3xl font-black">
              {targetSize === 'big' ? '🔍 BÜYÜK şekilleri bul!' : '🔍 KÜÇÜK şekilleri bul!'}
            </p>
          </div>
        </div>

        <div className="bg-white/10 rounded-3xl p-8 mb-8">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
            {shapes.map((shape) => (
              <button
                key={shape.id}
                onClick={() => handleShapeClick(shape)}
                className="bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 rounded-2xl p-6 flex items-center justify-center transition-all transform hover:scale-105"
                style={{ minHeight: '120px' }}
              >
                <span style={{ fontSize: `${shape.size}px` }}>{shape.emoji}</span>
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

export default SizeMatchGame;
