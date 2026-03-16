import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerbsGame: React.FC = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);

  const questions = [
    { sentence: 'Ali top oynuyor.', options: ['Ali', 'top', 'oynuyor'], answer: 'oynuyor' },
    { sentence: 'Kedi süt içiyor.', options: ['Kedi', 'süt', 'içiyor'], answer: 'içiyor' },
    { sentence: 'Çocuklar koşuyor.', options: ['Çocuklar', 'koşuyor', 'park'], answer: 'koşuyor' },
  ];

  const handleAnswer = (answer: string) => {
    if (answer === questions[current].answer) {
      setScore(score + 10);
      alert('Doğru! Fiili buldun! 🎉');
    } else {
      alert('Yanlış! Tekrar dene.');
    }

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate('/academic/turkish/grade2');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-700 to-amber-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
          <h1 className="text-4xl font-black text-white mb-8 text-center">🏃 Fiil Bulma</h1>

          <div className="bg-white/20 rounded-xl p-8 mb-6">
            <p className="text-3xl text-white text-center mb-8">{questions[current].sentence}</p>
            <p className="text-xl text-white/80 text-center mb-6">Fiili bul:</p>
            <div className="grid grid-cols-3 gap-4">
              {questions[current].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="p-6 bg-white/20 hover:bg-white/30 rounded-xl text-2xl text-white font-bold transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center text-white text-xl">
            Soru: {current + 1}/{questions.length} | Puan: {score}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerbsGame;
