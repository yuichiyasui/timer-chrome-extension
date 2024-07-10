import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
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
