import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/PersonalSiteV2/",
  plugins: [tailwindcss()],
  esbuild: { jsx: "automatic" },
});
