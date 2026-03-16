export default {
  name: 'mathGames',
  filename: 'remoteEntry.js',
  exposes: {
    './MathGamesRouter': './src/MathGamesRouter.tsx',
    './Grade1Games': './src/games/grade1/index.ts',
    './Grade2Games': './src/games/grade2/index.ts',
    './Grade3Games': './src/games/grade3/index.ts',
    './Grade4Games': './src/games/grade4/index.ts',
    './Grade5Games': './src/games/grade5/index.ts',
    './Grade6Games': './src/games/grade6/index.ts',
    './Grade7Games': './src/games/grade7/index.ts',
    './Grade8Games': './src/games/grade8/index.ts',
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
