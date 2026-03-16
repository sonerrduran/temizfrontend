import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const GraphReadingGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [items, setItems] = useState<{ name: string; emoji: string; count: number }[]>([]);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  const itemData = [
    { name: 'Araba', emoji: '🚗' },
    { name: 'Bisiklet', emoji: '🚲' },
    { name: 'Otobüs', emoji: '🚌' },
    { name: 'Uçak', emoji: '✈️' },
    { name: 'Gemi', emoji: '🚢' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numItems = Math.min(3 + Math.floor(level / 2), 4);
    const selected = [...itemData]
      .sort(() => Math.random() - 0.5)
      .slice(0, numItems)
      .map((item) => ({ ...item, count: Math.floor(Math.random() * (8 + level * 2)) + 1 }));

    setItems(selected);

    const questionType = Math.random();
    let answer = '';
    let questionText = '';

    if (questionType < 0.3) {
      const maxItem = selected.reduce((max, item) => (item.count > max.count ? item : max));
      answer = maxItem.name;
      questionText = 'En çok hangi araç var?';
    } else if (questionType < 0.6) {
      const minItem = selected.reduce((min, item) => (item.count < min.count ? item : min));
      answer = minItem.name;
      questionText = 'En az hangi araç var?';
    } else if (questionType < 0.8) {
      const item = selected[Math.floor(Math.random() * selected.length)];
      answer = item.count.toString();
      questionText = `${item.name} kaç tane?`;
    } else {
      const total = selected.reduce((sum, item) => sum + item.count, 0);
      answer = total.toString();
      questionText = 'Toplam kaç araç var?';
    }

    setQuestion(questionText);
    setCorrectAnswer(answer);

    if (!isNaN(Number(answer))) {
      const wrongOptions = [];
      const numAnswer = Number(answer);
      while (wrongOptions.length < 2) {
        const wrong = numAnswer + Math.floor(Math.random() * 7) - 3;
        if (wrong > 0 && wrong !== numAnswer && !wrongOptions.includes(wrong.toString())) {
          wrongOptions.push(wrong.toString());
        }
      }
      setOptions([answer, ...wrongOptions].sort(() => Math.random() - 0.5));
    } else {
      const wrongOptions = selected
        .filter((item) => item.name !== answer)
        .map((item) => item.name)
        .slice(0, 2);
      setOptions([answer, ...wrongOptions].sort(() => Math.random() - 0.5));
    }

    setFeedback('');
  };

  const handleAnswer = (selected: string) => {
    if (selected === correctAnswer) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Doğru!');

      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete(score + points);
        }
      }, 1500);
    } else {
      setFeedback('❌ Yanlış! Tekrar dene.');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 p-4 md:p-8">
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
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">📊 Grafik Okuma 📊</h1>
        </div>

        <div className="bg-white/10 rounded-3xl p-8 mb-8">
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 mb-8">
            <div className="flex items-end justify-around h-64 gap-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                  <div className="text-white text-xl font-bold">{item.count}</div>
                  <div
                    className="bg-gradient-to-t from-blue-500 to-cyan-400 w-full rounded-t-xl flex items-end justify-center pb-2 transition-all duration-500"
                    style={{
                      height: `${(item.count / Math.max(...items.map((i) => i.count))) * 100}%`,
                    }}
                  >
                    <span className="text-3xl">{item.emoji}</span>
                  </div>
                  <div className="text-white text-sm font-bold text-center">{item.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-white text-3xl font-bold">{question}</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="h-24 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl font-black text-4xl"
              >
                {option}
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

export default GraphReadingGame;
