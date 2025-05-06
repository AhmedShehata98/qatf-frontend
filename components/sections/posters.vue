<template>
  <ul
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 app-container mt-14"
  >
    <li
      class="overflow-hidden px-6 flex items-center justify-center bg-[#F4F6F9] h-64 rounded-full"
    >
      <NuxtImg
        :src="
          img(posters?.home.posterFarStartImage, undefined, {
            provider: 'directus',
          })
        "
        :alt="posters?.home.posterFarStartImage"
        class="max-w-full object-cover"
      />
    </li>
    <li
      class="overflow-hidden px-6 flex items-center justify-center bg-[#F4F6F9] h-64 rounded-full"
    >
      <NuxtImg
        :src="
          img(posters?.home.posterFarSecondImage, undefined, {
            provider: 'directus',
          })
        "
        :alt="posters?.home.posterFarSecondImage"
        class="max-w-full object-cover"
      />
    </li>
    <li
      class="overflow-hidden px-6 flex items-center justify-center max-md:h-48 h-64 col-span-2 rounded-full"
    >
      <NuxtImg
        :src="
          img(posters?.home.posterCenterdImage, undefined, {
            provider: 'directus',
          })
        "
        :alt="posters?.home.posterCenterdImage"
        class="max-w-full object-cover"
      />
    </li>
    <li
      class="overflow-hidden px-6 flex items-center justify-center bg-[#F4F6F9] h-64 rounded-full"
    >
      <NuxtImg
        :src="
          img(posters?.home.posterSecondEndImage, undefined, {
            provider: 'directus',
          })
        "
        :alt="posters?.home.posterSecondEndImage"
        class="max-w-full object-cover"
      />
    </li>
    <li
      class="overflow-hidden px-6 flex items-center justify-center bg-[#F4F6F9] h-64 rounded-full"
    >
      <NuxtImg
        :src="
          img(posters?.home.posterFarEndImage, undefined, {
            provider: 'directus',
          })
        "
        :alt="posters?.home.posterFarEndImage"
        class="max-w-full object-cover"
      />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";

const img = useImage();
const { $directus } = useNuxtApp();

const { data: posters } = await useAsyncData(
  QUERY_KEYS.pages.home.posters,
  () =>
    $directus.query(`
  query {
   home {
    posterFarStartImage
    posterFarSecondImage
    posterCenterdImage
    posterSecondEndImage
    posterFarEndImage
   }
  }
`)
);
</script>
