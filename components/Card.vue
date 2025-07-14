<script setup lang="ts">

type CardProps = {
  title: string;
  subTitle: string;
  image: string;
  url: string;
};

defineProps<CardProps>();
</script>

<template>
  <a :href="url" target="_blank" class="item" :style="`background-image: url(${image})`">
    <div class="item__mask" />
    <div class="item__price">{{ subTitle }}</div>
    <div class="item__name">{{ title }}</div>
  </a>
</template>
