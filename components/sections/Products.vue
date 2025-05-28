<template>
  <section class="mt-16 app-container">
    <div class="container mx-auto">
      <div class="flex flex-col items-start justify-start mb-6 w-full">
        <p
          class="relative text-secondary max-md:text-base text-xs font-bold mb-1 text-start before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
        >
          {{ products?.prodoctsHeadingTitle }}
        </p>
        <h2 class="text-[32px] md:text-2xl font-bold text-start mb-2">
          {{ products?.prodoctsHeadingDescription }}
        </h2>
      </div>
      <ul
        class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 justify-items-center"
      >
        <ProductCard
          v-for="(product, idx) in products?.prodoctsFeaturedList"
          :key="idx"
          :data="product"
          :is-in-the-cart="isInTheCart(product)"
          @on-add-to-cart="addToCart"
        />
      </ul>
      <div class="flex justify-center mt-8 py-3">
        <NuxtLink
          :href="products?.productCtaBtnHref"
          class="text-secondary max-md:text-xl font-bold"
          >{{ products?.productCtaBtnTitle }} ←</NuxtLink
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
const { currentTranslation } = useTranslations();
const { data: productsData } = await useAsyncData(
  QUERY_KEYS.pages.home.products,
  () =>
    $directus.query(`
  query {
    home {
      prodoctsFeaturedList {
        id
        image
        translations {
          id
          languages_id
          title
          unit
          currency
        }
        tags
        price
      }
      translations {
        id
        languages_id
        prodoctsHeadingTitle
        prodoctsHeadingDescription
        productCtaBtnTitle
        productCtaBtnHref
      }
    }
  }
`)
);

const products = computed(() => {
  return {
    ...productsData.value?.home,
    ...productsData.value?.home?.translations.find(
      (t: {
        languages_id: number;
        prodoctsHeadingTitle: string;
        prodoctsHeadingDescription: string;
        productCtaBtnTitle: string;
        productCtaBtnHref: string;
      }) => t.languages_id.toString() === currentTranslation.value.id
    ),
    prodoctsFeaturedList: productsData.value?.home?.prodoctsFeaturedList.map(
      (product: any) => {
        return {
          ...product,
          ...product.translations.find(
            (t: {
              languages_id: number;
              title: string;
              unit: string;
              currency: string;
            }) => t.languages_id.toString() === currentTranslation.value.id
          ),
        };
      }
    ),
  };
});

useServerHeadSafe({
  script: [
    {
      type: "application/ld+json",
      children: computed(() => {
        if (!products.value?.prodoctsFeaturedList) return "{}";

        const itemListElements = products.value.prodoctsFeaturedList.map(
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
            products.value.prodoctsHeadingDescription || "Featured Products",
        });
      }),
    },
  ],
});
</script>
