<script setup lang="ts">
const mobileNav = ref(false);
const nav = [
  {
    name: "Paslaugos",
    path: "/paslaugos",
  },
  {
    name: "Portfolio",
    path: "/",
  },
  {
    name: "JavaScript",
    path: "/javascript",
  },
  {
    name: "D.U.K.",
    path: "/duk",
  },
  {
    name: "Kaina",
    path: "/kaina",
  },
];
const socials = [
  {
    title: "Facebook",
    image: "facebook",
    link: "https://www.facebook.com/vladis.vaisov",
  },
  {
    title: "Linked In",
    image: "linkedin",
    link: "https://www.linkedin.com/in/vladimir-vaisov",
  },
  {
    title: "WhatsApp",
    image: "whatsapp",
    link: "https://wa.me/37060508501",
  },
  {
    title: "GitHub",
    image: "github",
    link: "https://github.com/mateholik",
  },
];
</script>
<template>
  <aside>
    <div class="aside">
      <!-- <Snow></Snow> -->
      <div class="aside__inner">
        <NuxtLink to="/" class="me">
          <div class="me__img">
            <img src="/img/me3.jpg" alt="profile image" />
          </div>
          <div class="me__title">Vladis Vaisov</div>
          <div class="me__subtitle">Front-End WEB programuotojas</div>
        </NuxtLink>
        <div class="nav">
          <div class="nav__mobile">
            <div class="socials socials--mobile">
              <ul class="socials__ul">
                <li
                  v-for="item in socials"
                  :key="item.title"
                  class="socials__li socials__li--mobile"
                >
                  <a class="socials__link" target="_blank" :href="item.link">
                    <nuxt-icon :name="item.image"></nuxt-icon>
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
            <li v-for="item in nav" class="nav__li" :key="item.name">
              <NuxtLink :to="item.path">{{ item.name }}</NuxtLink>
            </li>
          </ul>
          <Transition name="slide-menu" mode="out-in">
            <ul class="nav__ul" v-if="mobileNav">
              <li v-for="item in nav" :key="item.name" class="nav__li">
                <NuxtLink :to="item.path">{{ item.name }}</NuxtLink>
              </li>
            </ul>
          </Transition>
        </div>
        <div class="socials">
          <ul class="socials__ul">
            <li
              v-for="item in socials"
              :key="item.title"
              class="socials__li socials__li"
            >
              <a class="socials__link" target="_blank" :href="item.link">
                <nuxt-icon :name="item.image"></nuxt-icon>
                <span>{{ item.title }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Copyright></Copyright>
    </div>
  </aside>
</template>
