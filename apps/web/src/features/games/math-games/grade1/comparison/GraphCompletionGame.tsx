import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const GraphCompletionGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [items, setItems] = useState<
    { name: string; emoji: string; count: number; hidden: boolean }[]
  >([]);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');

  const itemData = [
    { name: 'Elma', emoji: '🍎' },
    { name: 'Muz', emoji: '🍌' },
    { name: 'Portakal', emoji: '🍊' },
    { name: 'Üzüm', emoji: '🍇' },
    { name: 'Çilek', emoji: '🍓' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numItems = Math.min(3 + Math.floor(level / 2), 4);
    const selected = [...itemData]
      .sort(() => Math.random() - 0.5)
      .slice(0, numItems)
      .map((item) => ({
        ...item,
        count: Math.floor(Math.random() * (6 + level * 2)) + 2,
        hidden: false,
      }));

    const hiddenIndex = Math.floor(Math.random() * selected.length);
    selected[hiddenIndex].hidden = true;

    setItems(selected);

    const answer = selected[hiddenIndex].count;
    const questionText = `${selected[hiddenIndex].name} için eksik olan sayı kaç?`;

    setQuestion(questionText);
    setCorrectAnswer(answer);

    const wrongOptions = [];
    while (wrongOptions.length < 2) {
      const wrong = answer + Math.floor(Math.random() * 5) - 2;
      if (wrong > 0 && wrong !== answer && !wrongOptions.includes(wrong)) {
        wrongOptions.push(wrong);
      }
    }

    setOptions([answer, ...wrongOptions].sort(() => Math.random() - 0.5));
    setFeedback('');
  };

  const handleAnswer = (selected: number) => {
    if (selected === correctAnswer) {
      const points = 10 + level * 5;
      setScore(score + points);
      setFeedback('🎉 Doğru! Grafiği tamamladın!');

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 md:p-8">
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
            📈 Grafik Tamamlama 📈
          </h1>
        </div>

        <div className="bg-white/10 rounded-3xl p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-center"
              >
                <h3 className="text-white text-xl font-bold mb-2">{item.name}</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-4 min-h-[100px]">
                  {!item.hidden ? (
                    Array.from({ length: item.count }).map((_, i) => (
                      <span key={i} className="text-3xl">
                        {item.emoji}
                      </span>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-6xl">❓</span>
                    </div>
                  )}
                </div>
                <div
                  className={`rounded-xl px-4 py-2 ${item.hidden ? 'bg-yellow-500/50' : 'bg-white/20'}`}
                >
                  <span className="text-white text-2xl font-black">
                    {item.hidden ? '?' : item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <p className="text-white text-2xl font-bold">{question}</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="h-24 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl font-black text-5xl"
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

export default GraphCompletionGame;
