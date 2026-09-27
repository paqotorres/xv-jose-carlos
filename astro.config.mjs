// @ts-check
import { defineConfig } from 'astro/config';

// El dominio se detecta solo en GitHub Pages (vía el workflow) y en Vercel.
// También puedes forzarlo con SITE_URL, p. ej. 'https://xv-jose-carlos.vercel.app'.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export default defineConfig({
  site: process.env.SITE_URL ?? (vercelHost ? `https://${vercelHost}` : undefined),
  // GitHub Pages publica en /<repo>/; en Vercel va en la raíz.
  base: process.env.BASE_PATH ?? '/',
});
