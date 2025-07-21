// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url"; // Importe fileURLToPath do módulo 'url'

// Define __filename e __dirname para compatibilidade com ESM no Node.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Define '@' como um alias para a pasta 'src'
      // Isso significa que '@/components' apontará para 'src/components'
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
