// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // <--- Adicione este bloco
      components: path.resolve(__dirname, "./src/Components"), // Alias para a pasta Components
      assets: path.resolve(__dirname, "./src/assets"), // Alias para a pasta assets (se não estiver dentro de um componente)
      pages: path.resolve(__dirname, "./src/Pages"), // Alias para a pasta Pages
      // Você pode adicionar mais aliases conforme sua estrutura de pastas
      // Por exemplo, se você criar uma pasta 'sections':
      // 'sections': path.resolve(__dirname, './src/sections'),
      // Se usar '@' para a raiz 'src':
      // '@': path.resolve(__dirname, './src'),
    },
  },
});
