<script setup lang="ts">
import type { PageAttributes } from "~/types/strapiPortfolioPage";
const config = useRuntimeConfig();

const { data, pending, error, refresh } = await useAsyncData(
  "javascript-page",
  () => useStrapi().findOne<PageAttributes>("javascript-page")
);
const content = data.value?.data.attributes;
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
