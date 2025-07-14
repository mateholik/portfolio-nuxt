<script setup lang="ts">
import { usePortfolioPage, useLoadingState } from '~/composables/useStrapiData';
import { useSeoMetaCustom } from '~/composables/useSeoMetaCustom';
import { useGetImage } from '~/composables/useGetImage';
import { useImageLoadingStrategy } from '~/composables/useImageLoadingStrategy';

// Use the new centralized data fetching
const { data, pending, error, refresh } = await usePortfolioPage();

// Enhanced loading state management
const { isLoading, hasError, isReady } = useLoadingState(pending, error);

// Image loading strategy
const { getImagesLoadingStrategy } = useImageLoadingStrategy();

// Computed properties for better template readability
const pageContent = computed(() => data.value);
const websiteBlocks = computed(() => pageContent.value?.websites || []);
const pageTitle = computed(() => pageContent.value?.title || 'Portfolio');

// Handle SEO separately to avoid SSR issues
watchEffect(() => {
  if (pageContent.value?.seo) {
    const { metaTagsObj, applyStructuredData } = useSeoMetaCustom(
      pageContent.value.seo
    );
    useSeoMeta(unref(metaTagsObj));
    applyStructuredData();
  }
});
</script>

<template>
  <section class="portfolio">
    <div v-if="isLoading" class="loading">
      <p>Loading portfolio...</p>
    </div>

    <div v-else-if="hasError" class="error">
      <p>Failed to load portfolio. Please try again.</p>
      <button class="retry-btn" @click="refresh">Retry</button>
    </div>

    <div v-else-if="isReady && pageContent">
      <h1 class="portfolio__title">
        <img width="30" height="30" src="/img/icons/portfolio.svg" alt="Portfolio icon">
        {{ pageTitle }}
      </h1>

      <div v-for="(block, blockIndex) in websiteBlocks" :key="block.id">
        <h2 class="portfolio__subtitle">
          <img width="15" height="15" src="/img/icons/check.svg" alt="Check icon">
          {{ block.title }}
        </h2>

        <div class="portfolio__inner">
          <Card v-for="(card, cardIndex) in block.card" :key="card.id" :title="card.title" :sub-title="card.subTitle"
            :image="useGetImage(card.image.url)" :url="card.url"
            v-bind="getImagesLoadingStrategy(blockIndex, cardIndex, websiteBlocks)" />
        </div>
      </div>

      <div v-if="websiteBlocks.length === 0" class="no-content">
        <p>No portfolio items available at the moment.</p>
      </div>
    </div>

    <div v-else class="no-content">
      <p>No content available.</p>
    </div>
  </section>
</template>
