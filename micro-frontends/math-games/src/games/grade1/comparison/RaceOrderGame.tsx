import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const RaceOrderGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [racers, setRacers] = useState<{ name: string; emoji: string; position: number }[]>([]);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  const racerData = [
    { name: 'Tavşan', emoji: '🐰' },
    { name: 'Kaplumbağa', emoji: '🐢' },
    { name: 'Tilki', emoji: '🦊' },
    { name: 'Ayı', emoji: '🐻' },
    { name: 'Kedi', emoji: '🐱' },
    { name: 'Köpek', emoji: '🐶' },
  ];

  const ordinalNumbers = ['1.', '2.', '3.', '4.', '5.', '6.'];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numRacers = Math.min(3 + level, 6);
    const selected = [...racerData]
      .sort(() => Math.random() - 0.5)
      .slice(0, numRacers)
      .map((racer, idx) => ({ ...racer, position: idx + 1 }));

    setRacers(selected);

    const questionType = Math.random();
    let answer = '';
    let questionText = '';

    if (questionType < 0.5) {
      const position = Math.floor(Math.random() * numRacers) + 1;
      const racer = selected.find((r) => r.position === position);
      answer = racer!.name;
      questionText = `${position}. olan kim?`;
    } else {
      const racer = selected[Math.floor(Math.random() * numRacers)];
      answer = ordinalNumbers[racer.position - 1];
      questionText = `${racer.name} kaçıncı oldu?`;
    }

    setQuestion(questionText);
    setCorrectAnswer(answer);

    if (answer.includes('.')) {
      const wrongOptions = ordinalNumbers.filter((o) => o !== answer).slice(0, 2);
      setOptions([answer, ...wrongOptions].sort(() => Math.random() - 0.5));
    } else {
      const wrongOptions = selected
        .filter((r) => r.name !== answer)
        .map((r) => r.name)
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 p-4 md:p-8">
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
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">🏁 Yarış Sıralama 🏁</h1>
        </div>

        <div className="bg-white/10 rounded-3xl p-8 mb-8">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl p-6">
              {racers.map((racer, idx) => (
                <div key={idx} className="flex items-center gap-4 mb-4 bg-white/20 rounded-xl p-4">
                  <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl font-black">{racer.position}</span>
                  </div>
                  <span className="text-6xl">{racer.emoji}</span>
                  <span className="text-white text-3xl font-bold">{racer.name}</span>
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
                className="h-24 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white rounded-2xl font-black text-4xl"
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

export default RaceOrderGame;
