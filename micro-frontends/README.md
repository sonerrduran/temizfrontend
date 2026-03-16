# Micro Frontends

This directory contains the micro frontend applications for the Eğitim Galaksisi project. Each micro frontend is a standalone application that can be developed, built, and deployed independently.

## Structure

```
micro-frontends/
├── math-games/          # Mathematics games (grades 1-8)
├── logic-games/         # Logic games (Sudoku, Puzzle, Memory, Two-player)
└── language-games/      # Language games (Turkish & English, grades 1-8)
```

## Micro Frontends

### 1. Math Games (`@egitim-galaksisi/math-games`)
- **Port**: 5001
- **Content**: Mathematics games organized by grade level (1-8)
- **Topics**: Addition, subtraction, multiplication, division, fractions, geometry, etc.

### 2. Logic Games (`@egitim-galaksisi/logic-games`)
- **Port**: 5002
- **Content**: Logic-based games
- **Categories**: 
  - Sudoku (easy, medium, hard)
  - Puzzles (jigsaw, sliding)
  - Memory games (card, pattern)
  - Two-player games (TicTacToe, Connect4)

### 3. Language Games (`@egitim-galaksisi/language-games`)
- **Port**: 5003
- **Content**: Language learning games for Turkish and English
- **Structure**:
  - Turkish: grades 1-8 (letters, syllables, words, reading, writing, grammar, vocabulary)
  - English: grades 1-8 (vocabulary, grammar, reading, writing)

## Development

Each micro frontend can be developed independently:

```bash
# Navigate to a micro frontend
cd micro-frontends/math-games

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Shared Dependencies

All micro frontends share the following workspace packages:
- `@egitim-galaksisi/game-engine` - Common game engine
- `@egitim-galaksisi/ui` - Shared UI components
- `@egitim-galaksisi/shared` - Shared utilities and hooks

## Module Federation

Each micro frontend will be configured with Vite Module Federation to enable:
- Independent deployment
- Runtime loading by the host application
- Shared dependencies (React, React Router, game-engine, ui)
- Singleton pattern for shared libraries

## Next Steps

1. Configure Module Federation for each micro frontend (Task 1.4)
2. Migrate existing game components to appropriate micro frontends (Phase 3)
3. Set up CI/CD pipelines for independent deployment (Phase 4)
