// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwind from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), vue()],
  vite: {
    plugins: [tailwind()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
