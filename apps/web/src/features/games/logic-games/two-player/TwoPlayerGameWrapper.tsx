import { useParams, useNavigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const gameComponents: Record<string, any> = {
  'tic-tac-toe': lazy(() => import('./TicTacToeGame')),
  'connect-four': lazy(() => import('./ConnectFourGame')),
  'chess': lazy(() => import('./ChessGame')),
  'checkers': lazy(() => import('./CheckersGame')),
  'reversi': lazy(() => import('./ReversiGame')),
  'mancala': lazy(() => import('./MancalaGame')),
  'sos': lazy(() => import('./SOSGame')),
  'dots-boxes': lazy(() => import('./DotsAndBoxesGame')),
  'go': lazy(() => import('./GoGame')),
};

export default function TwoPlayerGameWrapper() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  if (!gameId || !gameComponents[gameId]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Oyun Bulunamadı</h1>
          <button
            onClick={() => navigate('/games/logic/two-player')}
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
        <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">Yükleniyor...</div>
        </div>
      }
    >
      <GameComponent
        onComplete={(stars: number) => {
          console.log('Game completed with', stars, 'stars');
          navigate('/games/logic/two-player');
        }}
        onExit={() => navigate('/games/logic/two-player')}
      />
    </Suspense>
  );
}
