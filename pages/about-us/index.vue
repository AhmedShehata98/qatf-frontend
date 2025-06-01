<template>
  <section
    class="app-container flex gap-5 items-start justify-start my-8 md:my-16 flex-col"
  >
    <div
      class="w-full flex items-start justify-start gap-5 max-lg:flex-col-reverse"
    >
      <nuxt-img
        provider="directus"
        :src="aboutUs.image"
        alt="hero.jpg"
        class="w-full lg:w-[35%] min-h-[15rem] lg:min-h-[37.5rem] object-cover rounded-[20px]"
      />
      <div
        class="w-full lg:w-[calc(64%-1.25rem)] flex items-start justify-start gap-3 flex-col"
      >
        <p
          class="relative text-secondary text-base lg:text-xs font-bold mb-2 text-center before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
        >
          {{ aboutUs.headingTitle }}
        </p>
        <heading-highlighted-title
          class="text-[28px] lg:text-[32px] font-semibold text-black leading-snug !justify-start"
          :words="descriptionSpacialWords"
          :title="
            aboutUs.descriptionText
              ?.replaceAll(SPACIAL_WORD_INDICATOR_START, '')
              .replaceAll(SPACIAL_WORD_INDICATOR_END, '')
          "
          main-text-color-class-name="text-black/90"
          marked-text-color-class-name="!text-primary"
        />

        <div class="w-full flex items-center justify-start gap-4 mt-8">
          <span
            class="min-w-[calc(50%-1rem)] min-h-[146px] relative flex items-center justify-center p-5 bg-black rounded-[20px]"
          >
            <span
              class="absolute w-full top-0 pe-2 left-0 rtl:rounded-tr-[20px] ltr:rounded-tl-[20px] overflow-hidden flex items-center justify-between"
            >
              <span
                class="px-4 py-3 md:px-6 md:py-5 text-white max-md:text-xs bg-zinc-900 flex items-center justify-center rtl:rounded-bl-full ltr:rounded-br-full ltr:rounded-bl-none"
              >
                <p>{{ aboutUs.secondaryBoxTitle }}</p>
              </span>
              <span
                class="flex size-8 md:size-10 p-1.5 md:p-2 relative bg-white rounded-full"
              >
                <span class="size-full rounded-full flex bg-black" />
              </span>
            </span>
            <h3
              class="text-white mt-14 md:mt-24 pb-5 tablet:lg-8 text-base tablet:text-xl font-bold max-w-full overflow-hidden truncate"
            >
              {{ aboutUs.secondaryBoxDescription }}
            </h3>
          </span>
          <span
            class="min-w-[calc(50%-1rem)] min-h-[146px] relative flex items-center justify-center p-5 bg-primary rounded-[20px]"
          >
            <span
              class="absolute w-full top-0 ps-2 left-0 rtl:rounded-tl-[20px] ltr:rounded-tr-[20px] overflow-hidden flex items-center justify-between flex-row-reverse"
            >
              <span
                class="px-4 py-3 md:px-6 md:py-5 text-white max-md:text-xs bg-primary brightness-110 flex items-center justify-center rtl:rounded-br-full ltr:rounded-bl-full"
              >
                <p>{{ aboutUs.primaryBoxTitle }}</p>
              </span>
              <span
                class="flex size-8 md:size-10 p-1.5 md:p-2 relative bg-white rounded-full"
              >
                <span class="size-full rounded-full flex bg-primary" />
              </span>
            </span>
            <h3
              class="text-white mt-14 md:mt-24 pb-5 lg:px-8 text-base tablet:text-xl font-bold max-w-full overflow-hidden truncate"
            >
              {{ aboutUs.primaryBoxDescription }}
            </h3>
          </span>
        </div>
      </div>
    </div>
    <sections-posters />

    <div class="w-full flex flex-col items-center justify-center mt-16">
      <h3
        class="text-[32px] tablet:text-4xl font-semibold tablet:font-bold text-center mb-4"
      >
        {{ aboutUs.whySectionTitle }}
      </h3>
      <h2
        class="text-[32px] tablet:text-4xl font-semibold tablet:font-bold text-black/20 text-center mb-8"
      >
        {{ aboutUs.whySectionDescription }}
      </h2>
      <ul
        v-if="aboutUs.whyItems"
        class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
      >
        <li
          v-for="reason in aboutUs.whyItems"
          :key="reason.id"
          class="flex items-start justify-center p-2 md:p-5 gap-5 bg-white rounded-[20px]"
        >
          <nuxt-img
            provider="directus"
            :src="reason.icon"
            :alt="reason.title"
            class="size-12 object-cover"
          />
          <div>
            <h3
              class="text-lg tablet:text-xl font-semibold text-start text-black mb-2"
            >
              {{ reason.title }}
            </h3>
            <p class="text-base text-black/70 text-start">
              {{ reason.description }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";

const SPACIAL_WORD_INDICATOR_START = "<mark>";
const SPACIAL_WORD_INDICATOR_END = "<mark/>";
const { currentTranslation } = useTranslations();
const { $directus } = useNuxtApp();
const { data } = await useAsyncData(QUERY_KEYS.pages.aboutUs, () =>
  $directus.query(
    `
      query {
        aboutUs {
          id
          image
          posterFarStartImage
          posterSecondStartImage
          posterCentredImage
          posterSecondEndImage
          posterFarEndImage
          whyItems {
            id
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
            headingTitle
            descriptionText
            primaryBoxTitle
            primaryBoxDescription
            secondaryBoxTitle
            secondaryBoxDescription
            whySectionTitle
            whySectionDescription
          }
        }
      }
    `
  )
);

const aboutUs = computed(() => ({
  ...data.value?.aboutUs,
  whyItems: data.value?.aboutUs.whyItems.map(
    (item: {
      translations: {
        languages_id: number;
        title: string;
        description: string;
      }[];
    }) => ({
      ...item,
      ...item.translations.find(
        (translation: { languages_id: number }) =>
          translation.languages_id.toString() ===
          currentTranslation.value.id.toString()
      ),
      ...item.translations.find(
        (translation) =>
          translation.languages_id.toString() === currentTranslation.value.id
      ),
    })
  ),
  ...data?.value?.aboutUs.translations.find(
    (translation) =>
      translation.languages_id.toString() === currentTranslation.value.id
  ),
}));

const descriptionSpacialWords = computed(() => {
  const description = aboutUs.value?.descriptionText;
  if (!description) return [];

  const pattern = new RegExp(
    `${SPACIAL_WORD_INDICATOR_START}(.*?)${SPACIAL_WORD_INDICATOR_END}`,
    "g"
  );

  const matches = [...description.matchAll(pattern)];

  return matches
    ?.map((match) => match[1]?.trim())
    ?.map((i) => i?.split(" "))[0];
});
</script>
