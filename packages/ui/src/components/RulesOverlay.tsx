import React from 'react';

export interface RulesOverlayProps {
  show: boolean;
  onClose: () => void;
  title: string;
  emoji: string;
  rules: string[];
  accentColor?: string;
}

/**
 * Merkezi Oyun Kuralları Overlay
 * Akari tasarımına göre standartlaştırılmış "Nasıl Oynanır" ekranı
 */
const RulesOverlay: React.FC<RulesOverlayProps> = ({
  show,
  onClose,
  emoji,
  rules,
  accentColor = 'yellow',
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
    return `text-${accentColor}-400`;
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 p-6 text-center">
      <div
        className={`bg-slate-800/90 p-6 md:p-8 rounded-3xl border ${getBorderColor()} max-w-md w-full`}
      >
        <div className="text-5xl mb-4">{emoji}</div>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Nasıl Oynanır?</h3>
        <ul className="text-white/90 text-left space-y-3 mb-8 text-sm md:text-base font-medium">
          {rules.map((rule, index) => (
            <li key={index} className="flex gap-2">
              <span className={getTextColor()}>{index + 1}.</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className={`w-full bg-gradient-to-br ${getGradientClasses()} hover:opacity-90 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105`}
        >
          ANLADIM, BAŞLA! 🚀
        </button>
      </div>
    </div>
  );
};

export default RulesOverlay;
