/**
 * Mock Leaderboard Data
 * Liderlik tablosu için mock data
 */

import type { LeaderboardEntry, Achievement, Badge, Streak } from '../contracts/leaderboard';

export const mockLeaderboardEntries: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: 'student-2',
    username: 'ayse_demir',
    fullName: 'Ayşe Demir',
    avatar: '/avatars/student-2.png',
    score: 18950,
    level: 15,
    gamesPlayed: 203,
    accuracy: 94.5,
    stars: 287,
    achievements: 4,
    streak: 12,
    schoolId: 'school-1',
    schoolName: 'Atatürk İlkokulu',
    classroomId: 'classroom-2',
    classroomName: '4-A',
    gradeLevel: 4,
    lastPlayedAt: new Date('2024-03-15'),
  },
  {
    rank: 2,
    userId: 'student-1',
    username: 'ahmet_yilmaz',
    fullName: 'Ahmet Yılmaz',
    avatar: '/avatars/student-1.png',
    score: 15420,
    level: 12,
    gamesPlayed: 156,
    accuracy: 89.2,
    stars: 234,
    achievements: 3,
    streak: 8,
    schoolId: 'school-1',
    schoolName: 'Atatürk İlkokulu',
    classroomId: 'classroom-1',
    classroomName: '3-B',
    gradeLevel: 3,
    lastPlayedAt: new Date('2024-03-15'),
  },
  {
    rank: 3,
    userId: 'student-4',
    username: 'zeynep_arslan',
    fullName: 'Zeynep Arslan',
    avatar: '/avatars/student-4.png',
    score: 14230,
    level: 11,
    gamesPlayed: 178,
    accuracy: 91.8,
    stars: 215,
    achievements: 3,
    streak: 5,
    schoolId: 'school-1',
    schoolName: 'Atatürk İlkokulu',
    classroomId: 'classroom-2',
    classroomName: '4-A',
    gradeLevel: 4,
    lastPlayedAt: new Date('2024-03-14'),
  },
  {
    rank: 4,
    userId: 'student-5',
    username: 'can_ozdemir',
    fullName: 'Can Özdemir',
    avatar: '/avatars/student-5.png',
    score: 12890,
    level: 10,
    gamesPlayed: 145,
    accuracy: 87.3,
    stars: 198,
    achievements: 2,
    streak: 7,
    schoolId: 'school-2',
    schoolName: 'Cumhuriyet İlkokulu',
    classroomId: 'classroom-4',
    classroomName: '3-A',
    gradeLevel: 3,
    lastPlayedAt: new Date('2024-03-15'),
  },
  {
    rank: 5,
    userId: 'student-6',
    username: 'elif_yildirim',
    fullName: 'Elif Yıldırım',
    avatar: '/avatars/student-6.png',
    score: 11560,
    level: 9,
    gamesPlayed: 132,
    accuracy: 92.1,
    stars: 176,
    achievements: 2,
    streak: 4,
    schoolId: 'school-1',
    schoolName: 'Atatürk İlkokulu',
    classroomId: 'classroom-1',
    classroomName: '3-B',
    gradeLevel: 3,
    lastPlayedAt: new Date('2024-03-14'),
  },
  {
    rank: 6,
    userId: 'student-3',
    username: 'mehmet_kaya',
    fullName: 'Mehmet Kaya',
    avatar: '/avatars/student-3.png',
    score: 9870,
    level: 8,
    gamesPlayed: 98,
    accuracy: 85.6,
    stars: 145,
    achievements: 2,
    streak: 3,
    schoolId: 'school-1',
    schoolName: 'Atatürk İlkokulu',
    classroomId: 'classroom-3',
    classroomName: '2-C',
    gradeLevel: 2,
    lastPlayedAt: new Date('2024-03-14'),
  },
  {
    rank: 7,
    userId: 'student-7',
    username: 'burak_cetin',
    fullName: 'Burak Çetin',
    avatar: '/avatars/student-7.png',
    score: 9340,
    level: 8,
    gamesPlayed: 112,
    accuracy: 88.4,
    stars: 142,
    achievements: 1,
    streak: 6,
    schoolId: 'school-2',
    schoolName: 'Cumhuriyet İlkokulu',
    classroomId: 'classroom-5',
    classroomName: '4-B',
    gradeLevel: 4,
    lastPlayedAt: new Date('2024-03-13'),
  },
  {
    rank: 8,
    userId: 'student-8',
    username: 'selin_koc',
    fullName: 'Selin Koç',
    avatar: '/avatars/student-8.png',
    score: 8920,
    level: 7,
    gamesPlayed: 95,
    accuracy: 90.2,
    stars: 135,
    achievements: 1,
    streak: 2,
    schoolId: 'school-1',
    schoolName: 'Atatürk İlkokulu',
    classroomId: 'classroom-2',
    classroomName: '4-A',
    gradeLevel: 4,
    lastPlayedAt: new Date('2024-03-15'),
  },
  {
    rank: 9,
    userId: 'student-9',
    username: 'emre_sahin',
    fullName: 'Emre Şahin',
    avatar: '/avatars/student-9.png',
    score: 8450,
    level: 7,
    gamesPlayed: 89,
    accuracy: 86.7,
    stars: 128,
    achievements: 1,
    streak: 5,
    schoolId: 'school-2',
    schoolName: 'Cumhuriyet İlkokulu',
    classroomId: 'classroom-4',
    classroomName: '3-A',
    gradeLevel: 3,
    lastPlayedAt: new Date('2024-03-14'),
  },
  {
    rank: 10,
    userId: 'student-10',
    username: 'deniz_acar',
    fullName: 'Deniz Acar',
    avatar: '/avatars/student-10.png',
    score: 7890,
    level: 6,
    gamesPlayed: 76,
    accuracy: 89.5,
    stars: 119,
    achievements: 1,
    streak: 1,
    schoolId: 'school-1',
    schoolName: 'Atatürk İlkokulu',
    classroomId: 'classroom-3',
    classroomName: '2-C',
    gradeLevel: 2,
    lastPlayedAt: new Date('2024-03-13'),
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: 'first-game',
    name: 'İlk Oyun',
    description: 'İlk oyununu tamamla',
    icon: '🎮',
    category: 'başlangıç',
    rarity: 'common',
    points: 10,
    condition: {
      type: 'games-played',
      value: 1,
      operator: 'gte',
    },
    unlockedBy: 1250,
  },
  {
    id: 'math-master',
    name: 'Matematik Ustası',
    description: '50 matematik oyunu tamamla',
    icon: '🔢',
    category: 'matematik',
    rarity: 'rare',
    points: 50,
    condition: {
      type: 'games-played',
      value: 50,
      operator: 'gte',
      categoryId: 'cat-math',
    },
    unlockedBy: 342,
  },
  {
    id: 'language-expert',
    name: 'Dil Uzmanı',
    description: '30 dil oyunu tamamla',
    icon: '📚',
    category: 'dil',
    rarity: 'rare',
    points: 50,
    condition: {
      type: 'games-played',
      value: 30,
      operator: 'gte',
      categoryId: 'cat-language',
    },
    unlockedBy: 287,
  },
  {
    id: 'perfect-score',
    name: 'Mükemmel Skor',
    description: 'Bir oyunda mükemmel skor al',
    icon: '⭐',
    category: 'başarı',
    rarity: 'epic',
    points: 100,
    condition: {
      type: 'perfect-games',
      value: 1,
      operator: 'gte',
    },
    unlockedBy: 156,
  },
  {
    id: 'speed-reader',
    name: 'Hızlı Okuyucu',
    description: 'Hızlı okuma oyunlarında 90% doğruluk',
    icon: '⚡',
    category: 'hız',
    rarity: 'epic',
    points: 100,
    condition: {
      type: 'accuracy',
      value: 90,
      operator: 'gte',
      categoryId: 'cat-speed',
    },
    unlockedBy: 98,
  },
  {
    id: 'memory-champion',
    name: 'Hafıza Şampiyonu',
    description: 'Tüm hafıza oyunlarını tamamla',
    icon: '🧠',
    category: 'hafıza',
    rarity: 'legendary',
    points: 200,
    condition: {
      type: 'games-played',
      value: 20,
      operator: 'gte',
      categoryId: 'cat-memory',
    },
    unlockedBy: 45,
  },
  {
    id: 'streak-master',
    name: 'Seri Ustası',
    description: '10 gün üst üste oyna',
    icon: '🔥',
    category: 'süreklilik',
    rarity: 'epic',
    points: 150,
    condition: {
      type: 'streak',
      value: 10,
      operator: 'gte',
    },
    unlockedBy: 67,
  },
  {
    id: 'high-scorer',
    name: 'Yüksek Skor',
    description: '10,000 puan topla',
    icon: '💯',
    category: 'skor',
    rarity: 'rare',
    points: 75,
    condition: {
      type: 'score',
      value: 10000,
      operator: 'gte',
    },
    unlockedBy: 234,
  },
];

