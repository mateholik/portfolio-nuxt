import type { SeoAttributes } from "~/types/strapiSeo";
import { useGetImage } from "~/composables/useGetImage";

export const useSeoMetaCustom = (seoContent?: SeoAttributes) => {
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
    title: seoContent?.metaTitle || "nera",
    description: seoContent?.metaDescription || "nera",
    ogTitle: seoContent?.metaSocial?.[0]?.title || "nera",
    ogDescription: seoContent?.metaSocial?.[0]?.description || "nera",
    ogImage: useGetImage(
      seoContent?.metaSocial?.[0]?.image?.data?.attributes?.url || ""
    ),
  };

  return {
    seoQueryParamsObj,
    metaTagsObj,
  };
};
