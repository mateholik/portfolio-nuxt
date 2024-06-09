<script setup lang="ts">
import type { cardProps, Website } from "~/types";
const config = useRuntimeConfig();

const { data } = await useAsyncData("websites", () =>
  useStrapi().find<Website>("websites", { populate: "*" })
);

const websites = data.value?.data || [];

const mapToCardProps = (websites: Website[]): cardProps[] => {
  return websites.map((website) => ({
    price: website.Price || "",
    image: config.public.strapiApiUrl + website.Image?.url || "",
    title: website.LinkTitle || "",
    url: website.LinkUrl || "",
  }));
};
const websitesFormatted = mapToCardProps(websites);
</script>

<template>
  <div v-if="websitesFormatted.length" class="grid grid-cols-3 gap-8">
    <Card
      v-for="card in websitesFormatted"
      :key="card.title"
      :title="card.title"
      :price="card.price"
      :image="card.image"
      :url="card.url"
    />
  </div>
</template>
