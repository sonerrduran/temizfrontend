import React from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface GameCategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function GameCategories({
  categories,
  selectedCategory,
  onSelectCategory,
}: GameCategoriesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`relative p-6 rounded-2xl transition-all transform hover:scale-105 ${
            selectedCategory === category.id
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl shadow-purple-500/50'
              : 'bg-white/10 backdrop-blur-md hover:bg-white/20'
          }`}
        >
          {/* Icon */}
          <div className="text-4xl mb-2">{category.icon}</div>

          {/* Name */}
          <div className="text-white font-bold mb-1">{category.name}</div>

          {/* Count */}
          <div
            className={`text-sm ${
              selectedCategory === category.id ? 'text-white/80' : 'text-white/40'
            }`}
          >
            {category.count} oyun
          </div>

          {/* Selected Indicator */}
          {selectedCategory === category.id && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-purple-500 text-sm">✓</span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
