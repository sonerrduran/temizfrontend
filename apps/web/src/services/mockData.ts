// Mock Data for Frontend-First Development
// Bu dosya backend hazır olana kadar kullanılacak

export const mockCategories = [
  {
    id: '1',
    name: 'Matematik',
    code: 'MATH',
    icon: '🔢',
    color: '#3b82f6',
    description: '200+ matematik oyunu ve egzersizi',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: '2',
    name: 'Türkçe',
    code: 'TURKISH',
    icon: '📚',
    color: '#ef4444',
    description: '30+ Türkçe dil oyunu',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: '3',
    name: 'Mantık Oyunları',
    code: 'LOGIC',
    icon: '🧩',
    color: '#8b5cf6',
    description: '115+ mantık ve puzzle oyunu',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: '4',
    name: 'Hızlı Okuma',
    code: 'FAST_READING',
    icon: '⚡',
    color: '#f59e0b',
    description: '20+ hızlı okuma egzersizi',
    sortOrder: 4,
    isActive: true,
  },
  {
    id: '5',
    name: 'Dikkat ve Odaklanma',
    code: 'FOCUS',
    icon: '🎯',
    color: '#10b981',
    description: '6 dikkat geliştirme oyunu',
    sortOrder: 5,
    isActive: true,
  },
  {
    id: '6',
    name: 'Öğrenme Teknikleri',
    code: 'LEARNING',
    icon: '🧠',
    color: '#06b6d4',
    description: '11 öğrenme aracı',
    sortOrder: 6,
    isActive: true,
  },
  {
    id: '7',
    name: 'Yaşam Becerileri',
    code: 'LIFE_SKILLS',
    icon: '🌟',
    color: '#ec4899',
    description: 'Trafik, hijyen, finans ve daha fazlası',
    sortOrder: 7,
    isActive: true,
  },
];

