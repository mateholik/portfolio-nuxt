// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      strapiApiUrl: process.env.STRAPI_API_URL || "http://localhost:1337",
    },
  },
  // modules: ['@nuxtjs/strapi'],
  // strapi: {
  //   url: process.env.STRAPI_URL || "http://localhost:1337",
  //   prefix: "/api",
  //   admin: "/admin",
  //   version: "v4",
  //   cookie: {},
  //   cookieName: "strapi_jwt",
  // },
});
