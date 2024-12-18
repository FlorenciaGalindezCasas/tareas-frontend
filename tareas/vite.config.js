import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/task": "http://localhost:4001", 
      "/auth": "http://localhost:4001",
      "/tag": "http://localhost:4001",
    },
  },
});
