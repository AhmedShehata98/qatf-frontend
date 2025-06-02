<template>
  <section class="app-container my-16">
    <span class="w-full flex flex-col gap-2 items-start">
      <p
        class="relative w-fit text-secondary text-base md:text-xs font-bold text-start before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
      >
        {{ productsPricing.headingTitle }}
      </p>
      <h3
        class="text-[20px] md:text-[44px] font-semibold text-black leading-tight"
      >
        {{ productsPricing.headingDescription }}
      </h3>
    </span>
    <form
      action=""
      class="flex items-center justify-between max-md:flex-col gap-3 sm:gap-5 mt-6"
      @submit.prevent="() => refreshProductsCollection()"
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
          id="search-input"
          v-model="searchQuery"
          type="search"
          name="search-input"
          :placeholder="productsPricing.searchInputPlaceholder"
          class="w-full focus:outline-none bg-inherit text-black px-3 ltr:py-2 h-full"
        />
      </span>
      <div
        class="max-md:w-full grid grid-cols-2 items-center justify-end gap-2 sm:gap-4"
      >
        <span
          class="flex items-center justify-center px-5 bg-primary rounded-full"
        >
          <select
            id="unit"
            v-model="selectedUnit"
            name="unit"
            class="bg-primary text-white pe-1.5 md:pe-3 py-1 sm:py-2 rounded-full focus:outline-none max-sm:text-sm ltr:py-2"
          >
            <option value="none" disabled class="disabled:!text-white">
              {{ productsPricing.unitSelectLabel }}
            </option>
            <option v-for="unit of mappedUnits" :key="unit.id" :value="unit.id">
              {{ unit.name }}
            </option>
          </select>
        </span>
        <div class="flex items-center justify-center gap-2">
          <span
            class="flex items-center justify-center flex-1 px-5 bg-primary rounded-full ltr:py-2"
          >
            <select
              id="quantity"
              v-model="selectedCategory"
              name="quantity"
              class="bg-primary text-white pe-1.5 md:pe-3 py-1 sm:py-2 rounded-full focus:outline-none max-sm:text-sm"
            >
              <option value="none" disabled>
                {{ productsPricing.categoriesLabel }}
              </option>
              <option
                v-for="category of mappedCategory"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </span>
          <button
            v-if="selectedCategory !== 'none' || selectedUnit !== 'none'"
            type="button"
            class="flex items-center justify-center bg-sky-200 shrink-0 max-md:size-10 size-12 rounded-full hover:bg-sky-300 transition-colors"
            title="Clear filters"
            @click="
              () => {
                selectedCategory = 'none';
                selectedUnit = 'none';
              }
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
    <template v-if="groupedProducts && Object.keys(groupedProducts).length > 0">
      <div
        v-for="[title, items] of Object.entries(groupedProducts)"
        :key="`${title}_${items?.length}`"
        class="w-full flex flex-col items-start justify-start"
      >
        <div class="flex items-center justify-start mt-6 relative w-full mb-6">
          <span
            style="height: 1px; width: 100%"
            class="inline-block absolute left-0 top-1/2 bg-secondary"
          />
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
            @on-remove-from-cart="handleRemoveFromCart"
          />
        </ul>
      </div>
    </template>
    <span v-else class="flex items-center justify-center flex-col gap-4 py-32">
      <span
        class="flex items-center justify-center p-4 bg-primary/20 backdrop-blur-md text-5xl shrink-0 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 28 28"
        >
          <path
            fill="currentColor"
            d="M10.75 15A2.25 2.25 0 0 1 13 17.25v5.5A2.25 2.25 0 0 1 10.75 25h-5.5A2.25 2.25 0 0 1 3 22.75v-5.5A2.25 2.25 0 0 1 5.25 15zm12 0A2.25 2.25 0 0 1 25 17.25v5.5A2.25 2.25 0 0 1 22.75 25h-5.5A2.25 2.25 0 0 1 15 22.75v-5.5A2.25 2.25 0 0 1 17.25 15zm-12-12A2.25 2.25 0 0 1 13 5.25v5.5A2.25 2.25 0 0 1 10.75 13h-5.5A2.25 2.25 0 0 1 3 10.75v-5.5A2.25 2.25 0 0 1 5.25 3zm12 0A2.25 2.25 0 0 1 25 5.25v5.5A2.25 2.25 0 0 1 22.75 13h-5.5A2.25 2.25 0 0 1 15 10.75v-5.5A2.25 2.25 0 0 1 17.25 3z"
          />
        </svg>
      </span>
      <h3 class="text-2xl text-secondary/80 font-bold text-center">
        {{ productsPricing.noProductsMessage }}
      </h3>
    </span>

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
            productsPricing?.addedCartSuccessMessage.replace(
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
            productsPricing?.removedCartSuccessMessage.replace(
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
import { QUERY_KEYS } from "~/constants/query-keys";
import type { Product } from "~/types/product";

const { $directus } = useNuxtApp();
const { addToCart, removeFromCart } = useCart();
const { currentLocale, getLocaleObject } = useI18n();
const {
  pushNotificationBar,
  isOpenNotificationBar,
  cartOperation,
  selectedProductName,
} = useCartNotificationBar();
const searchQuery = shallowRef(null);
const debouncedSearchQuery = useDebounce(searchQuery, 500);
const selectedCategory = shallowRef<string | null>("none");
const selectedUnit = shallowRef<string | null>("none");
const handleAddToCart = (product: Product) => {
  addToCart(product);
  (translation: { languages_id: number }) =>
    translation.languages_id.toString() ===
    getLocaleObject(currentLocale.value).id;
  pushNotificationBar("add", product);
};
const handleRemoveFromCart = (product: Product) => {
  removeFromCart(product);
  pushNotificationBar("remove", product);
};

const img = useImage();
const { data: productUnits } = await useAsyncData(
  QUERY_KEYS.collections.productUnits,
  () =>
    $directus.query(`
    query {
      product_units {
        id
        translations {
          id
					languages_id
					name
          value
				}
      }
    }
  `)
);

const { data: categories } = await useAsyncData(
  QUERY_KEYS.collections.categories,
  () =>
    $directus.query(`
      query {
        category {
        id
          translations {
            id
            languages_id
            name
            description
          }
        }
      }
    `)
);

const { data } = await useAsyncData(QUERY_KEYS.pages.products, () =>
  $directus.query(
    `
      query {
        productsPricing {
          id
          translations {
            id
            languages_id
            headingTitle
            headingDescription
            searchInputPlaceholder
            categoriesLabel
            unitSelectLabel
            modalTitle
            modalPhoneNumberLabel
            modalCompanyNameLabel
            modalOrderedBefore
            modalActivityFormLabel
            modalTotalLabel
            modalSubmitButton
            noProductsMessage
            previousButton
            nextButton
            addedCartSuccessMessage
            removedCartSuccessMessage
            addedCartErrorMessage
          }
        }
      }
    `
  )
);

const {
  data: products,
  refresh: refreshProductsCollection,
  error,
} = await useAsyncData<{
  products: Product[];
  products_aggregated: { count: { id: number } }[];
}>(
  QUERY_KEYS.collections.products,
  () =>
    $directus.query(
      `
    query ($filter: products_filter) {
      products (filter: $filter) {
				id
				translations {
					id
					languages_id
					title
          currency
				}
				price
				stock
				image
				tags
				unit {
					id
					translations {
						id
						languages_id
						name
						value
					}
				}
				category {
					id
					translations {
						id
						languages_id
						name
						description
					}
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
        filter: {
          unit: {
            ...(selectedUnit.value !== "none"
              ? {
                  translations: {
                    id: {
                      _eq: selectedUnit.value,
                    },
                  },
                }
              : {}),
          },
          category: {
            ...(selectedCategory.value !== "none"
              ? {
                  translations: {
                    id: {
                      _eq: selectedCategory.value,
                    },
                  },
                }
              : {}),
          },
          translations: {
            ...(debouncedSearchQuery.value
              ? {
                  title: {
                    _contains: debouncedSearchQuery.value,
                  },
                }
              : {}),
          },
        },
      }
    ),
  {
    watch: [debouncedSearchQuery, selectedCategory, selectedUnit],
  }
);

const productsPricing = computed(() => ({
  ...data.value?.productsPricing,
  ...data?.value?.productsPricing.translations.find(
    (translation: { languages_id: number }) =>
      translation.languages_id.toString() ===
      getLocaleObject(currentLocale.value).id
  ),
}));

const groupedProducts = computed(() => {
  return (
    Object.groupBy(
      products.value?.products || ([] as Product[]),
      (item) =>
        item.category?.translations.find(
          (translation: { languages_id: number }) =>
            translation.languages_id.toString() ===
            getLocaleObject(currentLocale.value).id
        )?.name || ""
    ) || {}
  );
});

const mappedUnits = computed(() => {
  return productUnits.value?.product_units.map(
    (unit: {
      id: string;
      translations: {
        id: string;
        languages_id: number;
        name: string;
        value: string;
      }[];
    }) => ({
      ...unit,
      ...unit.translations.find(
        (translation: { languages_id: number }) =>
          translation.languages_id.toString() ===
          getLocaleObject(currentLocale.value).id
      ),
    })
  );
});

const mappedCategory = computed(() => {
  return categories.value?.category.map(
    (category: {
      id: string;
      translations: {
        id: string;
        languages_id: number;
        name: string;
        description: string;
      }[];
    }) => ({
      ...category,
      ...category.translations.find(
        (translation: { languages_id: number }) =>
          translation.languages_id.toString() ===
          getLocaleObject(currentLocale.value).id
      ),
    })
  );
});

useServerHeadSafe({
  script: [
    {
      type: "application/ld+json",
      textContent: computed(() => {
        if (!products.value?.products) return "{}";

        const itemListElements = products.value?.products.map(
          (product: Product, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              name:
                product.translations.find(
                  (translation: { languages_id: number }) =>
                    translation.languages_id.toString() ===
                    getLocaleObject(currentLocale.value).id
                )?.title || "",
              image: img(product.image, undefined, { provider: "directus" }),
              offers: {
                "@type": "Offer",
                price: product.price,
                priceCurrency:
                  product.translations.find(
                    (translation: { languages_id: number }) =>
                      translation.languages_id.toString() ===
                      getLocaleObject(currentLocale.value).id
                  )?.currency || "",
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
