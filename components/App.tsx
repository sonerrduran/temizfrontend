import React, { useState, useEffect } from 'react';
import Layout from './components/core/Layout';
import GameCard from './components/core/GameCard';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useGameStore } from './stores/gameStore';
import MathGame from './components/math/playground/MathGame';
import ShapesGame from './components/math/playground/ShapesGame';
import Playground from './components/math/playground/Playground';
import SpeedMathGame from './components/math/playground/SpeedMathGame';
import NumberCatcherGame from './components/math/playground/NumberCatcherGame';
import CosmicBalanceGame from './components/math/playground/CosmicBalanceGame';
import TrueFalseGame from './components/math/playground/TrueFalseGame';
import FillBlankGame from './components/math/playground/FillBlankGame';
import ClassicQuestionGame from './components/math/playground/ClassicQuestionGame';
import TestGame from './components/math/playground/TestGame';
import SudokuGame from './components/logic-games/sudoku/SudokuGame';
import KillerSudokuGame from './components/logic-games/sudoku/KillerSudokuGame';
import NonogramGame from './components/logic-games/puzzle/NonogramGame';
import MinesweeperGame from './components/logic-games/puzzle/MinesweeperGame';
import KakuroGame from './components/logic-games/puzzle/KakuroGame';
import FutoshikiGame from './components/logic-games/puzzle/FutoshikiGame';
import HashiGame from './components/logic-games/puzzle/HashiGame';
import SlitherlinkGame from './components/logic-games/puzzle/SlitherlinkGame';
import AkariGame from './components/logic-games/puzzle/AkariGame';
import TentsTreesGame from './components/logic-games/puzzle/TentsTreesGame';
import KenKenGame from './components/logic-games/puzzle/KenKenGame';
import HitoriGame from './components/logic-games/puzzle/HitoriGame';
import ShikakuGame from './components/logic-games/puzzle/ShikakuGame';
import SkyscrapersGame from './components/logic-games/puzzle/SkyscrapersGame';
import BattleshipsGame from './components/logic-games/puzzle/BattleshipsGame';
import FillominoGame from './components/logic-games/puzzle/FillominoGame';
import SlantGame from './components/logic-games/puzzle/SlantGame';
import TapaGame from './components/logic-games/puzzle/TapaGame';
import ZebraPuzzle from './components/logic-games/puzzle/ZebraPuzzle';
import NumbrixGame from './components/logic-games/puzzle/NumbrixGame';
import RippleEffectGame from './components/logic-games/puzzle/RippleEffectGame';
import MasyuGame from './components/logic-games/puzzle/MasyuGame';
import YajilinGame from './components/logic-games/puzzle/YajilinGame';
import HidatoGame from './components/logic-games/puzzle/HidatoGame';
import MagnetsGame from './components/logic-games/puzzle/MagnetsGame';
import LITSGame from './components/logic-games/puzzle/LITSGame';
import SpiralGalaxiesGame from './components/logic-games/puzzle/SpiralGalaxiesGame';
import TrainTracksGame from './components/logic-games/puzzle/TrainTracksGame';
import MastermindGame from './components/logic-games/puzzle/MastermindGame';
import DominosaGame from './components/logic-games/puzzle/DominosaGame';
import CaveGame from './components/logic-games/puzzle/CaveGame';
import CrossSumsGame from './components/logic-games/puzzle/CrossSumsGame';
import TakuzuGame from './components/logic-games/puzzle/TakuzuGame';
import BinoxxoGame from './components/logic-games/puzzle/BinoxxoGame';
import PicrossGame from './components/logic-games/puzzle/PicrossGame';
import GriddlersGame from './components/logic-games/puzzle/GriddlersGame';
import ArukoneGame from './components/logic-games/puzzle/ArukoneGame';
import MathdokuGame from './components/logic-games/puzzle/MathdokuGame';
import LatinSquaresGame from './components/logic-games/puzzle/LatinSquaresGame';
import StrimkoGame from './components/logic-games/puzzle/StrimkoGame';
import TectonicsGame from './components/logic-games/puzzle/TectonicsGame';
import TwoNotTouchGame from './components/logic-games/puzzle/TwoNotTouchGame';
import LoopPuzzleGame from './components/logic-games/puzzle/LoopPuzzleGame';
import DotSudokuGame from './components/logic-games/puzzle/DotSudokuGame';
import PentominoPuzzleGame from './components/logic-games/puzzle/PentominoPuzzleGame';
import DominoSudokuGame from './components/logic-games/puzzle/DominoSudokuGame';
import EinsteinRiddleGame from './components/logic-games/puzzle/EinsteinRiddleGame';
import LogicGridPuzzleGame from './components/logic-games/puzzle/LogicGridPuzzleGame';
import TowerPuzzleGame from './components/logic-games/puzzle/TowerPuzzleGame';
import LightAndShadowGame from './components/logic-games/puzzle/LightAndShadowGame';
import CrossLogicGame from './components/logic-games/puzzle/CrossLogicGame';
import BlockedSudokuGame from './components/logic-games/puzzle/BlockedSudokuGame';
import TripleSudokuGame from './components/logic-games/puzzle/TripleSudokuGame';
import GreaterThanKillerSudokuGame from './components/logic-games/puzzle/GreaterThanKillerSudokuGame';
import MosaicPuzzleGame from './components/logic-games/puzzle/MosaicPuzzleGame';
import QuadSudokuGame from './components/logic-games/puzzle/QuadSudokuGame';
import PolyominoPuzzleGame from './components/logic-games/puzzle/PolyominoPuzzleGame';
import NurimisakiGame from './components/logic-games/puzzle/NurimisakiGame';
import ErrorBoundary from './components/core/ErrorBoundary';
import FastReadingMenu from './components/fast-reading/FastReadingMenu';
import MeasurementMenu from './components/fast-reading/MeasurementMenu';
import EyeFlowMenu from './components/fast-reading/EyeFlowMenu';
import FocusTrainingMenu from './components/fast-reading/FocusTrainingMenu';
import SpeedReadingTest from './components/fast-reading/SpeedReadingTest';
import WordFlowExercise from './components/fast-reading/WordFlowExercise';
import WordGroupingExercise from './components/fast-reading/WordGroupingExercise';
import EyeExercise from './components/fast-reading/EyeExercise';
import FocusExercise from './components/focus/FocusExercise';
import FastReadingDashboard from './components/fast-reading/FastReadingDashboard';
import FastReadingTeacher from './components/fast-reading/FastReadingTeacher';
import PeripheralVisionExercise from './components/fast-reading/PeripheralVisionExercise';
import SaccadeExercise from './components/fast-reading/SaccadeExercise';
import LineTrackingExercise from './components/fast-reading/LineTrackingExercise';
import TechniquesModule from './components/fast-reading/TechniquesModule';
import BrainGamesMenu from './components/fast-reading/BrainGamesMenu';
import CatchWordGame from './components/fast-reading/CatchWordGame';
import FlashMemoryGame from './components/fast-reading/FlashMemoryGame';
import FocusMenu from './components/focus/FocusMenu';
import LearningMenu from './components/learning/LearningMenu';
import LanguageMenu from './components/language/LanguageMenu';
import LanguageWordGame from './components/language/LanguageWordGame';
import PomodoroTimer from './components/focus/PomodoroTimer';
import AttentionTrackingGame from './components/focus/AttentionTrackingGame';
import BionicReadingModule from './components/fast-reading/BionicReadingModule';
import SpeedComprehension from './components/fast-reading/SpeedComprehension';
import FlashcardSystem from './components/learning/FlashcardSystem';
import ParaphraseExercise from './components/learning/ParaphraseExercise';
import WordMemoryGame from './components/learning/WordMemoryGame';
import MnemonicTraining from './components/learning/MnemonicTraining';
import MindMapTool from './components/learning/MindMapTool';
import BlockCodingGame from './components/learning/BlockCodingGame';
import DecisionSimulator from './components/learning/DecisionSimulator';
import CanvasDrawTool from './components/learning/CanvasDrawTool';
import StoryBuilder from './components/learning/StoryBuilder';
import RhythmGame from './components/learning/RhythmGame';
import DailyVocabulary from './components/language/DailyVocabulary';
import LanguageSim from './components/language/LanguageSim';
import LanguageDailyWords from './components/language/LanguageDailyWords';
import LanguageSynonyms from './components/language/LanguageSynonyms';
import LanguageAntonyms from './components/language/LanguageAntonyms';
import LanguageIdioms from './components/language/LanguageIdioms';
import LanguageProverbs from './components/language/LanguageProverbs';
import LanguageMetaphors from './components/language/LanguageMetaphors';
import LanguageAIQuiz from './components/language/LanguageAIQuiz';
import AdvancedEyeExercises from './components/fast-reading/AdvancedEyeExercises';
import ExpandingShapes from './components/fast-reading/ExpandingShapes';
import VisualPerceptionGames from './components/fast-reading/VisualPerceptionGames';
import RhythmicReading from './components/fast-reading/RhythmicReading';
import Tachistoscope from './components/fast-reading/Tachistoscope';
import VisualSearch from './components/fast-reading/VisualSearch';
import AlphabetSudokuGame from './components/logic-games/sudoku/AlphabetSudokuGame';
import AntiKingSudokuGame from './components/logic-games/sudoku/AntiKingSudokuGame';
import AntiKnightSudokuGame from './components/logic-games/sudoku/AntiKnightSudokuGame';
import ArrowSudokuGame from './components/logic-games/sudoku/ArrowSudokuGame';
import BinairoGame from './components/logic-games/puzzle/BinairoGame';
import CalcudokuGame from './components/logic-games/puzzle/CalcudokuGame';
import ChaosSudokuGame from './components/logic-games/sudoku/ChaosSudokuGame';
import ColorSudokuGame from './components/logic-games/sudoku/ColorSudokuGame';
import ConsecutiveSudokuGame from './components/logic-games/sudoku/ConsecutiveSudokuGame';
import DiagonalSudokuGame from './components/logic-games/sudoku/DiagonalSudokuGame';
import EvenOddSudokuGame from './components/logic-games/sudoku/EvenOddSudokuGame';
import GreaterThanSudokuGame from './components/logic-games/sudoku/GreaterThanSudokuGame';
import HexSudokuGame from './components/logic-games/sudoku/HexSudokuGame';
import HyperSudokuGame from './components/logic-games/sudoku/HyperSudokuGame';
import IrregularSudokuGame from './components/logic-games/sudoku/IrregularSudokuGame';
import JigsawSudokuGame from './components/logic-games/sudoku/JigsawSudokuGame';
import KropkiSudokuGame from './components/logic-games/sudoku/KropkiSudokuGame';
import KuromasuGame from './components/logic-games/puzzle/KuromasuGame';
import LittleKillerSudokuGame from './components/logic-games/sudoku/LittleKillerSudokuGame';
import MiniSudokuGame from './components/logic-games/sudoku/MiniSudokuGame';
import NimGame from './components/logic-games/puzzle/NimGame';
import NonConsecutiveSudokuGame from './components/logic-games/sudoku/NonConsecutiveSudokuGame';
import NumberlinkGame from './components/logic-games/puzzle/NumberlinkGame';
import NumberSnakeGame from './components/logic-games/puzzle/NumberSnakeGame';
import NurikabeGame from './components/logic-games/puzzle/NurikabeGame';
import SamuraiKillerSudokuGame from './components/logic-games/sudoku/SamuraiKillerSudokuGame';
import SamuraiSudokuGame from './components/logic-games/sudoku/SamuraiSudokuGame';
import SandwichSudokuGame from './components/logic-games/sudoku/SandwichSudokuGame';
import StarBattleGame from './components/logic-games/puzzle/StarBattleGame';
import SudokuXGame from './components/logic-games/sudoku/SudokuXGame';
import SudokuYGame from './components/logic-games/sudoku/SudokuYGame';
import SuguruGame from './components/logic-games/puzzle/SuguruGame';
import ThermoSudokuGame from './components/logic-games/sudoku/ThermoSudokuGame';
import WindokuGame from './components/logic-games/sudoku/WindokuGame';
import WordokuGame from './components/logic-games/sudoku/WordokuGame';
import XVSudokuGame from './components/logic-games/sudoku/XVSudokuGame';
import ChessGame from './components/logic-games/two-player/ChessGame';
import CheckersGame from './components/logic-games/two-player/CheckersGame';
import TicTacToeGame from './components/logic-games/two-player/TicTacToeGame';
import ConnectFourGame from './components/logic-games/two-player/ConnectFourGame';
import BackgammonGame from './components/logic-games/two-player/BackgammonGame';
import MancalaGame from './components/logic-games/two-player/MancalaGame';
import GoGame from './components/logic-games/two-player/GoGame';
import ReversiGame from './components/logic-games/two-player/ReversiGame';
import DominoGame from './components/logic-games/two-player/DominoGame';
import NineMensMorrisGame from './components/logic-games/two-player/NineMensMorrisGame';
import GomokuGame from './components/logic-games/two-player/GomokuGame';
import PenteGame from './components/logic-games/two-player/PenteGame';
import KalahGame from './components/logic-games/two-player/KalahGame';
import QuoridorGame from './components/logic-games/two-player/QuoridorGame';
import HalmaGame from './components/logic-games/two-player/HalmaGame';
import AbaloneGame from './components/logic-games/two-player/AbaloneGame';
import OnitamaGame from './components/logic-games/two-player/OnitamaGame';
import SantoriniGame from './components/logic-games/two-player/SantoriniGame';
import HiveGame from './components/logic-games/two-player/HiveGame';
import TakGame from './components/logic-games/two-player/TakGame';
import BlokusDuelGame from './components/logic-games/two-player/BlokusDuelGame';
import XiangqiGame from './components/logic-games/two-player/XiangqiGame';
import ShogiGame from './components/logic-games/two-player/ShogiGame';
import FanoronaGame from './components/logic-games/two-player/FanoronaGame';
import JengaGame from './components/logic-games/two-player/JengaGame';
import TrafficMenu from './components/traffic/TrafficMenu';
import TrafficSignsLearn from './components/traffic/TrafficSignsLearn';
import TrafficQuiz from './components/traffic/TrafficQuiz';
import TrafficSimulator from './components/traffic/TrafficSimulator';
import TrafficGames from './components/traffic/TrafficGames';
import TrafficSignMatch from './components/traffic/TrafficSignMatch';
import TrafficCity from './components/traffic/TrafficCity';
import TrafficDashboard from './components/traffic/TrafficDashboard';
import TrafficPedestrianGame from './components/traffic/TrafficPedestrianGame';
import TrafficLaneGame from './components/traffic/TrafficLaneGame';
import FirstAidMenu from './components/first-aid/FirstAidMenu';
import FirstAidLessons from './components/first-aid/FirstAidLessons';
import FirstAidScenarios from './components/first-aid/FirstAidScenarios';
import FirstAidMiniGames from './components/first-aid/FirstAidMiniGames';
import TrafficSafetyMenu from './components/life-skills/traffic/TrafficSafetyMenu';
import HygieneMenu from './components/life-skills/hygiene/HygieneMenu';
import DigitalMenu from './components/life-skills/digital/DigitalMenu';
import DigitalHealthMenu from './components/life-skills/digital-health/DigitalHealthMenu';
import FinancialMenu from './components/life-skills/financial/FinancialMenu';
import NutritionMenu from './components/life-skills/nutrition/NutritionMenu';
import SocialMenu from './components/life-skills/social/SocialMenu';
import EnvironmentMenu from './components/life-skills/environment/EnvironmentMenu';
import LawMenu from './components/life-skills/law/LawMenu';
import MazeGame from './components/math/preschool/MazeGame';
import PatternPuzzleGame from './components/math/preschool/PatternPuzzleGame';
import ShapeMatchingGame from './components/math/preschool/ShapeMatchingGame';
import DirectionGame from './components/math/preschool/DirectionGame';
import SequencePatternGame from './components/math/preschool/SequencePatternGame';
import NumberRecognitionGame from './components/math/preschool/NumberRecognitionGame';
import NumberComparisonGame from './components/math/preschool/NumberComparisonGame';
import FruitAdditionGame from './components/math/grade1/basic/FruitAdditionGame';
import FishAdditionGame from './components/math/grade1/basic/FishAdditionGame';
import SpaceAdditionGame from './components/math/grade1/basic/SpaceAdditionGame';
import AdditionPuzzleGame from './components/math/grade1/basic/AdditionPuzzleGame';
import AdditionRaceGame from './components/math/grade1/basic/AdditionRaceGame';
import CookieMonsterGame from './components/math/grade1/basic/CookieMonsterGame';
import BalloonPopGame from './components/math/grade1/basic/BalloonPopGame';
import ToyLostGame from './components/math/grade1/basic/ToyLostGame';
import SubtractionBasketGame from './components/math/grade1/basic/SubtractionBasketGame';
import AlienSubtractionGame from './components/math/grade1/basic/AlienSubtractionGame';
import MultiplicationNinjaGame from './components/math/grade1/basic/MultiplicationNinjaGame';
import DivisionHuntGame from './components/math/grade1/basic/DivisionHuntGame';
import MathBasketballGame from './components/math/grade1/basic/MathBasketballGame';
import ProblemSolvingGame from './components/math/grade1/basic/ProblemSolvingGame';
import ShapeHuntGame from './components/math/grade1/geometry/ShapeHuntGame';
import ShapePuzzleGame from './components/math/grade1/geometry/ShapePuzzleGame';
import ShapePaintingGame from './components/math/grade1/geometry/ShapePaintingGame';
import ShapeBuilderGame from './components/math/grade1/geometry/ShapeBuilderGame';
import ShadowMatchGame from './components/math/grade1/geometry/ShadowMatchGame';
import GeometryShapeMatchingGame from './components/math/grade1/geometry/ShapeMatchingGame';
import LeftRightRaceGame from './components/math/grade1/geometry/LeftRightRaceGame';
import GeometricShapeRecognitionGame from './components/math/grade1/geometry/GeometricShapeRecognitionGame';
import AreaCalculationGame from './components/math/grade1/geometry/AreaCalculationGame';
import PerimeterCalculationGame from './components/math/grade1/geometry/PerimeterCalculationGame';
import LocationPuzzleGame from './components/math/grade1/geometry/LocationPuzzleGame';
import InsideOutsideGame from './components/math/grade1/geometry/InsideOutsideGame';
import ShapeDetectiveGame from './components/math/grade1/geometry/ShapeDetectiveGame';
import VacationRouteGame from './components/math/grade1/geometry/VacationRouteGame';
import MissingShapeGame from './components/math/grade1/geometry/MissingShapeGame';
import ShapeLabyrinthGame from './components/math/grade1/geometry/ShapeLabyrinthGame';
import BalloonCountGame from './components/math/grade1/numbers/BalloonCountGame';
import NumberTrainGame from './components/math/grade1/numbers/NumberTrainGame';
import NumberBuildingGame from './components/math/grade1/numbers/NumberBuildingGame';
import AppleCollectGame from './components/math/grade1/numbers/AppleCollectGame';
import BoomGame from './components/math/grade1/rhythmic/BoomGame';
import CountdownGame from './components/math/grade1/rhythmic/CountdownGame';
import SkipCountingGame from './components/math/grade1/rhythmic/SkipCountingGame';
import RhythmicRunGame from './components/math/grade1/rhythmic/RhythmicRunGame';
import BigSmallRaceGame from './components/math/grade1/comparison/BigSmallRaceGame';
import NumberLineGame from './components/math/grade1/comparison/NumberLineGame';
import SizeOrderGame from './components/math/grade1/comparison/SizeOrderGame';
import MostFruitGame from './components/math/grade1/comparison/MostFruitGame';
import ToyGraphGame from './components/math/grade1/comparison/ToyGraphGame';
import AnimalCountGame from './components/math/grade1/comparison/AnimalCountGame';
import FavoriteColorSurveyGame from './components/math/grade1/comparison/FavoriteColorSurveyGame';
import GraphCompletionGame from './components/math/grade1/comparison/GraphCompletionGame';
import RaceOrderGame from './components/math/grade1/comparison/RaceOrderGame';
import CorrectOrderGame from './components/math/grade1/comparison/CorrectOrderGame';
import ElectionTallyGame from './components/math/grade1/comparison/ElectionTallyGame';
import IceCreamGraphGame from './components/math/grade1/comparison/IceCreamGraphGame';
import WhoBiggerGame from './components/math/grade1/comparison/WhoBiggerGame';
import LongestLineGame from './components/math/grade1/comparison/LongestLineGame';
import GraphReadingGame from './components/math/grade1/comparison/GraphReadingGame';
import LengthCompareGame from './components/math/grade1/measurement/LengthCompareGame';
import MoneyCountGame from './components/math/grade1/measurement/MoneyCountGame';
import WeightCompareGame from './components/math/grade1/measurement/WeightCompareGame';
import LongestObjectGame from './components/math/grade1/measurement/LongestObjectGame';
import HeaviestObjectGame from './components/math/grade1/measurement/HeaviestObjectGame';
import ClockReadingGame from './components/math/grade1/measurement/ClockReadingGame';
import EstimateJarGame from './components/math/grade1/measurement/EstimateJarGame';
import MemoryMatchGame from './components/math/grade1/visual/MemoryMatchGame';
import MemoryCardsGame from './components/math/grade1/visual/MemoryCardsGame';
import ColorDetectiveGame from './components/math/grade1/visual/ColorDetectiveGame';
import ShapeHunterGame from './components/math/grade1/visual/ShapeHunterGame';
import SizeMatchGame from './components/math/grade1/visual/SizeMatchGame';
import DirectionMatchGame from './components/math/grade1/visual/DirectionMatchGame';
import CarefulEyesGame from './components/math/grade1/visual/CarefulEyesGame';
import FindDifferenceGame from './components/math/grade1/visual/FindDifferenceGame';
import PatternContinueGame from './components/math/grade1/visual/PatternContinueGame';
import PlaygroundMemoryGame from './components/math/playground/MemoryMatchGame';
import NumberHuntTo100Game from './components/math/grade2/numbers/NumberHuntTo100Game';
import PlaceValueGame from './components/math/grade2/numbers/PlaceValueGame';
import NumberLineJumpGame from './components/math/grade2/numbers/NumberLineJumpGame';
import MarketBasketGame from './components/math/grade2/addition/MarketBasketGame';
import TwoDigitAdditionGame from './components/math/grade2/addition/TwoDigitAdditionGame';
import MissingNumberGame from './components/math/grade2/addition/MissingNumberGame';
import ChangeCalculatorGame from './components/math/grade2/subtraction/ChangeCalculatorGame';
import TwoDigitSubtractionGame from './components/math/grade2/subtraction/TwoDigitSubtractionGame';
import CompareSubtractionGame from './components/math/grade2/subtraction/CompareSubtractionGame';
import ShapeCountGame from './components/math/grade2/geometry/ShapeCountGame';
import SymmetryGame from './components/math/grade2/geometry/SymmetryGame';
import SimpleGraphGame from './components/math/grade2/data/SimpleGraphGame';
import MultiplicationBattleGame from './components/math/grade3/multiplication/MultiplicationBattleGame';
import MultiplicationTableGame from './components/math/grade3/multiplication/MultiplicationTableGame';
import PizzaSharingGame from './components/math/grade3/division/PizzaSharingGame';
import DivisionRaceGame from './components/math/grade3/division/DivisionRaceGame';
import ThousandHuntGame from './components/math/grade4/bignumbers/ThousandHuntGame';
import NumberCompareGame from './components/math/grade4/bignumbers/NumberCompareGame';
import FractionCompareGame from './components/math/grade5/fractions/FractionCompareGame';
import FractionAdditionGame from './components/math/grade5/fractions/FractionAdditionGame';
import DecimalMarketGame from './components/math/grade6/decimals/DecimalMarketGame';
import DecimalSortGame from './components/math/grade6/decimals/DecimalSortGame';
import TemperatureGame from './components/math/grade7/integers/TemperatureGame';
import IntegerBattleGame from './components/math/grade7/integers/IntegerBattleGame';
import ExponentRaceGame from './components/math/grade8/exponents/ExponentRaceGame';
import ExponentPuzzleGame from './components/math/grade8/exponents/ExponentPuzzleGame';
import VowelConsonantGame from './components/turkish/grade1/letters/VowelConsonantGame';
import LetterMatchGame from './components/turkish/grade1/letters/LetterMatchGame';
import SyllableCountGame from './components/turkish/grade1/words/SyllableCountGame';
import WordMakingGame from './components/turkish/grade1/reading/WordMakingGame';
import StoryComprehensionGame from './components/turkish/grade1/reading/StoryComprehensionGame';
import StoryBook from './components/stories/StoryBook';
import Whiteboard from './components/teacher-tools/Whiteboard';
import RandomStudentPicker from './components/teacher-tools/RandomStudentPicker';
import ClassTimer from './components/teacher-tools/ClassTimer';
import GroupMaker from './components/teacher-tools/GroupMaker';
import DiceRoller from './components/teacher-tools/DiceRoller';
import Scoreboard from './components/teacher-tools/Scoreboard';
import NoiseMeter from './components/teacher-tools/NoiseMeter';
import StickyNotes from './components/teacher-tools/StickyNotes';
import AttendanceTracker from './components/teacher-tools/AttendanceTracker';
import SeatingChart from './components/teacher-tools/SeatingChart';
import QuickPoll from './components/teacher-tools/QuickPoll';
import WordCloud from './components/teacher-tools/WordCloud';
import BirthdayCalendar from './components/teacher-tools/BirthdayCalendar';
import ClassGoals from './components/teacher-tools/ClassGoals';
import NoticeBulletin from './components/teacher-tools/NoticeBulletin';
import SpinWheel from './components/teacher-tools/SpinWheel';
import TeacherToolsMenu from './components/teacher-tools/TeacherToolsMenu';
import { GameMode, UserStats, Difficulty } from './types';
import logoSrc from './assets/logo.png';

const AVATARS = [
  { icon: '👨‍🚀', name: 'Pilot', minStars: 0 },
  { icon: '🤖', name: 'Bot', minStars: 50 },
  { icon: '👽', name: 'Dost', minStars: 150 },
  { icon: '👩‍🚀', name: 'Mühendis', minStars: 5 },
  { icon: '🦸‍♂️', name: 'Kahraman', minStars: 15 },
  { icon: '🧙‍♂️', name: 'Bilge', minStars: 30 },
  { icon: '👑', name: 'Galaksi Kralı', minStars: 50 },
];

const LEAGUE_NAMES = ['BRONZ LİG', 'GÜMÜŞ LİG', 'ALTIN LİG', 'PLATİN LİG', 'ELMAS LİG'];

const LogicGameWrapper: React.FC<{
  GameComponent: React.ComponentType<any>;
  gradeLevel: number;
  onComplete: (score: number) => void;
  onExit: () => void;
}> = ({ GameComponent, gradeLevel, onComplete, onExit }) => {
  const [level, setLevel] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [key, setKey] = useState(0);

  const handleLevelComplete = (score: number) => {
    const newTotal = totalScore + score;
    if (level < 3) {
      setTotalScore(newTotal);
      setLevel(l => l + 1);
      setKey(k => k + 1);
    } else {
      onComplete(newTotal); // End after 3 rounds
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* 3 Level Progress Bar */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900/95 py-2 px-6 rounded-full text-cyan-400 font-black text-xs md:text-sm border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.6)] z-[100] flex items-center gap-3 animate-in fade-in slide-in-from-top-4 backdrop-blur-md">
        <span className="tracking-widest drop-shadow-md">AŞAMA {level}/3</span>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${i <= level ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)] scale-110' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>
      <div className="w-full h-full pt-12 md:pt-16 animate-in zoom-in-95 duration-500">
        <GameComponent key={key} grade={gradeLevel} onComplete={handleLevelComplete} onExit={onExit} />
      </div>
    </div>
  );
};

const MOCK_PLAYERS = [
  { name: 'Kozmik Efe', stars: 1250, avatar: '🦸‍♂️' },
  { name: 'Yıldız Ada', stars: 980, avatar: '👽' },
  { name: 'Robot Mert', stars: 750, avatar: '🤖' },
  { name: 'Galaktik Elif', stars: 420, avatar: '👩‍🚀' },
  { name: 'Uzaylı Can', stars: 210, avatar: '👽' },
];

