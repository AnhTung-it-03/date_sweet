import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
  },
  server: {
    middlewareMode: false,
  }
});
