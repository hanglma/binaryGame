// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/binarygame/', // Add this line
  // other config options...
  build: {
    outDir: 'build' // Change this to your preferred output directory
  }
});
