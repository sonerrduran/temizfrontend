import React, { useState } from 'react';
import { GameEngineProps, GameResults } from '../../types/engine.types';

interface DiagramLabel {
  id: string;
  text: string;
  x: number;
  y: number;
}

interface DiagramDataset {
  image: string;
  labels: DiagramLabel[];
  options: string[];
  config: {
    showImage?: boolean;
  };
}

export default function DiagramEngine({ dataset, onComplete, onExit }: GameEngineProps) {
  const diagramData = dataset.data as DiagramDataset;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [startTime] = useState(Date.now());

  const handleLabelSelect = (labelId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [labelId]: option }));
  };

  const handleCheck = () => {
    const correctCount = diagramData.labels.filter(
      (label) => answers[label.id] === label.text
    ).length;

    const duration = Math.floor((Date.now() - startTime) / 1000);
    const results: GameResults = {
      score: Math.round((correctCount / diagramData.labels.length) * 100),
      correctAnswers: correctCount,
      totalQuestions: diagramData.labels.length,
      duration,
      attempts: 1,
      hints: 0,
    };

    onComplete(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">{dataset.metadata.name}</h1>
            <p className="text-white/60">Diyagramı etiketle</p>
          </div>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all"
          >
            Çıkış
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Diagram */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <div className="relative">
                {/* Diagram Image */}
                <div className="text-9xl text-center mb-8">{diagramData.image}</div>

                {/* Label Points */}
                {diagramData.labels.map((label) => (
                  <div
                    key={label.id}
                    className="absolute"
                    style={{
                      left: `${label.x}%`,
                      top: `${label.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white animate-pulse" />
                      {answers[label.id] && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap">
                          {answers[label.id]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-4">Etiketler</h3>
              <div className="space-y-2">
                {diagramData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const unassignedLabel = diagramData.labels.find((l) => !answers[l.id]);
                      if (unassignedLabel) {
                        handleLabelSelect(unassignedLabel.id, option);
                      }
                    }}
                    className="w-full p-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl text-white font-bold transition-all"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCheck}
              disabled={Object.keys(answers).length !== diagramData.labels.length}
              className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-xl text-white font-bold transition-all"
            >
              Kontrol Et
            </button>

            <div className="text-center text-white/60 text-sm">
              {Object.keys(answers).length} / {diagramData.labels.length} etiket
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
