<script setup lang="ts">
import { GoTop } from "@inotom/vue-go-top";
</script>

<template>
  <div>
    <Sidebar />
    <div class="container">
      <slot />
      <go-top
        :size="40"
        bg-color="rgba(215, 117, 19, 0.9)"
        :bottom="50"
        :max-width="319"
        :right="20"
      ></go-top>
      <Copyright class="footer-bottom" />
    </div>
  </div>
</template>
