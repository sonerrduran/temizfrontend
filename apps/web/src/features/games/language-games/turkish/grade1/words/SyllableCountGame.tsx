import React, { useState, useEffect } from 'react';
import GameTemplate, {
  QuestionCard,
  AnswerButton,
  FeedbackMessage,
} from '../../../../common/GameTemplate';

interface SyllableCountGameProps {
  onBack: () => void;
}

const SyllableCountGame: React.FC<SyllableCountGameProps> = ({ onBack }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState({ word: '', syllables: 0 });
  const [options, setOptions] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const words = [
    { word: 'ev', syllables: 1 },
    { word: 'at', syllables: 1 },
    { word: 'el', syllables: 1 },
    { word: 'anne', syllables: 2 },
    { word: 'baba', syllables: 2 },
    { word: 'masa', syllables: 2 },
    { word: 'kedi', syllables: 2 },
    { word: 'köpek', syllables: 2 },
    { word: 'elma', syllables: 2 },
    { word: 'armut', syllables: 2 },
    { word: 'kalem', syllables: 2 },
    { word: 'kitap', syllables: 2 },
    { word: 'okul', syllables: 2 },
    { word: 'araba', syllables: 3 },
    { word: 'uçak', syllables: 2 },
    { word: 'bisiklet', syllables: 3 },
    { word: 'çikolata', syllables: 4 },
    { word: 'kelebek', syllables: 3 },
    { word: 'karınca', syllables: 3 },
    { word: 'ayakkabı', syllables: 4 },
  ];

  useEffect(() => {
    generateQuestion();
  }, [level]);

  const generateQuestion = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);

    const correctAnswer = word.syllables;
    const wrongOptions = [correctAnswer + 1, correctAnswer - 1, correctAnswer + 2].filter(
      (n) => n > 0 && n <= 5
    );

    const allOptions = [correctAnswer, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const correct = answer === currentWord.syllables;
    if (correct) {
      const points = 10 + level * 5;
      setScore(score + points);
    }

    setTimeout(() => {
      if (level < 5) {
        setLevel(level + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        alert(`Oyun Bitti! Skorun: ${score + (correct ? 10 + level * 5 : 0)}`);
        onBack();
      }
    }, 1500);
  };

  return (
    <GameTemplate
      title="Hece Sayma 📝"
      level={level}
      maxLevel={5}
      score={score}
      onExit={onBack}
      colorScheme="cyan"
    >
      <QuestionCard colorScheme="cyan">
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold text-white mb-8">Bu kelime kaç heceli?</p>
          <div className="text-6xl md:text-8xl font-black text-white mb-8">{currentWord.word}</div>
        </div>
      </QuestionCard>

      <div className="grid grid-cols-3 gap-4 mt-8">
        {options.map((option, index) => (
          <AnswerButton
            key={index}
            onClick={() => handleAnswer(option)}
            isCorrect={showFeedback && option === currentWord.syllables}
            isSelected={showFeedback && option === selectedAnswer}
            isDisabled={showFeedback}
            colorScheme="cyan"
          >
            {option}
          </AnswerButton>
        ))}
      </div>

      {showFeedback && (
        <FeedbackMessage
          isCorrect={selectedAnswer === currentWord.syllables}
          message={
            selectedAnswer === currentWord.syllables
              ? '🎉 Harika! Doğru!'
              : `❌ Yanlış! "${currentWord.word}" ${currentWord.syllables} hecelidir.`
          }
        />
      )}
    </GameTemplate>
  );
};

export default SyllableCountGame;
