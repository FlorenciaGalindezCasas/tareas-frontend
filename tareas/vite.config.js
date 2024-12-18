import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/task": "http://localhost:4000", 
      "/auth": "http://localhost:4000",
      "/tag": "http://localhost:4000",
    },
  },
});
