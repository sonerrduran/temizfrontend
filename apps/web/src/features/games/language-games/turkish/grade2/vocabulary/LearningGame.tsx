import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LearningGame: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const words = [
    { word: 'Mutlu', meaning: 'Sevinçli, neşeli', emoji: '😊' },
    { word: 'Üzgün', meaning: 'Kederli, mutsuz', emoji: '😢' },
    { word: 'Cesur', meaning: 'Korkusuz, yiğit', emoji: '🦁' },
    { word: 'Akıllı', meaning: 'Zeki, anlayışlı', emoji: '🧠' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
          <h1 className="text-4xl font-black text-white mb-8 text-center">📖 Kelime Öğrenme</h1>

          <div className="bg-white/20 rounded-xl p-12 mb-6 text-center">
            <div className="text-8xl mb-6">{words[current].emoji}</div>
            <h2 className="text-5xl font-black text-white mb-4">{words[current].word}</h2>
            <p className="text-2xl text-white/80">{words[current].meaning}</p>
          </div>

          <div className="flex gap-4 justify-center">
            {current < words.length - 1 ? (
              <button
                onClick={() => setCurrent(current + 1)}
                className="px-12 py-6 bg-green-500 hover:bg-green-400 text-white rounded-xl font-bold text-xl"
              >
                Sonraki →
              </button>
            ) : (
              <button
                onClick={() => navigate('/academic/turkish/grade2')}
                className="px-12 py-6 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-bold text-xl"
              >
                Tamamla ✓
              </button>
            )}
          </div>

          <div className="mt-6 text-center text-white text-xl">
            {current + 1} / {words.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningGame;