export const mockGames = [
  // Matematik Oyunları
  {
    id: 'math-1',
    name: 'Meyve Toplama',
    code: 'FRUIT_ADDITION',
    categoryId: '1',
    description: 'Meyveleri toplayarak toplama işlemini öğren',
    icon: '🍎',
    gradeMin: 1,
    gradeMax: 2,
    difficulty: 'EASY',
    component: 'FruitAdditionGame',
    path: '/legacy',
    tags: ['toplama', 'temel işlemler'],
    isActive: true,
    isFeatured: true,
    sortOrder: 1,
    playCount: 1250,
    avgRating: 4.8,
  },
  {
    id: 'math-2',
    name: 'Uzay Toplama',
    code: 'SPACE_ADDITION',
    categoryId: '1',
    description: 'Uzayda toplama macerası',
    icon: '🚀',
    gradeMin: 1,
    gradeMax: 3,
    difficulty: 'MEDIUM',
    component: 'SpaceAdditionGame',
    path: '/legacy',
    tags: ['toplama', 'uzay'],
    isActive: true,
    isFeatured: true,
    sortOrder: 2,
    playCount: 980,
    avgRating: 4.7,
  },
  {
    id: 'math-3',
    name: 'Hızlı Matematik',
    code: 'SPEED_MATH',
    categoryId: '1',
    description: 'Zamana karşı matematik yarışı',
    icon: '⚡',
    gradeMin: 2,
    gradeMax: 5,
    difficulty: 'HARD',
    component: 'SpeedMathGame',
    path: '/legacy',
    tags: ['hız', 'dört işlem'],
    isActive: true,
    isFeatured: true,
    sortOrder: 3,
    playCount: 2100,
    avgRating: 4.9,
  },

  // Türkçe Oyunları
  {
    id: 'turkish-1',
    name: 'Harf Eşleştirme',
    code: 'LETTER_MATCH',
    categoryId: '2',
    description: 'Harfleri eşleştirerek öğren',
    icon: '🔤',
    gradeMin: 1,
    gradeMax: 1,
    difficulty: 'EASY',
    component: 'LetterMatchGame',
    path: '/turkish/grade1/letters/match',
    tags: ['harf', 'eşleştirme'],
    isActive: true,
    isFeatured: true,
    sortOrder: 1,
    playCount: 850,
    avgRating: 4.6,
  },
  {
    id: 'turkish-2',
    name: 'Sesli-Sessiz Harf',
    code: 'VOWEL_CONSONANT',
    categoryId: '2',
    description: 'Sesli ve sessiz harfleri ayırt et',
    icon: '🎵',
    gradeMin: 1,
    gradeMax: 2,
    difficulty: 'EASY',
    component: 'VowelConsonantGame',
    path: '/turkish/grade1/letters/vowel-consonant',
    tags: ['harf', 'sesli', 'sessiz'],
    isActive: true,
    isFeatured: false,
    sortOrder: 2,
    playCount: 720,
    avgRating: 4.5,
  },

  // Mantık Oyunları
  {
    id: 'logic-1',
    name: 'Sudoku',
    code: 'SUDOKU',
    categoryId: '3',
    description: 'Klasik Sudoku bulmacası',
    icon: '🔢',
    gradeMin: 3,
    gradeMax: 8,
    difficulty: 'MEDIUM',
    component: 'SudokuGame',
    path: '/legacy',
    tags: ['sudoku', 'mantık'],
    isActive: true,
    isFeatured: true,
    sortOrder: 1,
    playCount: 3500,
    avgRating: 4.9,
  },
  {
    id: 'logic-2',
    name: 'Satranç',
    code: 'CHESS',
    categoryId: '3',
    description: 'Klasik satranç oyunu',
    icon: '♟️',
    gradeMin: 2,
    gradeMax: 8,
    difficulty: 'HARD',
    component: 'ChessGame',
    path: '/legacy',
    tags: ['satranç', 'strateji'],
    isActive: true,
    isFeatured: true,
    sortOrder: 2,
    playCount: 2800,
    avgRating: 4.8,
  },

  // Hızlı Okuma
  {
    id: 'reading-1',
    name: 'Hız Okuma Testi',
    code: 'SPEED_READING_TEST',
    categoryId: '4',
    description: 'Okuma hızını ölç ve geliştir',
    icon: '📖',
    gradeMin: 2,
    gradeMax: 8,
    difficulty: 'MEDIUM',
    component: 'SpeedReadingTest',
    path: '/legacy',
    tags: ['okuma', 'hız'],
    isActive: true,
    isFeatured: true,
    sortOrder: 1,
    playCount: 1500,
    avgRating: 4.7,
  },

  // Dikkat Oyunları
  {
    id: 'focus-1',
    name: 'Hafıza Kartları',
    code: 'MEMORY_CARDS',
    categoryId: '5',
    description: 'Kartları eşleştirerek hafızanı güçlendir',
    icon: '🃏',
    gradeMin: 1,
    gradeMax: 8,
    difficulty: 'EASY',
    component: 'MemoryCardsGame',
    path: '/legacy',
    tags: ['hafıza', 'dikkat'],
    isActive: true,
    isFeatured: true,
    sortOrder: 1,
    playCount: 1800,
    avgRating: 4.6,
  },
];

