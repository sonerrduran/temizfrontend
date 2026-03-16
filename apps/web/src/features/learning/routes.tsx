/**
 * Learning Routes
 * Öğrenme teknikleri route tanımları
 */

import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const LearningMenu = lazy(() => import('./LearningMenu'));
const FlashcardSystem = lazy(() => import('./FlashcardSystem'));
const MindMapTool = lazy(() => import('./MindMapTool'));
const MnemonicTraining = lazy(() => import('./MnemonicTraining'));
const StoryBuilder = lazy(() => import('./StoryBuilder'));
const WordMemoryGame = lazy(() => import('./WordMemoryGame'));
const BlockCodingGame = lazy(() => import('./BlockCodingGame'));
const CanvasDrawTool = lazy(() => import('./CanvasDrawTool'));
const DecisionSimulator = lazy(() => import('./DecisionSimulator'));
const ParaphraseExercise = lazy(() => import('./ParaphraseExercise'));
const RhythmGame = lazy(() => import('./RhythmGame'));

export function LearningRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LearningMenu />} />
      <Route path="/flashcards" element={<FlashcardSystem />} />
      <Route path="/mind-map" element={<MindMapTool />} />
      <Route path="/mnemonic" element={<MnemonicTraining />} />
      <Route path="/story-builder" element={<StoryBuilder />} />
      <Route path="/word-memory" element={<WordMemoryGame />} />
      <Route path="/block-coding" element={<BlockCodingGame />} />
      <Route path="/canvas-draw" element={<CanvasDrawTool />} />
      <Route path="/decision-simulator" element={<DecisionSimulator />} />
      <Route path="/paraphrase" element={<ParaphraseExercise />} />
      <Route path="/rhythm" element={<RhythmGame />} />
    </Routes>
  );
}