export const mockBadges: Badge[] = [
  {
    id: 'bronze-badge',
    name: 'Bronz Rozet',
    description: '100 puan topla',
    icon: '🥉',
    color: '#CD7F32',
    level: 1,
    requirement: '100 puan',
  },
  {
    id: 'silver-badge',
    name: 'Gümüş Rozet',
    description: '1,000 puan topla',
    icon: '🥈',
    color: '#C0C0C0',
    level: 2,
    requirement: '1,000 puan',
  },
  {
    id: 'gold-badge',
    name: 'Altın Rozet',
    description: '5,000 puan topla',
    icon: '🥇',
    color: '#FFD700',
    level: 3,
    requirement: '5,000 puan',
  },
  {
    id: 'platinum-badge',
    name: 'Platin Rozet',
    description: '10,000 puan topla',
    icon: '💎',
    color: '#E5E4E2',
    level: 4,
    requirement: '10,000 puan',
  },
];

export const mockStreaks: Streak[] = [
  {
    userId: 'student-2',
    currentStreak: 12,
    longestStreak: 15,
    lastPlayedDate: new Date('2024-03-15'),
    streakStartDate: new Date('2024-03-04'),
  },
  {
    userId: 'student-1',
    currentStreak: 8,
    longestStreak: 10,
    lastPlayedDate: new Date('2024-03-15'),
    streakStartDate: new Date('2024-03-08'),
  },
  {
    userId: 'student-4',
    currentStreak: 5,
    longestStreak: 8,
    lastPlayedDate: new Date('2024-03-14'),
    streakStartDate: new Date('2024-03-10'),
  },
];

