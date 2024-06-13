<script setup lang="ts">
import { ref } from "vue";
import type { expandableBlockProps } from "~/types/props";

const props = defineProps<expandableBlockProps>();

const isVisible = ref(props.isVisible);

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};
</script>

<template>
  <h2 id="accordion-collapse-heading-2">
    <button
      @click="toggleVisibility"
      type="button"
      class="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 gap-3"
      :class="{ 'bg-gray-100 dark:bg-gray-700': isVisible }"
      data-accordion-target="#accordion-collapse-body-2"
      aria-expanded="false"
      aria-controls="accordion-collapse-body-2"
    >
      <span>{{ head }}</span>
      <svg
        data-accordion-icon
        class="w-3 h-3 rotate-180 shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5 5 1 1 5"
        />
      </svg>
    </button>
  </h2>
  <div
    id="accordion-collapse-body-2"
    :class="{ hidden: !isVisible }"
    aria-labelledby="accordion-collapse-heading-2"
  >
    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
      <div class="body text-gray-500 dark:text-gray-400" v-html="body"></div>
    </div>
  </div>
</template>

<style>
.body .medium {
  @apply font-bold text-black;
}
.body a {
  @apply text-blue-600 dark:text-blue-500 hover:underline;
}
</style>
