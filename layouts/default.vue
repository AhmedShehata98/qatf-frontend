<template>
  <main>
    <layouts-app-header />
    <NuxtPage />
    <layouts-app-footer />
    <cart-modal
      :is-open="isOpenModal"
      :cart="cart"
      :total-price="totalPrice"
      @close-modal="closeModal"
      @increase-quantity="increaseItemQuantity"
      @decrease-quantity="decreaseItemQuantity"
      @remove-item="removeFromCart"
    />
  </main>
</template>
<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";
const { closeModal, isOpenModal } = useShowCartModal();
const {
  cart,
  totalPrice,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeFromCart,
} = useCart();

const { $directus } = useNuxtApp();
const { currentTranslation } = useTranslations();
const { data: seoConfigData } = await useAsyncData(
  QUERY_KEYS.collections.globalSEO,
  () =>
    $directus.query(`
      query {
        seo_detail {
          id
          meta_keywords
          schema_type
          meta_robots
          canonical
          ogImage
          ogUrl
          ogType
          ogSiteName
          translations {
            id
            languages_id
            meta_title
            meta_description
            ogTitle
            ogDescription
          }
        }
      }
  `)
);
const img = useImage();
useServerSeoMeta({
  title: seoConfigData.value?.seo_detail?.translations?.find(
    (translation: { languages_id: number }) =>
      translation.languages_id.toString() === currentTranslation.value.id
  ).meta_title,
  description: seoConfigData.value?.seo_detail?.translations?.find(
    (translation: { languages_id: number }) =>
      translation.languages_id.toString() === currentTranslation.value.id
  ).meta_description,
  keywords: seoConfigData.value?.seo_detail?.translations?.find(
    (translation: { languages_id: number }) =>
      translation.languages_id.toString() === currentTranslation.value.id
  ).meta_keywords,
  robots: seoConfigData.value?.seo_detail?.translations?.find(
    (translation: { languages_id: number }) =>
      translation.languages_id.toString() === currentTranslation.value.id
  ).meta_robots,
  ogTitle: seoConfigData.value?.seo_detail?.translations?.find(
    (translation: { languages_id: number }) =>
      translation.languages_id.toString() === currentTranslation.value.id
  ).ogTitle,
  ogDescription: seoConfigData.value?.seo_detail?.translations?.find(
    (translation: { languages_id: number }) =>
      translation.languages_id.toString() === currentTranslation.value.id
  ).ogDescription,
  ogImage: img(
    seoConfigData.value?.seo_detail?.translations?.find(
      (translation: { languages_id: number }) =>
        translation.languages_id.toString() === currentTranslation.value.id
    ).ogImage,
    undefined,
    {
      provider: "directus",
    }
  ),
  ogType: seoConfigData.value?.seo_detail?.translations?.find(
    (translation: { languages_id: number }) =>
      translation.languages_id.toString() === currentTranslation.value.id
  ).ogType,
  ogUrl: seoConfigData.value?.seo_detail?.translations?.find(
    (translation: { languages_id: number }) =>
      translation.languages_id.toString() === currentTranslation.value.id
  ).ogUrl,
  ogSiteName: seoConfigData.value?.seo_detail?.translations?.find(
    (translation: { languages_id: number }) =>
      translation.languages_id.toString() === currentTranslation.value.id
  ).ogSiteName,
});
useServerHeadSafe({
  link: [
    {
      rel: "canonical",
      href: seoConfigData.value?.seo_detail?.translations?.find(
        (translation: { languages_id: number }) =>
          translation.languages_id.toString() === currentTranslation.value.id
      ).canonical,
    },
  ],
});
useSeoMeta({
  title: seoConfigData.value?.seo_detail?.translations?.find(
    (translation: { languages_id: number }) =>
      translation.languages_id.toString() === currentTranslation.value.id
  ).meta_title,
  description: seoConfigData.value?.seo_detail?.translations?.find(
    (translation: { languages_id: number }) =>
      translation.languages_id.toString() === currentTranslation.value.id
  ).meta_description,
});
</script>
