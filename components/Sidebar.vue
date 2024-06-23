<script setup lang="ts">
import { useRouter } from "vue-router";
import type { SidebarAttributes } from "~/types/strapiSidebar";

const { data, pending, error, refresh } = await useAsyncData("sidebar", () =>
  useStrapi().findOne<SidebarAttributes>("sidebar", {
    populate: {
      menu_items: true,
      social_links: true,
      image: {
        fields: ["url", "name"],
      },
    },
  })
);
const config = useRuntimeConfig();

const content = ref(data.value?.data.attributes);

const mobileNav = ref(false);

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
        <NuxtLink to="/" class="me">
          <div class="me__img">
            <img
              :src="
                config.public.strapiApiUrl + content?.image.data.attributes.url
              "
              alt="profile image"
            />
          </div>
          <div class="me__title">{{ content?.title }}</div>
          <div class="me__subtitle">{{ content?.subTitle }}</div>
        </NuxtLink>
        <div class="nav">
          <div class="nav__mobile">
            <div class="socials socials--mobile">
              <ul class="socials__ul">
                <li
                  v-for="item in content?.social_links.data"
                  :key="item.id"
                  class="socials__li socials__li--mobile"
                >
                  <a
                    class="socials__link"
                    target="_blank"
                    :href="item.attributes.link"
                  >
                    <nuxt-icon :name="item.attributes.iconName"></nuxt-icon>
                    <span>{{ item.attributes.title }}</span>
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
              v-for="item in content?.menu_items.data"
              class="nav__li"
              :key="item.id"
            >
              <NuxtLink :to="item.attributes.path">{{
                item.attributes.title
              }}</NuxtLink>
            </li>
          </ul>
          <Transition name="slide-menu" mode="out-in">
            <ul class="nav__ul" v-if="mobileNav">
              <li
                v-for="item in content?.menu_items.data"
                :key="item.id"
                class="nav__li"
              >
                <NuxtLink :to="item.attributes.path">{{
                  item.attributes.title
                }}</NuxtLink>
              </li>
            </ul>
          </Transition>
        </div>
        <div class="socials">
          <ul class="socials__ul">
            <li
              v-for="item in content?.social_links.data"
              :key="item.id"
              class="socials__li socials__li"
            >
              <a
                class="socials__link"
                target="_blank"
                :href="item.attributes.link"
              >
                <nuxt-icon :name="item.attributes.iconName"></nuxt-icon>
                <span>{{ item.attributes.title }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Copyright></Copyright>
    </div>
  </aside>
</template>
