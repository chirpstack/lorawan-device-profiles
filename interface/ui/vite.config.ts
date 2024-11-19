import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    sourcemap: true,
  },
  server: {
    proxy: {
      "^/api.*": {
        target: "http://localhost:8090",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
