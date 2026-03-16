import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty } from '../../../types';
import { LogicGameWrapper, RulesOverlay, GameOverOverlay, useLogicGame } from '../shared';

interface HashiGameProps {
  grade: number;
  difficulty: Difficulty;
  onComplete: (stars: number) => void;
  onExit: () => void;
}

interface Island {
  id: string; // "r-c"
  r: number;
  c: number;
  targetValue: number;
}

interface Bridge {
  id: string; // "id1_id2" smaller lexicographically first
  island1: string;
  island2: string;
  count: number; // 0, 1, or 2
  orientation: 'horizontal' | 'vertical';
  rMin: number;
  rMax: number;
  cMin: number;
  cMax: number;
}

const generateHashiBoard = (size: number, difficulty: Difficulty) => {
  let islands: Island[] = [];
  if (size <= 4) {
    islands = [
      { id: '0-0', r: 0, c: 0, targetValue: 2 },
      { id: '0-3', r: 0, c: 3, targetValue: 3 },
      { id: '3-0', r: 3, c: 0, targetValue: 3 },
      { id: '3-3', r: 3, c: 3, targetValue: 2 },
      { id: '1-1', r: 1, c: 1, targetValue: 4 },
      { id: '1-3', r: 1, c: 3, targetValue: 2 },
      { id: '3-1', r: 3, c: 1, targetValue: 2 },
    ];
  } else {
    islands = [
      { id: '0-0', r: 0, c: 0, targetValue: 3 },
      { id: '0-2', r: 0, c: 2, targetValue: 4 },
      { id: '0-4', r: 0, c: 4, targetValue: 2 },
      { id: '2-0', r: 2, c: 0, targetValue: 2 },
      { id: '2-4', r: 2, c: 4, targetValue: 2 },
      { id: '4-0', r: 4, c: 0, targetValue: 3 },
      { id: '4-2', r: 4, c: 2, targetValue: 4 },
      { id: '4-4', r: 4, c: 4, targetValue: 2 },
      { id: '2-2', r: 2, c: 2, targetValue: 8 },
    ];
  }
  return islands;
};

