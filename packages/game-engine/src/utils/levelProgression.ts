/**
 * Level Progression Utilities
 * Seviye ilerlemesi ve zorluk ölçeklendirme fonksiyonları
 */

export interface LevelConfig {
  level: number;
  difficulty: number;
  timeLimit?: number;
  targetScore: number;
  questionsCount?: number;
  livesCount?: number;
}

export interface DifficultyScaling {
  baseValue: number;
  scalingFactor: number;
  maxValue?: number;
  minValue?: number;
}

/**
 * Seviye için zorluk değerini hesaplar
 * @param level - Mevcut seviye
 * @param baseValue - Başlangıç değeri
 * @param scalingFactor - Ölçeklendirme faktörü (örn: 1.2 = %20 artış)
 * @param maxValue - Maksimum değer limiti
 * @returns Hesaplanan zorluk değeri
 */
export function calculateDifficulty(
  level: number,
  baseValue: number,
  scalingFactor: number = 1.2,
  maxValue?: number
): number {
  const difficulty = baseValue * Math.pow(scalingFactor, level - 1);
  return maxValue ? Math.min(difficulty, maxValue) : difficulty;
}

/**
 * Seviye için hedef skoru hesaplar
 * @param level - Mevcut seviye
 * @param baseScore - Başlangıç skoru
 * @param scalingFactor - Ölçeklendirme faktörü
 * @returns Hedef skor
 */
export function calculateTargetScore(
  level: number,
  baseScore: number = 100,
  scalingFactor: number = 1.5
): number {
  return Math.floor(baseScore * Math.pow(scalingFactor, level - 1));
}

/**
 * Seviye için süre limitini hesaplar
 * @param level - Mevcut seviye
 * @param baseTime - Başlangıç süresi (saniye)
 * @param scalingFactor - Ölçeklendirme faktörü (< 1 = azalır, > 1 = artar)
 * @param minTime - Minimum süre limiti
 * @returns Süre limiti (saniye)
 */
export function calculateTimeLimit(
  level: number,
  baseTime: number = 60,
  scalingFactor: number = 0.95,
  minTime: number = 20
): number {
  const timeLimit = baseTime * Math.pow(scalingFactor, level - 1);
  return Math.max(Math.floor(timeLimit), minTime);
}

/**
 * Seviye için soru sayısını hesaplar
 * @param level - Mevcut seviye
 * @param baseCount - Başlangıç soru sayısı
 * @param scalingFactor - Ölçeklendirme faktörü
 * @param maxCount - Maksimum soru sayısı
 * @returns Soru sayısı
 */
export function calculateQuestionsCount(
  level: number,
  baseCount: number = 5,
  scalingFactor: number = 1.1,
  maxCount: number = 20
): number {
  const count = baseCount * Math.pow(scalingFactor, level - 1);
  return Math.min(Math.floor(count), maxCount);
}

/**
 * Seviye için can sayısını hesaplar
 * @param level - Mevcut seviye
 * @param baseLives - Başlangıç can sayısı
 * @param scalingFactor - Ölçeklendirme faktörü (< 1 = azalır)
 * @param minLives - Minimum can sayısı
 * @returns Can sayısı
 */
export function calculateLivesCount(
  level: number,
  baseLives: number = 5,
  scalingFactor: number = 0.98,
  minLives: number = 3
): number {
  const lives = baseLives * Math.pow(scalingFactor, level - 1);
  return Math.max(Math.floor(lives), minLives);
}

/**
 * Seviye konfigürasyonunu oluşturur
 * @param level - Mevcut seviye
 * @param options - Ölçeklendirme seçenekleri
 * @returns Seviye konfigürasyonu
 */
export function generateLevelConfig(
  level: number,
  options: {
    baseScore?: number;
    baseTime?: number;
    baseQuestions?: number;
    baseLives?: number;
    difficultyScaling?: number;
    timeScaling?: number;
    questionsScaling?: number;
    livesScaling?: number;
  } = {}
): LevelConfig {
  const {
    baseScore = 100,
    baseTime = 60,
    baseQuestions = 5,
    baseLives = 5,
    difficultyScaling = 1.2,
    timeScaling = 0.95,
    questionsScaling = 1.1,
    livesScaling = 0.98,
  } = options;

  return {
    level,
    difficulty: calculateDifficulty(level, 1, difficultyScaling),
    timeLimit: calculateTimeLimit(level, baseTime, timeScaling),
    targetScore: calculateTargetScore(level, baseScore),
    questionsCount: calculateQuestionsCount(level, baseQuestions, questionsScaling),
    livesCount: calculateLivesCount(level, baseLives, livesScaling),
  };
}

/**
 * Bir sonraki seviyeye geçiş kontrolü yapar
 * @param currentScore - Mevcut skor
 * @param targetScore - Hedef skor
 * @param minAccuracy - Minimum doğruluk oranı (0-1)
 * @param correctAnswers - Doğru cevap sayısı
 * @param totalQuestions - Toplam soru sayısı
 * @returns Seviye geçişi yapılabilir mi
 */
export function canProgressToNextLevel(
  currentScore: number,
  targetScore: number,
  minAccuracy: number = 0.7,
  correctAnswers?: number,
  totalQuestions?: number
): boolean {
  const scoreCheck = currentScore >= targetScore;

  if (correctAnswers !== undefined && totalQuestions !== undefined && totalQuestions > 0) {
    const accuracy = correctAnswers / totalQuestions;
    return scoreCheck && accuracy >= minAccuracy;
  }

  return scoreCheck;
}

/**
 * Seviye ilerlemesi için bonus skor hesaplar
 * @param level - Mevcut seviye
 * @param timeRemaining - Kalan süre (saniye)
 * @param livesRemaining - Kalan can sayısı
 * @param perfectScore - Mükemmel skor bonusu
 * @returns Bonus skor
 */
export function calculateLevelBonus(
  level: number,
  timeRemaining: number = 0,
  livesRemaining: number = 0,
  perfectScore: boolean = false
): number {
  let bonus = 0;

  // Seviye bonusu
  bonus += level * 10;

  // Süre bonusu (her saniye için)
  bonus += timeRemaining * 5;

  // Can bonusu (her can için)
  bonus += livesRemaining * 20;

  // Mükemmel skor bonusu
  if (perfectScore) {
    bonus += level * 50;
  }

  return bonus;
}

/**
 * Zorluk seviyesine göre puan çarpanını hesaplar
 * @param difficulty - Zorluk değeri
 * @returns Puan çarpanı
 */
export function getDifficultyMultiplier(difficulty: number): number {
  if (difficulty >= 5) return 3.0;
  if (difficulty >= 4) return 2.5;
  if (difficulty >= 3) return 2.0;
  if (difficulty >= 2) return 1.5;
  return 1.0;
}

/**
 * Seviye aralığı için konfigürasyon dizisi oluşturur
 * @param startLevel - Başlangıç seviyesi
 * @param endLevel - Bitiş seviyesi
 * @param options - Ölçeklendirme seçenekleri
 * @returns Seviye konfigürasyonları dizisi
 */
export function generateLevelRange(
  startLevel: number,
  endLevel: number,
  options: Parameters<typeof generateLevelConfig>[1] = {}
): LevelConfig[] {
  const levels: LevelConfig[] = [];

  for (let level = startLevel; level <= endLevel; level++) {
    levels.push(generateLevelConfig(level, options));
  }

  return levels;
}
