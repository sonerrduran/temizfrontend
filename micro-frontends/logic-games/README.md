# Logic Games Micro Frontend

This micro frontend contains all logic-based games including Sudoku, Puzzles, Memory games, and Two-player games.

## Structure

```
src/
├── games/
│   ├── sudoku/       # Sudoku games (easy, medium, hard)
│   ├── puzzle/       # Jigsaw and sliding puzzles
│   ├── memory/       # Card and pattern memory games
│   └── two-player/   # TicTacToe, Connect4, etc.
├── components/       # Shared logic game components
├── hooks/            # Custom hooks for logic games
└── types/            # TypeScript types
```

## Development

```bash
# Install dependencies
npm install

# Start dev server (port 5002)
npm run dev

# Build for production
npm run build
```

## Package Name

`@egitim-galaksisi/logic-games`
