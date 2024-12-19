import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 7000, // Frontend port
    proxy: {
      '/api': {
        target: 'http://localhost:6009', // Backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Adjust path if needed
      },
    },
  },
});
