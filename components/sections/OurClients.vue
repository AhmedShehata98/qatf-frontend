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
    <div ref="emblaRef" class="embla">
      <div class="embla__container">
        <div
          v-for="(customer, index) in ourCustomersMapped.customersList"
          :key="`${customer.id}-${index}`"
          class="embla__slide group"
        >
          <nuxt-img
            provider="directus"
            :src="customer.image"
            :alt="customer.image"
            class="object-cover max-w-full grayscale-100 group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { QUERY_KEYS } from "~/constants/query-keys";
import { computed } from "vue";
import useEmblaCarousel from "embla-carousel-vue";
import AutoScroll from "embla-carousel-auto-scroll";
import type { DirectUsTranslations } from "~/types/directus";

const { $directus } = useNuxtApp();
const [emblaRef] = useEmblaCarousel(
  {
    loop: true,
    startIndex: 0,
    containScroll: "trimSnaps",
    axis: "x",
  },
  [AutoScroll()]
);

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
    (t: DirectUsTranslations) => t.languages_id.toString() === locale.value.id
  ),
  customersList: {
    ...ourCustomers.value?.customers_list,
    ...ourCustomers.value?.customers_list?.translations?.find(
      (t: DirectUsTranslations) => t.languages_id.toString() === locale.value.id
    ),
  },
}));

// onMounted(() => {
//   const autoScroll = emblaApi.value?.plugins().autoScroll;
//   if (!autoScroll) return;

//   autoScroll.play();
// });
</script>

<style>
.embla {
  max-width: 70%;
  margin: auto;
  --slide-height: 19rem;
  --slide-spacing: 1rem;
  --slide-size: 10.5rem;
  overflow: hidden;
}
@media (max-width: 768px) {
  .embla {
    max-width: 100%;
  }
}
.embla__viewport {
  overflow: hidden;
}
.embla__container {
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: pan-y pinch-zoom;
  margin-left: calc(var(--slide-spacing) * -1);
  max-width: 100%;
}
.embla__slide {
  transform: translate3d(0, 0, 0);
  flex: 0 0 var(--slide-size);
  min-width: 0;
  padding-left: var(--slide-spacing);
}
.embla__play {
  -webkit-tap-highlight-color: rgba(var(--text-high-contrast-rgb-value), 0.5);
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  touch-action: manipulation;
  display: inline-flex;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
  box-shadow: inset 0 0 0 0.2rem var(--detail-medium-contrast);
  border-radius: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: flex-end;
  color: var(--text-body);
  font-weight: 700;
  font-size: 1.4rem;
  padding: 0 2.4rem;
  min-width: 8.4rem;
}

.embla__progress--hidden .embla__progress__bar {
  animation-play-state: paused;
}
@keyframes autoplay-progress {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
