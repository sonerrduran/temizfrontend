import React, { useState } from 'react';
import { GameEngineProps, GameResults } from '../../types/engine.types';
import { DragDropDataset } from '../../types/dataset.types';

export default function DragDropEngine({ dataset, onComplete, onExit }: GameEngineProps) {
  const dragDropData = dataset.data as DragDropDataset;
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedItems, setDroppedItems] = useState<Record<string, string[]>>({});
  const [startTime] = useState(Date.now());

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (!draggedItem) return;

    const item = dragDropData.items.find((i) => i.id === draggedItem);
    if (!item) return;

    // Check if correct target
    if (item.targetId === targetId) {
      setDroppedItems((prev) => ({
        ...prev,
        [targetId]: [...(prev[targetId] || []), draggedItem],
      }));
    }

    setDraggedItem(null);

    // Check if complete
    const totalDropped = Object.values(droppedItems).flat().length + 1;
    if (totalDropped === dragDropData.items.length) {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      const correctCount =
        dragDropData.items.filter((item) => droppedItems[item.targetId]?.includes(item.id)).length +
        1;

      const results: GameResults = {
        score: Math.round((correctCount / dragDropData.items.length) * 100),
        correctAnswers: correctCount,
        totalQuestions: dragDropData.items.length,
        duration,
        attempts: 1,
        hints: 0,
      };
      setTimeout(() => onComplete(results), 500);
    }
  };

  const availableItems = dragDropData.items.filter(
    (item) => !Object.values(droppedItems).flat().includes(item.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">{dataset.metadata.name}</h1>
            <p className="text-white/60">Öğeleri doğru yerlere sürükle</p>
          </div>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all"
          >
            Çıkış
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Items */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">Öğeler</h2>
            <div className="space-y-3">
              {availableItems.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item.id)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 cursor-move hover:scale-105 transition-all"
                >
                  <div className="text-white font-bold">{item.content}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Targets */}
          <div className="space-y-4">
            {dragDropData.targets.map((target) => (
              <div
                key={target.id}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(target.id)}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border-2 border-dashed border-white/30 min-h-[150px]"
              >
                <h3 className="text-lg font-bold text-white mb-3">{target.label}</h3>
                <div className="space-y-2">
                  {droppedItems[target.id]?.map((itemId) => {
                    const item = dragDropData.items.find((i) => i.id === itemId);
                    return (
                      <div
                        key={itemId}
                        className="bg-green-500 rounded-xl p-3 text-white font-bold"
                      >
                        {item?.content}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
