import React, { useState, useEffect } from 'react';

interface LoopPuzzleGameProps {
  onBack: () => void;
}

const LoopPuzzleGame: React.FC<LoopPuzzleGameProps> = ({ onBack }) => {
  const [edges, setEdges] = useState<Map<string, boolean>>(new Map());
  const [clues, setClues] = useState<Map<string, number>>(new Map());
  const [time, setTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const size = 6;

  useEffect(() => {
    generatePuzzle();
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const generatePuzzle = () => {
    const newClues = new Map<string, number>();

    // İpuçları - her nokta etrafında kaç kenar olmalı
    newClues.set('1-1', 2);
    newClues.set('1-3', 3);
    newClues.set('2-2', 2);
    newClues.set('3-1', 1);
    newClues.set('3-4', 2);
    newClues.set('4-2', 3);
    newClues.set('4-4', 2);

    setClues(newClues);
  };

  const getEdgeKey = (r1: number, c1: number, r2: number, c2: number) => {
    const [minR, minC, maxR, maxC] =
      r1 < r2 || (r1 === r2 && c1 < c2) ? [r1, c1, r2, c2] : [r2, c2, r1, c1];
    return `${minR}-${minC}-${maxR}-${maxC}`;
  };

  const handleEdgeClick = (r1: number, c1: number, r2: number, c2: number) => {
    const key = getEdgeKey(r1, c1, r2, c2);
    const newEdges = new Map(edges);

    if (newEdges.has(key)) {
      newEdges.delete(key);
    } else {
      newEdges.set(key, true);
    }

    setEdges(newEdges);
    checkCompletion(newEdges);
  };

  const checkCompletion = (currentEdges: Map<string, boolean>) => {
    // Basit kontrol - tüm ipuçları sağlanıyor mu
    let allCorrect = true;

    clues.forEach((expectedCount, key) => {
      const [r, c] = key.split('-').map(Number);
      const actualCount = getEdgeCountAroundPoint(r, c, currentEdges);
      if (actualCount !== expectedCount) allCorrect = false;
    });

    if (allCorrect && currentEdges.size > 0) {
      setIsComplete(true);
    }
  };

  const getEdgeCountAroundPoint = (r: number, c: number, currentEdges: Map<string, boolean>) => {
    let count = 0;
    const neighbors = [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ];

    for (const [nr, nc] of neighbors) {
      if (nr >= 0 && nr <= size && nc >= 0 && nc <= size) {
        const key = getEdgeKey(r, c, nr, nc);
        if (currentEdges.has(key)) count++;
      }
    }

    return count;
  };

  const hasEdge = (r1: number, c1: number, r2: number, c2: number) => {
    const key = getEdgeKey(r1, c1, r2, c2);
    return edges.has(key);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            ⬅ GERİ DÖN
          </button>
          <div className="text-white text-center">
            <h2 className="text-3xl font-black">Loop Puzzle</h2>
            <p className="text-sm opacity-80">Döngü oluştur</p>
          </div>
          <div className="text-white text-right">
            <div className="text-2xl font-bold">{formatTime(time)}</div>
          </div>
        </div>

        {isComplete && (
          <div className="bg-green-500 text-white p-4 rounded-xl mb-4 text-center font-bold animate-bounce">
            🔄 Mükemmel! {formatTime(time)} sürede tamamladın!
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-4">
          <div className="relative" style={{ width: '400px', height: '400px', margin: '0 auto' }}>
            {/* Noktalar */}
            {Array.from({ length: size + 1 }).map((_, r) =>
              Array.from({ length: size + 1 }).map((_, c) => {
                const clueKey = `${r}-${c}`;
                const hasClue = clues.has(clueKey);

                return (
                  <div
                    key={`point-${r}-${c}`}
                    className={`absolute w-4 h-4 rounded-full ${hasClue ? 'bg-yellow-400' : 'bg-white'} flex items-center justify-center text-xs font-bold`}
                    style={{
                      left: `${c * 60}px`,
                      top: `${r * 60}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {hasClue && <span className="text-black">{clues.get(clueKey)}</span>}
                  </div>
                );
              })
            )}

            {/* Yatay kenarlar */}
            {Array.from({ length: size + 1 }).map((_, r) =>
              Array.from({ length: size }).map((_, c) => (
                <button
                  key={`h-${r}-${c}`}
                  onClick={() => handleEdgeClick(r, c, r, c + 1)}
                  className={`absolute ${hasEdge(r, c, r, c + 1) ? 'bg-blue-500' : 'bg-white/20 hover:bg-white/40'} transition-all`}
                  style={{
                    left: `${c * 60 + 8}px`,
                    top: `${r * 60 - 2}px`,
                    width: '44px',
                    height: '4px',
                  }}
                />
              ))
            )}

            {/* Dikey kenarlar */}
            {Array.from({ length: size }).map((_, r) =>
              Array.from({ length: size + 1 }).map((_, c) => (
                <button
                  key={`v-${r}-${c}`}
                  onClick={() => handleEdgeClick(r, c, r + 1, c)}
                  className={`absolute ${hasEdge(r, c, r + 1, c) ? 'bg-blue-500' : 'bg-white/20 hover:bg-white/40'} transition-all`}
                  style={{
                    left: `${c * 60 - 2}px`,
                    top: `${r * 60 + 8}px`,
                    width: '4px',
                    height: '44px',
                  }}
                />
              ))
            )}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-white">
          <h3 className="font-bold mb-2">🔄 Nasıl Oynanır?</h3>
          <ul className="text-sm space-y-1 opacity-90">
            <li>• Çizgilere tıklayarak tek bir kapalı döngü oluştur</li>
            <li>
              • Sarı noktalardaki sayılar, o nokta etrafında kaç çizgi olması gerektiğini gösterir
            </li>
            <li>• Döngü dallanmamalı ve kesişmemeli</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoopPuzzleGame;
