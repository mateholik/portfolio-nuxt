import type {
  PortfolioPage,
  JavascriptPage,
  ServicesPage,
  FAQPage,
  PricePage,
  Sidebar,
} from '~/types/strapiTypes';

export interface StrapiDataOptions {
  key?: string;
  server?: boolean;
  lazy?: boolean;
  default?: () => unknown;
  transform?: (data: unknown) => unknown;
}

export interface StrapiDataResult<T> {
  data: Ref<T | null>;
  pending: Ref<boolean>;
  error: Ref<Error | null>;
  refresh: () => Promise<void>;
  execute: () => Promise<void>;
}

/**
 * Enhanced centralized composable for Strapi data fetching with TypeScript support
 * SEO handling is now separated to avoid SSR issues
 */
export const useStrapiData = () => {
  const strapi = useStrapi();

  /**
   * Generic fetch function with proper typing and error handling
   */
  const fetchData = async <T>(
    endpoint: string,
    options: StrapiDataOptions = {}
  ): Promise<StrapiDataResult<T>> => {
    const { key = endpoint, transform } = options;

    const { data, pending, error, refresh, execute } = await useAsyncData(
      key,
      async () => {
        try {
          console.log(
            `🔍 [DEBUG] Fetching ${endpoint} - Server: ${
              import.meta.server
            }, Client: ${import.meta.client}, ENV: ${process.env.NODE_ENV}`
          );
          const response = await strapi.findOne(endpoint);

          if (!response?.data) {
            throw new Error(`No data found for ${endpoint}`);
          }

          // Transform the data if transformer provided
          const transformedData = transform
            ? transform(response.data)
            : response.data;

          console.log(
            `✅ [DEBUG] Successfully fetched ${endpoint} - Data keys: ${Object.keys(
              transformedData || {}
            ).join(', ')}`
          );
          return transformedData;
        } catch (err) {
          const error = err as Error;
          console.error(
            `❌ [useStrapiData] Error fetching ${endpoint}:`,
            error
          );
          console.log(
            `🔍 [DEBUG] Current environment: ${process.env.NODE_ENV}`
          );
          console.log(`🔍 [DEBUG] Is server: ${import.meta.server}`);
          console.log(`🔍 [DEBUG] Is client: ${import.meta.client}`);
          throw createError({
            statusCode: 500,
            statusMessage: `Failed to fetch ${endpoint}`,
            cause: error,
          });
        }
      },
      {
        // Ensure data is fetched during build for SSG
        server: true,
        lazy: false,
        default: () => options.default?.() || null,
        // Critical: For SSG, only fetch on server during build
        transform: (data) => data,
        // Ensure proper caching during prerendering
        dedupe: 'defer',
      }
    );

    return {
      data: data as Ref<T | null>,
      pending,
      error,
      refresh,
      execute,
    };
  };

  return {
    fetchData,
  };
};

/**
 * Typed composables for each content type
 * SEO is handled separately to avoid SSR issues
 */
export const usePortfolioPage = async (options: StrapiDataOptions = {}) => {
  const { fetchData } = useStrapiData();

  return await fetchData<PortfolioPage>('portfolio-page', {
    key: 'portfolio-page',
    ...options,
  });
};

export const useJavascriptPage = async (options: StrapiDataOptions = {}) => {
  const { fetchData } = useStrapiData();

  return await fetchData<JavascriptPage>('javascript-page', {
    key: 'javascript-page',
    ...options,
  });
};

export const useServicesPage = async (options: StrapiDataOptions = {}) => {
  const { fetchData } = useStrapiData();

  return await fetchData<ServicesPage>('services-page', {
    key: 'services-page',
    ...options,
  });
};

export const useFaqPage = async (options: StrapiDataOptions = {}) => {
  const { fetchData } = useStrapiData();

  return await fetchData<FAQPage>('faq-page', {
    key: 'faq-page',
    ...options,
  });
};

export const usePricePage = async (options: StrapiDataOptions = {}) => {
  const { fetchData } = useStrapiData();

  return await fetchData<PricePage>('price-page', {
    key: 'price-page',
    transform: async (data) => {
      // Since the strapi module doesn't support populate directly,
      // let's try making a manual API call with populate parameters
      try {
        const strapi = useStrapi();

        // Try to use the strapi client to make a custom query
        const populatedResponse = await strapi.find('price-page', {
          populate: {
            calculator: {
              populate: ['option'],
            },
            seo: {
              populate: ['metaImage', 'metaSocial'],
            },
          },
        });

        if (populatedResponse?.data?.[0]) {
          return populatedResponse.data[0];
        }
      } catch {
        // Silently fall back to original data if populate fails
      }

      return data;
    },
    ...options,
  });
};

export const useSidebarData = async (options: StrapiDataOptions = {}) => {
  const { fetchData } = useStrapiData();

  return await fetchData<Sidebar>('sidebar', {
    key: 'sidebar',
    ...options,
  });
};

/**
 * Utility function to safely access nested properties
 */
export const safeGet = <T>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T
): T => {
  return path.split('.').reduce((current: unknown, key: string) => {
    const currentObj = current as Record<string, unknown>;
    return currentObj?.[key] !== undefined ? currentObj[key] : defaultValue;
  }, obj) as T;
};

/**
 * Utility function for loading states
 */
export const useLoadingState = (
  pending: Ref<boolean>,
  error: Ref<Error | null>
) => {
  const isLoading = computed(() => pending.value);
  const hasError = computed(() => !!error.value);
  const isReady = computed(() => !pending.value && !error.value);

  return {
    isLoading,
    hasError,
    isReady,
  };
};
