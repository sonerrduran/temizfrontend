import React, { Suspense, lazy } from 'react';
import { getGameById } from './gameRegistry';

interface DynamicGameLoaderProps {
  gameId: string;
  onExit?: () => void;
  [key: string]: any;
}

const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl animate-bounce mb-4">🎮</div>
      <div className="text-white text-xl font-bold">Oyun Yükleniyor...</div>
      <div className="text-white/50 text-sm mt-2">Lütfen bekleyin</div>
    </div>
  </div>
);

const ErrorFallback = ({ gameId }: { gameId: string }) => (
  <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center p-4">
    <div className="text-center bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md">
      <div className="text-6xl mb-4">❌</div>
      <h2 className="text-2xl font-bold text-white mb-2">Oyun Bulunamadı</h2>
      <p className="text-white/70 mb-4">"{gameId}" oyunu yüklenemedi.</p>
      <button
        onClick={() => window.history.back()}
        className="bg-white text-red-900 px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-all"
      >
        ← Geri Dön
      </button>
    </div>
  </div>
);

/**
 * Dynamic Game Loader
 * Oyunları ID'ye göre dinamik olarak yükler
 */
const DynamicGameLoader: React.FC<DynamicGameLoaderProps> = ({ gameId, ...props }) => {
  const gameConfig = getGameById(gameId);

  if (!gameConfig) {
    return <ErrorFallback gameId={gameId} />;
  }

  // Lazy load the game component
  const GameComponent = lazy(gameConfig.component);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <GameComponent {...props} />
    </Suspense>
  );
};

export default DynamicGameLoader;
