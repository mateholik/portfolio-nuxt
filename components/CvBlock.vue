<script setup lang="ts">
type CvBlockProps = {
  imageUrl: string;
  title: string;
  subTitle: string;
  date: string;
  list?: string[];
  stack?: string;
  link?: string;
};

defineProps<CvBlockProps>();
</script>

<template>
  <div class="block">
    <div class="image">
      <img :src="imageUrl" :alt="subTitle" width="50" height="50" />
    </div>
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="sub-title">
        {{ subTitle }}
        <a
          v-if="link"
          :href="link"
          class="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/img/icons/link.png" alt=""
        /></a>
      </div>
      <div class="date">{{ date }}</div>

      <ul v-if="list">
        <li v-for="(item, index) in list" :key="index">{{ item }}</li>
      </ul>
      <div v-if="stack" class="stack"><span>Stack: </span>{{ stack }}</div>
    </div>
  </div>
</template>

<style scoped>
.block {
  display: flex;
  margin-bottom: 38px;
}
.image {
  margin-right: 20px;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
}
.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title {
  font-size: 24px;
  font-weight: bold;
}
.sub-title {
  font-size: 20px;
  color: #666;
  margin-bottom: 4px;
}
.date {
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
}
ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 12px;
}
li {
  margin-bottom: 4px;
}
.link img {
  width: 16px;
  height: 16px;
  margin-left: 8px;
}
.stack span {
  font-weight: bold;
}
</style>