export const mockUsers: any[] = [
  // Test users
  {
    id: '1',
    email: 'student@test.com',
    name: 'Test Öğrenci',
    role: 'STUDENT',
    gradeLevel: 5,
    stars: 1250,
    xp: 5600,
    level: 12,
    avatar: '🦸‍♂️',
    solvedProblems: 450,
    streakDays: 7,
    schoolId: 'school-1',
    school: { id: 'school-1', name: 'Özel Edirne Koleji', code: 'OEK2024' },
  },
  {
    id: '2',
    email: 'teacher@test.com',
    name: 'Test Öğretmen',
    role: 'TEACHER',
    gradeLevel: 0,
    stars: 0,
    xp: 0,
    level: 1,
    avatar: '👨‍🏫',
    solvedProblems: 0,
    streakDays: 0,
    schoolId: 'school-1',
    school: { id: 'school-1', name: 'Özel Edirne Koleji', code: 'OEK2024' },
  },
  {
    id: '3',
    email: 'admin@test.com',
    name: 'Test Admin',
    role: 'SUPER_ADMIN',
    gradeLevel: 0,
    stars: 0,
    xp: 0,
    level: 1,
    avatar: '👑',
    solvedProblems: 0,
    streakDays: 0,
    schoolId: 'school-1',
    school: { id: 'school-1', name: 'Özel Edirne Koleji', code: 'OEK2024' },
  },
  // Students from mock-data
  {
    id: 'student-1',
    email: 'ahmet@example.com',
    name: 'Ahmet Yılmaz',
    role: 'STUDENT',
    gradeLevel: 3,
    stars: 234,
    xp: 15420,
    level: 15,
    avatar: '👨‍🚀',
    solvedProblems: 156,
    streakDays: 5,
    schoolId: 'school-1',
    school: { id: 'school-1', name: 'Özel Edirne Koleji', code: 'OEK2024' },
  },
  {
    id: 'student-2',
    email: 'ayse@example.com',
    name: 'Ayşe Demir',
    role: 'STUDENT',
    gradeLevel: 4,
    stars: 287,
    xp: 18950,
    level: 18,
    avatar: '👧',
    solvedProblems: 203,
    streakDays: 8,
    schoolId: 'school-1',
    school: { id: 'school-1', name: 'Özel Edirne Koleji', code: 'OEK2024' },
  },
  {
    id: 'student-3',
    email: 'mehmet@example.com',
    name: 'Mehmet Kaya',
    role: 'STUDENT',
    gradeLevel: 2,
    stars: 145,
    xp: 9870,
    level: 9,
    avatar: '👦',
    solvedProblems: 98,
    streakDays: 3,
    schoolId: 'school-1',
    school: { id: 'school-1', name: 'Özel Edirne Koleji', code: 'OEK2024' },
  },
  // Teachers
  {
    id: 'teacher-1',
    email: 'zeynep.ozturk@school.com',
    name: 'Zeynep Öztürk',
    role: 'TEACHER',
    gradeLevel: 0,
    stars: 0,
    xp: 0,
    level: 1,
    avatar: '👩‍🏫',
    solvedProblems: 0,
    streakDays: 0,
    schoolId: 'school-1',
    school: { id: 'school-1', name: 'Özel Edirne Koleji', code: 'OEK2024' },
  },
  {
    id: 'teacher-2',
    email: 'ali.celik@school.com',
    name: 'Ali Çelik',
    role: 'TEACHER',
    gradeLevel: 0,
    stars: 0,
    xp: 0,
    level: 1,
    avatar: '👨‍🏫',
    solvedProblems: 0,
    streakDays: 0,
    schoolId: 'school-1',
    school: { id: 'school-1', name: 'Özel Edirne Koleji', code: 'OEK2024' },
  },
  {
    id: 'teacher-3',
    email: 'fatma.yildirim@school.com',
    name: 'Fatma Yıldırım',
    role: 'TEACHER',
    gradeLevel: 0,
    stars: 0,
    xp: 0,
    level: 1,
    avatar: '👩‍🏫',
    solvedProblems: 0,
    streakDays: 0,
    schoolId: 'school-1',
    school: { id: 'school-1', name: 'Özel Edirne Koleji', code: 'OEK2024' },
  },
  // Parents
  {
    id: 'parent-1',
    email: 'mustafa.yilmaz@example.com',
    name: 'Mustafa Yılmaz',
    role: 'PARENT',
    gradeLevel: 0,
    stars: 0,
    xp: 0,
    level: 1,
    avatar: '👨',
    solvedProblems: 0,
    streakDays: 0,
    schoolId: 'school-1',
    school: { id: 'school-1', name: 'Özel Edirne Koleji', code: 'OEK2024' },
  },
  {
    id: 'parent-2',
    email: 'emine.demir@example.com',
    name: 'Emine Demir',
    role: 'PARENT',
    gradeLevel: 0,
    stars: 0,
    xp: 0,
    level: 1,
    avatar: '👩',
    solvedProblems: 0,
    streakDays: 0,
    schoolId: 'school-1',
    school: { id: 'school-1', name: 'Özel Edirne Koleji', code: 'OEK2024' },
  },
  {
    id: 'parent-3',
    email: 'hasan.kaya@example.com',
    name: 'Hasan Kaya',
    role: 'PARENT',
    gradeLevel: 0,
    stars: 0,
    xp: 0,
    level: 1,
    avatar: '👨',
    solvedProblems: 0,
    streakDays: 0,
    schoolId: 'school-1',
    school: { id: 'school-1', name: 'Özel Edirne Koleji', code: 'OEK2024' },
  },
  // Admin
  {
    id: 'admin-1',
    email: 'admin@egitimgalaksisi.com',
    name: 'Admin User',
    role: 'SUPER_ADMIN',
    gradeLevel: 0,
    stars: 0,
    xp: 0,
    level: 1,
    avatar: '👑',
    solvedProblems: 0,
    streakDays: 0,
    schoolId: 'school-1',
    school: { id: 'school-1', name: 'Özel Edirne Koleji', code: 'OEK2024' },
  },
];

