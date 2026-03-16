import React, { ReactNode } from 'react';

interface TwoPlayerGameWrapperProps {
  title: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
  onExit: () => void;
  children: ReactNode;
  scoreCard?: ReactNode;
}

/**
 * İki Kişilik Oyunlar için Wrapper Component
 * Akari tasarım sistemini iki kişilik oyunlara uyarlar
 */
const TwoPlayerGameWrapper: React.FC<TwoPlayerGameWrapperProps> = ({
  title,
  emoji,
  gradientFrom,
  gradientTo,
  onExit,
  children,
  scoreCard,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 flex items-center justify-center">
      {/* Dış Kart */}
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

          {/* Skor Kartı - Sağ Üst (opsiyonel) */}
          {scoreCard && <div className="absolute top-6 right-6 z-10">{scoreCard}</div>}

          {/* Başlık */}
          <div className="text-center mb-8 mt-16">
            <h1 className="text-white text-4xl md:text-5xl font-black mb-2">
              {emoji} {title}
            </h1>
          </div>

          {/* Oyun İçeriği */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default TwoPlayerGameWrapper;
