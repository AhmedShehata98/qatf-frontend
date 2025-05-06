<template>
  <div
    class="product-card rounded-xl bg-white flex flex-col items-center p-2 md:p-4 relative"
  >
    <div class="relative">
      <span
        v-if="data.tags && data.tags.length"
        class="absolute top-0 right-0 p-2 md:px-3 md:py-4 flex gap-2 rtl:right-2 rtl:left-auto ltr:left-2 ltr:right-auto"
      >
        <span
          v-for="tag in data.tags"
          :key="tag"
          :class="tagClass(tag)"
          class="text-xs font-bold p-1 md:px-2 md:py-1 rounded"
        >
          {{ tag }}
        </span>
      </span>
      <nuxt-img
        provider="directus"
        :src="data.image"
        :alt="data.title"
        class="rounded-[20px] max-w-full min-w-full min-h-[100px] tablet:min-h-[250px] object-cover"
      />
      <button
        class="add-btn absolute left-4 bottom-4 bg-primary text-white rounded-[10px] w-9 h-9 flex items-center justify-center mt-2 hover:bg-primary transition-colors"
        :class="isInTheCart ? 'bg-slate-500' : 'bg-primary'"
        @click="$emit('on-add-to-cart', data)"
        :disabled="Boolean(isInTheCart)"
        title="Add to cart"
      >
        <svg
          v-if="!isInTheCart"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
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
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-check-icon lucide-check"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </button>
    </div>
    <div class="mt-2 text-center">
      <div class="font-bold text-sm md:text-base mb-1">{{ data.title }}</div>
      <div
        class="text-gray-500 text-xs md:text-sm mb-1 flex items-center justify-center gap-2.5"
      >
        <span class="flex items-center justify-center gap-1">
          <p class="text-primary">{{ data.price }}</p>
          <p class="text-primary">{{ currencyMap[data.currency] }}</p>
        </span>
        <span v-if="data.unit">({{ unitMap[data.unit] || "--" }})</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { currencyMap, unitMap, type Product } from "@/types/product";
import { computed } from "vue";

defineProps<{
  data: Product;
  isInTheCart: boolean;
}>();

defineEmits<{
  (e: "on-add-to-cart", data: Product): void;
}>();

function tagClass(tag: string) {
  if (tag === "عرض خاص") return "bg-red-500 text-white";
  if (tag === "كمية محدودة") return "bg-yellow-400 text-black";
  return "bg-red-500 text-white";
}
</script>

<style scoped>
.product-card {
  min-width: 180px;
  min-height: 260px;
}
@media screen and (max-width: 768px) {
  .product-card {
    min-width: 180px;
    min-height: fit-content;
  }
}
.add-btn {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
