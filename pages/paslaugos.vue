<script setup lang="ts">
import { useServicesPage, useLoadingState } from '~/composables/useStrapiData';
import { useSeoMetaCustom } from '~/composables/useSeoMetaCustom';
import { useMarkdown } from '~/composables/useMarkdown';

// Use the new centralized data fetching
const { data, pending, error, refresh } = await useServicesPage();

// Enhanced loading state management
const { isLoading, hasError, isReady } = useLoadingState(pending, error);

// Computed properties for better template readability
const pageContent = computed(() => data.value);
const services = computed(() => pageContent.value?.services || []);

const { render } = useMarkdown();

// Helper function to get service icon
const getServiceIcon = (index: number): string => {
  const icons = [
    '/img/icons/www.svg',
    '/img/icons/design.svg',
    '/img/icons/services.svg',
  ];
  return icons[index] || '/img/icons/services.svg';
};

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
  <section class="paslaugos">
    <div v-if="isLoading" class="loading">
      <p>Loading services...</p>
    </div>

    <div v-else-if="hasError" class="error">
      <p>Failed to load services. Please try again.</p>
      <button class="retry-btn" @click="refresh">Retry</button>
    </div>

    <div v-else-if="isReady && pageContent">
      <!-- <h1 v-if="pageTitle" class="paslaugos__main-title">
        {{ pageTitle }}
      </h1> -->

      <div v-for="(block, index) in services" :key="block.id" class="mb-12">
        <h1 class="paslaugos__title">
          <img :src="getServiceIcon(index)" :alt="`${block.title} icon`">
          {{ block.title }}
        </h1>
        <div class="paslaugos__content">
          <div v-html="render(block.text)" />
        </div>
      </div>

      <div v-if="services.length === 0" class="no-content">
        <p>No services available at the moment.</p>
      </div>
    </div>

    <div v-else class="no-content">
      <p>No content available.</p>
    </div>
  </section>
</template>
