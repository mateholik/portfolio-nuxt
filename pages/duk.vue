<script setup lang="ts">
import ExpandableBlock from "~/components/ExpandableBlock.vue";
import type { PageAttributes } from "~/types/strapiDukPage";
import type { Seo } from "~/types/strapiSeo";
import { useSeoMetaCustom } from "~/composables/useSeoMetaCustom";

const { seoQueryParamsObj } = useSeoMetaCustom();

const { data, pending, error, refresh } = await useAsyncData(
  "javascript-page",
  () =>
    useStrapi().findOne<PageAttributes & Seo>("faq-page", {
      populate: {
        seo: seoQueryParamsObj,
        faqs: {
          populate: "*",
        },
      },
    })
);
const content = data.value?.data.attributes;
const faqs = content?.faqs.data || [];
const { metaTagsObj } = useSeoMetaCustom(content?.seo);
useSeoMeta(metaTagsObj);
</script>

<template>
  <section>
    <div class="faq">
      <div class="faq__header">
        <h1>{{ content?.pageTitle }}</h1>
        <p>
          {{ content?.pageDescription }}
        </p>
      </div>
      <h2><img src="/img/icons/question.svg" />{{ content?.faqTitle }}</h2>
      <div class="faq__inner">
        <ExpandableBlock
          v-for="(item, index) in faqs"
          :isOpen="index === 0"
          :key="item.attributes.question"
          :iconName="item.attributes.iconName"
          :question="item.attributes.question"
          :answer="item.attributes.answer"
        />
      </div>
    </div>
  </section>
</template>
