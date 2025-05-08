<template>
  <section class="app-container my-16 min-h-[60dvh]">
    <p
      v-if="terms"
      class="relative w-fit text-secondary text-xs font-bold text-start before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate mb-6"
    >
      {{ terms.privacyAndTerms.headingTitle }}
    </p>
    <ClientOnly>
      <RichTextRenderer v-if="terms" :data="terms.privacyAndTerms.terms" />
    </ClientOnly>
  </section>
</template>
<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";

const { $directus } = useNuxtApp();
const { data: terms } = await useAsyncData(QUERY_KEYS.pages.privacyPolicy, () =>
  $directus.query(
    `
      query {
        privacyAndTerms {
          headingTitle
          terms
        }
      }
    `
  )
);
</script>
