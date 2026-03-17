import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, mockPasswords } from '@egitim-galaksisi/mock-data';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  schoolId?: string;
  permissions?: string[];
}

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

      login: async (email: string, password: string) => {
        // Mock data ile login
        const mockUser = loginUser(email, password);
        
        if (!mockUser) {
          throw new Error('Geçersiz email veya şifre');
        }

        // Sadece admin rolüne izin ver
        if (mockUser.role !== 'admin') {
          throw new Error('Bu panele sadece yöneticiler giriş yapabilir');
        }

        // User objesini admin formatına dönüştür
        const adminUser: User = {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.fullName,
          role: mockUser.role,
          avatar: mockUser.avatar,
          schoolId: 'schoolId' in mockUser ? mockUser.schoolId : undefined,
          permissions: 'permissions' in mockUser ? mockUser.permissions : ['all'],
        };

        set({
          user: adminUser,
          token: 'mock-admin-token-' + mockUser.id,
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

// Development için helper - console'da göster
if (import.meta.env.DEV) {
  console.log('🔐 Admin Login Credentials:');
  console.log('Email: admin@egitimgalaksisi.com');
  console.log('Password: admin123');
  console.log('\n📋 All Mock Passwords:', mockPasswords);
}
