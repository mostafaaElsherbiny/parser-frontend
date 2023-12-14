import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
const toPath = (filePath) => path.join(process.cwd(), filePath);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": toPath("src"),
      "@assets": toPath("src/assets"),
    },
  },
  server: {
    host: true,
    port: 8000,
    watch: {
      usePolling: true,
    },
  },
});
