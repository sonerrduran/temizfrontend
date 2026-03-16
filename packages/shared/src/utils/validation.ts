/**
 * Validation utilities
 */

export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  password: (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Şifre en az 8 karakter olmalıdır');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Şifre en az bir büyük harf içermelidir');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Şifre en az bir küçük harf içermelidir');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Şifre en az bir rakam içermelidir');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  phone: (phone: string): boolean => {
    const phoneRegex = /^(\+90|0)?[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  tcNo: (tcNo: string): boolean => {
    if (tcNo.length !== 11) return false;
    if (!/^[0-9]{11}$/.test(tcNo)) return false;
    if (tcNo[0] === '0') return false;

    const digits = tcNo.split('').map(Number);
    const sum1 = (digits[0] + digits[2] + digits[4] + digits[6] + digits[8]) * 7;
    const sum2 = digits[1] + digits[3] + digits[5] + digits[7];
    const check1 = (sum1 - sum2) % 10;
    const check2 = (digits.slice(0, 10).reduce((a, b) => a + b, 0)) % 10;

    return check1 === digits[9] && check2 === digits[10];
  },

  required: (value: any): boolean => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
  },

  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },

  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },

  range: (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  },
};

export const sanitize = {
  html: (str: string): string => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    };
    return str.replace(/[&<>"'/]/g, (char) => map[char]);
  },

  sql: (str: string): string => {
    return str.replace(/['";\\]/g, '\\$&');
  },

  trim: (str: string): string => {
    return str.trim().replace(/\s+/g, ' ');
  },
};
