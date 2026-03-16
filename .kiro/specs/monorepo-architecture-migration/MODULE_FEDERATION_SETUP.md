# Module Federation Setup

## Overview

This document describes the Module Federation configuration for the Eğitim Galaksisi monorepo. Module Federation allows micro frontends to be developed, built, and deployed independently while being dynamically loaded by the host application at runtime.

## Architecture

### Host Application
- **Name**: `host`
- **Location**: `apps/web`
- **Port**: 5173
- **Role**: Loads and orchestrates all micro frontends

### Remote Applications (Micro Frontends)

#### 1. Math Games
- **Name**: `mathGames`
- **Location**: `micro-frontends/math-games`
- **Port**: 5001
- **Remote Entry**: `http://localhost:5001/assets/remoteEntry.js`
- **Exposed Modules**:
  - `./MathGamesRouter` - Main router component
  - `./Grade1Games` through `./Grade8Games` - Grade-specific game exports

#### 2. Logic Games
- **Name**: `logicGames`
- **Location**: `micro-frontends/logic-games`
- **Port**: 5002
- **Remote Entry**: `http://localhost:5002/assets/remoteEntry.js`
- **Exposed Modules**:
  - `./LogicGamesRouter` - Main router component
  - `./Sudoku` - Sudoku games
  - `./Puzzle` - Puzzle games
  - `./Memory` - Memory games
  - `./TwoPlayer` - Two-player games

#### 3. Language Games
- **Name**: `languageGames`
- **Location**: `micro-frontends/language-games`
- **Port**: 5003
- **Remote Entry**: `http://localhost:5003/assets/remoteEntry.js`
- **Exposed Modules**:
  - `./LanguageGamesRouter` - Main router component
  - `./TurkishGrade1` through `./TurkishGrade8` - Turkish games by grade
  - `./EnglishGrade1` through `./EnglishGrade8` - English games by grade

## Shared Dependencies

All micro frontends and the host application share the following dependencies using the **singleton pattern**:

- `react` (^18.2.0)
- `react-dom` (^18.2.0)
- `react-router-dom` (^6.20.0)
- `@egitim-galaksisi/game-engine`
- `@egitim-galaksisi/ui`

The singleton pattern ensures that only one instance of each shared dependency is loaded, preventing version conflicts and reducing bundle size.

## Configuration Files

### Micro Frontend Configuration

Each micro frontend has two configuration files:

1. **module-federation.config.ts** - Defines exposed modules and shared dependencies
2. **vite.config.ts** - Integrates the Module Federation plugin

Example structure:
```typescript
// module-federation.config.ts
export default {
  name: 'mathGames',
  filename: 'remoteEntry.js',
  exposes: {
    './MathGamesRouter': './src/MathGamesRouter.tsx',
    // ... other exposed modules
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0' },
    // ... other shared dependencies
  },
};
```

### Host Configuration

The host application (`apps/web`) has:

1. **module-federation.config.ts** - Defines remote applications
2. **vite.config.ts** - Integrates the Module Federation plugin
3. **src/types/module-federation.d.ts** - TypeScript declarations for remote modules

## Development Workflow

### Starting All Services

To run all micro frontends and the host application:

```bash
# Start all services in parallel
npm run dev

# Or start individually
npm run dev:web        # Host app (port 5173)
npm run dev:math       # Math games (port 5001)
npm run dev:logic      # Logic games (port 5002)
npm run dev:language   # Language games (port 5003)
```

### Development Mode

In development mode:
- Each micro frontend runs on its own port
- The host application loads micro frontends from `http://localhost:PORT/assets/remoteEntry.js`
- Hot Module Replacement (HMR) works for each micro frontend independently
- Changes in shared packages are reflected across all applications

### Building for Production

```bash
# Build all micro frontends
npm run build:micro-frontends

# Build host application
npm run build:web

# Or build everything
npm run build
```

## Production Deployment

### Micro Frontend Deployment

Each micro frontend should be deployed to a CDN:

