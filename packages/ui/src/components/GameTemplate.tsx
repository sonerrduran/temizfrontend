import React from 'react';

// Color schemes for different game types
const colorSchemes = {
  green: {
    innerCard: 'bg-green-500/20 border border-green-500/30',
    button: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
    box: 'bg-green-500/30 border border-green-500/40',
  },
  blue: {
    innerCard: 'bg-blue-500/20 border border-blue-500/30',
    button: 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700',
    box: 'bg-blue-500/30 border border-blue-500/40',
  },
  purple: {
    innerCard: 'bg-purple-500/20 border border-purple-500/30',
    button: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700',
    box: 'bg-purple-500/30 border border-purple-500/40',
  },
  pink: {
    innerCard: 'bg-pink-500/20 border border-pink-500/30',
    button: 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700',
    box: 'bg-pink-500/30 border border-pink-500/40',
  },
  orange: {
    innerCard: 'bg-orange-500/20 border border-orange-500/30',
    button: 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700',
    box: 'bg-orange-500/30 border border-orange-500/40',
  },
  yellow: {
    innerCard: 'bg-yellow-500/20 border border-yellow-500/30',
    button: 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700',
    box: 'bg-yellow-500/30 border border-yellow-500/40',
  },
  red: {
    innerCard: 'bg-red-500/20 border border-red-500/30',
    button: 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700',
    box: 'bg-red-500/30 border border-red-500/40',
  },
  cyan: {
    innerCard: 'bg-cyan-500/20 border border-cyan-500/30',
    button: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700',
    box: 'bg-cyan-500/30 border border-cyan-500/40',
  },
  indigo: {
    innerCard: 'bg-indigo-500/20 border border-indigo-500/30',
    button: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700',
    box: 'bg-indigo-500/30 border border-indigo-500/40',
  },
};

const gameTheme = {
  background: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
  outerCard: 'bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl',
  header: {
    container: 'bg-slate-700/50 backdrop-blur-xl rounded-xl border border-white/10',
    text: 'text-white font-bold',
  },
  exitButton: 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600',
  text: {
    heading: 'text-white font-black',
    secondary: 'text-white/70',
  },
  feedback: {
    correct: 'bg-green-500/20 border border-green-500/30 text-green-300',
    incorrect: 'bg-red-500/20 border border-red-500/30 text-red-300',
  },
};

export interface GameTemplateProps {
  title: string;
  emoji?: string;
  level: number;
  maxLevel?: number;
  score: number;
  onExit: () => void;
  children: React.ReactNode;
  colorScheme?:
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'orange'
    | 'yellow'
    | 'red'
    | 'cyan'
    | 'indigo';
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
const GameTemplate: React.FC<GameTemplateProps> = ({
  title,
  emoji = '🎮',
  level,
  maxLevel = 5,
  score,
  onExit,
  children,
}) => {
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

export default GameTemplate;

/**
 * İç Kart - Oyun Kutusu Rengi
 * Oyun içeriği için kullanılır
 */
export const InnerCard: React.FC<{
  children: React.ReactNode;
  colorScheme?:
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'orange'
    | 'yellow'
    | 'red'
    | 'cyan'
    | 'indigo';
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
  colorScheme?:
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'orange'
    | 'yellow'
    | 'red'
    | 'cyan'
    | 'indigo';
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
  colorScheme?:
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'orange'
    | 'yellow'
    | 'red'
    | 'cyan'
    | 'indigo';
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
  colorScheme?:
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'orange'
    | 'yellow'
    | 'red'
    | 'cyan'
    | 'indigo';
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
  colorScheme?:
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'orange'
    | 'yellow'
    | 'red'
    | 'cyan'
    | 'indigo';
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
