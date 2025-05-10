<template>
  <section class="mt-16 app-container">
    <div class="container mx-auto">
      <div class="flex flex-col items-start justify-start mb-6 w-full">
        <p
          class="relative text-secondary max-md:text-base text-xs font-bold mb-1 text-start before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
        >
          {{ products?.home?.prodoctsHeadingTitle }}
        </p>
        <h2 class="text-[32px] md:text-2xl font-bold text-start mb-2">
          {{ products?.home?.prodoctsHeadingDescription }}
        </h2>
      </div>
      <ul
        class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 justify-items-center"
      >
        <ProductCard
          v-for="(product, idx) in products?.home?.prodoctsFeaturedList"
          :key="idx"
          :data="product"
          :is-in-the-cart="isInTheCart(product)"
          @on-add-to-cart="addToCart"
        />
      </ul>
      <div class="flex justify-center mt-8 py-3">
        <NuxtLink
          :href="products?.home.productCtaBtnHref"
          class="text-secondary max-md:text-xl font-bold"
          >{{ products?.home.productCtaBtnTitle }} ←</NuxtLink
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { QUERY_KEYS } from "~/constants/query-keys";
import { computed } from "vue";
import type { Product } from "~/types/product";

const { $directus } = useNuxtApp();
const { addToCart, isInTheCart } = useCart();
const img = useImage();
const { data: products } = await useAsyncData(
  QUERY_KEYS.pages.home.products,
  () =>
    $directus.query(`
  query {
   home {
    prodoctsHeadingTitle
    prodoctsHeadingDescription
    productCtaBtnTitle
    productCtaBtnHref
    prodoctsFeaturedList {
      id
      image
      title
      price
      unit
      currency
      tags
    }
   }
  }
`)
);

useServerHeadSafe({
  script: [
    {
      type: "application/ld+json",
      children: computed(() => {
        if (!products.value?.home?.prodoctsFeaturedList) return "{}";

        const itemListElements = products.value.home.prodoctsFeaturedList.map(
          (product: Product, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              name: product.title,
              image: img(product.image, undefined, { provider: "directus" }),
              offers: {
                "@type": "Offer",
                price: product.price,
                priceCurrency: product.currency,
                availability: "https://schema.org/InStock",
              },
            },
          })
        );

        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: itemListElements,
          numberOfItems: itemListElements.length,
          name:
            products.value.home.prodoctsHeadingDescription ||
            "Featured Products",
        });
      }),
    },
  ],
});
</script>
