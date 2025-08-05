<script setup lang="ts">
import SocialsCta from '~/components/SocialsCta.vue';
</script>

<template>
  <div>
    <Sidebar />
    <div class="container">
      <slot />
      <SocialsCta />
      <Copyright class="footer-bottom" />
    </div>
  </div>
</template>
