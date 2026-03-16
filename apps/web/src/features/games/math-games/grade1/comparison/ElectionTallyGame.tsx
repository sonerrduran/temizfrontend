import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const ElectionTallyGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [candidates, setCandidates] = useState<{ name: string; emoji: string; votes: number }[]>(
    []
  );
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  const candidateData = [
    { name: 'Ali', emoji: '👦' },
    { name: 'Ayşe', emoji: '👧' },
    { name: 'Mehmet', emoji: '🧒' },
    { name: 'Zeynep', emoji: '👧' },
    { name: 'Can', emoji: '👦' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numCandidates = Math.min(3 + Math.floor(level / 2), 4);
    const selected = [...candidateData]
      .sort(() => Math.random() - 0.5)
      .slice(0, numCandidates)
      .map((c) => ({ ...c, votes: Math.floor(Math.random() * (8 + level * 3)) + 1 }));

    setCandidates(selected);

    const questionType = Math.random();
    let answer = '';
    let questionText = '';

    if (questionType < 0.4) {
      const winner = selected.reduce((max, c) => (c.votes > max.votes ? c : max));
      answer = winner.name;
      questionText = 'Kim başkan seçildi?';
    } else if (questionType < 0.7) {
      const total = selected.reduce((sum, c) => sum + c.votes, 0);
      answer = total.toString();
      questionText = 'Toplam kaç oy kullanıldı?';
    } else {
      const candidate = selected[Math.floor(Math.random() * selected.length)];
      answer = candidate.votes.toString();
      questionText = `${candidate.name} kaç oy aldı?`;
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
        .filter((c) => c.name !== answer)
        .map((c) => c.name)
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 p-4 md:p-8">
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
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">🗳️ Başkan Seçimi 🗳️</h1>
        </div>

        <div className="bg-white/10 rounded-3xl p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {candidates.map((candidate, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-center"
              >
                <span className="text-6xl mb-2 block">{candidate.emoji}</span>
                <h3 className="text-white text-2xl font-bold mb-4">{candidate.name}</h3>
                <div className="bg-white/20 rounded-xl p-4 mb-2">
                  <div className="flex flex-col gap-1">
                    {Array.from({ length: candidate.votes }).map((_, i) => (
                      <div key={i} className="bg-yellow-400 h-2 rounded"></div>
                    ))}
                  </div>
                </div>
                <div className="bg-yellow-500 rounded-xl px-4 py-2">
                  <span className="text-white text-2xl font-black">{candidate.votes} oy</span>
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

export default ElectionTallyGame;
