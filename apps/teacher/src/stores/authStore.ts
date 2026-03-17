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
  classroomIds?: string[];
  studentIds?: string[];
  subjects?: string[];
  bio?: string;
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

        // Sadece teacher rolüne izin ver
        if (mockUser.role !== 'teacher') {
          throw new Error('Bu panele sadece öğretmenler giriş yapabilir');
        }

        // User objesini teacher formatına dönüştür
        const teacherUser: User = {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.fullName,
          role: mockUser.role,
          avatar: mockUser.avatar,
          schoolId: 'schoolId' in mockUser ? mockUser.schoolId : undefined,
          classroomIds: 'classroomIds' in mockUser ? mockUser.classroomIds : [],
          studentIds: 'studentIds' in mockUser ? mockUser.studentIds : [],
          subjects: 'subjects' in mockUser ? mockUser.subjects : [],
          bio: 'bio' in mockUser ? mockUser.bio : undefined,
        };

        set({
          user: teacherUser,
          token: 'mock-teacher-token-' + mockUser.id,
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
      name: 'teacher-auth-storage',
    }
  )
);

// Development için helper - console'da göster
if (import.meta.env.DEV) {
  console.log('🔐 Teacher Login Credentials:');
  console.log('Email: zeynep.ozturk@school.com');
  console.log('Password: teacher123');
  console.log('\n📋 All Mock Passwords:', mockPasswords);
}
