import { EngineType } from '../types/engine.types';
import QuizEngine from './QuizEngine/QuizEngine';
import MemoryEngine from './MemoryEngine/MemoryEngine';
import DragDropEngine from './DragDropEngine/DragDropEngine';
import SortingEngine from './SortingEngine/SortingEngine';
import MatchingEngine from './MatchingEngine/MatchingEngine';
import PuzzleEngine from './PuzzleEngine/PuzzleEngine';
import SimulationEngine from './SimulationEngine/SimulationEngine';
import SpeedQuizEngine from './SpeedQuizEngine/SpeedQuizEngine';
import DiagramEngine from './DiagramEngine/DiagramEngine';
import LogicPuzzleEngine from './LogicPuzzleEngine/LogicPuzzleEngine';
import ComparisonEngine from './ComparisonEngine/ComparisonEngine';

// Engine registry - maps engine type to component
export const EngineRegistry: Record<string, React.ComponentType<any>> = {
  // New V2 Engines
  QuizEngine: QuizEngine,
  MemoryEngine: MemoryEngine,
  DragDropEngine: DragDropEngine,
  SortingEngine: SortingEngine,
  MatchingEngine: MatchingEngine,
  PuzzleEngine: PuzzleEngine,
  SimulationEngine: SimulationEngine,
  SpeedQuizEngine: SpeedQuizEngine,
  DiagramEngine: DiagramEngine,
  LogicPuzzleEngine: LogicPuzzleEngine,

  // Based on existing games
  ComparisonEngine: ComparisonEngine,
  TimedQuizEngine: SpeedQuizEngine, // Reuse SpeedQuizEngine
  CountingEngine: QuizEngine, // Can use QuizEngine with counting questions
  MatchingPairsEngine: MatchingEngine, // Reuse MatchingEngine
  OrderingEngine: SortingEngine, // Reuse SortingEngine
};

/**
 * Get engine component by type
 */
export function getEngine(type: EngineType) {
  const engine = EngineRegistry[type];
  if (!engine) {
    throw new Error(`Engine not found: ${type}`);
  }
  return engine;
}