/**
 * Scope'a göre leaderboard filtreler
 */
export function getLeaderboardByScope(
  scope: 'global' | 'school' | 'classroom',
  scopeId?: string
): LeaderboardEntry[] {
  if (scope === 'global') {
    return mockLeaderboardEntries;
  }

  if (scope === 'school' && scopeId) {
    return mockLeaderboardEntries.filter((entry) => entry.schoolId === scopeId);
  }

  if (scope === 'classroom' && scopeId) {
    return mockLeaderboardEntries.filter((entry) => entry.classroomId === scopeId);
  }

  return mockLeaderboardEntries;
}

/**
 * Sınıf seviyesine göre leaderboard filtreler
 */
export function getLeaderboardByGrade(gradeLevel: number): LeaderboardEntry[] {
  return mockLeaderboardEntries.filter((entry) => entry.gradeLevel === gradeLevel);
}

/**
 * Top N kullanıcıyı döndürür
 */
export function getTopPlayers(limit: number = 10): LeaderboardEntry[] {
  return mockLeaderboardEntries.slice(0, limit);
}

/**
 * Kullanıcının sıralamasını bulur
 */
export function getUserRank(userId: string): LeaderboardEntry | undefined {
  return mockLeaderboardEntries.find((entry) => entry.userId === userId);
}

/**
 * Kullanıcının başarılarını döndürür
 */
export function getUserAchievements(userId: string): Achievement[] {
  const user = mockLeaderboardEntries.find((entry) => entry.userId === userId);
  if (!user) return [];

  // İlk N başarıyı döndür (gerçek uygulamada user.achievements ile eşleştirilecek)
  return mockAchievements.slice(0, user.achievements);
}

/**
 * Kullanıcının streak bilgisini döndürür
 */
export function getUserStreak(userId: string): Streak | undefined {
  return mockStreaks.find((streak) => streak.userId === userId);
}
