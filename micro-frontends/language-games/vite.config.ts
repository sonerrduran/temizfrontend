import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import federationConfig from './module-federation.config';

export default defineConfig({
  plugins: [
    react(),
    federation(federationConfig),
  ],
  server: {
    port: 5003,
    cors: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      output: {
        format: 'esm',
      },
    },
  },
  preview: {
    port: 5003,
    cors: true,
  },
});
