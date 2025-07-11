<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGetImage } from '~/composables/useGetImage';

// Simplified data fetching - controllers handle population
const { data, pending, error, refresh } = await useAsyncData('sidebar', () =>
  useStrapi().findOne('sidebar')
);

// Fix: The API returns { data: { ...attributes }, meta: {} }
const content = computed(() => (data.value as any)?.data);
const mobileNav = ref(false);

// Fallback menu items if not provided by API
const fallbackMenuItems = [
  { id: 1, title: 'Portfolio', path: '/' },
  { id: 2, title: 'JavaScript', path: '/javascript' },
  { id: 3, title: 'Services', path: '/paslaugos' },
  { id: 4, title: 'Price', path: '/kaina' },
  { id: 5, title: 'FAQ', path: '/duk' },
];

const router = useRouter();
watch(
  () => router.currentRoute.value,
  () => {
    mobileNav.value = false;
  }
);
</script>

<template>
  <aside>
    <div class="aside">
      <!-- <Snow></Snow> -->
      <div class="aside__inner">
        <div v-if="pending" class="loading">Loading...</div>

        <div v-else-if="error" class="error">Failed to load sidebar data.</div>

        <template v-else-if="content">
          <NuxtLink to="/" class="me">
            <div class="me__img">
              <img :src="useGetImage(content.image.url)" alt="profile image" />
            </div>
            <div class="me__title">{{ content.title }}</div>
            <div class="me__subtitle">{{ content.subTitle }}</div>
          </NuxtLink>
          <div class="nav">
            <div class="nav__mobile">
              <div class="socials socials--mobile">
                <ul class="socials__ul">
                  <li
                    v-for="item in content.social_links"
                    :key="item.id"
                    class="socials__li socials__li--mobile"
                  >
                    <a class="socials__link" target="_blank" :href="item.link">
                      <nuxt-icon :name="item.iconName"></nuxt-icon>
                      <span>{{ item.title }}</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div @click="mobileNav = !mobileNav" class="nav__mobile-btn">
                <img src="/img/icons/menu.svg" />
              </div>
            </div>
            <ul class="nav__ul--desktop">
              <li
                v-for="item in content.menu_items || fallbackMenuItems"
                class="nav__li"
                :key="item.id"
              >
                <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
              </li>
            </ul>
            <Transition name="slide-menu" mode="out-in">
              <ul class="nav__ul" v-if="mobileNav">
                <li
                  v-for="item in content.menu_items || fallbackMenuItems"
                  :key="item.id"
                  class="nav__li"
                >
                  <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
                </li>
              </ul>
            </Transition>
          </div>
          <div class="socials">
            <ul class="socials__ul">
              <li
                v-for="item in content.social_links"
                :key="item.id"
                class="socials__li socials__li"
              >
                <a class="socials__link" target="_blank" :href="item.link">
                  <nuxt-icon :name="item.iconName"></nuxt-icon>
                  <span>{{ item.title }}</span>
                </a>
              </li>
            </ul>
          </div>
        </template>
      </div>
      <Copyright></Copyright>
    </div>
  </aside>
</template>
