import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
  },
  server: {
    port: parseInt(process.env.PORT || "3000"), // Подставляем порт из Render
    host: "0.0.0.0", // Слушаем внешние подключения
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
