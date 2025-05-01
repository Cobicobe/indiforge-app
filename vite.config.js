import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/indiforge-app/' // needed for GitHub Pages deployment
});
