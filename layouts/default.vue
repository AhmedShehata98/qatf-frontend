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

const { data: seoConfig } = await useAsyncData(
  QUERY_KEYS.collections.globalSEO,
  () =>
    $directus.query(`
    query {
      seo_detail (filter : { relatedTo : { _eq : "global"}}) {
        meta_title
        meta_description
        meta_keywords
        schema_type
        meta_robots
        canonical
        ogTitle
        ogDescription
        ogImage
        ogType
        ogUrl
        ogSiteName
      }
    }
  `)
);
const img = useImage();

useServerSeoMeta({
  title: seoConfig.value?.seo_detail?.[0].meta_title,
  description: seoConfig.value?.seo_detail?.[0].meta_description,
  keywords: seoConfig.value?.seo_detail?.[0].meta_keywords,
  robots: seoConfig.value?.seo_detail?.[0].meta_robots,
  ogTitle: seoConfig.value?.seo_detail?.[0].ogTitle,
  ogDescription: seoConfig.value?.seo_detail?.[0].ogDescription,
  ogImage: img(seoConfig.value?.seo_detail?.[0].ogImage, undefined, {
    provider: "directus",
  }),
  ogType: seoConfig.value?.seo_detail?.[0].ogType,
  ogUrl: seoConfig.value?.seo_detail?.[0].ogUrl,
  ogSiteName: seoConfig.value?.seo_detail?.[0].ogSiteName,
  ogLocale: "ar_AR",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#008145",
});
useServerHeadSafe({
  link: [
    {
      rel: "canonical",
      href: seoConfig.value?.seo_detail?.[0].canonical,
    },
  ],
});
</script>
