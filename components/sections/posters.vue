<template>
  <ul
    class="flex items-center justify-between gap-6 app-container mt-14 max-lg:flex-wrap"
  >
    <li
      class="overflow-hidden px-8 lg:px-6 flex items-center justify-center bg-[#F4F6F9] h-[13rem] md:h-[32rem] lg:h-64 w-[calc(50%-1.5rem)] min-w-36 xl:min-w-40 rounded-full"
    >
      <NuxtImg
        :src="
          img(posters?.home.posterFarStartImage, undefined, {
            provider: 'directus',
          })
        "
        :alt="posters?.home.posterFarStartImage"
        class="w-full object-cover"
      />
    </li>
    <li
      class="overflow-hidden px-8 lg:px-6 flex items-center justify-center bg-[#F4F6F9] h-[13rem] md:h-[32rem] lg:h-64 w-[calc(50%-1.5rem)] min-w-36 xl:min-w-40 rounded-full"
    >
      <NuxtImg
        :src="
          img(posters?.home.posterFarSecondImage, undefined, {
            provider: 'directus',
          })
        "
        :alt="posters?.home.posterFarSecondImage"
        class="w-full object-cover"
      />
    </li>
    <li
      class="overflow-hidden px-6 flex items-center justify-center max-md:h-48 h-64 col-span-2"
    >
      <NuxtImg
        :src="
          img(posters?.home.posterCenterdImage, undefined, {
            provider: 'directus',
          })
        "
        :alt="posters?.home.posterCenterdImage"
        class="w-full object-cover"
      />
    </li>
    <li
      class="overflow-hidden px-8 lg:px-6 flex items-center justify-center bg-[#F4F6F9] h-[13rem] md:h-[32rem] lg:h-64 w-[calc(50%-1.5rem)] min-w-36 xl:min-w-40 rounded-full"
    >
      <NuxtImg
        :src="
          img(posters?.home.posterSecondEndImage, undefined, {
            provider: 'directus',
          })
        "
        :alt="posters?.home.posterSecondEndImage"
        class="w-full object-cover"
      />
    </li>
    <li
      class="overflow-hidden px-8 lg:px-6 flex items-center justify-center bg-[#F4F6F9] h-[13rem] md:h-[32rem] lg:h-64 w-[calc(50%-1.5rem)] min-w-36 xl:min-w-40 rounded-full"
    >
      <NuxtImg
        :src="
          img(posters?.home.posterFarEndImage, undefined, {
            provider: 'directus',
          })
        "
        :alt="posters?.home.posterFarEndImage"
        class="w-full object-cover"
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
