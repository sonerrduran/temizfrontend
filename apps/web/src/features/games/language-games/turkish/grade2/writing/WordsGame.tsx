import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WordsGame: React.FC = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  const questions = [
    { image: '🍎', answer: 'elma' },
    { image: '🐱', answer: 'kedi' },
    { image: '🌸', answer: 'çiçek' },
    { image: '📚', answer: 'kitap' },
    { image: '🏠', answer: 'ev' },
  ];

  const handleSubmit = () => {
    if (userAnswer.toLowerCase().trim() === questions[currentQuestion].answer) {
      setScore(score + 20);
      alert('Doğru! 🎉');
    } else {
      alert(`Yanlış! Doğru cevap: ${questions[currentQuestion].answer}`);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer('');
    } else {
      alert(`Oyun bitti! Puanın: ${score + 20}`);
      navigate('/academic/turkish/grade2');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-emerald-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
          <h1 className="text-4xl font-black text-white mb-4 text-center">✏️ Kelime Yazma</h1>
          <p className="text-white/80 text-center mb-8">Resmi görüp kelimeyi yaz!</p>

          <div className="bg-white/20 rounded-xl p-12 mb-6 text-center">
            <div className="text-9xl mb-6">{questions[currentQuestion].image}</div>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Kelimeyi yaz..."
              className="w-full max-w-md px-6 py-4 text-2xl text-center rounded-xl border-4 border-white/30 bg-white/90 focus:outline-none focus:border-green-400"
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
            Soru: {currentQuestion + 1}/{questions.length} | Puan: {score}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordsGame;
