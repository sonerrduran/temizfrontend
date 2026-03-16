/**
 * LocalStorage wrapper with type safety and error handling
 */

export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue || null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return defaultValue || null;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error);
      return false;
    }
  },

  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error);
      return false;
    }
  },

  clear: (): boolean => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage', error);
      return false;
    }
  },

  has: (key: string): boolean => {
    return localStorage.getItem(key) !== null;
  },

  keys: (): string[] => {
    return Object.keys(localStorage);
  },

  size: (): number => {
    return localStorage.length;
  },
};

export const sessionStorage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = window.sessionStorage.getItem(key);
      if (!item) return defaultValue || null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from sessionStorage: ${key}`, error);
      return defaultValue || null;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to sessionStorage: ${key}`, error);
      return false;
    }
  },

  remove: (key: string): boolean => {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from sessionStorage: ${key}`, error);
      return false;
    }
  },

  clear: (): boolean => {
    try {
      window.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage', error);
      return false;
    }
  },
};
