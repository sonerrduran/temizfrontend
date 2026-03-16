import { GameLogic, GameConfig, GameState, GameResult } from '../../../engine/types/game.types';

interface Question {
  num1: number;
  num2: number;
  correctAnswer: number;
  options: number[];
}

export class AdditionRaceLogic implements GameLogic {
  private state: GameState = {
    score: 0,
    level: 1,
    isComplete: false,
    currentQuestion: 0,
    totalQuestions: 5,
  };

  private currentQ: Question | null = null;
  private timeLeft = 10;

  async initialize(config: GameConfig): Promise<void> {
    this.state = {
      score: 0,
      level: 1,
      isComplete: false,
      currentQuestion: 0,
      totalQuestions: 5,
    };
    this.generateQuestion();
  }

  private generateQuestion(): void {
    const maxNum = Math.min(5 + this.state.level * 2, 20);
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const answer = num1 + num2;

    const opts = [answer];
    while (opts.length < 3) {
      const wrongAnswer = Math.floor(Math.random() * (maxNum * 2)) + 1;
      if (!opts.includes(wrongAnswer)) {
        opts.push(wrongAnswer);
      }
    }

    this.currentQ = {
      num1,
      num2,
      correctAnswer: answer,
      options: opts.sort(() => Math.random() - 0.5),
    };

    this.timeLeft = 10;
  }

  handleAnswer(answer: number): GameResult {
    if (!this.currentQ) {
      return { isCorrect: false, score: this.state.score, feedback: 'Hata!' };
    }

    const isCorrect = answer === this.currentQ.correctAnswer;

    if (isCorrect) {
      const points = 10 + this.state.level * 5;
      this.state.score += points;
    }

    this.state.currentQuestion++;

    if (this.state.currentQuestion >= this.state.totalQuestions) {
      this.state.isComplete = true;
    } else {
      this.state.level = Math.min(this.state.level + 1, 10);
      this.generateQuestion();
    }

    return {
      isCorrect,
      score: this.state.score,
      feedback: isCorrect
        ? '✅ Hızlısın! Kazandın!'
        : `❌ Yanlış! Doğru cevap: ${this.currentQ.correctAnswer}`,
    };
  }

  getCurrentQuestion(): Question | null {
    return this.currentQ;
  }

  getTimeLeft(): number {
    return this.timeLeft;
  }

  decrementTime(): void {
    this.timeLeft--;
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
      totalQuestions: 5,
    };
    this.generateQuestion();
  }
}
