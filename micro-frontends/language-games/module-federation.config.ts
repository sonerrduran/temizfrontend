export default {
  name: 'languageGames',
  filename: 'remoteEntry.js',
  exposes: {
    './LanguageGamesRouter': './src/LanguageGamesRouter.tsx',
    './TurkishGrade1': './src/games/turkish/grade1/index.ts',
    './TurkishGrade2': './src/games/turkish/grade2/index.ts',
    './TurkishGrade3': './src/games/turkish/grade3/index.ts',
    './TurkishGrade4': './src/games/turkish/grade4/index.ts',
    './TurkishGrade5': './src/games/turkish/grade5/index.ts',
    './TurkishGrade6': './src/games/turkish/grade6/index.ts',
    './TurkishGrade7': './src/games/turkish/grade7/index.ts',
    './TurkishGrade8': './src/games/turkish/grade8/index.ts',
    './EnglishGrade1': './src/games/english/grade1/index.ts',
    './EnglishGrade2': './src/games/english/grade2/index.ts',
    './EnglishGrade3': './src/games/english/grade3/index.ts',
    './EnglishGrade4': './src/games/english/grade4/index.ts',
    './EnglishGrade5': './src/games/english/grade5/index.ts',
    './EnglishGrade6': './src/games/english/grade6/index.ts',
    './EnglishGrade7': './src/games/english/grade7/index.ts',
    './EnglishGrade8': './src/games/english/grade8/index.ts',
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
