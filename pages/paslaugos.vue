<script setup lang="ts">
import type { PageAttributes } from '~/types/strapiServicesPage';
import markdownIt from 'markdown-it';

// Simplified data fetching - controllers handle population
const { data, pending, error, refresh } = await useAsyncData(
  'services-page',
  () => useStrapi().findOne<PageAttributes>('services-page')
);

const md = markdownIt();
const content = computed(() => data.value?.data.attributes);
</script>

<template>
  <section class="paslaugos">
    <div v-if="pending" class="loading">Loading services...</div>

    <div v-else-if="error" class="error">
      Failed to load services. Please try again.
    </div>

    <div v-else-if="content">
      <div v-for="block in content.services" :key="block.id" class="mb-12">
        <h1 class="paslaugos__title">
          <img src="/img/icons/www.svg" />{{ block.title }}
        </h1>
        <div class="paslaugos__content">
          <div v-html="md.render(block.text)"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.service-ul ul {
  @apply list-disc pl-8;
}
</style>
