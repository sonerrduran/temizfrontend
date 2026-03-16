import { create } from 'zustand';
import { Difficulty } from '../types';

interface UIState {
  sidebarOpen: boolean;
  selectedDifficulty: Difficulty;
  selectedGrade: number;
  theme: 'dark' | 'light';

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setDifficulty: (d: Difficulty) => void;
  setGrade: (g: number) => void;
  setTheme: (t: 'dark' | 'light') => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  selectedDifficulty: Difficulty.MEDIUM,
  selectedGrade: parseInt(localStorage.getItem('selectedGrade') || '5'),
  theme: 'dark',

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setDifficulty: (d) => set({ selectedDifficulty: d }),
  setGrade: (g) => {
    localStorage.setItem('selectedGrade', String(g));
    set({ selectedGrade: g });
  },
  setTheme: (t) => set({ theme: t }),
}));
