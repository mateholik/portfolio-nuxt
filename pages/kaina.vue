<script setup lang="ts">
// import NumberAnimation from "vue-number-animation";
import type { PageAttributes, Option } from "~/types/strapiPricePage";
import { useCalculator } from "~/composables/useCalculator";

const { data, pending, error, refresh } = await useAsyncData("price-page", () =>
  useStrapi().findOne<PageAttributes>("price-page", {
    populate: {
      calculator: {
        populate: "*",
      },
    },
  })
);

const content = ref(data.value?.data.attributes);

const { totalPrice, selectOptionInBlock, initCalc, calcBlocks, hintObj } =
  useCalculator(content?.value?.calculator || []);

onMounted(() => {
  initCalc();
});
</script>

<template>
  <section>
    <div class="calc">
      <h1>
        <img src="/img/icons/euro.svg" />
        Kainos skaičiuoklė
      </h1>
      <div class="calc__price calc__price-top">
        Apytikslė kaina
        <span class="calc__price-number">
          <!-- <animated-number
            :value="totalPrice"
            :duration="300"
            :formatValue="formatToPrice"
          /> -->
        </span>
        eu.
      </div>

      <div class="mob-text">
        Trumpą kiekvieno punkto paaiškinimą rasite
        <strong>po</strong> skaičiuokle
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
        Apytikslė kaina
        <span class="calc__price-number">
          {{ totalPrice }}
          <!-- <AnimatedNumber
            :value="totalPrice"
            :duration="300"
            :formatValue="formatToPrice"
          /> -->
          <!-- <NumberAnimation
            ref="number1"
            :from="100"
            :to="10000"
            :duration="300"
            autoplay
            easing="linear"
          /> -->
        </span>
        eu.
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
