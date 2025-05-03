<template>
  <section
    class="app-container flex gap-5 items-start justify-start my-8 md:my-16 flex-col"
  >
    <div
      class="w-full flex items-start justify-start gap-5 max-md:flex-col-reverse"
    >
      <img
        src="/public/images/about-us/hero.jpg"
        alt="hero.jpg"
        class="w-full md:w-[40%] min-h-[15rem] md:min-h-[34rem] object-cover rounded-[20px]"
      />
      <div
        class="w-full md:w-[60%] flex items-start justify-start gap-3 flex-col"
      >
        <p
          class="relative text-secondary text-base md:text-xs font-bold mb-1 text-center before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
        >
          نبذه عنّا
        </p>
        <h3
          class="text-[28px] md:text-[32px] font-semibold text-black leading-snug"
        >
          قطف هي إحدى فروع
          <mark class="bg-transparent text-primary">
            شركة محمد صالح الملوحي</mark
          >
          - شركة رائدة في الخضروات، ونحن نعمل على تحقيق ضمان جودة عبوات الخضروات
          المقطوفة بعناية من مزارعنا الشريكة. في قطف نحن نتبع أفضل الممارسات
          للتأكد من وصول الخضروات طازجة من مزارعنا إلى عملائنا.
        </h3>
        <div class="w-full flex items-center justify-start gap-4 mt-12">
          <span
            class="min-w-[calc(50%-1rem)] min-h-[146px] relative flex items-center justify-center p-5 bg-black rounded-[20px]"
          >
            <span
              class="absolute w-full top-0 pe-2 left-0 rounded-tr-[20px] overflow-hidden flex items-center justify-between"
            >
              <span
                class="px-4 py-3 md:px-6 md:py-5 text-white max-md:text-sm bg-zinc-900 flex items-center justify-center rounded-bl-full"
              >
                <p>من الحقل إلى مكانك</p>
              </span>
              <span
                class="flex size-8 md:size-10 p-1.5 md:p-2 relative bg-white rounded-full"
              >
                <span class="size-full rounded-full flex bg-black"></span>
              </span>
            </span>
            <h3
              class="text-white mt-14 md:mt-24 pb-5 px-8 text-xl font-bold max-w-full overflow-hidden truncate"
            >
              مصدر موثوق وشفاف
            </h3>
          </span>
          <span
            class="min-w-[calc(50%-1rem)] min-h-[146px] relative flex items-center justify-center p-5 bg-primary rounded-[20px]"
          >
            <span
              class="absolute w-full top-0 ps-2 left-0 rounded-tl-[20px] overflow-hidden flex items-center justify-between flex-row-reverse"
            >
              <span
                class="px-4 py-3 md:px-6 md:py-5 text-white max-md:text-sm bg-primary brightness-110 flex items-center justify-center rounded-br-full"
              >
                <p>جودة لا تُضاهى</p>
              </span>
              <span
                class="flex size-8 md:size-10 p-1.5 md:p-2 relative bg-white rounded-full"
              >
                <span class="size-full rounded-full flex bg-primary"></span>
              </span>
            </span>
            <h3
              class="text-white mt-14 md:mt-24 pb-5 px-8 text-xl font-bold max-w-full overflow-hidden truncate"
            >
              طازة في أي وقت
            </h3>
          </span>
        </div>
      </div>
    </div>
    <sections-posters />

    <div class="w-full flex flex-col items-center justify-center mt-16">
      <h3 class="text-4xl font-bold text-center mb-4">
        ما هي الأسباب أو الدوافع التي قد تدفعك للشراء والتعامل معنا
      </h3>
      <h2 class="text-4xl font-bold text-black/20 text-center mb-8">
        لماذا نحن من سيوفر لك متطلباتك من الخضروات؟
      </h2>
      <ul class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <li
          v-for="(reason, index) in reasons"
          :key="index"
          class="flex items-start justify-center p-2 md:p-5 gap-5 bg-white rounded-[20px]"
        >
          <img
            :src="reason.icon"
            :alt="reason.title"
            class="size-12 object-cover"
          />
          <div>
            <h3 class="text-xl font-semibold text-start text-black mb-2">
              {{ reason.title }}
            </h3>
            <p class="text-base text-black/70 text-start">
              {{ reason.description }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
const reasons = [
  {
    icon: "/icons/about-us/choose-source.svg",
    title: "اخترت المصدر",
    description:
      "عندما تختار منتجاتنا، أنت تختار مصدرًا موثوقًا وشفافًا. نحن نؤمن بأن جودة المنتج تبدأ من المصدر، ولذلك نحرص على أن تكون كل خطوة في عملية الإنتاج واضحة ومُوثقة. مزارعنا هي قلب عملنا، حيث نزرع ونجني أفضل  المحاصيل بطرق تقليدية وحديثة تدمج بين خبرة الماضي وتقنيات الحاضر.",
  },
  {
    icon: "/icons/about-us/choose-expirt.svg",
    title: "اخترت الخبرة التي تمتد من 1981 بالزراعة",
    description:
      "مع أكثر من 40 عامًا من الخبرة في مجال الزراعة، نقدم لكم منتجات  تعكس تراكم معرفة وخبرة كبيرة. منذ عام 1981، ونحن نطور أساليبنا الزراعية  لضمان تحقيق أفضل النتائج. خبرتنا الطويلة مكنتنا من فهم كل تفاصيل العملية الزراعية، بدءًا من اختيار البذور وحتى الحصاد والتغليف.",
  },
  {
    icon: "/icons/about-us/choose-quality.svg",
    title: "اخترت الجودة العالية من انتاج مزارع صالح الملوحي",
    description:
      "نحن نفتخر بأننا نقدم لكم منتجات زراعية عالية الجودة، تم اختيارها بعناية من مزارع صالح الملوحي. نحرص على استخدام أفضل التقنيات الزراعية  الحديثة لضمان جودة المنتج من البذرة حتى وصوله إليكم. كل منتج يتم زراعته  ورعايته في بيئة طبيعية خصبة، مع مراقبة دقيقة لضمان أعلى معايير الجودة  والسلامة.",
  },
  {
    icon: "/icons/about-us/choose-product.svg",
    title:
      "اخترت المنتج المتوافق مع الممارسات الزراعية الجيدة السعودية (saudi  P.A.G)",
    description:
      "منتجاتنا متوافقة تمامًا مع معايير الممارسات الزراعية الجيدة  السعودية (P.A.G Saudi)، والتي تضمن تطبيق أفضل الممارسات الزراعية لتحقيق  الاستدامة وجودة المنتج.",
  },
];
</script>
