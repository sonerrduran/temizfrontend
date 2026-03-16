import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MatchingGame: React.FC = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);

  const pairs = [
    { word: 'Elma', match: '🍎' },
    { word: 'Kedi', match: '🐱' },
    { word: 'Güneş', match: '☀️' },
    { word: 'Ev', match: '🏠' },
  ];

  const handleClick = (item: string) => {
    if (matched.includes(item)) return;

    if (!selected) {
      setSelected(item);
    } else {
      const pair = pairs.find(p => p.word === selected || p.match === selected);
      const isPair = pair && (pair.word === item || pair.match === item);

      if (isPair) {
        setMatched([...matched, selected, item]);
        setScore(score + 10);
        alert('Doğru eşleştirme! 🎉');
      } else {
        alert('Yanlış! Tekrar dene.');
      }
      setSelected(null);

      if (matched.length + 2 === pairs.length * 2) {
        setTimeout(() => navigate('/academic/turkish/grade2'), 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
          <h1 className="text-4xl font-black text-white mb-8 text-center">🔗 Kelime Eşleştirme</h1>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {pairs.map((pair, idx) => (
              <React.Fragment key={idx}>
                <button
                  onClick={() => handleClick(pair.word)}
                  disabled={matched.includes(pair.word)}
                  className={`p-6 rounded-xl text-xl font-bold transition-all ${
                    matched.includes(pair.word)
                      ? 'bg-green-500/50 text-white'
                      : selected === pair.word
                      ? 'bg-yellow-500 text-white'
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  {pair.word}
                </button>
                <button
                  onClick={() => handleClick(pair.match)}
                  disabled={matched.includes(pair.match)}
                  className={`p-6 rounded-xl text-4xl transition-all ${
                    matched.includes(pair.match)
                      ? 'bg-green-500/50'
                      : selected === pair.match
                      ? 'bg-yellow-500'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  {pair.match}
                </button>
              </React.Fragment>
            ))}
          </div>

          <div className="text-center text-white text-xl">Puan: {score}</div>
        </div>
      </div>
    </div>
  );
};

export default MatchingGame;
