import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Try to load `lovable-tagger` only if it's installed and available.
// This lets the project run locally/offline without requiring Lovable.
let componentTagger: any = undefined;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access
  componentTagger = require("lovable-tagger").componentTagger;
} catch (e) {
  // Not available (offline or not installed) — ignore and continue.
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
