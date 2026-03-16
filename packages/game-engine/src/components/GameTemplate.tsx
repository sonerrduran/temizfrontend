import React from 'react';
import { gameTheme, colorSchemes, type ColorSchemeName } from '@egitim-galaksisi/ui/theme';

export interface GameTemplateProps {
  title: string;
  emoji?: string;
  level: number;
  maxLevel?: number;
  score: number;
  onExit: () => void;
  children: React.ReactNode;
  colorScheme?: ColorSchemeName;
}

/**
 * Standart Oyun Şablonu
 *
 * Tasarım Standardı:
 * - Ana arka plan: Koyu lacivert (her oyunda aynı)
 * - Dış kart: Koyu lacivert (her oyunda aynı)
 * - İç kart: Oyun kutusu rengi (her oyun farklı)
 * - Butonlar: Oyun kutusu rengi (her oyun farklı)
 * - Çıkış: Kırmızı (her oyunda aynı)
 */
export const GameTemplate: React.FC<GameTemplateProps> = ({
  title,
  emoji = '🎮',
  level,
  maxLevel = 5,
  score,
  onExit,
  children,
  colorScheme = 'green',
}) => {
  const colors = colorSchemes[colorScheme];

  return (
    <div className={`min-h-screen ${gameTheme.background} p-4 md:p-8`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          {/* Sol: Çıkış Butonu */}
          <button
            onClick={onExit}
            className={`px-6 py-3 ${gameTheme.exitButton} text-white rounded-xl font-bold transition-all transform hover:scale-105`}
          >
            ← Çıkış
          </button>

          {/* Sağ: Seviye ve Puan */}
          <div className="flex gap-4">
            <div className={`px-6 py-3 ${gameTheme.header.container}`}>
              <span className={gameTheme.header.text}>
                Seviye: {level}/{maxLevel}
              </span>
            </div>
            <div className={`px-6 py-3 ${gameTheme.header.container}`}>
              <span className={gameTheme.header.text}>⭐ {score}</span>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className={`${gameTheme.text.heading} text-4xl md:text-5xl font-black`}>
            {emoji} {title}
          </h1>
          <p className={`${gameTheme.text.secondary} text-lg mt-2`}>Puan: {score}</p>
        </div>

        {/* Dış Kart - Lacivert (Sabit) */}
        <div className={`${gameTheme.outerCard} p-8`}>{children}</div>
      </div>
    </div>
  );
};

/**
 * İç Kart - Oyun Kutusu Rengi
 * Oyun içeriği için kullanılır
 */
export const InnerCard: React.FC<{
  children: React.ReactNode;
  colorScheme?: ColorSchemeName;
}> = ({ children, colorScheme = 'green' }) => {
  const colors = colorSchemes[colorScheme];

  return <div className={`${colors.innerCard} rounded-2xl p-8 md:p-12 mb-8`}>{children}</div>;
};

/**
 * Oyun Butonu - Oyun Kutusu Rengi
 */
export const GameButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  colorScheme?: ColorSchemeName;
}> = ({ children, onClick, disabled = false, colorScheme = 'green' }) => {
  const colors = colorSchemes[colorScheme];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full ${colors.button} text-white text-2xl md:text-3xl font-black py-5 md:py-6 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105`}
    >
      {children}
    </button>
  );
};

/**
 * Küçük Kutu - Oyun Kutusu Rengi
 * Meyve kutuları, sayı kutuları vb. için
 */
export const GameBox: React.FC<{
  children: React.ReactNode;
  colorScheme?: ColorSchemeName;
  className?: string;
}> = ({ children, colorScheme = 'green', className = '' }) => {
  const colors = colorSchemes[colorScheme];

  return <div className={`${colors.box} p-4 md:p-5 rounded-2xl ${className}`}>{children}</div>;
};

/**
 * Feedback Mesajı
 */
export const FeedbackMessage: React.FC<{
  message: string;
  isCorrect: boolean;
}> = ({ message, isCorrect }) => {
  return (
    <div
      className={`mt-8 p-6 rounded-2xl text-center font-bold text-2xl ${
        isCorrect ? gameTheme.feedback.correct : gameTheme.feedback.incorrect
      }`}
    >
      {message}
    </div>
  );
};

/**
 * Soru Kartı
 */
export const QuestionCard: React.FC<{
  children: React.ReactNode;
  colorScheme?: ColorSchemeName;
}> = ({ children, colorScheme = 'green' }) => {
  const colors = colorSchemes[colorScheme];

  return <div className={`${colors.innerCard} rounded-2xl p-8 md:p-12 mb-8`}>{children}</div>;
};

/**
 * Cevap Butonu
 */
export const AnswerButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  colorScheme?: ColorSchemeName;
  className?: string;
}> = ({ children, onClick, disabled = false, colorScheme = 'green', className = '' }) => {
  const colors = colorSchemes[colorScheme];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${colors.button} text-white text-xl md:text-2xl font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
};
