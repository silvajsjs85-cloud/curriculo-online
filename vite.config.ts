import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    Sitemap({
      hostname: "https://curriculos.fun",
      dynamicRoutes: [
        "/modelos/curriculo-administrativo",
        "/modelos/primeiro-emprego",
        "/modelos/curriculo-atendimento-vendas",
        "/criar",
        "/contato",
        "/modelos",
        "/termos-de-uso",
        "/politica-de-privacidade"
      ]
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
