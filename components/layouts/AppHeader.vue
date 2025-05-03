<template>
  <header class="relative bg-background border-b border-gray-200">
    <div
      class="app-container flex items-center justify-between py-2 max-tablet:flex-row-reverse"
    >
      <!-- Logo -->
      <div>
        <NuxtImg
          src="icons/shared/logo-primary.svg"
          alt="Qatf Farm Logo"
          class="h-14 tablet:h-10"
        />
      </div>
      <button
        v-if="!isOpenMenu"
        type="button"
        @click="isOpenMenu = !isOpenMenu"
        class="tablet:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="1.5"
            d="M20 7H4m16 5H4m16 5H4"
          />
        </svg>
      </button>
      <button
        v-if="isOpenMenu"
        type="button"
        @click="isOpenMenu = !isOpenMenu"
        class="tablet:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
          />
        </svg>
      </button>
      <!-- Navigation -->
      <nav class="hidden tablet:flex items-center gap-6 rtl:space-x-reverse">
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
        <NuxtLink
          to="/cart"
          class="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.00002 5.41602H13C15.8334 5.41602 16.1167 6.74101 16.3084 8.35768L17.0584 14.6077C17.3 16.6577 16.6667 18.3327 13.75 18.3327H6.25835C3.33335 18.3327 2.70002 16.6577 2.95002 14.6077L3.70003 8.35768C3.88336 6.74101 4.16669 5.41602 7.00002 5.41602Z"
              stroke="white"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.66602 6.66602V3.74935C6.66602 2.49935 7.49935 1.66602 8.74935 1.66602H11.2493C12.4993 1.66602 13.3327 2.49935 13.3327 3.74935V6.66602"
              stroke="white"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.0077 14.1914H6.66602"
              stroke="white"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </NuxtLink>
        <NuxtLink
          to="/contact-us"
          class="px-5 py-2 border rounded-full border-black text-black hover:border-primary hover:text-primary transition-colors"
        >
          تواصل معنا
        </NuxtLink>
      </div>

      <!-- mobile nav menu -->
      <div
        class="fixed top-17 left-0 z-[600] bg-background w-full min-h-screen flex items-start justify-start pt-8 transition-transform"
        :class="isOpenMenu ? 'translate-x-0' : 'translate-x-[150%]'"
      >
        <nav class="w-full grid grid-flow-row h-full min-h-full">
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
          <NuxtLink
            to="/cart"
            class="header__nav_link"
            :class="
              $route.fullPath.endsWith('/cart') ? 'header__nav_link_active' : ''
            "
            @click="isOpenMenu = !isOpenMenu"
            >السلة</NuxtLink
          >
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
const isOpenMenu = shallowRef(false);

// Watch isOpenMenu changes to toggle body scroll
watch(isOpenMenu, (newValue) => {
  if (import.meta.client) {
    if (newValue) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
});

// Clean up on component unmount
onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = "auto";
  }
});
</script>
