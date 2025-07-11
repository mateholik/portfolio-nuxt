<script setup lang="ts">
import markdownIt from 'markdown-it';

// Simplified data fetching - controllers handle population
const { data, pending, error, refresh } = await useAsyncData(
  'services-page',
  () => useStrapi().findOne('services-page')
);

const md = markdownIt();
// Fix: The API returns { data: { ...attributes }, meta: {} }
const content = computed(() => (data.value as any)?.data);
</script>

<template>
  <section class="paslaugos">
    <div v-if="pending" class="loading">Loading services...</div>

    <div v-else-if="error" class="error">
      Failed to load services. Please try again.
    </div>

    <div v-else-if="content">
      <h1 v-if="content.pageTitle" class="paslaugos__main-title">
        {{ content.pageTitle }}
      </h1>

      <div v-for="block in content.services" :key="block.id" class="mb-12">
        <h1 class="paslaugos__title">
          <img src="/img/icons/www.svg" />{{ block.title }}
        </h1>
        <div class="paslaugos__content">
          <div v-html="md.render(block.text)"></div>
        </div>
      </div>
    </div>

    <div v-else>
      <h2>No services found</h2>
    </div>
  </section>
</template>

<style>
.service-ul ul {
  @apply list-disc pl-8;
}

.paslaugos__main-title {
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: bold;
}
</style>
