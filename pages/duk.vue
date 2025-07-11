<script setup lang="ts">
import ExpandableBlock from '~/components/ExpandableBlock.vue';
import type { FaqPageWithSeo } from '~/types/strapiDukPage';
import { useSeoMetaCustom } from '~/composables/useSeoMetaCustom';

// Simplified data fetching - controllers handle population
const { data, pending, error, refresh } = await useAsyncData('faq-page', () =>
  useStrapi().findOne('faq-page')
);

// Fix: The API returns { data: { ...attributes }, meta: {} }
const content = computed(() => (data.value as any)?.data);
const faqs = computed(() => content.value?.faqs || []);

// SEO handling
const { metaTagsObj } = useSeoMetaCustom(content.value?.seo);
useSeoMeta(metaTagsObj);
</script>

<template>
  <section>
    <div v-if="pending" class="loading">Loading FAQ...</div>

    <div v-else-if="error" class="error">
      Failed to load FAQ. Please try again.
    </div>

    <div v-else-if="content" class="faq">
      <div class="faq__header">
        <h1>{{ content.pageTitle }}</h1>
        <p>{{ content.pageDescription }}</p>
      </div>

      <h2><img src="/img/icons/question.svg" />{{ content.faqTitle }}</h2>

      <div class="faq__inner">
        <ExpandableBlock
          v-for="(item, index) in faqs"
          :key="item.id"
          :isOpen="index === 0"
          :iconName="'question'"
          :question="item.question"
          :answer="item.answer"
        />
      </div>
    </div>
  </section>
</template>
