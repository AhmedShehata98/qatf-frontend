<template>
  <div
    class="fixed inset-0 size-full z-50 flex items-center justify-center bg-white/50"
  >
    <div
      class="w-full flex flex-col items-center justify-between max-w-[90%] h-full max-h-[95%] bg-white/80 backdrop-blur-sm p-4 shadow-lg rounded-lg"
    >
      <div
        class="w-full flex items-center justify-between flex-row-reverse min-h-10"
      >
        <button
          type="button"
          class="bg-red-200 text-red-700 size-10 flex items-center justify-center rounded-full"
          @click="emit('close-modal')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
            />
          </svg>
        </button>
        <h3 class="text-lg font-medium pe-4">
          {{ galleryModal.gallery_modal.headingTitle }}
        </h3>
      </div>
      <figure
        class="w-full h-full max-h-[80%] rounded-md overflow-hidden bg-white/70 backdrop-blur-sm inline-block"
      >
        <nuxt-img
          provider="directus"
          :src="gallery[imageIndex].backgroundImage"
          :alt="gallery[imageIndex].backgroundImage"
          class="w-full h-full object-contain rounded-md overflow-hidden"
        />
      </figure>
      <div class="w-full flex items-center justify-center gap-2 pt-2">
        <button
          type="button"
          class="bg-primary text-white flex items-center justify-center gap-2.5 rounded-md px-4 py-1 disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="imageIndex === gallery.length - 1"
          @click="handleNextImage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="rtl:rotate-180"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 12h16M9 17s-5-3.682-5-5s5-5 5-5"
              color="currentColor"
            />
          </svg>
          <p class="text-sm font-medium capitalize">
            {{ galleryModal.gallery_modal.navigateNextButtonTitle }}
          </p>
        </button>
        <h3 class="text-sm font-medium px-4">
          {{ imageIndex + 1 }} / {{ gallery.length }}
        </h3>
        <button
          type="button"
          class="bg-primary text-white flex items-center justify-center gap-2.5 rounded-md px-4 py-1.5 disabled:opacity-20 disabled:cursor-not-allowed"
          :disabled="imageIndex === 0"
          @click="handlePrevImage"
        >
          <p class="text-sm font-medium capitalize">
            {{ galleryModal.gallery_modal.navigatePreviousButtonTitle }}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="rtl:rotate-180"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M20 12H4m11 5s5-3.682 5-5s-5-5-5-5"
              color="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: "close-modal"): void;
}>();
const props = defineProps<{
  gallery: {
    id: number;
    backgroundImage: string;
  }[];
  initialImageIndex: number;
}>();
const imageIndex = shallowRef(props.initialImageIndex || 0);
const { $directus } = useNuxtApp();
const { currentLocale, getLocaleObject } = useI18n();
const { data } = useAsyncData("gallery-modal", () =>
  $directus.query(`
  query {
    gallery_modal {
      id
      translations {
        id
        languages_id
        headingTitle
        navigateNextButtonTitle
        navigatePreviousButtonTitle
      }
    }
  }
`)
);

const galleryModal = computed(() => ({
  gallery_modal: {
    ...data.value?.gallery_modal,
    ...data.value?.gallery_modal?.translations.find(
      (translation: any) =>
        translation.languages_id.toString() ===
        getLocaleObject(currentLocale.value)?.id
    ),
  },
}));
const handleNextImage = () => {
  imageIndex.value++;
};
const handlePrevImage = () => {
  imageIndex.value--;
};
</script>
