import React, { useEffect, useState, Suspense } from 'react';
import { loadDataset } from '../utils/datasetLoader';
import { getEngine } from '../engines/EngineRegistry';
import { Dataset, GameResults } from '../types/engine.types';

interface GameContainerProps {
  gameId: string;
  datasetPath: string;
  onComplete: (results: GameResults) => void;
  onExit: () => void;
}

export default function GameContainer({
  gameId,
  datasetPath,
  onComplete,
  onExit,
}: GameContainerProps) {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGameDataset();
  }, [datasetPath]);

  const loadGameDataset = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loadDataset(datasetPath);
      setDataset(data);
    } catch (err) {
      setError('Oyun yüklenemedi');
      console.error('Dataset load error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🎮</div>
          <p className="text-white text-xl">Oyun yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !dataset) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-white text-xl mb-4">{error || 'Oyun bulunamadı'}</p>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-bold"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  // Get the appropriate engine component
  const EngineComponent = getEngine(dataset.engine);

  return (
    <Suspense fallback={<div className="text-white">Yükleniyor...</div>}>
      <EngineComponent dataset={dataset} onComplete={onComplete} onExit={onExit} />
    </Suspense>
  );
}
