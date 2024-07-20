import path from "node:path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: "src/main.tsx",
        background: "src/background.ts",
      },
      output: {
        dir: "dist",
        format: "es",
        entryFileNames: "[name].js",
      },
    },
  },
});
