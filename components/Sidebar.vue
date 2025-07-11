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
              <img
                :src="useGetImage(content.image.url)"
                :alt="content.image.alternativeText || 'profile image'"
              />
            </div>
            <div class="me__title">{{ content.title }}</div>
            <div class="me__subtitle">{{ content.subTitle }}</div>
          </NuxtLink>

          <nav class="nav">
            <ul class="nav__list">
              <li
                v-for="item in content.menu_items || fallbackMenuItems"
                :key="item.id"
                class="nav__item"
              >
                <NuxtLink
                  :to="item.path"
                  class="nav__link"
                  active-class="nav__link--active"
                >
                  {{ item.title }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <div class="social">
            <a
              v-for="social in content.social_links"
              :key="social.id"
              :href="social.link"
              class="social__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <nuxt-icon :name="social.iconName" />
              <span>{{ social.title }}</span>
            </a>
          </div>
        </template>
      </div>
      <Copyright></Copyright>
    </div>
  </aside>
</template>