export const mockLeaderboard = [
  { id: '1', name: 'Kozmik Efe', stars: 2500, avatar: '🦸‍♂️', rank: 1, xp: 12000, level: 25 },
  { id: '2', name: 'Yıldız Ada', stars: 2100, avatar: '👽', rank: 2, xp: 10500, level: 22 },
  { id: '3', name: 'Robot Mert', stars: 1850, avatar: '🤖', rank: 3, xp: 9200, level: 20 },
  { id: '4', name: 'Galaktik Elif', stars: 1600, avatar: '👩‍🚀', rank: 4, xp: 8000, level: 18 },
  { id: '5', name: 'Uzaylı Can', stars: 1400, avatar: '👽', rank: 5, xp: 7000, level: 16 },
  { id: '6', name: 'Test Öğrenci', stars: 1250, avatar: '🦸‍♂️', rank: 6, xp: 5600, level: 12 },
  { id: '7', name: 'Süper Zeynep', stars: 1100, avatar: '🧙‍♀️', rank: 7, xp: 5500, level: 11 },
  { id: '8', name: 'Hızlı Ali', stars: 950, avatar: '⚡', rank: 8, xp: 4750, level: 10 },
  { id: '9', name: 'Akıllı Ayşe', stars: 800, avatar: '🧠', rank: 9, xp: 4000, level: 9 },
  { id: '10', name: 'Cesur Ahmet', stars: 650, avatar: '🦁', rank: 10, xp: 3250, level: 8 },
];

export const mockDashboardStats = {
  student: {
    totalGamesPlayed: 145,
    totalTimeSpent: 2850, // minutes
    averageScore: 87,
    currentStreak: 7,
    longestStreak: 12,
    badges: [
      {
        id: '1',
        name: 'İlk Adım',
        icon: '🎯',
        description: 'İlk oyununu tamamladın',
        earnedAt: '2026-03-01',
      },
      {
        id: '2',
        name: 'Hızlı Öğrenen',
        icon: '⚡',
        description: '10 oyunu 24 saat içinde tamamladın',
        earnedAt: '2026-03-05',
      },
      {
        id: '3',
        name: 'Matematik Ustası',
        icon: '🔢',
        description: '50 matematik oyunu tamamladın',
        earnedAt: '2026-03-10',
      },
    ],
    recentGames: [
      { id: 'math-3', name: 'Hızlı Matematik', score: 95, playedAt: '2026-03-14T10:30:00Z' },
      { id: 'logic-1', name: 'Sudoku', score: 88, playedAt: '2026-03-14T09:15:00Z' },
      { id: 'math-1', name: 'Meyve Toplama', score: 92, playedAt: '2026-03-13T16:45:00Z' },
    ],
  },
  teacher: {
    totalStudents: 28,
    totalClasses: 2,
    averageClassPerformance: 82,
    activeAssignments: 5,
    pendingGrading: 12,
  },
};

export const mockNotifications = [
  {
    id: '1',
    type: 'ACHIEVEMENT',
    title: 'Yeni Rozet Kazandın!',
    message: 'Matematik Ustası rozetini kazandın',
    isRead: false,
    createdAt: '2026-03-14T10:00:00Z',
  },
  {
    id: '2',
    type: 'ASSIGNMENT',
    title: 'Yeni Ödev',
    message: 'Matematik öğretmeni yeni ödev verdi',
    isRead: false,
    createdAt: '2026-03-14T08:30:00Z',
  },
  {
    id: '3',
    type: 'LEADERBOARD',
    title: 'Sıralama Değişti',
    message: 'Liderlik tablosunda 6. sıraya yükseldin!',
    isRead: true,
    createdAt: '2026-03-13T18:00:00Z',
  },
];

