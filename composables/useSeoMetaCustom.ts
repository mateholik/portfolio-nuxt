import type { SEO } from '~/types/strapiTypes';
import { useGetImage } from '~/composables/useGetImage';

export interface SeoMetaOptions {
  defaultTitle?: string;
  defaultDescription?: string;
  defaultImage?: string;
  titleTemplate?: string;
}

export const useSeoMetaCustom = (
  seoContent?: SEO,
  options: SeoMetaOptions = {}
) => {
  const {
    defaultTitle = 'Portfolio - Vladis Vaisov',
    defaultDescription = 'Full-stack developer specializing in modern web development',
    defaultImage = '/img/preview.png',
    titleTemplate = '%s | Vladis Vaisov',
  } = options;

  // Helper function to get the best available image
  const getBestImage = (seo?: SEO): string => {
    if (seo?.metaImage?.url) {
      return useGetImage(seo.metaImage.url);
    }

    if (seo?.metaSocial?.[0]?.image?.url) {
      return useGetImage(seo.metaSocial[0].image.url);
    }

    return defaultImage;
  };

  // Helper function to get social meta data
  const getSocialMeta = (
    seo?: SEO,
    network: 'Facebook' | 'Twitter' = 'Facebook'
  ) => {
    const socialData = seo?.metaSocial?.find(
      (social) => social.socialNetwork === network
    );
    return {
      title: socialData?.title || seo?.metaTitle || defaultTitle,
      description:
        socialData?.description || seo?.metaDescription || defaultDescription,
      image: socialData?.image?.url
        ? useGetImage(socialData.image.url)
        : getBestImage(seo),
    };
  };

  // Build comprehensive meta tags object
  const metaTagsObj = computed(() => {
    const title = seoContent?.metaTitle || defaultTitle;
    const description = seoContent?.metaDescription || defaultDescription;
    const image = getBestImage(seoContent);
    const facebookMeta = getSocialMeta(seoContent, 'Facebook');
    const twitterMeta = getSocialMeta(seoContent, 'Twitter');

    return {
      // Basic meta tags
      title: titleTemplate.includes('%s')
        ? titleTemplate.replace('%s', title)
        : title,
      description,
      keywords: seoContent?.keywords,
      robots: seoContent?.metaRobots || 'index,follow',
      viewport:
        seoContent?.metaViewport || 'width=device-width, initial-scale=1',

      // Open Graph (Facebook)
      ogTitle: facebookMeta.title,
      ogDescription: facebookMeta.description,
      ogImage: facebookMeta.image,
      ogType: 'website' as const,
      ogSiteName: 'Vladis Vaisov Portfolio',

      // Twitter Card
      twitterCard: 'summary_large_image' as const,
      twitterTitle: twitterMeta.title,
      twitterDescription: twitterMeta.description,
      twitterImage: twitterMeta.image,

      // Additional meta tags
      ...(seoContent?.canonicalURL && { canonical: seoContent.canonicalURL }),
    };
  });

  // Structured data handling
  const structuredData = computed(() => {
    if (!seoContent?.structuredData) return null;

    try {
      return typeof seoContent.structuredData === 'string'
        ? JSON.parse(seoContent.structuredData)
        : seoContent.structuredData;
    } catch (error) {
      console.warn('Invalid structured data:', error);
      return null;
    }
  });

  // Apply structured data to head
  const applyStructuredData = () => {
    if (structuredData.value) {
      useHead({
        script: [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(structuredData.value),
          },
        ],
      });
    }
  };

  return {
    metaTagsObj,
    structuredData,
    applyStructuredData,
    // Utility functions for manual access
    getTitle: () => seoContent?.metaTitle || defaultTitle,
    getDescription: () => seoContent?.metaDescription || defaultDescription,
    getImage: () => getBestImage(seoContent),
    getSocialMeta,
  };
};
