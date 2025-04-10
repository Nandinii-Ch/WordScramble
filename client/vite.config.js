import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['12d6-103-70-61-126.ngrok-free.app'],
    host: true,
    port: 5173
  }
})

