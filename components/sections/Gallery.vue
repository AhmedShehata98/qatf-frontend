<template>
  <div class="app-container flex flex-col mt-16">
    <div class="flex flex-col items-center justify-center mb-6 w-full">
      <p
        class="relative text-secondary text-xs font-bold mb-1 text-center before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
      >
        ألبوم الصور
      </p>
      <h2 class="text-[32px] md:text-2xl font-bold text-center mb-2">
        بعض من صور قطف في أعمال الزراعة
      </h2>
    </div>
    <ul class="w-full grid grid-cols-4 grid-rows-2 gap-4 h-[35rem]">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center justify-center rounded-[20px] relative before:absolute before:bg-gradient-to-t before:content-[''] before:from-slate-900 before:w-full before:h-full overflow-hidden [&:nth-child(1)]:row-span-2 [&:nth-child(3)]:col-span-2"
      >
        <img
          :src="item.src"
          :alt="item.alt"
          class="w-full h-full object-cover"
        />
      </li>
    </ul>
    <ul class="md:hidden w-full grid grid-cols-3 md:grid-cols-4 gap-5">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center justify-center rounded-[20px] relative before:absolute before:bg-gradient-to-t before:content-[''] before:from-slate-900 before:w-full before:h-full overflow-hidden"
        :class="[
          index === 1 || index === 2 ? 'max-md:col-span-2' : '',
          index === items.length - 2 ? 'max-md:col-span-3 max-md:h-36' : '',
          index === items.length - 1
            ? 'max-md:col-span-3 max-md:h-[35rem]'
            : '',
        ]"
      >
        <img
          :src="item.src"
          :alt="item.alt"
          class="w-full h-full object-cover"
        />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const items = [
  { src: "https://picsum.photos/600/450", alt: "Image 1" },
  { src: "https://picsum.photos/600/451", alt: "Image 2" },
  { src: "https://picsum.photos/600/452", alt: "Image 3" },
  { src: "https://picsum.photos/600/453", alt: "Image 4" },
  { src: "https://picsum.photos/600/454", alt: "Image 5" },
  { src: "https://picsum.photos/600/455", alt: "Image 6" },
];
</script>
