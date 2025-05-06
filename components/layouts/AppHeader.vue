<template>
  <header class="relative bg-background border-b border-gray-200">
    <div
      class="app-container flex items-center justify-between py-2 max-tablet:flex-row-reverse"
    >
      <!-- Logo -->
      <div>
        <nuxt-img
          provider="directus"
          :src="data?.appHeader.logo"
          alt="logo"
          class="h-14 tablet:h-10"
        />
      </div>
      <button
        v-if="!isOpenMenu"
        type="button"
        @click="isOpenMenu = !isOpenMenu"
        class="tablet:hidden"
      >
        <nuxt-img
          provider="directus"
          :src="data?.appHeader.openSideNaviationMenuIcon"
          alt="open side navigation menu"
          class="h-9"
        />
      </button>
      <button
        v-if="isOpenMenu"
        type="button"
        @click="isOpenMenu = !isOpenMenu"
        class="tablet:hidden"
      >
        <nuxt-img
          provider="directus"
          :src="data?.appHeader.closeSideNaviationMenuIcon"
          alt="close side navigation menu"
          class="h-9"
        />
      </button>
      <!-- Navigation -->
      <nav class="hidden tablet:flex items-center gap-2 rtl:space-x-reverse">
        <NuxtLink
          to="/"
          class="header__nav_link"
          :class="
            $route.path === '/' && $route.path.endsWith('/')
              ? 'header__nav_link_active'
              : ''
          "
          >الرئيسية</NuxtLink
        >
        <NuxtLink
          to="/about-us"
          class="header__nav_link"
          :class="
            $route.fullPath.endsWith('/about-us')
              ? 'header__nav_link_active'
              : ''
          "
          >من نحن</NuxtLink
        >
        <NuxtLink
          to="/daily-pricing"
          class="header__nav_link"
          :class="
            $route.fullPath.endsWith('/daily-pricing')
              ? 'header__nav_link_active'
              : ''
          "
          >تسعيرة اليوم</NuxtLink
        >
      </nav>
      <!-- Actions -->
      <div class="hidden tablet:flex items-center gap-4 rtl:space-x-reverse">
        <button
          type="button"
          class="relative bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
          @click="showModal"
        >
          <p
            v-show="getCartQuantity() > 0"
            class="absolute -top-1.5 -right-3 size-5.5 bg-secondary rounded-full flex items-center justify-center text-xs p-1 text-white overflow-hidden shadow-md"
          >
            {{ getCartQuantity() < 99 ? getCartQuantity() : "99+" }}
          </p>
          <nuxt-img
            provider="directus"
            :src="data?.appHeader.cartButtonIcon"
            alt="open side navigation menu"
            class="h-6"
          />
        </button>
        <NuxtLink
          :href="data?.appHeader.ctaButtonHref"
          class="px-5 py-2 border rounded-full border-black text-black hover:border-primary hover:text-primary transition-colors"
        >
          {{ data?.appHeader.ctaButtonLabel }}
        </NuxtLink>
      </div>

      <!-- mobile nav menu -->
      <div
        class="fixed top-17 left-0 z-[600] bg-background w-full min-h-screen flex items-start justify-start pt-8 transition-transform"
        :class="isOpenMenu ? 'translate-x-0' : 'translate-x-[150%]'"
      >
        <nav class="w-full grid grid-flow-row h-full gap-2 min-h-full">
          <NuxtLink
            to="/"
            class="header__nav_link"
            :class="$route.path === '/' ? 'header__nav_link_active' : ''"
            @click="isOpenMenu = !isOpenMenu"
            >الرئيسية</NuxtLink
          >
          <NuxtLink
            to="/about-us"
            class="header__nav_link"
            :class="
              $route.fullPath.endsWith('/about-us')
                ? 'header__nav_link_active'
                : ''
            "
            @click="isOpenMenu = !isOpenMenu"
            >من نحن</NuxtLink
          >
          <NuxtLink
            to="/daily-pricing"
            class="header__nav_link"
            :class="
              $route.fullPath.endsWith('/daily-pricing')
                ? 'header__nav_link_active'
                : ''
            "
            @click="isOpenMenu = !isOpenMenu"
            >تسعيرة اليوم</NuxtLink
          >
          <button
            type="button"
            class="px-3 py-2 flex flex-row items-center justify-start gap-6"
            :class="isOpenModal ? 'header__nav_link_active' : ''"
            @click="
              () => {
                showModal();
                isOpenMenu = !isOpenMenu;
              }
            "
          >
            <p>السلة</p>
            <p
              v-show="getCartQuantity() > 0"
              class="size-6 bg-secondary rounded-sm flex items-center justify-center text-sm p-1 text-white overflow-hidden shadow-md"
            >
              {{ getCartQuantity() < 99 ? getCartQuantity() : "99+" }}
            </p>
          </button>
          <NuxtLink
            to="/contact-us"
            class="header__nav_link"
            :class="
              $route.fullPath.endsWith('/contact-us')
                ? 'header__nav_link_active'
                : ''
            "
            @click="isOpenMenu = !isOpenMenu"
            >تواصل معنا</NuxtLink
          >
        </nav>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";

const isOpenMenu = shallowRef(false);
const { showModal, isOpenModal } = useShowCartModal();
const { getCartQuantity } = useCart();
const { $directus } = useNuxtApp();

const { data, error } = await useAsyncData(
  QUERY_KEYS.globalConfig.appHeader,
  () =>
    $directus.query(`
    query {
      appHeader {
        id
        logo
        openSideNaviationMenuIcon
        closeSideNaviationMenuIcon
        cartButtonIcon
        ctaButtonLabel
        ctaButtonHref
      }
    }
  `)
);

watch(isOpenMenu, (newValue) => {
  if (import.meta.client) {
    if (newValue) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = "auto";
  }
});
</script>
