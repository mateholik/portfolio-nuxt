<script setup lang="ts">
import { useSeoMetaCustom } from '~/composables/useSeoMetaCustom';
import { useGetImage } from '~/composables/useGetImage';

// Simplified data fetching - controllers handle population
const { data, pending, error, refresh } = await useAsyncData(
  'portfolio-page',
  () => useStrapi().findOne('portfolio-page')
);

// Fix: The API returns { data: { ...attributes }, meta: {} }
const content = computed(() => (data.value as any)?.data);

// SEO handling (skip for now since seo might not be in the response)
// const { metaTagsObj } = useSeoMetaCustom(content.value?.seo);
// useSeoMeta(metaTagsObj);
</script>

<template>
  <section class="portfolio">
    <div v-if="pending" class="loading">Loading portfolio...</div>

    <div v-else-if="error" class="error">
      Failed to load portfolio. Please try again.
    </div>

    <div v-else-if="content">
      <h1 class="portfolio__title">
        <img src="/img/icons/portfolio.svg" />{{ content.title }}
      </h1>

      <div v-for="block in content.websites" :key="block.id">
        <h2 class="portfolio__subtitle">
          <img src="/img/icons/check.svg" />{{ block.title }}
        </h2>

        <div class="portfolio__inner">
          <Card
            v-for="card in block.card"
            :key="card.id"
            :title="card.title"
            :subTitle="card.subTitle"
            :image="useGetImage(card.image.url)"
            :url="card.url"
          />
        </div>
      </div>
    </div>

    <div v-else>
      <h2>No content found</h2>
    </div>
  </section>
</template>
