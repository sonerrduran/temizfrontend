import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const FavoriteColorSurveyGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [colors, setColors] = useState<{ name: string; emoji: string; count: number }[]>([]);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  const colorData = [
    { name: 'Kırmızı', emoji: '🔴' },
    { name: 'Mavi', emoji: '🔵' },
    { name: 'Yeşil', emoji: '🟢' },
    { name: 'Sarı', emoji: '🟡' },
    { name: 'Turuncu', emoji: '🟠' },
    { name: 'Mor', emoji: '🟣' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numColors = Math.min(3 + Math.floor(level / 2), 5);
    const selected = [...colorData]
      .sort(() => Math.random() - 0.5)
      .slice(0, numColors)
      .map((c) => ({ ...c, count: Math.floor(Math.random() * (8 + level * 2)) + 1 }));

    setColors(selected);

    const questionType = Math.random();
    let answer = '';
    let questionText = '';

    if (questionType < 0.4) {
      const maxColor = selected.reduce((max, c) => (c.count > max.count ? c : max));
      answer = maxColor.name;
      questionText = 'En çok hangi renk seçildi?';
    } else if (questionType < 0.7) {
      const minColor = selected.reduce((min, c) => (c.count < min.count ? c : min));
      answer = minColor.name;
      questionText = 'En az hangi renk seçildi?';
    } else {
      const total = selected.reduce((sum, c) => sum + c.count, 0);
      answer = total.toString();
      questionText = 'Toplam kaç kişi oy kullandı?';
    }

    setQuestion(questionText);
    setCorrectAnswer(answer);

    if (answer === answer.toString() && !isNaN(Number(answer))) {
      const wrongOptions: string[] = [];
      const numAnswer = Number(answer);
      while (wrongOptions.length < 2) {
        const wrong = numAnswer + Math.floor(Math.random() * 7) - 3;
        if (wrong > 0 && wrong !== numAnswer && !wrongOptions.includes(wrong.toString())) {
          wrongOptions.push(wrong.toString());
        }
      }
      setOptions([answer, ...wrongOptions].sort(() => Math.random() - 0.5));
    } else {
      const wrongColors = selected.filter((c) => c.name !== answer).map((c) => c.name);
      setOptions([answer, ...wrongColors.slice(0, 2)].sort(() => Math.random() - 0.5));
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
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 p-4 md:p-8">
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
            🎨 Favori Renk Anketi 🎨
          </h1>
        </div>

        <div className="bg-white/10 rounded-3xl p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {colors.map((color, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white/20 to-white/10 rounded-2xl p-6 text-center"
              >
                <h3 className="text-white text-2xl font-bold mb-4">{color.name}</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-4 min-h-[100px]">
                  {Array.from({ length: color.count }).map((_, i) => (
                    <span key={i} className="text-4xl">
                      {color.emoji}
                    </span>
                  ))}
                </div>
                <div className="bg-white/30 rounded-xl px-4 py-3">
                  <span className="text-white text-3xl font-black">{color.count} oy</span>
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
                className="h-24 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-2xl font-black text-3xl"
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

export default FavoriteColorSurveyGame;
