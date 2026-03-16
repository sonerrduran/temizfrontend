import React, { Suspense, useEffect, useState } from 'react';
import { GameRegistry } from './GameRegistry';
import { gameLoader } from './GameLoader';
import { GameEngine } from './GameEngine';
import { GamePlugin } from './types/game.types';

interface GameRendererProps {
  gameId: string;
  onComplete: (score: number) => void;
  onExit: () => void;
}

const LoadingSpinner: React.FC<{ message?: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div className="text-6xl animate-bounce mb-4">🎮</div>
    <div className="text-white text-2xl font-semibold">{message || 'Yükleniyor...'}</div>
  </div>
);

const ErrorScreen: React.FC<{ error: string; onExit: () => void }> = ({ error, onExit }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 p-8">
    <div className="text-6xl mb-4">❌</div>
    <h2 className="text-white text-3xl font-bold mb-4">Oyun Yüklenemedi</h2>
    <p className="text-white/80 text-lg mb-8">{error}</p>
    <button
      onClick={onExit}
      className="bg-white text-red-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
    >
      Geri Dön
    </button>
  </div>
);

export const GameRenderer: React.FC<GameRendererProps> = ({ gameId, onComplete, onExit }) => {
  const [plugin, setPlugin] = useState<GamePlugin | null>(null);
  const [engine] = useState(() => new GameEngine());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGame();

    return () => {
      engine.cleanup();
    };
  }, [gameId]);

  const loadGame = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(`🎮 GameRenderer: Loading game ${gameId}`);

      // Try to get from registry first
      let loadedPlugin = GameRegistry.get(gameId);

      // If not in registry, try dynamic loading
      if (!loadedPlugin) {
        console.log(`📦 Game not in registry, loading dynamically...`);
        loadedPlugin = await gameLoader.loadPlugin(gameId);
      }

      if (!loadedPlugin) {
        throw new Error(`Oyun bulunamadı: ${gameId}`);
      }

      setPlugin(loadedPlugin);

      // Initialize engine
      await engine.loadGame(gameId);
      await engine.startGame();

      setLoading(false);

      console.log(`✅ Game loaded successfully: ${gameId}`);
    } catch (err: any) {
      console.error(`❌ Failed to load game: ${gameId}`, err);
      setError(err.message || 'Bilinmeyen hata');
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Oyun yükleniyor..." />;
  }

  if (error) {
    return <ErrorScreen error={error} onExit={onExit} />;
  }

  if (!plugin) {
    return <ErrorScreen error="Oyun bulunamadı" onExit={onExit} />;
  }

  const GameComponent = plugin.component;
  const logic = new plugin.logic();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <GameComponent
        config={plugin.config}
        logic={logic}
        engine={engine}
        onComplete={onComplete}
        onExit={onExit}
      />
    </Suspense>
  );
};
