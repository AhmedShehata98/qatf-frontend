<template>
  <div
    style="background-image: url('/images/newsletter.webp')"
    class="w-full min-h-72 bg-cover bg-center bg-no-repeat flex items-center justify-center mt-16"
  >
    <div
      class="bg-primary/50 w-full py-24 flex items-center justify-center text-white flex-col max-md:px-4"
    >
      <div class="max-w-4xl flex flex-col items-center justify-center">
        <h3 class="text-4xl font-bold text-center mb-6">
          {{ newsletter?.newsletterHeadingTitle }}
        </h3>
        <p class="text-xl font-semibold text-center mb-14">
          {{ newsletter?.newsletterHeadingDescription }}
        </p>
        <form
          action=""
          class="flex items-center justify-between gap-1 bg-white rounded-full p-1 w-full md:w-2/3 lg:w-4/5"
        >
          <input
            id="newsletter-email"
            type="search"
            name="newsletter-email"
            :placeholder="newsletter?.newsletterFormPlaceholder"
            class="bg-inherit px-4 py-3 rounded-full focus:outline-none focus:bg-slate-50 placeholder:text-slate-500 w-full"
          />
          <button
            type="submit"
            class="bg-secondary text-white px-12 py-3 font-bold rounded-full"
          >
            <p class="text-base font-bold">
              {{ newsletter?.newsletterFormButtonTitle }}
            </p>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";

const { $directus } = useNuxtApp();

const { data: newsLetterContent } = await useAsyncData(
  QUERY_KEYS.pages.home.newsletter,
  () =>
    $directus.query(`
  query {
   home {
    translations {
      id
      languages_id
      newsletterHeadingTitle
      newsletterHeadingDescription
      newsletterFormPlaceholder
      newsletterFormButtonTitle
      newsletterFormButtonHref
    }
   }
  }
`)
);

const { currentTranslation } = useTranslations();

const newsletter = computed(() => {
  return {
    ...newsLetterContent.value?.home,
    ...newsLetterContent.value?.home?.translations.find(
      (t: {
        languages_id: number;
        newsletterHeadingTitle: string;
        newsletterHeadingDescription: string;
        newsletterFormPlaceholder: string;
        newsletterFormButtonTitle: string;
        newsletterFormButtonHref: string;
      }) => t.languages_id.toString() === currentTranslation.value.id
    ),
  };
});
</script>