// Mock API delay simulation
export const mockDelay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API Wrapper
export const mockData = {
  // Auth API
  auth: {
    login: async (email: string, password: string) => {
      await mockDelay();
      const user = mockUsers.find((u) => u.email === email);
      if (!user) {
        throw new Error('Kullanıcı bulunamadı');
      }
      return {
        success: true,
        data: {
          user,
          token: 'mock-jwt-token-' + user.id,
          refreshToken: 'mock-refresh-token-' + user.id,
        },
      };
    },

    register: async (data: any) => {
      await mockDelay();
      const newUser = {
        id: String(mockUsers.length + 1),
        ...data,
        stars: 0,
        xp: 0,
        level: 1,
        avatar: '👤',
        solvedProblems: 0,
        streakDays: 0,
      };
      mockUsers.push(newUser);
      return {
        success: true,
        data: {
          user: newUser,
          token: 'mock-jwt-token-' + newUser.id,
          refreshToken: 'mock-refresh-token-' + newUser.id,
        },
      };
    },

    me: async () => {
      await mockDelay();
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token bulunamadı');
      }
      // Token'dan user id'yi çıkar
      const userId = token.replace('mock-jwt-token-', '');
      const user = mockUsers.find((u) => u.id === userId) || mockUsers[0];
      return {
        success: true,
        data: user,
      };
    },
  },

  // Games API
  games: {
    categories: async () => {
      await mockDelay();
      return {
        success: true,
        data: mockCategories,
      };
    },

    list: async (categoryId?: string, gradeLevel?: number) => {
      await mockDelay();
      let filtered = [...mockGames];

      if (categoryId) {
        filtered = filtered.filter((g) => g.categoryId === categoryId);
      }

      if (gradeLevel) {
        filtered = filtered.filter((g) => g.gradeMin <= gradeLevel && g.gradeMax >= gradeLevel);
      }

      return {
        success: true,
        data: filtered,
      };
    },

    detail: async (gameId: string) => {
      await mockDelay();
      const game = mockGames.find((g) => g.id === gameId);
      if (!game) {
        throw new Error('Oyun bulunamadı');
      }
      return {
        success: true,
        data: game,
      };
    },

    saveScore: async (gameId: string, scoreData: any) => {
      await mockDelay();
      console.log('Mock: Score saved', { gameId, scoreData });
      return {
        success: true,
        data: {
          id: 'score-' + Date.now(),
          ...scoreData,
          rewards: {
            stars: scoreData.score / 10,
            xp: scoreData.score * 2,
            levelUp: false,
          },
        },
      };
    },
  },

  // User API
  user: {
    profile: async () => {
      await mockDelay();
      return {
        success: true,
        data: mockUsers[0],
      };
    },

    updateProfile: async (data: any) => {
      await mockDelay();
      Object.assign(mockUsers[0], data);
      return {
        success: true,
        data: mockUsers[0],
      };
    },

    dashboard: async () => {
      await mockDelay();
      return {
        success: true,
        data: mockDashboardStats.student,
      };
    },

    stats: async (userId: string) => {
      await mockDelay();
      return {
        success: true,
        data: {
          totalGames: 145,
          totalScore: 12650,
          averageScore: 87,
          totalTime: 2850,
          favoriteCategory: 'Matematik',
        },
      };
    },
  },

  // Leaderboard API
  leaderboard: {
    global: async (period: string = 'weekly') => {
      await mockDelay();
      return {
        success: true,
        data: mockLeaderboard,
      };
    },

    byGame: async (gameId: string) => {
      await mockDelay();
      return {
        success: true,
        data: mockLeaderboard.slice(0, 5),
      };
    },
  },

  // Notifications API
  notifications: {
    list: async () => {
      await mockDelay();
      return {
        success: true,
        data: mockNotifications,
      };
    },
  },
};
