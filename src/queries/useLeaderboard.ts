import { useQuery } from '@tanstack/react-query';
import { gameService } from '@/services/api/game.service';

/**
 * Fetch leaderboard with auto-refresh
 */
export function useLeaderboard(gameId?: string, period: 'daily' | 'weekly' | 'all' = 'all') {
  return useQuery({
    queryKey: ['leaderboard', gameId, period],
    queryFn: () => gameService.getLeaderboard(gameId, period),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Auto-refresh every minute
  });
}

/**
 * Fetch user rank
 */
export function useUserRank(userId: string, gameId?: string) {
  return useQuery({
    queryKey: ['userRank', userId, gameId],
    queryFn: async () => {
      const leaderboard = await gameService.getLeaderboard(gameId);
      const userEntry = leaderboard.find((entry: any) => entry.userId === userId);
      return userEntry || null;
    },
    enabled: !!userId,
    staleTime: 30 * 1000,
  });
}
