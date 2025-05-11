<template>
  <footer
    class="bg-primary text-white bg-fixed bg-cover bg-no-repeat bg-center"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="bg-primary/80 flex items-center justify-center pt-10 flex-col">
      <!-- Main Footer Content -->
      <div
        class="app-container w-full flex items-start justify-between max-md:gap-7 gap-20 border-white/30 max-lg:flex-wrap"
      >
        <!-- Description & Logo -->
        <div
          class="flex flex-col items-start md:col-span-2 space-y-4 text-right w-full md:w-1/3"
        >
          <NuxtImg
            provider="directus"
            :src="`${data?.appFooter?.logoImage}`"
            alt="Qatf Farm Logo White"
            class="h-15 mb-4 ml-auto"
          />
          <p class="text-sm leading-relaxed">
            {{ data?.appFooter.description }}
          </p>
          <!-- Social Media Icons -->
          <div
            v-if="data?.appFooter.socialMedia"
            class="flex justify-end gap-4 pt-4 max-md:w-full max-md:justify-center"
          >
            <a
              v-for="platform of data?.appFooter.socialMedia"
              :key="platform.id"
              :href="platform.platformUrl"
              :aria-label="platform.platformUrl"
              class="hover:opacity-80 max-md:w-12"
            >
              <NuxtImg
                provider="directus"
                :src="`${platform.icon}`"
                :alt="platform.id"
                class="max-md:w-full"
              />
            </a>
          </div>
        </div>
        <!-- Navigation Links -->
        <nav
          v-if="navigationLinks"
          class="w-full md:w-1/2 flex flex-wrap gap-x-6 gapy-3 items-center justify-center h-fit self-center"
        >
          <template v-for="link of navigationLinks" :key="link.id">
            <NuxtLink
              v-if="link.path"
              :to="link.path"
              class="block hover:underline"
              >{{ link.title }}</NuxtLink
            >
            <button v-if="!link.path" type="button" @click="link.onClick">
              {{ link.title }}
            </button>
          </template>
        </nav>

        <!-- Contact Info -->
        <div class="w-full md:w-1/3 space-y-4">
          <h3 class="text-xl font-semibold mb-4">للتواصل معنا</h3>
          <div class="not-italic space-y-4 rtl:text-end">
            <span
              class="block p-2 bg-gradient-to-r from-primary/90 to-[#ffffff96] rounded-lg before:rounded-lg relative before:absolute before:content-[''] before:inset-[1px] before:bg-gradient-to-r before:from-primary/50 before:to-primary/80"
            >
              <nuxt-link
                dir="ltr"
                :href="`tel:${data?.appFooter.contactPhone}`"
                class="block hover:underline isolate"
                >{{ data?.appFooter.contactPhone }}</nuxt-link
              >
              <nuxt-link
                :href="`mailto:${data?.appFooter.contactEmail}`"
                class="block hover:underline text-start isolate"
                >{{ data?.appFooter.contactEmail }}</nuxt-link
              >
            </span>
            <span
              class="block p-2 bg-gradient-to-l from-primary/90 to-[#ffffff96] rounded-lg before:rounded-lg relative before:absolute before:content-[''] before:inset-[1px] before:bg-gradient-to-l before:from-primary/50 before:to-primary/80"
            >
              <address class="isolate p-3">
                {{ data?.appFooter.address }}
              </address>
            </span>
          </div>
        </div>
      </div>

      <!-- Copyright & Policy -->
      <div
        class="w-full flex flex-col md:flex-row justify-between items-center text-sm text-white/80 bg-primary/40 brightness-150 py-6 mt-6"
      >
        <span
          class="w-full app-container max-md:flex-wrap flex items-center justify-between"
        >
          <p class="max-md:w-full text-center">
            {{
              data?.appFooter.copyRightsText?.replace(
                "{copyrightYear}",
                copyRightYear
              )
            }}
          </p>
          <NuxtLink
            to="/privacy-and-terms"
            class="hover:underline mt-2 md:mt-0 max-md:w-full text-center"
            >{{ data?.appFooter.termsOfPrivacyLabel }}</NuxtLink
          >
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { QUERY_KEYS } from "~/constants/query-keys";

const copyRightYear = shallowRef(new Date().getFullYear());
const { $directus } = useNuxtApp();
const { showModal } = useShowCartModal();
const navigationLinks = [
  {
    id: 1,
    title: "الرئيسية",
    path: "/",
    onClick: undefined,
  },
  {
    id: 2,
    title: "من نحن",
    path: "/about-us",
    onClick: undefined,
  },
  {
    id: 3,
    title: "تسعيرة اليوم",
    path: "/daily-pricing",
    onClick: undefined,
  },
  {
    id: 4,
    title: "السلة",
    path: undefined,
    onClick: () => showModal(),
  },
  {
    id: 5,
    title: "تواصل معنا",
    path: "/contact-us",
    onClick: undefined,
  },
];
const img = useImage();
const { data } = await useAsyncData(QUERY_KEYS.globalConfig.appFooter, () =>
  $directus.query(
    `
  query {
    appFooter {
      id
      logoImage
      description
      headingTitle
      contactPhone
      contactEmail
      address 
      copyRightsText
      termsOfPrivacyLabel
      backgroundImage
      socialMedia {
        id
        icon
        platformUrl
      }
    }
  }
`
  )
);
const backgroundImage = img(data.value.appFooter.backgroundImage, undefined, {
  provider: "directus",
});
</script>
