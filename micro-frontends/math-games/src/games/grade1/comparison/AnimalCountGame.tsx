import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const AnimalCountGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [animals, setAnimals] = useState<{ emoji: string; name: string; count: number }[]>([]);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');

  const animalData = [
    { emoji: '🐶', name: 'Köpek' },
    { emoji: '🐱', name: 'Kedi' },
    { emoji: '🐰', name: 'Tavşan' },
    { emoji: '🐻', name: 'Ayı' },
    { emoji: '🦊', name: 'Tilki' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numAnimals = Math.min(3 + Math.floor(level / 2), 4);
    const selected = [...animalData]
      .sort(() => Math.random() - 0.5)
      .slice(0, numAnimals)
      .map((a) => ({ ...a, count: Math.floor(Math.random() * (5 + level * 2)) + 1 }));

    setAnimals(selected);

    const questionType = Math.random();
    let answer = 0;
    let questionText = '';

    if (questionType < 0.5) {
      const maxAnimal = selected.reduce((max, a) => (a.count > max.count ? a : max));
      answer = maxAnimal.count;
      questionText = `${maxAnimal.name} kaç tane?`;
    } else {
      answer = selected.reduce((sum, a) => sum + a.count, 0);
      questionText = 'Toplam kaç hayvan var?';
    }

    setQuestion(questionText);
    setCorrectAnswer(answer);

    const wrongOptions: number[] = [];
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
      setFeedback('🎉 Doğru!');

      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
        } else {
          onComplete(score + points);
        }
      }, 1500);
    } else {
      setFeedback('❌ Yanlış!');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-cyan-900 p-4 md:p-8">
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
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">🐾 Hayvan Sayımı 🐾</h1>
        </div>

        <div className="bg-white/10 rounded-3xl p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {animals.map((animal, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-center"
              >
                <h3 className="text-white text-xl font-bold mb-2">{animal.name}</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-4 min-h-[80px]">
                  {Array.from({ length: animal.count }).map((_, i) => (
                    <span key={i} className="text-4xl">
                      {animal.emoji}
                    </span>
                  ))}
                </div>
                <div className="bg-white/20 rounded-xl px-4 py-2">
                  <span className="text-white text-2xl font-black">{animal.count}</span>
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
                className="h-24 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white rounded-2xl font-black text-5xl"
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

export default AnimalCountGame;
