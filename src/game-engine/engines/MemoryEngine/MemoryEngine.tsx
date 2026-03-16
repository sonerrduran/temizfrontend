import React, { useState, useEffect } from 'react';
import { GameEngineProps, GameResults } from '../../types/engine.types';
import { MemoryDataset, MemoryPair } from '../../types/dataset.types';

interface Card {
  id: string;
  pairId: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryEngine({ dataset, onComplete, onExit }: GameEngineProps) {
  const memoryData = dataset.data as MemoryDataset;
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    // Create cards from pairs
    const cardList: Card[] = [];
    memoryData.pairs.forEach((pair) => {
      cardList.push({
        id: `${pair.id}-1`,
        pairId: pair.id,
        image: pair.image1,
        isFlipped: false,
        isMatched: false,
      });
      cardList.push({
        id: `${pair.id}-2`,
        pairId: pair.id,
        image: pair.image2,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffled = cardList.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  useEffect(() => {
    // Check if all pairs matched
    if (matchedPairs.length === memoryData.pairs.length && matchedPairs.length > 0) {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      const results: GameResults = {
        score: Math.max(100 - moves * 2, 0),
        correctAnswers: matchedPairs.length,
        totalQuestions: memoryData.pairs.length,
        duration,
        attempts: moves,
        hints: 0,
      };
      setTimeout(() => onComplete(results), 1000);
    }
  }, [matchedPairs]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Match found
        setMatchedPairs((prev) => [...prev, firstCard.pairId]);
        setCards((prev) =>
          prev.map((c) => (c.pairId === firstCard.pairId ? { ...c, isMatched: true } : c))
        );
      }

      // Flip back after delay
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            flippedCards.includes(c.id) && !c.isMatched ? { ...c, isFlipped: false } : c
          )
        );
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards]);

  const handleCardClick = (cardId: string) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)));
    setFlippedCards((prev) => [...prev, cardId]);

    if (flippedCards.length === 1) {
      setMoves((prev) => prev + 1);
    }
  };

  const gridSize =
    memoryData.config.gridSize === '4x4' ? 4 : memoryData.config.gridSize === '4x6' ? 6 : 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">{dataset.metadata.name}</h1>
            <p className="text-white/60">Eşleşen kartları bul!</p>
          </div>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all"
          >
            Çıkış
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-white/60 text-sm">Hamle</div>
            <div className="text-2xl font-bold text-white">{moves}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-white/60 text-sm">Eşleşme</div>
            <div className="text-2xl font-bold text-green-400">
              {matchedPairs.length} / {memoryData.pairs.length}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched}
              className={`aspect-square rounded-2xl transition-all duration-300 transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-white scale-100'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-105'
              } ${card.isMatched ? 'opacity-50' : ''}`}
            >
              {(card.isFlipped || card.isMatched) && (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  {card.image}
                </div>
              )}
              {!card.isFlipped && !card.isMatched && (
                <div className="w-full h-full flex items-center justify-center text-4xl text-white">
                  ❓
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
