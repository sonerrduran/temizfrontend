/**
 * Timer Utilities
 * Zamanlayıcı fonksiyonları ve formatters
 */

/**
 * Saniyeyi dakika:saniye formatına çevirir
 * @param seconds - Saniye
 * @returns Formatlanmış süre (MM:SS)
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Saniyeyi saat:dakika:saniye formatına çevirir
 * @param seconds - Saniye
 * @returns Formatlanmış süre (HH:MM:SS)
 */
export function formatTimeWithHours(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Milisaniyeyi saniyeye çevirir
 * @param milliseconds - Milisaniye
 * @returns Saniye
 */
export function msToSeconds(milliseconds: number): number {
  return Math.floor(milliseconds / 1000);
}

/**
 * Saniyeyi milisaniyeye çevirir
 * @param seconds - Saniye
 * @returns Milisaniye
 */
export function secondsToMs(seconds: number): number {
  return seconds * 1000;
}

/**
 * İki zaman arasındaki farkı hesaplar
 * @param startTime - Başlangıç zamanı (timestamp)
 * @param endTime - Bitiş zamanı (timestamp)
 * @returns Fark (saniye)
 */
export function calculateTimeDifference(startTime: number, endTime: number): number {
  return msToSeconds(endTime - startTime);
}

/**
 * Kalan süreyi hesaplar
 * @param startTime - Başlangıç zamanı (timestamp)
 * @param duration - Toplam süre (saniye)
 * @returns Kalan süre (saniye)
 */
export function calculateRemainingTime(startTime: number, duration: number): number {
  const elapsed = calculateTimeDifference(startTime, Date.now());
  const remaining = duration - elapsed;
  return Math.max(0, remaining);
}

/**
 * Süre doldu mu kontrol eder
 * @param startTime - Başlangıç zamanı (timestamp)
 * @param duration - Toplam süre (saniye)
 * @returns Süre doldu mu
 */
export function isTimeUp(startTime: number, duration: number): boolean {
  return calculateRemainingTime(startTime, duration) === 0;
}

/**
 * Süre yüzdesini hesaplar
 * @param elapsed - Geçen süre (saniye)
 * @param total - Toplam süre (saniye)
 * @returns Yüzde (0-100)
 */
export function calculateTimePercentage(elapsed: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

/**
 * Süre rengini hesaplar (yeşil -> sarı -> kırmızı)
 * @param remainingSeconds - Kalan süre (saniye)
 * @param totalSeconds - Toplam süre (saniye)
 * @returns Renk kodu
 */
export function getTimeColor(remainingSeconds: number, totalSeconds: number): string {
  const percentage = (remainingSeconds / totalSeconds) * 100;

  if (percentage > 50) return '#4CAF50'; // Yeşil
  if (percentage > 25) return '#FFC107'; // Sarı
  return '#F44336'; // Kırmızı
}

/**
 * Süre uyarısı gerekli mi kontrol eder
 * @param remainingSeconds - Kalan süre (saniye)
 * @param warningThreshold - Uyarı eşiği (saniye)
 * @returns Uyarı gerekli mi
 */
export function shouldShowTimeWarning(
  remainingSeconds: number,
  warningThreshold: number = 10
): boolean {
  return remainingSeconds <= warningThreshold && remainingSeconds > 0;
}
