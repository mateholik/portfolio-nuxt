import type { AsyncData } from 'nuxt/app';
import type {
  PortfolioPageResponse,
  JavascriptPageResponse,
  ServicesPageResponse,
  FAQPageResponse,
  PricePageResponse,
  SidebarResponse,
  PortfolioPage,
  JavascriptPage,
  ServicesPage,
  FAQPage,
  PricePage,
  Sidebar,
  SEO,
} from '~/types/strapiTypes';

export interface StrapiDataOptions {
  key?: string;
  server?: boolean;
  lazy?: boolean;
  default?: () => any;
  transform?: (data: any) => any;
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
    const { key = endpoint, server = true, lazy = false, transform } = options;

    const { data, pending, error, refresh, execute } = await useAsyncData(
      key,
      async () => {
        try {
          const response = await strapi.findOne(endpoint);

          if (!response?.data) {
            throw new Error(`No data found for ${endpoint}`);
          }

          // Transform the data if transformer provided
          const transformedData = transform
            ? transform(response.data)
            : response.data;

          return transformedData;
        } catch (err) {
          console.error(`Error fetching ${endpoint}:`, err);
          throw createError({
            statusCode: 500,
            statusMessage: `Failed to fetch ${endpoint}`,
            cause: err,
          });
        }
      },
      {
        server,
        lazy,
        default: () => options.default?.() || null,
      }
    );

    return {
      data,
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
export const safeGet = <T>(obj: any, path: string, defaultValue?: T): T => {
  return path.split('.').reduce((current, key) => {
    return current?.[key] !== undefined ? current[key] : defaultValue;
  }, obj);
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
