<template>
  <div
    style="background-image: url('/images/newsletter.webp')"
    class="w-full min-h-72 bg-cover bg-center bg-no-repeat flex items-center justify-center mt-16"
  >
    <div
      class="bg-primary/50 w-full py-24 flex items-center justify-center text-white flex-col max-md:px-4"
    >
      <h3 class="text-4xl font-bold text-center mb-6">
        {{ newsLetterContent?.home?.newsletterHeadingTitle }}
      </h3>
      <p class="text-xl font-semibold text-center mb-14">
        {{ newsLetterContent?.home?.newsletterHeadingDescription }}
      </p>
      <form
        action=""
        class="flex items-center justify-between gap-1 bg-white rounded-full p-1 w-full md:w-2/3 lg:w-2/5"
      >
        <input
          type="search"
          name="newsletter-email"
          id="newsletter-email"
          :placeholder="newsLetterContent?.home?.newsletterFormPlaceholder"
          class="bg-inherit px-4 py-3 rounded-full focus:outline-none focus:bg-slate-50 placeholder:text-slate-500 w-full"
        />
        <button
          type="submit"
          class="bg-secondary text-white px-12 py-3 font-bold rounded-full"
        >
          <p class="text-base font-bold">
            {{ newsLetterContent?.home?.newsletterFormButtonTitle }}
          </p>
        </button>
      </form>
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
    newsletterHeadingTitle
    newsletterHeadingDescription
    newsletterFormPlaceholder
    newsletterFormButtonTitle
    newsletterFormButtonHref
   }
  }
`)
);
</script>
