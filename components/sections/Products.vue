<template>
  <section class="mt-16 app-container">
    <div class="container mx-auto">
      <div class="flex flex-col items-center justify-center mb-6 w-full">
        <p
          class="relative text-secondary max-md:text-base text-xs font-bold mb-1 text-center before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
        >
          {{ products?.prodoctsHeadingTitle }}
        </p>
        <h2 class="text-[32px] md:text-4xl font-bold text-center mb-2">
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
          @on-add-to-cart="handleAddToCart"
          @on-remove-from-cart="handleRemoveFromCart"
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
    <!-- product add to cart bar -->
    <div
      class="w-full flex items-center justify-start gap-4 bg-primary fixed bottom-0 left-0 py-3 transition-transform duration-500 ease-in-out translate-y-full"
      :class="{
        '!translate-y-0': isOpenNotificationBar && cartOperation === 'add',
      }"
    >
      <div
        class="container app-container flex items-center justify-start gap-4"
      >
        <span
          class="flex items-center justify-center max-md:size-8 size-10 bg-white/70 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M2.084 2.751a.75.75 0 0 1 .956-.459l.301.106c.617.217 1.14.401 1.553.603c.44.217.818.483 1.102.899c.282.412.399.865.452 1.362q.035.333.044.738H17.13c1.685 0 3.202 0 3.646.577s.27 1.447-.077 3.186l-.5 2.425c-.315 1.528-.472 2.293-1.024 2.742c-.552.45-1.332.45-2.893.45h-5.303c-2.79 0-4.184 0-5.05-.914s-.93-1.884-.93-4.826V7.038c0-.74 0-1.235-.042-1.615c-.04-.363-.109-.545-.2-.677c-.087-.129-.22-.25-.524-.398c-.323-.158-.762-.314-1.43-.549l-.26-.091a.75.75 0 0 1-.46-.957"
              opacity="0.5"
            />
            <path
              fill="currentColor"
              d="M7.5 18a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m-.958-8.483a.75.75 0 1 0-1.086-1.034l-2.314 2.43l-.6-.63a.75.75 0 1 0-1.086 1.034l1.143 1.2a.75.75 0 0 0 1.086 0z"
            />
          </svg>
        </span>
        <p class="text-white max-md:text-sm text-lg font-semibold">
          {{
            mappedProductNotificationMessages?.addedCartSuccessMessage.replace(
              "{productName}",
              selectedProductName
            )
          }}
        </p>
      </div>
    </div>
    <div
      class="w-full flex items-center justify-start gap-4 bg-sky-700 fixed bottom-0 left-0 py-3 transition-transform duration-500 ease-in-out translate-y-full"
      :class="{
        '!translate-y-0': isOpenNotificationBar && cartOperation === 'remove',
      }"
    >
      <div
        class="container app-container flex items-center justify-start gap-4"
      >
        <span
          class="flex items-center justify-center max-md:size-8 size-10 bg-white/70 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m3.72 2.788l.55 1.862h14.654c1.84 0 3.245 1.717 2.715 3.51l-1.655 5.6c-.352 1.194-1.471 1.99-2.715 1.99H8.113c-1.244 0-2.362-.796-2.715-1.99L2.281 3.213a.75.75 0 1 1 1.438-.425m7.81 5.182a.75.75 0 1 0-1.06 1.06l.97.97l-.97.97a.75.75 0 1 0 1.06 1.06l.97-.97l.97.97a.75.75 0 1 0 1.06-1.06l-.97-.97l.97-.97a.75.75 0 0 0-1.06-1.06l-.97.97zM8.5 17.25a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5m8 0a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5"
            />
          </svg>
        </span>
        <p class="text-white max-md:text-sm text-lg font-semibold">
          {{
            mappedProductNotificationMessages?.removedCartSuccessMessage.replace(
              "{productName}",
              selectedProductName
            )
          }}
        </p>
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
const { addToCart, removeFromCart } = useCart();
const img = useImage();
const {
  pushNotificationBar,
  isOpenNotificationBar,
  cartOperation,
  selectedProductName,
} = useCartNotificationBar();
const { currentLocale, getLocaleObject } = useI18n();
const { data: productNotificationMessages } = useAsyncData(
  "product-notification-messages",
  () =>
    $directus.query(`
  query {
    productsPricing {
      translations {
        id
        languages_id
        addedCartSuccessMessage
        removedCartSuccessMessage
        addedCartErrorMessage
      }
    }
  }
`)
);

const mappedProductNotificationMessages = computed(() => {
  return {
    ...productNotificationMessages,
    ...productNotificationMessages?.value?.productsPricing.translations.find(
      (translation: { languages_id: number }) =>
        translation.languages_id.toString() ===
        getLocaleObject(currentLocale.value).id
    ),
  };
});

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
      }) =>
        t.languages_id.toString() === getLocaleObject(currentLocale.value).id
    ),
    prodoctsFeaturedList: productsData.value?.home?.prodoctsFeaturedList.map(
      (product: {
        translations: {
          languages_id: number;
          title: string;
          unit: string;
          currency: string;
        }[];
      }) => {
        return {
          ...product,
          ...product.translations.find(
            (t: {
              languages_id: number;
              title: string;
              unit: string;
              currency: string;
            }) =>
              t.languages_id.toString() ===
              getLocaleObject(currentLocale.value).id
          ),
        };
      }
    ),
  };
});

const handleAddToCart = (product: Product) => {
  addToCart(product);
  pushNotificationBar("add", product);
};

const handleRemoveFromCart = (product: Product) => {
  removeFromCart(product);
  pushNotificationBar("remove", product);
};

useServerHeadSafe({
  script: [
    {
      type: "application/ld+json",
      textContent: computed(() => {
        if (!products.value?.prodoctsFeaturedList) return "{}";

        const itemListElements = products.value.prodoctsFeaturedList.map(
          (
            product: {
              title: string;
              image: string;
              price: number;
              currency: string;
            },
            index: number
          ) => ({
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
