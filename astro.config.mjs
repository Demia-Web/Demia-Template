// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

import react from "@astrojs/react";

import swup from "@swup/astro";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  devToolbar: {
    enabled: false,
  },

  adapter: netlify(),
  output: "server",
  integrations: [
    react(),
    swup({
      theme: "false",
      containers: ["main"],
      cache: true,
      preload: true,
      accessibility: true,
      morph: false,
      parallel: false,
      updateBodyClass: true,
      updateHead: true,
      reloadScripts: true,
      loadOnIdle: true,
      globalInstance: false,
    }),
  ],
});
