<template>
  <section class="pt-8 app-container">
    <div class="container mx-auto">
      <div class="flex flex-col items-start justify-start mb-6 w-full">
        <p
          class="relative text-secondary max-md:text-base text-xs font-bold mb-1 text-start before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
        >
          منتجاتنا المميزة
        </p>
        <h2 class="text-[32px] md:text-2xl font-bold text-start mb-2">
          تتميز شركة قطف بالعديد من الخضروات الطازجة
        </h2>
      </div>
      <ul
        class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 justify-items-center"
      >
        <ProductCard
          v-for="(product, idx) in products"
          :key="idx"
          :data="product"
        />
      </ul>
      <div class="flex justify-center mt-8 py-3">
        <NuxtLink to="#" class="text-secondary max-md:text-xl font-bold"
          >عرض الكل ←</NuxtLink
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { HOME_PRODUCTS } from "@/data/data";
import type { Product } from "@/types/product";

const products = HOME_PRODUCTS as Product[];
</script>
