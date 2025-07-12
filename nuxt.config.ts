// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  modules: ['@nuxtjs/strapi', 'nuxt-icons'],

  runtimeConfig: {
    public: {
      strapiApiUrl: process.env.STRAPI_API_URL || 'http://localhost:1337',
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
    },
  },
});
