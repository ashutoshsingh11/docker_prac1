import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // Expose to Docker network
    port: 5173,
    proxy: {
      '/api': 'http://backend:3001'  // Proxy API calls to backend container
    }
  }
});
