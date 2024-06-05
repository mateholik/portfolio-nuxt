<script setup>
const runtimeConfig = useRuntimeConfig();
const strapiUrl = runtimeConfig.public.strapiApiUrl;
const { data } = await useFetch(`${strapiUrl}/api/websites?populate=*`);
console.log({ data: data.value.data });
const cards = data.value.data;
</script>

<template>
  <div>
    <h1 class="my-8 text-red-200">Welcome to the homepage</h1>
    <!-- <pre>
    {{ cards[0].attributes.Image.data.attributes.url }}
   </pre
    > -->
    <div class="grid grid-cols-3 gap-8">
      <Card
        v-for="card in cards"
        :key="card.id"
        :title="card.attributes.LinkTitle"
        :price="card.attributes.Price"
        :image="strapiUrl + card.attributes.Image.data.attributes.url"
        :url="card.attributes.LinkUrl"
      />
    </div>
  </div>
</template>
