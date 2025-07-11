<script setup lang="ts">
import NumberAnimation from 'vue-number-animation';
import { useCalculator } from '~/composables/useCalculator';
import markdownIt from 'markdown-it';

// Simplified data fetching - controllers handle population
const { data, pending, error, refresh } = await useAsyncData('price-page', () =>
  useStrapi().findOne('price-page')
);

// Fix: The API returns { data: { ...attributes }, meta: {} }
const content = computed(() => (data.value as any)?.data);

const { totalPrice, selectOptionInBlock, initCalc, calcBlocks, hintObj } =
  useCalculator(content.value?.calculator || []);

const theFormat = (value: number) => {
  return value.toFixed();
};

const md = markdownIt();
const totalPriceText = computed(
  () => content.value?.totalPriceText?.split('<>') || ['Total: ', ' EUR']
);

onMounted(() => {
  initCalc();
});
</script>

<template>
  <section>
    <div v-if="pending" class="loading">Loading price calculator...</div>

    <div v-else-if="error" class="error">
      Failed to load price calculator. Please try again.
    </div>

    <div v-else-if="content" class="calc">
      <h1>
        <img src="/img/icons/euro.svg" />
        {{ content.pageTitle }}
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
        v-if="content.mobText"
        v-html="md.render(content.mobText)"
        class="mob-text"
      ></div>

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
          <h3><img src="/img/icons/question.svg" />{{ hintObj.title }}</h3>
          <p>{{ hintObj.description }}</p>
        </div>
      </transition>
    </div>
  </section>
</template>
