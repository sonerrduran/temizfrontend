import React from 'react';

export enum GameMode {
  HOME = 'home',
  MATH_MENU = 'math_menu',
  REPORTS = 'reports',
}

export interface LayoutProps {
  children: React.ReactNode;
  stars: number;
  avatar: string;
  onNavigate: (mode: GameMode) => void;
  currentMode: GameMode;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentMode }) => {
  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {/* Content Area */}
      <main className="flex-1 px-4 py-8 flex flex-col items-center">{children}</main>

      {/* Mobile Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl flex items-center gap-8 z-50 md:hidden">
        <button
          onClick={() => onNavigate(GameMode.HOME)}
          className={`p-2 transition-all ${currentMode === GameMode.HOME ? 'text-yellow-400 scale-125' : 'text-white/50'}`}
        >
          <span className="text-2xl">🏠</span>
        </button>
        <button
          onClick={() => onNavigate(GameMode.MATH_MENU)}
          className={`p-2 transition-all ${currentMode === GameMode.MATH_MENU ? 'text-yellow-400 scale-125' : 'text-white/50'}`}
        >
          <span className="text-2xl">🔢</span>
        </button>
        <button
          onClick={() => onNavigate(GameMode.REPORTS)}
          className={`p-2 transition-all ${currentMode === GameMode.REPORTS ? 'text-yellow-400 scale-125' : 'text-white/50'}`}
        >
          <span className="text-2xl">📊</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
