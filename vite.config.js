import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,          // expose to network/ngrok
    allowedHosts: true,  // allow ngrok domains
    port: 5173,
    open: true
  }
})