<template>
  <section class="app-container my-16">
    <span class="w-full flex flex-col gap-2 items-start">
      <p
        class="relative w-fit text-secondary text-base md:text-xs font-bold text-start before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
      >
        {{ data?.productsPricing.headingTitle }}
      </p>
      <h3
        class="text-[32px] md:text-[44px] font-semibold text-black leading-snug"
      >
        {{ data?.productsPricing.headingDescription }}
      </h3>
    </span>
    <form
      action=""
      class="flex items-center justify-between max-md:flex-col gap-5 mt-6"
    >
      <span
        for="search-input"
        class="max-md:w-full flex items-center justify-start gap-1 border border-slate-400 rounded-full p-1 ps-3"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.58268 17.4993C13.9549 17.4993 17.4993 13.9549 17.4993 9.58268C17.4993 5.21043 13.9549 1.66602 9.58268 1.66602C5.21043 1.66602 1.66602 5.21043 1.66602 9.58268C1.66602 13.9549 5.21043 17.4993 9.58268 17.4993Z"
            stroke="#B0AEAE"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.3327 18.3327L16.666 16.666"
            stroke="#B0AEAE"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <input
          type="search"
          name="search-input"
          id="search-input"
          placeholder="بحث"
          class="w-full focus:outline-none bg-inherit text-black px-3 h-full"
        />
      </span>
      <div
        class="max-md:w-full grid grid-cols-3 items-center justify-end gap-4"
      >
        <span
          class="flex items-center justify-center px-5 bg-black rounded-full"
        >
          <select
            id="quantity"
            name="quantity"
            class="bg-black text-white pe-3 py-2 rounded-full focus:outline-none"
          >
            <option :value="data?.productsPricing.tagsSelectLabel">
              {{ data?.productsPricing.tagsSelectLabel }}
            </option>
          </select>
        </span>
        <span
          class="flex items-center justify-center px-5 bg-black rounded-full"
        >
          <select
            id="unit"
            name="unit"
            class="bg-black text-white pe-3 py-2 rounded-full focus:outline-none"
          >
            <option :value="data?.productsPricing.unitSelectLabel">
              {{ data?.productsPricing.unitSelectLabel }}
            </option>
          </select>
        </span>
        <span
          class="flex items-center justify-center px-5 bg-black rounded-full"
        >
          <select
            id="state"
            name="state"
            class="bg-black text-white pe-3 py-2 rounded-full focus:outline-none"
          >
            <option :value="data?.productsPricing.stateSelectLabel">
              {{ data?.productsPricing.stateSelectLabel }}
            </option>
          </select>
        </span>
      </div>
    </form>

    <template v-if="groupedProducts">
      <div
        class="w-full flex flex-col items-start justify-start"
        v-for="[title, items] of Object.entries(groupedProducts)"
      >
        <div class="flex items-center justify-start mt-6 relative w-full">
          <span
            style="height: 1px; width: 100%"
            class="inline-block absolute left-0 top-1/2 bg-secondary"
          ></span>
          <p class="text-secondary font-semibold bg-background px-6 z-10">
            {{ title }}
          </p>
        </div>
        <ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <product-card
            v-for="product of items"
            :key="product.id"
            :data="product"
            @on-add-to-cart="handleAddToCart"
            :is-in-the-cart="isInTheCart(product)"
          />
        </ul>
      </div>
    </template>
    <h3 v-else class="text-xl text-secondary/80 font-bold text-center py-24">
      لا توجد محاصيل لعرضها الان
    </h3>
  </section>
</template>
<script setup lang="ts">
import { HOME_PRODUCTS } from "~/data/data";
import { QUERY_KEYS } from "~/constants/query-keys";
import type { Product } from "~/types/product";

const { $directus } = useNuxtApp();
const { showModal } = useShowCartModal();
const { addToCart, isInTheCart } = useCart();

const handleAddToCart = (product: Product) => {
  showModal();
  addToCart(product);
};

const img = useImage();

const { data, error } = await useAsyncData(QUERY_KEYS.pages.products, () =>
  $directus.query(
    `
      query {
        productsPricing {
          headingTitle
          headingDescription
          searchInputPlaceholder
          tagsSelectLabel
          unitSelectLabel
          stateSelectLabel

        }
      }
    `
  )
);

const { data: products, error: productsError } = await useAsyncData(
  QUERY_KEYS.collections.products,
  () =>
    $directus.query(`
    query {
      products {
        id
        title
        image
        price
        currency
        unit
        tags
        stock
      }
    }
  `)
);

const groupedProducts = computed(
  () =>
    Object.groupBy(
      products.value?.products as Product[],
      (item) => item.title
    ) || []
);

useServerHeadSafe({
  script: [
    {
      type: "application/ld+json",
      children: computed(() => {
        if (!products.value?.products) return "{}";

        const itemListElements = products.value?.products.map(
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
          name: data?.value?.productsPricing.headingTitle || "all Products",
        });
      }),
    },
  ],
});
</script>
