import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true,          // allows access via LAN IPs
    port: 8081,          // you can keep 8080 or change to 8081
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "localhost+4-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "localhost+4.pem")),
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
