import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://new.nsgsolutions.in/',
        changeOrigin: true,
        secure: false, // Set to true if you have a valid SSL certificate
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
