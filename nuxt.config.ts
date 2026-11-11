import tailwindcss from '@tailwindcss/vite'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL ?? 'https://adrienitts.com'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxtjs/i18n', '@nuxtjs/color-mode', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: { siteUrl },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/inter-400.woff2',
          crossorigin: '',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/grotesk-700.woff2',
          crossorigin: '',
        },
      ],
    },
  },

  // Static site: `nuxt generate` pre-renders every locale into .output/public.
  nitro: {
    prerender: { routes: ['/', '/en'], crawlLinks: true },
  },

  content: {
    // node:sqlite ships with Node >= 22.5, so no native better-sqlite3 build is needed.
    experimental: { sqliteConnector: 'native' },
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  i18n: {
    baseUrl: siteUrl,
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
    ],
  },

  eslint: {
    config: { stylistic: false },
  },

  typescript: {
    strict: true,
  },
})
