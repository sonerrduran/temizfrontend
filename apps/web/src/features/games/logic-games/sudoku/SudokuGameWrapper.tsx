import { useParams, useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const gameComponents: Record<string, any> = {
  'classic': lazy(() => import('./SudokuGame')),
  'killer': lazy(() => import('./KillerSudokuGame')),
  'samurai': lazy(() => import('./SamuraiSudokuGame')),
  'diagonal': lazy(() => import('./DiagonalSudokuGame')),
  'irregular': lazy(() => import('./IrregularSudokuGame')),
  'hyper': lazy(() => import('./HyperSudokuGame')),
  'jigsaw': lazy(() => import('./JigsawSudokuGame')),
  'mini': lazy(() => import('./MiniSudokuGame')),
};

export default function SudokuGameWrapper() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  if (!gameId || !gameComponents[gameId]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Oyun Bulunamadı</h1>
          <button
            onClick={() => navigate('/games/logic/sudoku')}
            className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all"
          >
            ⬅ Geri Dön
          </button>
        </div>
      </div>
    );
  }

  const GameComponent = gameComponents[gameId];

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">Yükleniyor...</div>
        </div>
      }
    >
      <GameComponent
        grade={5}
        difficulty="MEDIUM"
        onComplete={(stars: number) => {
          console.log('Game completed with', stars, 'stars');
          navigate('/games/logic/sudoku');
        }}
        onExit={() => navigate('/games/logic/sudoku')}
      />
    </Suspense>
  );
}
