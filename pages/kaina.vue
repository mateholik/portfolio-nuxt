<script setup lang="ts">
import type { PageAttributes } from "~/types/strapiFaqPage";
const { data, pending, error, refresh } = await useAsyncData("price-page", () =>
  useStrapi().findOne<PageAttributes>("price-page", {
    populate: {
      calculator: {
        populate: "*",
      },
    },
  })
);

const content = data.value?.data.attributes;
</script>

<template>
  <div>
    <pre>{{ content }}</pre>
  </div>
</template>
