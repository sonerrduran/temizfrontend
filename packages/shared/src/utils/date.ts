/**
 * Date Utilities
 * Tarih işlemleri için yardımcı fonksiyonlar
 */

/**
 * Tarihi formatlar
 */
export function formatDate(date: Date, format: 'short' | 'long' = 'short'): string {
  const options: Intl.DateTimeFormatOptions =
    format === 'long'
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: '2-digit', day: '2-digit' };

  return date.toLocaleDateString('tr-TR', options);
}

/**
 * Zamanı formatlar
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Tarih ve zamanı formatlar
 */
export function formatDateTime(date: Date): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}

/**
 * Relative time (örn: "2 saat önce")
 */
export function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  const intervals = {
    yıl: 31536000,
    ay: 2592000,
    hafta: 604800,
    gün: 86400,
    saat: 3600,
    dakika: 60,
    saniye: 1,
  };

  for (const [name, secondsInInterval] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInInterval);
    if (interval >= 1) {
      return `${interval} ${name} önce`;
    }
  }

  return 'şimdi';
}

/**
 * İki tarih arasındaki gün farkı
 */
export function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
}
