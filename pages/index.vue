<script setup lang="ts">
const config = useRuntimeConfig();

const { data, pending, error, refresh } = await useAsyncData(
  "portfolio-page",
  () => useStrapi().findOne("portfolio-page")
);

const content = data?.value?.data;
</script>

<template>
  <h1 class="text-4xl mb-8">{{ content?.title }}</h1>
  <div v-for="block in content?.websites" :key="block.id">
    <h2 class="text-3xl mb-8">{{ block.title }}</h2>
    <div class="grid grid-cols-3 gap-8 mb-16">
      <Card
        v-for="card in block.card"
        :key="card.id"
        :title="card.title"
        :subTitle="card.subTitle"
        :image="config.public.strapiApiUrl + card.image.url"
        :url="card.url"
      />
    </div>
  </div>
</template>
