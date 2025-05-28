<template>
  <div class="app-container flex flex-col mt-16">
    <div class="flex flex-col items-center justify-center mb-6 w-full">
      <p
        class="relative text-secondary text-xs font-bold mb-1 text-center before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
      >
        {{ gallery?.galleryHeadingTitle }}
      </p>
      <h2 class="text-[32px] md:text-2xl font-bold text-center mb-2">
        {{ gallery?.galleryHeadingDescription }}
      </h2>
    </div>
    <ul
      v-if="gallery?.galleryList"
      class="w-full hidden md:grid grid-cols-4 grid-rows-2 gap-4 h-[35rem]"
    >
      <li
        v-for="item in gallery?.galleryList"
        :key="item.id"
        class="flex items-center justify-center rounded-[20px] relative before:absolute before:bg-gradient-to-t before:content-[''] before:from-slate-900 before:w-full before:h-full overflow-hidden [&:nth-child(1)]:row-span-2 [&:nth-child(3)]:col-span-2"
      >
        <NuxtImg
          provider="directus"
          :src="item.backgroundImage"
          :alt="item.backgroundImage"
          class="w-full h-full object-cover"
        />
      </li>
    </ul>
    <ul
      v-if="gallery?.galleryList"
      class="md:hidden w-full grid grid-cols-3 md:grid-cols-4 gap-5"
    >
      <li
        v-for="(item, index) in gallery?.galleryList"
        :key="index"
        class="flex items-center justify-center rounded-[20px] relative before:absolute before:bg-gradient-to-t before:content-[''] before:from-slate-900 before:w-full before:h-full overflow-hidden"
        :class="[
          index === 1 || index === 2 ? 'max-md:col-span-2' : '',
          index === gallery?.home?.galleryList.length - 2
            ? 'max-md:col-span-3 max-md:h-36'
            : '',
          index === gallery?.home?.galleryList.length - 1
            ? 'max-md:col-span-3 max-md:h-[35rem]'
            : '',
        ]"
      >
        <nuxt-img
          provider="directus"
          :src="item.backgroundImage"
          :alt="item.backgroundImage"
          class="w-full h-full object-cover"
        />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";

const { $directus } = useNuxtApp();
const { currentTranslation } = useTranslations();

const { data: galleryData } = await useAsyncData(
  QUERY_KEYS.pages.home.gallery,
  () =>
    $directus.query(`
  query {
    home {
      translations {
        id
        languages_id
        galleryHeadingTitle
        galleryHeadingDescription
      }
      galleryList {
        id
        backgroundImage
      }
    }
  }
`)
);

const gallery = computed(() => {
  return {
    ...galleryData.value?.home,
    ...galleryData.value?.home?.translations.find(
      (t: {
        languages_id: number;
        galleryHeadingTitle: string;
        galleryHeadingDescription: string;
      }) => t.languages_id.toString() === currentTranslation.value.id
    ),
  };
});
</script>
