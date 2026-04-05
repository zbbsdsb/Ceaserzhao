import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        history: resolve(__dirname, 'history.html'),
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
