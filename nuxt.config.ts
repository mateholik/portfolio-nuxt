// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  modules: ['@nuxtjs/strapi', 'nuxt-icons', '@nuxt/eslint', '@nuxtjs/sitemap'],

  // Enable TypeScript checking but skip node_modules errors
  typescript: {
    typeCheck: false, // Disabled due to nuxt-icons third-party package errors
  },

  // Site configuration - required for sitemap
  site: {
    url: 'https://vladis.lt',
    name: 'Vladis Vaisov - WEB programuotojas',
    description:
      'Tinklalapiai, svetainės ir el. parduotuvės. HTML, CSS, JavaScript, React, Vue, WordPress',
  },

  runtimeConfig: {
    public: {
      strapiApiUrl: process.env.STRAPI_API_URL || 'http://localhost:1337',
      // Optional flag to force static images even in development
      useStaticImages:
        process.env.USE_STATIC_IMAGES === 'true' ||
        process.env.NODE_ENV === 'production',
      siteUrl: 'https://vladis.lt',
    },
  },

  strapi: {
    url: process.env.STRAPI_API_URL || 'http://localhost:1337',
    prefix: '/api',
    version: 'v4',
  },

  // Enable static site generation
  nitro: {
    prerender: {
      routes: [
        '/sitemap.xml',
        '/',
        '/paslaugos',
        '/javascript',
        '/kaina',
        '/duk',
      ],
      // Force data fetching during build
      crawlLinks: true,
    },
  },

  // SSG configuration
  ssr: true,

  // SEO and performance optimizations
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        { rel: 'canonical', href: 'https://vladis.lt' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Vladis Vaisov',
            jobTitle: 'WEB programuotojas',
            description:
              'Tinklalapiai, svetainės ir el. parduotuvės. HTML, CSS, JavaScript, React, Vue, WordPress',
            url: 'https://vladis.lt',
            workLocation: {
              '@type': 'Place',
              name: 'Lietuva',
            },
          }),
        },
      ],
      htmlAttrs: {
        lang: 'lt',
      },
    },
  },

  // Sitemap configuration
  sitemap: {
    hostname: 'https://vladis.lt',
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
