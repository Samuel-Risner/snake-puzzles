import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [],
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
  }
})