import type { AsyncData } from 'nuxt/app';

export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta: Record<string, any>;
}

export interface StrapiError {
  message: string;
  status: number;
}

/**
 * Centralized composable for Strapi data fetching
 * Leverages the new controller-based population from backend
 */
export const useStrapiData = () => {
  const strapi = useStrapi();

  /**
   * Fetch a single content type with automatic population
   * Controllers now handle population, so we don't need complex populate queries
   */
  const fetchSingle = async (contentType: string, key?: string) => {
    return await useAsyncData(
      key || contentType,
      async () => {
        try {
          const response = await strapi.findOne(contentType);

          if (!response?.data?.attributes) {
            throw new Error(`No data found for ${contentType}`);
          }

          return response.data.attributes;
        } catch (error) {
          console.error(`Error fetching ${contentType}:`, error);
          throw createError({
            statusCode: 500,
            statusMessage: `Failed to fetch ${contentType}`,
          });
        }
      },
      {
        server: true,
        default: () => null,
      }
    );
  };

  /**
   * Fetch multiple content types with automatic population
   */
  const fetchMany = async (contentType: string, key?: string) => {
    return await useAsyncData(
      key || `${contentType}-list`,
      async () => {
        try {
          const response = await strapi.find(contentType);

          if (!response?.data) {
            throw new Error(`No data found for ${contentType}`);
          }

          return Array.isArray(response.data)
            ? response.data.map((item: any) => item.attributes)
            : [response.data.attributes];
        } catch (error) {
          console.error(`Error fetching ${contentType}:`, error);
          throw createError({
            statusCode: 500,
            statusMessage: `Failed to fetch ${contentType}`,
          });
        }
      },
      {
        server: true,
        default: () => [],
      }
    );
  };

  /**
   * Refresh data for a specific content type
   */
  const refreshData = async (key: string) => {
    await refreshCookie(key);
  };

  return {
    fetchSingle,
    fetchMany,
    refreshData,
  };
};

/**
 * Specific composables for each content type
 */
export const usePortfolioPage = () => {
  const { fetchSingle } = useStrapiData();
  return fetchSingle('portfolio-page', 'portfolio-page');
};

export const useJavascriptPage = () => {
  const { fetchSingle } = useStrapiData();
  return fetchSingle('javascript-page', 'javascript-page');
};

export const useFaqPage = () => {
  const { fetchSingle } = useStrapiData();
  return fetchSingle('faq-page', 'faq-page');
};

export const usePricePage = () => {
  const { fetchSingle } = useStrapiData();
  return fetchSingle('price-page', 'price-page');
};

export const useServicesPage = () => {
  const { fetchSingle } = useStrapiData();
  return fetchSingle('services-page', 'services-page');
};

export const useSidebarData = () => {
  const { fetchSingle } = useStrapiData();
  return fetchSingle('sidebar', 'sidebar');
};
