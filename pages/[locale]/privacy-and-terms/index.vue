<template>
  <section class="app-container my-16 min-h-[60dvh]">
    <p
      v-if="privacyAndTerms"
      class="relative w-fit text-secondary text-xs font-bold text-start before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate mb-6"
    >
      {{ privacyAndTerms.headingTitle }}
    </p>

    <RichTextRenderer
      v-if="privacyAndTerms"
      :key="privacyAndTerms.id"
      :data="privacyAndTerms.terms"
    />
  </section>
</template>
<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";

const { getLocaleObject, currentLocale } = useI18n();
const { $directus } = useNuxtApp();
const { data: terms } = await useAsyncData(QUERY_KEYS.pages.privacyPolicy, () =>
  $directus.query(
    `
      query {
        privacyAndTerms {
          id
          translations {
            id
            languages_id
            headingTitle
            terms
          }
        }
      }
    `
  )
);

const privacyAndTerms = computed(() => ({
  ...terms.value?.privacyAndTerms,
  ...terms.value?.privacyAndTerms.translations.find(
    (translation: { languages_id: number }) =>
      translation.languages_id.toString() ===
      getLocaleObject(currentLocale.value).id
  ),
}));
const siteUrl = useNuxtApp().$config.public.siteUrl;
// إضافة SEO meta tags
useServerSeoMeta({
  title: computed(
    () => privacyAndTerms.value?.headingTitle || "الشروط والأحكام"
  ),
  description: computed(() => {
    // استخراج النص من محتوى الشروط والأحكام
    const content = privacyAndTerms.value?.terms?.content || "";
    return content.substring(0, 160) + "...";
  }),
  ogTitle: computed(
    () => privacyAndTerms.value?.headingTitle || "الشروط والأحكام"
  ),
  ogDescription: computed(() => {
    const content = privacyAndTerms.value?.terms?.content || "";
    return content.substring(0, 160) + "...";
  }),
  ogType: "website",
  ogUrl: computed(() => `${siteUrl}/privacy-and-terms`),
});

// إضافة canonical URL
useServerHeadSafe({
  link: [
    {
      rel: "canonical",
      href: computed(() => `${siteUrl}/privacy-and-terms`),
    },
  ],
});

// تكوين SSR
definePageMeta({
  ssr: true,
});
</script>
