import React, { useState, useEffect } from 'react';
import GameTemplate, {
  QuestionCard,
  AnswerButton,
  FeedbackMessage,
} from '../../../../common/GameTemplate';

interface ColorMatchGameProps {
  onBack: () => void;
}

const ColorMatchGame: React.FC<ColorMatchGameProps> = ({ onBack }) => {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [currentColor, setCurrentColor] = useState({ name: '', color: '', turkish: '' });
  const [options, setOptions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(120);

  const colors = [
    { name: 'RED', color: '#EF4444', turkish: 'Kırmızı' },
    { name: 'BLUE', color: '#3B82F6', turkish: 'Mavi' },
    { name: 'GREEN', color: '#10B981', turkish: 'Yeşil' },
    { name: 'YELLOW', color: '#FBBF24', turkish: 'Sarı' },
    { name: 'ORANGE', color: '#F97316', turkish: 'Turuncu' },
    { name: 'PURPLE', color: '#A855F7', turkish: 'Mor' },
    { name: 'PINK', color: '#EC4899', turkish: 'Pembe' },
    { name: 'BLACK', color: '#1F2937', turkish: 'Siyah' },
    { name: 'WHITE', color: '#F3F4F6', turkish: 'Beyaz' },
    { name: 'BROWN', color: '#92400E', turkish: 'Kahverengi' },
  ];

  useEffect(() => {
    generateQuestion();
  }, [round]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const generateQuestion = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(color);

    const wrongOptions = colors
      .filter((c) => c.name !== color.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((c) => c.name);

    const allOptions = [color.name, ...wrongOptions].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const correct = answer === currentColor.name;
    if (correct) setScore(score + 10);

    setTimeout(() => {
      if (round < 15) {
        setRound(round + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        alert(`Game Over! Your Score: ${score + (correct ? 10 : 0)}`);
        onBack();
      }
    }, 1500);
  };

  return (
    <GameTemplate
      title="🎨 Color Match 🎨"
      level={round}
      maxLevel={15}
      score={score}
      onExit={onBack}
      showTimer={true}
      timeLeft={timeLeft}
      colorScheme="green"
    >
      <QuestionCard colorScheme="green">
        <div className="text-center">
          <p className="text-2xl font-bold text-white mb-6">What color is this?</p>
          <div
            className="w-48 h-48 mx-auto rounded-3xl shadow-2xl border-8 border-white/30"
            style={{ backgroundColor: currentColor.color }}
          ></div>
          <p className="text-lg text-gray-200 mt-4 font-semibold">({currentColor.turkish})</p>
        </div>
      </QuestionCard>

      <div className="grid grid-cols-2 gap-4 mt-8">
        {options.map((option, index) => (
          <AnswerButton
            key={index}
            onClick={() => handleAnswer(option)}
            isCorrect={showFeedback && option === currentColor.name}
            isSelected={showFeedback && option === selectedAnswer}
            isDisabled={showFeedback}
            colorScheme="green"
          >
            {option}
          </AnswerButton>
        ))}
      </div>

      {showFeedback && (
        <FeedbackMessage
          message={
            selectedAnswer === currentColor.name
              ? '🎉 Correct! Great job!'
              : `❌ Wrong! It's ${currentColor.name}`
          }
          isCorrect={selectedAnswer === currentColor.name}
        />
      )}
    </GameTemplate>
  );
};

export default ColorMatchGame;
