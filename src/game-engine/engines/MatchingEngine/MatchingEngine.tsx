import React, { useState } from 'react';
import { GameEngineProps, GameResults } from '../../types/engine.types';
import { MatchingDataset } from '../../types/dataset.types';

export default function MatchingEngine({ dataset, onComplete, onExit }: GameEngineProps) {
  const matchingData = dataset.data as MatchingDataset;
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [startTime] = useState(Date.now());

  const leftItems = matchingData.config.randomize
    ? [...matchingData.pairs].sort(() => Math.random() - 0.5)
    : matchingData.pairs;

  const rightItems = matchingData.config.randomize
    ? [...matchingData.pairs].sort(() => Math.random() - 0.5)
    : matchingData.pairs;

  const handleLeftClick = (pairId: string) => {
    if (matches[pairId]) return;
    setSelectedLeft(pairId);

    if (selectedRight) {
      if (pairId === selectedRight) {
        // Correct match
        setMatches((prev) => ({ ...prev, [pairId]: selectedRight }));
        setSelectedLeft(null);
        setSelectedRight(null);

        // Check if complete
        if (Object.keys(matches).length + 1 === matchingData.pairs.length) {
          const duration = Math.floor((Date.now() - startTime) / 1000);
          const results: GameResults = {
            score: 100,
            correctAnswers: matchingData.pairs.length,
            totalQuestions: matchingData.pairs.length,
            duration,
            attempts: 1,
            hints: 0,
          };
          setTimeout(() => onComplete(results), 500);
        }
      } else {
        // Wrong match
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 1000);
      }
    }
  };

  const handleRightClick = (pairId: string) => {
    if (Object.values(matches).includes(pairId)) return;
    setSelectedRight(pairId);

    if (selectedLeft) {
      if (pairId === selectedLeft) {
        // Correct match
        setMatches((prev) => ({ ...prev, [selectedLeft]: pairId }));
        setSelectedLeft(null);
        setSelectedRight(null);

        // Check if complete
        if (Object.keys(matches).length + 1 === matchingData.pairs.length) {
          const duration = Math.floor((Date.now() - startTime) / 1000);
          const results: GameResults = {
            score: 100,
            correctAnswers: matchingData.pairs.length,
            totalQuestions: matchingData.pairs.length,
            duration,
            attempts: 1,
            hints: 0,
          };
          setTimeout(() => onComplete(results), 500);
        }
      } else {
        // Wrong match
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">{dataset.metadata.name}</h1>
            <p className="text-white/60">Eşleşenleri bul</p>
          </div>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all"
          >
            Çıkış
          </button>
        </div>

        {/* Matching Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            {leftItems.map((pair) => (
              <button
                key={pair.id}
                onClick={() => handleLeftClick(pair.id)}
                disabled={!!matches[pair.id]}
                className={`w-full p-6 rounded-2xl text-left transition-all ${
                  matches[pair.id]
                    ? 'bg-green-500 text-white'
                    : selectedLeft === pair.id
                      ? 'bg-purple-500 text-white scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {pair.leftImage && <div className="text-4xl mb-2">{pair.leftImage}</div>}
                <div className="font-bold text-lg">{pair.left}</div>
              </button>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightItems.map((pair) => (
              <button
                key={pair.id}
                onClick={() => handleRightClick(pair.id)}
                disabled={Object.values(matches).includes(pair.id)}
                className={`w-full p-6 rounded-2xl text-left transition-all ${
                  Object.values(matches).includes(pair.id)
                    ? 'bg-green-500 text-white'
                    : selectedRight === pair.id
                      ? 'bg-pink-500 text-white scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {pair.rightImage && <div className="text-4xl mb-2">{pair.rightImage}</div>}
                <div className="font-bold text-lg">{pair.right}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8 text-center">
          <div className="text-white/60 text-lg">
            Eşleşme: <span className="text-green-400 font-bold">{Object.keys(matches).length}</span>{' '}
            / {matchingData.pairs.length}
          </div>
        </div>
      </div>
    </div>
  );
}
