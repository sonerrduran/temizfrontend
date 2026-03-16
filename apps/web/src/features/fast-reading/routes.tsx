/**
 * Fast Reading Routes
 * Hızlı okuma route tanımları
 */

import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const FastReadingDashboard = lazy(() => import('./FastReadingDashboard'));
const FastReadingMenu = lazy(() => import('./FastReadingMenu'));
const EyeFlowMenu = lazy(() => import('./EyeFlowMenu'));
const MeasurementMenu = lazy(() => import('./MeasurementMenu'));
const BrainGamesMenu = lazy(() => import('./BrainGamesMenu'));
const FocusTrainingMenu = lazy(() => import('./FocusTrainingMenu'));
const TechniquesModule = lazy(() => import('./TechniquesModule'));
const BionicReadingModule = lazy(() => import('./BionicReadingModule'));

// Eye exercises
const EyeExercise = lazy(() => import('./EyeExercise'));
const AdvancedEyeExercises = lazy(() => import('./AdvancedEyeExercises'));
const SaccadeExercise = lazy(() => import('./SaccadeExercise'));
const PeripheralVisionExercise = lazy(() => import('./PeripheralVisionExercise'));
const LineTrackingExercise = lazy(() => import('./LineTrackingExercise'));
const ExpandingShapes = lazy(() => import('./ExpandingShapes'));

// Reading exercises
const RhythmicReading = lazy(() => import('./RhythmicReading'));
const RhythmicReadingExercises = lazy(() => import('./RhythmicReadingExercises'));
const WordFlowExercise = lazy(() => import('./WordFlowExercise'));
const WordGroupingExercise = lazy(() => import('./WordGroupingExercise'));
const SpeedReadingTest = lazy(() => import('./SpeedReadingTest'));
const SpeedComprehension = lazy(() => import('./SpeedComprehension'));

// Games
const CatchWordGame = lazy(() => import('./CatchWordGame'));
const FlashMemoryGame = lazy(() => import('./FlashMemoryGame'));
const VisualSearch = lazy(() => import('./VisualSearch'));
const VisualPerceptionGames = lazy(() => import('./VisualPerceptionGames'));
const Tachistoscope = lazy(() => import('./Tachistoscope'));

// Teacher
const FastReadingTeacher = lazy(() => import('./FastReadingTeacher'));

export function FastReadingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FastReadingDashboard />} />
      <Route path="/menu" element={<FastReadingMenu />} />
      <Route path="/eye-flow" element={<EyeFlowMenu />} />
      <Route path="/measurement" element={<MeasurementMenu />} />
      <Route path="/brain-games" element={<BrainGamesMenu />} />
      <Route path="/focus-training" element={<FocusTrainingMenu />} />
      <Route path="/techniques" element={<TechniquesModule />} />
      <Route path="/bionic-reading" element={<BionicReadingModule />} />
      
      {/* Eye exercises */}
      <Route path="/eye-exercise" element={<EyeExercise />} />
      <Route path="/advanced-eye" element={<AdvancedEyeExercises />} />
      <Route path="/saccade" element={<SaccadeExercise />} />
      <Route path="/peripheral-vision" element={<PeripheralVisionExercise />} />
      <Route path="/line-tracking" element={<LineTrackingExercise />} />
      <Route path="/expanding-shapes" element={<ExpandingShapes />} />
      
      {/* Reading exercises */}
      <Route path="/rhythmic-reading" element={<RhythmicReading />} />
      <Route path="/rhythmic-exercises" element={<RhythmicReadingExercises />} />
      <Route path="/word-flow" element={<WordFlowExercise />} />
      <Route path="/word-grouping" element={<WordGroupingExercise />} />
      <Route path="/speed-test" element={<SpeedReadingTest />} />
      <Route path="/speed-comprehension" element={<SpeedComprehension />} />
      
      {/* Games */}
      <Route path="/catch-word" element={<CatchWordGame />} />
      <Route path="/flash-memory" element={<FlashMemoryGame />} />
      <Route path="/visual-search" element={<VisualSearch />} />
      <Route path="/visual-perception" element={<VisualPerceptionGames />} />
      <Route path="/tachistoscope" element={<Tachistoscope />} />
      
      {/* Teacher */}
      <Route path="/teacher" element={<FastReadingTeacher />} />
    </Routes>
  );
}
