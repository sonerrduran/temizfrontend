import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  gradeLevel: number;
  stars: number;
  xp: number;
  level: number;
  avatar: string;
  solvedProblems: number;
  streakDays: number;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
    gradeLevel?: number;
  }) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<AuthUser>) => void;
}

// Mock kullanıcılar - Demo için
const MOCK_USERS: Record<string, AuthUser & { password: string }> = {
  'student@test.com': {
    id: '1',
    email: 'student@test.com',
    password: '123456',
    name: 'Ahmet Yılmaz',
    role: 'STUDENT',
    gradeLevel: 5,
    stars: 150,
    xp: 2500,
    level: 8,
    avatar: '👦',
    solvedProblems: 45,
    streakDays: 7,
  },
  'teacher@test.com': {
    id: '2',
    email: 'teacher@test.com',
    password: '123456',
    name: 'Ayşe Öğretmen',
    role: 'TEACHER',
    gradeLevel: 0,
    stars: 500,
    xp: 10000,
    level: 20,
    avatar: '👩‍🏫',
    solvedProblems: 200,
    streakDays: 30,
  },
  'parent@test.com': {
    id: '3',
    email: 'parent@test.com',
    password: '123456',
    name: 'Mehmet Veli',
    role: 'PARENT',
    gradeLevel: 0,
    stars: 0,
    xp: 0,
    level: 1,
    avatar: '👨',
    solvedProblems: 0,
    streakDays: 0,
  },
  'admin@test.com': {
    id: '4',
    email: 'admin@test.com',
    password: '123456',
    name: 'Admin',
    role: 'SUPER_ADMIN',
    gradeLevel: 0,
    stars: 1000,
    xp: 50000,
    level: 50,
    avatar: '👑',
    solvedProblems: 500,
    streakDays: 100,
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockUser = MOCK_USERS[email.toLowerCase()];

        if (!mockUser || mockUser.password !== password) {
          throw new Error('Email veya şifre hatalı');
        }

        const { password: _, ...user } = mockUser;
        set({ user, isAuthenticated: true });
      },

      register: async (data) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check if user already exists
        if (MOCK_USERS[data.email.toLowerCase()]) {
          throw new Error('Bu email zaten kayıtlı');
        }

        // Create new user
        const newUser: AuthUser = {
          id: Date.now().toString(),
          email: data.email,
          name: data.name,
          role: data.role || 'STUDENT',
          gradeLevel: data.gradeLevel || 1,
          stars: 0,
          xp: 0,
          level: 1,
          avatar: data.role === 'TEACHER' ? '👨‍🏫' : data.role === 'PARENT' ? '👨' : '👦',
          solvedProblems: 0,
          streakDays: 0,
        };

        // Save to mock users (in real app, this would be in backend)
        MOCK_USERS[data.email.toLowerCase()] = { ...newUser, password: data.password };

        set({ user: newUser, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
