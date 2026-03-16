import React, { useState, useEffect } from 'react';
import { GameEngineProps, GameResults } from '../../types/engine.types';
import { QuizDataset, QuizQuestion } from '../../types/dataset.types';

export default function SpeedQuizEngine({ dataset, onComplete, onExit }: GameEngineProps) {
  const quizData = dataset.data as QuizDataset;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quizData.config.timePerQuestion || 10);
  const [startTime] = useState(Date.now());
  const [questions] = useState(() => {
    let qs = [...quizData.questions];
    if (quizData.config.randomizeQuestions) {
      qs = qs.sort(() => Math.random() - 0.5);
    }
    if (quizData.config.questionCount) {
      qs = qs.slice(0, quizData.config.questionCount);
    }
    return qs;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleTimeout = () => {
    if (isLastQuestion) {
      completeGame();
    } else {
      nextQuestion();
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (isLastQuestion) {
      completeGame(isCorrect ? 1 : 0);
    } else {
      nextQuestion();
    }
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setTimeLeft(quizData.config.timePerQuestion || 10);
  };

  const completeGame = (bonus: number = 0) => {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    const total = correctAnswers + bonus;
    const results: GameResults = {
      score: Math.round((total / questions.length) * 100),
      correctAnswers: total,
      totalQuestions: questions.length,
      duration,
      attempts: 1,
      hints: 0,
    };
    onComplete(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">{dataset.metadata.name}</h1>
            <p className="text-white/60">Hızlı Cevap Ver!</p>
          </div>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all"
          >
            Çıkış
          </button>
        </div>

        {/* Timer & Progress */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-white/60 text-sm">Süre</div>
            <div
              className={`text-3xl font-black ${timeLeft <= 3 ? 'text-red-400 animate-pulse' : 'text-white'}`}
            >
              {timeLeft}s
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-white/60 text-sm">Soru</div>
            <div className="text-3xl font-black text-white">
              {currentQuestionIndex + 1}/{questions.length}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-white/60 text-sm">Doğru</div>
            <div className="text-3xl font-black text-green-400">{correctAnswers}</div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            {currentQuestion.question}
          </h2>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="p-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white transition-all transform hover:scale-105"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
