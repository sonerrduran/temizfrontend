/**
 * Game Routes
 * Oyun kategorileri için route tanımları
 */

import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load game menus
const MathGamesMenu = lazy(() => import('./math-games/MathGamesMenu'));
const MathPlayground = lazy(() => import('./math-games/MathPlayground'));
const MathPlaygroundGrade = lazy(() => import('./math-games/playground/MathPlaygroundGrade'));
const MathPlaygroundCategory = lazy(() => import('./math-games/playground/MathPlaygroundCategory'));

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
      <Route path="/math/playground" element={<MathPlayground />} />
      <Route path="/math/playground/:grade" element={<MathPlaygroundGrade />} />
      <Route path="/math/playground/:grade/:category" element={<MathPlaygroundCategory />} />
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
