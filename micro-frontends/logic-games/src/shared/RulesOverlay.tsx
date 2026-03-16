import React, { ReactNode } from 'react';

interface RulesOverlayProps {
  show: boolean;
  onClose: () => void;
  title: string;
  emoji: string;
  rules: string[];
  accentColor: string; // e.g., "emerald", "orange", "purple"
}

/**
 * Merkezi Oyun Kuralları Overlay Component
 * Tüm zeka oyunları için standart "Nasıl Oynanır" ekranı
 */
const RulesOverlay: React.FC<RulesOverlayProps> = ({
  show,
  onClose,
  title,
  emoji,
  rules,
  accentColor,
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
    return `text-${accentColor}-400`;
  };

  const getBorderColor = () => {
    return `border-${accentColor}-500/30`;
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-50 p-6">
      <div
        className={`bg-slate-800/90 backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-2xl w-full border ${getBorderColor()}`}
      >
        <div className="text-center mb-8">
          <div className="text-6xl md:text-7xl mb-4">{emoji}</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2">{title}</h2>
          <p className="text-white/70 text-lg">Nasıl Oynanır?</p>
        </div>

        <div className="bg-slate-700/50 rounded-2xl p-6 mb-8">
          <ul className="text-white/90 space-y-4 text-base md:text-lg">
            {rules.map((rule, index) => (
              <li key={index} className="flex gap-3">
                <span className={`${getAccentTextColor()} font-black text-xl`}>{index + 1}.</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onClose}
          className={`w-full bg-gradient-to-br ${getGradientClasses()} hover:opacity-90 text-white font-black text-xl py-5 rounded-2xl transition-all transform hover:scale-105`}
        >
          ANLADIM, BAŞLA! 🚀
        </button>
      </div>
    </div>
  );
};

export default RulesOverlay;
