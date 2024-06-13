<script setup lang="ts">
import type { PageAttributes } from "~/types/strapiFaqPage";
const { data, pending, error, refresh } = await useAsyncData(
  "javascript-page",
  () => useStrapi().findOne<PageAttributes>("faq-page", { populate: "*" })
);
const content = data.value?.data.attributes;
const faqs = ref(content?.faqs.data);
</script>

<template>
  <h1 class="text-4xl mb-8 text-gray-900 dark:text-white">
    {{ content?.pageTitle }}
  </h1>
  <p>{{ content?.pageDescription }}</p>
  <h2 class="text-3xl mb-8">{{ content?.faqTitle }}</h2>

  <div
    id="accordion-color"
    data-accordion="collapse"
    class="dark:bg-gray-800 text-blue-600 dark:text-white border-b border-gray-200 dark:border-gray-700"
  >
    <ExpandableBlock
      v-for="(item, index) in faqs"
      :key="item.id"
      :head="item.attributes.question"
      :body="item.attributes.answer"
      :isVisible="index === 0"
      :index="index"
      :isFirst="index === 0"
      :isLast="index === faqs.length - 1"
    />
  </div>
</template>
