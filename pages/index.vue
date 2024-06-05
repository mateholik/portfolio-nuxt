<script setup>
const config = useRuntimeConfig();

const { find } = useStrapi();
const { data } = await find("websites", { populate: "*" });
</script>

<template>
  <div v-if="data" class="grid grid-cols-3 gap-8">
    <Card
      v-for="card in data"
      :key="card.id"
      :title="card.attributes.LinkTitle"
      :price="card.attributes.Price"
      :image="
        card.attributes.Image
          ? `${config.public.strapiApiUrl}${card.attributes.Image.data.attributes.url}`
          : ''
      "
      :url="card.attributes.LinkUrl"
    />
  </div>
</template>
