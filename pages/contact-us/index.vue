<template>
  <section class="app-container my-16">
    <span class="w-full flex flex-col gap-2 items-start relative">
      <p
        class="relative w-fit text-secondary text-base md:text-xs font-bold text-start before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-full before:h-1/2 before:bg-gradient-to-t px-2 py-1 before:from-secondary/60 isolate"
      >
        ابدأ معنا الآن, بانتظار رسالتك
      </p>
      <h3
        class="text-[44px] md:text-[64px] font-semibold text-black leading-snug"
      >
        تواصل معنا. نحن هنا لمساعدتك.
      </h3>
      <ul
        class="flex md:flex-col gap-4 md:absolute max-md:self-center max-md:mt-6 left-2"
      >
        <li>
          <img src="/icons/shared/fill-fb.svg" alt="fill-fb.svg" />
        </li>
        <li>
          <img src="/icons/shared/fill-telegram.svg" alt="fill-telegram.svg" />
        </li>
        <li>
          <img src="/icons/shared/fill-twitter.svg" alt="fill-twitter.svg" />
        </li>
      </ul>
    </span>
    <form class="w-full flex flex-wrap gap-5 mt-14">
      <div
        class="w-full sm:w-[calc(50%-1.5rem)] flex items-center justify-between gap-5 overflow-hidden flex-wrap"
      >
        <div class="w-full flex flex-col gap-2">
          <label for="company-name" class="text-[14px] font-semibold"
            >اسم الشركة او المؤسسة</label
          >
          <input
            type="text"
            id="company-name"
            name="company-name"
            class="border border-gray-300 rounded-lg p-2"
            v-model="form.companyName"
          />
          <span v-if="form.companyName" class="text-red-500 text-xs">{{
            "يجب أن يكون اسم الشركة أو المؤسسة مكونًا من حرفًا واحدًا على الأقل"
          }}</span>
        </div>
        <div class="w-full flex flex-col gap-2">
          <label for="email" class="text-[14px] font-semibold">الإيميل</label>
          <input
            type="email"
            id="email"
            name="email"
            class="border border-gray-300 rounded-lg p-2"
            v-model="form.email"
          />
          <span v-if="form.email" class="text-red-500 text-xs">{{
            "يجب أن يكون عنوان بريد إلكتروني صالحًا"
          }}</span>
        </div>
        <div class="w-full flex flex-col gap-2">
          <phone-input
            v-model:country-code="countryCode"
            v-model:phone-number="phoneNumber"
          />
          <span v-if="form.phone" class="text-red-500 text-xs">{{
            "يجب أن يكون رقم الهاتف مكونًا من 10 أرقام"
          }}</span>
        </div>
      </div>
      <div class="w-full sm:w-[calc(50%-1.5rem)] flex flex-col gap-2">
        <label for="message" class="text-[14px] font-semibold">رسالتك</label>
        <textarea
          id="message"
          name="message"
          class="border border-gray-300 rounded-lg p-2"
          rows="9"
          v-model="form.message"
        ></textarea>
        <span v-if="form.message" class="text-red-500 text-xs">{{
          "يجب أن يكون الرسالة مكونًا من حرفًا واحدًا على الأقل"
        }}</span>
      </div>
      <button
        type="submit"
        class="w-full sm:w-[calc(50%-1.5rem)] text-white px-4 py-2 rounded-lg mt-4 bg-black"
      >
        إرسال
      </button>
    </form>
  </section>
</template>
<script setup lang="ts">
const form = reactive({
  companyName: "",
  email: "",
  phone: "",
  message: "",
});
const countryCode = shallowRef("+966");
const phoneNumber = shallowRef("");
</script>
