import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Adjust the base path if necessary
  build: {
    outDir: 'dist', // Default output directory
  },
});
