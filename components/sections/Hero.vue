<template>
  <section
    class="relative bg-cover bg-center bg-fixed text-white py-40 min-h-dvh"
    :style="{ 'background-image': `url(${heroImage})` }"
  >
    <!-- <video
      src="/videos/13795287_640_360_60fps.mp4"
      autoplay
      muted
      loop
      playsinline
      preload
      class="absolute inset-0 w-full h-full object-cover"
    /> -->
    <div class="absolute inset-0 bg-black/60" />
    <div
      class="app-container relative z-10 text-center flex flex-col items-center"
    >
      <span
        class="tablet:max-w-[70%] tablet:ltr:max-w-[85%] mb-8 flex items-center justify-center gap-4 flex-wrap"
      >
        <component
          :is="elem"
          v-for="(elem, idx) of headingTitleElem"
          :key="idx"
        />
      </span>

      <p class="max-w-2xl mx-auto mb-8 ltr:text-base text-lg text-white/70">
        {{ hero.home?.heroDescription }}
      </p>
      <NuxtLink
        class="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
        :href="pathWithLocale(hero.home?.heroCtaHref)"
      >
        {{ hero.home?.heroCtaTitle }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { NuxtLink } from "#components";
import { QUERY_KEYS } from "~/constants/query-keys";
const img = useImage();
const { $directus } = useNuxtApp();
const { currentLocale, getLocaleObject, pathWithLocale } = useI18n();
const { data: heroData } = await useAsyncData(QUERY_KEYS.pages.home.hero, () =>
  $directus.query(`
    query {
      home {
        heroBackground
        heroHeadingImage
        translations {
          id
          languages_id
          heroHeading
          heroDescription
          heroCtaHref
          heroCtaTitle
        }
        
      }
    }
`)
);

const hero = computed(() => {
  return {
    home: {
      ...heroData.value.home,
      ...heroData.value.home.translations.find(
        (t) =>
          t.languages_id.toString() === getLocaleObject(currentLocale.value).id
      ),
    },
  };
});
const heroImage = img(hero.value.home?.heroBackground, undefined, {
  provider: "directus",
});

const headingImg = img(hero.value.home?.heroHeadingImage, undefined, {
  provider: "directus",
});

const headingTitleElem = computed(() =>
  hero.value?.home?.heroHeading?.split(" ").map((part) =>
    part === "{image}"
      ? h(
          "span",
          {
            class:
              "inline-block p-1 w-48 rounded-full bg-white/50 backdrop-blur-sm ",
          },
          h("img", {
            src: headingImg,
            class: "w-full h-16 object-cover rounded-full",
          })
        )
      : h(
          "p",
          {
            class: "md:text-5xl text-[44px] md:ltr:text-[44px]/6 font-bold",
          },
          part
        )
  )
);
</script>
