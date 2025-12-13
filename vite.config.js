import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: '/mini-dashboard/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        task: resolve(__dirname, 'task.html'),
      },
    },
  },
});

