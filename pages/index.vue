<script setup lang="ts">
import type { PageAttributes } from "~/types/strapiPortfolioPage";
import type { Seo } from "~/types/strapiSeo";
import { useSeoMetaCustom } from "~/composables/useSeoMetaCustom";

const config = useRuntimeConfig();
const { seoQueryParamsObj } = useSeoMetaCustom();

const { data, pending, error, refresh } = await useAsyncData(
  "portfolio-page",
  () =>
    useStrapi().findOne<PageAttributes & Seo>("portfolio-page", {
      populate: {
        seo: seoQueryParamsObj,
        websites: {
          populate: {
            card: {
              populate: {
                category: {
                  populate: true,
                },
                image: {
                  fields: ["name", "url"],
                },
              },
            },
          },
        },
      },
    })
);

const content = ref(data.value?.data.attributes);
const { metaTagsObj } = useSeoMetaCustom(content?.value?.seo);
useSeoMeta(metaTagsObj);
</script>

<template>
  <section class="portfolio">
    <h1 class="portfolio__title">
      <img src="/img/icons/portfolio.svg" />{{ content?.title }}
    </h1>
    <div v-for="block in content?.websites" :key="block.id">
      <h2 class="portfolio__subtitle">
        <img src="/img/icons/check.svg" />{{ block.title }}
      </h2>
      <div class="portfolio__inner">
        <Card
          v-for="card in block.card"
          :key="card.id"
          :title="card.title"
          :subTitle="card.subTitle"
          :image="config.public.strapiApiUrl + card.image.data.attributes.url"
          :url="card.url"
        />
      </div>
    </div>
  </section>
</template>
