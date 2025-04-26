import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  base: '/',
  root: path.resolve(__dirname, 'client'), // This explicitly sets the root folder
  build: {
    outDir: path.resolve(__dirname, 'client', 'dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'), // optional, for cleaner imports like "@/components/..."
    },
  },
})
