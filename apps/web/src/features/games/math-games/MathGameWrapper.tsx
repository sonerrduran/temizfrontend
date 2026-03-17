import { useNavigate, useParams } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load playground games
const SpeedMathGame = lazy(() => import('./playground/games/SpeedMathGame'));
const NumberCatcherGame = lazy(() => import('./playground/games/NumberCatcherGame'));
const ShapesGame = lazy(() => import('./playground/games/ShapesGame'));
const MemoryMatchGame = lazy(() => import('./playground/games/MemoryMatchGame'));
const TestGame = lazy(() => import('./playground/games/TestGame'));
const ClassicQuestionGame = lazy(() => import('./playground/games/ClassicQuestionGame'));
const TrueFalseGame = lazy(() => import('./playground/games/TrueFalseGame'));
const FillBlankGame = lazy(() => import('./playground/games/FillBlankGame'));
const CosmicBalanceGame = lazy(() => import('./playground/games/CosmicBalanceGame'));

const gameComponents: Record<string, any> = {
  'speed-math': SpeedMathGame,
  'number-catcher': NumberCatcherGame,
  'shapes-game': ShapesGame,
  'memory-match': MemoryMatchGame,
  'test-game': TestGame,
  'classic-question': ClassicQuestionGame,
  'true-false': TrueFalseGame,
  'fill-blank': FillBlankGame,
  'cosmic-balance': CosmicBalanceGame,
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-blue-600 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
        <p className="text-white text-lg">Oyun yükleniyor...</p>
      </div>
    </div>
  );
}

export default function MathPlaygroundGameWrapper() {
  const navigate = useNavigate();
  const { grade, category, gameId } = useParams<{ grade: string; category: string; gameId: string }>();
  
  const gradeNumber = parseInt(grade?.replace('grade', '') || '1');
  const GameComponent = gameComponents[gameId || ''];

  const handleExit = () => {
    navigate(`/games/math/playground/${grade}/${category}`);
  };

  const handleComplete = (score: number) => {
    // TODO: Save score to backend
    setTimeout(() => {
      navigate(`/games/math/playground/${grade}/${category}`);
    }, 2000);
  };

  if (!GameComponent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-700 to-blue-600 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Oyun Bulunamadı</h1>
          <button
            onClick={handleExit}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-all"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <GameComponent
        grade={gradeNumber}
        topic={category}
        onComplete={handleComplete}
        onExit={handleExit}
      />
    </Suspense>
  );
}
