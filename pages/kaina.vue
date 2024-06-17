<script setup lang="ts">
import type { PageAttributes } from "~/types/strapiFaqPage";
import NumberAnimation from "vue-number-animation";
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

const hint = ref("");
const hintLabel = ref("Pasirinkto punkto paaiškinimas");
const totalPrice = ref(0);

const recalculateTotal = () => {
  let total = 0;
  const options = content.value.calculator.flatMap((block) => block.option);

  options.forEach((option) => {
    if (option.active) total += option.price;
  });
  totalPrice.value = total;
};
const selectOptionInBlock = (option, blockIndex) => {
  content.value.calculator[blockIndex].option.forEach((option) => {
    option.active = false;
  });

  option.active = true;
  recalculateTotal();

  hintLabel.value =
    content.value.calculator[blockIndex].blockTitle + " -> " + option.title;
  hint.value = option.description;
};
onMounted(() => {
  showSteps();
});
const showSteps = () => {
  let timer = 500;
  for (let i = 0; i < content.value.calculator.length; i++) {
    setTimeout(() => {
      content.value.calculator[i].option[i % 2 === 0 ? 0 : 1].active = true;
      recalculateTotal();
    }, timer);
    timer += 500;
  }
};
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
        <div v-for="(column, i) in content.calculator" :key="i" style="flex: 1">
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
        <div class="hint" v-if="hintLabel.length > 0" :key="hint">
          <h3><img src="/img/icons/question.svg" />{{ hintLabel }}</h3>
          <p>{{ hint }}</p>
        </div>
      </transition>
    </div>
  </section>
</template>
