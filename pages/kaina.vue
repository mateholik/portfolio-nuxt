<script setup lang="ts">
import NumberAnimation from 'vue-number-animation';
import { useCalculator } from '~/composables/useCalculator';
import { usePricePage, useLoadingState } from '~/composables/useStrapiData';
import { useSeoMetaCustom } from '~/composables/useSeoMetaCustom';
import { useMarkdown } from '~/composables/useMarkdown';

// Use the new centralized data fetching
const { data, pending, error, refresh } = await usePricePage();

// Enhanced loading state management
const { isLoading, hasError, isReady } = useLoadingState(pending, error);

// Computed properties for better template readability
const pageContent = computed(() => {
  return data.value;
});

const pageTitle = computed(() => {
  const title = pageContent.value?.pageTitle || 'Price Calculator';
  return title;
});

const totalPriceText = computed(() => {
  const text = pageContent.value?.totalPriceText?.split('<>') || ['Total: ', ' EUR'];
  return text;
});

// Transform calculator data to include active property
const calculatorData = computed(() => {
  const calculator = pageContent.value?.calculator || [];

  const transformed = calculator.map((block) => ({
    ...block,
    option: block.option.map((option) => ({
      ...option,
      active: false,
    })),
  }));

  return transformed;
});

const { totalPrice, selectOptionInBlock, initCalc, calcBlocks, hintObj, isInitialized } =
  useCalculator(calculatorData);

const theFormat = (value: number) => {
  return value.toFixed();
};

const { render } = useMarkdown();

// Single autostart mechanism that works for both SSR and client
const attemptAutostart = () => {
  if (calcBlocks.value.length > 0 && !isInitialized.value) {
    initCalc();
  }
};

// Watch for when calculator data becomes available
watch(
  () => calcBlocks.value.length,
  (newLength, _oldLength) => {
    if (newLength > 0) {
      // Small delay to ensure everything is ready
      nextTick(() => {
        setTimeout(() => {
          attemptAutostart();
        }, 100);
      });
    }
  }
);

// Ensure autostart when component is mounted (for SSR hydration)
onMounted(() => {
  // Give a bit more time for SSR hydration to complete
  setTimeout(() => {
    attemptAutostart();
  }, 300);
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
      <button class="retry-btn" @click="refresh">Retry</button>
    </div>

    <div v-else-if="isReady && pageContent" class="calc">
      <h1>
        <img src="/img/icons/euro.svg" alt="Euro icon">
        {{ pageTitle }}
      </h1>

      <div class="calc__price calc__price-top">
        {{ totalPriceText[0] }}
        <span class="calc__price-number">
          <ClientOnly>
            <NumberAnimation :from="0" :to="totalPrice" :format="theFormat" :duration="0.3" autoplay easing="linear" />
          </ClientOnly>
        </span>
        {{ totalPriceText[1] }}
      </div>

      <div v-if="pageContent.mobText" class="mob-text" v-html="render(pageContent.mobText)" />

      <div v-if="calcBlocks.length > 0" ref="answers" class="calc__table">
        <div v-for="(column, i) in calcBlocks" :key="i" style="flex: 1">
          <div class="calc__row">
            <div class="calc__column calc__column--main">
              {{ column.blockTitle }}
            </div>
            <div v-for="(item, index) in column.option" :key="index" class="calc__column"
              :class="{ active: item.active }" @click="selectOptionInBlock(item, i)">
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
            <NumberAnimation :from="0" :to="totalPrice" :format="theFormat" :duration="0.3" autoplay easing="linear" />
          </ClientOnly>
        </span>
        {{ totalPriceText[1] }}
      </div>

      <br>

      <transition name="hint">
        <div v-if="hintObj.description" class="hint">
          <h3>
            <img src="/img/icons/question.svg" alt="Question icon">
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
