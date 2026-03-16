import React from 'react';

interface GameOverOverlayProps {
  show: boolean;
  won: boolean;
  score: number;
  onRestart: () => void;
  onExit: () => void;
  accentColor: string; // e.g., "emerald", "orange", "purple"
  winEmoji?: string;
  loseEmoji?: string;
  winTitle?: string;
  loseTitle?: string;
}

/**
 * Merkezi Oyun Bitti Overlay Component
 * Tüm zeka oyunları için standart oyun sonu ekranı
 */
const GameOverOverlay: React.FC<GameOverOverlayProps> = ({
  show,
  won,
  score,
  onRestart,
  onExit,
  accentColor,
  winEmoji = '✅',
  loseEmoji = '💥',
  winTitle = 'GÖREV TAMAM',
  loseTitle = 'OYUN BİTTİ',
}) => {
  if (!show) return null;

  const getGradientClasses = () => {
    switch (accentColor) {
      case 'emerald':
        return 'from-emerald-600 to-teal-700';
      case 'orange':
        return 'from-orange-600 to-amber-700';
      case 'purple':
        return 'from-purple-600 to-indigo-700';
      case 'pink':
        return 'from-pink-600 to-rose-700';
      case 'blue':
        return 'from-blue-600 to-cyan-700';
      case 'red':
        return 'from-red-600 to-rose-700';
      case 'yellow':
        return 'from-yellow-600 to-amber-700';
      case 'teal':
        return 'from-teal-600 to-cyan-700';
      default:
        return 'from-slate-600 to-slate-700';
    }
  };

  const getAccentTextColor = () => {
    return won ? `text-${accentColor}-400` : 'text-red-400';
  };

  const getBorderColor = () => {
    return `border-${accentColor}-500/30`;
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-50 p-6">
      <div
        className={`bg-slate-800/90 backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-md w-full border ${getBorderColor()}`}
      >
        <div className="text-center mb-8">
          <div className={`text-6xl md:text-7xl mb-4 ${!won ? 'animate-bounce' : ''}`}>
            {won ? winEmoji : loseEmoji}
          </div>
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${getAccentTextColor()}`}>
            {won ? winTitle : loseTitle}
          </h2>
          <div className="bg-slate-700/50 rounded-2xl p-6 mb-6">
            <p className="text-white/70 text-lg mb-2">Kazanılan Yıldız</p>
            <p className={`text-5xl font-black ${getAccentTextColor()}`}>⭐ {score}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={onRestart}
            className="w-full bg-slate-700/80 hover:bg-slate-600/80 text-white font-black text-xl py-5 rounded-2xl transition-all transform hover:scale-105"
          >
            🔄 Tekrar Oyna
          </button>
          <button
            onClick={onExit}
            className={`w-full bg-gradient-to-br ${getGradientClasses()} hover:opacity-90 text-white font-black text-xl py-5 rounded-2xl transition-all transform hover:scale-105`}
          >
            Ana Menüye Dön
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverOverlay;
