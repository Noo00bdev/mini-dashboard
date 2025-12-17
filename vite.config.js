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
        index: resolve(__dirname, 'index.html'),
        main: resolve(__dirname, 'main.html'),
        task: resolve(__dirname, 'task.html'),
        taskAddon: resolve(__dirname, 'addTask.html'),
        statistic: resolve(__dirname, 'statistic.html'),
        parameter: resolve(__dirname, 'parameter.html'),
      },
    },
  },
});

