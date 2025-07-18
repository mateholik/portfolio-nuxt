<script setup lang="ts">
import ExpandableBlock from '~/components/ExpandableBlock.vue';
import { useFaqPage, useLoadingState } from '~/composables/useStrapiData';
import { useSeoMetaCustom } from '~/composables/useSeoMetaCustom';

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
      <button class="retry-btn" @click="refresh">Retry</button>
    </div>

    <div v-else-if="isReady && pageContent" class="faq">
      <div class="faq__header">
        <h1>{{ pageTitle }}</h1>
        <p v-if="pageDescription">{{ pageDescription }}</p>
      </div>

      <h2>
        <img src="/img/icons/question.svg" alt="Question icon">
        {{ faqTitle }}
      </h2>

      <div v-if="faqs.length > 0" class="faq__inner">
        <ClientOnly>
          <ExpandableBlock
v-for="(item, index) in faqs" :key="item.id" :is-open="index === 0"
            :icon-name="item.Icon || 'question'" :question="item.question" :answer="item.answer" />
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
