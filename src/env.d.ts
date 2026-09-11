/// <reference types="astro/client" />

/**
 * Bindings des Workers, wie `import { env } from 'cloudflare:workers'` sie liefert.
 *
 * `MAIL_*` stehen als `vars` in wrangler.jsonc. BREVO_API_KEY ist ein Secret und
 * gehört nicht ins Repository:
 *
 *     npx wrangler secret put BREVO_API_KEY
 *
 * Die Bindings werden hier von Hand deklariert statt über `wrangler types`:
 * Die generierten workerd-Runtime-Typen sind global und kollidieren mit den
 * DOM-Typen, die die Client-Skripte der Seite brauchen (z. B. `Element`).
 */
interface Env {
  BREVO_API_KEY: string
  MAIL_TO: string
  MAIL_FROM: string
  MAIL_FROM_NAME: string
}

declare module 'cloudflare:workers' {
  export const env: Env
}
