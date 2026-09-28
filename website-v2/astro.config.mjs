// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cliffvale.github.io',
  base: '/biosensorslab',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 10240,
    }
  },

  integrations: [react(), sitemap()],

  redirects: {
    // ⚠ targets include the GitHub Pages base path — update both when moving to the IITD domain (base '/')
    '/join': '/biosensorslab/contact',
    '/important-links': '/biosensorslab/contact',
  }
});
