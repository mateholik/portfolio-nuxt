<script setup lang="ts">
// @ts-expect-error - vue-go-top doesn't have proper TypeScript declarations
import { GoTop } from "@inotom/vue-go-top";
</script>

<template>
  <div>
    <Sidebar />
    <div class="container">
      <slot />
      <GoTop :size="40" bg-color="rgba(215, 117, 19, 0.9)" :bottom="50" :max-width="319" :right="20" />
      <Copyright class="footer-bottom" />
    </div>
  </div>
</template>