1. **Math Games**: `https://cdn.egitimgalaksisi.com/math-games/`
2. **Logic Games**: `https://cdn.egitimgalaksisi.com/logic-games/`
3. **Language Games**: `https://cdn.egitimgalaksisi.com/language-games/`

### Host Application Configuration

Update `apps/web/module-federation.config.ts` for production:

```typescript
export default {
  name: 'host',
  remotes: {
    mathGames: {
      external: process.env.VITE_MATH_GAMES_URL || 'https://cdn.egitimgalaksisi.com/math-games/remoteEntry.js',
      from: 'vite',
      format: 'esm',
    },
    // ... other remotes
  },
  // ... shared dependencies
};
```

### Environment Variables

Create environment-specific configurations:

```env
# .env.development
VITE_MATH_GAMES_URL=http://localhost:5001/assets/remoteEntry.js
VITE_LOGIC_GAMES_URL=http://localhost:5002/assets/remoteEntry.js
VITE_LANGUAGE_GAMES_URL=http://localhost:5003/assets/remoteEntry.js

# .env.production
VITE_MATH_GAMES_URL=https://cdn.egitimgalaksisi.com/math-games/remoteEntry.js
VITE_LOGIC_GAMES_URL=https://cdn.egitimgalaksisi.com/logic-games/remoteEntry.js
VITE_LANGUAGE_GAMES_URL=https://cdn.egitimgalaksisi.com/language-games/remoteEntry.js
```

## Loading Micro Frontends

### Dynamic Import

Use React's `lazy` and `Suspense` to load micro frontends:

```typescript
import { lazy, Suspense } from 'react';

const MathGamesRouter = lazy(() => import('mathGames/MathGamesRouter'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MathGamesRouter />
    </Suspense>
  );
}
```

### Error Boundaries

Wrap micro frontends with error boundaries:

```typescript
import { ErrorBoundary } from '@egitim-galaksisi/ui';

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<LoadingSpinner />}>
        <MathGamesRouter />
      </Suspense>
    </ErrorBoundary>
  );
}
```

## Troubleshooting

### Common Issues

1. **Module not found errors**
   - Ensure all micro frontends are running
   - Check that ports match the configuration
   - Verify remote entry URLs are correct

2. **Version conflicts**
   - Ensure all shared dependencies use the same version
   - Check that singleton pattern is enabled for shared dependencies

3. **Build errors**
   - Verify `modulePreload: false` is set in build config
   - Check that `target: 'esnext'` is set
   - Ensure `cssCodeSplit: false` is set

4. **TypeScript errors**
   - Check that `src/types/module-federation.d.ts` is included in tsconfig
   - Verify module declarations match exposed modules

### Debug Mode

Enable verbose logging:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    federation({
      ...federationConfig,
      debug: true, // Enable debug logging
    }),
  ],
});
```

## Best Practices

1. **Version Management**
   - Keep shared dependencies in sync across all micro frontends
   - Use exact versions for critical dependencies
   - Test version upgrades in isolation

2. **Bundle Size**
   - Monitor bundle sizes for each micro frontend
   - Keep micro frontends focused and small
   - Use code splitting within micro frontends

3. **Error Handling**
   - Always wrap micro frontends with error boundaries
   - Provide fallback UI for loading states
   - Implement retry logic for failed loads

4. **Testing**
   - Test each micro frontend independently
   - Test integration with host application
   - Test with different network conditions

5. **Deployment**
   - Deploy micro frontends to CDN for better performance
   - Use versioning for micro frontend URLs
   - Implement rollback strategy

## Next Steps

1. Create Router components for each micro frontend
2. Implement MicroFrontendLoader in host application
3. Set up CI/CD pipelines for independent deployment
4. Configure CDN for production deployment
5. Add monitoring and error tracking

## References

- [Vite Plugin Federation Documentation](https://github.com/originjs/vite-plugin-federation)
- [Module Federation Concepts](https://webpack.js.org/concepts/module-federation/)
- [Micro Frontends Architecture](https://micro-frontends.org/)
