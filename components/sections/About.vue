<template>
  <div
    class="app-container flex flex-col justify-start items-start gap-2 mt-16 pb-8"
  >
    <span class="w-full flex flex-col gap-3">
      <p
        class="relative w-fit text-secondary max-md:text-base text-xs font-bold mb-1 text-start before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
      >
        {{ about?.aboutHeadingTitle }}
      </p>
      <h3
        class="text-black font-bold text-[32px] lg:text-[44px] text-start ltr:leading-tight"
      >
        {{ about?.aboutHeadingDescription }}
      </h3>
    </span>
    <ul
      class="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6 md:[&>:nth-child(odd)]:flex-col-reverse"
    >
      <li
        v-for="(item, index) in about.aboutItems"
        :key="index"
        class="flex flex-col max-md:flex-col-reverse gap-4 md:gap-2 max-md:order-1 max-md:col-span-2 max-md:h-fit max-md:max-h-96"
      >
        <span
          class="w-full flex items-center gap-2 flex-col justify-center h-fit md:h-[33%]"
        >
          <NuxtImg
            :src="item.icon"
            :alt="item.title"
            class="w-8 h-8 bg-primary/10"
          />
          <h4 class="font-bold text-[20px] md:text-2xl text-black">
            {{ item.title }}
          </h4>
          <p class="text-base font-medium text-black/50 text-center">
            {{ item.description }}
          </p>
        </span>
        <span
          class="rounded-[20px] flex items-center justify-center h-1/3 md:h-[66%] overflow-hidden relative"
        >
          <span class="absolute inset-0 bg-gradient-to-t from-slate-800/50" />
          <NuxtImg
            :src="item.background"
            :alt="item.title"
            class="object-cover h-full w-full"
          />
        </span>
      </li>
      <!-- 
      <li class="flex flex-col gap-4 md:gap-2 max-md:order-2">
        <span
          class="w-full flex items-center gap-2 flex-col justify-center max-md:h-1/2 h-[33%]"
        >
          <img
            src="/icons/services/safity.svg"
            alt="icon"
            class="w-8 h-8 rounded-full bg-primary/10"
          />
          <h4 class="font-bold text-[20px] md:text-2xl text-black">
            سلامة المحصول
          </h4>
          <p class="text-base font-medium text-black/50 text-center">
            نقوم بالمتابعة الدورية وتوفير المبيدات اللازمة لعدم تراكم الحشرات
            الضارة
          </p>
        </span>
        <span
          class="rounded-[20px] flex items-center justify-center h-1/2 md:h-[66%] overflow-hidden relative"
        >
          <span class="absolute inset-0 bg-gradient-to-t from-slate-800/50" />
          <img
            src="/images/services/02.webp"
            aly="icon"
            class="object-cover h-full w-full"
          />
        </span>
      </li>

      <li
        class="flex flex-col gap-4 max-md:flex-col-reverse md:gap-2 max-md:order-3"
      >
        <span
          class="w-full flex items-center gap-2 flex-col justify-center max-md:h-1/2 h-[33%]"
        >
          <img
            src="/icons/services/quality.svg"
            alt="icon"
            class="w-8 h-8 rounded-full bg-primary/10"
          />
          <h4 class="font-bold text-[20px] md:text-2xl text-black">
            طوال العام
          </h4>
          <p class="text-base font-medium text-black/50 text-center">
            نقوم بتوفير منتجاتنا طوال العام وذلك بزراعتها داخل صوبات زجاجية ذات
            معايير عالية
          </p>
        </span>
        <span
          class="rounded-[20px] flex items-center justify-center h-1/2 md:h-[66%] overflow-hidden relative"
        >
          <span class="absolute inset-0 bg-gradient-to-t from-slate-800/50" />
          <img
            src="/images/services/03.webp"
            aly="icon"
            class="object-cover h-full w-full"
          />
        </span>
      </li> -->
    </ul>
  </div>
</template>
<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";

const img = useImage();
const { $directus } = useNuxtApp();
const { currentTranslation } = useTranslations();

const { data: aboutData } = await useAsyncData(
  QUERY_KEYS.pages.home.about,
  () =>
    $directus.query(`
  query {
    home {
      aboutItems {
        id
        background
        icon
        translations {
          id
          languages_id
          title
          description
        }
      }
      translations {
        id
        languages_id
        aboutHeadingTitle
        aboutHeadingDescription
      }
    }
  }
`)
);

const about = computed(() => {
  return {
    ...aboutData.value?.home,
    ...aboutData.value?.home?.translations.find(
      (t: {
        languages_id: number;
        aboutHeadingTitle: string;
        aboutHeadingDescription: string;
      }) => t.languages_id.toString() === currentTranslation.value.id
    ),
    aboutItems: aboutData.value?.home?.aboutItems.map(
      (item: {
        icon: string;
        background: string;
        translations: {
          languages_id: number;
          title: string;
          description: string;
        }[];
      }) => ({
        ...item,
        icon: img(item.icon, undefined, {
          provider: "directus",
        }),
        background: img(item.background, undefined, {
          provider: "directus",
        }),
        ...item.translations.find(
          (t: { languages_id: number; title: string; description: string }) =>
            t.languages_id.toString() === currentTranslation.value.id
        ),
      })
    ),
  };
});
</script>
