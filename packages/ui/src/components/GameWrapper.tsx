import React, { ReactNode } from 'react';

interface GameWrapperProps {
  title: string;
  emoji: string;
  subtitle?: string;
  gradientFrom: string;
  gradientVia?: string;
  gradientTo: string;
  onExit: () => void;
  children: ReactNode;
  infoCard?: ReactNode;
  showRulesButton?: boolean;
  onShowRules?: () => void;
}

/**
 * Merkezi Oyun Wrapper Component
 * TÜM oyunlar için standart tasarım sağlar (Akari tasarımı baz alınmıştır)
 *
 * Tasarım Kuralları:
 * - Ana arka plan: slate-900 → slate-800 → slate-900
 * - Dış kart: slate-800/80 (lacivert) backdrop-blur
 * - İç kart: Oyuna özel gradient/40 opacity
 * - Çıkış butonu: Kırmızı, header'da sol
 * - Info card: Header'da sağ (süre, puan, can vb.)
 */
const GameWrapper: React.FC<GameWrapperProps> = ({
  title,
  emoji,
  subtitle,
  gradientFrom,
  gradientVia,
  gradientTo,
  onExit,
  children,
  infoCard,
  showRulesButton = true,
  onShowRules,
}) => {
  const gradientClass = gradientVia
    ? `bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo}`
    : `bg-gradient-to-br ${gradientFrom} ${gradientTo}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header - Çıkış ve Info */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onExit}
            className="px-6 py-3 bg-red-600/90 hover:bg-red-700 text-white rounded-xl font-bold transition-all transform hover:scale-105"
          >
            ← Çıkış
          </button>

          {infoCard && <div className="flex gap-4">{infoCard}</div>}
        </div>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-black mb-2">
            {emoji} {title}
          </h1>
          {subtitle && <p className="text-white/70 text-lg">{subtitle}</p>}
        </div>

        {/* Dış Kart - Lacivert */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          {/* İç Kart - Oyun Rengi */}
          <div className={`${gradientClass} rounded-2xl p-8 border border-white/10`}>
            {/* Nasıl Oynanır Butonu */}
            {showRulesButton && onShowRules && (
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={onShowRules}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-all transform hover:scale-105"
                >
                  📖 Nasıl Oynanır?
                </button>
              </div>
            )}

            {/* Oyun İçeriği */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameWrapper;
