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
      class="flex items-center justify-between max-md:flex-col gap-3 sm:gap-5 mt-6"
    >
      <span
        for="search-input"
        class="max-md:w-full flex items-center justify-start gap-1 border border-slate-400 rounded-full sm:p-1 ps-3"
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
        class="max-md:w-full grid grid-cols-3 items-center justify-end gap-2 sm:gap-4"
      >
        <span
          class="flex items-center justify-center px-5 bg-black rounded-full"
        >
          <select
            id="quantity"
            name="quantity"
            class="bg-black text-white pe-1.5 md:pe-3 py-1 sm:py-2 rounded-full focus:outline-none max-sm:text-sm"
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
            class="bg-black text-white pe-1.5 md:pe-3 py-1 sm:py-2 rounded-full focus:outline-none max-sm:text-sm"
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
            class="bg-black text-white pe-1.5 md:pe-3 py-1 sm:py-2 rounded-full focus:outline-none max-sm:text-sm"
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
        <div class="flex items-center justify-start mt-6 relative w-full mb-6">
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
    <div
      class="w-full flex items-center justify-between gap-5 max-sm:flex-wrap max-sm:gap-2.5 mt-10"
      v-if="
        !error && !productsError && products && products.products.length > 0
      "
    >
      <button
        type="button"
        class="w-full py-1.5 px-6 bg-secondary rounded-sm flex items-center justify-center gap-2 text-white transition-colors disabled:bg-slate-300 disabled:text-slate-400"
        @click="loadPrevPage"
        :disabled="!isHasPreviousProducts"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-chevron-right-icon lucide-chevron-right"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        <p class="text-sm md:text-sm">شاهد السابق</p>
      </button>
      <button
        type="button"
        class="w-full py-1.5 px-6 bg-secondary rounded-sm flex items-center justify-center gap-2 text-white transition-colors disabled:bg-slate-300 disabled:text-slate-400"
        @click="loadNextPage"
        :disabled="!isHasMoreProducts"
      >
        <p class="text-sm md:text-sm">شاهد التالي</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-chevron-left-icon lucide-chevron-left"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
    </div>
  </section>
</template>
<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";
import type { Product } from "~/types/product";

const { $directus } = useNuxtApp();
const { showModal } = useShowCartModal();
const { addToCart, isInTheCart } = useCart();
const page = shallowRef(1);
const perPage = shallowRef(4);
const offset = shallowRef((page.value - 1) * perPage.value);
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

const {
  data: products,
  error: productsError,
  pending: pendingProducts,
} = await useAsyncData<{
  products: Product[];
  products_aggregated: { count: { id: number } }[];
}>(
  QUERY_KEYS.collections.products,
  () =>
    $directus.query(
      `
    query ($limit: Int, $offset: Int) {
      products (limit: $limit, offset: $offset) {
        id
        title
        image
        price
        currency
        unit
        tags
        stock
        category {
          name
          description
        }
      }
      products_aggregated {
        count {
          id
        }
      }
    }
  `,
      {
        limit: perPage.value,
        offset: offset.value,
      }
    ),
  {
    watch: [page, perPage, offset],
  }
);

const isHasMoreProducts = computed(() => {
  if (!products.value) return false;

  const productsLength = products?.value?.products.length;

  if (productsLength === 0) return false;
  const productsFetchedSoFar = offset.value + productsLength;

  return productsFetchedSoFar < products.value.products_aggregated[0].count.id;
});

const isHasPreviousProducts = computed(() => {
  if (!products.value) return false;

  const productsLength = products?.value?.products.length;

  if (productsLength === 0) return false;
  const productsFetchedSoFar = offset.value + productsLength;

  return productsFetchedSoFar > perPage.value;
});

console.log("isHasMoreProducts:", isHasMoreProducts.value);
const groupedProducts = computed(
  () =>
    Object.groupBy(
      products.value?.products || ([] as Product[]),
      (item) => item.category?.name
    ) || []
);

function loadNextPage() {
  page.value++;
  offset.value = (page.value - 1) * perPage.value;
}

function loadPrevPage() {
  if (page.value > 1) {
    page.value--;
    offset.value = (page.value - 1) * perPage.value;
  }
}
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
