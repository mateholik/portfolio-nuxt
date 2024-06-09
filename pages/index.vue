<script setup lang="ts">
import type { Website, StrapiResponse } from "~/types/website";
const config = useRuntimeConfig();

const { data } = await useAsyncData<StrapiResponse<Website>>("websites", () =>
  useStrapi().find("websites", { populate: "*" })
);

// Extract the websites data
const websites: Website[] =
  data.value?.data.map((item) => ({
    ...item.attributes,
    id: item.id,
  })) ?? [];
</script>

<template>
  <pre>{{ websites }}</pre>
  <div v-if="websites.length" class="grid grid-cols-3 gap-8">
    <Card
      v-for="card in websites"
      :key="card.id"
      :title="card.LinkTitle || ''"
      :price="card.Price"
      :image="
        card.Image.data.attributes
          ? `${config.public.strapiApiUrl}${card.Image.data.attributes.url}`
          : ''
      "
      :url="card.LinkUrl"
    />
  </div>
</template>
