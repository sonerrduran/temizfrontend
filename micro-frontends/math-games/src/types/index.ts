// Math games types
export interface MathGameConfig {
  grade: number;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MathGameProps {
  config: MathGameConfig;
  onComplete?: (result: any) => void;
}
