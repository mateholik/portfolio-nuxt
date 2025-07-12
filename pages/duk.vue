<script setup lang="ts">
import ExpandableBlock from '~/components/ExpandableBlock.vue';
import { useFaqPage, useLoadingState } from '~/composables/useStrapiData';
import { useSeoMetaCustom } from '~/composables/useSeoMetaCustom';
import type { FAQPage } from '~/types/strapiTypes';

// Use the new centralized data fetching
const { data, pending, error, refresh } = await useFaqPage();

// Enhanced loading state management
const { isLoading, hasError, isReady } = useLoadingState(pending, error);

// Computed properties for better template readability
const pageContent = computed(() => data.value);
const faqs = computed(() => pageContent.value?.faqs || []);
const pageTitle = computed(() => pageContent.value?.pageTitle || 'FAQ');
const pageDescription = computed(
  () => pageContent.value?.pageDescription || ''
);
const faqTitle = computed(
  () => pageContent.value?.faqTitle || 'Frequently Asked Questions'
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
  <section>
    <div v-if="isLoading" class="loading">
      <p>Loading FAQ...</p>
    </div>

    <div v-else-if="hasError" class="error">
      <p>Failed to load FAQ. Please try again.</p>
      <button @click="refresh" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="isReady && pageContent" class="faq">
      <div class="faq__header">
        <h1>{{ pageTitle }}</h1>
        <p v-if="pageDescription">{{ pageDescription }}</p>
      </div>

      <h2>
        <img src="/img/icons/question.svg" alt="Question icon" />
        {{ faqTitle }}
      </h2>

      <div class="faq__inner" v-if="faqs.length > 0">
        <ClientOnly>
          <ExpandableBlock
            v-for="(item, index) in faqs"
            :key="item.id"
            :isOpen="index === 0"
            :iconName="item.Icon || 'question'"
            :question="item.question"
            :answer="item.answer"
          />
        </ClientOnly>
      </div>

      <div v-else class="no-content">
        <p>No FAQ items available at the moment.</p>
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
