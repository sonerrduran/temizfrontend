import React, { useState } from 'react';
import { GameEngineProps, GameResults } from '../../types/engine.types';

interface SimulationStep {
  id: string;
  title: string;
  description: string;
  image?: string;
  action?: string;
  feedback?: string;
}

interface SimulationDataset {
  scenario: string;
  steps: SimulationStep[];
  config: {
    allowSkip?: boolean;
    showFeedback?: boolean;
  };
}

export default function SimulationEngine({ dataset, onComplete, onExit }: GameEngineProps) {
  const simData = dataset.data as SimulationDataset;
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime] = useState(Date.now());

  const step = simData.steps[currentStep];
  const isLastStep = currentStep === simData.steps.length - 1;

  const handleAction = () => {
    setShowFeedback(true);
    setCompletedSteps((prev) => [...prev, step.id]);

    setTimeout(() => {
      if (isLastStep) {
        const duration = Math.floor((Date.now() - startTime) / 1000);
        const results: GameResults = {
          score: 100,
          correctAnswers: simData.steps.length,
          totalQuestions: simData.steps.length,
          duration,
          attempts: 1,
          hints: 0,
        };
        onComplete(results);
      } else {
        setCurrentStep((prev) => prev + 1);
        setShowFeedback(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">{dataset.metadata.name}</h1>
            <p className="text-white/60">{simData.scenario}</p>
          </div>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-all"
          >
            Çıkış
          </button>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>
              Adım {currentStep + 1} / {simData.steps.length}
            </span>
            <span>{Math.round(((currentStep + 1) / simData.steps.length) * 100)}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${((currentStep + 1) / simData.steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          {/* Step Image */}
          {step.image && <div className="text-8xl text-center mb-6">{step.image}</div>}

          {/* Step Title */}
          <h2 className="text-2xl font-bold text-white mb-4">{step.title}</h2>

          {/* Step Description */}
          <p className="text-white/80 text-lg mb-6">{step.description}</p>

          {/* Feedback */}
          {showFeedback && step.feedback && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-6">
              <p className="text-green-300">{step.feedback}</p>
            </div>
          )}

          {/* Action Button */}
          {!showFeedback && (
            <button
              onClick={handleAction}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 rounded-xl text-white font-bold text-xl transition-all"
            >
              {step.action || 'Devam Et'}
            </button>
          )}
        </div>

        {/* Steps Overview */}
        <div className="mt-8 flex gap-2 justify-center">
          {simData.steps.map((s, i) => (
            <div
              key={s.id}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                completedSteps.includes(s.id)
                  ? 'bg-green-500 text-white'
                  : i === currentStep
                    ? 'bg-teal-500 text-white'
                    : 'bg-white/10 text-white/40'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
