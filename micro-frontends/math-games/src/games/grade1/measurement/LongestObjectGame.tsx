import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const LongestObjectGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [objects, setObjects] = useState<{ emoji: string; length: number; id: number }[]>([]);
  const [correctId, setCorrectId] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const objectEmojis = ['🖍️', '✏️', '🖊️', '📏', '🔧', '🔨', '🪛', '🎸', '🎺', '🎻'];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numObjects = Math.min(3 + Math.floor(level / 2), 5);
    const newObjects = Array.from({ length: numObjects }, (_, i) => ({
      emoji: objectEmojis[Math.floor(Math.random() * objectEmojis.length)],
      length: 20 + Math.random() * 60,
      id: i,
    }));

    const longest = newObjects.reduce((max, obj) => (obj.length > max.length ? obj : max));
    setCorrectId(longest.id);
    setObjects(newObjects);
    setFeedback('');
  };

  const handleAnswer = (id: number) => {
    if (id === correctId) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Doğru! En uzun olanı buldun!');
      setShowCelebration(true);

      setTimeout(() => {
        setShowCelebration(false);
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete(score + points);
        }
      }, 2000);
    } else {
      setFeedback('❌ Yanlış! Daha uzun olanı bul.');
      setTimeout(() => {
        setFeedback('');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-yellow-900 p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            📏
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
          >
            ← Çıkış
          </button>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
              <span className="text-white font-black text-xl">Seviye: {level}/5</span>
            </div>
            <div className="px-6 py-3 bg-yellow-500/90 backdrop-blur-xl rounded-xl border border-yellow-300/50">
              <span className="text-white font-black text-xl">⭐ {score}</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
            📏 Hangisi Uzun? 📏
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300 font-bold">En uzun nesneyi seç!</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="space-y-6">
            {objects.map((obj) => (
              <button
                key={obj.id}
                onClick={() => handleAnswer(obj.id)}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 rounded-2xl p-6 transition-all transform hover:scale-105 shadow-xl flex items-center justify-start"
              >
                <div
                  className="bg-white/20 rounded-xl flex items-center justify-center text-6xl transition-all"
                  style={{ width: `${obj.length}%`, minWidth: '80px', height: '80px' }}
                >
                  {obj.emoji}
                </div>
              </button>
            ))}
          </div>

          {feedback && (
            <div
              className={`mt-8 text-center text-3xl font-black ${
                feedback.includes('Doğru') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {feedback}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-300/30">
          <h3 className="text-xl font-black text-cyan-300 mb-3">📋 Nasıl Oynanır?</h3>
          <ul className="text-white space-y-2">
            <li>• Nesnelerin uzunluklarını karşılaştır</li>
            <li>• En uzun olanı seç</li>
            <li>• Dikkatli bak ve karar ver!</li>
          </ul>
        </div>
      </div>

      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-9xl animate-bounce">📏</div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LongestObjectGame;
