import { useQuery } from '@tantml:useQuery';
import { gameService } from '@/services/api/game.service';

/**
 * Fetch user profile stats
 */
export function useProfileStats(userId?: string) {
  return useQuery({
    queryKey: ['profile', 'stats', userId],
    queryFn: async () => {
      const history = await gameService.getGameHistory(userId);

      // Calculate stats
      const totalScore = history.reduce((sum: number, game: any) => sum + game.score, 0);
      const gamesPlayed = history.length;
      const averageScore = gamesPlayed > 0 ? Math.round(totalScore / gamesPlayed) : 0;
      const bestScore = Math.max(...history.map((g: any) => g.score), 0);
      const level = Math.floor(totalScore / 1000) + 1;

      return {
        totalScore,
        gamesPlayed,
        averageScore,
        bestScore,
        level,
      };
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
