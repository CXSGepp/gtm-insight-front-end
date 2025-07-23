import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // o el plugin que uses (Vue, Svelte, etc.)
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  base: '/getm_insight/',
  //server: {
  //  port: 5173, // Fuerza el puerto 5173
  //  strictPort: true, // Evita que cambie automáticamente
  //},
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react()
  ],
});
