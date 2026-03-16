import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const LongestLineGame: React.FC<Props> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState<{ id: number; length: number; color: string }[]>([]);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [feedback, setFeedback] = useState('');

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const numLines = Math.min(3 + Math.floor(level / 2), 5);
    const lineData = [];

    for (let i = 0; i < numLines; i++) {
      const length = Math.floor(Math.random() * (40 + level * 10)) + 20;
      lineData.push({ id: i + 1, length, color: colors[i] });
    }

    setLines(lineData);

    const questionType = Math.random();
    let answer = 0;
    let questionText = '';

    if (questionType < 0.5) {
      const longest = lineData.reduce((max, line) => (line.length > max.length ? line : max));
      answer = longest.id;
      questionText = 'En uzun çizgi hangisi?';
    } else {
      const shortest = lineData.reduce((min, line) => (line.length < min.length ? line : min));
      answer = shortest.id;
      questionText = 'En kısa çizgi hangisi?';
    }

    setQuestion(questionText);
    setCorrectAnswer(answer);
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
      setFeedback('❌ Yanlış! Tekrar dene.');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4 md:p-8">
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
            📏 En Uzun Hangisi? 📏
          </h1>
        </div>

        <div className="bg-white/10 rounded-3xl p-8 mb-8">
          <div className="mb-12 space-y-6">
            {lines.map((line) => (
              <div key={line.id} className="flex items-center gap-4">
                <div className="bg-white/20 rounded-xl px-4 py-2 w-16 text-center">
                  <span className="text-white text-2xl font-black">{line.id}</span>
                </div>
                <div className="flex-1 bg-white/10 rounded-xl p-4 flex items-center">
                  <div
                    className={`${line.color} h-8 rounded-lg transition-all duration-500`}
                    style={{ width: `${line.length}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <p className="text-white text-3xl font-bold">{question}</p>
          </div>

          <div className="flex justify-center gap-6">
            {lines.map((line) => (
              <button
                key={line.id}
                onClick={() => handleAnswer(line.id)}
                className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-2xl font-black text-5xl shadow-lg transform hover:scale-110 transition-all"
              >
                {line.id}
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

export default LongestLineGame;
