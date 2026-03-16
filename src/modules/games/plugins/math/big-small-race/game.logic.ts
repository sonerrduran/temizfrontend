import {
  GameLogic,
  GameConfig,
  GameState,
  GameResult,
} from '@/modules/games/engine/types/game.types';

interface BigSmallRaceState extends GameState {
  score: number;
  timeLeft: number;
  num1: number;
  num2: number;
  gameOver: boolean;
  streak: number;
  level: number;
  maxStreak: number;
}

export class BigSmallRaceLogic implements GameLogic {
  private state: BigSmallRaceState = {
    score: 0,
    timeLeft: 60,
    num1: 0,
    num2: 0,
    gameOver: false,
    streak: 0,
    level: 1,
    maxStreak: 0,
  };

  private timerInterval: NodeJS.Timeout | null = null;

  async initialize(config: GameConfig): Promise<void> {
    this.generateNumbers();
    this.startTimer();
  }

  private generateNumbers(): void {
    const max = Math.min(20 + this.state.level * 10, 100);
    const n1 = Math.floor(Math.random() * max) + 1;
    let n2 = Math.floor(Math.random() * max) + 1;

    // Ensure numbers are different
    while (n2 === n1) {
      n2 = Math.floor(Math.random() * max) + 1;
    }

    this.state.num1 = n1;
    this.state.num2 = n2;
  }

  private startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.state.timeLeft > 0 && !this.state.gameOver) {
        this.state.timeLeft--;
      } else if (this.state.timeLeft === 0) {
        this.state.gameOver = true;
        this.stopTimer();
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  handleAnswer(answer: 'bigger' | 'smaller' | 'equal'): GameResult {
    let correct = false;

    if (answer === 'bigger' && this.state.num1 > this.state.num2) correct = true;
    if (answer === 'smaller' && this.state.num1 < this.state.num2) correct = true;
    if (answer === 'equal' && this.state.num1 === this.state.num2) correct = true;

    if (correct) {
      const points = 10 + this.state.streak * 2;
      this.state.score += points;
      this.state.streak++;

      if (this.state.streak > this.state.maxStreak) {
        this.state.maxStreak = this.state.streak;
      }

      // Level up every 5 correct answers
      if (this.state.streak > 0 && this.state.streak % 5 === 0) {
        this.state.level++;
      }

      this.generateNumbers();

      return {
        correct: true,
        score: this.state.score,
        feedback: '✅ Doğru!',
        points,
      };
    } else {
      this.state.streak = 0;
      this.state.score = Math.max(0, this.state.score - 5);

      this.generateNumbers();

      return {
        correct: false,
        score: this.state.score,
        feedback: '❌ Yanlış!',
      };
    }
  }

  getState(): BigSmallRaceState {
    return { ...this.state };
  }

  reset(): void {
    this.stopTimer();
    this.state = {
      score: 0,
      timeLeft: 60,
      num1: 0,
      num2: 0,
      gameOver: false,
      streak: 0,
      level: 1,
      maxStreak: 0,
    };
    this.generateNumbers();
    this.startTimer();
  }
}
