<script setup lang="ts">
import { farmStats } from "~/data/data";
</script>

<template>
  <div class="app-container flex flex-col gap-5 mt-10">
    <figure class="w-full h-96 rounded-[20px] overflow-hidden">
      <img
        src="/public/images/features/01.webp"
        alt="01.webp"
        class="w-full max-md:h-full object-cover"
      />
    </figure>
    <ul class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <li
        v-for="(stat, idx) of farmStats"
        :key="idx"
        class="flex flex-col gap-1.5 shadow-2xl p-5 rounded-[24px]"
        :style="{
          order: stat.isActive ? 1 : idx + 1,
        }"
        :class="[stat.isActive ? 'bg-primary' : `bg-white`]"
      >
        <h3
          class="text-5xl font-extrabold text-start"
          :class="stat.isActive ? 'text-white' : 'text-black'"
        >
          {{ stat.value }}
        </h3>
        <p
          class="text-xl font-bold"
          :class="stat.isActive ? 'text-white' : 'text-black'"
        >
          {{ stat.label }}
        </p>
      </li>
    </ul>
  </div>
</template>
