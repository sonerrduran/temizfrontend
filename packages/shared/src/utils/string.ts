/**
 * String Utilities
 * Yaygın string işlemleri için yardımcı fonksiyonlar
 */

/**
 * String'i capitalize eder (ilk harf büyük)
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * String'i title case'e çevirir
 */
export function titleCase(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * String'den Türkçe karakterleri kaldırır
 */
export function removeTurkishChars(str: string): string {
  const turkishChars: Record<string, string> = {
    ç: 'c',
    Ç: 'C',
    ğ: 'g',
    Ğ: 'G',
    ı: 'i',
    İ: 'I',
    ö: 'o',
    Ö: 'O',
    ş: 's',
    Ş: 'S',
    ü: 'u',
    Ü: 'U',
  };

  return str.replace(/[çÇğĞıİöÖşŞüÜ]/g, (char) => turkishChars[char] || char);
}

/**
 * String'i slug'a çevirir (URL-friendly)
 */
export function slugify(str: string): string {
  return removeTurkishChars(str)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * String'i truncate eder
 */
export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}
