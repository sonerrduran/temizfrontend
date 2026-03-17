import { create } from 'zustand';
import { authAPI } from '../services/api';
import type { User } from '@egitim-galaksisi/shared';

export type UserRole = 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';

export type AuthUser = User;

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    role?: string;
    gradeLevel?: number;
    schoolCode?: string;
  }) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  updateUser: (data: Partial<AuthUser>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res: any = await authAPI.login(email, password);
      const { token, refreshToken, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      console.error('❌ Login Error:', err);
      set({ error: err?.error || 'Giriş başarısız', isLoading: false });
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res: any = await authAPI.register(data);
      const { token, refreshToken, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      set({ error: err?.error || 'Kayıt başarısız', isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, isLoading: false });
      return;
    }
    set({ isLoading: true });
    try {
      const res: any = await authAPI.me();
      set({ user: res.data, isAuthenticated: true, isLoading: false });
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },

  updateUser: (data) => {
    const user = get().user;
    if (user) set({ user: { ...user, ...data } });
  },

  clearError: () => set({ error: null }),
}));
