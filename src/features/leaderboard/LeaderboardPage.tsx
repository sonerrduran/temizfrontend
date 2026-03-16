import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gameService } from '@/shared/services/api/gameService';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  avatar?: string;
  totalScore: number;
  gamesPlayed: number;
}

export default function LeaderboardPage() {
  const { gameId } = useParams();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, [gameId, period]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await gameService.getLeaderboard(gameId, period);
      setLeaderboard(data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-orange-500';
    if (rank === 2) return 'from-gray-300 to-gray-400';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-purple-500 to-pink-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-white mb-4">🏆 Lider Tablosu</h1>
          <p className="text-white/60 text-lg">En iyi oyuncular</p>
        </div>

        {/* Period Filter */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setPeriod('daily')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              period === 'daily'
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            Günlük
          </button>
          <button
            onClick={() => setPeriod('weekly')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              period === 'weekly'
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            Haftalık
          </button>
          <button
            onClick={() => setPeriod('all')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              period === 'all'
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            Tüm Zamanlar
          </button>
        </div>

        {/* Leaderboard */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          {leaderboard.length === 0 ? (
            <div className="text-center py-12 text-white/60">Henüz sıralama yok</div>
          ) : (
            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <div
                  key={entry.userId}
                  className={`bg-gradient-to-r ${getRankColor(entry.rank)} p-1 rounded-2xl`}
                >
                  <div className="bg-slate-900/90 rounded-2xl p-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      {/* Rank */}
                      <div className="text-4xl font-black w-16 text-center">
                        {getRankEmoji(entry.rank)}
                      </div>

                      {/* Avatar */}
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                        {entry.avatar || '👤'}
                      </div>

                      {/* Name */}
                      <div>
                        <div className="text-white font-bold text-xl">{entry.userName}</div>
                        <div className="text-white/60 text-sm">{entry.gamesPlayed} oyun</div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className="text-3xl font-black text-white">
                        {entry.totalScore.toLocaleString()}
                      </div>
                      <div className="text-white/60 text-sm">puan</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
