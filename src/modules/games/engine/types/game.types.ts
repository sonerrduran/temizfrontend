// Game Engine Type Definitions

export interface GameConfig {
  id: string;
  name: string;
  description: string;
  version: string;

  // Metadata
  category: string;
  subcategory?: string;
  gradeMin: number;
  gradeMax: number;
  difficulty: 'very_easy' | 'easy' | 'medium' | 'hard' | 'very_hard';

  // Technical
  component: string;
  template?: string;

  // Features
  features: {
    multiplayer: boolean;
    ai: boolean;
    offline: boolean;
    realtime: boolean;
  };

  // Content
  contentSource: 'database' | 'static' | 'ai' | 'hybrid';

  // Assets
  assets: {
    icon: string;
    thumbnail?: string;
    preview?: string;
  };

  // Tags
  tags: string[];
  keywords?: string[];

  // Performance
  estimatedLoadTime?: number;
  memoryUsage?: 'low' | 'medium' | 'high';

  // Analytics
  trackEvents?: string[];
}

export interface GameState {
  [key: string]: any;
}

export interface GameResult {
  correct: boolean;
  score: number;
  feedback: string;
  [key: string]: any;
}

export interface GameAction {
  type: string;
  payload: any;
}

export interface Question {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  difficulty?: string;
  [key: string]: any;
}

export interface GameLogic {
  initialize(config: GameConfig): Promise<void>;
  handleAnswer(answer: any): GameResult;
  getState(): GameState;
  reset(): void;
}

export interface GameUIProps {
  config: GameConfig;
  logic: GameLogic;
  engine?: any;
  onComplete: (score: number) => void;
  onExit: () => void;
}

export interface GamePlugin {
  config: GameConfig;
  logic: new () => GameLogic;
  component: React.ComponentType<GameUIProps>;
}

export interface GameFilters {
  category?: string;
  gradeLevel?: number;
  difficulty?: string;
  tags?: string[];
  featured?: boolean;
}
