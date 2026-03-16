import React, { useState, useEffect } from 'react';
import { GameEngineProps, GameResults } from '../../types/engine.types';

interface ComparisonQuestion {
  id: string;
  item1: any;
  item2: any;
  correctAnswer: 'bigger' | 'smaller' | 'equal';
  type?: 'number' | 'size' | 'weight' | 'length';
}

interface ComparisonDataset {
  questions: ComparisonQuestion[];
  config: {
    timeLimit?: number;
    showTimer?: boolean;
  };
}

export default function ComparisonEngine({ dataset, onComplete, onExit }: GameEngineProps) {
  const compData = dataset.data as ComparisonDataset;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(compData.config.timeLimit || 60);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [startTime] = useState(Date.now());

  const currentQuestion = compData.questions[currentIndex];
  const isLastQuestion = currentIndex === compData.questions.length - 1;

  useEffect(() => {
    if (compData.config.showTimer && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleGameEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleAnswer = (answer: 'bigger' | 'smaller' | 'equal') => {
    if (feedback) return;

    const isCorrect = answer === currentQuestion.correctAnswer;

    if (isCorrect) {
      const newStreak = streak + 1;
      const points = 10 + newStreak * 2;
      setScore((prev) => prev + points);
      setCorrectAnswers((prev) => prev + 1);
      setStreak(newStreak);
      setMaxStreak(Math.max(maxStreak, newStreak));
      setFeedback(`✅ Doğru! +${points} puan`);
    } else {
      setStreak(0);
      setFeedback(`❌ Yanlış! Doğru cevap: ${getAnswerText(currentQuestion.correctAnswer)}`);
    }

    setTimeout(() => {
      setFeedback(null);
      if (isLastQuestion) {
        handleGameEnd();
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 1500);
  };

  const handleGameEnd = () => {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    const results: GameResults = {
      score,
      correctAnswers,
      totalQuestions: compData.questions.length,
      duration,
      attempts: 1,
      hints: 0,
    };
    onComplete(results);
  };

  const getAnswerText = (answer: string) => {
    switch (answer) {
      case 'bigger':
        return 'BÜYÜK';
      case 'smaller':
        return 'KÜÇÜK';
      case 'equal':
        return 'EŞİT';
      default:
        return answer;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-all"
          >
            ← Geri
          </button>
          <h1 className="text-4xl font-black text-white">{dataset.metadata.name}</h1>
          <div className="w-24"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Puan</div>
            <div className="text-3xl font-black text-white">{score}</div>
          </div>
          {compData.config.showTimer && (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-white/80 text-sm">Süre</div>
              <div
                className={`text-3xl font-black ${timeLeft <= 10 ? 'text-red-300 animate-pulse' : 'text-white'}`}
              >
                {timeLeft}s
              </div>
            </div>
          )}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Seri</div>
            <div className="text-3xl font-black text-white">{streak}🔥</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm">Soru</div>
            <div className="text-3xl font-black text-white">
              {currentIndex + 1}/{compData.questions.length}
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 mb-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            İlk {currentQuestion.type || 'sayı'} ikinci {currentQuestion.type || 'sayı'}dan...
          </h3>

          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl">
              <div className="text-7xl font-black text-white">{currentQuestion.item1}</div>
            </div>

            <div className="text-6xl text-white animate-pulse">?</div>

            <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl p-8 shadow-2xl">
              <div className="text-7xl font-black text-white">{currentQuestion.item2}</div>
            </div>
          </div>
        </div>

        {/* Answer Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <button
            onClick={() => handleAnswer('bigger')}
            disabled={!!feedback}
            className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-3xl p-8 text-white transition-all hover:scale-105 disabled:opacity-50"
          >
            <div className="text-5xl mb-2">▲</div>
            <div className="text-3xl font-black">BÜYÜK</div>
          </button>

          <button
            onClick={() => handleAnswer('equal')}
            disabled={!!feedback}
            className="bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 rounded-3xl p-8 text-white transition-all hover:scale-105 disabled:opacity-50"
          >
            <div className="text-5xl mb-2">=</div>
            <div className="text-3xl font-black">EŞİT</div>
          </button>

          <button
            onClick={() => handleAnswer('smaller')}
            disabled={!!feedback}
            className="bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-3xl p-8 text-white transition-all hover:scale-105 disabled:opacity-50"
          >
            <div className="text-5xl mb-2">▼</div>
            <div className="text-3xl font-black">KÜÇÜK</div>
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`text-center text-2xl font-black p-6 rounded-xl ${
              feedback.includes('✅')
                ? 'bg-green-500/30 text-green-100'
                : 'bg-red-500/30 text-red-100'
            }`}
          >
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}
