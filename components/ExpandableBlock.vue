<script setup lang="ts">
import { useMarkdown } from '~/composables/useMarkdown';

type ExpandableBlockProps = {
  isOpen: boolean;
  iconName: string;
  question: string;
  answer: string;
}

const props = defineProps<ExpandableBlockProps>();

const { render } = useMarkdown();

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
    <h2 :class="{ open: isOpen }" class="item__header" @click="toggle($event)">
      <span>
        <img :src="`/img/icons/${iconName}.svg`">
        {{ question }}
      </span>
      <img :class="{ rotate: isOpen }" class="item__header-rot" :src="`/img/icons/arrow2.svg`">
    </h2>
    <transition name="faq-animation" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
      <p v-if="isOpen" class="item__content" v-html="render(answer)" />
    </transition>
  </div>
</template>

<style></style>
