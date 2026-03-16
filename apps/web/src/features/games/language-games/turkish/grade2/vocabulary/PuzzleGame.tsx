import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PuzzleGame: React.FC = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  const puzzles = [
    { clue: 'Kırmızı, yuvarlak, meyve', answer: 'elma' },
    { clue: 'Miyavlar, tüylü, hayvan', answer: 'kedi' },
    { clue: 'Sarı, gökyüzünde, ışık verir', answer: 'güneş' },
  ];

  const handleSubmit = () => {
    if (userAnswer.toLowerCase().trim() === puzzles[current].answer) {
      setScore(score + 20);
      alert('Doğru! Bulmacayı çözdün! 🎉');
    } else {
      alert(`Yanlış! Doğru cevap: ${puzzles[current].answer}`);
    }

    if (current < puzzles.length - 1) {
      setCurrent(current + 1);
      setUserAnswer('');
    } else {
      navigate('/academic/turkish/grade2');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-900 via-fuchsia-700 to-pink-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
          <h1 className="text-4xl font-black text-white mb-8 text-center">🧩 Kelime Bulmaca</h1>

          <div className="bg-white/20 rounded-xl p-8 mb-6">
            <p className="text-2xl text-white mb-4">İpucu:</p>
            <p className="text-3xl text-white font-bold mb-8">{puzzles[current].clue}</p>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Cevabı yaz..."
              className="w-full px-6 py-4 text-2xl text-center rounded-xl bg-white/90 focus:outline-none"
              autoFocus
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleSubmit}
              className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-bold text-lg"
            >
              Kontrol Et
            </button>
            <button
              onClick={() => navigate('/academic/turkish/grade2')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold"
            >
              Geri
            </button>
          </div>

          <div className="mt-6 text-center text-white text-xl">
            Bulmaca: {current + 1}/{puzzles.length} | Puan: {score}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleGame;
