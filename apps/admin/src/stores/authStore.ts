import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@egitim-galaksisi/shared';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, _password: string) => {
        // Mock login - in production, this would call the API
        const mockUser: User = {
          id: '1',
          email,
          name: 'Yönetici',
          role: 'SCHOOL_ADMIN',
          gradeLevel: 0,
          stars: 0,
          xp: 0,
          level: 1,
          avatar: '',
          solvedProblems: 0,
          streakDays: 0,
          schoolId: null,
          school: null,
        };

        set({
          user: mockUser,
          token: 'mock-token',
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'admin-auth-storage',
    }
  )
);
