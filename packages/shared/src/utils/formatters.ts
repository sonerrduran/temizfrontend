/**
 * Formatting utilities
 */

export const formatters = {
  date: (date: Date | string, format: 'short' | 'long' | 'time' = 'short'): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    
    if (format === 'time') {
      return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    }
    
    if (format === 'long') {
      return d.toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    return d.toLocaleDateString('tr-TR');
  },

  relativeTime: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return 'Az önce';
    if (minutes < 60) return `${minutes} dakika önce`;
    if (hours < 24) return `${hours} saat önce`;
    if (days < 30) return `${days} gün önce`;
    if (months < 12) return `${months} ay önce`;
    return `${years} yıl önce`;
  },

  number: (num: number, decimals: number = 0): string => {
    return num.toLocaleString('tr-TR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  },

  currency: (amount: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  },

  percentage: (value: number, total: number, decimals: number = 0): string => {
    const percent = (value / total) * 100;
    return `%${percent.toFixed(decimals)}`;
  },

  fileSize: (bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  },

  phone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }
    return phone;
  },

  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  truncate: (str: string, length: number, suffix: string = '...'): string => {
    if (str.length <= length) return str;
    return str.slice(0, length - suffix.length) + suffix;
  },
};
