<script setup lang="ts">

type CardProps = {
  title: string;
  subTitle: string;
  image: string;
  url: string;
  loading?: 'eager' | 'lazy';
  fetchpriority?: 'high' | 'low' | 'auto';
};

withDefaults(defineProps<CardProps>(), {
  loading: 'lazy',
  fetchpriority: 'auto'
});
</script>

<template>
  <a :href="url" target="_blank" class="item">
    <img class="item__image" :src="image" :alt="title" :loading="loading" :fetchpriority="fetchpriority" width="300"
      height="160">
    <div class="item__mask" />
    <div class="item__price">{{ subTitle }}</div>
    <div class="item__name">{{ title }}</div>
  </a>
</template>
