// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
  site: 'https://www.arssaltandi.de',

  // Hybrid: Standard ist statisch — jede Seite wird beim Build vorgerendert
  // und direkt vom Cloudflare-Edge ausgeliefert. Nur Routen mit
  // `export const prerender = false` laufen im Worker; derzeit ist das
  // ausschließlich src/pages/api/form.ts.
  output: 'static',
  adapter: cloudflare({ imageService: 'compile' }),

  // Wir brauchen keine Sessions — spart eine KV-Namespace-Bindung.
  session: false,

  integrations: [sitemap()],
  build: { format: 'directory' },
})
