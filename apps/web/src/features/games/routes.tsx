/**
 * Game Routes
 * Oyun kategorileri için route tanımları
 */

import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load game menus
const MathGamesMenu = lazy(() => import('./math-games/MathGamesMenu'));
const MathGradeMenu = lazy(() => import('./math-games/MathGradeMenu'));
const MathCategoryMenu = lazy(() => import('./math-games/MathCategoryMenu'));
const MathGameWrapper = lazy(() => import('./math-games/MathGameWrapper'));

// Preschool Math Games
const PreschoolMenu = lazy(() => import('./math-games/preschool/PreschoolMenu'));
const DirectionGame = lazy(() => import('./math-games/preschool/DirectionGame'));
const MazeGame = lazy(() => import('./math-games/preschool/MazeGame'));
const NumberComparisonGame = lazy(() => import('./math-games/preschool/NumberComparisonGame'));
const NumberRecognitionGame = lazy(() => import('./math-games/preschool/NumberRecognitionGame'));
const PatternPuzzleGame = lazy(() => import('./math-games/preschool/PatternPuzzleGame'));
const SequencePatternGame = lazy(() => import('./math-games/preschool/SequencePatternGame'));
const ShapeMatchingGame = lazy(() => import('./math-games/preschool/ShapeMatchingGame'));

const TurkishPlayground = lazy(() => import('./language-games/TurkishPlayground'));
const TurkishPlaygroundGrade = lazy(() => import('./language-games/playground/TurkishPlaygroundGrade'));
const TurkishPlaygroundCategory = lazy(() => import('./language-games/playground/TurkishPlaygroundCategory'));

const LogicGamesMenu = lazy(() => import('./logic-games/LogicGamesMenu'));
const PuzzleMenu = lazy(() => import('./logic-games/puzzle/PuzzleMenu'));
const PuzzleGameWrapper = lazy(() => import('./logic-games/puzzle/PuzzleGameWrapper'));
const SudokuMenu = lazy(() => import('./logic-games/sudoku/SudokuMenu'));
const SudokuGameWrapper = lazy(() => import('./logic-games/sudoku/SudokuGameWrapper'));
const TwoPlayerMenu = lazy(() => import('./logic-games/TwoPlayerMenu'));
const TwoPlayerGameWrapper = lazy(() => import('./logic-games/two-player/TwoPlayerGameWrapper'));
const LanguageGamesMenu = lazy(() => import('./language-games/LanguageGamesMenu'));

// Turkish Grade 2 Games
const FluencyGame = lazy(() => import('./language-games/turkish/grade2/reading/FluencyGame'));
const ComprehensionGame = lazy(() => import('./language-games/turkish/grade2/reading/ComprehensionGame'));
const SentenceGame = lazy(() => import('./language-games/turkish/grade2/writing/SentenceGame'));
const NounsGame = lazy(() => import('./language-games/turkish/grade2/grammar/NounsGame'));
const AntonymsGame = lazy(() => import('./language-games/turkish/grade2/vocabulary/AntonymsGame'));

export function GameRoutes() {
  return (
    <Routes>
      <Route path="/math" element={<MathGamesMenu />} />
      <Route path="/math/playground" element={<MathGradeMenu />} />
      <Route path="/math/playground/:grade" element={<MathCategoryMenu />} />
      <Route path="/math/playground/:grade/:category/:gameId" element={<MathGameWrapper />} />
      
      {/* Preschool Math Routes */}
      <Route path="/math/preschool" element={<PreschoolMenu />} />
      <Route path="/math/preschool/direction" element={<DirectionGame onExit={() => window.history.back()} />} />
      <Route path="/math/preschool/maze" element={<MazeGame onExit={() => window.history.back()} />} />
      <Route path="/math/preschool/number-comparison" element={<NumberComparisonGame onExit={() => window.history.back()} />} />
      <Route path="/math/preschool/number-recognition" element={<NumberRecognitionGame onExit={() => window.history.back()} />} />
      <Route path="/math/preschool/pattern-puzzle" element={<PatternPuzzleGame onExit={() => window.history.back()} />} />
      <Route path="/math/preschool/sequence-pattern" element={<SequencePatternGame onExit={() => window.history.back()} />} />
      <Route path="/math/preschool/shape-matching" element={<ShapeMatchingGame onExit={() => window.history.back()} />} />
      
      <Route path="/math/*" element={<MathGamesMenu />} />

      <Route path="/turkish/playground" element={<TurkishPlayground />} />
      <Route path="/turkish/playground/:grade" element={<TurkishPlaygroundGrade />} />
      <Route path="/turkish/playground/:grade/:category" element={<TurkishPlaygroundCategory />} />

      <Route path="/logic" element={<LogicGamesMenu />} />
      <Route path="/logic/puzzle" element={<PuzzleMenu />} />
      <Route path="/logic/puzzle/:gameId" element={<PuzzleGameWrapper />} />
      <Route path="/logic/sudoku" element={<SudokuMenu />} />
      <Route path="/logic/sudoku/:gameId" element={<SudokuGameWrapper />} />
      <Route path="/logic/two-player" element={<TwoPlayerMenu />} />
      <Route path="/logic/two-player/:gameId" element={<TwoPlayerGameWrapper />} />

      <Route path="/language" element={<LanguageGamesMenu />} />
      <Route path="/language/*" element={<LanguageGamesMenu />} />

      {/* Turkish Grade 2 Games */}
      <Route path="/turkish/grade2/reading/fluency" element={<FluencyGame />} />
      <Route path="/turkish/grade2/reading/comprehension" element={<ComprehensionGame />} />
      <Route path="/turkish/grade2/writing/sentences" element={<SentenceGame />} />
      <Route path="/turkish/grade2/grammar/nouns" element={<NounsGame />} />
      <Route path="/turkish/grade2/vocabulary/antonyms" element={<AntonymsGame />} />
    </Routes>
  );
}