const HashiGame: React.FC<HashiGameProps> = ({ grade, difficulty, onComplete, onExit }) => {
  const getSizeForDifficulty = () => {
    switch (difficulty) {
      case Difficulty.VERY_EASY:
      case Difficulty.EASY:
        return 4;
      case Difficulty.MEDIUM:
        return 5;
      case Difficulty.HARD:
      case Difficulty.VERY_HARD:
        return 5;
      default:
        return 5;
    }
  };

  const size = getSizeForDifficulty();

  const getMaxMistakes = () => {
    if (difficulty === Difficulty.VERY_HARD) return 1;
    if (difficulty === Difficulty.HARD) return 2;
    return 3;
  };

  // Shared hook for game state management
  const {
    timeLeft,
    mistakes,
    isGameOver,
    gameWon,
    score,
    showRules,
    setShowRules,
    addMistake,
    endGame,
    resetGame,
    formatTime,
  } = useLogicGame({
    difficulty,
    onComplete,
    maxMistakes: getMaxMistakes(),
  });

  const [islands, setIslands] = useState<Island[]>([]);
  const [bridges, setBridges] = useState<Record<string, Bridge>>({});
  const [selectedIslandId, setSelectedIslandId] = useState<string | null>(null);

  const initGame = useCallback(() => {
    const initialIslands = generateHashiBoard(size, difficulty);
    setIslands(initialIslands);
    setBridges({});
    setSelectedIslandId(null);
  }, [size, difficulty]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const getBridgeCountForIsland = (islandId: string, currentBridges: Record<string, Bridge>) => {
    return Object.values(currentBridges).reduce((sum, bridge) => {
      if (bridge.island1 === islandId || bridge.island2 === islandId) {
        return sum + bridge.count;
      }
      return sum;
    }, 0);
  };

  const checkWinCondition = (currentBridges: Record<string, Bridge>) => {
    for (const island of islands) {
      if (getBridgeCountForIsland(island.id, currentBridges) !== island.targetValue) {
        return false;
      }
    }

    if (islands.length === 0) return true;

    const adjList: Record<string, string[]> = {};
    islands.forEach((i) => (adjList[i.id] = []));
    (Object.values(currentBridges) as Bridge[]).forEach((b) => {
      if (b.count > 0) {
        adjList[b.island1].push(b.island2);
        adjList[b.island2].push(b.island1);
      }
    });

    const visited = new Set<string>();
    const queue = [islands[0].id];
    visited.add(islands[0].id);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      for (const neighbor of adjList[curr]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    if (visited.size === islands.length) {
      endGame(true);
    }
  };

  const doBridgesCross = (b1: Bridge, b2: Bridge) => {
    if (b1.count === 0 || b2.count === 0) return false;
    if (b1.orientation === b2.orientation) return false;

    const horiz = b1.orientation === 'horizontal' ? b1 : b2;
    const vert = b1.orientation === 'vertical' ? b1 : b2;

    return (
      horiz.rMin > vert.rMin &&
      horiz.rMin < vert.rMax &&
      vert.cMin > horiz.cMin &&
      vert.cMin < horiz.cMax
    );
  };

  const handleIslandClick = (islandId: string) => {
    if (isGameOver) return;

    if (selectedIslandId === null) {
      setSelectedIslandId(islandId);
    } else if (selectedIslandId === islandId) {
      setSelectedIslandId(null);
    } else {
      const i1 = islands.find((i) => i.id === selectedIslandId)!;
      const i2 = islands.find((i) => i.id === islandId)!;

      if (i1.r !== i2.r && i1.c !== i2.c) {
        setSelectedIslandId(null);
        return;
      }

      const rMin = Math.min(i1.r, i2.r);
      const rMax = Math.max(i1.r, i2.r);
      const cMin = Math.min(i1.c, i2.c);
      const cMax = Math.max(i1.c, i2.c);

      const hasIslandBetween = islands.some((i) => {
        if (i.id === i1.id || i.id === i2.id) return false;
        if (i1.r === i2.r && i.r === i1.r && i.c > cMin && i.c < cMax) return true;
        if (i1.c === i2.c && i.c === i1.c && i.r > rMin && i.r < rMax) return true;
        return false;
      });

      if (hasIslandBetween) {
        setSelectedIslandId(null);
        return;
      }

      const bridgeId = [i1.id, i2.id].sort().join('_');
      const orientation = i1.r === i2.r ? 'horizontal' : 'vertical';

      const tempBridge = {
        id: bridgeId,
        island1: i1.id,
        island2: i2.id,
        count: 1,
        orientation,
        rMin,
        rMax,
        cMin,
        cMax,
      } as Bridge;

      let crossingConflict = false;
      for (const b of Object.values(bridges) as Bridge[]) {
        if (b.id !== bridgeId && doBridgesCross(tempBridge, b)) {
          crossingConflict = true;
          break;
        }
      }

      if (crossingConflict) {
        setSelectedIslandId(null);
        return;
      }

      const newBridges = { ...bridges };
      const currentCount = newBridges[bridgeId]?.count || 0;
      const nextCount = (currentCount + 1) % 3;

      const i1Current = getBridgeCountForIsland(i1.id, bridges) - currentCount;
      const i2Current = getBridgeCountForIsland(i2.id, bridges) - currentCount;

      if (
        nextCount > 0 &&
        (i1Current + nextCount > i1.targetValue || i2Current + nextCount > i2.targetValue)
      ) {
        setSelectedIslandId(null);
        return;
      }

      newBridges[bridgeId] = {
        id: bridgeId,
        island1: i1.id,
        island2: i2.id,
        count: nextCount,
        orientation,
        rMin,
        rMax,
        cMin,
        cMax,
      };

      setBridges(newBridges);
      setSelectedIslandId(null);
      checkWinCondition(newBridges);
    }
  };

  const gameRules = [
    {
      icon: '1️⃣',
      text: 'Adalar (daireler) içindeki sayı, o adaya bağlanması gereken TOPLAM KÖPRÜ sayısını gösterir.',
    },
    {
      icon: '2️⃣',
      text: 'Köprüler sadece yatay veya dikey olabilir, çapraz çizilemez.',
    },
    {
      icon: '3️⃣',
      text: 'Köprüler diğer adaların veya başka köprülerin üzerinden atlayamaz (kesişemez).',
    },
    {
      icon: '4️⃣',
      text: 'İki ada arasında en fazla 2 adet köprü bulunabilir.',
    },
    {
      icon: '5️⃣',
      text: 'Bütün adalar birbirine köprülerle sürekli bir ağ şeklinde bağlanmış olmalıdır (izole ada kalamaz).',
    },
  ];

  return (
    <>
      <LogicGameWrapper
        title="Hashiwokakero"
        emoji="🌉"
        subtitle={`${size}x${size} Izgara`}
        gradientFrom="from-cyan-600/40"
        gradientTo="to-teal-700/40"
        onExit={onExit}
        onShowRules={() => setShowRules(true)}
        infoCard={
          <div className="flex gap-3 text-sm font-bold">
            <div className="text-white/90">
              Hata: {mistakes}/{getMaxMistakes()}
            </div>
            <div className={timeLeft <= 30 ? 'text-red-400 animate-pulse' : 'text-white/90'}>
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>
        }
      >
        <div className="flex flex-col items-center w-full">
          <div className="relative bg-slate-800 rounded-3xl p-4 md:p-8 shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] border border-slate-700 w-full max-w-[400px] aspect-square select-none">
            {(Object.values(bridges) as Bridge[]).map((bridge) => {
              if (bridge.count === 0) return null;

              const cSize = 100 / size;
              const top = (bridge.rMin + 0.5) * cSize;
              const left = (bridge.cMin + 0.5) * cSize;
              const length =
                (bridge.orientation === 'horizontal'
                  ? bridge.cMax - bridge.cMin
                  : bridge.rMax - bridge.rMin) * cSize;

              return (
                <div
                  key={bridge.id}
                  className="absolute z-10 pointer-events-none"
                  style={{
                    top: bridge.orientation === 'vertical' ? `${top}%` : `calc(${top}% - 8px)`,
                    left: bridge.orientation === 'horizontal' ? `${left}%` : `calc(${left}% - 8px)`,
                    width: bridge.orientation === 'horizontal' ? `${length}%` : '16px',
                    height: bridge.orientation === 'vertical' ? `${length}%` : '16px',
                    display: 'flex',
                    flexDirection: bridge.orientation === 'vertical' ? 'row' : 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}
                >
                  <div
                    className={`${bridge.orientation === 'vertical' ? 'w-1.5 h-full' : 'h-1.5 w-full'} bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]`}
                  ></div>
                  {bridge.count === 2 && (
                    <div
                      className={`${bridge.orientation === 'vertical' ? 'w-1.5 h-full' : 'h-1.5 w-full'} bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]`}
                    ></div>
                  )}
                </div>
              );
            })}

            {islands.map((island) => {
              const currentBridges = getBridgeCountForIsland(island.id, bridges);
              const isSatisfied = currentBridges === island.targetValue;
              const isSelected = selectedIslandId === island.id;
              const cSize = 100 / size;

              return (
                <button
                  key={island.id}
                  onClick={() => handleIslandClick(island.id)}
                  className={`
                                        absolute z-20 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-black text-xl md:text-2xl shadow-xl transition-transform
                                        -translate-x-1/2 -translate-y-1/2
                                        ${isSatisfied ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.8)] border-4 border-cyan-300' : 'bg-slate-200 text-slate-800 border-4 border-slate-400'}
                                        ${isSelected ? 'scale-125 ring-4 ring-yellow-400' : 'hover:scale-110 active:scale-95'}
                                    `}
                  style={{
                    top: `${(island.r + 0.5) * cSize}%`,
                    left: `${(island.c + 0.5) * cSize}%`,
                  }}
                >
                  {island.targetValue}
                </button>
              );
            })}
          </div>

          <p className="mt-8 text-white/70 text-sm font-medium text-center max-w-sm">
            Bir adaya (daireye) tıkla, sonra aynı hizada (yatay/dikey) bulunan diğer bir adaya
            tıklayarak aralarında köprü kur. Çift köprü için aynı işlemi tekrarla!
          </p>
        </div>
      </LogicGameWrapper>

      <RulesOverlay
        show={showRules}
        onClose={() => setShowRules(false)}
        title="Hashiwokakero"
        emoji="🌉"
        rules={gameRules}
        gradientFrom="from-cyan-600"
        gradientTo="to-teal-700"
      />

      <GameOverOverlay
        show={isGameOver}
        onRestart={() => resetGame(initGame)}
        onExit={() => onComplete(score)}
        score={score}
        gameWon={gameWon}
        mistakes={mistakes}
        maxMistakes={getMaxMistakes()}
        timeLeft={timeLeft}
        gradientFrom="from-cyan-600"
        gradientTo="to-teal-700"
      />
    </>
  );
};

export default HashiGame;
