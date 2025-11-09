import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: '../', // Load .env from root directory
  server: {
    // Use a fixed port and do not try another one if it's occupied.
    port: 5173,
    // When strictPort is true Vite will exit with an error if the port is already in use
    // instead of automatically trying a different port.
    strictPort: true,
  },
})
