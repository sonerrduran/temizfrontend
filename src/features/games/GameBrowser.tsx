import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/stores/gameStore';
import GameCard from './GameCard';
import GameCategories from './GameCategories';

export default function GameBrowser() {
  const navigate = useNavigate();

  // Use game store
  const {
    games,
    loadGames,
    selectedCategory,
    searchQuery,
    selectedGrade,
    setCategory,
    setSearchQuery,
    setGrade,
  } = useGameStore();

  useEffect(() => {
    // Load games on mount
    loadGames();
  }, [loadGames]);

  // Filter games based on store state
  const filteredGames = useMemo(() => {
    let filtered = games;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((game) => game.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (game) =>
          game.name.toLowerCase().includes(query) ||
          game.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Grade filter
    if (selectedGrade !== null) {
      filtered = filtered.filter(
        (game) => game.gradeMin <= selectedGrade && game.gradeMax >= selectedGrade
      );
    }

    return filtered;
  }, [games, selectedCategory, searchQuery, selectedGrade]);

  const handlePlayGame = (gameId: string) => {
    navigate(`/play-new/${gameId}`);
  };

  const categories = [
    { id: 'all', name: 'Tümü', icon: '🎮', count: games.length },
    {
      id: 'math',
      name: 'Matematik',
      icon: '🔢',
      count: games.filter((g) => g.category === 'math').length,
    },
    {
      id: 'logic',
      name: 'Mantık',
      icon: '🧩',
      count: games.filter((g) => g.category === 'logic').length,
    },
    {
      id: 'language',
      name: 'Dil',
      icon: '📚',
      count: games.filter((g) => g.category === 'language').length,
    },
    {
      id: 'reading',
      name: 'Okuma',
      icon: '📖',
      count: games.filter((g) => g.category === 'reading').length,
    },
    {
      id: 'focus',
      name: 'Odaklanma',
      icon: '🎯',
      count: games.filter((g) => g.category === 'focus').length,
    },
    {
      id: 'learning',
      name: 'Öğrenme',
      icon: '🧠',
      count: games.filter((g) => g.category === 'learning').length,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">🎮 Oyun Galaksisi</h1>
          <p className="text-white/60 text-lg">{filteredGames.length} oyun keşfet ve oyna!</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Oyun ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl text-white placeholder-white/40 border border-white/20 focus:border-purple-500 focus:outline-none text-lg"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">🔍</div>
          </div>

          {/* Grade Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setGrade(null)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedGrade === null
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              Tüm Seviyeler
            </button>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((grade) => (
              <button
                key={grade}
                onClick={() => setGrade(grade)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedGrade === grade
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {grade === 0 ? 'Okul Öncesi' : `${grade}. Sınıf`}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <GameCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setCategory}
        />

        {/* Games Grid */}
        <div className="mt-8">
          {filteredGames.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-white/60 text-xl">Oyun bulunamadı</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">{filteredGames.length} Oyun</h2>
                <div className="text-white/40 text-sm">
                  {selectedCategory !== 'all' &&
                    categories.find((c) => c.id === selectedCategory)?.name}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} onPlay={() => handlePlayGame(game.id)} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
