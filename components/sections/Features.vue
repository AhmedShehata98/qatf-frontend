<template>
  <div class="app-container flex flex-col gap-5 mt-10">
    <figure class="w-full h-96 rounded-[20px] overflow-hidden">
      <NuxtImg
        provider="directus"
        :src="features?.home?.servicesHeroImage"
        alt="01.webp"
        class="!w-full max-md:!h-full object-cover rounded-[20px]"
      />
    </figure>
    <ul
      v-if="features?.home?.servicesList"
      class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <li
        v-for="(stat, idx) of features?.home?.servicesList"
        :key="idx"
        class="flex flex-col gap-1.5 shadow-2xl p-5 rounded-[24px]"
        :style="{
          order: stat.isActive ? 1 : idx + 1,
        }"
        :class="[stat.isActive ? 'bg-primary' : `bg-white`]"
      >
        <h3
          class="text-5xl font-extrabold text-start"
          :class="stat.isActive ? 'text-white' : 'text-black'"
        >
          {{ stat.title }}
        </h3>
        <p
          class="text-xl font-bold"
          :class="stat.isActive ? 'text-white' : 'text-black'"
        >
          {{ stat.description }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";

const { $directus } = useNuxtApp();

const { data: features } = await useAsyncData(
  QUERY_KEYS.pages.home.features,
  () =>
    $directus.query(`
  query {
   home {
    servicesHeroImage
    servicesList {
      id
      title
      description
      isActive
    }
   }
  }
`)
);
</script>
