export default {
  name: 'logicGames',
  filename: 'remoteEntry.js',
  exposes: {
    './LogicGamesRouter': './src/LogicGamesRouter.tsx',
    './Sudoku': './src/games/sudoku/index.ts',
    './Puzzle': './src/games/puzzle/index.ts',
    './Memory': './src/games/memory/index.ts',
    './TwoPlayer': './src/games/two-player/index.ts',
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: '^18.2.0',
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '^18.2.0',
    },
    'react-router-dom': {
      singleton: true,
      requiredVersion: '^6.20.0',
    },
    '@egitim-galaksisi/game-engine': {
      singleton: true,
    },
    '@egitim-galaksisi/ui': {
      singleton: true,
    },
  },
};
