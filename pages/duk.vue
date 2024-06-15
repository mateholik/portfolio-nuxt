<script setup lang="ts">
import type { PageAttributes } from "~/types/strapiFaqPage";
const { data, pending, error, refresh } = await useAsyncData(
  "javascript-page",
  () => useStrapi().findOne<PageAttributes>("faq-page", { populate: "*" })
);
const content = data.value?.data.attributes;
const faqs = ref(content?.faqs.data);

faqs.value[0].open = true;

const toggle = (item, event) => {
  item.open = !item.open;
  setTimeout(() => {
    event.target.scrollIntoView({
      behavior: "smooth",
    });
  }, 250);
};
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
        <div class="item" v-for="(item, i) in faqs" :key="i">
          <h2
            @click="toggle(item, $event)"
            :class="{ open: item.open }"
            class="item__header"
          >
            <span>
              <img :src="`/img/icons/${item.attributes.iconName}.svg`" />
              {{ item.attributes.question }}
            </span>
            <img
              :class="{ rotate: item.open }"
              class="item__header-rot"
              src="/img/icons/arrow2.svg"
            />
          </h2>
          <transition
            name="faq-animation"
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutLeft"
          >
            <p
              v-if="item.open"
              v-html="item.attributes.answer"
              class="item__content"
            ></p>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>
