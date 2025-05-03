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
      <img
        :src="data.image"
        :alt="data.name"
        class="rounded-[20px] object-cover"
      />
      <button
        class="add-btn absolute left-4 bottom-4 bg-primary text-white rounded-[10px] w-9 h-9 flex items-center justify-center mt-2 hover:bg-primary transition-colors"
      >
        <span class="text-2xl -translate-y-0.5">+</span>
      </button>
    </div>
    <div class="mt-2 text-center">
      <div class="font-bold text-sm md:text-base mb-1">{{ data.name }}</div>
      <div
        class="text-gray-500 text-xs md:text-sm mb-1 flex items-center justify-center gap-1"
      >
        <p class="text-primary">{{ data.price }}</p>
        <span v-if="data.unit">({{ data.unit }})</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, ProductTag } from "@/types/product";
import { computed } from "vue";

defineProps<{
  data: Product;
}>();

function tagClass(tag: ProductTag) {
  if (tag === "عرض خاص") return "bg-red-500 text-white";
  if (tag === "كمية محدودة") return "bg-yellow-400 text-black";
  return "bg-gray-200 text-black";
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
