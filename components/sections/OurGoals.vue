<template>
  <section
    class="flex flex-col items-center justify-start container app-container pt-2 gap-2.5"
  >
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-10 tablet:gap-20 items-center justify-start"
    >
      <ul class="grid grid-cols-2 items-start justify-start gap-3 tablet:gap-5">
        <li class="w-full h-44 rounded-lg overflow-hidden">
          <nuxt-img
            provider="directus"
            :src="ourGoalsMapped.firstImage"
            class="w-full h-full object-cover"
          />
        </li>
        <li class="w-full h-44 rounded-lg overflow-hidden">
          <nuxt-img
            provider="directus"
            :src="ourGoalsMapped.secondImage"
            class="w-full h-full object-cover"
          />
        </li>
        <div
          class="col-span-2 flex items-start justify-start gap-3 tablet:gap-5"
        >
          <li class="w-60 h-44 rounded-lg overflow-hidden">
            <nuxt-img
              provider="directus"
              :src="ourGoalsMapped.thirdImage"
              class="w-full h-full object-cover"
            />
          </li>
          <li class="w-full h-44 rounded-lg overflow-hidden">
            <nuxt-img
              provider="directus"
              :src="ourGoalsMapped.forthImage"
              class="w-full h-full object-cover"
            />
          </li>
        </div>
      </ul>
      <div class="flex flex-col items-start justify-start gap-2 tablet:gap-1.5">
        <p
          class="relative text-secondary max-md:text-base text-xs font-bold mb-1 text-start before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
        >
          {{ ourGoalsMapped.title }}
        </p>
        <h3 class="text-3xl md:text-4xl text-start font-bold">
          {{ ourGoalsMapped.headingTitle }}
        </h3>
        <p class="text-start text-sm md:text-base text-black/70 mt-6">
          {{ ourGoalsMapped.description }}
        </p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";

const { $directus } = useNuxtApp();
const { data: ourGoals } = useAsyncData(QUERY_KEYS.pages.home.ourGoals, () =>
  $directus.query(`
    query {
        out_goals {
            id
            translations {
                languages_id
                title
                headingTitle
                description
            }
            firstImage
            secondImage
            thirdImage
            forthImage
        }
    }
`)
);

const { getLocaleObject, currentLocale } = useI18n();
const locale = computed(() => getLocaleObject(currentLocale.value));

const ourGoalsMapped = computed(() => ({
  ...ourGoals.value?.out_goals,
  ...ourGoals.value?.out_goals.translations.find(
    (translation: any) =>
      translation.languages_id.toString() === locale.value.id
  ),
}));
</script>
