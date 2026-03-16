import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gameService } from '@/shared/services/api/gameService';

interface UserStats {
  totalScore: number;
  gamesPlayed: number;
  averageScore: number;
  bestScore: number;
  level: number;
  badges: string[];
}

export default function ProfilePage() {
  const { userId } = useParams();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [recentGames, setRecentGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const history = await gameService.getGameHistory(userId);

      // Calculate stats
      const totalScore = history.reduce((sum, game) => sum + game.score, 0);
      const gamesPlayed = history.length;
      const averageScore = gamesPlayed > 0 ? Math.round(totalScore / gamesPlayed) : 0;
      const bestScore = Math.max(...history.map((g) => g.score), 0);
      const level = Math.floor(totalScore / 1000) + 1;

      setStats({
        totalScore,
        gamesPlayed,
        averageScore,
        bestScore,
        level,
        badges: [],
      });

      setRecentGames(history.slice(0, 10));
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-white/20">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl">
              👤
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-black text-white mb-2">Profilim</h1>
              <div className="flex gap-4 text-white/60">
                <span>Seviye {stats?.level}</span>
                <span>•</span>
                <span>{stats?.gamesPlayed} Oyun</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="text-white/60 text-sm mb-2">Toplam Puan</div>
            <div className="text-3xl font-black text-white">
              {stats?.totalScore.toLocaleString()}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="text-white/60 text-sm mb-2">Oynanan Oyun</div>
            <div className="text-3xl font-black text-white">{stats?.gamesPlayed}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="text-white/60 text-sm mb-2">Ortalama Puan</div>
            <div className="text-3xl font-black text-white">{stats?.averageScore}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="text-white/60 text-sm mb-2">En Yüksek Puan</div>
            <div className="text-3xl font-black text-white">{stats?.bestScore}</div>
          </div>
        </div>

        {/* Recent Games */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          <h2 className="text-2xl font-black text-white mb-6">Son Oyunlar</h2>
          <div className="space-y-4">
            {recentGames.length === 0 ? (
              <div className="text-center py-12 text-white/60">Henüz oyun oynamadınız</div>
            ) : (
              recentGames.map((game, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">🎮</div>
                    <div>
                      <div className="text-white font-bold">{game.game?.name || 'Oyun'}</div>
                      <div className="text-white/60 text-sm">
                        {new Date(game.completedAt).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-yellow-400">{game.score}</div>
                    <div className="text-white/60 text-sm">
                      {game.correctAnswers}/{game.totalQuestions} doğru
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
