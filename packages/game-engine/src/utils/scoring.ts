/**
 * Scoring Utilities
 * Oyunlar arası tutarlı skor hesaplama
 */

/**
 * Temel skor hesaplama
 * @param correctAnswers Doğru cevap sayısı
 * @param totalQuestions Toplam soru sayısı
 * @param timeBonus Zaman bonusu (opsiyonel)
 * @param difficultyMultiplier Zorluk çarpanı (1-3 arası)
 * @returns Hesaplanan skor
 */
export const calculateScore = (
  correctAnswers: number,
  totalQuestions: number,
  timeBonus: number = 0,
  difficultyMultiplier: number = 1
): number => {
  if (totalQuestions === 0) return 0;

  const baseScore = (correctAnswers / totalQuestions) * 100;
  const finalScore = (baseScore + timeBonus) * difficultyMultiplier;

  return Math.round(Math.max(0, finalScore));
};

/**
 * Yıldız sayısı hesaplama
 * @param score Skor (0-100 arası)
 * @returns Yıldız sayısı (0-3)
 */
export const calculateStars = (score: number): number => {
  if (score >= 90) return 3;
  if (score >= 70) return 2;
  if (score >= 50) return 1;
  return 0;
};

/**
 * Performans değerlendirmesi
 * @param score Skor (0-100 arası)
 * @returns Performans mesajı
 */
export const getPerformanceMessage = (score: number): string => {
  if (score >= 90) return 'Mükemmel! 🌟';
  if (score >= 70) return 'Harika! 👏';
  if (score >= 50) return 'İyi! 👍';
  return 'Tekrar dene! 💪';
};

/**
 * Zaman bonusu hesaplama
 * @param timeSpent Harcanan süre (saniye)
 * @param timeLimit Süre limiti (saniye)
 * @returns Bonus puan
 */
export const calculateTimeBonus = (timeSpent: number, timeLimit: number): number => {
  if (timeSpent >= timeLimit) return 0;

  const remainingTime = timeLimit - timeSpent;
  const bonusPercentage = (remainingTime / timeLimit) * 100;

  return Math.round(bonusPercentage * 0.2); // Max 20 bonus puan
};

/**
 * Combo bonusu hesaplama
 * @param comboCount Ardışık doğru cevap sayısı
 * @returns Bonus puan
 */
export const calculateComboBonus = (comboCount: number): number => {
  if (comboCount < 3) return 0;
  return Math.min(comboCount * 5, 50); // Max 50 bonus puan
};

/**
 * Toplam skor hesaplama (tüm bonuslarla)
 * @param correctAnswers Doğru cevap sayısı
 * @param totalQuestions Toplam soru sayısı
 * @param timeSpent Harcanan süre
 * @param timeLimit Süre limiti
 * @param comboCount Combo sayısı
 * @param difficultyMultiplier Zorluk çarpanı
 * @returns Toplam skor
 */
export const calculateTotalScore = (
  correctAnswers: number,
  totalQuestions: number,
  timeSpent: number,
  timeLimit: number,
  comboCount: number = 0,
  difficultyMultiplier: number = 1
): number => {
  const baseScore = calculateScore(correctAnswers, totalQuestions, 0, difficultyMultiplier);
  const timeBonus = calculateTimeBonus(timeSpent, timeLimit);
  const comboBonus = calculateComboBonus(comboCount);

  return baseScore + timeBonus + comboBonus;
};
