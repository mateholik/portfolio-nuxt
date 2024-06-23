import type { SeoAttributes } from "~/types/strapiSeo";

export const useSeoMetaCustom = (seoContent?: SeoAttributes) => {
  const config = useRuntimeConfig();

  const seoQueryParamsObj = {
    populate: {
      metaImage: {
        fields: ["name", "url"],
      },
      metaSocial: {
        populate: {
          image: {
            fields: ["name", "url"],
          },
        },
      },
    },
  };

  const metaTagsObj = {
    title: seoContent?.metaTitle,
    description: seoContent?.metaDescription,
    ogTitle: seoContent?.metaSocial[0].title,
    ogDescription: seoContent?.metaSocial[0].description,
    ogImage:
      config.public.strapiApiUrl +
      seoContent?.metaSocial[0].image.data.attributes.url,
  };

  return {
    seoQueryParamsObj,
    metaTagsObj,
  };
};
