<script setup lang="ts">
import NumberAnimation from 'vue-number-animation';
import type { PageAttributes } from '~/types/strapiPricePage';
import { useCalculator } from '~/composables/useCalculator';
import markdownIt from 'markdown-it';

// Simplified data fetching - controllers handle population
const { data, pending, error, refresh } = await useAsyncData('price-page', () =>
  useStrapi().findOne<PageAttributes>('price-page')
);

const content = computed(() => data.value?.data.attributes);

const { totalPrice, selectOptionInBlock, initCalc, calcBlocks, hintObj } =
  useCalculator(content.value?.calculator || []);

const theFormat = (value: number) => {
  return value.toFixed();
};

const md = markdownIt();
const totalPriceText = computed(
  () => content.value?.totalPriceText.split('<>') || []
);

onMounted(() => {
  initCalc();
});
</script>

<template>
  <section class="calc">
    <div v-if="pending" class="loading">Loading price calculator...</div>

    <div v-else-if="error" class="error">
      Failed to load price calculator. Please try again.
    </div>

    <div v-else-if="content">
      <!-- Calculator content here -->
      <div class="calc__blocks">
        <div
          v-for="(block, blockIndex) in calcBlocks"
          :key="block.id"
          class="calc__block"
        >
          <h3>{{ block.blockTitle }}</h3>
          <div class="calc__options">
            <div
              v-for="option in block.option"
              :key="option.id"
              class="calc__option"
              :class="{ 'calc__option--active': option.active }"
              @click="selectOptionInBlock(option, blockIndex)"
            >
              <span>{{ option.title }}</span>
              <span>{{ option.price }}€</span>
            </div>
          </div>
        </div>
      </div>

      <div class="calc__total">
        <span>{{ totalPriceText[0] }}</span>
        <NumberAnimation
          :from="0"
          :to="totalPrice"
          :format="theFormat"
          :duration="1000"
          autoplay
          easing="easeOutQuad"
        />
        <span>{{ totalPriceText[1] }}</span>
      </div>

      <div v-if="hintObj.title" class="calc__hint">
        <h4>{{ hintObj.title }}</h4>
        <p>{{ hintObj.description }}</p>
      </div>
    </div>
  </section>
</template>
