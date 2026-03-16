import React, { ReactNode } from 'react';

interface LogicGameWrapperProps {
  title: string;
  emoji: string;
  subtitle?: string;
  gradientFrom: string;
  gradientTo: string;
  onExit: () => void;
  children: ReactNode;
  infoCard?: ReactNode;
  showRulesButton?: boolean;
  onShowRules?: () => void;
}

/**
 * Merkezi Zeka Oyunu Wrapper Component
 * Tüm zeka oyunları için standart tasarım sağlar
 */
const LogicGameWrapper: React.FC<LogicGameWrapperProps> = ({
  title,
  emoji,
  subtitle,
  gradientFrom,
  gradientTo,
  onExit,
  children,
  infoCard,
  showRulesButton = true,
  onShowRules,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex items-center justify-center">
      {/* Dış Kart - Tam Ekran */}
      <div className="bg-slate-800/80 backdrop-blur-xl rounded-[40px] p-1 border border-slate-700 w-full max-w-4xl">
        {/* İç Kart - Oyun Rengi */}
        <div
          className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-[36px] p-8 relative`}
        >
          {/* Çıkış Butonu - Sol Üst */}
          <button
            onClick={onExit}
            className="absolute top-6 left-6 w-12 h-12 bg-red-600/90 hover:bg-red-700 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all transform hover:scale-110 z-10"
          >
            ✕
          </button>

          {/* Info Card - Sağ Üst */}
          {infoCard && (
            <div className="absolute top-6 right-6 bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 z-10">
              {infoCard}
            </div>
          )}

          {/* Başlık */}
          <div className="text-center mb-8 mt-16">
            <h1 className="text-white text-4xl md:text-5xl font-black mb-2">
              {emoji} {title}
            </h1>
            {subtitle && <p className="text-white/90 text-lg">{subtitle}</p>}
          </div>

          {/* Nasıl Oynanır Butonu */}
          {showRulesButton && onShowRules && (
            <div className="flex justify-center mb-6">
              <button
                onClick={onShowRules}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl font-bold transition-all transform hover:scale-105 border border-white/30"
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
  );
};

export default LogicGameWrapper;
