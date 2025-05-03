<template>
  <section
    class="relative bg-cover bg-center bg-fixed text-white py-40 min-h-dvh"
    style="background-image: url('/images/hero.webp')"
  >
    <div class="absolute inset-0 bg-black/60"></div>
    <div
      class="app-container relative z-10 text-center flex flex-col items-center"
    >
      <h1
        class="md:text-4xl text-[44px] font-bold mb-4 flex items-center justify-center gap-4 flex-wrap"
      >
        <span>غذاؤنا هو أمننا</span>
        <span
          class="inline-block p-1 w-48 rounded-full bg-white/50 backdrop-blur-sm"
        >
          <img
            src="/images/hero-heading-image.webp"
            alt="Soil in hands"
            class="w-full h-16 object-cover rounded-full"
          />
        </span>
        <span class="max-md:w-full">نزرع لكم</span>
      </h1>
      <h2 class="text-4xl md:text-5xl font-semibold mb-6">
        لتوفير الغذاء والجودة
      </h2>
      <p class="max-w-2xl mx-auto mb-8 text-lg text-white/70">
        نقدم الكثير من الخضروات الطازجة والحاصلة على الكثير من الشهادات لضمان
        جودتها. اطلب الآن وسنتواصل معك مباشرة لتقديم أفضل خدمة وفي أسرع وقت وحسب
        احتياجك من الكمية.
      </p>
      <NuxtLink
        to="/contact-us"
        class="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
      >
        تواصل معنا
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { NuxtLink } from "#components";

// No script needed for this static section yet
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
