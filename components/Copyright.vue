<script setup lang="ts">
const currentYear = () => {
  const date = new Date();
  return date.getFullYear();
};
</script>

<template>
  <p class="footer">© {{ currentYear() }} vladis.lt</p>
</template>
