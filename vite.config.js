import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [tailwindcss()],
  esbuild: { jsx: "automatic" },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // These dependencies also support React server components. Vite builds
        // this application entirely for the client, where the directive is inert.
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          warning.message.includes('"use client"')
        )
          return;
        warn(warning);
      },
    },
  },
});
