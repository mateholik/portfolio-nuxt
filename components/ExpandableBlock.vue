<script setup lang="ts">
import type { expandableBlockProps } from '~/types/props';
import markdownIt from 'markdown-it';

const props = defineProps<expandableBlockProps>();

const md = markdownIt();

const isOpen = ref(props.isOpen);

const toggle = (event: Event) => {
  isOpen.value = !isOpen.value;
  setTimeout(() => {
    const target = event.target as HTMLElement | null;
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, 250);
};
</script>

<template>
  <div class="item">
    <h2 @click="toggle($event)" :class="{ open: isOpen }" class="item__header">
      <span>
        <img :src="`/img/icons/${iconName}.svg`" />
        {{ question }}
      </span>
      <img
        :class="{ rotate: isOpen }"
        class="item__header-rot"
        :src="`/img/icons/arrow2.svg`"
      />
    </h2>
    <transition
      name="faq-animation"
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
      <p v-if="isOpen" v-html="md.render(answer)" class="item__content"></p>
    </transition>
  </div>
</template>

<style></style>
