<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSidebarData, useLoadingState } from '~/composables/useStrapiData';
import { useGetImage } from '~/composables/useGetImage';

// Use the new centralized data fetching (no SEO for sidebar)
const { data, pending, error } = await useSidebarData();

// Enhanced loading state management
const { isLoading, hasError, isReady } = useLoadingState(pending, error);

// Computed properties for better template readability
const sidebarContent = computed(() => data.value);
const socialLinks = computed(() => sidebarContent.value?.social_links || []);
const menuItems = computed(
  () => sidebarContent.value?.menu_items || fallbackMenuItems
);
const profileImage = computed(() =>
  sidebarContent.value?.image?.url
    ? useGetImage(sidebarContent.value.image.url)
    : '/img/me.jpg'
);

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
        <div v-if="isLoading" class="loading">
          <p>Loading...</p>
        </div>

        <div v-else-if="hasError" class="error">
          <p>Failed to load sidebar data.</p>
        </div>

        <template v-else-if="isReady && sidebarContent">
          <NuxtLink to="/" class="me">
            <div class="me__img">
              <img :src="profileImage" alt="Profile image">
            </div>
            <div class="me__title">{{ sidebarContent.title }}</div>
            <div class="me__subtitle">{{ sidebarContent.subTitle }}</div>
          </NuxtLink>

          <div class="nav">
            <div class="nav__mobile">
              <div v-if="socialLinks.length > 0" class="socials socials--mobile">
                <ul class="socials__ul">
                  <li v-for="item in socialLinks" :key="item.id" class="socials__li socials__li--mobile">
                    <a class="socials__link" target="_blank" :href="item.link">
                      <nuxt-icon :name="item.iconName" />
                      <span>{{ item.title }}</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div class="nav__mobile-btn" @click="mobileNav = !mobileNav">
                <img src="/img/icons/menu.svg" alt="Menu">
              </div>
            </div>

            <ul class="nav__ul--desktop">
              <li v-for="item in menuItems" :key="item.id" class="nav__li">
                <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
              </li>
            </ul>

            <Transition name="slide-menu" mode="out-in">
              <ul v-if="mobileNav" class="nav__ul">
                <li v-for="item in menuItems" :key="item.id" class="nav__li">
                  <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
                </li>
              </ul>
            </Transition>
          </div>

          <div v-if="socialLinks.length > 0" class="socials">
            <ul class="socials__ul">
              <li v-for="item in socialLinks" :key="item.id" class="socials__li socials__li">
                <a class="socials__link" target="_blank" :href="item.link">
                  <nuxt-icon :name="item.iconName" />
                  <span>{{ item.title }}</span>
                </a>
              </li>
            </ul>
          </div>
        </template>
      </div>
      <Copyright />
    </div>
  </aside>
</template>

<style scoped>
.loading,
.error {
  text-align: center;
  padding: 1rem;
  color: #666;
}

.error {
  color: #dc2626;
}
</style>
