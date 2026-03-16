/**
 * @egitim-galaksisi/mock-data
 * Mock data paketi - API contracts, mock data ve services
 */

// Contracts
export * from './contracts/game';
export * from './contracts/user';
export * from './contracts/lesson';
export * from './contracts/leaderboard';

// Data (raw data arrays)
export { mockGames, mockGameCategories } from './data/games';
export { mockUsers, mockStudents, mockTeachers, mockParents, mockAdmins, mockPasswords } from './data/users';
export { mockLeaderboardEntries, mockAchievements, mockBadges, mockStreaks } from './data/leaderboard';

// Generators
export * from './generators/userGenerator';
export * from './generators/gameGenerator';

// Services (these include the async helper functions)
export * from './services/mockGameService';
export * from './services/mockUserService';
