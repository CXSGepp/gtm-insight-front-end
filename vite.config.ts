import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // o el plugin que uses (Vue, Svelte, etc.)

export default defineConfig({
  server: {
    port: 5173, // Fuerza el puerto 5173
    strictPort: true, // Evita que cambie automáticamente
  },
  plugins: [react()],
});
