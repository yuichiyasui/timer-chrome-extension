import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin({
      jsAssetsFilterFunction: ({ fileName }) => {
        return fileName.endsWith(".js");
      },
    }),
  ],
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
