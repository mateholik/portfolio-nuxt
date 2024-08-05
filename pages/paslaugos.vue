<script setup lang="ts">
import type { PageAttributes } from "~/types/strapiServicesPage";
import markdownIt from "markdown-it";
import { useSeoMetaCustom } from "~/composables/useSeoMetaCustom";

const { data, pending, error, refresh } = await useAsyncData(
  "javascript-page",
  () => useStrapi().findOne<PageAttributes>("services-page", { populate: "*" })
);
const md = markdownIt();
const content = ref(data.value?.data.attributes);
const { metaTagsObj } = useSeoMetaCustom(content?.value?.seo);
useSeoMeta(metaTagsObj);
</script>

<template>
  <section class="paslaugos">
    <div v-for="block in content?.services" :key="block.id" class="mb-12">
      <h1 class="paslaugos__title">
        <img src="/img/icons/www.svg" />{{ block.title }}
      </h1>
      <div class="paslaugos__content">
        <div v-html="md.render(block.text)"></div>
      </div>
    </div>
  </section>
</template>

<style>
.service-ul ul {
  @apply list-disc pl-8;
}
</style>
