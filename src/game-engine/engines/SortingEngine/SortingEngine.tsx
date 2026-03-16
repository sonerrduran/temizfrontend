import React, { useState } from 'react';
import { GameEngineProps, GameResults } from '../../types/engine.types';
import { SortingDataset, SortingItem } from '../../types/dataset.types';

export default function SortingEngine({ dataset, onComplete, onExit }: GameEngineProps) {
  const sortingData = dataset.data as SortingDataset;
  const [items, setItems] = useState<SortingItem[]>(
    [...sortingData.items].sort(() => Math.random() - 0.5)
  );
  const [startTime] = useState(Date.now());

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/html'));

    if (dragIndex === dropIndex) return;

    const newItems = [...items];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    setItems(newItems);
  };

  const handleCheck = () => {
    const isCorrect = items.every((item, index) => {
      const correctItem = sortingData.items.find((i) => i.id === item.id);
      return correctItem && correctItem.order === index;
    });

    const duration = Math.floor((Date.now() - startTime) / 1000);
    const results: GameResults = {
      score: isCorrect ? 100 : 0,
      correctAnswers: isCorrect ? 1 : 0,
      totalQuestions: 1,
      duration,
      attempts: 1,
      hints: 0,
    };

    onComplete(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">{dataset.metadata.name}</h1>
            <p className="text-white/60">Öğeleri doğru sıraya koy</p>
          </div>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all"
          >
            Çıkış
          </button>
        </div>

        {/* Items */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 mb-6">
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 cursor-move hover:scale-105 transition-all flex items-center gap-4"
              >
                <div className="text-3xl">{index + 1}</div>
                <div className="flex-1">
                  {item.image && <div className="text-4xl mb-2">{item.image}</div>}
                  <div className="text-white font-bold text-lg">{item.content}</div>
                </div>
                <div className="text-2xl">⋮⋮</div>
              </div>
            ))}
          </div>
        </div>

        {/* Check Button */}
        <button
          onClick={handleCheck}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl text-white font-bold text-xl transition-all"
        >
          Kontrol Et
        </button>
      </div>
    </div>
  );
}
