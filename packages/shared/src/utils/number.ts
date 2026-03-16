/**
 * Number Utilities
 * Yaygın number işlemleri için yardımcı fonksiyonlar
 */

/**
 * Rastgele sayı üretir (min ve max dahil)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sayıyı belirli aralıkta tutar (clamp)
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Sayıyı formatlar (1000 -> 1,000)
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('tr-TR');
}

/**
 * Yüzde hesaplar
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * İki sayı arasında linear interpolation
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Sayının basamaklarını toplar
 */
export function sumDigits(num: number): number {
  return Math.abs(num)
    .toString()
    .split('')
    .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
}
