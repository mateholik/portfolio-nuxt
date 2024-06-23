<script setup lang="ts">
import NumberAnimation from "vue-number-animation";
import type { PageAttributes } from "~/types/strapiPricePage";
import type { Seo } from "~/types/strapiSeo";
import { useCalculator } from "~/composables/useCalculator";
import { useSeoMetaCustom } from "~/composables/useSeoMetaCustom";
import markdownIt from "markdown-it";

const {seoQueryParamsObj} = useSeoMetaCustom()

const { data, pending, error, refresh } = await useAsyncData("price-page", () =>
  useStrapi().findOne<PageAttributes & Seo>("price-page", {
    populate: {
      seo: seoQueryParamsObj,
      calculator: {
        populate: "*",
      },
    },
  })
);
const content = ref(data.value?.data.attributes);
const {metaTagsObj} = useSeoMetaCustom(content?.value?.seo)

const { totalPrice, selectOptionInBlock, initCalc, calcBlocks, hintObj } =
  useCalculator(content?.value?.calculator || []);
  const theFormat = (value: number) => {
  return value.toFixed();
};
const md = markdownIt();
const totalPriceText = content?.value?.totalPriceText.split('<>')
onMounted(() => {
  initCalc();
});

useSeoMeta(metaTagsObj)

</script>

<template>
  <section>
    <div class="calc">
      <h1>
        <img src="/img/icons/euro.svg" />
        {{ content?.pageTitle }}
      </h1>
      <div class="calc__price calc__price-top">
        {{ totalPriceText?.[0] }}
        <span class="calc__price-number">
          <ClientOnly>
            <NumberAnimation
              :from="0"
              :to="totalPrice"
              :format="theFormat"
              :duration="0.3"
              autoplay
              easing="linear"
            />
          </ClientOnly>
        </span>
        {{ totalPriceText?.[1] }}
      </div>

      <div v-html="md.render(content?.mobText)" class="mob-text">
      </div>

      <div class="calc__table" ref="answers">
        <div v-for="(column, i) in calcBlocks" :key="i" style="flex: 1">
          <div class="calc__row">
            <div class="calc__column calc__column--main">
              {{ column.blockTitle }}
            </div>
            <div
              v-for="(item, index) in column.option"
              @click="selectOptionInBlock(item, i)"
              class="calc__column"
              :key="index"
              :class="{ active: item.active }"
            >
              {{ item.title }}
            </div>
          </div>
          <div v-if="i !== 3" class="calc__plus">+</div>
        </div>
      </div>
      <div class="calc__price">
        {{ totalPriceText?.[0] }}
        <span class="calc__price-number">
          <ClientOnly>
            <NumberAnimation
              :from="0"
              :to="totalPrice"
              :format="theFormat"
              :duration="0.3"
              autoplay
              easing="linear"
            />
          </ClientOnly>
        </span>
        {{ totalPriceText?.[1] }}
      </div>
      <br />
      <transition name="hint">
        <div class="hint" v-if="hintObj.description">
          <h3><img src="/img/icons/question.svg" />{{ hintObj.title }}</h3>
          <p>{{ hintObj.description }}</p>
        </div>
      </transition>
    </div>
  </section>
</template>
