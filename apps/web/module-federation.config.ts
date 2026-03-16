export default {
  name: 'host',
  remotes: {
    mathGames: {
      external: 'http://localhost:5001/assets/remoteEntry.js',
      from: 'vite',
      format: 'esm',
    },
    logicGames: {
      external: 'http://localhost:5002/assets/remoteEntry.js',
      from: 'vite',
      format: 'esm',
    },
    languageGames: {
      external: 'http://localhost:5003/assets/remoteEntry.js',
      from: 'vite',
      format: 'esm',
    },
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
