<script setup lang="ts">
import {
  useJavascriptPage,
  useLoadingState,
} from '~/composables/useStrapiData';
import { useSeoMetaCustom } from '~/composables/useSeoMetaCustom';
import { useGetImage } from '~/composables/useGetImage';
import type { JavascriptPage } from '~/types/strapiTypes';

// Use the new centralized data fetching
const { data, pending, error, refresh } = await useJavascriptPage();

// Enhanced loading state management
const { isLoading, hasError, isReady } = useLoadingState(pending, error);

// Computed properties for better template readability
const pageContent = computed(() => data.value);
const websiteProjects = computed(() => pageContent.value?.websites?.card || []);
const websiteTitle = computed(() => pageContent.value?.websites?.title || '');
const pageTitle = computed(
  () => pageContent.value?.title || 'JavaScript Projects'
);

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
      <p>Loading JavaScript projects...</p>
    </div>

    <div v-else-if="hasError" class="error">
      <p>Failed to load JavaScript projects. Please try again.</p>
      <button @click="refresh" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="isReady && pageContent">
      <h1 class="portfolio__title">
        <img src="/img/icons/portfolio.svg" alt="Portfolio icon" />
        {{ pageTitle }}
      </h1>

      <div v-if="websiteProjects.length > 0">
        <h2 class="portfolio__subtitle">
          <img src="/img/icons/check.svg" alt="Check icon" />
          {{ websiteTitle }}
        </h2>

        <div class="portfolio__inner">
          <Card
            v-for="card in websiteProjects"
            :key="card.id"
            :title="card.title"
            :subTitle="card.subTitle"
            :image="useGetImage(card.image.url)"
            :url="card.url"
          />
        </div>
      </div>

      <div v-else class="no-content">
        <p>No JavaScript projects available at the moment.</p>
      </div>
    </div>

    <div v-else class="no-content">
      <p>No content available.</p>
    </div>
  </section>
</template>

<style scoped>
.loading,
.error,
.no-content {
  text-align: center;
  padding: 2rem;
}

.error {
  color: #dc2626;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.retry-btn:hover {
  background: #2563eb;
}
</style>
