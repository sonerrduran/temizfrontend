import { GameLogic, GameConfig, GameState, GameResult } from '../../../engine/types/game.types';

interface Question {
  num1: number;
  num2: number;
  correct: string;
}

export class NumberComparisonLogic implements GameLogic {
  private state: GameState = {
    score: 0,
    level: 1,
    isComplete: false,
    currentQuestion: 0,
    totalQuestions: 5,
  };

  private questions: Question[] = [];
  private correctAnswers = 0;
  private timeLeft = 8;

  private levels = [
    { questions: 5, range: [1, 10], timePerQuestion: 8 },
    { questions: 8, range: [1, 50], timePerQuestion: 6 },
    { questions: 10, range: [1, 100], timePerQuestion: 5 },
  ];

  async initialize(config: GameConfig): Promise<void> {
    this.state = {
      score: 0,
      level: 1,
      isComplete: false,
      currentQuestion: 0,
      totalQuestions: this.levels[0].questions,
    };
    this.generateQuestions();
  }

  private generateQuestions(): void {
    const currentLevel = this.levels[this.state.level - 1];
    this.questions = [];

    for (let i = 0; i < currentLevel.questions; i++) {
      const [min, max] = currentLevel.range;
      let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
      let num2 = Math.floor(Math.random() * (max - min + 1)) + min;

      while (num1 === num2) {
        num2 = Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const correct = num1 > num2 ? '>' : '<';
      this.questions.push({ num1, num2, correct });
    }

    this.state.currentQuestion = 0;
    this.correctAnswers = 0;
    this.timeLeft = currentLevel.timePerQuestion;
  }

  handleAnswer(answer: string): GameResult {
    const question = this.questions[this.state.currentQuestion];
    const isCorrect = answer === question.correct;

    if (isCorrect) {
      this.correctAnswers++;
      this.state.score += 25;
    }

    this.state.currentQuestion++;

    if (this.state.currentQuestion >= this.questions.length) {
      this.state.isComplete = true;
    } else {
      this.timeLeft = this.levels[this.state.level - 1].timePerQuestion;
    }

    return {
      isCorrect,
      score: this.state.score,
      feedback: isCorrect ? '✅ Doğru!' : '❌ Yanlış!',
    };
  }

  getCurrentQuestion(): Question | null {
    if (this.state.currentQuestion < this.questions.length) {
      return this.questions[this.state.currentQuestion];
    }
    return null;
  }

  getTimeLeft(): number {
    return this.timeLeft;
  }

  getCorrectAnswers(): number {
    return this.correctAnswers;
  }

  nextLevel(): void {
    if (this.state.level < this.levels.length) {
      this.state.level++;
      this.state.isComplete = false;
      this.state.totalQuestions = this.levels[this.state.level - 1].questions;
      this.generateQuestions();
    }
  }

  getState(): GameState {
    return { ...this.state };
  }

  reset(): void {
    this.state = {
      score: 0,
      level: 1,
      isComplete: false,
      currentQuestion: 0,
      totalQuestions: this.levels[0].questions,
    };
    this.generateQuestions();
  }
}
