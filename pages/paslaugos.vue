<script setup lang="ts">
import type { PageAttributes } from "~/types/strapiFaqPage";
import markdownIt from "markdown-it";
const { data, pending, error, refresh } = await useAsyncData(
  "javascript-page",
  () => useStrapi().findOne<PageAttributes>("services-page", { populate: "*" })
);
const md = markdownIt();
const content = data.value?.data.attributes;
</script>

<template>
  <div v-for="block in content?.services" :key="block.id" class="mb-12">
    <h2 class="text-3xl mb-8">{{ block.title }}</h2>
    <div class="service-ul" v-html="md.render(block.text)"></div>
  </div>
</template>

<style>
.service-ul ul {
  @apply list-disc pl-8;
}
</style>
