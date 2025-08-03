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
      title: 'WEB sprendimai Jūsų verslui',
      meta: [
        {
          name: 'keywords',
          content:
            'Verslo procesų automatizavimas, Svetainių kūrimas, Dizainas, Tinklalapiai, svetainės, el. parduotuvės. HTML, CSS, JavaScript, React, Vue, WordPress, nuxt, next, LLM, python, vilnius, lietuva',
        },
        {
          name: 'description',
          content:
            'Verslo procesų automatizavimas, Svetainių kūrimas, Dizainas',
        },
        { property: 'og:title', content: 'WEB sprendimai Jūsų verslui' },
        {
          property: 'og:description',
          content:
            'Verslo procesų automatizavimas, Svetainių kūrimas, Dizainas',
        },
        {
          property: 'og:image',
          content: 'https://vladis.lt/img/uploads/favicon_1_1319362b80.png',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://vladis.lt' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'WEB sprendimai Jūsų verslui',
        },
        {
          name: 'twitter:description',
          content:
            'Verslo procesų automatizavimas, Svetainių kūrimas, Dizainas',
        },
        {
          name: 'twitter:image',
          content: 'https://vladis.lt/img/uploads/favicon_1_1319362b80.png',
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
              'Verslo procesų automatizavimas, Svetainių kūrimas, Dizainas. Specializuojuosi modernių tinklalapių, el. parduotuvių ir verslo procesų automatizavimo sprendimų kūrime.',
            url: 'https://vladis.lt',
            sameAs: [
              'https://www.linkedin.com/in/vladimir-vaisov',
              'https://github.com/mateholik',
              'https://www.facebook.com/vladis.vaisov',
            ],
            workLocation: {
              '@type': 'Place',
              name: 'Vilnius, Lietuva',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'LT',
                addressLocality: 'Vilnius',
              },
            },
            knowsAbout: [
              'HTML',
              'CSS',
              'JavaScript',
              'React',
              'Vue.js',
              'Nuxt.js',
              'Next.js',
              'WordPress',
              'Python',
              'LLM Integration',
              'Business Process Automation',
              'Web Design',
              'E-commerce Development',
            ],
            offers: {
              '@type': 'Service',
              serviceType: 'Web Development Services',
              description:
                'Profesionalių tinklalapių, el. parduotuvių kūrimas ir verslo procesų automatizavimas',
              areaServed: {
                '@type': 'Country',
                name: 'Lithuania',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Web Development Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Reprezentacinės svetainės',
                      description:
                        'Modernių, responsyvių reprezentacinių svetainių kūrimas verslui',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'El. parduotuvės',
                      description:
                        'Elektroninės komercijos sprendimų kūrimas ir integracija',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Vieno puslapio svetainės',
                      description:
                        'Efektyvių landing page tipo svetainių kūrimas',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Verslo procesų automatizavimas',
                      description:
                        'Automatizavimo sprendimų diegimas verslo procesams optimizuoti',
                    },
                  },
                ],
              },
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+370-605-08501',
              contactType: 'customer service',
              availableLanguage: ['Lithuanian', 'English', 'Russian'],
            },
          }),
        },
        // Additional Organization schema for business context
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Vladis Vaisov - WEB sprendimai',
            description:
              'Profesionalių WEB sprendimų kūrimas verslui - svetainės, el. parduotuvės, automatizavimas',
            url: 'https://vladis.lt',
            logo: 'https://vladis.lt/img/uploads/favicon_1_1319362b80.png',
            image: 'https://vladis.lt/img/uploads/favicon_1_1319362b80.png',
            telephone: '+370-605-08501',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'LT',
              addressLocality: 'Vilnius',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '54.6872',
              longitude: '25.2797',
            },
            areaServed: {
              '@type': 'Country',
              name: 'Lithuania',
            },
            serviceArea: {
              '@type': 'Country',
              name: 'Lithuania',
            },
            priceRange: '€200-€1500',
            paymentAccepted: 'Cash, Bank Transfer',
            currenciesAccepted: 'EUR',
            founder: {
              '@type': 'Person',
              name: 'Vladis Vaisov',
            },
            employee: {
              '@type': 'Person',
              name: 'Vladis Vaisov',
            },
            sameAs: [
              'https://www.linkedin.com/in/vladimir-vaisov',
              'https://github.com/mateholik',
              'https://www.facebook.com/vladis.vaisov',
            ],
          }),
        },
        // Website schema
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Vladis Vaisov - WEB sprendimai Jūsų verslui',
            description:
              'Verslo procesų automatizavimas, Svetainių kūrimas, Dizainas',
            url: 'https://vladis.lt',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://vladis.lt/?s={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
            about: {
              '@type': 'Thing',
              name: 'Web Development',
              description:
                'Professional web development services including websites, e-commerce, and business automation',
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
