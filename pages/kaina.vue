<script setup lang="ts">
import NumberAnimation from 'vue-number-animation';
import { useCalculator } from '~/composables/useCalculator';
import markdownIt from 'markdown-it';
import { usePricePage, useLoadingState } from '~/composables/useStrapiData';
import { useSeoMetaCustom } from '~/composables/useSeoMetaCustom';
import type { PricePage } from '~/types/strapiTypes';

// Use the new centralized data fetching
const { data, pending, error, refresh } = await usePricePage();

// Enhanced loading state management
const { isLoading, hasError, isReady } = useLoadingState(pending, error);

// Computed properties for better template readability
const pageContent = computed(() => data.value);
const pageTitle = computed(
  () => pageContent.value?.pageTitle || 'Price Calculator'
);
const totalPriceText = computed(
  () => pageContent.value?.totalPriceText?.split('<>') || ['Total: ', ' EUR']
);

// Transform calculator data to include active property
const calculatorData = computed(() => {
  const calculator = pageContent.value?.calculator || [];
  return calculator.map((block) => ({
    ...block,
    option: block.option.map((option) => ({
      ...option,
      active: false,
    })),
  }));
});

const { totalPrice, selectOptionInBlock, initCalc, calcBlocks, hintObj } =
  useCalculator(calculatorData.value);

const theFormat = (value: number) => {
  return value.toFixed();
};

const md = markdownIt();

// Watch for data changes and reinitialize calculator
watch(
  calculatorData,
  (newData) => {
    if (newData.length > 0) {
      initCalc();
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (calculatorData.value.length > 0) {
    initCalc();
  }
});

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
      <p>Loading price calculator...</p>
    </div>

    <div v-else-if="hasError" class="error">
      <p>Failed to load price calculator. Please try again.</p>
      <button @click="refresh" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="isReady && pageContent" class="calc">
      <h1>
        <img src="/img/icons/euro.svg" alt="Euro icon" />
        {{ pageTitle }}
      </h1>

      <div class="calc__price calc__price-top">
        {{ totalPriceText[0] }}
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
        {{ totalPriceText[1] }}
      </div>

      <div
        v-if="pageContent.mobText"
        v-html="md.render(pageContent.mobText)"
        class="mob-text"
      ></div>

      <div class="calc__table" ref="answers" v-if="calcBlocks.length > 0">
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
              {{ item.title || 'Option' }}
            </div>
          </div>
          <div v-if="i !== 3" class="calc__plus">+</div>
        </div>
      </div>

      <div class="calc__price">
        {{ totalPriceText[0] }}
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
        {{ totalPriceText[1] }}
      </div>

      <br />

      <transition name="hint">
        <div class="hint" v-if="hintObj.description">
          <h3>
            <img src="/img/icons/question.svg" alt="Question icon" />
            {{ hintObj.title }}
          </h3>
          <p>{{ hintObj.description }}</p>
        </div>
      </transition>

      <div v-if="calculatorData.length === 0" class="no-content">
        <p>No calculator options available at the moment.</p>
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
