import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';
import federationConfig from './module-federation.config';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: './',
    server: {
      port: 5173,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      federation(federationConfig),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@egitim-galaksisi/ui': path.resolve(__dirname, '../../packages/ui/src'),
        '@egitim-galaksisi/game-engine': path.resolve(__dirname, '../../packages/game-engine/src'),
        '@egitim-galaksisi/shared': path.resolve(__dirname, '../../packages/shared/src'),
        '@egitim-galaksisi/mock-data': path.resolve(__dirname, '../../packages/mock-data/src'),
      },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
      modulePreload: false,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Vendor chunks
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'react-vendor';
              }
              if (id.includes('framer-motion') || id.includes('lucide-react')) {
                return 'ui-vendor';
              }
              return 'vendor';
            }

            // Feature chunks (non-micro-frontend features)
            if (id.includes('/features/dashboard/')) return 'dashboard';
            if (id.includes('/features/profile/')) return 'profile';
            if (id.includes('/features/leaderboard/')) return 'leaderboard';
            if (id.includes('/features/lessons/')) return 'lessons';
            if (id.includes('/features/fast-reading/')) return 'fast-reading';
            if (id.includes('/features/focus/')) return 'focus-games';
            if (id.includes('/features/learning/')) return 'learning-tools';
            if (id.includes('/features/life-skills/')) return 'life-skills';
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      sourcemap: mode === 'development',
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
  };
});
