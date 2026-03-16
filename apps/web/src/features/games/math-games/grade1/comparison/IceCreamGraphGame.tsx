import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const IceCreamGraphGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [flavors, setFlavors] = useState<{ name: string; emoji: string; count: number }[]>([]);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  const flavorData = [
    { name: 'Çikolata', emoji: '🍫' },
    { name: 'Çilek', emoji: '🍓' },
    { name: 'Vanilya', emoji: '🍦' },
    { name: 'Limon', emoji: '🍋' },
    { name: 'Muz', emoji: '🍌' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numFlavors = Math.min(3 + Math.floor(level / 2), 4);
    const selected = [...flavorData]
      .sort(() => Math.random() - 0.5)
      .slice(0, numFlavors)
      .map((f) => ({ ...f, count: Math.floor(Math.random() * (7 + level * 2)) + 1 }));

    setFlavors(selected);

    const questionType = Math.random();
    let answer = '';
    let questionText = '';

    if (questionType < 0.35) {
      const maxFlavor = selected.reduce((max, f) => (f.count > max.count ? f : max));
      answer = maxFlavor.name;
      questionText = 'En çok hangi tat satıldı?';
    } else if (questionType < 0.65) {
      const minFlavor = selected.reduce((min, f) => (f.count < min.count ? f : min));
      answer = minFlavor.name;
      questionText = 'En az hangi tat satıldı?';
    } else {
      const total = selected.reduce((sum, f) => sum + f.count, 0);
      answer = total.toString();
      questionText = 'Toplam kaç dondurma satıldı?';
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
        .filter((f) => f.name !== answer)
        .map((f) => f.name)
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
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-red-900 p-4 md:p-8">
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
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">🍦 Dondurmacı 🍦</h1>
        </div>

        <div className="bg-white/10 rounded-3xl p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {flavors.map((flavor, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-center"
              >
                <span className="text-5xl mb-2 block">{flavor.emoji}</span>
                <h3 className="text-white text-xl font-bold mb-4">{flavor.name}</h3>
                <div className="bg-white/20 rounded-xl p-3 mb-3">
                  <div className="flex flex-col-reverse gap-1">
                    {Array.from({ length: flavor.count }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-r from-yellow-400 to-orange-400 h-6 rounded flex items-center justify-center"
                      >
                        <span className="text-xs">🍦</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-yellow-500 rounded-xl px-4 py-2">
                  <span className="text-white text-2xl font-black">{flavor.count}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <p className="text-white text-3xl font-bold">{question}</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="h-24 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-2xl font-black text-4xl"
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

export default IceCreamGraphGame;
