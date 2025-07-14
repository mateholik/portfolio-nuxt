export default defineNuxtPlugin(async () => {
  // Only run during prerendering
  if (process.env.NODE_ENV === 'prerender') {
    // Import all the data fetching functions
    const {
      usePortfolioPage,
      useServicesPage,
      useJavascriptPage,
      usePricePage,
      useFaqPage,
    } = await import('~/composables/useStrapiData');

    try {
      // Force fetch all page data during build
      await Promise.all([
        usePortfolioPage(),
        useServicesPage(),
        useJavascriptPage(),
        usePricePage(),
        useFaqPage(),
      ]);
    } catch (error) {
      console.error('Error fetching page data during prerendering:', error);
    }
  }
});
