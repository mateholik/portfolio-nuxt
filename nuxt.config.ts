// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  modules: ['@nuxtjs/strapi', 'nuxt-icons', '@nuxt/eslint', '@nuxtjs/sitemap'],

  // Enable TypeScript checking but skip node_modules errors
  typescript: {
    typeCheck: false, // Disabled due to nuxt-icons third-party package errors
  },

  runtimeConfig: {
    public: {
      strapiApiUrl: process.env.STRAPI_API_URL || 'http://localhost:1337',
      // Optional flag to force static images even in development
      useStaticImages: process.env.USE_STATIC_IMAGES === 'true',
    },
  },

  strapi: {
    url: process.env.STRAPI_API_URL || 'http://localhost:1337',
    prefix: '/api',
    version: 'v4',
  },

  // SEO and performance optimizations
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
      htmlAttrs: {
        lang: 'lt',
      },
    },
  },

  // Sitemap configuration
  sitemap: {
    hostname: process.env.NUXT_PUBLIC_SITE_URL || 'https://vladis.lt',
    gzip: true,
    exclude: ['/api/**', '/__sitemap__/**'],
    defaults: {
      changefreq: 'weekly',
      priority: 0.5,
    },
    urls: [
      {
        loc: '/',
        priority: 1.0,
        changefreq: 'daily',
      },
      {
        loc: '/paslaugos',
        priority: 0.9,
        changefreq: 'monthly',
      },
      {
        loc: '/javascript',
        priority: 0.8,
        changefreq: 'weekly',
      },
      {
        loc: '/kaina',
        priority: 0.7,
        changefreq: 'monthly',
      },
      {
        loc: '/duk',
        priority: 0.6,
        changefreq: 'monthly',
      },
    ],
  },
});