const App: React.FC = () => {
  // Zustand Store - Backend Integration
  const { categories, games, loading, error, loadCategories, loadGames, clearError } = useGameStore();

  const handleLogicGameSelect = (gameName: string) => {
    switch (gameName) {
      case "Killer Sudoku": setMode(GameMode.LOGIC_KILLER_SUDOKU); break;
      case "Nonogram": setMode(GameMode.LOGIC_NONOGRAM); break;
      case "Minesweeper": setMode(GameMode.LOGIC_MINESWEEPER); break;
      case "Jigsaw Sudoku": setMode(GameMode.LOGIC_JIGSAW_SUDOKU); break;
      case "Samurai Sudoku": setMode(GameMode.LOGIC_SAMURAI_SUDOKU); break;
      case "Hyper Sudoku": setMode(GameMode.LOGIC_HYPER_SUDOKU); break;
      case "Windoku": setMode(GameMode.LOGIC_WINDOKU); break;
      case "Diagonal Sudoku": setMode(GameMode.LOGIC_DIAGONAL_SUDOKU); break;
      case "Irregular Sudoku": setMode(GameMode.LOGIC_IRREGULAR_SUDOKU); break;
      case "Mini Sudoku": setMode(GameMode.LOGIC_MINI_SUDOKU); break;
      case "Hex Sudoku": setMode(GameMode.LOGIC_HEX_SUDOKU); break;
      case "Alphabet Sudoku": setMode(GameMode.LOGIC_ALPHABET_SUDOKU); break;
      case "Wordoku": setMode(GameMode.LOGIC_WORDOKU); break;
      case "Samurai Killer Sudoku": alert("Yakında Eklenecek: " + gameName); break;
      case "Chaos Sudoku": setMode(GameMode.LOGIC_CHAOS_SUDOKU); break;
      case "Anti-Knight Sudoku": alert("Yakında Eklenecek: " + gameName); break;
      case "Anti-King Sudoku": alert("Yakında Eklenecek: " + gameName); break;
      case "Thermo Sudoku": setMode(GameMode.LOGIC_THERMO_SUDOKU); break;
      case "Arrow Sudoku": setMode(GameMode.LOGIC_ARROW_SUDOKU); break;
      case "Little Killer Sudoku": setMode(GameMode.LOGIC_LITTLE_KILLER_SUDOKU); break;
      case "Sandwich Sudoku": setMode(GameMode.LOGIC_SANDWICH_SUDOKU); break;
      case "XV Sudoku": setMode(GameMode.LOGIC_X_V_SUDOKU); break;
      case "Even-Odd Sudoku": setMode(GameMode.LOGIC_EVEN_ODD_SUDOKU); break;
      case "Greater Than Sudoku": setMode(GameMode.LOGIC_GREATER_THAN_SUDOKU); break;
      case "Consecutive Sudoku": setMode(GameMode.LOGIC_CONSECUTIVE_SUDOKU); break;
      case "Non-Consecutive Sudoku": setMode(GameMode.LOGIC_NON_CONSECUTIVE_SUDOKU); break;
      case "Sudoku X": setMode(GameMode.LOGIC_SUDOKU_X); break;
      case "Sudoku Y": setMode(GameMode.LOGIC_SUDOKU_Y); break;
      case "Color Sudoku": setMode(GameMode.LOGIC_COLOR_SUDOKU); break;
      case "Calcudoku": setMode(GameMode.LOGIC_CALCUDOKU); break;
      case "KenKen": setMode(GameMode.LOGIC_KEN_KEN); break;
      case "Kakuro": setMode(GameMode.LOGIC_KAKURO); break;
      case "Cross Sums": setMode(GameMode.LOGIC_CROSS_SUMS); break;
      case "Futoshiki": setMode(GameMode.LOGIC_FUTOSHIKI); break;
      case "Skyscrapers": setMode(GameMode.LOGIC_SKYSCRAPERS); break;
      case "Suguru": setMode(GameMode.LOGIC_SUGURU); break;
      case "Tectonics": setMode(GameMode.LOGIC_TECTONICS); break;
      case "Star Battle": setMode(GameMode.LOGIC_STAR_BATTLE); break;
      case "Two Not Touch": setMode(GameMode.LOGIC_TWO_NOT_TOUCH); break;
      case "Slitherlink": setMode(GameMode.LOGIC_SLITHERLINK); break;
      case "Masyu": setMode(GameMode.LOGIC_MASYU); break;
      case "Hashiwokakero (Bridges)": setMode(GameMode.LOGIC_HASHI); break;
      case "Nurikabe": setMode(GameMode.LOGIC_NURIKABE); break;
      case "Hitori": setMode(GameMode.LOGIC_HITORI); break;
      case "Akari (Light Up)": setMode(GameMode.LOGIC_AKARI); break;
      case "Yajilin": setMode(GameMode.LOGIC_YAJILIN); break;
      case "Fillomino": setMode(GameMode.LOGIC_FILLOMINO); break;
      case "Ripple Effect": setMode(GameMode.LOGIC_RIPPLE_EFFECT); break;
      case "Binairo": setMode(GameMode.LOGIC_BINAIRO); break;
      case "Takuzu": setMode(GameMode.LOGIC_TAKUZU); break;
      case "Binoxxo": setMode(GameMode.LOGIC_BINOXXO); break;
      case "Kropki Sudoku": setMode(GameMode.LOGIC_KROPKI_SUDOKU); break;
      case "Dot Sudoku": setMode(GameMode.LOGIC_DOT_SUDOKU); break;
      case "Numberlink": setMode(GameMode.LOGIC_NUMBERLINK); break;
      case "Arukone": setMode(GameMode.LOGIC_ARUKONE); break;
      case "Hidato": setMode(GameMode.LOGIC_HIDATO); break;
      case "Numbrix": setMode(GameMode.LOGIC_NUMBRIX); break;
      case "Picross": setMode(GameMode.LOGIC_PICROSS); break;
      case "Griddlers": setMode(GameMode.LOGIC_GRIDDLERS); break;
      case "Shikaku": setMode(GameMode.LOGIC_SHIKAKU); break;
      case "LITS": setMode(GameMode.LOGIC_L_I_T_S); break;
      case "Pentomino Puzzle": setMode(GameMode.LOGIC_PENTOMINO_PUZZLE); break;
      case "Domino Sudoku": setMode(GameMode.LOGIC_DOMINO_SUDOKU); break;
      case "Battleships Puzzle": setMode(GameMode.LOGIC_BATTLESHIPS); break;
      case "Tapa": setMode(GameMode.LOGIC_TAPA); break;
      case "Cave Puzzle": setMode(GameMode.LOGIC_CAVE); break;
      case "Kuromasu": setMode(GameMode.LOGIC_KUROMASU); break;
      case "Slant": setMode(GameMode.LOGIC_SLANT); break;
      case "Tent Puzzle": setMode(GameMode.LOGIC_TENTS_TREES); break;
      case "Magnets Puzzle": setMode(GameMode.LOGIC_MAGNETS); break;
      case "Mathdoku": setMode(GameMode.LOGIC_MATHDOKU); break;
      case "Latin Squares": setMode(GameMode.LOGIC_LATIN_SQUARES); break;
      case "Strimko": setMode(GameMode.LOGIC_STRIMKO); break;
      case "Mastermind": setMode(GameMode.LOGIC_MASTERMIND); break;
      case "Einstein Riddle": setMode(GameMode.LOGIC_EINSTEIN_RIDDLE); break;
      case "Logic Grid Puzzle": setMode(GameMode.LOGIC_GRID_PUZZLE); break;
      case "Zebra Puzzle": setMode(GameMode.LOGIC_ZEBRA); break;
      case "Tower Puzzle": setMode(GameMode.LOGIC_TOWER_PUZZLE); break;
      case "Train Tracks": setMode(GameMode.LOGIC_TRAIN_TRACKS); break;
      case "Loop Puzzle": setMode(GameMode.LOGIC_LOOP_PUZZLE); break;
      case "Spiral Galaxies": setMode(GameMode.LOGIC_SPIRAL_GALAXIES); break;
      case "Fill-a-Pix": setMode(GameMode.LOGIC_FILL_A_PIX); break;
      case "Light and Shadow": setMode(GameMode.LOGIC_LIGHT_AND_SHADOW); break;
      case "Number Snake": setMode(GameMode.LOGIC_NUMBER_SNAKE); break;
      case "Cross Logic": setMode(GameMode.LOGIC_CROSS_LOGIC); break;
      case "Blocked Sudoku": setMode(GameMode.LOGIC_BLOCKED_SUDOKU); break;
      case "Greater Than Killer Sudoku": setMode(GameMode.LOGIC_GREATER_THAN_KILLER_SUDOKU); break;
      case "Triple Sudoku": setMode(GameMode.LOGIC_TRIPLE_SUDOKU); break;
      case "Quad Sudoku": setMode(GameMode.LOGIC_QUAD_SUDOKU); break;
      case "Samurai Wordoku": setMode(GameMode.LOGIC_WORDOKU); break;
      case "Mosaic Puzzle": setMode(GameMode.LOGIC_MOSAIC_PUZZLE); break;
      case "Polyomino Puzzle": setMode(GameMode.LOGIC_POLYOMINO_PUZZLE); break;
      case "Nurimisaki": setMode(GameMode.LOGIC_NURIMISAKI); break;
      case "Balance Loop": alert("Yakında Eklenecek: " + gameName); break;
      case "Domino Logic": alert("Yakında Eklenecek: " + gameName); break;
      case "Arrows Puzzle": alert("Yakında Eklenecek: " + gameName); break;
      case "Grid Fill Puzzle": alert("Yakında Eklenecek: " + gameName); break;
      case "Path Finder Puzzle": alert("Yakında Eklenecek: " + gameName); break;
      case "Area Placement Puzzle": alert("Yakında Eklenecek: " + gameName); break;
      default: alert("Yakında Eklenecek: " + gameName);
    }
  };

  const [mode, setMode] = useState<GameMode>(GameMode.HOME);
  const [currentTopic, setCurrentTopic] = useState<string>('numbers'); // 'numbers', 'operations', 'geometry', 'data'
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('userStats');
    if (saved) return JSON.parse(saved);
    return {
      stars: 0,
      badges: [],
      solvedProblems: 0,
      gradeLevel: 1,
      currentAvatar: '👨‍🚀'
    };
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Intro Splash State - Disabled for now
  const [showSplash, setShowSplash] = useState(false);

  // Load categories from backend on mount
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    // 2 saniye sonra ana menüye geçiş
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // FIX: Scroll to top whenever the game mode (screen) changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(stats));
  }, [stats]);

  const handleGameComplete = (earnedStars: number) => {
    setStats(prev => ({
      ...prev,
      stars: prev.stars + earnedStars,
      solvedProblems: prev.solvedProblems + 15
    }));
    setMode(GameMode.LEAGUE);
  };

  const getLeagueIndex = (stars: number) => Math.min(Math.floor(stars / 200), 4);

  const renderContent = () => {
    // Show loading spinner while fetching data
    if (loading && categories.length === 0) {
      return <LoadingSpinner message="Kategoriler yükleniyor..." />;
    }

    // Show error if any
    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <div className="bg-red-500/20 backdrop-blur-xl border border-red-500/50 rounded-3xl p-8 max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-black text-white mb-4">HATA!</h2>
            <p className="text-white/80 mb-6">{error}</p>
            <button
              onClick={() => {
                clearError();
                loadCategories();
              }}
              className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:scale-105 transition-all"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      );
    }

    if (showSplash) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-36528d2dda41?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 animate-pulse"></div>
          <div className="relative z-10 text-center animate-in zoom-in duration-700">
            <img src={logoSrc} alt="Ozel Edirne Koleji" className="w-32 h-32 md:w-64 md:h-64 mx-auto mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] sparkle" />
            <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 animate-bounce">Platformuna Hoş Geldiniz</h1>
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mt-8"></div>
          </div>
        </div>
      );
    }
    switch (mode) {
      case GameMode.HOME:
        return (
          <div className="w-full max-w-7xl mx-auto px-2 bounce-in relative z-20">
            {/* Hero Section */}
            <div className="text-center mb-8 relative">
              <div className="flex justify-center mb-4">
                <img src={logoSrc} alt="Logo" className="w-32 h-32 sm:w-48 sm:h-48 object-contain drop-shadow-2xl" />
              </div>
              <h2 className="text-3xl md:text-6xl font-black mb-1 tracking-tighter italic text-white drop-shadow-2xl uppercase leading-tight">
                Özel Edirne Koleji
              </h2>
              <p className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-[9px] md:text-xs mb-6">Dijital Öğrenme Platformuna Hoş Geldin!</p>

              {/* Grade Selection - First */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-slate-900/50 backdrop-blur-xl p-5 md:p-6 rounded-[32px] border border-white/10 shadow-xl">
                  <h3 className="text-yellow-400 font-black text-xs md:text-sm mb-4 uppercase tracking-widest text-center">Sınıfını Seç</h3>
                  <div className="grid grid-cols-4 gap-2 md:gap-3">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(g => (
                      <button
                        key={g}
                        onClick={() => setStats(s => ({ ...s, gradeLevel: g }))}
                        className={`h-10 md:h-12 rounded-xl font-black md:text-lg transition-all ${stats.gradeLevel === g ? 'bg-yellow-400 text-slate-900 scale-105 shadow-lg shadow-yellow-400/20' : 'bg-white/5 text-white hover:bg-white/10'} ${g === 0 ? 'col-span-4 text-sm' : 'text-base'}`}
                      >
                        {g === 0 ? '👶 Anasınıfı' : g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category Filter - Second */}
              <div className="mb-10">
                <div className="bg-slate-900/50 backdrop-blur-xl p-5 md:p-6 rounded-[32px] border border-white/10 shadow-xl max-w-4xl mx-auto">
                  <h3 className="text-white font-black text-sm md:text-base mb-4 uppercase tracking-widest text-center">Kategorilere Göre Filtrele</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      { id: 'all', label: 'Tümü', gradient: 'from-purple-500 to-indigo-600' },
                      { id: 'academic', label: 'Akademik Dersler', gradient: 'from-blue-500 to-cyan-600' },
                      { id: 'mental', label: 'Zihinsel Gelişim', gradient: 'from-pink-500 to-rose-600' },
                      { id: 'language', label: 'Dil ve İletişim', gradient: 'from-green-500 to-emerald-600' },
                      { id: 'art', label: 'Sanat ve Yaratıcılık', gradient: 'from-orange-500 to-amber-600' },
                      { id: 'sports', label: 'Spor ve Sağlık', gradient: 'from-red-500 to-pink-600' },
                      { id: 'life', label: 'Yaşam Becerileri', gradient: 'from-teal-500 to-cyan-600' },
                      { id: 'fun', label: 'Eğlence', gradient: 'from-yellow-500 to-orange-600' },
                      { id: 'teacher', label: 'Öğretmen Araçları', gradient: 'from-violet-600 to-purple-700' },
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${selectedCategory === cat.id
                          ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg scale-105`
                          : `bg-gradient-to-r ${cat.gradient} text-white/90 opacity-60 hover:opacity-100`
                          }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Subject Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* Akademik Dersler */}
              {(selectedCategory === 'all' || selectedCategory === 'academic') && (
                <>
                  {stats.gradeLevel === 0 && <GameCard title="Okul Öncesi" icon="🧸" color="bg-gradient-to-br from-pink-400 to-rose-500" description="Oyunla öğrenme dünyasına hoş geldin!" onClick={() => setMode(GameMode.PRESCHOOL_MENU)} />}
                  {stats.gradeLevel > 0 && <GameCard title="Matematik" icon="🧮" color="bg-gradient-to-br from-indigo-600 to-blue-700" description="Sayıların gizemli dünyasına yolculuk yap!" onClick={() => setMode(GameMode.MATH_MENU)} />}
                  {stats.gradeLevel > 0 && <GameCard title="Türkçe" icon="📚" color="bg-gradient-to-br from-red-500 to-orange-600" description="Kelime ve okuma becerilerini geliştir!" onClick={() => setMode(GameMode.TURKISH_MENU)} />}
                  {stats.gradeLevel > 0 && stats.gradeLevel <= 3 && <GameCard title="Hayat Bilgisi" icon="🌱" color="bg-gradient-to-br from-lime-500 to-green-600" description="Yaşamı ve çevremizi keşfet!" onClick={() => setMode(GameMode.LIFE_SCIENCE_MENU)} />}
                  {stats.gradeLevel >= 3 && <GameCard title="Fen Bilgisi" icon="🧪" color="bg-gradient-to-br from-emerald-500 to-teal-700" description="Gezegenleri ve doğayı keşfet!" onClick={() => setMode(GameMode.SCIENCE_MENU)} />}
                  {stats.gradeLevel >= 4 && <GameCard title="Sosyal Bilgiler" icon="🌍" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Dünyamızı ve tarihimizi tanı!" onClick={() => setMode(GameMode.SOCIAL_STUDIES_MENU)} />}
                  {stats.gradeLevel >= 2 && <GameCard title="İngilizce" icon="🇬🇧" color="bg-gradient-to-br from-violet-600 to-fuchsia-800" description="Galaktik kelimeleri öğren!" onClick={() => setMode(GameMode.ENGLISH_MENU)} />}
                  {(stats.gradeLevel === 5 || stats.gradeLevel === 6) && <GameCard title="Bilişim Teknolojileri ve Yazılım" icon="💻" color="bg-gradient-to-br from-sky-500 to-blue-700" description="Kodlama ve algoritma dünyasına gir!" onClick={() => setMode(GameMode.IT_SOFTWARE_MENU)} />}
                  {stats.gradeLevel >= 4 && <GameCard title="Din Kültürü" icon="🕌" color="bg-gradient-to-br from-cyan-600 to-blue-800" description="Ahlak ve değerleri öğren!" onClick={() => setMode(GameMode.RELIGION_MENU)} />}
                  {stats.gradeLevel >= 5 && <GameCard title="Almanca" icon="🇩🇪" color="bg-gradient-to-br from-yellow-500 to-amber-700" description="Guten Tag! Almanca öğrenmeye başla!" onClick={() => setMode(GameMode.GERMAN_MENU)} />}
                  {stats.gradeLevel === 8 && <GameCard title="T.C İnkılap Tarihi ve Atatürkçülük" icon="🇹🇷" color="bg-gradient-to-br from-red-600 to-red-800" description="Cumhuriyetimizin kuruluşunu ve Atatürk ilkelerini öğren!" onClick={() => setMode(GameMode.HISTORY_ATATURK_MENU)} />}
                </>
              )}

              {/* Zihinsel Gelişim */}
              {(selectedCategory === 'all' || selectedCategory === 'mental') && (
                <>
                  {stats.gradeLevel > 0 && <GameCard title="Hızlı Okuma" icon="⚡" color="bg-gradient-to-br from-blue-500 to-indigo-600" description="Okuma hızını ve odaklanmanı geliştir!" onClick={() => setMode(GameMode.FAST_READING_MENU)} />}
                  {stats.gradeLevel > 0 && <GameCard title="Konsantrasyon" icon="🧘" color="bg-gradient-to-br from-cyan-600 to-teal-700" description="Odaklanma ve dikkatini zirveye taşı!" onClick={() => setMode(GameMode.FOCUS_MENU)} />}
                  {stats.gradeLevel > 0 && <GameCard title="Hızlı Öğrenme" icon="🚀" color="bg-gradient-to-br from-amber-600 to-orange-700" description="Öğrenme hızını ve tekniklerini keşfet!" onClick={() => setMode(GameMode.LEARNING_MENU)} />}
                  {stats.gradeLevel > 0 && <GameCard title="Satranç" icon="♟️" color="bg-gradient-to-br from-slate-600 to-slate-800" description="Strateji kur ve oyunu kazan!" onClick={() => setMode(GameMode.CHESS_MENU)} />}
                </>
              )}

              {/* Dil ve İletişim */}
              {(selectedCategory === 'all' || selectedCategory === 'language') && (
                <>
                  {stats.gradeLevel > 0 && <GameCard title="Filoloji & Dil" icon="🌐" color="bg-gradient-to-br from-rose-600 to-pink-700" description="Kelime hazneni ve dil yeteneğini geliştir!" onClick={() => setMode(GameMode.LANGUAGE_VOCAB)} />}
                </>
              )}

              {/* Sanat ve Yaratıcılık */}
              {(selectedCategory === 'all' || selectedCategory === 'art') && (
                <>
                  {stats.gradeLevel > 0 && <GameCard title="Görsel Sanatlar" icon="🎨" color="bg-gradient-to-br from-fuchsia-500 to-purple-700" description="Sanat eserleri yarat ve eleştir!" onClick={() => setMode(GameMode.ART_MENU)} />}
                  {stats.gradeLevel > 0 && <GameCard title="Müzik" icon="🎵" color="bg-gradient-to-br from-indigo-500 to-purple-600" description="Notalar ve ritimlerle eğlen!" onClick={() => setMode(GameMode.MUSIC_MENU)} />}
                </>
              )}

              {/* Spor ve Sağlık */}
              {(selectedCategory === 'all' || selectedCategory === 'sports') && (
                <>
                  {stats.gradeLevel > 0 && <GameCard title="Beden Eğitimi" icon="🏅" color="bg-gradient-to-br from-orange-600 to-amber-700" description="Spor dallarını ve sağlığı keşfet!" onClick={() => setMode(GameMode.PE_MENU)} />}
                </>
              )}

              {/* Yaşam Becerileri */}
              {(selectedCategory === 'all' || selectedCategory === 'life') && (
                <>
                  <GameCard title="Trafik ve Yol Güvenliği" icon="🚦" color="bg-gradient-to-br from-red-600 to-orange-700" description="Trafik kurallarını öğren, güvenli ol!" onClick={() => setMode(GameMode.LIFE_SKILLS_TRAFFIC)} />
                  <GameCard title="Kişisel Hijyen ve Sağlık" icon="🧼" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Temizlik ve sağlık alışkanlıkları!" onClick={() => setMode(GameMode.LIFE_SKILLS_HYGIENE)} />
                  <GameCard title="İlk Yardım ve Acil Durum" icon="⛑️" color="bg-gradient-to-br from-red-500 to-rose-600" description="Hayat kurtaran bilgiler öğren!" onClick={() => setMode(GameMode.FIRST_AID_MENU)} />
                  <GameCard title="Dijital Güvenlik" icon="🔒" color="bg-gradient-to-br from-purple-600 to-indigo-700" description="İnternet ve dijital dünyada güvende kal!" onClick={() => setMode(GameMode.LIFE_SKILLS_DIGITAL)} />
                  <GameCard title="Dijital Sağlık ve Teknoloji Kullanımı" icon="📱" color="bg-gradient-to-br from-indigo-600 to-violet-700" description="Ekran süresi dengesi ve sağlıklı teknoloji kullanımı!" onClick={() => setMode(GameMode.LIFE_SKILLS_DIGITAL_HEALTH)} />
                  {stats.gradeLevel >= 3 && <GameCard title="Finansal Okuryazarlık" icon="💰" color="bg-gradient-to-br from-green-600 to-emerald-700" description="Para yönetimi ve tasarruf öğren!" onClick={() => setMode(GameMode.LIFE_SKILLS_FINANCIAL)} />}
                  <GameCard title="Sağlıklı Beslenme" icon="🥗" color="bg-gradient-to-br from-lime-500 to-green-600" description="Sağlıklı yaşam ve beslenme!" onClick={() => setMode(GameMode.LIFE_SKILLS_NUTRITION)} />
                  <GameCard title="Sosyal ve Duygusal Beceri" icon="🤝" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Empati, işbirliği ve duygusal zeka!" onClick={() => setMode(GameMode.LIFE_SKILLS_SOCIAL)} />
                  <GameCard title="Çevre ve Toplum Bilinci" icon="🌍" color="bg-gradient-to-br from-teal-500 to-cyan-600" description="Çevreyi koru, topluma katkı sağla!" onClick={() => setMode(GameMode.LIFE_SKILLS_ENVIRONMENT)} />
                  {stats.gradeLevel >= 7 && <GameCard title="Temel Hukuk ve Haklar" icon="⚖️" color="bg-gradient-to-br from-slate-600 to-gray-700" description="Haklarını öğren, sorumluluklarını bil!" onClick={() => setMode(GameMode.LIFE_SKILLS_LAW)} />}
                </>
              )}

              {/* Eğlence */}
              {(selectedCategory === 'all' || selectedCategory === 'fun') && (
                <>
                  <GameCard title="📚 Hikaye Kitabı" icon="📖" color="bg-gradient-to-br from-amber-500 to-orange-600" description="Eğlenceli hikayeler oku, yeni şeyler öğren!" onClick={() => setMode(GameMode.STORYBOOK)} />
                  <GameCard title="Oyun Alanı" icon="🎮" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Mola ver, zeka oyunlarıyla eğlen!" onClick={() => setMode(GameMode.PLAYGROUND)} />
                </>
              )}

              {/* Öğretmen Araçları */}
              {(selectedCategory === 'all' || selectedCategory === 'teacher') && (
                <>
                  <GameCard title="Öğretmen Araçları" icon="🎓" color="bg-gradient-to-br from-violet-600 to-purple-700" description="Sınıf yönetimi ve eğitim araçları!" onClick={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />
                </>
              )}
            </div>
          </div>
        );

      case GameMode.LEAGUE:
        const currentLeague = LEAGUE_NAMES[getLeagueIndex(stats.stars)];
        const allPlayers = [...MOCK_PLAYERS, { name: 'SEN', stars: stats.stars, avatar: stats.currentAvatar }]
          .sort((a, b) => b.stars - a.stars);

        return (
          <div className="w-full max-w-2xl mx-auto bg-slate-900/80 backdrop-blur-3xl rounded-[40px] p-6 md:p-10 shadow-2xl border border-white/10 bounce-in">
            <div className="text-center mb-10">
              <p className="text-yellow-400 font-black tracking-widest text-[10px] md:text-xs mb-2 uppercase">Şampiyonlar Ligi</p>
              <h2 className="text-4xl md:text-5xl font-black italic text-white drop-shadow-lg">{currentLeague}</h2>
            </div>

            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {allPlayers.map((player, idx) => (
                <div key={idx} className={`flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-3xl border-2 transition-all ${player.name === 'SEN' ? 'bg-indigo-600 border-white shadow-xl scale-[1.02]' : 'bg-white/5 border-transparent'}`}>
                  <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center font-black text-sm md:text-lg">
                    {idx + 1}
                  </div>
                  <div className="text-2xl md:text-3xl">{player.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black uppercase text-sm md:text-lg truncate">{player.name}</p>
                    <p className="text-[10px] md:text-xs font-bold opacity-60">{player.stars} YILDIZ</p>
                  </div>
                  {idx < 3 && <div className="text-xl">⭐</div>}
                </div>
              ))}
            </div>

            <button onClick={() => setMode(GameMode.HOME)} className="w-full mt-10 py-5 bg-white text-slate-900 rounded-[24px] font-black text-lg md:text-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl">ANA ÜS 🚀</button>
          </div>
        );

      case GameMode.REPORTS:
        return (
          <div className="w-full max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-3xl rounded-[40px] p-6 md:p-12 shadow-2xl text-white bounce-in border border-white/10">
            <h2 className="text-4xl md:text-6xl font-black italic mb-10 text-center md:text-left">BAŞARI ÜSSÜ 🌌</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <div className="bg-white/5 p-6 rounded-[32px] text-center border border-white/5">
                <p className="text-[10px] font-black text-cyan-400 mb-2 uppercase tracking-widest">Yıldızların</p>
                <p className="text-4xl md:text-5xl font-black">{stats.stars} ✨</p>
              </div>
              <div className="bg-white/5 p-6 rounded-[32px] text-center border border-white/5">
                <p className="text-[10px] font-black text-cyan-400 mb-2 uppercase tracking-widest">Mevcut Lig</p>
                <p className="text-xl md:text-2xl font-black leading-tight uppercase">{LEAGUE_NAMES[getLeagueIndex(stats.stars)]}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-[32px] text-center border border-white/5">
                <p className="text-[10px] font-black text-cyan-400 mb-2 uppercase tracking-widest">Deneyim</p>
                <p className="text-4xl md:text-5xl font-black">{stats.gradeLevel}. Sınıf</p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-black mb-6 text-yellow-400 flex items-center gap-3">
                <span className="bg-yellow-400/20 p-2 rounded-lg">👤</span> AVATAR KOLEKSİYONU
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {AVATARS.map(av => {
                  const unlocked = stats.stars >= av.minStars;
                  return (
                    <button
                      key={av.name}
                      disabled={!unlocked}
                      onClick={() => setStats(s => ({ ...s, currentAvatar: av.icon }))}
                      className={`flex-shrink-0 w-24 md:w-28 h-24 md:h-28 rounded-3xl flex flex-col items-center justify-center transition-all ${unlocked ? (stats.currentAvatar === av.icon ? 'bg-yellow-400 text-slate-900 border-4 border-white' : 'bg-white/10 text-white hover:bg-white/20') : 'bg-black/40 opacity-30 cursor-not-allowed'}`}
                    >
                      <span className="text-3xl md:text-4xl">{av.icon}</span>
                      <span className="text-[9px] md:text-[10px] font-black mt-2 uppercase">{unlocked ? av.name : `${av.minStars} ✨`}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button onClick={() => setMode(GameMode.HOME)} className="w-full py-5 bg-indigo-600 rounded-[24px] font-black text-lg md:text-2xl shadow-xl hover:bg-indigo-500 transition-all">GERİ DÖN</button>
          </div>
        );

      case GameMode.FAST_READING_MENU:
        return <FastReadingMenu stats={stats} setMode={setMode} />;

      case GameMode.FAST_READING_MEASUREMENT:
        return <MeasurementMenu setMode={setMode} />;

      case GameMode.FAST_READING_EYE_FLOW:
        return <EyeFlowMenu setMode={setMode} />;

      case GameMode.FAST_READING_FOCUS_TRAINING:
        return <FocusTrainingMenu setMode={setMode} />;

      case GameMode.FAST_READING_SPEED_TEST:
        return <SpeedReadingTest stats={stats} setMode={setMode} />;

      case GameMode.FAST_READING_WORD_FLOW:
        return <WordFlowExercise stats={stats} setMode={setMode} />;

      case GameMode.FAST_READING_GROUPING:
        return <WordGroupingExercise stats={stats} setMode={setMode} />;

      case GameMode.FAST_READING_EYE_TRACKING:
        return <EyeExercise stats={stats} setMode={setMode} />;

      case GameMode.FAST_READING_FOCUS:
        return <FocusExercise stats={stats} setMode={setMode} />;

      case GameMode.FAST_READING_DASHBOARD:
        return <FastReadingDashboard stats={stats} setMode={setMode} />;

      case GameMode.FAST_READING_TEACHER:
        return <FastReadingTeacher stats={stats} setMode={setMode} />;

      case GameMode.FAST_READING_PERIPHERAL:
        return <PeripheralVisionExercise stats={stats} setMode={setMode} />;

      case GameMode.FAST_READING_SACCADE:
        return <SaccadeExercise stats={stats} setMode={setMode} />;

      case GameMode.FAST_READING_LINE_TRACKING:
        return <LineTrackingExercise stats={stats} setMode={setMode} />;

      case GameMode.FAST_READING_TECHNIQUES:
        return <TechniquesModule stats={stats} setMode={setMode} />;

      case GameMode.FAST_READING_BRAIN_GAMES:
        return <BrainGamesMenu stats={stats} setMode={setMode} />;

      case GameMode.FAST_READING_CATCH_WORD:
        return <CatchWordGame stats={stats} setMode={setMode} />;

      case GameMode.FAST_READING_FLASH_MEMORY:
        return <FlashMemoryGame stats={stats} setMode={setMode} />;

      // PHASE 3 MENUS
      case GameMode.FOCUS_MENU:
        return <FocusMenu stats={stats} setMode={setMode} />;
      case GameMode.LEARNING_MENU:
        return <LearningMenu stats={stats} setMode={setMode} />;

      // FOCUS SUB-MODES
      case GameMode.FOCUS_POMODORO:
        return <PomodoroTimer />;
      case GameMode.FOCUS_ATTENTION:
        return <AttentionTrackingGame onComplete={handleGameComplete} />;
      case GameMode.FOCUS_BIONIC:
        return <BionicReadingModule />;

      // LEARNING SUB-MODES
      case GameMode.LEARNING_COMPREHENSION:
        return <SpeedComprehension />;
      case GameMode.LEARNING_FLASHCARD:
        return <FlashcardSystem />;
      case GameMode.LEARNING_PARAPHRASE:
        return <ParaphraseExercise />;

      // MEMORY SUB-MODES
      case GameMode.MEMORY_WORD:
        return <WordMemoryGame />;
      case GameMode.MEMORY_MNEMONIC:
        return <MnemonicTraining />;
      case GameMode.MEMORY_MIND_MAP:
        return <MindMapTool />;

      // LOGIC SUB-MODES
      case GameMode.LOGIC_BLOCK_CODING:
        return <BlockCodingGame />;
      case GameMode.LOGIC_DECISION:
        return <DecisionSimulator />;

      // ART & CREATIVITY SUB-MODES
      case GameMode.ART_DRAWING:
        return <CanvasDrawTool />;
      case GameMode.ART_STORY:
        return <StoryBuilder />;
      case GameMode.ART_RHYTHM:
        return <RhythmGame />;

      // LANGUAGE SUB-MODES
      case GameMode.LANGUAGE_VOCAB:
        return <LanguageMenu stats={stats} setMode={setMode} />;
      case GameMode.LANGUAGE_SIM:
        return <LanguageSim onExit={() => setMode(GameMode.LANGUAGE_VOCAB)} />;
      case GameMode.LANGUAGE_DAILY_WORDS:
        return <LanguageDailyWords onExit={() => setMode(GameMode.LANGUAGE_VOCAB)} />;
      case GameMode.LANGUAGE_SYNONYMS:
        return <LanguageSynonyms onExit={() => setMode(GameMode.LANGUAGE_VOCAB)} />;
      case GameMode.LANGUAGE_ANTONYMS:
        return <LanguageAntonyms onExit={() => setMode(GameMode.LANGUAGE_VOCAB)} />;
      case GameMode.LANGUAGE_IDIOMS:
        return <LanguageIdioms onExit={() => setMode(GameMode.LANGUAGE_VOCAB)} />;
      case GameMode.LANGUAGE_PROVERBS:
        return <LanguageProverbs onExit={() => setMode(GameMode.LANGUAGE_VOCAB)} />;
      case GameMode.LANGUAGE_METAPHORS:
        return <LanguageMetaphors onExit={() => setMode(GameMode.LANGUAGE_VOCAB)} />;
      case GameMode.LANGUAGE_WORD_GAME:
        return <LanguageWordGame onExit={() => setMode(GameMode.LANGUAGE_VOCAB)} />;
      case GameMode.LANGUAGE_AI_QUIZ:
        return <LanguageAIQuiz onExit={() => setMode(GameMode.LANGUAGE_VOCAB)} />;

      // ADVANCED FAST READING MODES
      case GameMode.FAST_READING_EYE_TRACKING:
        return <AdvancedEyeExercises onExit={() => setMode(GameMode.FAST_READING_MENU)} />;
      case GameMode.FAST_READING_PERIPHERAL:
        return <ExpandingShapes onExit={() => setMode(GameMode.FAST_READING_MENU)} />;
      case GameMode.FAST_READING_BRAIN_GAMES:
        return <VisualSearch onExit={() => setMode(GameMode.FAST_READING_MENU)} />;
      case GameMode.FAST_READING_WORD_FLOW:
        return <RhythmicReading onExit={() => setMode(GameMode.FAST_READING_MENU)} />;
      case GameMode.FAST_READING_FLASH_MEMORY:
        return <Tachistoscope onExit={() => setMode(GameMode.FAST_READING_MENU)} />;

      case GameMode.TURKISH_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Türkçe Dünyası</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Kelimeler, hikayeler ve dil becerileri! Türkçe yolculuğuna hazır mısın?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* ÖĞREN KUTUSU */}
              <button
                onClick={() => alert("Yakında eklenecek!")}
                className="group bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎯</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">ÖĞREN</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Alıştırmalarla pekiştir!</p>

                {/* Right Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>

                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎯</div>
              </button>

              {/* PRATİK YAP KUTUSU */}
              <button
                onClick={() => setMode(GameMode.TURKISH_PRACTICE_MENU)}
                className="group bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">✏️</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">PRATİK YAP</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Türkçe becerilerini geliştir!</p>

                {/* Right Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>

                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">✏️</div>
              </button>

              {/* OYUN ALANI KUTUSU */}
              <button
                onClick={() => setMode(GameMode.TURKISH_GAME_AREA)}
                className="group bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎮</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">OYUN ALANI</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Kelime oyunlarıyla eğlen!</p>

                {/* Right Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>

                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎮</div>
              </button>
            </div>
          </div>
        );

      case GameMode.TURKISH_PRACTICE_MENU:
        const listeningDesc = stats.gradeLevel === 1 ? "Sesleri ayırt etme ve kısa metin anlama." :
          stats.gradeLevel === 2 ? "Hikâye dinleme ve ana fikri bulma." :
            stats.gradeLevel === 3 ? "Metin özetleme ve dinlediğini yorumlama." : "Medyayı değerlendirme ve eleştirel dinleme.";
        const speakingDesc = stats.gradeLevel === 1 ? "Kendini tanıtma ve olayları anlatma." :
          stats.gradeLevel === 2 ? "Kurallı günlük konuşma ve kısa sunum." :
            stats.gradeLevel === 3 ? "Planlı konuşma ve tartışmaya katılma." : "İkna edici ve resmî/günlük konuşma ayrımları.";
        const readingDesc = stats.gradeLevel === 1 ? "Harfleri tanıma, hece okuma ve akıcı başlangıç." :
          stats.gradeLevel === 2 ? "Akıcı okuma ve temel metin türlerini anlama." :
            stats.gradeLevel === 3 ? "Okuma çözümleme ve yardımcı fikirleri bulma." : "Eleştirel okuma ve metinleri karşılaştırma.";
        const writingDesc = stats.gradeLevel === 1 ? "Harf/hece/kelime yazma ve basit cümle kurumsal" :
          stats.gradeLevel === 2 ? "Paragraf ve kısa hikâye oluşturma." :
            stats.gradeLevel === 3 ? "Bilgilendirici metin ile duygu yazıları." : "Planlı kompozisyon ve etkili metin yazımı.";

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.TURKISH_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Türkçe Konuları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Dinleme, konuşma, okuma ve yazma becerilerini geliştir!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Dinleme / İzleme" icon="🎧" color="bg-gradient-to-br from-indigo-500 to-blue-600" description={listeningDesc} onClick={() => setMode(GameMode.TURKISH_LISTENING)} />
              <GameCard title="Konuşma" icon="🗣️" color="bg-gradient-to-br from-rose-500 to-red-600" description={speakingDesc} onClick={() => setMode(GameMode.TURKISH_SPEAKING)} />
              <GameCard title="Okuma" icon="📖" color="bg-gradient-to-br from-amber-500 to-orange-600" description={readingDesc} onClick={() => setMode(GameMode.TURKISH_READING)} />
              <GameCard title="Yazma" icon="✍️" color="bg-gradient-to-br from-emerald-500 to-teal-700" description={writingDesc} onClick={() => setMode(GameMode.TURKISH_WRITING)} />
            </div>
          </div>
        );

      // TURKISH TOPIC QUESTION TYPE SELECTION MENUS
      case GameMode.TURKISH_LISTENING:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.TURKISH_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Dinleme / İzleme</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('listening'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('listening'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('listening'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('listening'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.TURKISH_SPEAKING:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.TURKISH_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Konuşma</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('speaking'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('speaking'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('speaking'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('speaking'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.TURKISH_READING:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.TURKISH_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Okuma</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('reading'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('reading'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('reading'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('reading'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.TURKISH_WRITING:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.TURKISH_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Yazma</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('writing'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('writing'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('writing'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('writing'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.TURKISH_GAME_AREA:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.TURKISH_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Türkçe Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Sınıfını seç, oyunlarla Türkçe öğren ve eğlen!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* 1-8. SINIF KARTLARI */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((grade) => {
                const colors = [
                  'from-green-500 to-emerald-600',
                  'from-blue-500 to-indigo-600',
                  'from-orange-500 to-red-600',
                  'from-purple-500 to-pink-600',
                  'from-cyan-500 to-teal-600',
                  'from-yellow-500 to-amber-600',
                  'from-violet-500 to-purple-600',
                  'from-lime-500 to-green-600'
                ];
                const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];
                const descriptions = [
                  'Harfler, Sesler, Kelimeler',
                  'Okuma, Yazma, Hikaye',
                  'Deyimler, Atasözleri',
                  'Metin Türleri, Anlatım',
                  'Sözcük Türleri, Cümle',
                  'Fiil, Zaman, Kip',
                  'Edebiyat, Şiir, Roman',
                  'Kompozisyon, Eleştiri'
                ];

                return (
                  <button
                    key={grade}
                    onClick={() => setMode(`TURKISH_GAME_GRADE_${grade}` as GameMode)}
                    className={`group bg-gradient-to-br ${colors[grade - 1]} p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48`}
                  >
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">{emojis[grade - 1]}</div>
                    <h3 className="text-white font-black text-xl mb-1 mt-auto">{grade}. SINIF</h3>
                    <p className="text-white/80 text-xs font-medium">{descriptions[grade - 1]}</p>
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all">
                      <span className="text-white text-xl font-black">›</span>
                    </div>
                    <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity">{emojis[grade - 1]}</div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case GameMode.TURKISH_GAME_GRADE_1:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.TURKISH_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">1. Sınıf Türkçe Oyunları</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Harfler" icon="🔤" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Harf tanıma oyunları" onClick={() => setMode(GameMode.TURKISH_GAME_GRADE_1_LETTERS)} />
              <GameCard title="Kelimeler" icon="📝" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Kelime oyunları" onClick={() => setMode(GameMode.TURKISH_GAME_GRADE_1_WORDS)} />
              <GameCard title="Okuma" icon="📖" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Okuma oyunları" onClick={() => setMode(GameMode.TURKISH_GAME_GRADE_1_READING)} />
            </div>
          </div>
        );

      case GameMode.TURKISH_GAME_GRADE_1_LETTERS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.TURKISH_GAME_GRADE_1)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Harf Oyunları</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Sesli mi Sessiz mi?" icon="🎵" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Harfleri tanı!" onClick={() => setMode(GameMode.TURKISH_GAME_GRADE_1_VOWEL_CONSONANT)} />
              <GameCard title="Harf Eşleştirme" icon="🔤" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Harfleri eşleştir!" onClick={() => setMode(GameMode.TURKISH_GAME_GRADE_1_LETTER_MATCH)} />
            </div>
          </div>
        );

      case GameMode.TURKISH_GAME_GRADE_1_VOWEL_CONSONANT:
        return <VowelConsonantGame onBack={() => setMode(GameMode.TURKISH_GAME_GRADE_1_LETTERS)} />;

      case GameMode.TURKISH_GAME_GRADE_1_LETTER_MATCH:
        return <LetterMatchGame onBack={() => setMode(GameMode.TURKISH_GAME_GRADE_1_LETTERS)} />;

      case GameMode.TURKISH_GAME_GRADE_1_WORDS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.TURKISH_GAME_GRADE_1)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Kelime Oyunları</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Hece Sayma" icon="📝" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Heceleri say!" onClick={() => setMode(GameMode.TURKISH_GAME_GRADE_1_SYLLABLE_COUNT)} />
            </div>
          </div>
        );

      case GameMode.TURKISH_GAME_GRADE_1_SYLLABLE_COUNT:
        return <SyllableCountGame onBack={() => setMode(GameMode.TURKISH_GAME_GRADE_1_WORDS)} />;

      case GameMode.TURKISH_GAME_GRADE_1_READING:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.TURKISH_GAME_GRADE_1)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Okuma Oyunları</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Kelime Yapma" icon="🔤" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Harflerden kelime yap!" onClick={() => setMode(GameMode.TURKISH_GAME_GRADE_1_WORD_MAKING)} />
              <GameCard title="Hikaye Anlama" icon="📖" color="bg-gradient-to-br from-orange-500 to-amber-600" description="Hikayeyi anla!" onClick={() => setMode(GameMode.TURKISH_GAME_GRADE_1_STORY_COMPREHENSION)} />
            </div>
          </div>
        );

      case GameMode.TURKISH_GAME_GRADE_1_WORD_MAKING:
        return <WordMakingGame onBack={() => setMode(GameMode.TURKISH_GAME_GRADE_1_READING)} />;

      case GameMode.TURKISH_GAME_GRADE_1_STORY_COMPREHENSION:
        return <StoryComprehensionGame onBack={() => setMode(GameMode.TURKISH_GAME_GRADE_1_READING)} />;

      case GameMode.TURKISH_GAME_GRADE_2:
      case GameMode.TURKISH_GAME_GRADE_3:
      case GameMode.TURKISH_GAME_GRADE_4:
      case GameMode.TURKISH_GAME_GRADE_5:
      case GameMode.TURKISH_GAME_GRADE_6:
      case GameMode.TURKISH_GAME_GRADE_7:
      case GameMode.TURKISH_GAME_GRADE_8:
        const turkishGradeNum = mode === GameMode.TURKISH_GAME_GRADE_1 ? 1 :
          mode === GameMode.TURKISH_GAME_GRADE_2 ? 2 :
            mode === GameMode.TURKISH_GAME_GRADE_3 ? 3 :
              mode === GameMode.TURKISH_GAME_GRADE_4 ? 4 :
                mode === GameMode.TURKISH_GAME_GRADE_5 ? 5 :
                  mode === GameMode.TURKISH_GAME_GRADE_6 ? 6 :
                    mode === GameMode.TURKISH_GAME_GRADE_7 ? 7 : 8;

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.TURKISH_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">{turkishGradeNum}. Sınıf Türkçe Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Kelime oyunlarıyla Türkçe öğren ve eğlen!
              </p>
            </div>

            {/* Yakında Eklenecek Mesajı */}
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-8xl mb-6 animate-bounce">🚀</div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4">Yakında Geliyor!</h3>
                <p className="text-white/70 text-lg md:text-xl font-semibold max-w-md mx-auto">
                  {turkishGradeNum}. sınıf Türkçe oyunları üzerinde çalışıyoruz. Çok yakında burada olacak!
                </p>
              </div>
            </div>
          </div>
        );

      case GameMode.SCIENCE_GAME_GRADE_3:
      case GameMode.SCIENCE_GAME_GRADE_4:
      case GameMode.SCIENCE_GAME_GRADE_5:
      case GameMode.SCIENCE_GAME_GRADE_6:
      case GameMode.SCIENCE_GAME_GRADE_7:
      case GameMode.SCIENCE_GAME_GRADE_8:
        const scienceGradeNum = mode === GameMode.SCIENCE_GAME_GRADE_3 ? 3 :
          mode === GameMode.SCIENCE_GAME_GRADE_4 ? 4 :
            mode === GameMode.SCIENCE_GAME_GRADE_5 ? 5 :
              mode === GameMode.SCIENCE_GAME_GRADE_6 ? 6 :
                mode === GameMode.SCIENCE_GAME_GRADE_7 ? 7 : 8;

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.SCIENCE_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">{scienceGradeNum}. Sınıf Fen Bilgisi Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Bilim oyunlarıyla fen bilgisi öğren ve eğlen!
              </p>
            </div>

            {/* Yakında Eklenecek Mesajı */}
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-8xl mb-6 animate-bounce">🚀</div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4">Yakında Geliyor!</h3>
                <p className="text-white/70 text-lg md:text-xl font-semibold max-w-md mx-auto">
                  {scienceGradeNum}. sınıf Fen Bilgisi oyunları üzerinde çalışıyoruz. Çok yakında burada olacak!
                </p>
              </div>
            </div>
          </div>
        );

      case GameMode.SOCIAL_STUDIES_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-8">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">Sosyal Bilgiler Dünyası</h2>
              <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">Tarih, coğrafya ve kültür! Dünyamızı keşfetmeye hazır mısın?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-32 max-w-7xl mx-auto">
              <button
                onClick={() => alert("Öğren bölümü yakında eklenecek!")}
                className="group bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎯</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">ÖĞREN</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Tarih ve coğrafya konularını keşfet!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎯</div>
              </button>

              <button
                onClick={() => setMode(GameMode.SOCIAL_STUDIES_PRACTICE_MENU)}
                className="group bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">✏️</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">PRATİK YAP</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Alıştırmalarla pekiştir!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">✏️</div>
              </button>

              <button
                onClick={() => setMode(GameMode.SOCIAL_STUDIES_GAME_AREA)}
                className="group bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎮</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">OYUN ALANI</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Sosyal bilgiler oyunlarıyla eğlen!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎮</div>
              </button>
            </div>
          </div>
        );

      case GameMode.SOCIAL_STUDIES_PRACTICE_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.SOCIAL_STUDIES_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Sosyal Bilgiler Konuları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Tarih, coğrafya, vatandaşlık ve kültür konularını öğren!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="📜 Tarih" icon="📜" color="bg-gradient-to-br from-amber-500 to-orange-600" description="Geçmişten günümüze tarih bilgisi" onClick={() => setMode(GameMode.SOCIAL_STUDIES)} />
              <GameCard title="🗺️ Coğrafya" icon="🗺️" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Dünya ve Türkiye coğrafyası" onClick={() => setMode(GameMode.SOCIAL_STUDIES)} />
              <GameCard title="🏛️ Vatandaşlık" icon="🏛️" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Hak ve sorumluluklar" onClick={() => setMode(GameMode.SOCIAL_STUDIES)} />
              <GameCard title="🎭 Kültür" icon="🎭" color="bg-gradient-to-br from-purple-500 to-pink-600" description="Kültür ve toplum bilgisi" onClick={() => setMode(GameMode.SOCIAL_STUDIES)} />
            </div>
          </div>
        );

      // SOCIAL STUDIES TOPIC QUESTION TYPE SELECTION MENU
      case GameMode.SOCIAL_STUDIES:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.SOCIAL_STUDIES_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Sosyal Bilgiler</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('history'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('history'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('history'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('history'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.SOCIAL_STUDIES_GAME_AREA:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.SOCIAL_STUDIES_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Sosyal Bilgiler Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Sınıfını seç, oyunlarla sosyal bilgiler öğren ve eğlen!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard
                title="4. SINIF"
                icon="4️⃣"
                color="from-purple-500 to-pink-600"
                description="Birey, Toplum, Kültür"
                onClick={() => setMode(GameMode.SOCIAL_STUDIES_GAME_GRADE_4)}
              />
              <GameCard
                title="5. SINIF"
                icon="5️⃣"
                color="from-cyan-500 to-teal-600"
                description="Türkiye, Coğrafya, Tarih"
                onClick={() => setMode(GameMode.SOCIAL_STUDIES_GAME_GRADE_5)}
              />
              <GameCard
                title="6. SINIF"
                icon="6️⃣"
                color="from-yellow-500 to-amber-600"
                description="Demokrasi, Ekonomi, Dünya"
                onClick={() => setMode(GameMode.SOCIAL_STUDIES_GAME_GRADE_6)}
              />
              <GameCard
                title="7. SINIF"
                icon="7️⃣"
                color="from-violet-500 to-purple-600"
                description="İletişim, Teknoloji, Küresel"
                onClick={() => setMode(GameMode.SOCIAL_STUDIES_GAME_GRADE_7)}
              />
            </div>
          </div>
        );

      case GameMode.SOCIAL_STUDIES_GAME_GRADE_4:
      case GameMode.SOCIAL_STUDIES_GAME_GRADE_5:
      case GameMode.SOCIAL_STUDIES_GAME_GRADE_6:
      case GameMode.SOCIAL_STUDIES_GAME_GRADE_7:
        const socialGradeNum = mode === GameMode.SOCIAL_STUDIES_GAME_GRADE_4 ? 4 :
          mode === GameMode.SOCIAL_STUDIES_GAME_GRADE_5 ? 5 :
            mode === GameMode.SOCIAL_STUDIES_GAME_GRADE_6 ? 6 : 7;

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.SOCIAL_STUDIES_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">{socialGradeNum}. Sınıf Sosyal Bilgiler Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Tarih ve coğrafya oyunlarıyla öğren ve eğlen!
              </p>
            </div>

            {/* Yakında Eklenecek Mesajı */}
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-8xl mb-6 animate-bounce">🚀</div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4">Yakında Geliyor!</h3>
                <p className="text-white/70 text-lg md:text-xl font-semibold max-w-md mx-auto">
                  {socialGradeNum}. sınıf Sosyal Bilgiler oyunları üzerinde çalışıyoruz. Çok yakında burada olacak!
                </p>
              </div>
            </div>
          </div>
        );

      case GameMode.ENGLISH_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-8">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">🇬🇧 İngilizce Üssü</h2>
              <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">Learn English with fun! İngilizce öğrenmeye hazır mısın?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-32 max-w-7xl mx-auto">
              <button
                onClick={() => alert("Öğren bölümü yakında eklenecek!")}
                className="group bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎯</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">ÖĞREN</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">İngilizce konularını keşfet!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎯</div>
              </button>

              <button
                onClick={() => setMode(GameMode.ENGLISH_PRACTICE_MENU)}
                className="group bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">✏️</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">PRATİK YAP</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Alıştırmalarla pekiştir!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">✏️</div>
              </button>

              <button
                onClick={() => setMode(GameMode.ENGLISH_GAME_AREA)}
                className="group bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎮</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">OYUN ALANI</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">İngilizce oyunlarıyla eğlen!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎮</div>
              </button>
            </div>
          </div>
        );

      case GameMode.ENGLISH_PRACTICE_MENU:

        let englishCards = [];
        if (stats.gradeLevel === 2) {
          englishCards = [
            { mode: GameMode.ENGLISH_COMMUNICATION, title: "Temel İletişim", desc: "Greetings, Introducing oneself, Classroom language.", icon: "👋" },
            { mode: GameMode.ENGLISH_DAILY_LIFE, title: "Günlük Hayat", desc: "Numbers, Colors, Family members, Toys, Body parts.", icon: "🏠" },
            { mode: GameMode.ENGLISH_EXPRESSIONS, title: "Basit İfadeler", desc: "Likes / dislikes, Simple questions.", icon: "💬" }
          ];
        } else if (stats.gradeLevel === 3) {
          englishCards = [
            { mode: GameMode.ENGLISH_PERSONAL_INFO, title: "Kişisel Bilgiler", desc: "Introducing yourself, Countries & nationalities.", icon: "🆔" },
            { mode: GameMode.ENGLISH_DAILY_LIFE, title: "Günlük Yaşam", desc: "Daily routines, School subjects, Food & drinks.", icon: "📅" },
            { mode: GameMode.ENGLISH_ENVIRONMENT, title: "Çevre", desc: "Animals, Weather.", icon: "🌳" },
            { mode: GameMode.ENGLISH_LANGUAGE_STRUCTURES, title: "Dil Yapıları", desc: "There is / There are, Can / Can't.", icon: "🛠️" }
          ];
        } else if (stats.gradeLevel === 4) {
          englishCards = [
            { mode: GameMode.ENGLISH_PERSONAL_SOCIAL, title: "Kişisel ve Sosyal Hayat", desc: "Free time activities, Jobs, My day.", icon: "🧑‍🤝‍🧑" },
            { mode: GameMode.ENGLISH_PLACES, title: "Mekân ve Çevre", desc: "Directions, Places in town.", icon: "🗺️" },
            { mode: GameMode.ENGLISH_HEALTH, title: "Sağlık ve Alışkanlıklar", desc: "Healthy habits, Simple advice.", icon: "🍎" },
            { mode: GameMode.ENGLISH_LANGUAGE_STRUCTURES, title: "Dil Yapıları", desc: "Simple Present Tense, Prepositions.", icon: "🛠️" }
          ];
        } else if (stats.gradeLevel === 5) {
          englishCards = [
            { mode: GameMode.ENGLISH_COMMUNICATION, title: "İletişim ve Kimlik", desc: "Hello & introductions, Countries.", icon: "🪪" },
            { mode: GameMode.ENGLISH_DAILY_LIFE, title: "Günlük Hayat", desc: "Daily routines, Hobbies.", icon: "📅" },
            { mode: GameMode.ENGLISH_ENVIRONMENT, title: "Çevre ve Toplum", desc: "Movies, Festivals.", icon: "🎉" },
            { mode: GameMode.ENGLISH_LANGUAGE_STRUCTURES, title: "Dil Yapıları", desc: "Present Simple, Present Continuous.", icon: "🛠️" }
          ];
        } else if (stats.gradeLevel === 6) {
          englishCards = [
            { mode: GameMode.ENGLISH_SOCIAL_LIFE, title: "Sosyal Hayat", desc: "Life, Yummy breakfast, Downtown.", icon: "☕" },
            { mode: GameMode.ENGLISH_PAST_TENSE, title: "Geçmiş Zaman", desc: "Past Simple.", icon: "⏳" },
            { mode: GameMode.ENGLISH_HOLIDAYS, title: "Tatil ve Seyahat", desc: "Holidays, Saving the planet.", icon: "✈️" },
            { mode: GameMode.ENGLISH_HEALTH, title: "Sağlık", desc: "At the doctor's.", icon: "💊" }
          ];
        } else if (stats.gradeLevel === 7) {
          englishCards = [
            { mode: GameMode.ENGLISH_APPEARANCE, title: "Görünüş ve Kişilik", desc: "Appearance & personality.", icon: "🧑‍🎨" },
            { mode: GameMode.ENGLISH_SPORTS, title: "Spor ve Hobiler", desc: "Sports, Hobbies.", icon: "⚽" },
            { mode: GameMode.ENGLISH_ENVIRONMENT, title: "Çevre ve Teknoloji", desc: "Environment, Dreams.", icon: "♻️" },
            { mode: GameMode.ENGLISH_LANGUAGE_STRUCTURES, title: "Dil Yapıları", desc: "Comparatives & superlatives, Past Continuous.", icon: "🛠️" }
          ];
        } else if (stats.gradeLevel === 8) {
          englishCards = [
            { mode: GameMode.ENGLISH_FRIENDSHIP, title: "Arkadaşlık ve İletişim", desc: "Friendship, Communication.", icon: "🤝" },
            { mode: GameMode.ENGLISH_DAILY_LIFE, title: "Günlük Hayat", desc: "Teen life, Cooking.", icon: "🍳" },
            { mode: GameMode.ENGLISH_NATURE, title: "Doğa ve Bilim", desc: "Natural forces, Science.", icon: "🌋" },
            { mode: GameMode.ENGLISH_LANGUAGE_STRUCTURES, title: "Dil Yapıları", desc: "Future forms, Conditional sentences.", icon: "🛠️" }
          ];
        }

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.ENGLISH_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Pratik Yap</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">İngilizce alıştırmalarıyla pratik yap!</p>
              <div className="flex justify-center gap-3">
                <span className="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {englishCards.map((card, idx) => (
                <GameCard key={idx} title={card.title} icon={card.icon} color="bg-gradient-to-br from-violet-600 to-fuchsia-800" description={card.desc} onClick={() => setMode(card.mode)} />
              ))}
            </div>
          </div>
        );

      // ENGLISH TOPIC QUESTION TYPE SELECTION MENUS
      case GameMode.ENGLISH_COMMUNICATION:
      case GameMode.ENGLISH_PERSONAL_INFO:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.ENGLISH_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Communication</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('communication'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('communication'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('communication'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('communication'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.ENGLISH_DAILY_LIFE:
      case GameMode.ENGLISH_PERSONAL_SOCIAL:
      case GameMode.ENGLISH_SOCIAL_LIFE:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.ENGLISH_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Daily Life</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('daily-life'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('daily-life'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('daily-life'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('daily-life'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.ENGLISH_LANGUAGE_STRUCTURES:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.ENGLISH_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Grammar</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('grammar'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('grammar'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('grammar'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('grammar'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.ENGLISH_EXPRESSIONS:
      case GameMode.ENGLISH_PLACES:
      case GameMode.ENGLISH_HEALTH:
      case GameMode.ENGLISH_ENVIRONMENT:
      case GameMode.ENGLISH_PAST_TENSE:
      case GameMode.ENGLISH_HOLIDAYS:
      case GameMode.ENGLISH_APPEARANCE:
      case GameMode.ENGLISH_SPORTS:
      case GameMode.ENGLISH_FRIENDSHIP:
      case GameMode.ENGLISH_NATURE:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.ENGLISH_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Vocabulary</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('vocabulary'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('vocabulary'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('vocabulary'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('vocabulary'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.ENGLISH_GAME_AREA:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.ENGLISH_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Oyun Alanı</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Sınıfını seç ve İngilizce oyunlarıyla eğlen!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard
                title="2. SINIF"
                icon="2️⃣"
                color="from-red-500 to-orange-600"
                description="Greetings, Numbers, Colors"
                onClick={() => setMode(GameMode.ENGLISH_GAME_GRADE_2)}
              />
              <GameCard
                title="3. SINIF"
                icon="3️⃣"
                color="from-orange-500 to-yellow-600"
                description="Family, Animals, School"
                onClick={() => setMode(GameMode.ENGLISH_GAME_GRADE_3)}
              />
              <GameCard
                title="4. SINIF"
                icon="4️⃣"
                color="from-yellow-500 to-green-600"
                description="Daily Life, Places, Health"
                onClick={() => setMode(GameMode.ENGLISH_GAME_GRADE_4)}
              />
              <GameCard
                title="5. SINIF"
                icon="5️⃣"
                color="from-green-500 to-teal-600"
                description="Hobbies, Countries, Festivals"
                onClick={() => setMode(GameMode.ENGLISH_GAME_GRADE_5)}
              />
              <GameCard
                title="6. SINIF"
                icon="6️⃣"
                color="from-teal-500 to-cyan-600"
                description="Past Tense, Holidays, Travel"
                onClick={() => setMode(GameMode.ENGLISH_GAME_GRADE_6)}
              />
              <GameCard
                title="7. SINIF"
                icon="7️⃣"
                color="from-cyan-500 to-blue-600"
                description="Sports, Personality, Environment"
                onClick={() => setMode(GameMode.ENGLISH_GAME_GRADE_7)}
              />
              <GameCard
                title="8. SINIF"
                icon="8️⃣"
                color="from-blue-500 to-purple-600"
                description="Friendship, Nature, Future"
                onClick={() => setMode(GameMode.ENGLISH_GAME_GRADE_8)}
              />
            </div>
          </div>
        );

      case GameMode.ENGLISH_GAME_GRADE_2:
      case GameMode.ENGLISH_GAME_GRADE_3:
      case GameMode.ENGLISH_GAME_GRADE_4:
      case GameMode.ENGLISH_GAME_GRADE_5:
      case GameMode.ENGLISH_GAME_GRADE_6:
      case GameMode.ENGLISH_GAME_GRADE_7:
      case GameMode.ENGLISH_GAME_GRADE_8:
        const englishGradeNum = mode === GameMode.ENGLISH_GAME_GRADE_2 ? 2 :
          mode === GameMode.ENGLISH_GAME_GRADE_3 ? 3 :
            mode === GameMode.ENGLISH_GAME_GRADE_4 ? 4 :
              mode === GameMode.ENGLISH_GAME_GRADE_5 ? 5 :
                mode === GameMode.ENGLISH_GAME_GRADE_6 ? 6 :
                  mode === GameMode.ENGLISH_GAME_GRADE_7 ? 7 : 8;

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.ENGLISH_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">{englishGradeNum}. Sınıf İngilizce</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">İngilizce oyunları çok yakında!</p>
            </div>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
                <div className="text-8xl mb-6">🚧</div>
                <h3 className="text-3xl font-black text-white mb-4">YAKINDA GELİYOR!</h3>
                <p className="text-white/80 text-lg">Bu bölüm üzerinde çalışıyoruz.</p>
              </div>
            </div>
          </div>
        );

      // IT & SOFTWARE MENU (5-6. Sınıf)
      case GameMode.IT_SOFTWARE_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-8">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">Bilişim Teknolojileri ve Yazılım</h2>
              <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">Kodlama ve algoritma dünyasına hoş geldin!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-32 max-w-7xl mx-auto">
              <button
                onClick={() => alert("Öğren bölümü yakında eklenecek!")}
                className="group bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎯</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">ÖĞREN</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Kodlama konularını keşfet!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎯</div>
              </button>

              <button
                onClick={() => setMode(GameMode.IT_SOFTWARE_PRACTICE_MENU)}
                className="group bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">✏️</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">PRATİK YAP</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Alıştırmalarla pekiştir!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">✏️</div>
              </button>

              <button
                onClick={() => setMode(GameMode.IT_SOFTWARE_GAME_AREA)}
                className="group bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎮</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">OYUN ALANI</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Kodlama oyunlarıyla eğlen!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎮</div>
              </button>
            </div>
          </div>
        );

      case GameMode.IT_SOFTWARE_PRACTICE_MENU:
        const itCards = [
          { mode: GameMode.IT_SOFTWARE_ALGORITHMS, title: "Algoritmalar", desc: "Problem çözme ve algoritma tasarımı", icon: "🔄" },
          { mode: GameMode.IT_SOFTWARE_PROGRAMMING, title: "Programlama", desc: "Blok tabanlı ve metin tabanlı kodlama", icon: "💻" },
          { mode: GameMode.IT_SOFTWARE_PROBLEM_SOLVING, title: "Problem Çözme", desc: "Mantıksal düşünme ve çözüm üretme", icon: "🧩" },
          { mode: GameMode.IT_SOFTWARE_COMPUTATIONAL_THINKING, title: "Hesaplamalı Düşünme", desc: "Soyutlama ve örüntü tanıma", icon: "🧠" }
        ];

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.IT_SOFTWARE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Pratik Yap</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Kodlama becerilerini geliştir!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {itCards.map((card, idx) => (
                <GameCard key={idx} title={card.title} icon={card.icon} color="bg-gradient-to-br from-sky-500 to-blue-700" description={card.desc} onClick={() => setMode(card.mode)} />
              ))}
            </div>
          </div>
        );

      // IT SOFTWARE TOPIC QUESTION TYPE SELECTION MENUS
      case GameMode.IT_SOFTWARE_ALGORITHMS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.IT_SOFTWARE_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Algoritmalar</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('algorithms'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('algorithms'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('algorithms'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('algorithms'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.IT_SOFTWARE_PROGRAMMING:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.IT_SOFTWARE_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Programlama</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('programming'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('programming'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('programming'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('programming'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.IT_SOFTWARE_PROBLEM_SOLVING:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.IT_SOFTWARE_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Problem Çözme</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('problem-solving'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('problem-solving'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('problem-solving'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('problem-solving'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.IT_SOFTWARE_COMPUTATIONAL_THINKING:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.IT_SOFTWARE_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Hesaplamalı Düşünme</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('computational-thinking'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('computational-thinking'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('computational-thinking'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('computational-thinking'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.IT_SOFTWARE_GAME_AREA:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.IT_SOFTWARE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Oyun Alanı</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Sınıfını seç ve kodlama oyunlarına başla!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard
                title="5. SINIF"
                icon="5️⃣"
                color="from-sky-500 to-blue-700"
                description="5. sınıf kodlama oyunları"
                onClick={() => setMode(GameMode.IT_SOFTWARE_GAME_GRADE_5)}
              />
              <GameCard
                title="6. SINIF"
                icon="6️⃣"
                color="from-sky-500 to-blue-700"
                description="6. sınıf kodlama oyunları"
                onClick={() => setMode(GameMode.IT_SOFTWARE_GAME_GRADE_6)}
              />
            </div>
          </div>
        );

      case GameMode.IT_SOFTWARE_GAME_GRADE_5:
      case GameMode.IT_SOFTWARE_GAME_GRADE_6:
        const itGradeNum = mode === GameMode.IT_SOFTWARE_GAME_GRADE_5 ? 5 : 6;

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.IT_SOFTWARE_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">{itGradeNum}. Sınıf Bilişim</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Kodlama oyunları çok yakında!</p>
            </div>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
                <div className="text-8xl mb-6">🚧</div>
                <h3 className="text-3xl font-black text-white mb-4">YAKINDA GELİYOR!</h3>
                <p className="text-white/80 text-lg">Bu bölüm üzerinde çalışıyoruz.</p>
              </div>
            </div>
          </div>
        );

      // GERMAN MENU (5-8. Sınıf)
      case GameMode.GERMAN_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">🇩🇪 Almanca Üssü</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Guten Tag! Almanca öğrenmeye hazır mısın?</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <button onClick={() => alert("Öğren bölümü yakında eklenecek!")} className="group bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎯</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">ÖĞREN</h3>
                <p className="text-white/80 text-xs font-medium">Almanca konularını keşfet!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity">🎯</div>
              </button>
              <button onClick={() => setMode(GameMode.GERMAN_PRACTICE_MENU)} className="group bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">✏️</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">PRATİK YAP</h3>
                <p className="text-white/80 text-xs font-medium">Alıştırmalarla pekiştir!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity">✏️</div>
              </button>
              <button onClick={() => setMode(GameMode.GERMAN_GAME_AREA)} className="group bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎮</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">OYUN ALANI</h3>
                <p className="text-white/80 text-xs font-medium">Almanca oyunlarıyla eğlen!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity">🎮</div>
              </button>
            </div>
          </div>
        );

      case GameMode.GERMAN_PRACTICE_MENU:
        const germanCards = [
          { mode: GameMode.GERMAN_BASICS, title: "Temel Almanca", desc: "Selamlaşma, tanışma ve günlük ifadeler", icon: "👋" },
          { mode: GameMode.GERMAN_GRAMMAR, title: "Gramer", desc: "Artikel, fiil çekimleri ve cümle yapısı", icon: "📖" },
          { mode: GameMode.GERMAN_VOCABULARY, title: "Kelime Hazinesi", desc: "Sayılar, renkler, aile ve günlük kelimeler", icon: "📚" },
          { mode: GameMode.GERMAN_CONVERSATION, title: "Konuşma", desc: "Diyaloglar ve günlük konuşmalar", icon: "💬" }
        ];

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.GERMAN_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Pratik Yap</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Almanca becerilerini geliştir!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {germanCards.map((card, idx) => (
                <GameCard key={idx} title={card.title} icon={card.icon} color="bg-gradient-to-br from-yellow-500 to-amber-700" description={card.desc} onClick={() => alert("Yakında eklenecek!")} />
              ))}
            </div>
          </div>
        );

      case GameMode.GERMAN_GAME_AREA:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.GERMAN_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Oyun Alanı</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Sınıfını seç ve Almanca oyunlarına başla!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard
                title="5. SINIF"
                icon="5️⃣"
                color="from-yellow-500 to-amber-700"
                description="5. sınıf Almanca oyunları"
                onClick={() => setMode(GameMode.GERMAN_GAME_GRADE_5)}
              />
              <GameCard
                title="6. SINIF"
                icon="6️⃣"
                color="from-yellow-500 to-amber-700"
                description="6. sınıf Almanca oyunları"
                onClick={() => setMode(GameMode.GERMAN_GAME_GRADE_6)}
              />
              <GameCard
                title="7. SINIF"
                icon="7️⃣"
                color="from-yellow-500 to-amber-700"
                description="7. sınıf Almanca oyunları"
                onClick={() => setMode(GameMode.GERMAN_GAME_GRADE_7)}
              />
              <GameCard
                title="8. SINIF"
                icon="8️⃣"
                color="from-yellow-500 to-amber-700"
                description="8. sınıf Almanca oyunları"
                onClick={() => setMode(GameMode.GERMAN_GAME_GRADE_8)}
              />
            </div>
          </div>
        );

      case GameMode.GERMAN_GAME_GRADE_5:
      case GameMode.GERMAN_GAME_GRADE_6:
      case GameMode.GERMAN_GAME_GRADE_7:
      case GameMode.GERMAN_GAME_GRADE_8:
        const germanGradeNum = mode === GameMode.GERMAN_GAME_GRADE_5 ? 5 :
          mode === GameMode.GERMAN_GAME_GRADE_6 ? 6 :
            mode === GameMode.GERMAN_GAME_GRADE_7 ? 7 : 8;

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.GERMAN_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">{germanGradeNum}. Sınıf Almanca</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Almanca oyunları çok yakında!</p>
            </div>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
                <div className="text-8xl mb-6">🚧</div>
                <h3 className="text-3xl font-black text-white mb-4">YAKINDA GELİYOR!</h3>
                <p className="text-white/80 text-lg">Bu bölüm üzerinde çalışıyoruz.</p>
              </div>
            </div>
          </div>
        );

      // T.C İNKILAP TARİHİ VE ATATÜRKÇÜLÜK (8. Sınıf)
      case GameMode.HISTORY_ATATURK_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">🇹🇷 T.C İnkılap Tarihi ve Atatürkçülük</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Cumhuriyetimizin kuruluşunu ve Atatürk ilkelerini öğren!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <button onClick={() => alert("Öğren bölümü yakında eklenecek!")} className="group bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎯</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">ÖĞREN</h3>
                <p className="text-white/80 text-xs font-medium">Tarih konularını keşfet!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity">🎯</div>
              </button>
              <button onClick={() => setMode(GameMode.HISTORY_ATATURK_PRACTICE_MENU)} className="group bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">✏️</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">PRATİK YAP</h3>
                <p className="text-white/80 text-xs font-medium">Alıştırmalarla pekiştir!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity">✏️</div>
              </button>
              <button onClick={() => setMode(GameMode.HISTORY_ATATURK_GAME_AREA)} className="group bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎮</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">OYUN ALANI</h3>
                <p className="text-white/80 text-xs font-medium">Tarih oyunlarıyla eğlen!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity">🎮</div>
              </button>
            </div>
          </div>
        );

      case GameMode.HISTORY_ATATURK_PRACTICE_MENU:
        const historyCards = [
          { mode: GameMode.HISTORY_ATATURK_NATIONAL_STRUGGLE, title: "Milli Mücadele", desc: "Kurtuluş Savaşı ve Milli Mücadele dönemi", icon: "⚔️" },
          { mode: GameMode.HISTORY_ATATURK_REPUBLIC, title: "Cumhuriyetin İlanı", desc: "Türkiye Cumhuriyeti'nin kuruluşu", icon: "🏛️" },
          { mode: GameMode.HISTORY_ATATURK_REFORMS, title: "Atatürk İlke ve İnkılapları", desc: "Cumhuriyet dönemi reformları", icon: "📜" },
          { mode: GameMode.HISTORY_ATATURK_PRINCIPLES, title: "Atatürk İlkeleri", desc: "Altı ok: Cumhuriyetçilik, Milliyetçilik, Halkçılık...", icon: "🎯" }
        ];

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.HISTORY_ATATURK_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Pratik Yap</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">İnkılap Tarihi bilgini pekiştir!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {historyCards.map((card, idx) => (
                <GameCard key={idx} title={card.title} icon={card.icon} color="bg-gradient-to-br from-red-600 to-red-800" description={card.desc} onClick={() => alert("Yakında eklenecek!")} />
              ))}
            </div>
          </div>
        );

      case GameMode.HISTORY_ATATURK_GAME_AREA:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.HISTORY_ATATURK_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Oyun Alanı</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">İnkılap Tarihi oyunları çok yakında!</p>
            </div>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
                <div className="text-8xl mb-6">🚧</div>
                <h3 className="text-3xl font-black text-white mb-4">YAKINDA GELİYOR!</h3>
                <p className="text-white/80 text-lg">Bu bölüm üzerinde çalışıyoruz.</p>
              </div>
            </div>
          </div>
        );

      case GameMode.PE_MENU:
        const movementDesc = stats.gradeLevel === 1 ? "Temel hareketler, atma-tutma ve denge." :
          stats.gradeLevel === 2 ? "Ritimle hareket ve yön değiştirme." :
            stats.gradeLevel === 3 ? "Spor branşlarına giriş ve kuvvet." : "Stratejik oyunlar ve çeviklik.";
        const healthDesc = stats.gradeLevel === 1 ? "Isınma, hijyen ve güvenli oyun." :
          stats.gradeLevel === 2 ? "Fiziksel etkinlik ve beslenme." :
            stats.gradeLevel === 3 ? "Fiziksel uygunluk ve ilk yardım." : "Yaşamboyu spor ve ekipmanlar.";
        const socialDesc = stats.gradeLevel === 1 ? "Kurallara uyma ve iş birliği." :
          stats.gradeLevel === 2 ? "Takım çalışması ve fair-play." :
            stats.gradeLevel === 3 ? "Liderlik ve problem çözme." : "Rakibe saygı ve adil oyun.";

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Spor Tesisleri</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hareket et, sağlıklı yaşa ve spor yap!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <button onClick={() => alert("Öğren bölümü yakında eklenecek!")} className="group bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎯</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">ÖĞREN</h3>
                <p className="text-white/80 text-xs font-medium">Beden eğitimi konularını keşfet!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity">🎯</div>
              </button>

              <button onClick={() => setMode(GameMode.PE_PRACTICE_MENU)} className="group bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">✏️</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">PRATİK YAP</h3>
                <p className="text-white/80 text-xs font-medium">Alıştırmalarla pekiştir!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity">✏️</div>
              </button>

              <button onClick={() => setMode(GameMode.PE_GAME_AREA)} className="group bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎮</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">OYUN ALANI</h3>
                <p className="text-white/80 text-xs font-medium">Spor oyunlarıyla eğlen!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity">🎮</div>
              </button>
            </div>
          </div>
        );

      case GameMode.PE_PRACTICE_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.PE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Beden Eğitimi Konuları</h2>
              <div className="flex justify-center gap-3">
                <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Hareket Yetkinliği" icon="🏃‍♂️" color="bg-gradient-to-br from-orange-500 to-red-600" description={movementDesc} onClick={() => setMode(GameMode.PE_MOVEMENT)} />
              <GameCard title="Aktif ve Sağlıklı Hayat" icon="🍎" color="bg-gradient-to-br from-emerald-500 to-green-700" description={healthDesc} onClick={() => setMode(GameMode.PE_HEALTHY_LIFE)} />
              <GameCard title="Sosyal ve Duygusal Gelişim" icon="🤝" color="bg-gradient-to-br from-blue-500 to-indigo-700" description={socialDesc} onClick={() => setMode(GameMode.PE_SOCIAL_EMOTIONAL)} />
            </div>
          </div>
        );

      case GameMode.SCIENCE_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-8">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">Bilim Laboratuvarı</h2>
              <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">Bilim dünyasını keşfet, deneyler yap ve eğlen!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-32 max-w-7xl mx-auto">
              <button
                onClick={() => alert("Öğren bölümü yakında eklenecek!")}
                className="group bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎯</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">ÖĞREN</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Bilim konularını keşfet!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎯</div>
              </button>

              <button
                onClick={() => setMode(GameMode.SCIENCE_PRACTICE_MENU)}
                className="group bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">✏️</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">PRATİK YAP</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Alıştırmalarla pekiştir!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">✏️</div>
              </button>

              <button
                onClick={() => setMode(GameMode.SCIENCE_GAME_AREA)}
                className="group bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎮</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">OYUN ALANI</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Bilim oyunlarıyla eğlen!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎮</div>
              </button>
            </div>
          </div>
        );

      case GameMode.SCIENCE_PRACTICE_MENU:
        const lifeDesc = stats.gradeLevel === 1 ? "Çevremizdeki canlılar ve hayvanlar." :
          stats.gradeLevel === 2 ? "Bitki/Hayvan özellikleri ve doğa." :
            stats.gradeLevel === 3 ? "Canlı/cansız varlıklar ve çevre koruma." : "Vücudumuz, besinler ve ekosistem.";
        const matterDesc = stats.gradeLevel === 1 ? "Suda yüzen/batan maddeler." :
          stats.gradeLevel === 2 ? "Esnek, pürüzlü ve sert maddeler." :
            stats.gradeLevel === 3 ? "Maddenin halleri ve özellikleri." : "Isı, sıcaklık ve karışımlar.";
        const physicalDesc = stats.gradeLevel === 1 ? "Basit itme ve çekme hareketleri." :
          stats.gradeLevel === 2 ? "Gölgeler, ışık ve ses kaynakları." :
            stats.gradeLevel === 3 ? "Kuvvet, hareket, ışık ve ses." : "Mıknatıslar ve basit elektrik devresi.";
        const earthDesc = stats.gradeLevel === 1 ? "Güneş, ay ve bulutlar." :
          stats.gradeLevel === 2 ? "Dünyanın şekli ve mevsimler." :
            stats.gradeLevel === 3 ? "Dünya'nın yapısı, Güneş ve Ay." : "Yer kabuğu, kayaçlar ve doğal afetler.";

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.SCIENCE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Fen Bilgisi Konuları</h2>
              <div className="flex justify-center gap-3">
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Canlılar ve Yaşam" icon="🌿" color="bg-gradient-to-br from-lime-500 to-green-600" description={lifeDesc} onClick={() => setMode(GameMode.SCIENCE_LIFE)} />
              <GameCard title="Madde ve Doğası" icon="🧊" color="bg-gradient-to-br from-cyan-500 to-blue-600" description={matterDesc} onClick={() => setMode(GameMode.SCIENCE_MATTER)} />
              <GameCard title="Fiziksel Olaylar" icon="⚡" color="bg-gradient-to-br from-amber-500 to-orange-600" description={physicalDesc} onClick={() => setMode(GameMode.SCIENCE_PHYSICAL)} />
              <GameCard title="Dünya ve Evren" icon="🌍" color="bg-gradient-to-br from-indigo-500 to-purple-700" description={earthDesc} onClick={() => setMode(GameMode.SCIENCE_EARTH)} />
            </div>
          </div>
        );

      // SCIENCE TOPIC QUESTION TYPE SELECTION MENUS
      case GameMode.SCIENCE_LIFE:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.SCIENCE_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Canlılar ve Yaşam</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('life'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('life'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('life'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('life'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.SCIENCE_MATTER:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.SCIENCE_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Madde ve Doğası</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('matter'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('matter'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('matter'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('matter'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.SCIENCE_PHYSICAL:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.SCIENCE_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Fiziksel Olaylar</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('physical'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('physical'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('physical'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('physical'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.SCIENCE_EARTH:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.SCIENCE_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Dünya ve Evren</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('earth'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('earth'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('earth'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('earth'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.SCIENCE_GAME_AREA:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.SCIENCE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Fen Bilgisi Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Sınıfını seç, oyunlarla fen bilgisi öğren ve eğlen!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard
                title="3. SINIF"
                icon="3️⃣"
                color="from-orange-500 to-red-600"
                description="Canlılar, Madde, Dünya"
                onClick={() => setMode(GameMode.SCIENCE_GAME_GRADE_3)}
              />
              <GameCard
                title="4. SINIF"
                icon="4️⃣"
                color="from-purple-500 to-pink-600"
                description="Kuvvet, Işık, Ses"
                onClick={() => setMode(GameMode.SCIENCE_GAME_GRADE_4)}
              />
              <GameCard
                title="5. SINIF"
                icon="5️⃣"
                color="from-cyan-500 to-teal-600"
                description="Hücre, Elektrik, Güneş Sistemi"
                onClick={() => setMode(GameMode.SCIENCE_GAME_GRADE_5)}
              />
              <GameCard
                title="6. SINIF"
                icon="6️⃣"
                color="from-yellow-500 to-amber-600"
                description="Vücut, Enerji, Madde"
                onClick={() => setMode(GameMode.SCIENCE_GAME_GRADE_6)}
              />
              <GameCard
                title="7. SINIF"
                icon="7️⃣"
                color="from-violet-500 to-purple-600"
                description="DNA, Kimya, Fizik"
                onClick={() => setMode(GameMode.SCIENCE_GAME_GRADE_7)}
              />
              <GameCard
                title="8. SINIF"
                icon="8️⃣"
                color="from-lime-500 to-green-600"
                description="Atom, Ekosistem, Evren"
                onClick={() => setMode(GameMode.SCIENCE_GAME_GRADE_8)}
              />
            </div>
          </div>
        );

      case GameMode.RELIGION_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-8">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">Erdem Akademisi</h2>
              <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">Din Kültürü ve Ahlak Bilgisi öğrenmeye hazır mısın?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-32 max-w-7xl mx-auto">
              <button
                onClick={() => alert("Öğren bölümü yakında eklenecek!")}
                className="group bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎯</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">ÖĞREN</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Din Kültürü konularını keşfet!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎯</div>
              </button>

              <button
                onClick={() => setMode(GameMode.RELIGION_PRACTICE_MENU)}
                className="group bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">✏️</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">PRATİK YAP</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Alıştırmalarla pekiştir!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">✏️</div>
              </button>

              <button
                onClick={() => setMode(GameMode.RELIGION_GAME_AREA)}
                className="group bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎮</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">OYUN ALANI</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Din Kültürü oyunlarıyla eğlen!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎮</div>
              </button>
            </div>
          </div>
        );

      case GameMode.RELIGION_PRACTICE_MENU:
        const beliefDesc = stats.gradeLevel <= 3 ? "Allah inancı ve sevgi." :
          stats.gradeLevel === 4 ? "Allah'ın varlığı ve Esmaül Hüsna." :
            stats.gradeLevel === 5 ? "İmanın şartları ve melekler." :
              stats.gradeLevel === 6 ? "Peygamberlere ve kitaplara iman." :
                stats.gradeLevel === 7 ? "Melek ve Ahiret inancı." : "Kader ve kaza inancı.";
        const worshipDesc = stats.gradeLevel <= 3 ? "Duanın anlamı ve şükür." :
          stats.gradeLevel === 4 ? "Namaz, dua ve ibadetin anlamı." :
            stats.gradeLevel === 5 ? "Namaz, oruç ve faydaları." :
              stats.gradeLevel === 6 ? "Zekat, hac ve toplumsal yönü." :
                stats.gradeLevel === 7 ? "İslam düşüncesinde yorumlar." : "Zekat, sadaka ve yardımlaşma.";
        const prophetDesc = stats.gradeLevel <= 3 ? "Peygamberimizin merhameti." :
          stats.gradeLevel === 4 ? "Peygamberimizin hayatı ve kişiliği." :
            stats.gradeLevel === 5 ? "Çocukluk dönemi ve peygamberlik." :
              stats.gradeLevel === 6 ? "Ahlaki özellikleri ve ilişkileri." :
                stats.gradeLevel === 7 ? "Mekke/Medine dönemi ve hicret." : "Liderlik özellikleri ve mesajı.";
        const quranDesc = stats.gradeLevel <= 3 ? "Kuran'daki güzel öğütler." :
          stats.gradeLevel === 4 ? "Kuran nedir? Temel ahlaki öğütler." :
            stats.gradeLevel === 5 ? "Kuran'ın temel konuları." :
              stats.gradeLevel === 6 ? "Sabır, şükür ve tevekkül." :
                stats.gradeLevel === 7 ? "Din ve güzel ahlak ilkeleri." : "Din-bilim ilişkisi ve ahlak.";
        const moralsDesc = stats.gradeLevel <= 3 ? "Saygı, sevgi, dürüstlük." :
          stats.gradeLevel === 4 ? "Doğruluk, yardımseverlik ve saygı." :
            stats.gradeLevel === 5 ? "Sorumluluk ve adalet." :
              stats.gradeLevel === 6 ? "Kul hakkı, hoşgörü ve empati." :
                stats.gradeLevel === 7 ? "Toplumsal değerler ve ilkeler." : "Küresel sorunlar ve bilincimiz.";

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.RELIGION_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Pratik Yap</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Din Kültürü alıştırmalarıyla pratik yap!</p>
              <div className="flex justify-center gap-3">
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="İnanç Esasları" icon="🤲" color="bg-gradient-to-br from-cyan-500 to-blue-600" description={beliefDesc} onClick={() => setMode(GameMode.RELIGION_BELIEF)} />
              <GameCard title="İbadetler" icon="🕌" color="bg-gradient-to-br from-emerald-500 to-teal-600" description={worshipDesc} onClick={() => setMode(GameMode.RELIGION_WORSHIP)} />
              <GameCard title="Hz. Muhammed" icon="🕋" color="bg-gradient-to-br from-amber-500 to-orange-600" description={prophetDesc} onClick={() => setMode(GameMode.RELIGION_PROPHET)} />
              <GameCard title="Kur'an-ı Kerim" icon="📖" color="bg-gradient-to-br from-indigo-500 to-purple-600" description={quranDesc} onClick={() => setMode(GameMode.RELIGION_QURAN)} />
              <GameCard title="Ahlak ve Değerler" icon="🤝" color="bg-gradient-to-br from-rose-500 to-red-600" description={moralsDesc} onClick={() => setMode(GameMode.RELIGION_MORALS)} />
            </div>
          </div>
        );

      // RELIGION TOPIC QUESTION TYPE SELECTION MENUS
      case GameMode.RELIGION_BELIEF:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.RELIGION_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">İnanç Esasları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('belief'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('belief'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('belief'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('belief'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.RELIGION_WORSHIP:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.RELIGION_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">İbadetler</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('worship'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('worship'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('worship'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('worship'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.RELIGION_PROPHET:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.RELIGION_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Hz. Muhammed</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('prophet'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('prophet'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('prophet'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('prophet'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.RELIGION_QURAN:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.RELIGION_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Kur'an-ı Kerim</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('quran'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('quran'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('quran'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('quran'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.RELIGION_MORALS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.RELIGION_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Ahlak ve Değerler</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('morals'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('morals'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('morals'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('morals'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // HAYAT BİLGİSİ - Okulumuzda Hayat
      case GameMode.LIFE_SCIENCE_SCHOOL:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.LIFE_SCIENCE_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-indigo-400 italic drop-shadow-2xl mb-4 uppercase">🏫 Okulumuzda Hayat</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Okul hayatı ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('school'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Okul kuralları ve arkadaşlık sorularını tamamla!" onClick={() => { setCurrentTopic('school'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Okul hayatı problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('school'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('school'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // HAYAT BİLGİSİ - Evimizde Hayat
      case GameMode.LIFE_SCIENCE_HOME:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.LIFE_SCIENCE_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-rose-400 italic drop-shadow-2xl mb-4 uppercase">🏠 Evimizde Hayat</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Ev hayatı ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('home'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Aile ve ev görevleri sorularını tamamla!" onClick={() => { setCurrentTopic('home'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Ev hayatı problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('home'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('home'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // HAYAT BİLGİSİ - Sağlıklı Hayat
      case GameMode.LIFE_SCIENCE_HEALTH:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.LIFE_SCIENCE_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-emerald-400 italic drop-shadow-2xl mb-4 uppercase">🍎 Sağlıklı Hayat</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Sağlık ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('health'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Sağlıklı yaşam sorularını tamamla!" onClick={() => { setCurrentTopic('health'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Sağlık problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('health'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('health'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // HAYAT BİLGİSİ - Güvenli Hayat
      case GameMode.LIFE_SCIENCE_SAFE:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.LIFE_SCIENCE_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-amber-400 italic drop-shadow-2xl mb-4 uppercase">🦺 Güvenli Hayat</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Güvenlik ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('safe'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Güvenlik kuralları sorularını tamamla!" onClick={() => { setCurrentTopic('safe'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Güvenlik problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('safe'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('safe'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // HAYAT BİLGİSİ - Ülkemizde Hayat
      case GameMode.LIFE_SCIENCE_COUNTRY:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.LIFE_SCIENCE_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-cyan-400 italic drop-shadow-2xl mb-4 uppercase">🇹🇷 Ülkemizde Hayat</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Ülke ve kültür ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('country'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Milli değerler sorularını tamamla!" onClick={() => { setCurrentTopic('country'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Ülke ve kültür problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('country'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('country'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // BEDEN EĞİTİMİ - Hareket Yetkinliği
      case GameMode.PE_MOVEMENT:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.PE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-orange-400 italic drop-shadow-2xl mb-4 uppercase">🏃‍♂️ Hareket Yetkinliği</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Hareket ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('movement'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Hareket becerileri sorularını tamamla!" onClick={() => { setCurrentTopic('movement'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Hareket problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('movement'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('movement'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // BEDEN EĞİTİMİ - Aktif ve Sağlıklı Hayat
      case GameMode.PE_HEALTHY_LIFE:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.PE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-emerald-400 italic drop-shadow-2xl mb-4 uppercase">🍎 Aktif ve Sağlıklı Hayat</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Sağlıklı yaşam ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('healthy-life'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Sağlık ve spor sorularını tamamla!" onClick={() => { setCurrentTopic('healthy-life'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Sağlıklı yaşam problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('healthy-life'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('healthy-life'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // BEDEN EĞİTİMİ - Sosyal ve Duygusal Gelişim
      case GameMode.PE_SOCIAL_EMOTIONAL:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.PE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-blue-400 italic drop-shadow-2xl mb-4 uppercase">🤝 Sosyal ve Duygusal Gelişim</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Sosyal beceri ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('social-emotional'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Takım çalışması sorularını tamamla!" onClick={() => { setCurrentTopic('social-emotional'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Sosyal gelişim problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('social-emotional'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('social-emotional'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // GÖRSEL SANATLAR - Görsel İletişim ve Biçimlendirme
      case GameMode.ART_VISUAL_COMMUNICATION:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.ART_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-pink-400 italic drop-shadow-2xl mb-4 uppercase">🎨 Görsel İletişim</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Görsel sanat ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('visual-communication'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Sanat teknikleri sorularını tamamla!" onClick={() => { setCurrentTopic('visual-communication'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Görsel sanat problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('visual-communication'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('visual-communication'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // GÖRSEL SANATLAR - Kültürel Miras
      case GameMode.ART_CULTURAL_HERITAGE:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.ART_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-amber-400 italic drop-shadow-2xl mb-4 uppercase">🏛️ Kültürel Miras</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Kültürel miras ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('cultural-heritage'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Sanat tarihi sorularını tamamla!" onClick={() => { setCurrentTopic('cultural-heritage'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Kültürel miras problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('cultural-heritage'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('cultural-heritage'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // GÖRSEL SANATLAR - Eleştiri ve Estetik
      case GameMode.ART_CRITICISM_AESTHETICS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.ART_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-purple-400 italic drop-shadow-2xl mb-4 uppercase">🖼️ Eleştiri ve Estetik</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Sanat eleştirisi ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('criticism-aesthetics'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Estetik sorularını tamamla!" onClick={() => { setCurrentTopic('criticism-aesthetics'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Sanat eleştirisi problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('criticism-aesthetics'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('criticism-aesthetics'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // MÜZİK MENÜSÜ
      case GameMode.MUSIC_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-8">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">Müzik Dünyası</h2>
              <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">Notalar, ritimler ve melodilerle müzik yolculuğuna çık!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-32 max-w-7xl mx-auto">
              <button
                onClick={() => alert("Öğren bölümü yakında eklenecek!")}
                className="group bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎯</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">ÖĞREN</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Müzik teorisini keşfet!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎯</div>
              </button>

              <button
                onClick={() => setMode(GameMode.MUSIC_PRACTICE_MENU)}
                className="group bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">✏️</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">PRATİK YAP</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Alıştırmalarla pekiştir!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">✏️</div>
              </button>

              <button
                onClick={() => setMode(GameMode.MUSIC_GAME_AREA)}
                className="group bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎮</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">OYUN ALANI</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Müzik oyunlarıyla eğlen!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎮</div>
              </button>
            </div>
          </div>
        );

      // MÜZİK PRATİK YAP MENÜSÜ
      case GameMode.MUSIC_PRACTICE_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MUSIC_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Müzik Konuları</h2>
              <div className="flex justify-center gap-3">
                <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Müzik Teorisi" icon="🎼" color="bg-gradient-to-br from-indigo-500 to-purple-600" description="Notalar, ritim ve melodi" onClick={() => setMode(GameMode.MUSIC_THEORY)} />
            </div>
          </div>
        );

      // MÜZİK OYUN ALANI
      case GameMode.MUSIC_GAME_AREA:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MUSIC_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Müzik Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Sınıfını seç, oyunlarla müzik öğren ve eğlen!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard
                title="1. SINIF"
                icon="1️⃣"
                color="from-indigo-500 to-purple-600"
                description="Ritim ve Melodi"
                onClick={() => setMode(GameMode.MUSIC_GAME_GRADE_1)}
              />
              <GameCard
                title="2. SINIF"
                icon="2️⃣"
                color="from-violet-500 to-fuchsia-600"
                description="Notalar ve Sesler"
                onClick={() => setMode(GameMode.MUSIC_GAME_GRADE_2)}
              />
              <GameCard
                title="3. SINIF"
                icon="3️⃣"
                color="from-purple-500 to-pink-600"
                description="Müzik Aletleri"
                onClick={() => setMode(GameMode.MUSIC_GAME_GRADE_3)}
              />
              <GameCard
                title="4. SINIF"
                icon="4️⃣"
                color="from-blue-500 to-indigo-600"
                description="Türk Müziği"
                onClick={() => setMode(GameMode.MUSIC_GAME_GRADE_4)}
              />
              <GameCard
                title="5. SINIF"
                icon="5️⃣"
                color="from-cyan-500 to-blue-600"
                description="Dünya Müziği"
                onClick={() => setMode(GameMode.MUSIC_GAME_GRADE_5)}
              />
              <GameCard
                title="6. SINIF"
                icon="6️⃣"
                color="from-teal-500 to-cyan-600"
                description="Müzik Tarihi"
                onClick={() => setMode(GameMode.MUSIC_GAME_GRADE_6)}
              />
              <GameCard
                title="7. SINIF"
                icon="7️⃣"
                color="from-pink-500 to-rose-600"
                description="Beste ve Armoni"
                onClick={() => setMode(GameMode.MUSIC_GAME_GRADE_7)}
              />
              <GameCard
                title="8. SINIF"
                icon="8️⃣"
                color="from-fuchsia-500 to-purple-600"
                description="Müzik Kültürü"
                onClick={() => setMode(GameMode.MUSIC_GAME_GRADE_8)}
              />
            </div>
          </div>
        );

      // MÜZİK SINIF OYUNLARI
      case GameMode.MUSIC_GAME_GRADE_1:
      case GameMode.MUSIC_GAME_GRADE_2:
      case GameMode.MUSIC_GAME_GRADE_3:
      case GameMode.MUSIC_GAME_GRADE_4:
      case GameMode.MUSIC_GAME_GRADE_5:
      case GameMode.MUSIC_GAME_GRADE_6:
      case GameMode.MUSIC_GAME_GRADE_7:
      case GameMode.MUSIC_GAME_GRADE_8:
        const musicGradeNum = mode === GameMode.MUSIC_GAME_GRADE_1 ? 1 :
          mode === GameMode.MUSIC_GAME_GRADE_2 ? 2 :
            mode === GameMode.MUSIC_GAME_GRADE_3 ? 3 :
              mode === GameMode.MUSIC_GAME_GRADE_4 ? 4 :
                mode === GameMode.MUSIC_GAME_GRADE_5 ? 5 :
                  mode === GameMode.MUSIC_GAME_GRADE_6 ? 6 :
                    mode === GameMode.MUSIC_GAME_GRADE_7 ? 7 : 8;

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MUSIC_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">{musicGradeNum}. Sınıf Müzik Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Müzik oyunlarıyla öğren ve eğlen!
              </p>
            </div>

            {/* Yakında Eklenecek Mesajı */}
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-8xl mb-6 animate-bounce">🎵</div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4">Yakında Geliyor!</h3>
                <p className="text-white/70 text-lg md:text-xl font-semibold max-w-md mx-auto">
                  {musicGradeNum}. sınıf Müzik oyunları üzerinde çalışıyoruz. Çok yakında burada olacak!
                </p>
              </div>
            </div>
          </div>
        );

      // MÜZİK TEORİSİ - Soru Tipi Seçimi
      case GameMode.MUSIC_THEORY:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MUSIC_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-indigo-400 italic drop-shadow-2xl mb-4 uppercase">🎼 Müzik Teorisi</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('music-theory'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('music-theory'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('music-theory'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('music-theory'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // MÜZİK - Eski case (geriye dönük uyumluluk için)
      case GameMode.MUSIC:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-indigo-400 italic drop-shadow-2xl mb-4 uppercase">🎵 Müzik</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Müzik ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('music-theory'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Müzik teorisi sorularını tamamla!" onClick={() => { setCurrentTopic('music-theory'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Müzik problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('music-theory'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('music-theory'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // SATRANÇ MENÜSÜ
      case GameMode.CHESS_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-8">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">♟️ Satranç Akademisi</h2>
              <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">Strateji kur, taktik öğren ve şah mat yap!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-32 max-w-7xl mx-auto">
              <button
                onClick={() => alert("Öğren bölümü yakında eklenecek!")}
                className="group bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎯</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">ÖĞREN</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Satranç konularını keşfet!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎯</div>
              </button>

              <button
                onClick={() => setMode(GameMode.CHESS_PRACTICE_MENU)}
                className="group bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">✏️</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">PRATİK YAP</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Alıştırmalarla pekiştir!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">✏️</div>
              </button>

              <button
                onClick={() => setMode(GameMode.CHESS_GAME_AREA)}
                className="group bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎮</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">OYUN ALANI</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Satranç oyunlarıyla eğlen!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎮</div>
              </button>
            </div>
          </div>
        );

      case GameMode.CHESS_PRACTICE_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.CHESS_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Satranç Konuları</h2>
              <div className="flex justify-center gap-3">
                <span className="bg-slate-500/20 text-slate-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Temel Bilgiler" icon="♟️" color="bg-gradient-to-br from-slate-600 to-zinc-800" description="Taşların hareketi ve kurallar" onClick={() => setMode(GameMode.CHESS_BASICS)} />
              <GameCard title="Taktikler" icon="⚔️" color="bg-gradient-to-br from-red-600 to-rose-800" description="Çatal, şiş ve keşif" onClick={() => setMode(GameMode.CHESS_TACTICS)} />
              <GameCard title="Strateji" icon="🎯" color="bg-gradient-to-br from-blue-600 to-indigo-800" description="Açılışlar ve orta oyun" onClick={() => setMode(GameMode.CHESS_STRATEGY)} />
              <GameCard title="Son Oyun" icon="👑" color="bg-gradient-to-br from-amber-600 to-yellow-800" description="Mat teknikleri" onClick={() => setMode(GameMode.CHESS_ENDGAME)} />
            </div>
          </div>
        );

      // SATRANÇ TOPIC QUESTION TYPE SELECTION MENUS
      case GameMode.CHESS_BASICS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.CHESS_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Temel Bilgiler</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-slate-500/20 text-slate-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('chess-basics'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('chess-basics'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('chess-basics'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('chess-basics'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.CHESS_TACTICS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.CHESS_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Taktikler</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-slate-500/20 text-slate-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('chess-tactics'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('chess-tactics'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('chess-tactics'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('chess-tactics'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.CHESS_STRATEGY:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.CHESS_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Strateji</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-slate-500/20 text-slate-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('chess-strategy'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('chess-strategy'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('chess-strategy'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('chess-strategy'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.CHESS_ENDGAME:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.CHESS_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Son Oyun</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Soru tipini seç ve pratik yapmaya başla!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-slate-500/20 text-slate-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="✅❌ Doğru Yanlış" icon="✅" color="bg-gradient-to-br from-green-500 to-emerald-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('chess-endgame'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="📝 Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('chess-endgame'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="📚 Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="8 soru, 15 puan" onClick={() => { setCurrentTopic('chess-endgame'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="📋 Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-orange-600" description="10 soru, 10 puan" onClick={() => { setCurrentTopic('chess-endgame'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.CHESS_GAME_AREA:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.CHESS_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Satranç Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Satranç oyna ve becerilerini geliştir!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="İki Kişilik Satranç" icon="♟️" color="bg-gradient-to-br from-slate-600 to-zinc-800" description="Arkadaşınla satranç oyna!" onClick={() => setMode(GameMode.TWO_PLAYER_CHESS)} />
              <GameCard title="Bilgisayara Karşı" icon="🤖" color="bg-gradient-to-br from-blue-600 to-indigo-800" description="Yakında eklenecek!" onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.RELIGION_GAME_AREA:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.RELIGION_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Oyun Alanı</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Sınıfını seç ve Din Kültürü oyunlarıyla eğlen!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard
                title="4. SINIF"
                icon="4️⃣"
                color="from-yellow-500 to-green-600"
                description="İnanç, İbadet, Ahlak"
                onClick={() => setMode(GameMode.RELIGION_GAME_GRADE_4)}
              />
              <GameCard
                title="5. SINIF"
                icon="5️⃣"
                color="from-green-500 to-teal-600"
                description="İman, Namaz, Oruç"
                onClick={() => setMode(GameMode.RELIGION_GAME_GRADE_5)}
              />
              <GameCard
                title="6. SINIF"
                icon="6️⃣"
                color="from-teal-500 to-cyan-600"
                description="Peygamberler, Kitaplar"
                onClick={() => setMode(GameMode.RELIGION_GAME_GRADE_6)}
              />
              <GameCard
                title="7. SINIF"
                icon="7️⃣"
                color="from-cyan-500 to-blue-600"
                description="Ahiret, İslam Düşüncesi"
                onClick={() => setMode(GameMode.RELIGION_GAME_GRADE_7)}
              />
              <GameCard
                title="8. SINIF"
                icon="8️⃣"
                color="from-blue-500 to-purple-600"
                description="Kader, Toplum, Değerler"
                onClick={() => setMode(GameMode.RELIGION_GAME_GRADE_8)}
              />
            </div>
          </div>
        );

      case GameMode.RELIGION_GAME_GRADE_4:
      case GameMode.RELIGION_GAME_GRADE_5:
      case GameMode.RELIGION_GAME_GRADE_6:
      case GameMode.RELIGION_GAME_GRADE_7:
      case GameMode.RELIGION_GAME_GRADE_8:
        const religionGradeNum = mode === GameMode.RELIGION_GAME_GRADE_4 ? 4 :
          mode === GameMode.RELIGION_GAME_GRADE_5 ? 5 :
            mode === GameMode.RELIGION_GAME_GRADE_6 ? 6 :
              mode === GameMode.RELIGION_GAME_GRADE_7 ? 7 : 8;

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.RELIGION_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">{religionGradeNum}. Sınıf Din Kültürü</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">Din Kültürü oyunları çok yakında!</p>
            </div>
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
                <div className="text-8xl mb-6">🚧</div>
                <h3 className="text-3xl font-black text-white mb-4">YAKINDA GELİYOR!</h3>
                <p className="text-white/80 text-lg">Bu bölüm üzerinde çalışıyoruz.</p>
              </div>
            </div>
          </div>
        );

      case GameMode.ART_MENU:
        const visualDesc = stats.gradeLevel === 1 ? "Çizgi çalışmaları ve renkleri tanıma." :
          stats.gradeLevel === 2 ? "Ana/ara renkler ve doku çalışmaları." :
            stats.gradeLevel === 3 ? "Perspektif ve ışık-gölge." : "Grafik ve üç boyutlu tasarımlar.";
        const culturalDesc = stats.gradeLevel === 1 ? "Geleneksel sanatlara giriş." :
          stats.gradeLevel === 2 ? "El sanatları ve sanatçı tanıma." :
            stats.gradeLevel === 3 ? "Müze bilinci ve sanat eserleri." : "Kültürel miras ve ebru/hat tnaıma.";
        const criticismDesc = stats.gradeLevel === 1 ? "Yapılan resmi anlatma ve duygular." :
          stats.gradeLevel === 2 ? "Görseli yorumlama ve estetik." :
            stats.gradeLevel === 3 ? "Sanat eserini analiz etme." : "Sanat akımları ve eleştirel analiz.";

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-8">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">Sanat Atölyesi</h2>
              <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">Sanatı keşfet, yaratıcılığını geliştir!</p>
              <div className="flex justify-center gap-3">
                <span className="bg-fuchsia-500/20 text-fuchsia-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-32 max-w-7xl mx-auto">
              <button
                onClick={() => alert("Öğren bölümü yakında eklenecek!")}
                className="group bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎯</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">ÖĞREN</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Görsel sanatlar konularını keşfet!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎯</div>
              </button>

              <button
                onClick={() => setMode(GameMode.ART_PRACTICE_MENU)}
                className="group bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">✏️</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">PRATİK YAP</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Alıştırmalarla pekiştir!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">✏️</div>
              </button>

              <button
                onClick={() => setMode(GameMode.ART_GAME_AREA)}
                className="group bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎮</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">OYUN ALANI</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Sanat oyunlarıyla eğlen!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎮</div>
              </button>
            </div>
          </div>
        );

      case GameMode.ART_PRACTICE_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.ART_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Görsel Sanatlar Konuları</h2>
              <div className="flex justify-center gap-3">
                <span className="bg-fuchsia-500/20 text-fuchsia-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Görsel İletişim ve Biçimlendirme" icon="🖌️" color="bg-gradient-to-br from-pink-500 to-rose-600" description={visualDesc} onClick={() => setMode(GameMode.ART_VISUAL_COMMUNICATION)} />
              <GameCard title="Kültürel Miras" icon="🏛️" color="bg-gradient-to-br from-amber-500 to-orange-600" description={culturalDesc} onClick={() => setMode(GameMode.ART_CULTURAL_HERITAGE)} />
              <GameCard title="Sanat Eleştirisi ve Estetik" icon="🎨" color="bg-gradient-to-br from-purple-500 to-indigo-600" description={criticismDesc} onClick={() => setMode(GameMode.ART_CRITICISM_AESTHETICS)} />
            </div>
          </div>
        );

      case GameMode.ART_GAME_AREA:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.ART_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Sanat Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Sınıfını seç, oyunlarla sanat öğren ve eğlen!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard
                title="1. SINIF"
                icon="1️⃣"
                color="from-pink-500 to-rose-600"
                description="Renkler ve Şekiller"
                onClick={() => setMode(GameMode.ART_GAME_GRADE_1)}
              />
              <GameCard
                title="2. SINIF"
                icon="2️⃣"
                color="from-fuchsia-500 to-purple-600"
                description="Çizim ve Boyama"
                onClick={() => setMode(GameMode.ART_GAME_GRADE_2)}
              />
              <GameCard
                title="3. SINIF"
                icon="3️⃣"
                color="from-violet-500 to-indigo-600"
                description="Sanat Eserleri"
                onClick={() => setMode(GameMode.ART_GAME_GRADE_3)}
              />
              <GameCard
                title="4. SINIF"
                icon="4️⃣"
                color="from-purple-500 to-pink-600"
                description="Türk Sanatı"
                onClick={() => setMode(GameMode.ART_GAME_GRADE_4)}
              />
              <GameCard
                title="5. SINIF"
                icon="5️⃣"
                color="from-rose-500 to-red-600"
                description="Dünya Sanatı"
                onClick={() => setMode(GameMode.ART_GAME_GRADE_5)}
              />
              <GameCard
                title="6. SINIF"
                icon="6️⃣"
                color="from-amber-500 to-orange-600"
                description="Sanat Tarihi"
                onClick={() => setMode(GameMode.ART_GAME_GRADE_6)}
              />
              <GameCard
                title="7. SINIF"
                icon="7️⃣"
                color="from-orange-500 to-red-600"
                description="Tasarım ve Estetik"
                onClick={() => setMode(GameMode.ART_GAME_GRADE_7)}
              />
              <GameCard
                title="8. SINIF"
                icon="8️⃣"
                color="from-red-500 to-rose-600"
                description="Sanat Eleştirisi"
                onClick={() => setMode(GameMode.ART_GAME_GRADE_8)}
              />
            </div>
          </div>
        );

      // GÖRSEL SANATLAR SINIF OYUNLARI
      case GameMode.ART_GAME_GRADE_1:
      case GameMode.ART_GAME_GRADE_2:
      case GameMode.ART_GAME_GRADE_3:
      case GameMode.ART_GAME_GRADE_4:
      case GameMode.ART_GAME_GRADE_5:
      case GameMode.ART_GAME_GRADE_6:
      case GameMode.ART_GAME_GRADE_7:
      case GameMode.ART_GAME_GRADE_8:
        const artGradeNum = mode === GameMode.ART_GAME_GRADE_1 ? 1 :
          mode === GameMode.ART_GAME_GRADE_2 ? 2 :
            mode === GameMode.ART_GAME_GRADE_3 ? 3 :
              mode === GameMode.ART_GAME_GRADE_4 ? 4 :
                mode === GameMode.ART_GAME_GRADE_5 ? 5 :
                  mode === GameMode.ART_GAME_GRADE_6 ? 6 :
                    mode === GameMode.ART_GAME_GRADE_7 ? 7 : 8;

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.ART_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">{artGradeNum}. Sınıf Sanat Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Sanat oyunlarıyla öğren ve eğlen!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Dijital Atölye" icon="🖌️" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Serbestçe çizim yap ve yeteneğini konuştur." onClick={() => setMode(GameMode.ART_DRAWING)} />
              <GameCard title="Hikaye Yazarı" icon="🖋️" color="bg-gradient-to-br from-amber-500 to-orange-600" description="Kendi maceranı yaz ve yaratıcılığını artır." onClick={() => setMode(GameMode.ART_STORY)} />
              <GameCard title="Ritim Ustası" icon="🎵" color="bg-gradient-to-br from-purple-500 to-indigo-600" description="Ritim hafızası ile beyin koordinasyonunu geliştir." onClick={() => setMode(GameMode.ART_RHYTHM)} />
            </div>
          </div>
        );

      case GameMode.LIFE_SCIENCE_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-8">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 uppercase">Yaşam Parkı</h2>
              <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">Hayatı, çevremizi ve kendimizi keşfedelim!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-32 max-w-7xl mx-auto">
              <button
                onClick={() => alert("Öğren bölümü yakında eklenecek!")}
                className="group bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎯</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">ÖĞREN</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Hayat bilgisi konularını keşfet!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎯</div>
              </button>

              <button
                onClick={() => setMode(GameMode.LIFE_SCIENCE_PRACTICE_MENU)}
                className="group bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">✏️</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">PRATİK YAP</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Alıştırmalarla pekiştir!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">✏️</div>
              </button>

              <button
                onClick={() => setMode(GameMode.LIFE_SCIENCE_GAME_AREA)}
                className="group bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎮</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">OYUN ALANI</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Hayat bilgisi oyunlarıyla eğlen!</p>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎮</div>
              </button>
            </div>
          </div>
        );

      case GameMode.LIFE_SCIENCE_PRACTICE_MENU:
        const schoolDesc = stats.gradeLevel === 1 ? "Okul kuralları ve arkadaş ilişkileri." :
          stats.gradeLevel === 2 ? "Okul kuralları ve grup çalışması." : "Hak ve sorumluluklar, demokratik sınıf.";
        const homeDesc = stats.gradeLevel === 1 ? "Aile iletişim ve ev içi görevler." :
          stats.gradeLevel === 2 ? "Aile içi dayanışma ve tasarruf." : "Aile bütçesi ve bilinçli tüketim.";
        const lifeHealthDesc = stats.gradeLevel === 1 ? "Kişisel temizlik ve rutinler." :
          stats.gradeLevel === 2 ? "Sağlıklı beslenme ve spor." : "Fiziksel, ruhsal sağlık ve hijyen.";
        const safeDesc = stats.gradeLevel === 1 ? "Ev/okul güvenliği ve acil durumlar." :
          stats.gradeLevel === 2 ? "Trafik kuralları ve afet bilinci." : "Trafik güvenliği ve afet hazırlığı.";
        const countryDesc = stats.gradeLevel === 1 ? "Milli değerler ve bayramlar." :
          stats.gradeLevel === 2 ? "Kültürel değerler ve milli bayramlar." : "Milli kültür ve toplumsal dayanışma.";

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.LIFE_SCIENCE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Hayat Bilgisi Konuları</h2>
              <div className="flex justify-center gap-3">
                <span className="bg-lime-500/20 text-lime-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Okulumuzda Hayat" icon="🏫" color="bg-gradient-to-br from-indigo-500 to-blue-600" description={schoolDesc} onClick={() => setMode(GameMode.LIFE_SCIENCE_SCHOOL)} />
              <GameCard title="Evimizde Hayat" icon="🏠" color="bg-gradient-to-br from-rose-500 to-red-600" description={homeDesc} onClick={() => setMode(GameMode.LIFE_SCIENCE_HOME)} />
              <GameCard title="Sağlıklı Hayat" icon="🍎" color="bg-gradient-to-br from-emerald-500 to-teal-600" description={lifeHealthDesc} onClick={() => setMode(GameMode.LIFE_SCIENCE_HEALTH)} />
              <GameCard title="Güvenli Hayat" icon="🦺" color="bg-gradient-to-br from-amber-500 to-orange-600" description={safeDesc} onClick={() => setMode(GameMode.LIFE_SCIENCE_SAFE)} />
              <GameCard title="Ülkemizde Hayat" icon="🇹🇷" color="bg-gradient-to-br from-cyan-500 to-blue-600" description={countryDesc} onClick={() => setMode(GameMode.LIFE_SCIENCE_COUNTRY)} />
            </div>
          </div>
        );

      case GameMode.LIFE_SCIENCE_GAME_AREA:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.LIFE_SCIENCE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Hayat Bilgisi Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Sınıfını seç, oyunlarla hayat bilgisi öğren ve eğlen!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard
                title="1. SINIF"
                icon="1️⃣"
                color="from-green-500 to-emerald-600"
                description="Okul, Ev, Sağlık, Güvenlik"
                onClick={() => setMode(GameMode.LIFE_SCIENCE_GAME_GRADE_1)}
              />
              <GameCard
                title="2. SINIF"
                icon="2️⃣"
                color="from-blue-500 to-indigo-600"
                description="Aile, Arkadaşlık, Doğa"
                onClick={() => setMode(GameMode.LIFE_SCIENCE_GAME_GRADE_2)}
              />
              <GameCard
                title="3. SINIF"
                icon="3️⃣"
                color="from-orange-500 to-red-600"
                description="Toplum, Kültür, Değerler"
                onClick={() => setMode(GameMode.LIFE_SCIENCE_GAME_GRADE_3)}
              />
            </div>
          </div>
        );

      case GameMode.LIFE_SCIENCE_GAME_GRADE_1:
      case GameMode.LIFE_SCIENCE_GAME_GRADE_2:
      case GameMode.LIFE_SCIENCE_GAME_GRADE_3:
        const lifeGradeNum = mode === GameMode.LIFE_SCIENCE_GAME_GRADE_1 ? 1 :
          mode === GameMode.LIFE_SCIENCE_GAME_GRADE_2 ? 2 : 3;

        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.LIFE_SCIENCE_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">{lifeGradeNum}. Sınıf Hayat Bilgisi Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hayat bilgisi oyunlarıyla öğren ve eğlen!
              </p>
            </div>

            {/* Yakında Eklenecek Mesajı */}
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-8xl mb-6 animate-bounce">🚀</div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4">Yakında Geliyor!</h3>
                <p className="text-white/70 text-lg md:text-xl font-semibold max-w-md mx-auto">
                  {lifeGradeNum}. sınıf Hayat Bilgisi oyunları üzerinde çalışıyoruz. Çok yakında burada olacak!
                </p>
              </div>
            </div>
          </div>
        );

      case GameMode.PRESCHOOL_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Kreş ve Anaokulu</h2>
              <div className="flex justify-center gap-3">
                <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Oyunla Öğreniyorum</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Bilişsel Gelişim" icon="🧠" color="bg-gradient-to-br from-cyan-500 to-blue-600" description="Dikkat, algı, zaman ve mekan." onClick={() => setMode(GameMode.PRESCHOOL_COGNITIVE)} />
              <GameCard title="Dil Gelişimi" icon="🗣️" color="bg-gradient-to-br from-rose-500 to-red-600" description="Dinleme, anlama ve kelime haznesi." onClick={() => setMode(GameMode.PRESCHOOL_LANGUAGE)} />
              <GameCard title="Sosyal & Duygusal" icon="❤️" color="bg-gradient-to-br from-emerald-500 to-teal-600" description="Duyguları tanıma ve empati." onClick={() => setMode(GameMode.PRESCHOOL_SOCIAL)} />
              <GameCard title="Motor Gelişim" icon="🤸" color="bg-gradient-to-br from-amber-500 to-orange-600" description="Hareket, denge ve çizgi çalışmaları." onClick={() => setMode(GameMode.PRESCHOOL_MOTOR)} />
              <GameCard title="Öz Bakım" icon="🧼" color="bg-gradient-to-br from-indigo-500 to-purple-600" description="Kişisel temizlik ve sağlıklı yaşam." onClick={() => setMode(GameMode.PRESCHOOL_SELF_CARE)} />
              <GameCard title="Karakter & Değerler" icon="🌱" color="bg-gradient-to-br from-lime-500 to-green-600" description="Saygı, sevgi, sabır ve doğa." onClick={() => setMode(GameMode.PRESCHOOL_VALUES)} />
            </div>
          </div>
        );

      case GameMode.MATH_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.HOME)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Matematik Dünyası</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Sayılar, şekiller ve problemler! Matematik yolculuğuna hazır mısın?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* ÖĞREN KUTUSU */}
              <button
                onClick={() => setMode(GameMode.MATH_PRACTICE_AREA)}
                className="group bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎯</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">ÖĞREN</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Alıştırmalarla pekiştir!</p>

                {/* Right Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>

                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎯</div>
              </button>

              {/* PRATİK YAP KUTUSU */}
              <button
                onClick={() => setMode(GameMode.MATH_PRACTICE_MENU)}
                className="group bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">✏️</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">PRATİK YAP</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Ders konularını öğren ve pratik yap!</p>

                {/* Right Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>

                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">✏️</div>
              </button>

              {/* OYUN ALANI KUTUSU */}
              <button
                onClick={() => setMode(GameMode.MATH_GAME_AREA)}
                className="group bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-[32px] border border-white/10 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all text-left relative overflow-hidden h-48"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">🎮</div>
                <h3 className="text-white font-black text-xl mb-1 mt-auto">OYUN ALANI</h3>
                <p className="text-white/80 text-xs font-medium relative z-10">Eğlenerek matematik öğren!</p>

                {/* Right Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20 z-30 group-hover:bg-black/30 transition-all pointer-events-none">
                  <span className="text-white text-xl font-black">›</span>
                </div>

                <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">🎮</div>
              </button>
            </div>
          </div>
        );

      case GameMode.MATH_PRACTICE_MENU:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Matematik Pratik Yap</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi konuda pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard
                title="Sayılar"
                icon="🔢"
                color="bg-gradient-to-br from-blue-500 to-indigo-600"
                description="Sayma, basamak değeri ve sayı karşılaştırma!"
                onClick={() => setMode(GameMode.MATH_PRACTICE_NUMBERS)}
              />
              <GameCard
                title="İşlemler"
                icon="➕"
                color="bg-gradient-to-br from-green-500 to-emerald-600"
                description="Toplama, çıkarma, çarpma ve bölme!"
                onClick={() => setMode(GameMode.MATH_PRACTICE_BASIC)}
              />
              <GameCard
                title="Geometri"
                icon="📐"
                color="bg-gradient-to-br from-purple-500 to-violet-600"
                description="Şekiller, alan, çevre ve uzay!"
                onClick={() => setMode(GameMode.MATH_PRACTICE_GEOMETRY)}
              />
              <GameCard
                title="Veri İşleme"
                icon="📊"
                color="bg-gradient-to-br from-orange-500 to-red-600"
                description="Grafikler, tablolar ve veri analizi!"
                onClick={() => setMode(GameMode.MATH_PRACTICE_COMPARISON)}
              />
            </div>
          </div>
        );

      // SAYILAR - Soru Tipi Seçimi
      case GameMode.MATH_PRACTICE_NUMBERS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-blue-400 italic drop-shadow-2xl mb-4 uppercase">🔢 Sayılar</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Sayı ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('numbers'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Eksik sayıları bularak işlemleri tamamla!" onClick={() => { setCurrentTopic('numbers'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Sayı problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('numbers'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('numbers'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // İŞLEMLER - Soru Tipi Seçimi
      case GameMode.MATH_PRACTICE_BASIC:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-green-400 italic drop-shadow-2xl mb-4 uppercase">➕ İşlemler</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="İşlemlerin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('operations'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Eksik sayıları bularak işlemleri tamamla!" onClick={() => { setCurrentTopic('operations'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="İşlem problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('operations'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('operations'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // GEOMETRİ - Soru Tipi Seçimi
      case GameMode.MATH_PRACTICE_GEOMETRY:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-purple-400 italic drop-shadow-2xl mb-4 uppercase">📐 Geometri</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Geometri ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('geometry'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Eksik değerleri bularak geometri sorularını tamamla!" onClick={() => { setCurrentTopic('geometry'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Geometri problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('geometry'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('geometry'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      // VERİ İŞLEME - Soru Tipi Seçimi
      case GameMode.MATH_PRACTICE_COMPARISON:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_PRACTICE_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-orange-400 italic drop-shadow-2xl mb-4 uppercase">📊 Veri İşleme</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Hangi soru tipiyle pratik yapmak istersin?
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Doğru Yanlış" icon="✅❌" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Veri ifadelerinin doğru mu yanlış mı olduğunu bul!" onClick={() => { setCurrentTopic('data'); setMode(GameMode.PLAYGROUND_TRUE_FALSE); }} />
              <GameCard title="Boşluk Doldurma" icon="📝" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Eksik verileri bularak grafikleri tamamla!" onClick={() => { setCurrentTopic('data'); setMode(GameMode.PLAYGROUND_FILL_BLANK); }} />
              <GameCard title="Klasik Soru" icon="📚" color="bg-gradient-to-br from-purple-500 to-violet-600" description="Veri problemlerini çöz ve cevabı yaz!" onClick={() => { setCurrentTopic('data'); setMode(GameMode.PLAYGROUND_CLASSIC_QUESTION); }} />
              <GameCard title="Test" icon="📋" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Çoktan seçmeli sorularla bilgini test et!" onClick={() => { setCurrentTopic('data'); setMode(GameMode.PLAYGROUND_TEST); }} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_AREA:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_MENU)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Matematik Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Sınıfını seç, oyunlarla matematik öğren ve eğlen!
              </p>
              <div className="flex justify-center gap-3">
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{stats.gradeLevel}. SINIF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard
                title="1. SINIF"
                icon="1️⃣"
                color="bg-gradient-to-br from-green-500 to-emerald-600"
                description="Sayılar, Toplama, Çıkarma"
                onClick={() => setMode(GameMode.MATH_GAME_GRADE_1)}
              />
              <GameCard
                title="2. SINIF"
                icon="2️⃣"
                color="bg-gradient-to-br from-blue-500 to-indigo-600"
                description="100'e Kadar, Alışveriş"
                onClick={() => setMode(GameMode.MATH_GAME_GRADE_2)}
              />
              <GameCard
                title="3. SINIF"
                icon="3️⃣"
                color="bg-gradient-to-br from-orange-500 to-red-600"
                description="Çarpma, Bölme, Problemler"
                onClick={() => setMode(GameMode.MATH_GAME_GRADE_3)}
              />
              <GameCard
                title="4. SINIF"
                icon="4️⃣"
                color="bg-gradient-to-br from-purple-500 to-pink-600"
                description="Kesirler, Ondalıklar"
                onClick={() => setMode(GameMode.MATH_GAME_GRADE_4)}
              />
              <GameCard
                title="5. SINIF"
                icon="5️⃣"
                color="bg-gradient-to-br from-cyan-500 to-blue-600"
                description="Üslü Sayılar, Denklemler"
                onClick={() => setMode(GameMode.MATH_GAME_GRADE_5)}
              />
              <GameCard
                title="6. SINIF"
                icon="6️⃣"
                color="bg-gradient-to-br from-yellow-500 to-orange-600"
                description="Cebirsel İfadeler, Geometri"
                onClick={() => setMode(GameMode.MATH_GAME_GRADE_6)}
              />
              <GameCard
                title="7. SINIF"
                icon="7️⃣"
                color="bg-gradient-to-br from-rose-500 to-red-600"
                description="Denklemler, Eşitsizlikler"
                onClick={() => setMode(GameMode.MATH_GAME_GRADE_7)}
              />
              <GameCard
                title="8. SINIF"
                icon="8️⃣"
                color="bg-gradient-to-br from-indigo-500 to-purple-600"
                description="Fonksiyonlar, Üçgenler"
                onClick={() => setMode(GameMode.MATH_GAME_GRADE_8)}
              />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE_1:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">1. Sınıf</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* Temel Matematik Oyunları */}
              <GameCard title="Temel Matematik" icon="➕" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Toplama, çıkarma, çarpma, bölme oyunları!" onClick={() => setMode(GameMode.MATH_GAME_BASIC)} />

              {/* Nesnelerin Geometrisi */}
              <GameCard title="Nesnelerin Geometrisi" icon="📐" color="bg-gradient-to-br from-blue-500 to-indigo-600" description="Şekiller, konumlar ve yönler!" onClick={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />

              {/* Sayılar ve Rakamlar */}
              <GameCard title="Sayılar ve Rakamlar" icon="🔢" color="bg-gradient-to-br from-purple-500 to-pink-600" description="Sayı tanıma, yazma ve işlemler!" onClick={() => setMode(GameMode.MATH_GAME_NUMBERS)} />

              {/* Ritmik Sayma */}
              <GameCard title="Ritmik Sayma" icon="🥁" color="bg-gradient-to-br from-orange-500 to-red-600" description="Ritimle sayma ve katlar!" onClick={() => setMode(GameMode.MATH_GAME_RHYTHMIC)} />

              {/* Karşılaştırma ve Sıralama */}
              <GameCard title="Karşılaştırma ve Sıralama" icon="⚖️" color="bg-gradient-to-br from-cyan-500 to-blue-600" description="Büyük-küçük, sıralama oyunları!" onClick={() => setMode(GameMode.MATH_GAME_COMPARISON)} />

              {/* Ölçme Oyunları */}
              <GameCard title="Ölçme Oyunları" icon="📏" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Uzunluk, ağırlık, para oyunları!" onClick={() => setMode(GameMode.MATH_GAME_MEASUREMENT)} />

              {/* Görsel Dikkat ve Eşleştirme */}
              <GameCard title="Görsel Dikkat" icon="👀" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Hafıza, dikkat ve eşleştirme!" onClick={() => setMode(GameMode.MATH_GAME_VISUAL)} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE_2:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">2. Sınıf</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* Sayılar */}
              <GameCard title="Sayılar" icon="🔢" color="bg-gradient-to-br from-purple-500 to-pink-600" description="5 oyun: 100'e Kadar Sayı Avı, Büyük mü Küçük mü..." onClick={() => setMode(GameMode.MATH_GAME_GRADE2_NUMBERS)} />

              {/* Toplama */}
              <GameCard title="Toplama" icon="➕" color="bg-gradient-to-br from-green-500 to-emerald-600" description="5 oyun: Alışveriş Toplama, Market Sepeti..." onClick={() => setMode(GameMode.MATH_GAME_GRADE2_ADDITION)} />

              {/* Çıkarma */}
              <GameCard title="Çıkarma" icon="➖" color="bg-gradient-to-br from-red-500 to-orange-600" description="5 oyun: Para Üstü Hesapla, Hazine Çıkarma..." onClick={() => setMode(GameMode.MATH_GAME_GRADE2_SUBTRACTION)} />

              {/* Geometri */}
              <GameCard title="Geometri" icon="📐" color="bg-gradient-to-br from-blue-500 to-indigo-600" description="Şekil sayma, simetri..." onClick={() => setMode(GameMode.MATH_GAME_GRADE2_GEOMETRY)} />

              {/* Veri */}
              <GameCard title="Veri" icon="📊" color="bg-gradient-to-br from-cyan-500 to-blue-600" description="Grafik okuma..." onClick={() => setMode(GameMode.MATH_GAME_GRADE2_DATA)} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE_3:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">3. Sınıf</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* Çarpma */}
              <GameCard title="Çarpma" icon="✖️" color="bg-gradient-to-br from-orange-500 to-red-600" description="5 oyun: Çarpım Tablosu Savaşı, Uzay Çarpma..." onClick={() => setMode(GameMode.MATH_GAME_GRADE3_MULTIPLICATION)} />

              {/* Bölme */}
              <GameCard title="Bölme" icon="➗" color="bg-gradient-to-br from-pink-500 to-rose-600" description="5 oyun: Pizza Paylaşımı, Şeker Paylaştır..." onClick={() => setMode(GameMode.MATH_GAME_GRADE3_DIVISION)} />

              {/* Problemler */}
              <GameCard title="Problemler" icon="🧩" color="bg-gradient-to-br from-indigo-500 to-purple-600" description="5 oyun: Market Problemleri, Otobüs Yolcu..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Geometri */}
              <GameCard title="Geometri" icon="📐" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="5 oyun: Açı Avı, Şekil Döndürme, Tangram..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Veri */}
              <GameCard title="Veri" icon="📊" color="bg-gradient-to-br from-teal-500 to-green-600" description="5 oyun: Grafik Yorumla, Veri Dedektifi..." onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE_4:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">4. Sınıf</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* Büyük Sayılar */}
              <GameCard title="Büyük Sayılar" icon="🔢" color="bg-gradient-to-br from-purple-500 to-indigo-600" description="5 oyun: Binlik Sayı Avı, Sayı Karşılaştırma..." onClick={() => setMode(GameMode.MATH_GAME_GRADE4_BIGNUMBERS)} />

              {/* İşlemler */}
              <GameCard title="İşlemler" icon="🧮" color="bg-gradient-to-br from-green-500 to-teal-600" description="5 oyun: Uzun Toplama, Çarpma Fabrikası..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Problemler */}
              <GameCard title="Problemler" icon="🧩" color="bg-gradient-to-br from-orange-500 to-amber-600" description="5 oyun: Alışveriş, Zaman, Para Problemleri..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Geometri */}
              <GameCard title="Geometri" icon="📐" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="5 oyun: Alan Hesaplama, Çevre, 3D Şekiller..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Veri ve Olasılık */}
              <GameCard title="Veri ve Olasılık" icon="🎲" color="bg-gradient-to-br from-pink-500 to-rose-600" description="5 oyun: Olasılık Çarkı, Zar Oyunu..." onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE_5:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">5. Sınıf</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* Sayılar */}
              <GameCard title="Sayılar" icon="🔢" color="bg-gradient-to-br from-cyan-500 to-teal-600" description="Büyük Sayı İnşa Et, Basamak Değeri Savaşı..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Doğal Sayılarla İşlemler */}
              <GameCard title="Doğal Sayılarla İşlemler" icon="🧮" color="bg-gradient-to-br from-blue-500 to-indigo-600" description="Market Hesabı, Uzay Toplama Görevi..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Kesirler */}
              <GameCard title="Kesirler" icon="🍕" color="bg-gradient-to-br from-orange-500 to-amber-600" description="Pizza Kesir Oyunu, Kesir Karşılaştırma..." onClick={() => setMode(GameMode.MATH_GAME_GRADE5_FRACTIONS)} />

              {/* Geometri */}
              <GameCard title="Geometri" icon="📐" color="bg-gradient-to-br from-purple-500 to-pink-600" description="Şekil Dedektifi, Kenar ve Köşe Avı..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Veri */}
              <GameCard title="Veri" icon="📊" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Grafik Okuma Oyunu, Veri Toplama..." onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE_6:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">6. Sınıf</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* Kesirler */}
              <GameCard title="Kesirler" icon="🍕" color="bg-gradient-to-br from-yellow-500 to-amber-600" description="Kesir Toplama Arena, Kesir Çıkarma..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Ondalık Sayılar */}
              <GameCard title="Ondalık Sayılar" icon="🔢" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Ondalık Market, Ondalık Sıralama..." onClick={() => setMode(GameMode.MATH_GAME_GRADE6_DECIMALS)} />

              {/* Oran */}
              <GameCard title="Oran" icon="⚖️" color="bg-gradient-to-br from-purple-500 to-indigo-600" description="Oran Karşılaştırma, Tarif Oranı..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Geometri */}
              <GameCard title="Geometri" icon="📐" color="bg-gradient-to-br from-green-500 to-teal-600" description="Açı Avı, Üçgen İnşa Et, Simetri..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Veri */}
              <GameCard title="Veri" icon="📊" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Grafik Analizi, Veri Yorumlama..." onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE_7:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">7. Sınıf</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* Tam Sayılar */}
              <GameCard title="Tam Sayılar" icon="➕➖" color="bg-gradient-to-br from-rose-500 to-fuchsia-600" description="Pozitif Negatif Savaşı, Sıcaklık Oyunu..." onClick={() => setMode(GameMode.MATH_GAME_GRADE7_INTEGERS)} />

              {/* Rasyonel Sayılar */}
              <GameCard title="Rasyonel Sayılar" icon="🔢" color="bg-gradient-to-br from-blue-500 to-indigo-600" description="Rasyonel Sayı Sıralama, Kesirden Ondalığa..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Cebir */}
              <GameCard title="Cebir" icon="🧮" color="bg-gradient-to-br from-purple-500 to-pink-600" description="Denklem Dedektifi, Bilinmeyeni Bul..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Geometri */}
              <GameCard title="Geometri" icon="📐" color="bg-gradient-to-br from-green-500 to-teal-600" description="Açı Hesaplama, Üçgen Türü Bul..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Olasılık */}
              <GameCard title="Olasılık" icon="🎲" color="bg-gradient-to-br from-orange-500 to-amber-600" description="Zar Oyunu, Kart Olasılığı, Çark..." onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE_8:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_AREA)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">8. Sınıf</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* Üslü Sayılar */}
              <GameCard title="Üslü Sayılar" icon="²" color="bg-gradient-to-br from-lime-500 to-green-600" description="Üs Hesaplama Yarışı, Üslü Puzzle..." onClick={() => setMode(GameMode.MATH_GAME_GRADE8_EXPONENTS)} />

              {/* Kareköklü Sayılar */}
              <GameCard title="Kareköklü Sayılar" icon="√" color="bg-gradient-to-br from-cyan-500 to-blue-600" description="Kök Hesaplama Oyunu, Karekök Puzzle..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Cebir / Denklem */}
              <GameCard title="Cebir / Denklem" icon="🧮" color="bg-gradient-to-br from-purple-500 to-indigo-600" description="Denklem Çözme Arena, Fonksiyon Eşleştirme..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Geometri */}
              <GameCard title="Geometri" icon="📐" color="bg-gradient-to-br from-orange-500 to-red-600" description="Alan Hesaplama, 3D Şekil Tanıma..." onClick={() => alert("Yakında eklenecek!")} />

              {/* Veri / Olasılık */}
              <GameCard title="Veri / Olasılık" icon="📊" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Grafik Analizi, İstatistik Dedektifi..." onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_BASIC:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_1)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Temel Matematik</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Toplama, çıkarma, çarpma ve bölme işlemlerini öğren!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* TOPLAMA OYUNLARI */}
              <GameCard title="Meyve Toplama Oyunu" icon="🍎" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Sepetteki meyveleri topla!" onClick={() => setMode(GameMode.FRUIT_ADDITION_GAME)} />
              <GameCard title="Toplama Balıkları" icon="🐟" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="İki balığın üzerindeki sayıları topla!" onClick={() => setMode(GameMode.MATH_GAME_FISH_ADDITION)} />
              <GameCard title="Uzay Toplama" icon="🚀" color="bg-gradient-to-br from-purple-500 to-indigo-600" description="Rokete doğru toplam sonucu gönder!" onClick={() => setMode(GameMode.MATH_GAME_SPACE_ADDITION)} />
              <GameCard title="Toplama Puzzle" icon="🧩" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Parçayı doğru toplama sonucuna yerleştir!" onClick={() => setMode(GameMode.MATH_GAME_ADDITION_PUZZLE)} />
              <GameCard title="Toplama Yarışı" icon="🏁" color="bg-gradient-to-br from-yellow-500 to-orange-600" description="Doğru sonucu hızlı seç!" onClick={() => setMode(GameMode.MATH_GAME_ADDITION_RACE)} />

              {/* ÇIKARMA OYUNLARI */}
              <GameCard title="Kurabiye Yiyen Canavar" icon="🍪" color="bg-gradient-to-br from-orange-500 to-red-600" description="Kaç kurabiye kaldı?" onClick={() => setMode(GameMode.MATH_GAME_COOKIE_MONSTER)} />
              <GameCard title="Balon Patlat" icon="🎈" color="bg-gradient-to-br from-red-500 to-pink-600" description="Patlayan balonlardan sonra kalan sayıyı bul!" onClick={() => setMode(GameMode.MATH_GAME_BALLOON_POP)} />
              <GameCard title="Oyuncak Kayboldu" icon="🧸" color="bg-gradient-to-br from-purple-600 to-pink-700" description="Kaç oyuncak kaldı?" onClick={() => setMode(GameMode.MATH_GAME_TOY_LOST)} />
              <GameCard title="Çıkarma Basketi" icon="🏀" color="bg-gradient-to-br from-orange-600 to-red-700" description="Topu doğru sonuca at!" onClick={() => setMode(GameMode.MATH_GAME_SUBTRACTION_BASKET)} />
              <GameCard title="Uzaylı Çıkarma" icon="👽" color="bg-gradient-to-br from-green-500 to-teal-600" description="Uzaylılarla çıkarma öğren!" onClick={() => setMode(GameMode.MATH_GAME_ALIEN_SUBTRACTION)} />

              {/* DİĞER OYUNLAR */}
              <GameCard title="Çarpım Tablosu Ninja" icon="✖️" color="bg-gradient-to-br from-red-500 to-orange-600" description="Çarpım tablosunda usta ol!" onClick={() => setMode(GameMode.MATH_GAME_MULTIPLICATION_NINJA)} />
              <GameCard title="Bölme Avı" icon="➗" color="bg-gradient-to-br from-cyan-500 to-blue-600" description="Bölme işlemlerinde ustalaş!" onClick={() => setMode(GameMode.MATH_GAME_DIVISION_HUNT)} />
              <GameCard title="Matematik Basketbolu" icon="🏀" color="bg-gradient-to-br from-orange-600 to-red-700" description="Doğru cevapla basket at!" onClick={() => setMode(GameMode.MATH_GAME_BASKETBALL)} />
              <GameCard title="Problem Çözme Macerası" icon="🗺️" color="bg-gradient-to-br from-indigo-600 to-purple-700" description="Matematik problemleri çöz!" onClick={() => setMode(GameMode.MATH_GAME_PROBLEM_SOLVING)} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GEOMETRY:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_1)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Nesnelerin Geometrisi</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Şekilleri tanı, konumları öğren ve yönleri keşfet!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* YENİ GEOMETRİ OYUNLARI */}
              <GameCard title="Şekil Avı" icon="🔍" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Kare, üçgen, daire bul!" onClick={() => setMode(GameMode.MATH_GAME_SHAPE_HUNT)} />
              <GameCard title="Şekil Yapboz" icon="🧩" color="bg-gradient-to-br from-purple-500 to-pink-600" description="Şekilleri doğru yere yerleştir!" onClick={() => setMode(GameMode.MATH_GAME_SHAPE_PUZZLE)} />
              <GameCard title="Gölgeyi Bul" icon="🌑" color="bg-gradient-to-br from-gray-600 to-slate-700" description="Şeklin gölgesini eşleştir!" onClick={() => setMode(GameMode.MATH_GAME_SHADOW_MATCH)} />
              <GameCard title="Şekil Boyama" icon="🎨" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Şekilleri renklendir!" onClick={() => setMode(GameMode.MATH_GAME_SHAPE_PAINTING)} />
              <GameCard title="Şekil İnşa Et" icon="🏗️" color="bg-gradient-to-br from-orange-500 to-amber-600" description="Şekilleri oluştur!" onClick={() => setMode(GameMode.MATH_GAME_SHAPE_BUILDER)} />

              {/* MEVCUT OYUNLAR */}
              <GameCard title="Labirent Oyunu" icon="🌀" color="bg-gradient-to-br from-purple-500 to-indigo-600" description="Karakteri hedefe ulaştır!" onClick={() => setMode(GameMode.MAZE_GAME)} />
              <GameCard title="Şekil Eşleştirme" icon="🔶" color="bg-gradient-to-br from-teal-500 to-green-600" description="Aynı geometrik şekilleri eşleştir!" onClick={() => setMode(GameMode.MATH_GAME_SHAPE_MATCHING)} />
              <GameCard title="Sağ-Sol Yarışı" icon="↔️" color="bg-gradient-to-br from-orange-500 to-red-600" description="Doğru yönü hızlıca seç!" onClick={() => setMode(GameMode.MATH_GAME_LEFT_RIGHT_RACE)} />
              <GameCard title="Geometrik Şekil Tanıma" icon="🔷" color="bg-gradient-to-br from-blue-600 to-indigo-700" description="Şekilleri tanı ve eşleştir!" onClick={() => setMode(GameMode.MATH_GAME_GEOMETRIC_SHAPE_RECOGNITION)} />
              <GameCard title="Alan Hesaplama" icon="📐" color="bg-gradient-to-br from-emerald-500 to-teal-600" description="Şekillerin alanını hesapla!" onClick={() => setMode(GameMode.MATH_GAME_AREA_CALCULATION)} />
              <GameCard title="Çevre Hesaplama" icon="📏" color="bg-gradient-to-br from-lime-500 to-green-600" description="Şekillerin çevresini bul!" onClick={() => setMode(GameMode.MATH_GAME_PERIMETER_CALCULATION)} />
              <GameCard title="Konum Bulmaca" icon="📍" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Nesnelerin doğru konumunu bul!" onClick={() => setMode(GameMode.MATH_GAME_LOCATION_PUZZLE)} />
              <GameCard title="İçinde-Dışında" icon="⭕" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Nesneleri doğru konuma yerleştir!" onClick={() => setMode(GameMode.MATH_GAME_INSIDE_OUTSIDE)} />
              <GameCard title="Şekil Dedektifi" icon="🔍" color="bg-gradient-to-br from-blue-500 to-indigo-600" description="Köşeli ve yuvarlak nesneleri ayır!" onClick={() => setMode(GameMode.MATH_GAME_SHAPE_DETECTIVE)} />
              <GameCard title="Tatil Rotası" icon="🗺️" color="bg-gradient-to-br from-green-500 to-teal-600" description="Yönerge takip ederek yolu bul!" onClick={() => setMode(GameMode.MATH_GAME_VACATION_ROUTE)} />
              <GameCard title="Eksik Şekil" icon="🧩" color="bg-gradient-to-br from-orange-500 to-red-600" description="Eksik olan parçayı tamamla!" onClick={() => setMode(GameMode.MATH_GAME_MISSING_SHAPE)} />
              <GameCard title="Şekil Labirenti" icon="🌀" color="bg-gradient-to-br from-cyan-500 to-blue-600" description="Doğru şekilleri takip ederek çıkışı bul!" onClick={() => setMode(GameMode.MATH_GAME_SHAPE_LABYRINTH)} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_NUMBERS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_1)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Sayılar ve Rakamlar</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Sayıları tanı, rakamları öğren ve sayma becerilerini geliştir!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* SAYILAR VE NİCELİKLER */}
              <GameCard title="Balon Say" icon="🎈" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Ekrandaki balonları say ve doğru sayıyı seç!" onClick={() => setMode(GameMode.MATH_GAME_BALLOON_COUNT)} />
              <GameCard title="Elma Topla" icon="🍎" color="bg-gradient-to-br from-red-500 to-rose-600" description="Ağaçtan düşen elmaların sayısını eşleştir!" onClick={() => setMode(GameMode.MATH_GAME_APPLE_COLLECT)} />
              <GameCard title="Sayı Avı" icon="🔍" color="bg-gradient-to-br from-purple-500 to-indigo-600" description="Verilen sayıyı ekrandaki nesneler içinde bul!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Eksik Sayıyı Bul" icon="❓" color="bg-gradient-to-br from-orange-500 to-amber-600" description="1–10 sayı dizisinde boşluğu doldur!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Sayı Treni" icon="🚂" color="bg-gradient-to-br from-green-500 to-teal-600" description="Vagonları doğru sayı sırasına koy!" onClick={() => setMode(GameMode.MATH_GAME_NUMBER_TRAIN)} />
              <GameCard title="Sayı İnşaatı" icon="🧱" color="bg-gradient-to-br from-blue-500 to-indigo-600" description="Blokları say ve kule yap!" onClick={() => setMode(GameMode.MATH_GAME_NUMBER_BUILDING)} />

              {/* MEVCUT OYUNLAR */}
              <GameCard title="Say ve Eşleştir" icon="🔢" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Kaç tane nesne olduğunu bul!" onClick={() => setMode(GameMode.NUMBER_RECOGNITION_GAME)} />
              <GameCard title="Sayı Dizisi Tamamlama" icon="🔢" color="bg-gradient-to-br from-cyan-500 to-blue-600" description="Dizideki mantığı bul!" onClick={() => setMode(GameMode.SEQUENCE_PATTERN_GAME)} />
              <GameCard title="Rakam Yazma" icon="✍️" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Rakamları çizmeyi öğren!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Sayı Boyama" icon="🎨" color="bg-gradient-to-br from-rose-500 to-pink-600" description="Verilen sayı kadar nesneyi boya!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Onluk-Birlik" icon="🧮" color="bg-gradient-to-br from-cyan-500 to-blue-600" description="Sayıları bloklarla oluştur!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Kuşlar Uçuyor" icon="🐦" color="bg-gradient-to-br from-sky-500 to-blue-600" description="Toplama ve çıkarma ile kuşları say!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="İşlem Balonları" icon="🎈" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Zihinden toplama ve çıkarma!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Sonuç Balonları" icon="🎈" color="bg-gradient-to-br from-violet-500 to-purple-600" description="İşlemin sonucunu doğru balonda bul!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Sayı Treni" icon="🚂" color="bg-gradient-to-br from-red-500 to-orange-600" description="Vagonları doğru sayılarla doldur!" onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_RHYTHMIC:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_1)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Ritmik Sayma</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Ritimle say, katları bul ve sayma becerilerini güçlendir!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Ritmik Koşu" icon="🏃" color="bg-gradient-to-br from-lime-500 to-green-600" description="Doğru sayıya zıpla!" onClick={() => setMode(GameMode.MATH_GAME_RHYTHMIC_RUN)} />
              <GameCard title="Bom Oyunu" icon="💣" color="bg-gradient-to-br from-red-500 to-orange-600" description="Katları bul ve 'Bom' de!" onClick={() => setMode(GameMode.MATH_GAME_BOOM)} />
              <GameCard title="Sayı Treni" icon="🚂" color="bg-gradient-to-br from-blue-600 to-indigo-700" description="Tren vagonlarını doğru sayıyla doldur!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Geri Sayım" icon="🚀" color="bg-gradient-to-br from-purple-600 to-pink-700" description="Roketi fırlatmak için geriye say!" onClick={() => setMode(GameMode.MATH_GAME_COUNTDOWN)} />
              <GameCard title="Atlayarak Sayma" icon="🦘" color="bg-gradient-to-br from-green-600 to-emerald-700" description="2'şer 5'er 10'ar say!" onClick={() => setMode(GameMode.MATH_GAME_SKIP_COUNTING)} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_COMPARISON:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_1)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Karşılaştırma ve Sıralama</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Büyük-küçük karşılaştır, sırala ve grafik okumayı öğren!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* VERİ / BASİT GRAFİK OYUNLARI */}
              <GameCard title="Büyük-Küçük Yarışı" icon="🏁" color="bg-gradient-to-br from-cyan-500 to-blue-600" description="Sayıları hızlıca karşılaştır!" onClick={() => setMode(GameMode.MATH_GAME_BIG_SMALL_RACE)} />
              <GameCard title="Sayı Doğrusu" icon="🎯" color="bg-gradient-to-br from-purple-500 to-pink-600" description="Doğru sayıyı bul!" onClick={() => setMode(GameMode.MATH_GAME_NUMBER_LINE)} />
              <GameCard title="Boyut Sıralama" icon="📏" color="bg-gradient-to-br from-orange-500 to-red-600" description="Küçükten büyüğe sırala!" onClick={() => setMode(GameMode.MATH_GAME_SIZE_ORDER)} />
              <GameCard title="En Çok Hangisi" icon="�" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Hangi meyve daha fazla?" onClick={() => setMode(GameMode.MATH_GAME_MOST_FRUIT)} />
              <GameCard title="Oyuncak Grafiği" icon="🧸" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Oyuncakları say ve grafiğe yerleştir!" onClick={() => setMode(GameMode.MATH_GAME_TOY_GRAPH)} />
              <GameCard title="Hayvan Sayımı" icon="🐾" color="bg-gradient-to-br from-orange-500 to-amber-600" description="Hayvanları say ve karşılaştır!" onClick={() => setMode(GameMode.MATH_GAME_ANIMAL_COUNT)} />
              <GameCard title="Favori Renk Anketi" icon="🎨" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Renkleri say ve grafiğe dök!" onClick={() => setMode(GameMode.MATH_GAME_FAVORITE_COLOR)} />
              <GameCard title="Grafik Tamamlama" icon="📈" color="bg-gradient-to-br from-purple-500 to-indigo-600" description="Eksik grafiği tamamla!" onClick={() => setMode(GameMode.MATH_GAME_GRAPH_COMPLETION)} />

              {/* MEVCUT KARŞILAŞTIRMA OYUNLARI */}
              <GameCard title="Sayı Karşılaştırma" icon="⚖️" color="bg-gradient-to-br from-amber-500 to-yellow-600" description="Büyük mü küçük mü?" onClick={() => setMode(GameMode.NUMBER_COMPARISON_GAME)} />
              <GameCard title="Az-Çok Dedektifi" icon="🔍" color="bg-gradient-to-br from-teal-500 to-cyan-600" description="Hangi grup daha fazla?" onClick={() => setMode(GameMode.NUMBER_COMPARISON_GAME)} />
              <GameCard title="Yarış Sıralama" icon="🏁" color="bg-gradient-to-br from-yellow-500 to-orange-600" description="Yarışta kim kaçıncı oldu?" onClick={() => setMode(GameMode.MATH_GAME_RACE_ORDER)} />
              <GameCard title="Doğru Sıra" icon="📊" color="bg-gradient-to-br from-indigo-500 to-purple-600" description="Sayıları küçükten büyüğe sırala!" onClick={() => setMode(GameMode.MATH_GAME_CORRECT_ORDER)} />
              <GameCard title="Başkan Seçimi" icon="🗳️" color="bg-gradient-to-br from-indigo-500 to-blue-600" description="Çetele ve sıklık tablosu oluştur!" onClick={() => setMode(GameMode.MATH_GAME_ELECTION_TALLY)} />
              <GameCard title="Dondurmacı" icon="🍦" color="bg-gradient-to-br from-pink-500 to-fuchsia-600" description="Nesne grafiği oluştur ve yorumla!" onClick={() => setMode(GameMode.MATH_GAME_ICE_CREAM_GRAPH)} />
              <GameCard title="Kim Daha Büyük?" icon="🔢" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Sayıları karşılaştır!" onClick={() => setMode(GameMode.MATH_GAME_WHO_BIGGER)} />
              <GameCard title="En Uzun Hangisi?" icon="📏" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Nesneleri uzunluklarına göre sırala!" onClick={() => setMode(GameMode.MATH_GAME_LONGEST_LINE)} />
              <GameCard title="Grafik Okuma" icon="📊" color="bg-gradient-to-br from-purple-500 to-pink-600" description="Grafiği oku ve soruları cevapla!" onClick={() => setMode(GameMode.MATH_GAME_GRAPH_READING)} />
              <GameCard title="Grafik Okuma" icon="📊" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Grafikleri yorumla!" onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_MEASUREMENT:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_1)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Ölçme Oyunları</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Uzunluk, ağırlık ve zaman ölçmeyi öğren, tahmin et!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Uzunluk Karşılaştır" icon="📏" color="bg-gradient-to-br from-amber-500 to-orange-600" description="Hangisi daha uzun?" onClick={() => setMode(GameMode.MATH_GAME_LENGTH_COMPARE)} />
              <GameCard title="Para Sayma" icon="💰" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Paraları say ve topla!" onClick={() => setMode(GameMode.MATH_GAME_MONEY_COUNT)} />
              <GameCard title="Ağırlık Karşılaştır" icon="⚖️" color="bg-gradient-to-br from-purple-500 to-pink-600" description="Hangisi daha ağır?" onClick={() => setMode(GameMode.MATH_GAME_WEIGHT_COMPARE)} />
              <GameCard title="Hangisi Uzun?" icon="📏" color="bg-gradient-to-br from-green-500 to-teal-600" description="Uzun olan nesneyi seç!" onClick={() => setMode(GameMode.MATH_GAME_LONGEST_OBJECT)} />
              <GameCard title="Hangisi Ağır?" icon="⚖️" color="bg-gradient-to-br from-gray-500 to-slate-600" description="Ağır olan nesneyi bul!" onClick={() => setMode(GameMode.MATH_GAME_HEAVIEST_OBJECT)} />
              <GameCard title="Tahmin Et" icon="🎯" color="bg-gradient-to-br from-amber-500 to-orange-600" description="Kavanozda kaç tane olduğunu tahmin et!" onClick={() => setMode(GameMode.MATH_GAME_ESTIMATE_JAR)} />
              <GameCard title="Saat Kaç Oyunu" icon="🕐" color="bg-gradient-to-br from-teal-500 to-green-600" description="Saati okumayı öğren!" onClick={() => setMode(GameMode.MATH_GAME_CLOCK_READING)} />
              <GameCard title="Para Hesaplama" icon="💰" color="bg-gradient-to-br from-yellow-500 to-amber-600" description="Para ile işlem yap!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Fırına Amca" icon="🏪" color="bg-gradient-to-br from-orange-500 to-red-600" description="Paralarımız ve alışveriş!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Terazi Oyunu" icon="⚖️" color="bg-gradient-to-br from-gray-500 to-slate-600" description="Hangi nesne daha ağır?" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Terazi Dengesi" icon="⚖️" color="bg-gradient-to-br from-amber-500 to-orange-600" description="Toplamada yer değiştirme özelliği!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Adım Ölçer" icon="👣" color="bg-gradient-to-br from-lime-500 to-green-600" description="Adımlarla mesafe ölç!" onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_VISUAL:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_1)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Görsel Dikkat</h2>
              <p className="text-white/80 text-sm md:text-base font-semibold mb-6 max-w-2xl mx-auto">
                Desenleri eşleştir, şekilleri bul ve görsel algını geliştir!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Hafıza Eşleştirme" icon="🧠" color="bg-gradient-to-br from-indigo-500 to-purple-600" description="Aynı kartları bul!" onClick={() => setMode(GameMode.MATH_GAME_MEMORY_MATCH)} />
              <GameCard title="Farklı Olanı Bul" icon="🔍" color="bg-gradient-to-br from-cyan-500 to-blue-600" description="Diğerlerinden farklı olanı seç!" onClick={() => setMode(GameMode.MATH_GAME_FIND_DIFFERENCE)} />
              <GameCard title="Örüntü Tamamla" icon="🎨" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Sıradaki ne olmalı?" onClick={() => setMode(GameMode.MATH_GAME_PATTERN_CONTINUE)} />
              <GameCard title="Desen Eşleştirme" icon="🎨" color="bg-gradient-to-br from-fuchsia-500 to-pink-600" description="Doğru desen ve yönü bul!" onClick={() => setMode(GameMode.PATTERN_PUZZLE_GAME)} />
              <GameCard title="Hafıza Kartları" icon="🃏" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Aynı kartları eşleştir!" onClick={() => setMode(GameMode.MATH_GAME_MEMORY_CARDS)} />
              <GameCard title="Renk Dedektifi" icon="🎨" color="bg-gradient-to-br from-red-500 to-pink-600" description="Aynı renkte olanları bul!" onClick={() => setMode(GameMode.MATH_GAME_COLOR_DETECTIVE)} />
              <GameCard title="Büyük mü Küçük mü?" icon="📐" color="bg-gradient-to-br from-blue-500 to-indigo-600" description="Aynı boyutta olanı bul!" onClick={() => setMode(GameMode.MATH_GAME_SIZE_MATCH)} />
              <GameCard title="Şekil Avcısı" icon="🔺" color="bg-gradient-to-br from-emerald-500 to-teal-600" description="Aynı şekli seç!" onClick={() => setMode(GameMode.MATH_GAME_SHAPE_HUNTER)} />
              <GameCard title="Yönümü Buluyorum" icon="🧭" color="bg-gradient-to-br from-cyan-500 to-blue-600" description="Aynı yöne bakan nesneyi bul!" onClick={() => setMode(GameMode.MATH_GAME_DIRECTION_MATCH)} />
              <GameCard title="Dikkatli Gözler" icon="👀" color="bg-gradient-to-br from-violet-500 to-purple-600" description="Detayları aynı olan resmi seç!" onClick={() => setMode(GameMode.MATH_GAME_CAREFUL_EYES)} />
              <GameCard title="Eksik Parça" icon="🧩" color="bg-gradient-to-br from-orange-500 to-amber-600" description="Eksik parçayı tamamla!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Sayı Tahmin" icon="🎯" color="bg-gradient-to-br from-red-500 to-pink-600" description="Sayıyı tahmin et!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Matematik Labirenti" icon="🌀" color="bg-gradient-to-br from-indigo-500 to-blue-600" description="İşlemleri çözerek çıkış bul!" onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.STORYBOOK:
        return <StoryBook onBack={() => setMode(GameMode.HOME)} />;

      // TEACHER TOOLS
      case GameMode.TEACHER_TOOLS_MENU:
        return <TeacherToolsMenu onBack={() => setMode(GameMode.HOME)} onSelectTool={(tool) => {
          const toolModeMap: Record<string, GameMode> = {
            'whiteboard': GameMode.TEACHER_WHITEBOARD,
            'random': GameMode.TEACHER_RANDOM_STUDENT,
            'timer': GameMode.TEACHER_TIMER,
            'group': GameMode.TEACHER_GROUP_MAKER,
            'dice': GameMode.TEACHER_DICE_ROLLER,
            'scoreboard': GameMode.TEACHER_SCOREBOARD,
            'noise': GameMode.TEACHER_NOISE_METER,
            'sticky': GameMode.TEACHER_STICKY_NOTES,
            'attendance': GameMode.TEACHER_ATTENDANCE,
            'seating': GameMode.TEACHER_SEATING_CHART,
            'poll': GameMode.TEACHER_QUICK_POLL,
            'wordcloud': GameMode.TEACHER_WORD_CLOUD,
            'birthday': GameMode.TEACHER_BIRTHDAY_CALENDAR,
            'goals': GameMode.TEACHER_CLASS_GOALS,
            'notice': GameMode.TEACHER_NOTICE_BULLETIN,
            'spinwheel': GameMode.TEACHER_SPIN_WHEEL
          };
          setMode(toolModeMap[tool]);
        }} />;

      case GameMode.TEACHER_WHITEBOARD:
        return <Whiteboard onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_RANDOM_STUDENT:
        return <RandomStudentPicker onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_TIMER:
        return <ClassTimer onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_GROUP_MAKER:
        return <GroupMaker onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_DICE_ROLLER:
        return <DiceRoller onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_SCOREBOARD:
        return <Scoreboard onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_NOISE_METER:
        return <NoiseMeter onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_STICKY_NOTES:
        return <StickyNotes onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_ATTENDANCE:
        return <AttendanceTracker onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_SEATING_CHART:
        return <SeatingChart onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_QUICK_POLL:
        return <QuickPoll onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_WORD_CLOUD:
        return <WordCloud onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_BIRTHDAY_CALENDAR:
        return <BirthdayCalendar onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_CLASS_GOALS:
        return <ClassGoals onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_NOTICE_BULLETIN:
        return <NoticeBulletin onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;

      case GameMode.TEACHER_SPIN_WHEEL:
        return <SpinWheel onExit={() => setMode(GameMode.TEACHER_TOOLS_MENU)} />;


      case GameMode.PLAYGROUND:
        return <Playground onExit={() => setMode(GameMode.HOME)} onNavigate={setMode} />;

      case GameMode.TWO_PLAYER_MENU:
        return (
          <div className="w-full max-w-7xl mx-auto px-2 bounce-in relative z-20">
            <div className="text-center mb-8">
              <button onClick={() => setMode(GameMode.PLAYGROUND)} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ OYUN ALANINA DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-amber-400 italic drop-shadow-2xl mb-4 uppercase">İki Kişilik Oyunlar</h2>
              <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">Arkadaşınla yarış! Klasik masa oyunları ve strateji oyunları!</p>
              <div className="flex justify-center gap-3">
                <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/30">ARKADAŞINLA OYNA! 👥</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Satranç" icon="♟️" color="bg-gradient-to-br from-slate-700 to-slate-900" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_CHESS)} />

              <GameCard title="Dama" icon="🔴" color="bg-gradient-to-br from-red-600 to-rose-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_CHECKERS)} />

              <GameCard title="Tavla" icon="🎲" color="bg-gradient-to-br from-amber-600 to-orange-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_BACKGAMMON)} />

              <GameCard title="Mangala" icon="🪨" color="bg-gradient-to-br from-emerald-600 to-teal-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_MANCALA)} />

              <GameCard title="Go" icon="⚫" color="bg-gradient-to-br from-slate-600 to-gray-900" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_GO)} />

              <GameCard title="Reversi" icon="⚪" color="bg-gradient-to-br from-indigo-600 to-purple-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_REVERSI)} />

              <GameCard title="Othello" icon="🔵" color="bg-gradient-to-br from-purple-600 to-fuchsia-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_OTHELLO)} />

              <GameCard title="XOX" icon="❌" color="bg-gradient-to-br from-cyan-600 to-blue-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_TIC_TAC_TOE)} />

              <GameCard title="Connect Four" icon="🟡" color="bg-gradient-to-br from-yellow-500 to-orange-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_CONNECT_FOUR)} />

              <GameCard title="Battleship" icon="🚢" color="bg-gradient-to-br from-blue-600 to-cyan-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_BATTLESHIP)} />

              <GameCard title="Domino" icon="🀄" color="bg-gradient-to-br from-slate-600 to-gray-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_DOMINO)} />

              <GameCard title="Jenga" icon="🧱" color="bg-gradient-to-br from-amber-500 to-yellow-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_JENGA)} />

              <GameCard title="Nine Men's Morris" icon="⭕" color="bg-gradient-to-br from-green-600 to-emerald-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_NINE_MENS_MORRIS)} />

              <GameCard title="Fanorona" icon="🎯" color="bg-gradient-to-br from-rose-600 to-pink-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_FANORONA)} />

              <GameCard title="Pente" icon="⚫" color="bg-gradient-to-br from-indigo-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_PENTE)} />

              <GameCard title="Gomoku" icon="⚪" color="bg-gradient-to-br from-purple-500 to-violet-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_GOMOKU)} />

              <GameCard title="Shogi" icon="🎴" color="bg-gradient-to-br from-red-500 to-rose-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_SHOGI)} />

              <GameCard title="Xiangqi" icon="🐉" color="bg-gradient-to-br from-orange-500 to-amber-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_XIANGQI)} />

              <GameCard title="Halma" icon="🔷" color="bg-gradient-to-br from-cyan-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_HALMA)} />

              <GameCard title="Kalah" icon="🌰" color="bg-gradient-to-br from-lime-500 to-green-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_KALAH)} />

              <GameCard title="Abalone" icon="🔮" color="bg-gradient-to-br from-teal-500 to-cyan-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_ABALONE)} />

              <GameCard title="Tak" icon="🏔️" color="bg-gradient-to-br from-slate-500 to-gray-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_TAK)} />

              <GameCard title="Santorini" icon="🏛️" color="bg-gradient-to-br from-sky-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_SANTORINI)} />

              <GameCard title="Hive" icon="🐝" color="bg-gradient-to-br from-yellow-500 to-amber-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_HIVE)} />

              <GameCard title="Quoridor" icon="🧩" color="bg-gradient-to-br from-indigo-500 to-purple-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_QUORIDOR)} />

              <GameCard title="Onitama" icon="🥋" color="bg-gradient-to-br from-red-500 to-rose-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_ONITAMA)} />

              <GameCard title="Blokus Duel" icon="🟦" color="bg-gradient-to-br from-fuchsia-500 to-pink-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_PLAYER_BLOKUS_DUEL)} />
            </div>
          </div>
        );

      case GameMode.PLAYGROUND_MEMORY:
        return <PlaygroundMemoryGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND)} />;

      case GameMode.PLAYGROUND_SPEED_MATH:
        return <SpeedMathGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND)} />;

      case GameMode.PLAYGROUND_NUMBER_CATCHER:
        return <NumberCatcherGame grade={stats.gradeLevel} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND)} />;

      case GameMode.PLAYGROUND_BALANCE:
        return <CosmicBalanceGame grade={stats.gradeLevel} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND)} />;

      case GameMode.PLAYGROUND_SUDOKU:
        return <SudokuGame grade={stats.gradeLevel} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND)} />;

      case GameMode.PLAYGROUND_TRUE_FALSE:
        const tfBackMode =
          // Math topics
          currentTopic === 'numbers' ? GameMode.MATH_PRACTICE_NUMBERS :
            currentTopic === 'operations' ? GameMode.MATH_PRACTICE_BASIC :
              currentTopic === 'geometry' ? GameMode.MATH_PRACTICE_GEOMETRY :
                currentTopic === 'data' ? GameMode.MATH_PRACTICE_COMPARISON :
                  // Turkish topics
                  currentTopic === 'listening' ? GameMode.TURKISH_LISTENING :
                    currentTopic === 'speaking' ? GameMode.TURKISH_SPEAKING :
                      currentTopic === 'reading' ? GameMode.TURKISH_READING :
                        currentTopic === 'writing' ? GameMode.TURKISH_WRITING :
                          // Science topics
                          currentTopic === 'life' ? GameMode.SCIENCE_LIFE :
                            currentTopic === 'matter' ? GameMode.SCIENCE_MATTER :
                              currentTopic === 'physical' ? GameMode.SCIENCE_PHYSICAL :
                                currentTopic === 'earth' ? GameMode.SCIENCE_EARTH :
                                  // English topics
                                  currentTopic === 'communication' ? GameMode.ENGLISH_COMMUNICATION :
                                    currentTopic === 'daily-life' ? GameMode.ENGLISH_DAILY_LIFE :
                                      currentTopic === 'grammar' ? GameMode.ENGLISH_LANGUAGE_STRUCTURES :
                                        currentTopic === 'vocabulary' ? GameMode.ENGLISH_EXPRESSIONS :
                                          // Social Studies topics
                                          currentTopic === 'history' ? GameMode.SOCIAL_STUDIES :
                                            currentTopic === 'geography' ? GameMode.SOCIAL_STUDIES :
                                              currentTopic === 'citizenship' ? GameMode.SOCIAL_STUDIES :
                                                currentTopic === 'culture' ? GameMode.SOCIAL_STUDIES :
                                                  // Religion topics
                                                  currentTopic === 'belief' ? GameMode.RELIGION_BELIEF :
                                                    currentTopic === 'worship' ? GameMode.RELIGION_WORSHIP :
                                                      currentTopic === 'prophet' ? GameMode.RELIGION_PROPHET :
                                                        currentTopic === 'quran' ? GameMode.RELIGION_QURAN :
                                                          currentTopic === 'morals' ? GameMode.RELIGION_MORALS :
                                                            // Life Science topics
                                                            currentTopic === 'school' ? GameMode.LIFE_SCIENCE_SCHOOL :
                                                              currentTopic === 'home' ? GameMode.LIFE_SCIENCE_HOME :
                                                                currentTopic === 'health' ? GameMode.LIFE_SCIENCE_HEALTH :
                                                                  currentTopic === 'safe' ? GameMode.LIFE_SCIENCE_SAFE :
                                                                    currentTopic === 'country' ? GameMode.LIFE_SCIENCE_COUNTRY :
                                                                      // PE topics
                                                                      currentTopic === 'movement' ? GameMode.PE_MOVEMENT :
                                                                        currentTopic === 'healthy-life' ? GameMode.PE_HEALTHY_LIFE :
                                                                          currentTopic === 'social-emotional' ? GameMode.PE_SOCIAL_EMOTIONAL :
                                                                            // Visual Arts topics
                                                                            currentTopic === 'visual-communication' ? GameMode.ART_VISUAL_COMMUNICATION :
                                                                              currentTopic === 'cultural-heritage' ? GameMode.ART_CULTURAL_HERITAGE :
                                                                                currentTopic === 'criticism-aesthetics' ? GameMode.ART_CRITICISM_AESTHETICS :
                                                                                  // Music topics
                                                                                  currentTopic === 'music-theory' ? GameMode.MUSIC :
                                                                                    currentTopic === 'music-practice' ? GameMode.MUSIC :
                                                                                      currentTopic === 'music-culture' ? GameMode.MUSIC :
                                                                                        // IT Software topics
                                                                                        currentTopic === 'algorithms' ? GameMode.IT_SOFTWARE_ALGORITHMS :
                                                                                          currentTopic === 'programming' ? GameMode.IT_SOFTWARE_PROGRAMMING :
                                                                                            currentTopic === 'problem-solving' ? GameMode.IT_SOFTWARE_PROBLEM_SOLVING :
                                                                                              currentTopic === 'computational-thinking' ? GameMode.IT_SOFTWARE_COMPUTATIONAL_THINKING :
                                                                                                // Chess topics
                                                                                                currentTopic === 'chess-basics' ? GameMode.CHESS_BASICS :
                                                                                                  currentTopic === 'chess-tactics' ? GameMode.CHESS_TACTICS :
                                                                                                    currentTopic === 'chess-strategy' ? GameMode.CHESS_STRATEGY :
                                                                                                      currentTopic === 'chess-endgame' ? GameMode.CHESS_ENDGAME :
                                                                                                        // Default fallback
                                                                                                        GameMode.HOME;
        return <TrueFalseGame grade={stats.gradeLevel} topic={currentTopic} onComplete={handleGameComplete} onExit={() => setMode(tfBackMode)} />;

      case GameMode.PLAYGROUND_FILL_BLANK:
        const fbBackMode =
          // Math topics
          currentTopic === 'numbers' ? GameMode.MATH_PRACTICE_NUMBERS :
            currentTopic === 'operations' ? GameMode.MATH_PRACTICE_BASIC :
              currentTopic === 'geometry' ? GameMode.MATH_PRACTICE_GEOMETRY :
                currentTopic === 'data' ? GameMode.MATH_PRACTICE_COMPARISON :
                  // Turkish topics
                  currentTopic === 'listening' ? GameMode.TURKISH_LISTENING :
                    currentTopic === 'speaking' ? GameMode.TURKISH_SPEAKING :
                      currentTopic === 'reading' ? GameMode.TURKISH_READING :
                        currentTopic === 'writing' ? GameMode.TURKISH_WRITING :
                          // Science topics
                          currentTopic === 'life' ? GameMode.SCIENCE_LIFE :
                            currentTopic === 'matter' ? GameMode.SCIENCE_MATTER :
                              currentTopic === 'physical' ? GameMode.SCIENCE_PHYSICAL :
                                currentTopic === 'earth' ? GameMode.SCIENCE_EARTH :
                                  // English topics
                                  currentTopic === 'communication' ? GameMode.ENGLISH_COMMUNICATION :
                                    currentTopic === 'daily-life' ? GameMode.ENGLISH_DAILY_LIFE :
                                      currentTopic === 'grammar' ? GameMode.ENGLISH_LANGUAGE_STRUCTURES :
                                        currentTopic === 'vocabulary' ? GameMode.ENGLISH_EXPRESSIONS :
                                          // Social Studies topics
                                          currentTopic === 'history' ? GameMode.SOCIAL_STUDIES :
                                            currentTopic === 'geography' ? GameMode.SOCIAL_STUDIES :
                                              currentTopic === 'citizenship' ? GameMode.SOCIAL_STUDIES :
                                                currentTopic === 'culture' ? GameMode.SOCIAL_STUDIES :
                                                  // Religion topics
                                                  currentTopic === 'belief' ? GameMode.RELIGION_BELIEF :
                                                    currentTopic === 'worship' ? GameMode.RELIGION_WORSHIP :
                                                      currentTopic === 'prophet' ? GameMode.RELIGION_PROPHET :
                                                        currentTopic === 'quran' ? GameMode.RELIGION_QURAN :
                                                          currentTopic === 'morals' ? GameMode.RELIGION_MORALS :
                                                            // Life Science topics
                                                            currentTopic === 'school' ? GameMode.LIFE_SCIENCE_SCHOOL :
                                                              currentTopic === 'home' ? GameMode.LIFE_SCIENCE_HOME :
                                                                currentTopic === 'health' ? GameMode.LIFE_SCIENCE_HEALTH :
                                                                  currentTopic === 'safe' ? GameMode.LIFE_SCIENCE_SAFE :
                                                                    currentTopic === 'country' ? GameMode.LIFE_SCIENCE_COUNTRY :
                                                                      // PE topics
                                                                      currentTopic === 'movement' ? GameMode.PE_MOVEMENT :
                                                                        currentTopic === 'healthy-life' ? GameMode.PE_HEALTHY_LIFE :
                                                                          currentTopic === 'social-emotional' ? GameMode.PE_SOCIAL_EMOTIONAL :
                                                                            // Visual Arts topics
                                                                            currentTopic === 'visual-communication' ? GameMode.ART_VISUAL_COMMUNICATION :
                                                                              currentTopic === 'cultural-heritage' ? GameMode.ART_CULTURAL_HERITAGE :
                                                                                currentTopic === 'criticism-aesthetics' ? GameMode.ART_CRITICISM_AESTHETICS :
                                                                                  // Music topics
                                                                                  currentTopic === 'music-theory' ? GameMode.MUSIC :
                                                                                    currentTopic === 'music-practice' ? GameMode.MUSIC :
                                                                                      currentTopic === 'music-culture' ? GameMode.MUSIC :
                                                                                        // IT Software topics
                                                                                        currentTopic === 'algorithms' ? GameMode.IT_SOFTWARE_ALGORITHMS :
                                                                                          currentTopic === 'programming' ? GameMode.IT_SOFTWARE_PROGRAMMING :
                                                                                            currentTopic === 'problem-solving' ? GameMode.IT_SOFTWARE_PROBLEM_SOLVING :
                                                                                              currentTopic === 'computational-thinking' ? GameMode.IT_SOFTWARE_COMPUTATIONAL_THINKING :
                                                                                                // Chess topics
                                                                                                currentTopic === 'chess-basics' ? GameMode.CHESS_BASICS :
                                                                                                  currentTopic === 'chess-tactics' ? GameMode.CHESS_TACTICS :
                                                                                                    currentTopic === 'chess-strategy' ? GameMode.CHESS_STRATEGY :
                                                                                                      currentTopic === 'chess-endgame' ? GameMode.CHESS_ENDGAME :
                                                                                                        // Default fallback
                                                                                                        GameMode.HOME;
        return <FillBlankGame grade={stats.gradeLevel} topic={currentTopic} onComplete={handleGameComplete} onExit={() => setMode(fbBackMode)} />;

      case GameMode.PLAYGROUND_CLASSIC_QUESTION:
        const cqBackMode =
          // Math topics
          currentTopic === 'numbers' ? GameMode.MATH_PRACTICE_NUMBERS :
            currentTopic === 'operations' ? GameMode.MATH_PRACTICE_BASIC :
              currentTopic === 'geometry' ? GameMode.MATH_PRACTICE_GEOMETRY :
                currentTopic === 'data' ? GameMode.MATH_PRACTICE_COMPARISON :
                  // Turkish topics
                  currentTopic === 'listening' ? GameMode.TURKISH_LISTENING :
                    currentTopic === 'speaking' ? GameMode.TURKISH_SPEAKING :
                      currentTopic === 'reading' ? GameMode.TURKISH_READING :
                        currentTopic === 'writing' ? GameMode.TURKISH_WRITING :
                          // Science topics
                          currentTopic === 'life' ? GameMode.SCIENCE_LIFE :
                            currentTopic === 'matter' ? GameMode.SCIENCE_MATTER :
                              currentTopic === 'physical' ? GameMode.SCIENCE_PHYSICAL :
                                currentTopic === 'earth' ? GameMode.SCIENCE_EARTH :
                                  // English topics
                                  currentTopic === 'communication' ? GameMode.ENGLISH_COMMUNICATION :
                                    currentTopic === 'daily-life' ? GameMode.ENGLISH_DAILY_LIFE :
                                      currentTopic === 'grammar' ? GameMode.ENGLISH_LANGUAGE_STRUCTURES :
                                        currentTopic === 'vocabulary' ? GameMode.ENGLISH_EXPRESSIONS :
                                          // Social Studies topics
                                          currentTopic === 'history' ? GameMode.SOCIAL_STUDIES :
                                            currentTopic === 'geography' ? GameMode.SOCIAL_STUDIES :
                                              currentTopic === 'citizenship' ? GameMode.SOCIAL_STUDIES :
                                                currentTopic === 'culture' ? GameMode.SOCIAL_STUDIES :
                                                  // Religion topics
                                                  currentTopic === 'belief' ? GameMode.RELIGION_BELIEF :
                                                    currentTopic === 'worship' ? GameMode.RELIGION_WORSHIP :
                                                      currentTopic === 'prophet' ? GameMode.RELIGION_PROPHET :
                                                        currentTopic === 'quran' ? GameMode.RELIGION_QURAN :
                                                          currentTopic === 'morals' ? GameMode.RELIGION_MORALS :
                                                            // Life Science topics
                                                            currentTopic === 'school' ? GameMode.LIFE_SCIENCE_SCHOOL :
                                                              currentTopic === 'home' ? GameMode.LIFE_SCIENCE_HOME :
                                                                currentTopic === 'health' ? GameMode.LIFE_SCIENCE_HEALTH :
                                                                  currentTopic === 'safe' ? GameMode.LIFE_SCIENCE_SAFE :
                                                                    currentTopic === 'country' ? GameMode.LIFE_SCIENCE_COUNTRY :
                                                                      // PE topics
                                                                      currentTopic === 'movement' ? GameMode.PE_MOVEMENT :
                                                                        currentTopic === 'healthy-life' ? GameMode.PE_HEALTHY_LIFE :
                                                                          currentTopic === 'social-emotional' ? GameMode.PE_SOCIAL_EMOTIONAL :
                                                                            // Visual Arts topics
                                                                            currentTopic === 'visual-communication' ? GameMode.ART_VISUAL_COMMUNICATION :
                                                                              currentTopic === 'cultural-heritage' ? GameMode.ART_CULTURAL_HERITAGE :
                                                                                currentTopic === 'criticism-aesthetics' ? GameMode.ART_CRITICISM_AESTHETICS :
                                                                                  // Music topics
                                                                                  currentTopic === 'music-theory' ? GameMode.MUSIC :
                                                                                    currentTopic === 'music-practice' ? GameMode.MUSIC :
                                                                                      currentTopic === 'music-culture' ? GameMode.MUSIC :
                                                                                        // IT Software topics
                                                                                        currentTopic === 'algorithms' ? GameMode.IT_SOFTWARE_ALGORITHMS :
                                                                                          currentTopic === 'programming' ? GameMode.IT_SOFTWARE_PROGRAMMING :
                                                                                            currentTopic === 'problem-solving' ? GameMode.IT_SOFTWARE_PROBLEM_SOLVING :
                                                                                              currentTopic === 'computational-thinking' ? GameMode.IT_SOFTWARE_COMPUTATIONAL_THINKING :
                                                                                                // Chess topics
                                                                                                currentTopic === 'chess-basics' ? GameMode.CHESS_BASICS :
                                                                                                  currentTopic === 'chess-tactics' ? GameMode.CHESS_TACTICS :
                                                                                                    currentTopic === 'chess-strategy' ? GameMode.CHESS_STRATEGY :
                                                                                                      currentTopic === 'chess-endgame' ? GameMode.CHESS_ENDGAME :
                                                                                                        // Default fallback
                                                                                                        GameMode.HOME;
        return <ClassicQuestionGame grade={stats.gradeLevel} topic={currentTopic} onComplete={handleGameComplete} onExit={() => setMode(cqBackMode)} />;

      case GameMode.PLAYGROUND_TEST:
        const testBackMode =
          // Math topics
          currentTopic === 'numbers' ? GameMode.MATH_PRACTICE_NUMBERS :
            currentTopic === 'operations' ? GameMode.MATH_PRACTICE_BASIC :
              currentTopic === 'geometry' ? GameMode.MATH_PRACTICE_GEOMETRY :
                currentTopic === 'data' ? GameMode.MATH_PRACTICE_COMPARISON :
                  // Turkish topics
                  currentTopic === 'listening' ? GameMode.TURKISH_LISTENING :
                    currentTopic === 'speaking' ? GameMode.TURKISH_SPEAKING :
                      currentTopic === 'reading' ? GameMode.TURKISH_READING :
                        currentTopic === 'writing' ? GameMode.TURKISH_WRITING :
                          // Science topics
                          currentTopic === 'life' ? GameMode.SCIENCE_LIFE :
                            currentTopic === 'matter' ? GameMode.SCIENCE_MATTER :
                              currentTopic === 'physical' ? GameMode.SCIENCE_PHYSICAL :
                                currentTopic === 'earth' ? GameMode.SCIENCE_EARTH :
                                  // English topics
                                  currentTopic === 'communication' ? GameMode.ENGLISH_COMMUNICATION :
                                    currentTopic === 'daily-life' ? GameMode.ENGLISH_DAILY_LIFE :
                                      currentTopic === 'grammar' ? GameMode.ENGLISH_LANGUAGE_STRUCTURES :
                                        currentTopic === 'vocabulary' ? GameMode.ENGLISH_EXPRESSIONS :
                                          // Social Studies topics
                                          currentTopic === 'history' ? GameMode.SOCIAL_STUDIES :
                                            currentTopic === 'geography' ? GameMode.SOCIAL_STUDIES :
                                              currentTopic === 'citizenship' ? GameMode.SOCIAL_STUDIES :
                                                currentTopic === 'culture' ? GameMode.SOCIAL_STUDIES :
                                                  // Religion topics
                                                  currentTopic === 'belief' ? GameMode.RELIGION_BELIEF :
                                                    currentTopic === 'worship' ? GameMode.RELIGION_WORSHIP :
                                                      currentTopic === 'prophet' ? GameMode.RELIGION_PROPHET :
                                                        currentTopic === 'quran' ? GameMode.RELIGION_QURAN :
                                                          currentTopic === 'morals' ? GameMode.RELIGION_MORALS :
                                                            // Life Science topics
                                                            currentTopic === 'school' ? GameMode.LIFE_SCIENCE_SCHOOL :
                                                              currentTopic === 'home' ? GameMode.LIFE_SCIENCE_HOME :
                                                                currentTopic === 'health' ? GameMode.LIFE_SCIENCE_HEALTH :
                                                                  currentTopic === 'safe' ? GameMode.LIFE_SCIENCE_SAFE :
                                                                    currentTopic === 'country' ? GameMode.LIFE_SCIENCE_COUNTRY :
                                                                      // PE topics
                                                                      currentTopic === 'movement' ? GameMode.PE_MOVEMENT :
                                                                        currentTopic === 'healthy-life' ? GameMode.PE_HEALTHY_LIFE :
                                                                          currentTopic === 'social-emotional' ? GameMode.PE_SOCIAL_EMOTIONAL :
                                                                            // Visual Arts topics
                                                                            currentTopic === 'visual-communication' ? GameMode.ART_VISUAL_COMMUNICATION :
                                                                              currentTopic === 'cultural-heritage' ? GameMode.ART_CULTURAL_HERITAGE :
                                                                                currentTopic === 'criticism-aesthetics' ? GameMode.ART_CRITICISM_AESTHETICS :
                                                                                  // Music topics
                                                                                  currentTopic === 'music-theory' ? GameMode.MUSIC :
                                                                                    currentTopic === 'music-practice' ? GameMode.MUSIC :
                                                                                      currentTopic === 'music-culture' ? GameMode.MUSIC :
                                                                                        // IT Software topics
                                                                                        currentTopic === 'algorithms' ? GameMode.IT_SOFTWARE_ALGORITHMS :
                                                                                          currentTopic === 'programming' ? GameMode.IT_SOFTWARE_PROGRAMMING :
                                                                                            currentTopic === 'problem-solving' ? GameMode.IT_SOFTWARE_PROBLEM_SOLVING :
                                                                                              currentTopic === 'computational-thinking' ? GameMode.IT_SOFTWARE_COMPUTATIONAL_THINKING :
                                                                                                // Chess topics
                                                                                                currentTopic === 'chess-basics' ? GameMode.CHESS_BASICS :
                                                                                                  currentTopic === 'chess-tactics' ? GameMode.CHESS_TACTICS :
                                                                                                    currentTopic === 'chess-strategy' ? GameMode.CHESS_STRATEGY :
                                                                                                      currentTopic === 'chess-endgame' ? GameMode.CHESS_ENDGAME :
                                                                                                        // Default fallback
                                                                                                        GameMode.HOME;
        return <TestGame grade={stats.gradeLevel} topic={currentTopic} onComplete={handleGameComplete} onExit={() => setMode(testBackMode)} />;

      case GameMode.PLAYGROUND_LOGIC_MENU:
        const logicGames = [
          "Killer Sudoku", "Nonogram", "Minesweeper", "Jigsaw Sudoku", "Samurai Sudoku", "Hyper Sudoku", "Windoku", "Diagonal Sudoku", "Irregular Sudoku", "Mini Sudoku", "Hex Sudoku", "Alphabet Sudoku", "Wordoku", "Samurai Killer Sudoku", "Chaos Sudoku", "Anti-Knight Sudoku", "Anti-King Sudoku", "Thermo Sudoku", "Arrow Sudoku", "Little Killer Sudoku", "Sandwich Sudoku", "XV Sudoku", "Even-Odd Sudoku", "Greater Than Sudoku", "Consecutive Sudoku", "Non-Consecutive Sudoku", "Sudoku X", "Sudoku Y", "Color Sudoku", "Calcudoku", "KenKen", "Kakuro", "Cross Sums", "Futoshiki", "Skyscrapers", "Suguru", "Tectonics", "Star Battle", "Two Not Touch", "Slitherlink", "Masyu", "Hashiwokakero (Bridges)", "Nurikabe", "Hitori", "Akari (Light Up)", "Yajilin", "Fillomino", "Ripple Effect", "Binairo", "Takuzu", "Binoxxo", "Kropki Sudoku", "Dot Sudoku", "Numberlink", "Arukone", "Hidato", "Numbrix", "Picross", "Griddlers", "Shikaku", "LITS", "Pentomino Puzzle", "Domino Sudoku", "Battleships Puzzle", "Tapa", "Cave Puzzle", "Kuromasu", "Slant", "Tent Puzzle", "Magnets Puzzle", "Mathdoku", "Latin Squares", "Strimko", "Mastermind", "Einstein Riddle", "Logic Grid Puzzle", "Zebra Puzzle", "Tower Puzzle", "Train Tracks", "Loop Puzzle", "Spiral Galaxies", "Fill-a-Pix", "Light and Shadow", "Number Snake", "Cross Logic", "Blocked Sudoku", "Greater Than Killer Sudoku", "Triple Sudoku", "Quad Sudoku", "Samurai Wordoku", "Mosaic Puzzle", "Polyomino Puzzle", "Nurimisaki", "Balance Loop", "Domino Logic", "Arrows Puzzle", "Grid Fill Puzzle", "Path Finder Puzzle", "Area Placement Puzzle"
        ];

        return (
          <div className="w-full max-w-7xl mx-auto px-2 bounce-in relative z-20">
            <div className="text-center mb-8">
              <button onClick={() => setMode(GameMode.PLAYGROUND)} className="mb-6 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ OYUN ALANINA DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-rose-400 italic drop-shadow-2xl mb-4 uppercase">Zeka Oyunları</h2>
              <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base mb-6">Odaklan, strateji kur ve çöz! Yüzlerce mantık bulmacası seni bekliyor.</p>
              <div className="flex justify-center gap-3">
                <span className="bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-500/30">MANTIK VE ZEKA GELİŞİMİ DOZUNDA! 🧠</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              {/* Active Games */}
              <GameCard title="Killer Sudoku" icon="🧩" color="bg-gradient-to-br from-indigo-600 to-purple-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_KILLER_SUDOKU)} />

              <GameCard title="Nonogram" icon="🎨" color="bg-gradient-to-br from-rose-600 to-pink-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_NONOGRAM)} />

              <GameCard title="Mayın Tarlası" icon="💣" color="bg-gradient-to-br from-emerald-600 to-teal-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_MINESWEEPER)} />

              <GameCard title="Kakuro" icon="➕" color="bg-gradient-to-br from-orange-600 to-red-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_KAKURO)} />

              <GameCard title="Futoshiki" icon="📐" color="bg-gradient-to-br from-yellow-600 to-amber-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_FUTOSHIKI)} />

              <GameCard title="Hashiwokakero" icon="🌉" color="bg-gradient-to-br from-cyan-600 to-blue-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_HASHI)} />

              <GameCard title="Slitherlink" icon="🔗" color="bg-gradient-to-br from-sky-600 to-indigo-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_SLITHERLINK)} />

              <GameCard title="Akari" icon="💡" color="bg-gradient-to-br from-yellow-400 to-orange-600" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_AKARI)} />

              <GameCard title="Çadır ve Ağaç" icon="🏕️" color="bg-gradient-to-br from-green-600 to-emerald-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_TENTS_TREES)} />

              <GameCard title="KenKen" icon="🔢" color="bg-gradient-to-br from-blue-600 to-indigo-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_KENKEN)} />

              <GameCard title="Hitori" icon="⬛" color="bg-gradient-to-br from-slate-700 to-slate-900" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_HITORI)} />

              <GameCard title="Shikaku" icon="📐" color="bg-gradient-to-br from-orange-500 to-red-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_SHIKAKU)} />

              <GameCard title="Suguru" icon="🗺️" color="bg-gradient-to-br from-indigo-500 to-purple-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_SUGURU)} />

              <GameCard title="Nurikabe" icon="🏝️" color="bg-gradient-to-br from-cyan-600 to-blue-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_NURIKABE)} />

              <GameCard title="Star Battle" icon="⭐" color="bg-gradient-to-br from-yellow-500 to-amber-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_STAR_BATTLE)} />

              <GameCard title="Numberlink" icon="🔀" color="bg-gradient-to-br from-pink-600 to-rose-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_NUMBERLINK)} />

              <GameCard title="Binairo" icon="🔴" color="bg-gradient-to-br from-fuchsia-600 to-purple-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_BINAIRO)} />

              <GameCard title="Kuromasu" icon="👁️" color="bg-gradient-to-br from-slate-600 to-gray-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_KUROMASU)} />

              <GameCard title="Skyscrapers" icon="🏢" color="bg-gradient-to-br from-indigo-500 to-purple-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_SKYSCRAPERS)} />

              <GameCard title="Battleships" icon="🚢" color="bg-gradient-to-br from-blue-600 to-cyan-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_BATTLESHIPS)} />

              <GameCard title="Fillomino" icon="🗺️" color="bg-gradient-to-br from-emerald-500 to-teal-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_FILLOMINO)} />

              <GameCard title="Slant" icon="📏" color="bg-gradient-to-br from-sky-500 to-indigo-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_SLANT)} />

              <GameCard title="Tapa" icon="🧱" color="bg-gradient-to-br from-purple-500 to-indigo-900" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_TAPA)} />

              <GameCard title="Zebra Puzzle" icon="🦓" color="bg-gradient-to-br from-cyan-500 to-blue-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_ZEBRA)} />

              <GameCard title="Numbrix" icon="🔢" color="bg-gradient-to-br from-rose-500 to-orange-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_NUMBRIX)} />

              <GameCard title="Ripple Effect" icon="🌊" color="bg-gradient-to-br from-teal-500 to-emerald-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_RIPPLE_EFFECT)} />

              <GameCard title="Masyu" icon="📿" color="bg-gradient-to-br from-slate-600 to-gray-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_MASYU)} />

              <GameCard title="Yajilin" icon="🏹" color="bg-gradient-to-br from-purple-500 to-pink-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_YAJILIN)} />

              <GameCard title="Hidato" icon="🐍" color="bg-gradient-to-br from-yellow-500 to-rose-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_HIDATO)} />

              <GameCard title="Magnets Puzzle" icon="🧲" color="bg-gradient-to-br from-red-500 to-blue-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_MAGNETS)} />

              <GameCard title="LITS" icon="🧩" color="bg-gradient-to-br from-orange-500 to-amber-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_LITS)} />

              <GameCard title="Spiral Galaxies" icon="🌌" color="bg-gradient-to-br from-purple-500 to-fuchsia-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_SPIRAL_GALAXIES)} />

              <GameCard title="Train Tracks" icon="🚂" color="bg-gradient-to-br from-emerald-500 to-teal-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_TRAIN_TRACKS)} />

              <GameCard title="Mastermind" icon="🕵️‍♂️" color="bg-gradient-to-br from-indigo-500 to-blue-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_MASTERMIND)} />

              <GameCard title="Domino Logic" icon="🁣" color="bg-gradient-to-br from-red-500 to-rose-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_DOMINOSA)} />

              <GameCard title="Cave Puzzle" icon="🦇" color="bg-gradient-to-br from-amber-500 to-orange-800" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_CAVE)} />

              <GameCard title="Jigsaw Sudoku" icon="🧩" color="bg-gradient-to-br from-sky-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_JIGSAW_SUDOKU)} />

              <GameCard title="Samurai Sudoku" icon="🥋" color="bg-gradient-to-br from-emerald-500 to-green-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_SAMURAI_SUDOKU)} />

              <GameCard title="Hyper Sudoku" icon="🎯" color="bg-gradient-to-br from-rose-500 to-pink-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_HYPER_SUDOKU)} />

              <GameCard title="Windoku" icon="🪟" color="bg-gradient-to-br from-orange-500 to-amber-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_WINDOKU)} />

              <GameCard title="Diagonal Sudoku" icon="↗️" color="bg-gradient-to-br from-purple-500 to-violet-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_DIAGONAL_SUDOKU)} />

              <GameCard title="Irregular Sudoku" icon="🗺️" color="bg-gradient-to-br from-cyan-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_IRREGULAR_SUDOKU)} />

              <GameCard title="Mini Sudoku" icon="🔍" color="bg-gradient-to-br from-lime-500 to-green-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_MINI_SUDOKU)} />

              <GameCard title="Hex Sudoku" icon="⬡" color="bg-gradient-to-br from-red-500 to-rose-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_HEX_SUDOKU)} />

              <GameCard title="Alphabet Sudoku" icon="🔤" color="bg-gradient-to-br from-yellow-500 to-orange-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_ALPHABET_SUDOKU)} />

              <GameCard title="Wordoku" icon="📝" color="bg-gradient-to-br from-indigo-500 to-purple-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_WORDOKU)} />

              <GameCard title="Samurai Killer Sudoku" icon="⚔️" color="bg-gradient-to-br from-blue-500 to-cyan-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_SAMURAI_KILLER_SUDOKU)} />

              <GameCard title="Chaos Sudoku" icon="🌀" color="bg-gradient-to-br from-fuchsia-500 to-pink-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_CHAOS_SUDOKU)} />

              <GameCard title="Anti-Knight Sudoku" icon="♞" color="bg-gradient-to-br from-rose-500 to-red-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_ANTI_KNIGHT_SUDOKU)} />

              <GameCard title="Anti-King Sudoku" icon="♚" color="bg-gradient-to-br from-orange-500 to-amber-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_ANTI_KING_SUDOKU)} />

              <GameCard title="Thermo Sudoku" icon="🌡️" color="bg-gradient-to-br from-purple-500 to-fuchsia-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.THERMO_SUDOKU)} />

              <GameCard title="Arrow Sudoku" icon="➡️" color="bg-gradient-to-br from-cyan-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.ARROW_SUDOKU)} />

              <GameCard title="Little Killer Sudoku" icon="🔪" color="bg-gradient-to-br from-indigo-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LITTLE_KILLER_SUDOKU)} />

              <GameCard title="Sandwich Sudoku" icon="🥪" color="bg-gradient-to-br from-emerald-500 to-green-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.SANDWICH_SUDOKU)} />

              <GameCard title="XV Sudoku" icon="🔟" color="bg-gradient-to-br from-rose-500 to-pink-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.XV_SUDOKU)} />

              <GameCard title="Even-Odd Sudoku" icon="⚖️" color="bg-gradient-to-br from-orange-500 to-amber-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.EVEN_ODD_SUDOKU)} />

              <GameCard title="Greater Than Sudoku" icon="➕" color="bg-gradient-to-br from-purple-500 to-violet-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.GREATER_THAN_SUDOKU)} />

              <GameCard title="Consecutive Sudoku" icon="🔗" color="bg-gradient-to-br from-cyan-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.CONSECUTIVE_SUDOKU)} />

              <GameCard title="Non-Consecutive Sudoku" icon="⛔" color="bg-gradient-to-br from-lime-500 to-green-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.NON_CONSECUTIVE_SUDOKU)} />

              <GameCard title="Sudoku X" icon="❌" color="bg-gradient-to-br from-red-500 to-rose-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.SUDOKU_X)} />

              <GameCard title="Sudoku Y" icon="🔱" color="bg-gradient-to-br from-yellow-500 to-orange-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.SUDOKU_Y)} />

              <GameCard title="Color Sudoku" icon="🎨" color="bg-gradient-to-br from-indigo-500 to-purple-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.COLOR_SUDOKU)} />

              <GameCard title="Calcudoku" icon="🧮" color="bg-gradient-to-br from-cyan-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.CALCUDOKU)} />

              <GameCard title="Cross Sums" icon="➕" color="bg-gradient-to-br from-rose-500 to-pink-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.CROSS_SUMS)} />

              <GameCard title="Tectonics" icon="🗻" color="bg-gradient-to-br from-orange-500 to-amber-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TECTONICS)} />

              <GameCard title="Two Not Touch" icon="🚫" color="bg-gradient-to-br from-purple-500 to-violet-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TWO_NOT_TOUCH)} />

              <GameCard title="Takuzu" icon="⚫" color="bg-gradient-to-br from-cyan-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.TAKUZU)} />

              <GameCard title="Binoxxo" icon="⭕" color="bg-gradient-to-br from-lime-500 to-green-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.BINOXXO)} />

              <GameCard title="Kropki Sudoku" icon="⚪" color="bg-gradient-to-br from-red-500 to-rose-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.KROPKI_SUDOKU)} />

              <GameCard title="Dot Sudoku" icon="🔵" color="bg-gradient-to-br from-yellow-500 to-orange-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.DOT_SUDOKU)} />

              <GameCard title="Arukone" icon="🔀" color="bg-gradient-to-br from-indigo-500 to-purple-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.ARUKONE)} />

              <GameCard title="Picross" icon="🖼️" color="bg-gradient-to-br from-cyan-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.PICROSS)} />

              <GameCard title="Griddlers" icon="🎯" color="bg-gradient-to-br from-emerald-500 to-green-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.GRIDDLERS)} />

              <GameCard title="Pentomino Puzzle" icon="🧩" color="bg-gradient-to-br from-rose-500 to-pink-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.PENTOMINO_PUZZLE)} />

              <GameCard title="Domino Sudoku" icon="🀄" color="bg-gradient-to-br from-orange-500 to-amber-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.DOMINO_SUDOKU)} />

              <GameCard title="Mathdoku" icon="🔢" color="bg-gradient-to-br from-purple-500 to-violet-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.MATHDOKU)} />

              <GameCard title="Latin Squares" icon="🔠" color="bg-gradient-to-br from-cyan-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LATIN_SQUARES)} />

              <GameCard title="Strimko" icon="🌊" color="bg-gradient-to-br from-lime-500 to-green-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.STRIMKO)} />

              <GameCard title="Einstein Riddle" icon="🧠" color="bg-gradient-to-br from-red-500 to-rose-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.EINSTEIN_RIDDLE)} />

              <GameCard title="Logic Grid Puzzle" icon="📊" color="bg-gradient-to-br from-yellow-500 to-orange-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_GRID_PUZZLE)} />

              <GameCard title="Tower Puzzle" icon="🗼" color="bg-gradient-to-br from-indigo-500 to-purple-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_TOWER_PUZZLE)} />

              <GameCard title="Loop Puzzle" icon="🔄" color="bg-gradient-to-br from-emerald-500 to-green-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOOP_PUZZLE)} />

              <GameCard title="Fill-a-Pix" icon="🎨" color="bg-gradient-to-br from-rose-500 to-pink-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.FILL_A_PIX)} />

              <GameCard title="Light and Shadow" icon="💡" color="bg-gradient-to-br from-sky-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_LIGHT_AND_SHADOW)} />

              <GameCard title="Number Snake" icon="🐍" color="bg-gradient-to-br from-emerald-500 to-green-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.NUMBER_SNAKE)} />

              <GameCard title="Cross Logic" icon="✖️" color="bg-gradient-to-br from-rose-500 to-red-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_CROSS_LOGIC)} />

              <GameCard title="Blocked Sudoku" icon="🧱" color="bg-gradient-to-br from-orange-500 to-amber-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_BLOCKED_SUDOKU)} />

              <GameCard title="Greater Than Killer Sudoku" icon="🔪" color="bg-gradient-to-br from-purple-500 to-violet-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_GREATER_THAN_KILLER_SUDOKU)} />

              <GameCard title="Triple Sudoku" icon="3️⃣" color="bg-gradient-to-br from-cyan-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_TRIPLE_SUDOKU)} />

              <GameCard title="Quad Sudoku" icon="4️⃣" color="bg-gradient-to-br from-lime-500 to-green-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_QUAD_SUDOKU)} />

              <GameCard title="Samurai Wordoku" icon="🥋" color="bg-gradient-to-br from-red-500 to-rose-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.SAMURAI_WORDOKU)} />

              <GameCard title="Mosaic Puzzle" icon="🎨" color="bg-gradient-to-br from-yellow-500 to-orange-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_MOSAIC_PUZZLE)} />

              <GameCard title="Polyomino Puzzle" icon="🧩" color="bg-gradient-to-br from-indigo-500 to-purple-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_POLYOMINO_PUZZLE)} />

              <GameCard title="Nurimisaki" icon="🏝️" color="bg-gradient-to-br from-cyan-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.LOGIC_NURIMISAKI)} />

              <GameCard title="Balance Loop" icon="⚖️" color="bg-gradient-to-br from-emerald-500 to-green-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.BALANCE_LOOP)} />

              <GameCard title="Arrows Puzzle" icon="➡️" color="bg-gradient-to-br from-rose-500 to-pink-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.ARROWS_PUZZLE)} />

              <GameCard title="Grid Fill Puzzle" icon="📐" color="bg-gradient-to-br from-orange-500 to-amber-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.GRID_FILL_PUZZLE)} />

              <GameCard title="Path Finder Puzzle" icon="🛤️" color="bg-gradient-to-br from-purple-500 to-violet-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.PATH_FINDER_PUZZLE)} />

              <GameCard title="Area Placement Puzzle" icon="🗺️" color="bg-gradient-to-br from-cyan-500 to-blue-700" description="Mantık ve Zeka Oyunu" onClick={() => setMode(GameMode.AREA_PLACEMENT_PUZZLE)} />

              {/* Soon Games */}
              {/* Extra Games mapped dynamically */}
              {logicGames.filter(g => !['Killer Sudoku', 'Nonogram', 'Minesweeper', 'Kakuro', 'Futoshiki', 'Hashiwokakero (Bridges)', 'Slitherlink', 'Akari (Light Up)', 'Tent Puzzle', 'KenKen', 'Hitori', 'Shikaku', 'Suguru', 'Nurikabe', 'Star Battle', 'Numberlink', 'Binairo', 'Kuromasu', 'Skyscrapers', 'Battleships Puzzle', 'Fillomino', 'Slant', 'Tapa', 'Zebra Puzzle', 'Numbrix', 'Ripple Effect', 'Masyu', 'Yajilin', 'Hidato', 'Magnets Puzzle', 'LITS', 'Spiral Galaxies', 'Train Tracks', 'Mastermind', 'Domino Logic', 'Cave Puzzle', 'Jigsaw Sudoku', 'Samurai Sudoku', 'Hyper Sudoku', 'Windoku', 'Diagonal Sudoku', 'Irregular Sudoku', 'Mini Sudoku', 'Hex Sudoku', 'Alphabet Sudoku', 'Wordoku', 'Samurai Killer Sudoku', 'Chaos Sudoku', 'Anti-Knight Sudoku', 'Anti-King Sudoku', 'Thermo Sudoku', 'Arrow Sudoku', 'Little Killer Sudoku', 'Sandwich Sudoku', 'XV Sudoku', 'Even-Odd Sudoku', 'Greater Than Sudoku', 'Consecutive Sudoku', 'Non-Consecutive Sudoku', 'Sudoku X', 'Sudoku Y', 'Color Sudoku', 'Calcudoku', 'Cross Sums', 'Tectonics', 'Two Not Touch', 'Takuzu', 'Binoxxo', 'Kropki Sudoku', 'Dot Sudoku', 'Arukone', 'Picross', 'Griddlers', 'Pentomino Puzzle', 'Domino Sudoku', 'Mathdoku', 'Latin Squares', 'Strimko', 'Einstein Riddle', 'Logic Grid Puzzle', 'Tower Puzzle', 'Loop Puzzle', 'Fill-a-Pix', 'Light and Shadow', 'Number Snake', 'Cross Logic', 'Blocked Sudoku', 'Greater Than Killer Sudoku', 'Triple Sudoku', 'Quad Sudoku', 'Samurai Wordoku', 'Mosaic Puzzle', 'Polyomino Puzzle', 'Nurimisaki', 'Balance Loop', 'Arrows Puzzle', 'Grid Fill Puzzle', 'Path Finder Puzzle', 'Area Placement Puzzle'].includes(g)).map((gameName, idx) => {
                const colors = [
                  "from-sky-500 to-indigo-800", "from-emerald-500 to-teal-800", "from-rose-500 to-pink-800",
                  "from-amber-500 to-orange-800", "from-purple-500 to-fuchsia-800", "from-cyan-500 to-blue-800",
                  "from-lime-500 to-green-800", "from-red-500 to-rose-800", "from-yellow-400 to-amber-700",
                  "from-indigo-400 to-violet-800"
                ];
                const gradient = colors[idx % colors.length];
                return (
                  <button key={'extra-' + idx} onClick={() => handleLogicGameSelect(gameName)} className={`bg-gradient-to-br ${gradient} p-4 rounded-3xl border border-white/20 shadow-xl hover:scale-105 active:scale-95 transition-all text-center group flex flex-col items-center justify-between h-40`}>
                    <div className="text-4xl mb-2 flex-1 flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">🧩</div>
                    <h3 className="text-white font-black text-xs md:text-sm mb-1 leading-tight drop-shadow-md">{gameName}</h3>
                    <div className="w-full text-[10px] bg-green-500/90 text-white font-black rounded-full py-1 shadow-[0_0_10px_rgba(34,197,94,0.5)] uppercase animate-pulse">OYNA</div>
                  </button>
                )
              })}
            </div>
          </div>
        );

      case GameMode.LOGIC_KILLER_SUDOKU: return <LogicGameWrapper GameComponent={KillerSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_NONOGRAM: return <LogicGameWrapper GameComponent={NonogramGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_MINESWEEPER: return <LogicGameWrapper GameComponent={MinesweeperGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;

      case GameMode.LOGIC_KAKURO: return <LogicGameWrapper GameComponent={KakuroGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_CROSS_SUMS: return <LogicGameWrapper GameComponent={CrossSumsGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_FUTOSHIKI: return <LogicGameWrapper GameComponent={FutoshikiGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_HASHI: return <LogicGameWrapper GameComponent={HashiGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_SLITHERLINK: return <LogicGameWrapper GameComponent={SlitherlinkGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_AKARI: return <LogicGameWrapper GameComponent={AkariGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_TENTS_TREES: return <LogicGameWrapper GameComponent={TentsTreesGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_KENKEN: return <LogicGameWrapper GameComponent={KenKenGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_HITORI: return <LogicGameWrapper GameComponent={HitoriGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_SHIKAKU: return <LogicGameWrapper GameComponent={ShikakuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_SKYSCRAPERS: return <LogicGameWrapper GameComponent={SkyscrapersGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_BATTLESHIPS: return <LogicGameWrapper GameComponent={BattleshipsGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_FILLOMINO: return <LogicGameWrapper GameComponent={FillominoGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_SLANT: return <LogicGameWrapper GameComponent={SlantGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_TAPA: return <LogicGameWrapper GameComponent={TapaGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_ZEBRA: return <LogicGameWrapper GameComponent={ZebraPuzzle} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_NUMBRIX: return <LogicGameWrapper GameComponent={NumbrixGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_RIPPLE_EFFECT: return <LogicGameWrapper GameComponent={RippleEffectGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_MASYU: return <LogicGameWrapper GameComponent={MasyuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_YAJILIN: return <LogicGameWrapper GameComponent={YajilinGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_HIDATO: return <LogicGameWrapper GameComponent={HidatoGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_MAGNETS: return <LogicGameWrapper GameComponent={MagnetsGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_LITS: return <LogicGameWrapper GameComponent={LITSGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_SPIRAL_GALAXIES: return <LogicGameWrapper GameComponent={SpiralGalaxiesGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_TRAIN_TRACKS: return <LogicGameWrapper GameComponent={TrainTracksGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_MASTERMIND: return <LogicGameWrapper GameComponent={MastermindGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_DOMINOSA: return <LogicGameWrapper GameComponent={DominosaGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_CAVE: return <LogicGameWrapper GameComponent={CaveGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_ALPHABET_SUDOKU: return <LogicGameWrapper GameComponent={AlphabetSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_ANTI_KING_SUDOKU: return <LogicGameWrapper GameComponent={AntiKingSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_ANTI_KNIGHT_SUDOKU: return <LogicGameWrapper GameComponent={AntiKnightSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_ARROW_SUDOKU: return <LogicGameWrapper GameComponent={ArrowSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_ATTENTION_TRACKING: return <LogicGameWrapper GameComponent={AttentionTrackingGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_BINAIRO: return <LogicGameWrapper GameComponent={BinairoGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_TAKUZU: return <LogicGameWrapper GameComponent={TakuzuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_BINOXXO: return <LogicGameWrapper GameComponent={BinoxxoGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_PICROSS: return <LogicGameWrapper GameComponent={PicrossGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_GRIDDLERS: return <LogicGameWrapper GameComponent={GriddlersGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_ARUKONE: return <LogicGameWrapper GameComponent={ArukoneGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_MATHDOKU: return <LogicGameWrapper GameComponent={MathdokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_LATIN_SQUARES: return <LogicGameWrapper GameComponent={LatinSquaresGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_STRIMKO: return <LogicGameWrapper GameComponent={StrimkoGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_TECTONICS: return <LogicGameWrapper GameComponent={TectonicsGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_TWO_NOT_TOUCH: return <LogicGameWrapper GameComponent={TwoNotTouchGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_LOOP_PUZZLE: return <LogicGameWrapper GameComponent={LoopPuzzleGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_DOT_SUDOKU: return <LogicGameWrapper GameComponent={DotSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_PENTOMINO_PUZZLE: return <LogicGameWrapper GameComponent={PentominoPuzzleGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_DOMINO_SUDOKU: return <LogicGameWrapper GameComponent={DominoSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_EINSTEIN_RIDDLE: return <LogicGameWrapper GameComponent={EinsteinRiddleGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_GRID_PUZZLE: return <LogicGameWrapper GameComponent={LogicGridPuzzleGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_TOWER_PUZZLE: return <LogicGameWrapper GameComponent={TowerPuzzleGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_LIGHT_AND_SHADOW: return <LogicGameWrapper GameComponent={LightAndShadowGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_CROSS_LOGIC: return <LogicGameWrapper GameComponent={CrossLogicGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_BLOCKED_SUDOKU: return <LogicGameWrapper GameComponent={BlockedSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_TRIPLE_SUDOKU: return <LogicGameWrapper GameComponent={TripleSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_GREATER_THAN_KILLER_SUDOKU: return <LogicGameWrapper GameComponent={GreaterThanKillerSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_MOSAIC_PUZZLE: return <LogicGameWrapper GameComponent={MosaicPuzzleGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_QUAD_SUDOKU: return <LogicGameWrapper GameComponent={QuadSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_POLYOMINO_PUZZLE: return <LogicGameWrapper GameComponent={PolyominoPuzzleGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_NURIMISAKI: return <LogicGameWrapper GameComponent={NurimisakiGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_CALCUDOKU: return <LogicGameWrapper GameComponent={CalcudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_CHAOS_SUDOKU: return <LogicGameWrapper GameComponent={ChaosSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_COLOR_SUDOKU: return <LogicGameWrapper GameComponent={ColorSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_CONSECUTIVE_SUDOKU: return <LogicGameWrapper GameComponent={ConsecutiveSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_COSMIC_BALANCE: return <LogicGameWrapper GameComponent={CosmicBalanceGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_DIAGONAL_SUDOKU: return <LogicGameWrapper GameComponent={DiagonalSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_EVEN_ODD_SUDOKU: return <LogicGameWrapper GameComponent={EvenOddSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_GREATER_THAN_SUDOKU: return <LogicGameWrapper GameComponent={GreaterThanSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_HEX_SUDOKU: return <LogicGameWrapper GameComponent={HexSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_HYPER_SUDOKU: return <LogicGameWrapper GameComponent={HyperSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_IRREGULAR_SUDOKU: return <LogicGameWrapper GameComponent={IrregularSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_JIGSAW_SUDOKU: return <LogicGameWrapper GameComponent={JigsawSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_KEN_KEN: return <LogicGameWrapper GameComponent={KenKenGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_KROPKI_SUDOKU: return <LogicGameWrapper GameComponent={KropkiSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_KUROMASU: return <LogicGameWrapper GameComponent={KuromasuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_LIGHT_AND_SHADOW: return <LogicGameWrapper GameComponent={LightAndShadowGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_L_I_T_S: return <LogicGameWrapper GameComponent={LITSGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_LITTLE_KILLER_SUDOKU: return <LogicGameWrapper GameComponent={LittleKillerSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_MINI_SUDOKU: return <LogicGameWrapper GameComponent={MiniSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_NIM: return <LogicGameWrapper GameComponent={NimGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_NON_CONSECUTIVE_SUDOKU: return <LogicGameWrapper GameComponent={NonConsecutiveSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_NUMBERLINK: return <LogicGameWrapper GameComponent={NumberlinkGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_NUMBER_SNAKE: return <LogicGameWrapper GameComponent={NumberSnakeGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_NURIKABE: return <LogicGameWrapper GameComponent={NurikabeGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_SAMURAI_KILLER_SUDOKU: return <LogicGameWrapper GameComponent={SamuraiKillerSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_SAMURAI_SUDOKU: return <LogicGameWrapper GameComponent={SamuraiSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_SANDWICH_SUDOKU: return <LogicGameWrapper GameComponent={SandwichSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_STAR_BATTLE: return <LogicGameWrapper GameComponent={StarBattleGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_SUDOKU_X: return <LogicGameWrapper GameComponent={SudokuXGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_SUDOKU_Y: return <LogicGameWrapper GameComponent={SudokuYGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_SUGURU: return <LogicGameWrapper GameComponent={SuguruGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_THERMO_SUDOKU: return <LogicGameWrapper GameComponent={ThermoSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_WINDOKU: return <LogicGameWrapper GameComponent={WindokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_WORDOKU: return <LogicGameWrapper GameComponent={WordokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;
      case GameMode.LOGIC_X_V_SUDOKU: return <LogicGameWrapper GameComponent={XVSudokuGame} gradeLevel={stats.gradeLevel} difficulty={selectedDifficulty} onComplete={handleGameComplete} onExit={() => setMode(GameMode.PLAYGROUND_LOGIC_MENU)} />;

      // Two Player Games
      case GameMode.TWO_PLAYER_CHESS:
        return <ChessGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_CHECKERS:
        return <CheckersGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_TIC_TAC_TOE:
        return <TicTacToeGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_CONNECT_FOUR:
        return <ConnectFourGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_BACKGAMMON:
        return <BackgammonGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_MANCALA:
        return <MancalaGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_GO:
        return <GoGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_REVERSI:
      case GameMode.TWO_PLAYER_OTHELLO:
        return <ReversiGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_DOMINO:
        return <DominoGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_NINE_MENS_MORRIS:
        return <NineMensMorrisGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_GOMOKU:
        return <GomokuGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_PENTE:
        return <PenteGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_KALAH:
        return <KalahGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_QUORIDOR:
        return <QuoridorGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_BATTLESHIP:
        return <BattleshipsGame grade={5} difficulty={Difficulty.MEDIUM} onComplete={() => { }} onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_HALMA:
        return <HalmaGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_ABALONE:
        return <AbaloneGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_ONITAMA:
        return <OnitamaGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_SANTORINI:
        return <SantoriniGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_HIVE:
        return <HiveGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_TAK:
        return <TakGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_BLOKUS_DUEL:
        return <BlokusDuelGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_XIANGQI:
        return <XiangqiGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_SHOGI:
        return <ShogiGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_FANORONA:
        return <FanoronaGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;
      case GameMode.TWO_PLAYER_JENGA:
        return <JengaGame onExit={() => setMode(GameMode.TWO_PLAYER_MENU)} />;

      // Traffic Education
      case GameMode.TRAFFIC_MENU:
        return <TrafficMenu onNavigate={setMode} onExit={() => setMode(GameMode.HOME)} />;
      case GameMode.TRAFFIC_SIGNS_LEARN:
        return <TrafficSignsLearn onExit={() => setMode(GameMode.TRAFFIC_MENU)} />;
      case GameMode.TRAFFIC_QUIZ:
        return <TrafficQuiz onExit={() => setMode(GameMode.TRAFFIC_MENU)} />;
      case GameMode.TRAFFIC_SIMULATOR:
        return <TrafficSimulator onExit={() => setMode(GameMode.TRAFFIC_MENU)} />;
      case GameMode.TRAFFIC_GAMES:
        return <TrafficGames onNavigate={setMode} onExit={() => setMode(GameMode.TRAFFIC_MENU)} />;
      case GameMode.TRAFFIC_SIGN_MATCH:
        return <TrafficSignMatch onExit={() => setMode(GameMode.TRAFFIC_GAMES)} />;
      case GameMode.TRAFFIC_CITY:
        return <TrafficCity onExit={() => setMode(GameMode.TRAFFIC_GAMES)} />;
      case GameMode.TRAFFIC_PEDESTRIAN:
        return <TrafficPedestrianGame onExit={() => setMode(GameMode.TRAFFIC_GAMES)} />;
      case GameMode.TRAFFIC_LANE_GAME:
        return <TrafficLaneGame onExit={() => setMode(GameMode.TRAFFIC_GAMES)} />;
      case GameMode.TRAFFIC_DASHBOARD:
        return <TrafficDashboard onExit={() => setMode(GameMode.TRAFFIC_MENU)} />;

      // FIRST AID EDUCATION
      case GameMode.FIRST_AID_MENU:
        return <FirstAidMenu onNavigate={setMode} onExit={() => setMode(GameMode.HOME)} gradeLevel={stats.gradeLevel} />;
      case GameMode.FIRST_AID_LESSONS:
        return <FirstAidLessons onExit={() => setMode(GameMode.FIRST_AID_MENU)} gradeLevel={stats.gradeLevel} />;
      case GameMode.FIRST_AID_SCENARIOS:
        return <FirstAidScenarios onExit={() => setMode(GameMode.FIRST_AID_MENU)} gradeLevel={stats.gradeLevel} />;
      case GameMode.FIRST_AID_MINI_GAMES:
        return <FirstAidMiniGames onExit={() => setMode(GameMode.FIRST_AID_MENU)} />;
      case GameMode.FIRST_AID_TESTS:
        return <div className="min-h-screen text-white flex items-center justify-center"><div className="text-center"><h2 className="text-4xl font-black mb-4">📝 Testler</h2><p className="text-white/70 mb-6">Yakında eklenecek!</p><button onClick={() => setMode(GameMode.FIRST_AID_MENU)} className="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold">⬅ Geri Dön</button></div></div>;
      case GameMode.FIRST_AID_BADGES:
        return <div className="min-h-screen text-white flex items-center justify-center"><div className="text-center"><h2 className="text-4xl font-black mb-4">🏅 Rozetlerim</h2><p className="text-white/70 mb-6">Yakında eklenecek!</p><button onClick={() => setMode(GameMode.FIRST_AID_MENU)} className="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold">⬅ Geri Dön</button></div></div>;
      case GameMode.FIRST_AID_DASHBOARD:
        return <div className="min-h-screen text-white flex items-center justify-center"><div className="text-center"><h2 className="text-4xl font-black mb-4">📊 İlerleme Raporun</h2><p className="text-white/70 mb-6">Yakında eklenecek!</p><button onClick={() => setMode(GameMode.FIRST_AID_MENU)} className="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all font-bold">⬅ Geri Dön</button></div></div>;

      // EDUCATIONAL GAMES
      case GameMode.MAZE_GAME:
        return <MazeGame onExit={() => setMode(GameMode.HOME)} onComplete={(score) => handleGameComplete(Math.floor(score / 10))} />;
      case GameMode.PATTERN_PUZZLE_GAME:
        return <PatternPuzzleGame onExit={() => setMode(GameMode.HOME)} onComplete={(score) => handleGameComplete(Math.floor(score / 10))} />;
      case GameMode.SHAPE_MATCHING_GAME:
        return <ShapeMatchingGame onExit={() => setMode(GameMode.HOME)} onComplete={(score) => handleGameComplete(Math.floor(score / 10))} />;
      case GameMode.DIRECTION_GAME:
        return <DirectionGame onExit={() => setMode(GameMode.HOME)} onComplete={(score) => handleGameComplete(Math.floor(score / 10))} />;
      case GameMode.SEQUENCE_PATTERN_GAME:
        return <SequencePatternGame onExit={() => setMode(GameMode.HOME)} onComplete={(score) => handleGameComplete(Math.floor(score / 10))} />;
      case GameMode.NUMBER_RECOGNITION_GAME:
        return <NumberRecognitionGame onExit={() => setMode(GameMode.HOME)} onComplete={(score) => handleGameComplete(Math.floor(score / 10))} />;
      case GameMode.NUMBER_COMPARISON_GAME:
        return <NumberComparisonGame onExit={() => setMode(GameMode.HOME)} onComplete={(score) => handleGameComplete(Math.floor(score / 10))} />;

      case GameMode.FRUIT_ADDITION_GAME:
        return <FruitAdditionGame onExit={() => setMode(GameMode.MATH_GAME_BASIC)} />;

      case GameMode.MATH_GAME_FISH_ADDITION:
        return <FishAdditionGame onExit={() => setMode(GameMode.MATH_GAME_BASIC)} />;

      case GameMode.MATH_GAME_SPACE_ADDITION:
        return <SpaceAdditionGame onExit={() => setMode(GameMode.MATH_GAME_BASIC)} />;

      case GameMode.MATH_GAME_ADDITION_PUZZLE:
        return <AdditionPuzzleGame onExit={() => setMode(GameMode.MATH_GAME_BASIC)} />;
      case GameMode.MATH_GAME_ADDITION_RACE:
        return <AdditionRaceGame onExit={() => setMode(GameMode.MATH_GAME_BASIC)} />;

      case GameMode.MATH_GAME_COOKIE_MONSTER:
        return <CookieMonsterGame onExit={() => setMode(GameMode.MATH_GAME_BASIC)} />;

      case GameMode.MATH_GAME_BALLOON_POP:
        return <BalloonPopGame onExit={() => setMode(GameMode.MATH_GAME_BASIC)} />;

      case GameMode.MATH_GAME_TOY_LOST:
        return <ToyLostGame onExit={() => setMode(GameMode.MATH_GAME_BASIC)} />;

      case GameMode.MATH_GAME_SUBTRACTION_BASKET:
        return <SubtractionBasketGame onExit={() => setMode(GameMode.MATH_GAME_BASIC)} />;

      case GameMode.MATH_GAME_ALIEN_SUBTRACTION:
        return <AlienSubtractionGame onExit={() => setMode(GameMode.MATH_GAME_BASIC)} />;

      case GameMode.MATH_GAME_MULTIPLICATION_NINJA:
        return <MultiplicationNinjaGame onBack={() => setMode(GameMode.MATH_GAME_BASIC)} />;

      case GameMode.MATH_GAME_DIVISION_HUNT:
        return <DivisionHuntGame onBack={() => setMode(GameMode.MATH_GAME_BASIC)} />;

      case GameMode.MATH_GAME_BASKETBALL:
        return <MathBasketballGame onBack={() => setMode(GameMode.MATH_GAME_BASIC)} />;

      case GameMode.MATH_GAME_PROBLEM_SOLVING:
        return <ProblemSolvingGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_BASIC)} />;

      case GameMode.MATH_GAME_SHAPE_PAINTING:
        return <ShapePaintingGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_SHAPE_BUILDER:
        return <ShapeBuilderGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_SHAPE_HUNT:
        return <ShapeHuntGame onBack={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_SHAPE_PUZZLE:
        return <ShapePuzzleGame onBack={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_SHADOW_MATCH:
        return <ShadowMatchGame onBack={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_SHAPE_MATCHING:
        return <GeometryShapeMatchingGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_LEFT_RIGHT_RACE:
        return <LeftRightRaceGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_GEOMETRIC_SHAPE_RECOGNITION:
        return <GeometricShapeRecognitionGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_AREA_CALCULATION:
        return <AreaCalculationGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_PERIMETER_CALCULATION:
        return <PerimeterCalculationGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_LOCATION_PUZZLE:
        return <LocationPuzzleGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_INSIDE_OUTSIDE:
        return <InsideOutsideGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_SHAPE_DETECTIVE:
        return <ShapeDetectiveGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_VACATION_ROUTE:
        return <VacationRouteGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_MISSING_SHAPE:
        return <MissingShapeGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_SHAPE_LABYRINTH:
        return <ShapeLabyrinthGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_GEOMETRY)} />;

      case GameMode.MATH_GAME_BALLOON_COUNT:
        return <BalloonCountGame onBack={() => setMode(GameMode.MATH_GAME_NUMBERS)} />;

      case GameMode.MATH_GAME_APPLE_COLLECT:
        return <AppleCollectGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_NUMBERS)} />;

      case GameMode.MATH_GAME_NUMBER_TRAIN:
        return <NumberTrainGame onBack={() => setMode(GameMode.MATH_GAME_NUMBERS)} />;

      case GameMode.MATH_GAME_NUMBER_BUILDING:
        return <NumberBuildingGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_NUMBERS)} />;

      case GameMode.MATH_GAME_BOOM:
        return <BoomGame onBack={() => setMode(GameMode.MATH_GAME_RHYTHMIC)} />;

      case GameMode.MATH_GAME_COUNTDOWN:
        return <CountdownGame onBack={() => setMode(GameMode.MATH_GAME_RHYTHMIC)} />;

      case GameMode.MATH_GAME_SKIP_COUNTING:
        return <SkipCountingGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_RHYTHMIC)} />;

      case GameMode.MATH_GAME_RHYTHMIC_RUN:
        return <RhythmicRunGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_RHYTHMIC)} />;

      case GameMode.MATH_GAME_BIG_SMALL_RACE:
        return <BigSmallRaceGame onBack={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_NUMBER_LINE:
        return <NumberLineGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_SIZE_ORDER:
        return <SizeOrderGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_MOST_FRUIT:
        return <MostFruitGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_TOY_GRAPH:
        return <ToyGraphGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_ANIMAL_COUNT:
        return <AnimalCountGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_FAVORITE_COLOR:
        return <FavoriteColorSurveyGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_GRAPH_COMPLETION:
        return <GraphCompletionGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_RACE_ORDER:
        return <RaceOrderGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_CORRECT_ORDER:
        return <CorrectOrderGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_ELECTION_TALLY:
        return <ElectionTallyGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_ICE_CREAM_GRAPH:
        return <IceCreamGraphGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_WHO_BIGGER:
        return <WhoBiggerGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_LONGEST_LINE:
        return <LongestLineGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_GRAPH_READING:
        return <GraphReadingGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_COMPARISON)} />;

      case GameMode.MATH_GAME_LENGTH_COMPARE:
        return <LengthCompareGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_MEASUREMENT)} />;

      case GameMode.MATH_GAME_MONEY_COUNT:
        return <MoneyCountGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_MEASUREMENT)} />;

      case GameMode.MATH_GAME_WEIGHT_COMPARE:
        return <WeightCompareGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_MEASUREMENT)} />;

      case GameMode.MATH_GAME_LONGEST_OBJECT:
        return <LongestObjectGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_MEASUREMENT)} />;

      case GameMode.MATH_GAME_HEAVIEST_OBJECT:
        return <HeaviestObjectGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_MEASUREMENT)} />;

      case GameMode.MATH_GAME_CLOCK_READING:
        return <ClockReadingGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_MEASUREMENT)} />;

      case GameMode.MATH_GAME_ESTIMATE_JAR:
        return <EstimateJarGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_MEASUREMENT)} />;

      case GameMode.MATH_GAME_MEMORY_MATCH:
        return <MemoryMatchGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_VISUAL)} />;

      case GameMode.MATH_GAME_MEMORY_CARDS:
        return <MemoryCardsGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_VISUAL)} />;

      case GameMode.MATH_GAME_COLOR_DETECTIVE:
        return <ColorDetectiveGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_VISUAL)} />;

      case GameMode.MATH_GAME_SHAPE_HUNTER:
        return <ShapeHunterGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_VISUAL)} />;

      case GameMode.MATH_GAME_SIZE_MATCH:
        return <SizeMatchGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_VISUAL)} />;

      case GameMode.MATH_GAME_DIRECTION_MATCH:
        return <DirectionMatchGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_VISUAL)} />;

      case GameMode.MATH_GAME_CAREFUL_EYES:
        return <CarefulEyesGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_VISUAL)} />;

      case GameMode.MATH_GAME_FIND_DIFFERENCE:
        return <FindDifferenceGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_VISUAL)} />;

      case GameMode.MATH_GAME_PATTERN_CONTINUE:
        return <PatternContinueGame onComplete={handleGameComplete} onExit={() => setMode(GameMode.MATH_GAME_VISUAL)} />;

      case GameMode.MATH_GAME_GRADE2_NUMBER_HUNT:
        return <NumberHuntTo100Game onBack={() => setMode(GameMode.MATH_GAME_GRADE2_NUMBERS)} />;

      case GameMode.MATH_GAME_GRADE2_PLACE_VALUE:
        return <PlaceValueGame onBack={() => setMode(GameMode.MATH_GAME_GRADE2_NUMBERS)} />;

      case GameMode.MATH_GAME_GRADE2_NUMBER_LINE:
        return <NumberLineJumpGame onBack={() => setMode(GameMode.MATH_GAME_GRADE2_NUMBERS)} />;

      case GameMode.MATH_GAME_GRADE2_MARKET_BASKET:
        return <MarketBasketGame onBack={() => setMode(GameMode.MATH_GAME_GRADE2_ADDITION)} />;

      case GameMode.MATH_GAME_GRADE2_TWO_DIGIT_ADD:
        return <TwoDigitAdditionGame onBack={() => setMode(GameMode.MATH_GAME_GRADE2_ADDITION)} />;

      case GameMode.MATH_GAME_GRADE2_MISSING_NUMBER:
        return <MissingNumberGame onBack={() => setMode(GameMode.MATH_GAME_GRADE2_ADDITION)} />;

      case GameMode.MATH_GAME_GRADE2_CHANGE_CALC:
        return <ChangeCalculatorGame onBack={() => setMode(GameMode.MATH_GAME_GRADE2_SUBTRACTION)} />;

      case GameMode.MATH_GAME_GRADE2_TWO_DIGIT_SUB:
        return <TwoDigitSubtractionGame onBack={() => setMode(GameMode.MATH_GAME_GRADE2_SUBTRACTION)} />;

      case GameMode.MATH_GAME_GRADE2_COMPARE_SUB:
        return <CompareSubtractionGame onBack={() => setMode(GameMode.MATH_GAME_GRADE2_SUBTRACTION)} />;

      case GameMode.MATH_GAME_GRADE2_SHAPE_COUNT:
        return <ShapeCountGame onBack={() => setMode(GameMode.MATH_GAME_GRADE2_GEOMETRY)} />;

      case GameMode.MATH_GAME_GRADE2_SYMMETRY:
        return <SymmetryGame onBack={() => setMode(GameMode.MATH_GAME_GRADE2_GEOMETRY)} />;

      case GameMode.MATH_GAME_GRADE2_SIMPLE_GRAPH:
        return <SimpleGraphGame onBack={() => setMode(GameMode.MATH_GAME_GRADE2_DATA)} />;

      case GameMode.MATH_GAME_GRADE2_NUMBERS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_2)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Sayılar (2. Sınıf)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="100'e Kadar Sayı Avı" icon="🔢" color="bg-gradient-to-br from-purple-500 to-pink-600" description="Sayıları hızlıca bul!" onClick={() => setMode(GameMode.MATH_GAME_GRADE2_NUMBER_HUNT)} />
              <GameCard title="Basamak Değeri" icon="🎯" color="bg-gradient-to-br from-indigo-500 to-purple-600" description="Onlar ve birler!" onClick={() => setMode(GameMode.MATH_GAME_GRADE2_PLACE_VALUE)} />
              <GameCard title="Sayı Doğrusunda Zıpla" icon="🦘" color="bg-gradient-to-br from-cyan-500 to-blue-600" description="Sayı doğrusunda ilerle!" onClick={() => setMode(GameMode.MATH_GAME_GRADE2_NUMBER_LINE)} />
              <GameCard title="Büyük mü Küçük mü" icon="⚖️" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Sayıları karşılaştır!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Sayı Sıralama" icon="📊" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Sayıları sırala!" onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE2_ADDITION:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_2)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Toplama (2. Sınıf)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Market Sepeti" icon="🛒" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Alışveriş toplamı hesapla!" onClick={() => setMode(GameMode.MATH_GAME_GRADE2_MARKET_BASKET)} />
              <GameCard title="İki Basamaklı Toplama" icon="➕" color="bg-gradient-to-br from-teal-500 to-cyan-600" description="Büyük sayıları topla!" onClick={() => setMode(GameMode.MATH_GAME_GRADE2_TWO_DIGIT_ADD)} />
              <GameCard title="Eksik Sayıyı Bul" icon="🔍" color="bg-gradient-to-br from-orange-500 to-amber-600" description="Eksik sayıyı tamamla!" onClick={() => setMode(GameMode.MATH_GAME_GRADE2_MISSING_NUMBER)} />
              <GameCard title="Toplama Yarışı" icon="🏁" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Hızlı toplama yap!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Sayı Köprüsü" icon="🌉" color="bg-gradient-to-br from-purple-500 to-pink-600" description="Köprüyü tamamla!" onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE2_SUBTRACTION:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_2)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Çıkarma (2. Sınıf)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Para Üstü Hesapla" icon="💰" color="bg-gradient-to-br from-red-500 to-orange-600" description="Para üstünü bul!" onClick={() => setMode(GameMode.MATH_GAME_GRADE2_CHANGE_CALC)} />
              <GameCard title="İki Basamaklı Çıkarma" icon="➖" color="bg-gradient-to-br from-rose-500 to-pink-600" description="Büyük sayıları çıkar!" onClick={() => setMode(GameMode.MATH_GAME_GRADE2_TWO_DIGIT_SUB)} />
              <GameCard title="Çıkarma Karşılaştır" icon="⚖️" color="bg-gradient-to-br from-indigo-500 to-purple-600" description="Hangi çıkarma daha büyük?" onClick={() => setMode(GameMode.MATH_GAME_GRADE2_COMPARE_SUB)} />
              <GameCard title="Hazine Çıkarma" icon="💎" color="bg-gradient-to-br from-yellow-500 to-amber-600" description="Hazineyi paylaş!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Çıkarma Labirenti" icon="🌀" color="bg-gradient-to-br from-purple-500 to-pink-600" description="Labirentten çık!" onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE2_GEOMETRY:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_2)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Geometri (2. Sınıf)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Şekil Sayma" icon="🔢" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Şekilleri say!" onClick={() => setMode(GameMode.MATH_GAME_GRADE2_SHAPE_COUNT)} />
              <GameCard title="Simetri Var mı?" icon="🪞" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Simetriyi bul!" onClick={() => setMode(GameMode.MATH_GAME_GRADE2_SYMMETRY)} />
              <GameCard title="Şekil Gruplama" icon="📐" color="bg-gradient-to-br from-purple-500 to-indigo-600" description="Şekilleri grupla!" onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE2_DATA:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_2)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Veri (2. Sınıf)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Grafik Okuma" icon="📊" color="bg-gradient-to-br from-teal-500 to-cyan-600" description="Grafiği yorumla!" onClick={() => setMode(GameMode.MATH_GAME_GRADE2_SIMPLE_GRAPH)} />
              <GameCard title="Sınıf Anketi" icon="📋" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Anket yap!" onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE3_MULTIPLICATION:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_3)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Çarpma (3. Sınıf)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Çarpım Savaşı" icon="⚔️" color="bg-gradient-to-br from-red-500 to-orange-600" description="Düşmanları yen!" onClick={() => setMode(GameMode.MATH_GAME_GRADE3_MULT_BATTLE)} />
              <GameCard title="Çarpım Tablosu" icon="🎯" color="bg-gradient-to-br from-orange-500 to-amber-600" description="Çarpım tablosunu öğren!" onClick={() => setMode(GameMode.MATH_GAME_GRADE3_MULT_TABLE)} />
              <GameCard title="Çarpım Tablosu Yarışı" icon="🏁" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Hızlı çarp!" onClick={() => alert("Yakında eklenecek!")} />
              <GameCard title="Uzay Çarpma" icon="🚀" color="bg-gradient-to-br from-purple-500 to-pink-600" description="Uzayda çarp!" onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE3_MULT_BATTLE:
        return <MultiplicationBattleGame onBack={() => setMode(GameMode.MATH_GAME_GRADE3_MULTIPLICATION)} />;

      case GameMode.MATH_GAME_GRADE3_MULT_TABLE:
        return <MultiplicationTableGame onBack={() => setMode(GameMode.MATH_GAME_GRADE3_MULTIPLICATION)} />;

      case GameMode.MATH_GAME_GRADE3_DIVISION:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_3)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Bölme (3. Sınıf)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Pizza Paylaşımı" icon="🍕" color="bg-gradient-to-br from-orange-500 to-red-600" description="Pizzayı eşit paylaştır!" onClick={() => setMode(GameMode.MATH_GAME_GRADE3_PIZZA_SHARE)} />
              <GameCard title="Bölme Yarışı" icon="🏁" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Hızlı böl!" onClick={() => setMode(GameMode.MATH_GAME_GRADE3_DIVISION_RACE)} />
              <GameCard title="Şeker Paylaştır" icon="🍬" color="bg-gradient-to-br from-pink-500 to-rose-600" description="Şekerleri böl!" onClick={() => alert("Yakında eklenecek!")} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE3_PIZZA_SHARE:
        return <PizzaSharingGame onBack={() => setMode(GameMode.MATH_GAME_GRADE3_DIVISION)} />;

      case GameMode.MATH_GAME_GRADE3_DIVISION_RACE:
        return <DivisionRaceGame onBack={() => setMode(GameMode.MATH_GAME_GRADE3_DIVISION)} />;

      case GameMode.MATH_GAME_GRADE4_BIGNUMBERS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_4)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Büyük Sayılar (4. Sınıf)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Binlik Sayı Avı" icon="🔢" color="bg-gradient-to-br from-purple-500 to-indigo-600" description="Büyük sayıları bul!" onClick={() => setMode(GameMode.MATH_GAME_GRADE4_THOUSAND_HUNT)} />
              <GameCard title="Sayı Karşılaştırma" icon="⚖️" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Büyük sayıları karşılaştır!" onClick={() => setMode(GameMode.MATH_GAME_GRADE4_NUMBER_COMPARE)} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE4_THOUSAND_HUNT:
        return <ThousandHuntGame onBack={() => setMode(GameMode.MATH_GAME_GRADE4_BIGNUMBERS)} />;

      case GameMode.MATH_GAME_GRADE4_NUMBER_COMPARE:
        return <NumberCompareGame onBack={() => setMode(GameMode.MATH_GAME_GRADE4_BIGNUMBERS)} />;

      case GameMode.MATH_GAME_GRADE5_FRACTIONS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_5)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Kesirler (5. Sınıf)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Kesir Karşılaştırma" icon="🍕" color="bg-gradient-to-br from-orange-500 to-amber-600" description="Kesirleri karşılaştır!" onClick={() => setMode(GameMode.MATH_GAME_GRADE5_FRACTION_COMPARE)} />
              <GameCard title="Kesir Toplama" icon="➕" color="bg-gradient-to-br from-green-500 to-emerald-600" description="Kesirleri topla!" onClick={() => setMode(GameMode.MATH_GAME_GRADE5_FRACTION_ADD)} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE5_FRACTION_COMPARE:
        return <FractionCompareGame onBack={() => setMode(GameMode.MATH_GAME_GRADE5_FRACTIONS)} />;

      case GameMode.MATH_GAME_GRADE5_FRACTION_ADD:
        return <FractionAdditionGame onBack={() => setMode(GameMode.MATH_GAME_GRADE5_FRACTIONS)} />;

      case GameMode.MATH_GAME_GRADE6_DECIMALS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_6)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Ondalık Sayılar (6. Sınıf)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Ondalık Market" icon="🛒" color="bg-gradient-to-br from-blue-500 to-cyan-600" description="Ondalık sayılarla alışveriş!" onClick={() => setMode(GameMode.MATH_GAME_GRADE6_DECIMAL_MARKET)} />
              <GameCard title="Ondalık Sıralama" icon="📊" color="bg-gradient-to-br from-purple-500 to-pink-600" description="Ondalık sayıları sırala!" onClick={() => setMode(GameMode.MATH_GAME_GRADE6_DECIMAL_SORT)} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE6_DECIMAL_MARKET:
        return <DecimalMarketGame onBack={() => setMode(GameMode.MATH_GAME_GRADE6_DECIMALS)} />;

      case GameMode.MATH_GAME_GRADE6_DECIMAL_SORT:
        return <DecimalSortGame onBack={() => setMode(GameMode.MATH_GAME_GRADE6_DECIMALS)} />;

      case GameMode.MATH_GAME_GRADE7_INTEGERS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_7)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Tam Sayılar (7. Sınıf)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Sıcaklık Oyunu" icon="🌡️" color="bg-gradient-to-br from-blue-600 to-cyan-600" description="Tam sayılarla sıcaklık!" onClick={() => setMode(GameMode.MATH_GAME_GRADE7_TEMPERATURE)} />
              <GameCard title="Pozitif-Negatif Savaşı" icon="⚔️" color="bg-gradient-to-br from-red-500 to-pink-600" description="Tam sayı savaşı!" onClick={() => setMode(GameMode.MATH_GAME_GRADE7_INTEGER_BATTLE)} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE7_TEMPERATURE:
        return <TemperatureGame onBack={() => setMode(GameMode.MATH_GAME_GRADE7_INTEGERS)} />;

      case GameMode.MATH_GAME_GRADE7_INTEGER_BATTLE:
        return <IntegerBattleGame onBack={() => setMode(GameMode.MATH_GAME_GRADE7_INTEGERS)} />;

      case GameMode.MATH_GAME_GRADE8_EXPONENTS:
        return (
          <div className="w-full max-w-6xl mx-auto px-2 bounce-in">
            <div className="text-center mb-12">
              <button onClick={() => setMode(GameMode.MATH_GAME_GRADE_8)} className="mb-8 px-6 py-2 bg-white/5 text-white rounded-full font-bold border border-white/20 hover:bg-white/10 transition-all text-sm">⬅ GERİ DÖN</button>
              <h2 className="text-4xl md:text-7xl font-black text-white italic drop-shadow-2xl mb-4 uppercase">Üslü Sayılar (8. Sınıf)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-32">
              <GameCard title="Üs Hesaplama Yarışı" icon="²" color="bg-gradient-to-br from-lime-500 to-green-600" description="Üslü sayıları hesapla!" onClick={() => setMode(GameMode.MATH_GAME_GRADE8_EXPONENT_RACE)} />
              <GameCard title="Üslü Puzzle" icon="🧩" color="bg-gradient-to-br from-yellow-500 to-orange-600" description="Üslü sayı bulmacası!" onClick={() => setMode(GameMode.MATH_GAME_GRADE8_EXPONENT_PUZZLE)} />
            </div>
          </div>
        );

      case GameMode.MATH_GAME_GRADE8_EXPONENT_RACE:
        return <ExponentRaceGame onBack={() => setMode(GameMode.MATH_GAME_GRADE8_EXPONENTS)} />;

      case GameMode.MATH_GAME_GRADE8_EXPONENT_PUZZLE:
        return <ExponentPuzzleGame onBack={() => setMode(GameMode.MATH_GAME_GRADE8_EXPONENTS)} />;

      // LIFE SKILLS - Traffic and Road Safety
      case GameMode.LIFE_SKILLS_TRAFFIC:
        return <TrafficSafetyMenu gradeLevel={stats.gradeLevel} onSelectActivity={(activity) => alert("Yakında eklenecek!")} onExit={() => setMode(GameMode.HOME)} />;

      // LIFE SKILLS - Personal Hygiene and Health
      case GameMode.LIFE_SKILLS_HYGIENE:
        return <HygieneMenu gradeLevel={stats.gradeLevel} onSelectActivity={(activity) => alert("Yakında eklenecek!")} onExit={() => setMode(GameMode.HOME)} />;


      // LIFE SKILLS - Digital Safety and Internet
      case GameMode.LIFE_SKILLS_DIGITAL:
        return <DigitalMenu gradeLevel={stats.gradeLevel} onSelectActivity={(activity) => alert("Yakında eklenecek!")} onExit={() => setMode(GameMode.HOME)} />;

      // LIFE SKILLS - Digital Health and Technology Use
      case GameMode.LIFE_SKILLS_DIGITAL_HEALTH:
        return <DigitalHealthMenu gradeLevel={stats.gradeLevel} onSelectActivity={(activity) => alert("Yakında eklenecek!")} onExit={() => setMode(GameMode.HOME)} />;

      // LIFE SKILLS - Financial Literacy
      case GameMode.LIFE_SKILLS_FINANCIAL:
        return <FinancialMenu gradeLevel={stats.gradeLevel} onSelectActivity={(activity) => alert("Yakında eklenecek!")} onExit={() => setMode(GameMode.HOME)} />;

      // LIFE SKILLS - Healthy Nutrition and Life
      case GameMode.LIFE_SKILLS_NUTRITION:
        return <NutritionMenu gradeLevel={stats.gradeLevel} onSelectActivity={(activity) => alert("Yakında eklenecek!")} onExit={() => setMode(GameMode.HOME)} />;


      // LIFE SKILLS - Social and Emotional Skills
      case GameMode.LIFE_SKILLS_SOCIAL:
        return <SocialMenu gradeLevel={stats.gradeLevel} onSelectActivity={(activity) => alert("Yakında eklenecek!")} onExit={() => setMode(GameMode.HOME)} />;

      // LIFE SKILLS - Environment and Community
      case GameMode.LIFE_SKILLS_ENVIRONMENT:
        return <EnvironmentMenu gradeLevel={stats.gradeLevel} onSelectActivity={(activity) => alert("Yakında eklenecek!")} onExit={() => setMode(GameMode.HOME)} />;

      // LIFE SKILLS - Basic Law and Rights (7-8 only)
      case GameMode.LIFE_SKILLS_LAW:
        return <LawMenu gradeLevel={stats.gradeLevel} onSelectActivity={(activity) => alert("Yakında eklenecek!")} onExit={() => setMode(GameMode.HOME)} />;


      default:
        return <MathGame mode={mode} difficulty={selectedDifficulty} grade={stats.gradeLevel} onComplete={handleGameComplete} onExit={() => setMode(GameMode.HOME)} />;
    }
  };

  return (
    <Layout stars={stats.stars} avatar={stats.currentAvatar} onNavigate={setMode} currentMode={mode}>
      <div className="w-full max-w-7xl mx-auto">
        <ErrorBoundary onReset={() => setMode(GameMode.HOME)}>
          {renderContent()}
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default App;


