import React, { useState, useEffect } from 'react';
import { GameEngineProps, GameResults } from '../../types/engine.types';
import { QuizDataset, QuizQuestion } from '../../types/dataset.types';

export default function QuizEngine({ dataset, onComplete, onExit }: GameEngineProps) {
  const quizData = dataset.data as QuizDataset;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime] = useState(Date.now());
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    // Randomize questions if configured
    let qs = [...quizData.questions];
    if (quizData.config.randomizeQuestions) {
      qs = qs.sort(() => Math.random() - 0.5);
    }

    // Limit question count
    if (quizData.config.questionCount) {
      qs = qs.slice(0, quizData.config.questionCount);
    }

    // Randomize options
    if (quizData.config.randomizeOptions) {
      qs = qs.map((q) => {
        if (q.options && q.type === 'multiple-choice') {
          const correctOption = q.options[q.correctAnswer as number];
          const shuffled = [...q.options].sort(() => Math.random() - 0.5);
          return {
            ...q,
            options: shuffled,
            correctAnswer: shuffled.indexOf(correctOption),
          };
        }
        return q;
      });
    }

    setQuestions(qs);
  }, []);

  if (questions.length === 0) {
    return <div className="text-white">Yükleniyor...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    // Auto advance after 2 seconds
    setTimeout(() => {
      if (isLastQuestion) {
        // Game complete
        const duration = Math.floor((Date.now() - startTime) / 1000);
        const results: GameResults = {
          score: Math.round(((correctAnswers + (isCorrect ? 1 : 0)) / questions.length) * 100),
          correctAnswers: correctAnswers + (isCorrect ? 1 : 0),
          totalQuestions: questions.length,
          duration,
          attempts: 1,
          hints: 0,
        };
        onComplete(results);
      } else {
        // Next question
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">{dataset.metadata.name}</h1>
            <p className="text-white/60">
              Soru {currentQuestionIndex + 1} / {questions.length}
            </p>
          </div>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all"
          >
            Çıkış
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{currentQuestion.question}</h2>
            {currentQuestion.image && (
              <img
                src={currentQuestion.image}
                alt="Question"
                className="w-full max-w-md mx-auto rounded-xl mb-4"
              />
            )}
          </div>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options?.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showResult = showFeedback && isSelected;

              return (
                <button
                  key={index}
                  onClick={() => !showFeedback && handleAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full p-6 rounded-2xl text-left font-bold text-lg transition-all ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : isSelected
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1">{option}</div>
                    {showResult && <div className="text-2xl">{isCorrect ? '✅' : '❌'}</div>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showFeedback && currentQuestion.explanation && (
            <div className="mt-6 p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
              <p className="text-white/90">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>

        {/* Score */}
        <div className="mt-8 text-center">
          <div className="text-white/60 text-lg">
            Doğru Cevaplar: <span className="text-green-400 font-bold">{correctAnswers}</span> /{' '}
            {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
}
