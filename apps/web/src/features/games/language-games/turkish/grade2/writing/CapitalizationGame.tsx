import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CapitalizationGame: React.FC = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);

  const questions = [
    { text: 'ali okula gidiyor.', answer: 'Ali okula gidiyor.' },
    { text: 'ankara türkiye\'nin başkentidir.', answer: 'Ankara Türkiye\'nin başkentidir.' },
    { text: 'ayşe kitap okuyor.', answer: 'Ayşe kitap okuyor.' },
  ];

  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = () => {
    if (userAnswer.trim() === questions[current].answer) {
      setScore(score + 20);
      alert('Doğru! 🎉');
    } else {
      alert(`Yanlış! Doğru: ${questions[current].answer}`);
    }

    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setUserAnswer('');
    } else {
      navigate('/academic/turkish/grade2');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-700 to-cyan-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
          <h1 className="text-4xl font-black text-white mb-8 text-center">🔤 Büyük Harf Kullanımı</h1>

          <div className="bg-white/20 rounded-xl p-8 mb-6">
            <p className="text-2xl text-white mb-4">Cümleyi doğru yaz:</p>
            <p className="text-xl text-white/70 mb-6">{questions[current].text}</p>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full px-6 py-4 text-xl rounded-xl bg-white/90 focus:outline-none"
              placeholder="Cümleyi yaz..."
              autoFocus
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={handleSubmit} className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-xl font-bold">
              Kontrol Et
            </button>
            <button onClick={() => navigate('/academic/turkish/grade2')} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold">
              Geri
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapitalizationGame;
