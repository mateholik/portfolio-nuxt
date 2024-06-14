<script setup lang="ts">
export type props = {
  location?: "bottom";
};
defineProps<props>();
const currentYear = () => {
  const date = new Date();
  return date.getFullYear();
};
</script>

<template>
  <p class="footer" :class="location === 'bottom' ? 'footer-bottom' : ''">
    © {{ currentYear() }} vladis.lt
  </p>
</template>
