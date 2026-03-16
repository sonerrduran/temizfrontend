import { useParams, useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Dynamically import game components
const gameComponents: Record<string, any> = {
  'akari': lazy(() => import('./AkariGame')),
  'sudoku': lazy(() => import('./BlockedSudokuGame')),
  'nonogram': lazy(() => import('./NonogramGame')),
  'kakuro': lazy(() => import('./KakuroGame')),
  'hashi': lazy(() => import('./HashiGame')),
  'slitherlink': lazy(() => import('./SlitherlinkGame')),
  'mastermind': lazy(() => import('./MastermindGame')),
  'minesweeper': lazy(() => import('./MinesweeperGame')),
  'futoshiki': lazy(() => import('./FutoshikiGame')),
  'kenken': lazy(() => import('./KenKenGame')),
  'nurikabe': lazy(() => import('./NurikabeGame')),
  'shikaku': lazy(() => import('./ShikakuGame')),
  'fillomino': lazy(() => import('./FillominoGame')),
};

export default function PuzzleGameWrapper() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  if (!gameId || !gameComponents[gameId]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Oyun Bulunamadı</h1>
          <button
            onClick={() => navigate('/games/logic/puzzle')}
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
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">Yükleniyor...</div>
        </div>
      }
    >
      <GameComponent
        grade={5}
        difficulty="MEDIUM"
        onComplete={(stars: number) => {
          console.log('Game completed with', stars, 'stars');
          navigate('/games/logic/puzzle');
        }}
        onExit={() => navigate('/games/logic/puzzle')}
      />
    </Suspense>
  );
}
