import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "api": path.resolve(__dirname, "src/api"),
      "assets": path.resolve(__dirname, "src/assets"),
      "components": path.resolve(__dirname, "src/components"),
      "context": path.resolve(__dirname, "src/context"),
      "domains": path.resolve(__dirname, "src/domains"),
      "pages": path.resolve(__dirname, "src/pages"),
      "use-cases": path.resolve(__dirname, "src/use-cases"),
    },
  },
});
