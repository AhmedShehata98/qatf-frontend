<template>
  <section class="container app-container pt-16">
    <div class="flex flex-col items-center justify-center mb-6 w-full">
      <p
        class="relative text-secondary max-md:text-base text-xs font-bold mb-1 text-center before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
      >
        {{ ourCustomersMapped?.title }}
      </p>
      <h2 class="text-[32px] md:text-4xl font-bold text-center mb-2">
        {{ ourCustomersMapped?.headingTitle }}
      </h2>
    </div>
    <ul class="w-full flex gap-3.5 md:gap-8 justify-center pt-4">
      <li
        v-for="customer in ourCustomersMapped?.customersList"
        :key="customer.id"
        class="w-36 max-w-36 flex items-center justify-center group"
      >
        <nuxt-img
          provider="directus"
          :src="customer.image"
          :alt="customer.image"
          class="w-full object-cover max-w-full grayscale-100 group-hover:grayscale-0 transition-all duration-300"
        />
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";

const { $directus } = useNuxtApp();
const { data: ourCustomers } = useAsyncData(
  QUERY_KEYS.pages.home.ourCustomers,
  () =>
    $directus.query(`
    query {
        our_customers {
            id
            translations {
                languages_id
                title
                headingTitle
            }
        }
        customers_list {
            id
            image
            translations {
                languages_id
                brief
            }
        }
    }
`)
);

const { getLocaleObject, currentLocale } = useI18n();
const locale = computed(() => getLocaleObject(currentLocale.value));

const ourCustomersMapped = computed(() => ({
  ...ourCustomers.value?.our_customers,
  ...ourCustomers.value?.our_customers?.translations?.find(
    (t: any) => t.languages_id.toString() === locale.value.id
  ),
  customersList: {
    ...ourCustomers.value?.customers_list,
    ...ourCustomers.value?.customers_list?.translations?.find(
      (t: any) => t.languages_id.toString() === locale.value.id
    ),
  },
}));
</script>
