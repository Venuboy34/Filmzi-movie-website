import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Important for Cloudflare Workers
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
