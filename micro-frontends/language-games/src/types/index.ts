// Language games types
export interface LanguageGameConfig {
  language: 'turkish' | 'english';
  grade: number;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LanguageGameProps {
  config: LanguageGameConfig;
  onComplete?: (result: any) => void;
}
