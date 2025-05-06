<template>
  <li
    class="w-full flex items-center justify-between p-4 bg-[#F4F6F9] rounded-lg shadow-sm max-md:flex-wrap max-md:gap-3"
  >
    <div class="flex items-center gap-4">
      <nuxt-img
        provider="directus"
        :src="data.image"
        :alt="data.title"
        class="w-20 h-20 object-cover rounded-md"
      />
      <div class="flex flex-col items-start gap-3 max-md:flex-1">
        <h4 class="text-sm md:text-lg font-semibold text-black">
          {{ data.title }}
        </h4>
        <span class="pe-3 ps-4 rounded-md bg-black/60">
          <select
            name="unit"
            id="unit"
            disabled
            class="focus:outline-none text-white pe-3 py-1 text-sm"
          >
            <option :value="data.unit">
              {{ data.unit }}
            </option>
          </select>
        </span>
      </div>
    </div>
    <div class="flex items-center gap-2 max-md:w-full">
      <div class="flex items-center gap-5 mt-2">
        <button
          @click="emit('decrease-quantity', data)"
          class="px-3 py-1 border border-gray-300 rounded-xl text-sm hover:bg-gray-100 disabled:opacity-50"
          :disabled="data.quantity <= 1"
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
            class="lucide lucide-minus-icon lucide-minus"
          >
            <path d="M5 12h14" />
          </svg>
        </button>
        <span class="font-semibold text-lg">{{ data.quantity }}</span>
        <button
          @click="emit('increase-quantity', data)"
          class="px-3 py-1 border border-gray-300 rounded-xl text-sm hover:bg-gray-100"
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
            class="lucide lucide-plus-icon lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </button>
      </div>
      <p class="text-green-600 font-bold px-5">{{ data.price }} ر.س</p>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { CartType } from "~/types/cart";

// Define the props the component accepts
const props = defineProps<{
  data: CartType;
}>();

// Define emits for updating quantity or unit
const emit = defineEmits<{
  (e: "increase-quantity", product: CartType): void;
  (e: "decrease-quantity", product: CartType): void;
  (e: "remove-item", product: CartType): void;
}>();
</script>
