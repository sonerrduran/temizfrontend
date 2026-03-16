/**
 * API Service with Mock Data Support
 * Supports both mock and real API modes
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { mockData } from './mockData';

// Environment configuration
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (add auth token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle errors)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired, logout
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock delay simulation
const mockDelay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// ==================== AUTH API ====================
export const authAPI = {
  login: async (email: string, password: string) => {
    if (USE_MOCK) {
      await mockDelay();
      return mockData.auth.login(email, password);
    }
    const response = await axiosInstance.post('/api/auth/login', { email, password });
    return response.data;
  },

  register: async (data: any) => {
    if (USE_MOCK) {
      await mockDelay();
      return mockData.auth.register(data);
    }
    const response = await axiosInstance.post('/api/auth/register', data);
    return response.data;
  },

  me: async () => {
    if (USE_MOCK) {
      await mockDelay();
      return mockData.auth.me();
    }
    const response = await axiosInstance.get('/api/auth/me');
    return response.data;
  },

  logout: async () => {
    if (USE_MOCK) {
      await mockDelay();
      return { success: true };
    }
    const response = await axiosInstance.post('/api/auth/logout');
    return response.data;
  },
};

// ==================== GAME API ====================
export const gameAPI = {
  getCategories: async () => {
    if (USE_MOCK) {
      await mockDelay();
      return mockData.games.categories();
    }
    const response = await axiosInstance.get('/api/games/categories');
    return response.data;
  },

  getGames: async (categoryId?: string, gradeLevel?: number) => {
    if (USE_MOCK) {
      await mockDelay();
      return mockData.games.list(categoryId, gradeLevel);
    }
    const response = await axiosInstance.get('/api/games', {
      params: { categoryId, gradeLevel },
    });
    return response.data;
  },

  getGame: async (gameId: string) => {
    if (USE_MOCK) {
      await mockDelay();
      return mockData.games.detail(gameId);
    }
    const response = await axiosInstance.get(`/api/games/${gameId}`);
    return response.data;
  },

  saveScore: async (gameId: string, scoreData: any) => {
    if (USE_MOCK) {
      await mockDelay();
      return mockData.games.saveScore(gameId, scoreData);
    }
    const response = await axiosInstance.post(`/api/games/${gameId}/score`, scoreData);
    return response.data;
  },
};

// ==================== USER API ====================
export const userAPI = {
  getProfile: async () => {
    if (USE_MOCK) {
      await mockDelay();
      return mockData.user.profile();
    }
    const response = await axiosInstance.get('/api/users/profile');
    return response.data;
  },

  updateProfile: async (data: any) => {
    if (USE_MOCK) {
      await mockDelay();
      return mockData.user.updateProfile(data);
    }
    const response = await axiosInstance.put('/api/users/profile', data);
    return response.data;
  },

  getDashboard: async () => {
    if (USE_MOCK) {
      await mockDelay();
      return mockData.user.dashboard();
    }
    const response = await axiosInstance.get('/api/users/dashboard');
    return response.data;
  },

  getStats: async (userId: string) => {
    if (USE_MOCK) {
      await mockDelay();
      return mockData.user.stats(userId);
    }
    const response = await axiosInstance.get(`/api/users/${userId}/stats`);
    return response.data;
  },
};

// ==================== LEADERBOARD API ====================
export const leaderboardAPI = {
  getGlobal: async (period: 'daily' | 'weekly' | 'monthly' | 'alltime' = 'weekly') => {
    if (USE_MOCK) {
      await mockDelay();
      return mockData.leaderboard.global(period);
    }
    const response = await axiosInstance.get('/api/leaderboard', { params: { period } });
    return response.data;
  },

  getByGame: async (gameId: string) => {
    if (USE_MOCK) {
      await mockDelay();
      return mockData.leaderboard.byGame(gameId);
    }
    const response = await axiosInstance.get(`/api/leaderboard/game/${gameId}`);
    return response.data;
  },
};

// ==================== NOTIFICATION API ====================
export const notificationAPI = {
  getAll: async () => {
    if (USE_MOCK) {
      await mockDelay();
      return mockData.notifications.list();
    }
    const response = await axiosInstance.get('/api/notifications');
    return response.data;
  },

  markAsRead: async (notificationId: string) => {
    if (USE_MOCK) {
      await mockDelay();
      return { success: true };
    }
    const response = await axiosInstance.put(`/api/notifications/${notificationId}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    if (USE_MOCK) {
      await mockDelay();
      return { success: true };
    }
    const response = await axiosInstance.put('/api/notifications/read-all');
    return response.data;
  },
};

export default {
  auth: authAPI,
  game: gameAPI,
  user: userAPI,
  leaderboard: leaderboardAPI,
  notification: notificationAPI,
};
