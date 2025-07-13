<script setup lang="ts">
import type { cardProps } from "~/types/props";

defineProps<cardProps>();
</script>

<template>
  <a
    :href="url"
    target="_blank"
    class="item"
    :style="`background-image: url(${image})`"
  >
    <div class="item__mask"/>
    <div class="item__price">{{ subTitle }}</div>
    <div class="item__name">{{ title }}</div>
  </a>
</template>
