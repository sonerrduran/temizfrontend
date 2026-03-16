import React from 'react';

interface GameOverOverlayProps {
  show: boolean;
  won: boolean;
  score: number;
  onRestart: () => void;
  onExit: () => void;
  accentColor?: string;
  winEmoji?: string;
  loseEmoji?: string;
  winTitle?: string;
  loseTitle?: string;
  timeUp?: boolean;
}

/**
 * Merkezi Oyun Bitti Overlay
 * Akari tasarımına göre standartlaştırılmış oyun sonu ekranı
 */
const GameOverOverlay: React.FC<GameOverOverlayProps> = ({
  show,
  won,
  score,
  onRestart,
  onExit,
  accentColor = 'yellow',
  winEmoji = '🎉',
  loseEmoji = '❌',
  winTitle = 'TEBRİKLER!',
  loseTitle = 'OYUN BİTTİ',
  timeUp = false,
}) => {
  if (!show) return null;

  const getGradientClasses = () => {
    switch (accentColor) {
      case 'yellow':
        return 'from-yellow-600 to-amber-700';
      case 'blue':
        return 'from-blue-600 to-cyan-700';
      case 'green':
        return 'from-green-600 to-emerald-700';
      case 'red':
        return 'from-red-600 to-rose-700';
      case 'purple':
        return 'from-purple-600 to-indigo-700';
      case 'orange':
        return 'from-orange-600 to-amber-700';
      case 'pink':
        return 'from-pink-600 to-rose-700';
      case 'cyan':
        return 'from-cyan-600 to-teal-700';
      case 'teal':
        return 'from-teal-600 to-cyan-700';
      default:
        return 'from-yellow-600 to-amber-700';
    }
  };

  const getBorderColor = () => {
    return `border-${accentColor}-500/30`;
  };

  const getTextColor = () => {
    return won ? `text-${accentColor}-400` : 'text-red-500';
  };

  const displayTitle = timeUp ? '⏰ SÜRE BİTTİ' : won ? winTitle : loseTitle;
  const displayEmoji = timeUp ? '⏰' : won ? winEmoji : loseEmoji;

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
      <div className={`bg-slate-800/90 p-8 rounded-3xl border ${getBorderColor()} max-w-md w-full`}>
        <h3 className={`text-5xl md:text-6xl font-black mb-4 ${getTextColor()}`}>
          {displayEmoji} {displayTitle}
        </h3>
        <p className="text-xl md:text-2xl text-white font-bold mb-8">
          Kazanılan Yıldız: <span className={getTextColor()}>⭐ {score}</span>
        </p>

        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={onRestart}
            className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105"
          >
            🔄 Tekrar Oyna
          </button>
          <button
            onClick={onExit}
            className={`w-full bg-gradient-to-br ${getGradientClasses()} hover:opacity-90 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105`}
          >
            ← Geri Dön
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverOverlay;
